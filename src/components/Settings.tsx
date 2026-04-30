import React, { ChangeEvent, useState, useEffect } from 'react';
import { ArrowLeft, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface SettingsProps {
    onBack: () => void;
}

interface AppStorage {
    activateWhenViewingProduct: boolean;
    anonymousAnalytics: boolean;
}

export default function Settings({ onBack }: SettingsProps) {
    const [settings, setSettings] = useState<AppStorage | null>(null);
    const [loading, setLoading] = useState(true);
    function activateWhenViewingProductOnChange(event: ChangeEvent<HTMLInputElement>) {
        (chrome.storage.local.get({
            activateWhenViewingProduct: true,
            anonymousAnalytics: false,
        }) as Promise<AppStorage>).then((data: Partial<AppStorage>) => {
            data.activateWhenViewingProduct = !data.activateWhenViewingProduct;

            try {
                chrome.storage.local.set(data);
                setSettings(data);
                console.log(data);
            } catch (error) {
                console.error("Error setting storage in activateWhenViewingProductOnChange:", error);
            }
        });
    }
    function privacyAndDataOnChange(event: ChangeEvent<HTMLInputElement>) {
        (chrome.storage.local.get({
            activateWhenViewingProduct: true,
            anonymousAnalytics: false,
        }) as Promise<AppStorage>).then((data: Partial<AppStorage>) => {
            data.anonymousAnalytics = !data.anonymousAnalytics;

            try {
                chrome.storage.local.set(data);
                setSettings(data);
                console.log(data);
            } catch (error) {
                console.error("Error setting storage in anonymousAnalyticsOnChange:", error);
            }
        });
    }

    useEffect(() => {
        chrome.storage.local.get({
            activateWhenViewingProduct: true,
            anonymousAnalytics: false,
        }).then((data: Partial<AppStorage>) => {
            setSettings(data);
            setLoading(false);
        })
    }, [])

    if (loading) return (
        <div className="flex flex-col h-full bg-surface">
            <p>Loading...</p>
            <div className="pt-8 text-center">
                <p className="text-[11px] text-[#404040]">Price Peek Version 0.0.1</p>
                <a className="text-[10px] text-[#404040] mt-1 italic" href="https://linkedin.com/in/gledray">Created by Gregory Ledray</a>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-surface">
            <div className="flex items-center gap-3 p-4 border-b border-outline-variant">
                <motion.button
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onBack}
                    className="p-1 text-[#707070] hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </motion.button>
                <h2 className="text-[13px] uppercase tracking-[0.2em] font-bold text-white">Settings</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
                {/* <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold text-[#707070] tracking-widest px-1">Activation</h3>
                    <div className="space-y-2">
                        <ToggleSetting
                            icon={<Zap size={16} />}
                            title="When Viewing a Product"
                            description="Price Peek's sidebar will open automatically when viewing a product page"
                            value={settings.activateWhenViewingProduct}
                            handleOnChange={activateWhenViewingProductOnChange}
                        />
                    </div>
                </section> */}

                <section className="space-y-4">
                    <h3 className="text-[10px] uppercase font-bold text-[#707070] tracking-widest px-1">Privacy & Data</h3>
                    <div className="space-y-2">
                        <ToggleSetting
                            icon={<Shield size={16} />}
                            title="Anonymous Analytics"
                            description="Help us improve with usage data"
                            value={settings.anonymousAnalytics}
                            handleOnChange={privacyAndDataOnChange}
                        />
                    </div>
                </section>

                <div className="pt-8 text-center">
                    <p className="text-[11px] text-[#404040]">Price Peek Version 0.0.1</p>
                    <a className="text-[10px] text-[#404040] mt-1 italic" href="https://linkedin.com/in/gledray">Created by Gregory Ledray</a>
                </div>
            </div>
        </div>
    );
}

function ToggleSetting({ icon, title, description, handleOnChange, value }: {
    icon: React.ReactNode,
    title: string,
    description: string,
    handleOnChange: Function,
    value: boolean
}) {
    return (
        <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant hover:border-[#404040] transition-colors group">
            <div className="flex items-center gap-3">
                <div className="text-on-surface-variant group-hover:text-accent transition-colors">
                    {icon}
                </div>
                <div>
                    <p className="text-[13px] font-medium text-white">{title}</p>
                    <p className="text-[11px] text-[#707070] leading-tight">{description}</p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={value} value={value} onChange={handleOnChange} className="sr-only peer" />
                <div className="w-8 h-4 bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#707070] after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-accent peer-checked:after:bg-black"></div>
            </label>
        </div>
    );
}
