import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {BGLogo} from '../../assets';
import {apiService} from "../../services/api";
import {
    cardSizes,
    colors, commonStyle,
    fontSizes,
    gaps,
    mediaBreakpoints
} from "../../contants/layout";
import {routes} from "../../contants/routes";
import {categoryLinks, snackBarShowDelay} from "../../contants/app";
import PageWithMenu from "../../components/PageWithMenu";
import HorizontalScroller from "../../components/HorizontalScroller";
import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import ImageCard from "../../components/ImageCard";
import SearchBar from '../../components/SearchBar';
import {removeLastSlash} from "../../helpers";
import FriendCard from "../../components/FriendCard";
import Preloader from '../../components/Preloader';


interface MainProps extends WithMeiosisProps {
    [key: string]: any
}

interface MainState extends WithMeiosisProps {
    homeData: any[];
    isLoading: boolean;
}

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
        this.state = {
            homeData: [],
            isLoading: true,
            ...props.globalStates!
        }
    }

    componentDidMount() {
        apiService.ApiCall.GetHomePageData({
            onSuccess: this.onGetHomePageDataSuccess,
        });
    }

    goToProfile = () => {
        const { history } = this.props;
        history.replace({ pathname: routes.PROFILE });
    };

    onGetHomePageDataSuccess = (data: any) => {
        this.setState({
            homeData: data.result.homepage,
            isLoading: false,
        }, () => {
            setTimeout(() => {
                // NOTE: page loaded,let's check on this prompts
                const { history, globalActions } = this.props;
                const locationState = history.location.state;

                if(!!locationState) {
                    if(!!locationState.userInfo) {
                        const ui = locationState.userInfo;

                        globalActions.updateUserInfo({
                            username: ui.username,
                            id: ui._id,
                            voucherifyId: ui.voucherifyId,
                            sourceId: ui.sourceId,
                            displayName: ui.displayName,
                            email: ui.email,
                            imagePath: ui.imagePath || '',
                            createdAt: ui.createdAt,
                            friends: ui.friends,
                            notification: ui.notification,
                            giftList: ui.giftList,
                            metadata: ui.metadata,
                        });

                        if( !locationState.isRegister &&
                            !!ui.metadata &&
                            ui.metadata['registration-status'] === 'incomplete'
                        ) {
                            globalActions.updateSnackBar({
                                isShown: true,
                                message: `Hello, it seems your profile information is still incomplete! Update your Profile for us to know you better!`,
                                hasCTA: true,
                                CTAButtonLabel: 'Go to Profile',
                                CTAClickHandler: this.goToProfile
                            });
                        }
                    }
                    if(!!locationState.isRegister) { // NOTE: is coming from new register
                        globalActions.updateSnackBar({
                            isShown: true,
                            message: `Welcome to Boba.Gift! Update your Profile for us to know you better!`,
                            hasCTA: true,
                            CTAButtonLabel: 'Go to Profile',
                            CTAClickHandler: this.goToProfile
                        });
                    }
                }
            }, snackBarShowDelay * 1000);
        });
    };

    horizontalScrollHandler = (e: React.MouseEvent | React.DragEvent | React.WheelEvent) => {
        console.log('scroll');
    };

    render() {
        const { homeData, isLoading } = this.state;

        return (
            <PageWithMenu>
                { !!isLoading ? (
                    <Preloader isShown={true} />
                ) : (
                    <MainWrapper className="main-screen">
                        { homeData.map((item, key) => {
                            switch(item.type) {
                                case 'shareFreeGift':
                                    return (
                                        <div key={key} className="homepage-segment top-content free-gift">
                                            <SearchBar onClick={(val: string) => console.log(`Searching: ${val}`)} />

                                            <h3 className="title">{item.title}</h3>

                                            <HorizontalScroller
                                                height={+cardSizes[item.size][1] * 16}
                                                scrollHandler={this.horizontalScrollHandler}
                                                sidePadded={true}
                                            >
                                                <ul>
                                                    { item.data.map((item2: any, key2: number) => (
                                                        <li key={key2}>
                                                            <Link
                                                                className="voucher-card"
                                                                to={`${routes.GIFT_DETAILS}/${item2.id}`}
                                                            >
                                                                <ImageCard
                                                                    size={item.size}
                                                                    title={item2.category}
                                                                    imagePath={removeLastSlash(apiService.apiBasePath) + item2.imagePath}
                                                                />
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </HorizontalScroller>
                                        </div>
                                    );
                                case 'categoryMenu':
                                    return (
                                        <div key={key} className="category-menu top-content">
                                            <HorizontalScroller
                                                height={85}
                                                scrollHandler={this.horizontalScrollHandler}
                                                sidePadded={false}
                                            >
                                                <ul>
                                                    { item.data.map((item2: any, key2: number) => {
                                                        return (!!item2.show && (
                                                                <li key={key2}>
                                                                    <Link
                                                                        className="voucher-card"
                                                                        to={`/category/${item2.id}`}
                                                                    >
                                                                        <div className="icon">{categoryLinks[item2.key]}</div>
                                                                        <div className="title">{item2.displayName}</div>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )})}
                                                </ul>
                                            </HorizontalScroller>
                                        </div>
                                    );
                                case 'closeFriends':
                                    return (
                                        <div key={key} className="homepage-segment close-friends">
                                            <h3 className="title">{item.title}</h3>

                                            <HorizontalScroller
                                                height={+cardSizes[item.size][1] * 16 + 20} // NOTE: add 20px for text caption
                                                scrollHandler={this.horizontalScrollHandler}
                                                sidePadded={true}
                                            >
                                                <ul>
                                                    { item.data.map((item2: any, key2: number) => (
                                                        <li key={key2}>
                                                            <FriendCard
                                                                name={item2.displayName}
                                                                imagePath={removeLastSlash(apiService.apiBasePath) + item2.imagePath}
                                                                isURL={true}
                                                                urlPath={`friend-detail/${item2.id}`}
                                                            />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </HorizontalScroller>
                                        </div>
                                    );
                                default:
                                    return (
                                        <div key={key} className="homepage-segment">
                                            <h3 className="title">{item.title}</h3>

                                            <HorizontalScroller
                                                height={+cardSizes[item.size][1] * 16 + 20} // NOTE: add 20px for text caption
                                                scrollHandler={this.horizontalScrollHandler}
                                                sidePadded={true}
                                            >
                                                <ul>
                                                    { item.data.map((item2: any, key2: number) => (
                                                        <li key={key2}>
                                                            <Link className="card" to={
                                                                item.type === 'brandLove' ? `${routes.BRAND_DETAILS}/${item2.id}` :
                                                                    item.type === 'faveGiftCard' ? `${routes.GIFT_DETAILS}/${item2.id}` : ''
                                                            }>
                                                                <ImageCard
                                                                    size={item.size}
                                                                    title={item2.name}
                                                                    imagePath={removeLastSlash(apiService.apiBasePath) + (item2.iconPath || item2.imagePath)}
                                                                />
                                                                <div className="caption" style={{width: `${cardSizes[item.size][1]}rem`}}>{
                                                                    item.type === 'brandLove' ? item2.name :
                                                                        item.type === 'faveGiftCard' ? item2.name : 'text'
                                                                }</div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </HorizontalScroller>
                                        </div>
                                    )
                            }
                        })}
                    </MainWrapper>
                )}
            </PageWithMenu>
        );
    }
}

export default withMeiosis(Main);


const categoryCountPerSmallScreen: number = 4;
const MainWrapper = styled('div')<{isFlex?: boolean}>`
    height: 100%;
    ${props => !!props.isFlex ? `
        display: flex;
        justify-content: center;
        align-items: center;
    ` : ``}
    
    & .category-menu {
        padding-top: ${gaps.Common};
        border-bottom: 1px solid ${colors.Pink};
        
        & .scroller-component { // Override
            padding: 0;
        }
        
        & ul {
            display: inline-block;
            
            & li {
                border-right: 1px solid ${colors.Pink};
                width: calc(${mediaBreakpoints.Small} / ${categoryCountPerSmallScreen});
                
                &:last-child {
                    border-right: 0;
                }
                
                & > a {
                    display: block;
                    height: 85px;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 ${gaps.Small} ${gaps.Common}; 
                    text-decoration: none;
                    text-align: center;
                    font-size: ${fontSizes.XSmall};
                    
                    & .icon {
                        display: block;
                        height: 40px;
                        width: 40px;
                        margin: 0 auto ${gaps.Small};
                    }
                }
            }        
        }
        
        @media only screen and (min-width: ${mediaBreakpoints.Small}) {
            & ul {
                display: flex;
                
                & li {
                    width: ${100 / categoryCountPerSmallScreen}%;
                }        
            }    
        }
    }
    
    & .homepage-segment {
        padding: ${gaps.Common} 0;
        border-bottom: 10px solid ${colors.Pink};
        
        &:last-child {
            border-bottom: 0;
        }
        
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
            
            & > a {
                text-decoration: none;
                font-size: ${fontSizes.Small};
                color: ${colors.GrayDarker};
                
                & .card-image {
                    vertical-align: top;
                }
                
                & .caption {
                    margin-top: ${gaps.XSmall};
                    ${commonStyle.textOverflowStyle};
                }
            }
        }
        
        &.top-content {
            border-bottom: 0;
            background: url(${BGLogo}) center right / contain no-repeat;
            background-color: ${colors.Pink};
        
            & h3.title {
                color: ${colors.White};
            }
        }
    }
`;
