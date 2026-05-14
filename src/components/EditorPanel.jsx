import React, { useState, useEffect, useRef } from 'react';
import { Settings, MessageCircle, Heart, Palette } from 'lucide-react';

const EditorPanel = ({
    bubbleBgColor, setBubbleBgColor,
    bubbleLineColor, setBubbleLineColor,
    bubbleTxtColor, setBubbleTxtColor,
    stapleColor, setStapleColor,
    stapleWidth, setStapleWidth,
    stapleHeight, setStapleHeight,
    removeDonationWidth, setRemoveDonationWidth,
    alignDonationLeft, setAlignDonationLeft,
    showDonationOutline, setShowDonationOutline,
    donationBorderBrightness, setDonationBorderBrightness,
    donationBorderOpacity, setDonationBorderOpacity,
    donationBorderThickness, setDonationBorderThickness,
    donationBorderDashGap, setDonationBorderDashGap,
    applyPreset,
    forceNextDonation
}) => {
    const [activeTab, setActiveTab] = useState('chat');
    const miniPreviewRef = useRef(null);
    const [miniScale, setMiniScale] = useState(0.5);

    const tabs = [
        { id: 'chat', label: '채팅', icon: <MessageCircle size={16} /> },
        { id: 'donation', label: '도네이션', icon: <Heart size={16} /> },
    ];

    useEffect(() => {
        if (!miniPreviewRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // 600px을 기준 가상 너비로 설정하여 
                // 사이드바 너비에 맞춰 실시간으로 축소 비율 계산 (미리보기와 동일 로직)
                const containerWidth = entry.contentRect.width;
                // 기본적으로 0.5를 더 곱해서 전체적인 샘플 크기를 더 작게 만듬
                setMiniScale((containerWidth / 600) * 0.9);
            }
        });
        observer.observe(miniPreviewRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 flex flex-col relative overflow-hidden">
            
            {/* 1. Top Section - Design Preset */}
            <div className="p-5 space-y-3 border-b border-neutral-100 bg-white">
                <label className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                    <Palette size={14} className="text-indigo-500" />
                    디자인 프리셋
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => applyPreset('default')} className="px-3 py-2.5 bg-[#f3e6d5] border-2 border-[#C9B09E] text-[#7B6151] rounded-xl text-[11px] font-bold shadow-sm hover:brightness-95 transition-all flex flex-col items-center gap-1 group">
                        <span>하네 기본</span>
                    </button>
                    <button onClick={() => applyPreset('newOutfit')} className="px-3 py-2.5 bg-[#F0F9FF] border-2 border-[#BAE6FD] text-[#03273A] rounded-xl text-[11px] font-bold shadow-sm hover:brightness-95 transition-all flex flex-col items-center gap-1 group">
                        <span>하네 파랑</span>
                    </button>
                </div>
            </div>

            {/* 2. Tab Navigation Section */}
            <div className="bg-white border-b border-neutral-100">
                {/* Tab Navigation */}
                <div className="flex border-b border-neutral-100 bg-neutral-50/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3.5 flex flex-col items-center gap-1 transition-all border-b-2 ${
                                activeTab === tab.id 
                                ? 'border-indigo-500 text-indigo-600 bg-white font-bold' 
                                : 'border-transparent text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100/50'
                            }`}
                        >
                            {tab.icon}
                            <span className="text-[11px] uppercase tracking-wider">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Scrollable Content Area */}
            <div className="p-5 space-y-6">
                
                {/* Chat Style Tab */}
                {activeTab === 'chat' && (
                    <div className="space-y-5 animate-fadeIn">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                                <Palette size={14} className="text-indigo-500" />
                                말풍선 컬러(吹き出しの色)
                            </label>
                            <div className="grid gap-3">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase">배경 색상(背景色)</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={bubbleBgColor} onChange={(e) => setBubbleBgColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1 bg-white shrink-0" />
                                        <input type="text" value={bubbleBgColor} onChange={(e) => setBubbleBgColor(e.target.value)} className="flex-1 h-10 border border-neutral-200 rounded-lg px-3 text-xs outline-none uppercase font-mono focus:border-indigo-500 transition-colors bg-neutral-50/50" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase">테두리 색상(枠線の色)</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={bubbleLineColor} onChange={(e) => setBubbleLineColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1 bg-white shrink-0" />
                                        <input type="text" value={bubbleLineColor} onChange={(e) => setBubbleLineColor(e.target.value)} className="flex-1 h-10 border border-neutral-200 rounded-lg px-3 text-xs outline-none uppercase font-mono focus:border-indigo-500 transition-colors bg-neutral-50/50" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-neutral-500 uppercase">텍스트 색상(テキストの色)</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={bubbleTxtColor} onChange={(e) => setBubbleTxtColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1 bg-white shrink-0" />
                                        <input type="text" value={bubbleTxtColor} onChange={(e) => setBubbleTxtColor(e.target.value)} className="flex-1 h-10 border border-neutral-200 rounded-lg px-3 text-xs outline-none uppercase font-mono focus:border-indigo-500 transition-colors bg-neutral-50/50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-neutral-50">
                            <label className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                                <Settings size={14} className="text-indigo-500" />
                                장식 디테일(装飾ディテール)
                            </label>
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold text-neutral-500 uppercase">장식 색상(装飾の色)</label>
                                <div className="flex gap-2">
                                    <input type="color" value={stapleColor} onChange={(e) => setStapleColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 p-1 bg-white shrink-0" />
                                    <input type="text" value={stapleColor} onChange={(e) => setStapleColor(e.target.value)} className="flex-1 h-10 border border-neutral-200 rounded-lg px-3 text-xs outline-none uppercase font-mono focus:border-indigo-500 transition-colors bg-neutral-50/50" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[11px] font-bold text-neutral-500 uppercase">장식 너비(装飾の幅)[default: 16px]</label>
                                        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{stapleWidth}px</span>
                                    </div>
                                    <input type="range" min="4" max="30" value={stapleWidth} onChange={(e) => setStapleWidth(e.target.value)} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[11px] font-bold text-neutral-500 uppercase">장식 높이(装飾の高さ)[default: 8px]</label>
                                        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{stapleHeight}px</span>
                                    </div>
                                    <input type="range" min="2" max="20" value={stapleHeight} onChange={(e) => setStapleHeight(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Donation Tab */}
                {activeTab === 'donation' && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-neutral-800 flex items-center gap-2">
                                <Heart size={14} className="text-pink-500" />
                                도네이션 설정(ドネーション設定)
                            </label>
                            <p className="text-xs text-neutral-500 pb-2">도네이션 박스의 레이아웃을 조정합니다.</p>
                            
                            <div className="grid gap-2">
                                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-neutral-100/80 transition-colors cursor-pointer group" 
                                    onClick={() => {
                                        setRemoveDonationWidth(!removeDonationWidth);
                                    }}>
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${removeDonationWidth ? 'bg-indigo-500 border-indigo-500 shadow-sm' : 'bg-white border-neutral-300'}`}>
                                        {removeDonationWidth && <span className="text-white text-[12px] leading-none">✔</span>}
                                    </div>
                                    <span className="text-xs text-neutral-700 font-bold">너비 꽉 차게 표시(幅をいっぱいに表示)</span>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-neutral-100/80 transition-colors cursor-pointer group" 
                                    onClick={() => {
                                        setAlignDonationLeft(!alignDonationLeft);
                                    }}>
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${alignDonationLeft ? 'bg-indigo-500 border-indigo-500 shadow-sm' : 'bg-white border-neutral-300'}`}>
                                        {alignDonationLeft && <span className="text-white text-[12px] leading-none">✔</span>}
                                    </div>
                                    <span className="text-xs text-neutral-700 font-bold">왼쪽 정렬(左揃え (チェック外すと中央))</span>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 hover:bg-neutral-100/80 transition-colors cursor-pointer group" 
                                    onClick={() => {
                                        setShowDonationOutline(!showDonationOutline);
                                    }}>
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${showDonationOutline ? 'bg-indigo-500 border-indigo-500 shadow-sm' : 'bg-white border-neutral-300'}`}>
                                        {showDonationOutline && <span className="text-white text-[12px] leading-none">✔</span>}
                                    </div>
                                    <span className="text-xs text-neutral-700 font-bold">점선 테두리 디자인 추가(点線の枠線デザインを追加)</span>
                                </div>
                            </div>

                            {showDonationOutline && (
                                <div className="space-y-4 pt-4 border-t border-neutral-100 animate-fadeIn">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase">테두리 밝기(枠線の明るさ)[default: 0%]</label>
                                            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{donationBorderBrightness}%</span>
                                        </div>
                                        <input type="range" min="0" max="200" value={donationBorderBrightness} onChange={(e) => setDonationBorderBrightness(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase">테두리 투명도(枠線の不透明度)[default: 30%]</label>
                                            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{donationBorderOpacity}%</span>
                                        </div>
                                        <input type="range" min="0" max="100" value={donationBorderOpacity} onChange={(e) => setDonationBorderOpacity(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase">테두리 두께(枠線の太사)[default: 3px]</label>
                                            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{donationBorderThickness}px</span>
                                        </div>
                                        <input type="range" min="1" max="10" value={donationBorderThickness} onChange={(e) => setDonationBorderThickness(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase">점선 간격(点線の間隔)[default: 12px]</label>
                                            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{donationBorderDashGap}px</span>
                                        </div>
                                        <input type="range" min="2" max="40" value={donationBorderDashGap} onChange={(e) => setDonationBorderDashGap(Number(e.target.value))} className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default EditorPanel;
