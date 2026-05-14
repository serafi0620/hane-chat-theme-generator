export const generateCSS = (config) => {
    const {
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
    } = config;

    return `/* 컬러 팔레트 */
:root {
    --bubble-bg-color: ${bubbleBgColor};
    --bubble-line-color: ${bubbleLineColor};
    --bubble-txt-color: ${bubbleTxtColor};
    --main-font: 'Gyeombalbal', 'M PLUS Rounded 1c', sans-serif;
    --staple-color: ${stapleColor};
    --staple-width: ${stapleWidth}px;
    --staple-height: ${stapleHeight}px;
}

/* 채팅 테마 */
.chat_list div.chat {
    position: relative;
    margin: 20px 0px 20px 10px !important; 
    padding: 15px 20px 15px 30px !important;
    background-color: var(--bubble-bg-color);
    max-width: 90%;
    word-wrap: break-word;
    width: max-content; 
    border-radius: 18px; 
    border: 2px solid var(--bubble-line-color);
    box-shadow: 0 0 0 3px var(--bubble-bg-color), 2px 4px 5px rgba(0, 0, 0, 0.08) !important;
}

.chat_list .text {
    color: var(--bubble-txt-color) !important;
    text-shadow: none !important;
    letter-spacing: 0.5px;
}

/* 장식 세팅 */
.chat_list .chat_box.chat::before,
.chat_list .chat_box.chat::after {
    content: '';
    position: absolute;
    left: calc(var(--staple-width) / -2); 
    width: var(--staple-width); 
    height: var(--staple-height); 
    background-color: var(--staple-color);
    border-radius: 1px;
    z-index: 2;
}

.chat_list .chat_box.chat::before {
    top: calc(50% - var(--staple-height) - var(--staple-height) / 2);
}
.chat_list .chat_box.chat::after {
    top: calc(50% - var(--staple-height) - var(--staple-height) / 2 + var(--staple-height) * 2);
}

.chat_list .chat_box:not(.chat) {
    ${removeDonationWidth ? 'max-width: 100% !important;\n    width: 100% !important;' : ''}
    margin: 20px 5px 20px 5px  !important;
    justify-self: ${alignDonationLeft ? 'left' : 'center'} !important;
}

.chat_list .chat_box:not(.chat) .donation_box {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 250px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    position: relative !important;
}${showDonationOutline ? `\n\n/* 도네이션 실선 테두리 (Solid) */\n.chat_list .chat_box:not(.chat) .donation_box::before {\n    content: '';\n    position: absolute;\n    top: 0; left: 0; right: 0; bottom: 0;\n    border: ${donationBorderThickness}px solid white;\n    border-radius: 16px;\n    box-sizing: border-box !important;\n    pointer-events: none;\n    z-index: 10;\n    mix-blend-mode: overlay;\n    opacity: ${donationBorderOpacity / 100};\n    filter: brightness(${donationBorderBrightness}%);\n}\n\n/* 도네이션 점선 테두리 (Dashed) */\n.chat_list .chat_box:not(.chat) .donation_box::after {\n    content: '';\n    position: absolute;\n    top: ${donationBorderThickness * 2}px; left: ${donationBorderThickness * 2}px; right: ${donationBorderThickness * 2}px; bottom: ${donationBorderThickness * 2}px;\n    pointer-events: none;\n    z-index: 11;\n    background-image: url("data:image/svg+xml,%3Csvg%20width%3D%27100%25%27%20height%3D%27100%25%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20x%3D%270.5%25%27%20y%3D%271.5%25%27%20width%3D%2799%25%27%20height%3D%2797%25%27%20fill%3D%27none%27%20rx%3D%2716%27%20ry%3D%2716%27%20stroke%3D%27white%27%20stroke-width%3D%27${donationBorderThickness}%27%20stroke-dasharray%3D%27${donationBorderDashGap}%2C%20${donationBorderDashGap}%27%20stroke-dashoffset%3D%270%27%20stroke-linecap%3D%27butt%27%2F%3E%3C%2Fsvg%3E");\n    mix-blend-mode: overlay;\n    opacity: ${donationBorderOpacity / 100};\n    filter: brightness(${donationBorderBrightness}%);\n}` : ''}`;
};
