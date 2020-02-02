import React from "react";
import {colors} from "../../contants/layout";

export const IconFashion: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-fashion asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <path d="M29.5 15V32.5C28.6667 33 25.6 34 20 34C14.4 34 11.3333 33 10.5 32.5V15" stroke={color || colors.Pink} strokeWidth="2"/>
        <path d="M9 19.5L4 16L10 7L14.5 5.5C15.3333 6 17.7 7 20.5 7C23.3 7 25.3333 6 26 5.5L29.5 6.8125L36 15.8125L31 19.5" stroke={color || colors.Pink} strokeWidth="2" />
        <path d="M14.5 6C15.1667 7.5 17.2 10.5 20 10.5C22.8 10.5 25.1667 7.5 26 6" stroke={color || colors.Pink} strokeWidth="2" />
        <circle cx="24.5" cy="15.5" r="2" stroke={color || colors.Pink} />
        <path d="M34.5 13.5L31.5 15.5" stroke={color || colors.Pink} />
        <path d="M5.5 13.5L8.5 15.5" stroke={color || colors.Pink} />
    </svg>
</>);

