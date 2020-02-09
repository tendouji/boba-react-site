import React from 'react';
import styled from 'styled-components';

import {
    borderRadius, buttonSizes,
    colors,
    commonStyle,
    elementSizes,
    fontSizes,
    gaps,
} from "../../constants/layout";
import {apiService} from "../../services/api";
import {removeLastSlash} from "../../helpers";

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import PageWithMenu from "../../components/PageWithMenu";
import RoundedButton from "../../components/Buttons";
import Preloader from "../../components/Preloader";
import {Imager} from "../../components/ImageCard";


interface ThankYouProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ThankYouState extends WithMeiosisProps {
    giftObj: any;
    voucherInfo: any;
    voucherImagePath: string;
    isLoading: boolean;
}

class ThankYou extends React.Component<ThankYouProps, ThankYouState> {
    constructor(props: ThankYouProps) {
        super(props);

        this.state = {
            giftObj: {},
            voucherInfo: {},
            voucherImagePath: '',
            isLoading: true,
            ...props.globalStates!
        };
    }

    componentDidMount() {
        apiService.ApiCall.BuyShareVoucherFinalised({
            onSuccess: this.onBuyShareVoucherFinalisedSuccess,
            onError: this.onBuyShareVoucherFinalisedError,
        });
    }

    onBuyShareVoucherFinalisedSuccess = (data: any) => {
        this.setState({ giftObj: data.giftObj });

        apiService.ApiCall.GetCampaignById({
            campaignId: data.giftObj.campaignId,
            onSuccess: (data2: any) => {
                this.setState({ voucherImagePath: data2.result.imagePath});

                apiService.ApiCall.GetVoucherById({
                    voucherNo: data.giftObj.voucherNo,
                    onSuccess: (data3: any) => {
                        this.setState({
                            voucherInfo: data3.result,
                            isLoading: false,
                        });
                    },
                    onError: this.onGetVoucherByIdError,
                });
            },
        });
    };

    onBuyShareVoucherFinalisedError = (data: any) => {
        console.log('error');
    };

    onGetVoucherByIdError = (data: any) => {
        console.log('error');
    };

    render() {
        const {
            giftObj,
            voucherInfo,
            voucherImagePath,
            isLoading
        } = this.state;

        console.log(giftObj, voucherInfo, voucherImagePath);

        return (
            <PageWithMenu>
                { !!isLoading ? (
                    <Preloader isShown={true} />
                ) : (
                    <ThankYouWrapper className="thank-you-screen">
                        <h2>Thank you</h2>

                        <div className="gift-image-resizer">
                            <div className="gift-image-holder">
                                <Imager
                                    className="gift-card"
                                    title={voucherInfo.campaign}
                                    imagePath={removeLastSlash(apiService.apiBasePath) + voucherImagePath}
                                />
                            </div>
                        </div>

                        <div className="gift-description">
                            <div>You have sent <strong>{giftObj.toDisplayName}</strong> a</div>
                            <div className="highlighted">{`${voucherInfo.campaign} Gift Card`}</div>
                        </div>

                        <div className="cta-area">
                            <RoundedButton text={'Track gift status'} onClick={() => null} fullWidth={true} />
                        </div>
                    </ThankYouWrapper>
                )}
            </PageWithMenu>
        );
    }
}

export default withMeiosis(ThankYou);


const ThankYouWrapper = styled.div`
    height: 100%;
    padding: ${gaps.Common};
    box-sizing: border-box;
    
    & h2 {
        margin-bottom: ${gaps.Common};
    }
    
    & .gift-image-resizer {
        width: 100%;
        max-width: ${elementSizes.GiftImageMaxWidth};
        margin: 0 auto;
        
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
    }    
    
    & .gift-description {
        width: 100%;
        max-width: ${elementSizes.GiftImageMaxWidth};
        margin: ${gaps.Common} auto ${gaps.Large};
        text-align: center;
        
        & .highlighted {
            font-weight: 700;
            color: ${colors.Pink};
        }
    }
    
    & .card-selection,
    & .gift-message,
    & .gift-share-method {
        margin-top: ${gaps.Large};
        
        & h3 {
            padding: 0 ${gaps.Common};
        }
    }
        
    & .card-selection {
        & ul {
            & li {
                margin-right: ${gaps.Small};
                
                &:last-child {
                    margin-right: 0;
                }
                
                & .card-design {
                    position: relative;
                    cursor: pointer;
                    
                    & .card-image { 
                        vertical-align: top;
                    }
                    
                    & .card-name { 
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        padding: ${gaps.Small};
                        box-sizing: border-box;
                        background: rgba(255,255,255,0.4);
                        font-size: ${fontSizes.Small};
                    }
                    
                    &.selected {
                        & .card-image { 
                            & .image {
                                border-width: 4px;
                                padding-bottom: calc(60% - 8px);
                            }
                        }
                        
                        & .card-name { 
                            background: ${colors.Pink};
                            border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
                        }
                    }
                }
            }
        }
    }
    
    & .gift-message {
        & .message-panel {  
            margin-top: ${gaps.Common};
            padding: 0 ${gaps.Common};
                    
            & textarea {  
                width: 100%;
                padding: ${gaps.Small};
                border: 1px solid ${colors.Pink};
                border-radius: ${borderRadius}px;
                box-sizing: border-box;
                font-size: ${fontSizes.Common};
                resize: vertical;
            }
        }
    }
    
    & .gift-share-method {
        & ul {
            & li {
                margin-right: ${gaps.Small};
                
                &:last-child {
                    margin-right: 0;
                }
                                    
                & .social-media-card {                    
                    display: block;
                    height: ${buttonSizes.Large};
                    width: calc(${buttonSizes.Large} + 2 * ${gaps.Small});
                    text-decoration: none;
                    text-align: center;
                    font-size: ${fontSizes.Small};
                    cursor: pointer;
                
                    & .image {
                        display: block; 
                        height: ${buttonSizes.Large};
                        width: ${buttonSizes.Large};
                        margin: 0 auto;
                        background: center / cover no-repeat;
                    }
                    
                    & .caption {
                        width: 100%;
                        margin-top: ${gaps.XSmall};
                        color: ${colors.GrayDarker};
                        ${commonStyle.textOverflowStyle};
                    }
                }
            }
        }
    }
`;
