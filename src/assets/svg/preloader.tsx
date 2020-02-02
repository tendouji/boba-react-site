import React from "react";
import {colors} from "../../contants/layout";

export const Preloader: React.FC<{color?: string, width?: number}> = ({color, width = 200}) => (<>
    <svg className="icon-calendar asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '200'}
         height={width || '200'}
         viewBox={`0 0 ${width / 2} ${width / 2}`}
         preserveAspectRatio="xMidYMid"
         fill="none">
        <circle cx="50" cy="50" fill="none" stroke={color || colors.Pink} strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(287.958 50 50)">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="2s" values="0 50 50;360 50 50" keyTimes="0;1" />
        </circle>
    </svg>
</>);

