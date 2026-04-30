import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Settings from './components/Settings';
import { EXACT_MATCHES, RELATED_MODELS } from './constants';

type View = 'main' | 'settings';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('main');

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
              <Header onSettingsClick={() => setCurrentView('settings')} />

              <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-8 hide-scrollbar">
                {/* Exact Matches Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold text-white">Exact Matches</h2>
                  </div>
                  
                  <div className="flex overflow-x-auto gap-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth pb-2">
                    {EXACT_MATCHES.map((product) => (
                      <ProductCard key={product.offers.url} product={product} />
                    ))}
                    <div className="flex-none w-[20px]" />
                  </div>
                </section>

                {/* Related Models Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold text-white">Related Models</h2>
                  </div>
                  
                  <div className="flex overflow-x-auto gap-3 -mx-4 px-4 snap-x snap-mandatory scroll-smooth pb-2">
                    {RELATED_MODELS.map((product) => (
                      <ProductCard key={product.offers.url} product={product} />
                    ))}
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
