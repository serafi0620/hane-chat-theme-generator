import React, { useState, useEffect, useRef } from 'react';
import { FIXED_CONFIG } from '../constants/chatData';

const PreviewPanel = ({ previewChats, fontSize, backgroundImageUrl }) => {
    const previewRef = useRef(null);
    const [previewScale, setPreviewScale] = useState(1);

    useEffect(() => {
        if (!previewRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPreviewScale(entry.contentRect.width / 1920);
            }
        });
        observer.observe(previewRef.current);
        return () => observer.disconnect();
    }, []);

    const positionStyle = { right: `${FIXED_CONFIG.right}%`, top: `${FIXED_CONFIG.top}%` };

    const DONATION_THEMES = {
        green: {
            border: 'border-[#1c4b40]',
            bg: 'bg-[#246153]',
            bottomBg: 'bg-[#18493d]',
            badgeBg: 'bg-[#0f2c24]'
        },
        gold: {
            border: 'border-[#846400]',
            bg: 'bg-[#a67c00]',
            bottomBg: 'bg-[#8e6a00]',
            badgeBg: 'bg-[#6d5200]'
        },
        red: {
            border: 'border-[#6d1a1a]',
            bg: 'bg-[#8b2626]',
            bottomBg: 'bg-[#731616]',
            badgeBg: 'bg-[#5a1111]'
        }
    };

    const sampleTheme = DONATION_THEMES['green'];

    return (
        <div className="bg-white rounded-3xl shadow-md border border-neutral-200 overflow-hidden flex flex-col transition-shadow hover:shadow-lg">
            <div className="bg-neutral-100 px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="ml-3 text-xs font-bold text-neutral-400 uppercase tracking-widest">Live Stream (1080p Scale)</span>
                    <span className="ml-3 text-[10px] font-bold text-red-500 bg-red-50/10 px-2 py-0.5 rounded border border-red-500/20"> ⚠ 도네는 임시로 실제와 다름 (ド네이션은 실제의 표시와 다릅니다)</span>
                </div>
            </div>
            <div 
                ref={previewRef}
                className="relative w-full aspect-video bg-slate-900 overflow-hidden bg-cover bg-center" 
                style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
            >
                {/* 실시간 샘플 (Floating Sample Preview) */}
                <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center" style={{ width: '220px', height: '180px' }}>
                        <div 
                            className="flex flex-col items-center space-y-3 origin-center"
                            style={{ 
                                width: '400px',
                                transform: `scale(0.5)` 
                            }}
                        >
                            <div className="chat_list w-full flex justify-center">
                                <div className="chat_box chat !m-0" style={{ width: 400 }}>
                                    <span className="text" style={{ fontSize: '30px' }}>말풍선 샘플 미리보기</span>
                                </div>
                            </div>
                            <div className="chat_list w-full flex justify-center">
                                <div className="chat_box !m-0 w-full">
                                    <div className={`donation_box flex flex-col rounded-[18px] shadow-md border-2 ${sampleTheme.border} overflow-hidden ${sampleTheme.bg} text-white`} style={{ fontFamily: "'Pretendard', sans-serif" }}>
                                        <div className="p-4 pb-3">
                                            <div className="font-bold mb-1 text-white/90 text-[24px]">하무</div>
                                            <div className="font-extrabold leading-snug break-all text-[30px]">도네이션 샘플입니다</div>
                                        </div>
                                        <div className={`${sampleTheme.bottomBg} px-4 py-3`}>
                                            <div className={`${sampleTheme.badgeBg} inline-flex items-center gap-2 px-4 py-2 rounded-full text-[18px] font-bold`}>
                                                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H3C1.89 4 1 4.89 1 6V18C1 19.11 1.89 20 3 20H21C22.11 20 23 19.11 23 18V6C23 4.89 22.11 4 21 4ZM21 18H3V12H21V18ZM21 8H3V6H21V8Z"/></svg>
                                                1,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    className="absolute top-0 left-0 origin-top-left"
                    style={{ 
                        width: '1920px', 
                        height: '1080px',
                        transform: `scale(${previewScale})`
                    }}
                >
                    <div 
                        className="absolute flex flex-col justify-end overflow-hidden z-10"
                        style={{ 
                            ...positionStyle,
                            width: `${FIXED_CONFIG.width}%`, 
                            height: `${FIXED_CONFIG.height}%` 
                        }}
                    >
                        <div className="w-full origin-bottom mb-2" style={{ transform: `scale(${FIXED_CONFIG.scale})` }}>
                            <div className="chat_list block relative z-10 w-full">
                                {previewChats.map((chat) => {
                                    const theme = DONATION_THEMES[chat.theme || 'green'];
                                    return chat.type === 'donation' ? (
                                        <div key={chat.id} className="chat_box chat-preview-item">
                                            <div className={`donation_box flex flex-col rounded-[18px] shadow-md border-2 ${theme.border} overflow-hidden ${theme.bg} text-white`} style={{ fontFamily: "'Pretendard', sans-serif" }}>
                                                <div className="p-4 pb-3">
                                                    <div className="font-bold mb-1 text-white/90" style={{ fontSize: `${Math.max(14, fontSize - 6)}px` }}>하무</div>
                                                    <div className="font-extrabold leading-snug break-all" style={{ fontSize: `${fontSize}px` }}>도네이션 테스트 와 ㅏ</div>
                                                </div>
                                                <div className={`${theme.bottomBg} px-4 py-2.5`}>
                                                    <div className={`${theme.badgeBg} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[14px] font-bold`}>
                                                        <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H3C1.89 4 1 4.89 1 6V18C1 19.11 1.89 20 3 20H21C22.11 20 23 19.11 23 18V6C23 4.89 22.11 4 21 4ZM21 18H3V12H21V18ZM21 8H3V6H21V8Z"/></svg>
                                                        {chat.amount}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={chat.id} className="chat_box chat chat-preview-item">
                                            <span className="text">{chat.text}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPanel;
