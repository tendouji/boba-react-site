import React from "react";
import {colors} from "../../contants/layout";

export const IconFriends: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-calendar asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <path d="M23.8262 14.7563C23.8262 19.1619 20.3363 22.6964 16.0763 22.6964C11.8162 22.6964 8.32631 19.1619 8.32631 14.7563C8.32631 10.3506 11.8162 6.8161 16.0763 6.8161C20.3363 6.8161 23.8262 10.3506 23.8262 14.7563Z" stroke={color || colors.GrayDark} strokeWidth="2" />
        <path d="M3.14154 33.4483L2.20103 33.1086C2.09032 33.415 2.13586 33.7562 2.32308 34.0229C2.51029 34.2896 2.8157 34.4483 3.14154 34.4483V33.4483ZM28.6548 33.4483V34.4483C28.9807 34.4483 29.2861 34.2896 29.4733 34.0229C29.6605 33.7562 29.7061 33.415 29.5953 33.1086L28.6548 33.4483ZM3.14154 34.4483H28.6548V32.4483H3.14154V34.4483ZM15.8982 24.6765C21.1505 24.6765 25.756 28.3674 27.7143 33.7881L29.5953 33.1086C27.409 27.0565 22.1524 22.6765 15.8982 22.6765V24.6765ZM4.08205 33.7881C6.04035 28.3674 10.6459 24.6765 15.8982 24.6765V22.6765C9.64401 22.6765 4.38742 27.0565 2.20103 33.1086L4.08205 33.7881Z" fill={color || colors.GrayDark} />
        <circle cx="30.3424" cy="15.5171" r="4.8967" stroke={color || colors.GrayDark} strokeWidth="2" />
        <path d="M23.9221 26.2954L22.9816 25.9557C22.8709 26.2621 22.9165 26.6033 23.1037 26.87C23.2909 27.1367 23.5963 27.2954 23.9221 27.2954V26.2954ZM36.9999 26.2954V27.2954C37.3257 27.2954 37.6312 27.1367 37.8184 26.87C38.0056 26.6033 38.0511 26.2621 37.9404 25.9557L36.9999 26.2954ZM23.9221 27.2954H36.9999V25.2954H23.9221V27.2954ZM30.461 22.2865C32.9091 22.2865 35.1112 24.0105 36.0594 26.6352L37.9404 25.9557C36.7641 22.6996 33.911 20.2865 30.461 20.2865V22.2865ZM24.8627 26.6352C25.8109 24.0105 28.0129 22.2865 30.461 22.2865V20.2865C27.0111 20.2865 24.1579 22.6996 22.9816 25.9557L24.8627 26.6352Z" fill={color || colors.GrayDark} />
    </svg>
</>);

