import React from "react";
import styled from "styled-components";

import {Logo} from '../../assets';
import {elementSizes, gaps, mediaBreakpoints} from "../../contants/layout";


const AuthForm: React.FC<{title?: string, children: any}> = ({title, children}) => {
    return (
        <AuthFormWrapper className="form-panel">
            <div className="logo" />
            <div className="title">{title}</div>
            {children}
        </AuthFormWrapper>
    );
};

export default AuthForm;


const AuthFormWrapper = styled.div`
    min-height: 400px;
    width: calc(100% - 2 * ${gaps.Common});
    max-width: 500px;
    margin: 0 auto;

    & .logo {
        width: ${elementSizes.AuthLogoSmall};
        height: ${elementSizes.AuthLogoSmall};
        margin: 0 auto ${gaps.Large};
        background: #999 center / contain no-repeat;
        // background-image: url(${Logo});
        
        @media only screen and (min-width: ${mediaBreakpoints.Medium}) {
            width: ${elementSizes.AuthLogoMedium};
            height: ${elementSizes.AuthLogoMedium};
        }
    }
    
    & .title {
        width: 100%;
        margin: 0 auto ${gaps.Common};
        text-align: left;
        font-size: 24px;
        font-weight: 700;
    }
`;