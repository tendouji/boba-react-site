import React from 'react';
import styled from 'styled-components';
import JsBarcode from 'jsbarcode';

import PageWithMenu from "../../components/PageWithMenu";
import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import {apiService} from "../../services/api";
import {
    borderRadius,
    cardSizeLabels,
    cardSizes,
    colors,
    commonStyle,
    elementSizes,
    fontSizes,
    gaps,
} from "../../contants/layout";
import {GiftCorner} from '../../assets';
import HorizontalScroller from "../../components/HorizontalScroller";
import {routes} from "../../contants/routes";
import RoundedButton from "../../components/Buttons";
import FriendCard from "../../components/FriendCard";
import Preloader from "../../components/Preloader";


interface GiftDetailsProps extends WithMeiosisProps {
    [key: string]: any;
}

interface GiftDetailsState extends WithMeiosisProps {
    giftData: any;
    campaignId: string;
    selectedVoucher: string;
    isLoading: boolean;
}

class GiftDetails extends React.Component<GiftDetailsProps, GiftDetailsState> {
    private barcodeElm: React.RefObject<HTMLElement>;

    constructor(props: GiftDetailsProps) {
        super(props);
        this.state = {
            giftData: [],
            campaignId: '',
            selectedVoucher: '',
            isLoading: true,
            ...props.globalStates!
        };

        this.barcodeElm = React.createRef();
    }

    componentDidMount() {
        const { match } = this.props;
        const campaignId: string = match.params.id;

        this.setState({ campaignId }, () => {
            apiService.ApiCall.GetCampaignById({
                campaignId,
                onSuccess: this.onGetCampaignByIdSuccess,
            });
        });
    }

    onGetCampaignByIdSuccess = (data: any) => {
        this.setState({ giftData: data.result }, () => {
            const { campaignId } = this.state;
            apiService.ApiCall.GetVoucherListByCampaignId({
                campaignId,
                onSuccess: this.onGetVoucherListByCampaignIdSuccess,
            });
        });
    };

    onGetVoucherListByCampaignIdSuccess = (data: any) => {
        const voucherList = data.result.reduce((filtered: any[], voucher: any) => {
            if(!!voucher.active) {
                filtered.push(voucher.code);
            }
            return filtered;
        }, []);

        this.setState({
            selectedVoucher: voucherList[0],
            isLoading: false,
        }, () => {
            JsBarcode('#barcode', this.state.selectedVoucher, {
                displayValue: false
            });
        });
    };

    addNewContact = () => {
        const { history } = this.props;
        const { selectedVoucher } = this.state;

        history.push({
            pathname: routes.CONTACT,
            state: {
                selectedVoucher,
            }
        });
    };

    render() {
        const { globalStates } = this.props;
        const {
            giftData,
            campaignId,
            selectedVoucher,
            isLoading
        } = this.state;

        const friendList = globalStates!.userInfo.friends;

        return (
            <PageWithMenu>
                { !!isLoading ? (
                    <Preloader isShown={true} />
                ) : (
                    <GiftWrapper className="gift-screen">
                        <div className="gift-image-resizer">
                            <div className="gift-image-holder">
                                <label>
                                    <input type="checkbox" />
                                    <div className="gift-card">
                                        <div className="card front" style={{backgroundImage: `url(${apiService.apiBasePath + giftData.imagePath})`}} />
                                        <div className="card back">
                                            <div className="barcode">
                                                <div className="barcode-holder">
                                                    <svg id="barcode" />
                                                </div>
                                            </div>
                                            <span className="description">{giftData.name}</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="gift-description">
                            <h3>Information</h3>
                            <div className="description">{giftData.description}</div>
                        </div>

                        <div className="friend-list">
                            <h3 className="title">{'Send your gift to'}</h3>

                            <HorizontalScroller
                                height={+cardSizes[cardSizeLabels.SmallSquare][1] * 16 + 20} // NOTE: 10px for gaps.XSmall, 12px for fontSizes.Small
                                sidePadded={true}
                            >
                                <ul>
                                    { friendList.map((item: any, key: number) => (
                                        <li key={key}>
                                            <FriendCard
                                                name={item.displayName}
                                                imagePath={item.imagePath}
                                                isURL={true}
                                                urlPath={`${routes.SHARE_GIFT}/${item.username}`}
                                                urlState={{
                                                    friendInfo: {
                                                        username: item.username,
                                                        displayName: item.displayName,
                                                        dob: item.dob,
                                                        imagePath: item.imagePath
                                                    },
                                                    campaignId,
                                                    selectedVoucher
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </HorizontalScroller>

                            <div className="cta-area">
                                Or &nbsp; <RoundedButton text={'+ Add New Contact'} onClick={this.addNewContact} />
                            </div>
                        </div>
                    </GiftWrapper>
                )}
            </PageWithMenu>
        );
    }
}

export default withMeiosis(GiftDetails);


const GiftWrapper = styled.div`
    height: 100%;
    padding: ${gaps.Common};
    box-sizing: border-box;
    
    & .gift-image-resizer {
        width: 100%;
        max-width: ${elementSizes.GiftImageMaxWidth};
        margin: 0 auto;
        
        & .gift-image-holder {
            position: relative;
            width: 100%;                        
            height: 0;
            padding-bottom: ${elementSizes.GiftImageRatioHeight}%;
            
            & label {
                position: absolute;
                left: 50%;
                top: 50%;
                display: block;
                width: 100%;
                height: 100%;
                -webkit-perspective: 1000px;
                perspective: 1000px;
                -webkit-transform-style: preserve-3d;
                transform-style: preserve-3d;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                cursor: pointer;
                
                & .gift-card {
                    position: relative;
                    height: 100%;
                    width: 100%;
                    -webkit-transform-style: preserve-3d;
                    transform-style: preserve-3d;
                    -webkit-transition: all 600ms;
                    transition: all 600ms;
                    z-index: 2;
                    
                    & > .card {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        border-radius: ${borderRadius}px;
                        border: 1px solid ${colors.Pink};
                        box-sizing: border-box;
                        background: ${colors.Gray} center / cover no-repeat;
                        overflow: hidden;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                    }
                    
                    & .back {
                        display: flex;
                        flex-direction: column;
                        background: ${colors.White};
                        justify-content: center;
                        align-items: center;
                        background: url(${GiftCorner}) top right / 10% auto no-repeat;
                        -webkit-transform: rotateX(180deg);
                        transform: rotateX(180deg);
                                                
                        & .barcode {
                            position: relative;                                
                            width: 80%;
                            height: 0;
                            padding-bottom: 22.5%;
                            text-align: center;
                            // background: center / contain no-repeat;
                            
                            & .barcode-holder {
                                ${commonStyle.absoluteFullStyle};
                                text-align: center;
                                
                                & > svg {
                                    height: 100%;
                                    width: 100%;
                                }
                            }
                        }
                        
                        & .description { 
                            margin-top: ${gaps.Small};
                        }
                    }
                }
                
                input[type="checkbox"] {
                    display: none;
                    
                    &:checked + .gift-card {
                        transform: rotateX(180deg);
                        -webkit-transform: rotateX(180deg);
                    }
                }                
                
                &:hover {
                    & .gift-card {
                        -webkit-transform: rotateX(20deg);
                        transform: rotateX(20deg);
                    }
                    
                    & input[type="checkbox"] {
                        &:checked + .gift-card {
                            transform: rotateX(160deg);
                            -webkit-transform: rotateX(160deg);
                        }
                    }
                }
            }
        }
    }
    
    & .gift-description {
        padding: ${gaps.Large} 0;
        box-sizing: border-box;
        
        & .h3 { 
            font-size: ${fontSizes.XLarge};
            margin-bottom: ${gaps.Small};
        }
        
        & .description { 
            margin-top: ${gaps.Small};
        }
    }

    & .friend-list {
        padding: ${gaps.Common} 0;
        margin: 0 -${gaps.Common};
                
        & h3.title {
            padding: 0 ${gaps.Common};
            font-size: ${fontSizes.XLarge};
            font-weight: 700;
        }
        
        & li {
            margin-right: ${gaps.Common};
            
            &:last-child {
                margin-right: 0;
            }
        }
        
        & .cta-area {
            padding: 0 ${gaps.Common};
        }
    }
`;
