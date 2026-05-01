import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Settings from './components/Settings';
import { Product, PricePeekResponse } from './types';

type View = 'main' | 'settings';

export default function App() {
    const [currentView, setCurrentView] = useState<View>('main');
    const [pricePeekResponse, setPricePeekResponse] = useState<PricePeekResponse>({});
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
    const [loadingProductErrorMessageCommon, setLoadingProductErrorMessageCommon] = useState<string>('');

    const getData = async () => {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tabs.length < 1 || tabs[0]?.id == null) {
                console.error('No tab seen on screen');
                setLoadingProductErrorMessageCommon('Current tab webpage could not be found - is this a product page?')
                return;
            }
            const getSourceResponse = await chrome.tabs.sendMessage(tabs[0].id, { action: "getSource" });
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(getSourceResponse.source, "text/html");
            const allCurrentTabProducts = Array.from(htmlDoc.querySelectorAll('script[type="application/ld+json"]'))
                .filter(script => script.textContent.includes('"@type":"Product"'));
            console.log(`allCurrentTabProducts: ${JSON.stringify(allCurrentTabProducts)}`);
            if (allCurrentTabProducts == null || allCurrentTabProducts.length < 1) {
                console.error('No product seen on screen');
                setLoadingProductErrorMessageCommon('No product seen on this webpage - is this a product page?')
                return;
            }
            const currentTabProduct: Product = JSON.parse(allCurrentTabProducts[0].textContent);
            console.log(`currentTabProduct: ${JSON.stringify(currentTabProduct)}`);
            const userId = '123'
            const response = await fetch(`https://server.treatcost.com/price-peek?userId=${userId}`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentTabProduct),
            })
            const pricePeekResponse: PricePeekResponse = await response.json();
            setPricePeekResponse(pricePeekResponse);
            setLoadingProductErrorMessageCommon('Sorry - no products found')
        }
        catch (err) {
            console.error(`error fetching product: ${err}`)
        }
        finally {
            setLoadingProducts(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    // In a real extension side panel, the UI fills the screen. 
    // We'll keep the design overlay to demonstrate how it looks in context.
    return (
        <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden flex justify-end">
            {/* Chrome Extension Side Panel Container */}
            <motion.aside
                initial={{ x: 320 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen h-screen bg-surface border-l border-outline-variant flex flex-col shadow-2xl relative z-[9999]"
            >
                <AnimatePresence mode="wait">
                    {currentView === 'main' ? (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col h-full"
                        >
                            <Header onSettingsClick={() => setCurrentView('settings')} onRefreshClick={() => getData()} />

                            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-8 hide-scrollbar">
                                {/* Exact Matches Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold text-white">Exact Matches</h2>
                                    </div>

                                    <div className="flex overflow-x-auto gap-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth pb-2">
                                        {loadingProducts ? 'Loading...' : (
                                            pricePeekResponse?.exactMatches == null || pricePeekResponse.exactMatches.length < 1 ? loadingProductErrorMessageCommon :
                                            pricePeekResponse?.exactMatches?.map((product) => (
                                                <ProductCard key={product.offers.url} product={product} />
                                            ))
                                        )}
                                        <div className="flex-none w-[20px]" />
                                    </div>
                                </section>

                                {/* Related Models Section */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold text-white">Related Models</h2>
                                    </div>

                                    <div className="flex overflow-x-auto gap-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth pb-2">
                                        {loadingProducts ? 'Loading...' : (
                                            pricePeekResponse?.relatedModels == null || pricePeekResponse.relatedModels.length < 1 ? loadingProductErrorMessageCommon :
                                            pricePeekResponse?.relatedModels?.map((product) => (
                                                <ProductCard key={product.offers.url} product={product} />
                                            ))
                                        )}
                                        <div className="flex-none w-[20px]" />
                                    </div>
                                </section>
                            </main>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col h-full"
                        >
                            <Settings onBack={() => setCurrentView('main')} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.aside>
        </div>
    );
}
