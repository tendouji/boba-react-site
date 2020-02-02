import React from "react";
import {colors} from "../../contants/layout";

export const IconCalendar: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-calendar asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <rect x="7" y="10" width="26" height="25" rx="4" stroke={color || colors.GrayDark} strokeWidth="2" />
        <path d="M7 16H33" stroke={color || colors.GrayDark} strokeWidth="2" />
        <path d="M19.9624 31H17.5527L21.6177 22.1816H16.4175V20.3359H24.0273V21.6104L19.9624 31Z" fill={color || colors.GrayDark} />
        <path d="M11 5L11 10" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
        <path d="M29 5L29 10" stroke={color || colors.GrayDark} strokeWidth="2" strokeLinecap="round"/>
    </svg>
</>);

