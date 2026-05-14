import React, { useState, useEffect, useRef } from 'react';
import { CHAT_DATA } from './constants/chatData';
import { generateCSS } from './utils/cssGenerator';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import CodePanel from './components/CodePanel';
import bgImage from './img/background.png';

function App() {
    // 스타일 상태 관리
    const [bubbleBgColor, setBubbleBgColor] = useState('#F0F9FF');
    const [bubbleLineColor, setBubbleLineColor] = useState('#BAE6FD');
    const [bubbleTxtColor, setBubbleTxtColor] = useState('#03273A');
    const [stapleColor, setStapleColor] = useState('#025B88');
    const [stapleWidth, setStapleWidth] = useState(16);
    const [stapleHeight, setStapleHeight] = useState(8);
    const fontSize = 24; // 텍스트 크기 24px로 고정
    
    const [removeDonationWidth, setRemoveDonationWidth] = useState(false);
    const [alignDonationLeft, setAlignDonationLeft] = useState(true);
    const [showDonationOutline, setShowDonationOutline] = useState(true);
    const [donationBorderBrightness, setDonationBorderBrightness] = useState(0);
    const [donationBorderOpacity, setDonationBorderOpacity] = useState(30);
    const [donationBorderThickness, setDonationBorderThickness] = useState(3);
    const [donationBorderDashGap, setDonationBorderDashGap] = useState(12);
    
    const forceNextDonation = useRef(false);
    const backgroundImageUrl = bgImage;  


    const applyPreset = (type) => {
        if (type === 'default') {
            setBubbleBgColor('#f3e6d5');
            setBubbleLineColor('#C9B09E');
            setBubbleTxtColor('#47382e');
            setStapleColor('#47382e');
            setStapleWidth(16);
            setStapleHeight(8);
        } else if (type === 'newOutfit') {
            setBubbleBgColor('#F0F9FF');
            setBubbleLineColor('#BAE6FD');
            setBubbleTxtColor('#03273A');
            setStapleColor('#025B88');
            setStapleWidth(16);
            setStapleHeight(8);
        }
    };

    const [previewChats, setPreviewChats] = useState([
        { id: 0, text: CHAT_DATA[0], type: 'chat' },
        { id: 1, text: CHAT_DATA[1], type: 'chat' }
    ]);
    const messageIndexRef = useRef(2);
    const idCounterRef = useRef(2);
    const donationThemeCounterRef = useRef(0);
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        forceNextDonation.current = true;
    }, [
        removeDonationWidth,
        alignDonationLeft,
        showDonationOutline,
        donationBorderBrightness,
        donationBorderOpacity,
        donationBorderThickness,
        donationBorderDashGap
    ]);

    useEffect(() => {
        let timeoutId;
        const addNextMessage = () => {
            setPreviewChats(prev => {
                const isDonation = forceNextDonation.current || (Math.random() < 0.15 && prev[prev.length - 1]?.type !== 'donation');
                
                if (forceNextDonation.current) {
                    forceNextDonation.current = false;
                }

                const randomAmount = ['1,000', '5,000', '10,000', '50,000'][Math.floor(Math.random() * 4)];
                const themes = ['green', 'gold', 'red'];
                const theme = isDonation ? themes[donationThemeCounterRef.current % 3] : null;
                if (isDonation) donationThemeCounterRef.current++;

                const nextChats = [
                    ...prev, 
                    { 
                        id: idCounterRef.current++, 
                        text: CHAT_DATA[messageIndexRef.current],
                        type: isDonation ? 'donation' : 'chat',
                        amount: randomAmount,
                        theme: theme
                    }
                ];
                return nextChats.slice(-12);
            });
            
            messageIndexRef.current = (messageIndexRef.current + 1) % CHAT_DATA.length;
            const randomDelay = 200 + Math.random() * 600;
            timeoutId = setTimeout(addNextMessage, randomDelay);
        };

        timeoutId = setTimeout(addNextMessage, 500);
        return () => clearTimeout(timeoutId);
    }, []);

    const config = {
        bubbleBgColor,
        bubbleLineColor,
        bubbleTxtColor,
        stapleColor,
        stapleWidth,
        stapleHeight,
        removeDonationWidth,
        alignDonationLeft,
        showDonationOutline,
        donationBorderBrightness,
        donationBorderOpacity,
        donationBorderThickness,
        donationBorderDashGap
    };

    const generatedCSS = generateCSS(config);

    return (
        <div className="p-4 md:p-8 max-w-[1440px] mx-auto space-y-8">
            <style dangerouslySetInnerHTML={{ __html: `
                ${generatedCSS}
                .chat_list .text { 
                    font-family: var(--main-font); 
                    font-size: ${fontSize}px !important;
                    line-height: 1.2 !important;
                    vertical-align: middle !important;
                    display: inline-block !important;
                }
                .chat_list .chat_box:not(.chat) .donation_box::after {
                    top: ${donationBorderThickness * 2}px !important; 
                    left: ${donationBorderThickness * 2}px !important; 
                    right: ${donationBorderThickness * 2}px !important; 
                    bottom: ${donationBorderThickness * 2}px !important;
                }
            `}} />

            <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight flex items-center justify-center gap-3">
                    <span className="text-amber-400">✨</span> CUSTOM
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Panel */}
                <div className="lg:col-span-3 space-y-4">
                    <EditorPanel 
                        {...config}
                        setBubbleBgColor={setBubbleBgColor}
                        setBubbleLineColor={setBubbleLineColor}
                        setBubbleTxtColor={setBubbleTxtColor}
                        setStapleColor={setStapleColor}
                        setStapleWidth={setStapleWidth}
                        setStapleHeight={setStapleHeight}
                        setRemoveDonationWidth={setRemoveDonationWidth}
                        setAlignDonationLeft={setAlignDonationLeft}
                        setShowDonationOutline={setShowDonationOutline}
                        setDonationBorderBrightness={setDonationBorderBrightness}
                        setDonationBorderOpacity={setDonationBorderOpacity}
                        setDonationBorderThickness={setDonationBorderThickness}
                        setDonationBorderDashGap={setDonationBorderDashGap}
                        applyPreset={applyPreset}
                        forceNextDonation={forceNextDonation}
                    />
                </div>

                {/* Right Panel */}
                <div className="lg:col-span-9 space-y-6">
                    <PreviewPanel 
                        previewChats={previewChats}
                        fontSize={fontSize}
                        backgroundImageUrl={backgroundImageUrl}
                    />
                    <CodePanel generatedCSS={generatedCSS} />
                </div>
            </div>
        </div>
    );
}

export default App;
