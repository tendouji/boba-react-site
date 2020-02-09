import React from "react";
import {colors} from "../../constants/layout";

export const IconDining: React.FC<{color?: string, width?: number}> = ({color, width}) => (<>
    <svg className="icon-dining asset-svg"
         xmlns="http://www.w3.org/2000/svg"
         width={width || '40'}
         height={width || '40'}
         viewBox="0 0 40 40"
         fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M21 12.5913V1H23V12.5913C23 14.0542 23.9032 15.3652 25.2701 15.8865C25.8476 16.1067 26.2225 16.6683 26.2045 17.2861L25.6272 37.1014C25.6128 37.5934 26.0078 38 26.5 38C26.9922 38 27.3872 37.5934 27.3728 37.1014L26.7955 17.2861C26.7775 16.6683 27.1524 16.1067 27.7299 15.8865C29.0968 15.3652 30 14.0542 30 12.5912V1H32V12.5912C32 14.7517 30.7431 16.7007 28.8056 17.6019L29.372 37.0431C29.4191 38.662 28.1196 40 26.5 40C24.8804 40 23.5809 38.662 23.628 37.0431L24.1944 17.6019C22.2569 16.7007 21 14.7517 21 12.5913ZM24 11V1H26V11H24ZM27 1V11H29V1H27Z" fill={color || colors.Pink} />
        <path d="M19 9C19 12.9956 16.1925 16 13 16C9.80754 16 7 12.9956 7 9C7 5.0044 9.80754 2 13 2C16.1925 2 19 5.0044 19 9Z" stroke={color || colors.Pink} strokeWidth="2"/>
        <path d="M10.6891 37.0059L11.9395 17H14.0206L14.439 37.0839C14.4609 38.1356 13.6144 39 12.5624 39C11.4797 39 10.6215 38.0865 10.6891 37.0059Z" stroke={color || colors.Pink} strokeWidth="2" />
    </svg>
</>);

