import React from "react";
import styled from "styled-components";

import {Logo} from '../../assets';
import {elementSizes, gaps, mediaBreakpoints, borderRadius, colors, buttonSizes} from "../../contants/layout";
import {Imager} from "../ImageCard";
import {removeLastSlash} from "../../helpers";
import {apiService} from "../../services/api";


type AuthFormType = {
    title?: string,
    actionId?: string,
    giftImage?: string,
    children: any
};

const AuthForm: React.FC<AuthFormType> = ({title, actionId, giftImage, children}) => {
    return (
        <AuthFormWrapper className="form-panel">
            { !!actionId ? (
                <div className="gift-image-resizer">
                    <div className="gift-image-holder">
                        <Imager
                            className="gift-card"
                            title={'brandData.name'}
                            imagePath={removeLastSlash(apiService.apiBasePath) + giftImage}
                        />
                        <div className="logo" />
                    </div>
                </div>
            ) : (
                <div className="logo" />
            )}
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
    
    & .gift-image-resizer {
        width: 100%;
        max-width: ${elementSizes.GiftImageMaxWidth};
        margin: 0 auto ${gaps.Large};
        
        & .gift-image-holder {
            position: relative;
            width: 100%;                        
            height: 0;
            padding-bottom: ${elementSizes.GiftImageRatioHeight}%;
            
            & .gift-card {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: 100%;
                border-radius: ${borderRadius}px;
                border: 1px solid ${colors.Pink};
                box-sizing: border-box;
                background: ${colors.Gray} center / cover no-repeat;
            }
        }
    
        & .logo {
            position: absolute;
            top: ${gaps.Common};
            right: ${gaps.Common};
            width: ${buttonSizes.Large};
            height: ${buttonSizes.Large};
        }    
    } 

    & .logo {
        width: ${elementSizes.AuthLogoSmall};
        height: ${elementSizes.AuthLogoSmall};
        margin: 0 auto ${gaps.Large};
        background: center / contain no-repeat;
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