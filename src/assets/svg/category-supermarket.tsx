import React from "react";
import {colors} from "../../contants/layout";

export const IconSupermarket: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-supermarket asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <path d="M4 5L9.5 6L12.2368 12.5M12.2368 12.5H19.5M12.2368 12.5L17 23.8125M19.5 12.5L23 25M19.5 12.5H28.5M23 25H17.5L17 23.8125M23 25H27.5M28.5 12.5H34.3273C34.9426 12.5 35.4119 13.0504 35.3147 13.658L33.5 25H27.5M28.5 12.5L27.5 25M17 23.8125H16.8437C14.997 23.8125 13.5 25.3095 13.5 27.1562V27.1562C13.5 29.003 14.997 30.5 16.8437 30.5H34" stroke={color || colors.Pink} strokeWidth="2"/>
        <circle cx="18" cy="34" r="2" fill={color || colors.Pink} />
        <circle cx="31" cy="34" r="2" fill={color || colors.Pink} />
    </svg>
</>);

