import React from "react";
import {colors} from "../../contants/layout";

export const IconGift: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-calendar asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <rect x="13.2593" y="6.99664" width="26.6574" height="5.52069" transform="rotate(20.1802 13.2593 6.99664)" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M17.9062 8.84278C18.2074 7.18611 19.5328 4.14385 22.4244 5.22822C25.3161 6.31259 26.039 10.1982 26.039 12.0055C27.0179 10.2735 29.8343 7.21623 33.2681 8.84278C35.0754 9.92715 34.6236 13.2104 34.1717 14.7164" stroke={color || colors.GrayDark} strokeWidth="2" strokeMiterlimit="3.13764"/>
        <path d="M28.7499 35.0484L28.3948 35.9832C28.9108 36.1792 29.4879 35.9201 29.6843 35.4044L28.7499 35.0484ZM11.258 27.3362C10.7417 27.1401 10.1642 27.3997 9.9681 27.9161C9.77203 28.4324 10.0316 29.0099 10.548 29.2059L11.258 27.3362ZM33.2372 20.46L27.8154 34.6924L29.6843 35.4044L35.1062 21.172L33.2372 20.46ZM29.1049 34.1135L11.258 27.3362L10.548 29.2059L28.3948 35.9832L29.1049 34.1135Z" fill={color || colors.GrayDark}/>
        <path d="M26.4907 17.4274L21.0689 31.6597" stroke={color || colors.GrayDark} strokeWidth="2"/>
        <path d="M21.2948 15.6201L15.873 29.8524" stroke={color || colors.GrayDark} strokeWidth="2"/>
        <path d="M1.96293 16.0719H13.9362" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M3.7702 20.5901H15.7434" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 25.1083H13.9732" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.19203 23.7529L7.74021 24.8824" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M9.99931 19.2346L9.54749 20.3642" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M12.9362 13.1351L11.5807 16.0719" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
    </svg>
</>);

