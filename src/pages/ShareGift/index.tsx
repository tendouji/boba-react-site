import React from 'react';
import styled from 'styled-components';

import PageWithMenu from "../../components/PageWithMenu";
import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import {apiService} from "../../services/api";
import {
    borderRadius, buttonSizes,
    cardSizeLabels,
    cardSizes,
    colors,
    commonStyle,
    fontSizes,
    gaps,
} from "../../contants/layout";
import HorizontalScroller from "../../components/HorizontalScroller";
import ImageCard from "../../components/ImageCard";
import {FriendCardHorizontal} from "../../components/FriendCard";
import {sessionStorageKey, socialShareList} from "../../contants/app";
import {
    clearSessionStorageByKey,
    getSessionStorage,
    setSessionStorage
} from "../../helpers";
import Preloader from "../../components/Preloader";


interface ShareGiftProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ShareGiftState extends WithMeiosisProps {
    giftId: string;
    isFreeGift: boolean,
    cardDesign: any[];
    campaignId: string;
    selectedCardDesign: string;
    friendInfo: any;
    isLoading: boolean;
    showShareLoading: boolean;
}

class ShareGift extends React.Component<ShareGiftProps, ShareGiftState> {
    constructor(props: ShareGiftProps) {
        super(props);

        this.state = {
            giftId: '',
            isFreeGift: false,
            cardDesign: [],
            campaignId: '',
            selectedCardDesign: '',
            friendInfo: {},
            isLoading: true,
            showShareLoading: false,
            ...props.globalStates!
        };
    }

    componentDidMount() {
        const { location } = this.props;
        let giftId: string = '';
        let campaignId: string = '';
        let friendInfo: string = '';

        if(!!location.state) {
            giftId = location.state.selectedVoucher;
            campaignId = location.state.campaignId;
            friendInfo = location.state.friendInfo;

            setSessionStorage(sessionStorageKey.gift, {
                giftId,
                campaignId,
                friendInfo,
            });
        } else {
            const sessionData = getSessionStorage(sessionStorageKey.gift);
            if(!!sessionData && sessionData !== '') {
                const sessionDataObj = JSON.parse(sessionData);
                giftId = sessionDataObj.giftId;
                campaignId = sessionDataObj.campaignId;
                friendInfo = sessionDataObj.friendInfo;
            }
        }

        this.setState({ giftId, campaignId, friendInfo });

        apiService.ApiCall.GetCardDesigns({
            onSuccess: this.onGetCardDesignsSuccess,
            onError: this.onGetCardDesignsError,
        });
    }

    componentWillUnmount() {
        clearSessionStorageByKey(sessionStorageKey.gift);
    }

    onGetCardDesignsSuccess = (data: any) => {
        const result = data.result;
        this.setState({
            cardDesign: result,
            isLoading: false
        });
    };

    onGetCardDesignsError = (data: any) => {
        console.log('error');
    };

    selectCardDesign = (cardId: string) => {
        const { selectedCardDesign } = this.state;
        this.setState({ selectedCardDesign: selectedCardDesign === cardId ? '' : cardId });
    };

    shareGift = (channel: string) => {
        this.setState({ showShareLoading: true });

        const {
            campaignId,
            giftId,
            friendInfo,
            selectedCardDesign
        } = this.state;
        const { globalStates } = this.props;

        apiService.ApiCall.BuyShareVoucher({
            campaignId,
            voucherNo: giftId,
            channel,
            senderNo: globalStates!.userInfo.username,
            senderName: globalStates!.userInfo.displayName,
            shareCardDesign: selectedCardDesign,
            shareMessage: 'Test Message',
            recipientNo: friendInfo.username,
            recipientName: friendInfo.displayName,
            onSuccess: this.onBuyShareVoucherSuccess,
            // onError: this.onBuyShareVoucherError,
        });
    };

    onBuyShareVoucherSuccess = (data: any) => {
        const { isFreeGift } = this.state;
        if(!isFreeGift) {
            window.location.href = data.result.url;
        }
    };


    render() {
        const {
            selectedCardDesign,
            cardDesign,
            friendInfo,
            isLoading,
            showShareLoading
        } = this.state;

        return (
            <PageWithMenu>
                { !!isLoading ? (
                    <Preloader isShown={true} />
                ) : (
                    <ShareGiftWrapper className="share-gift-screen">
                        <div className="share-gift-header">
                            <h2>Send your gift to</h2>

                            <FriendCardHorizontal
                                name={friendInfo.displayName}
                                imagePath={friendInfo.imagePath}
                            />
                        </div>

                        <div className="card-selection">
                            <h3>Choose a card</h3>
                            <HorizontalScroller
                                height={+cardSizes[cardSizeLabels.Large][1] * 16}
                                sidePadded={true}
                            >
                                <ul>
                                    { cardDesign.map((item: any, key: number) => (
                                        <li key={key}>
                                            <div className={[
                                                "card-design",
                                                (item.id === selectedCardDesign ? ' selected' : '')
                                            ].join('')} onClick={() => this.selectCardDesign(item.id)}>
                                                <ImageCard
                                                    size={cardSizeLabels.Large}
                                                    title={item.name}
                                                    imagePath={apiService.apiBasePath + item.imagePath}
                                                />
                                                <div className="card-name">{item.name}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </HorizontalScroller>
                        </div>

                        <div className="gift-message">
                            <h3>Say something</h3>
                            <div className="message-panel">
                                <textarea name="message" rows={8} placeholder={`Hello, ${'friend'}! Here is a gift for you!`} />
                            </div>
                        </div>

                        <div className="gift-share-method">
                            <h3>Send via</h3>
                            <HorizontalScroller
                                height={+cardSizes[cardSizeLabels.SmallSquare][1] * 16 + 20} // NOTE: 10px for gaps.XSmall, 12px for fontSizes.Small
                                sidePadded={true}
                            >
                                <ul>
                                    { socialShareList.map((item: any, key: number) => (
                                        <li key={key}>
                                            <div className="social-media-card"
                                                 onClick={() => this.shareGift(item.key)}>
                                                <div className="image" style={{backgroundImage: `url(${item.icon})`}} />
                                                <div className="caption">{item.label}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </HorizontalScroller>
                        </div>

                        <Preloader isShown={showShareLoading} message={'Redirecting...'} />
                    </ShareGiftWrapper>
                )}
            </PageWithMenu>
        );
    }
}

export default withMeiosis(ShareGift);


const ShareGiftWrapper = styled.div`
    position: relative;
    height: 100%;
    padding: ${gaps.Common} 0;
    box-sizing: border-box;
    
    & .preloader {
        ${commonStyle.absoluteFullStyle}
    }
    
    & .share-gift-header {
        padding: 0 ${gaps.Common};
        
        & h2 {}
        
        & .friend-card-horizontal { 
            margin-top: ${gaps.Common};
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
