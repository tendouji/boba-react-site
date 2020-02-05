import React from 'react';
import styled from 'styled-components';

// import RoundedPanel from "../../components/RoundedPanel";
// import RoundedButton from "../../components/Buttons";

import {apiService} from "../../services/api";
import {GlobalInitialState, ShareInfoType} from "../../services/globalState";
import {BGCurve} from '../../assets';
import {borderRadius, colors, gaps, elementSizes} from "../../contants/layout";
import {routes} from "../../contants/routes";

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import Preloader from "../../components/Preloader";
import ErrorPanel from "../../components/ErrorPanel";
import {FriendCardHorizontal} from "../../components/FriendCard";
import {Imager} from "../../components/ImageCard";
import {removeLastSlash} from "../../helpers";
import RoundedButton from "../../components/Buttons";


interface ShareProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ShareState extends WithMeiosisProps {
    linkId: string;
    actionData: ShareInfoType;
    isLoading: boolean;
    isError: boolean;
    [key: string]: any;
}

class Share extends React.Component<ShareProps, ShareState> {
    private userNameRef: React.RefObject<HTMLInputElement>;

    constructor(props: ShareProps) {
        super(props);

        this.state = {
            linkId: '',
            actionData: GlobalInitialState.shareInfo,
            isLoading: true,
            isError: false,
            ...props.globalStates!
        };

        this.userNameRef = React.createRef();
    }

    componentDidMount() {
        const { routeParams } = this.props;
        this.setState({ linkId: routeParams.linkId }, () => {
            apiService.ApiCall.GetActionDataByLinkId({
                linkId: this.state.linkId,
                onSuccess: this.onGetActionDataByLinkIdSuccess,
                onError: this.onGetActionDataByLinkIdError,
            })
        });
    }

    onGetActionDataByLinkIdSuccess = (data: any) => {
        this.setState({ actionData: data.result }, () => {
            if(!!data.result) {
                apiService.ApiCall.GetCampaignLabelImageById({
                    campaignId: data.result.metadata.voucherData.campaignId,
                    onSuccess: (data2: any) => {
                        const { globalActions } = this.props;
                        const { actionData } = this.state;
                        globalActions.updateShareInfo({
                            isShare: true,
                            ...actionData,
                            metadata: {
                                ...actionData.metadata,
                                voucherData: {
                                    ...actionData.metadata.voucherData,
                                    campaignImagePath: data2.result.campaignImagePath,
                                }
                            }
                        });

                        apiService.ApiCall.HasSession({
                            onSuccess: this.onCheckSessionSuccess,
                            onError: this.onCheckSessionFailed,
                        });
                    },
                });

                return;
            }
            this.setState({ isError: true });
        });
    };

    onGetActionDataByLinkIdError = (data: any) => {
        this.setState({ isError: true });
    };

    onCheckSessionSuccess = () => {
        this.setState({ isLoading: false });
    };

    onCheckSessionFailed = () => {
        const { history } = this.props;
        history.replace({ pathname: routes.SIGNIN + `/${this.state.linkId}` });
    };

    clickHandler = () => {

        const usernameVal = this.userNameRef.current!.value;

        this.setState({ curPhone: usernameVal });


    };

    render() {
        const { history, globalStates } = this.props;
        const { isLoading, isError } = this.state;

        return (<>
            { !!isError ? (
                <ErrorPanel
                    history={history}
                    title="Area 404"
                    message={`We can't seem to find the page you were looking for.<br />You can search our available gifts or return to home page.`}
                />
            ) : ( !!isLoading ? (
                <Preloader isShown={true} message={'redirecting...'} />
            ) : (
                <ShareWrapper className="share-screen">
                    <div className="receive-gift-header">
                        <FriendCardHorizontal
                            name={globalStates!.shareInfo.metadata.fromDisplayName}
                            imagePath={'globalStates!.shareInfo.metadata.voucherData.campaignImagePath'}
                            message={'sent you a gift!'}
                        />
                    </div>

                    <div className="rounded-panel">
                        <div className="gift-image-resizer">
                            <div className="gift-image-holder">
                                <Imager
                                    className="gift-card"
                                    title={'voucherInfo.campaign'}
                                    imagePath={removeLastSlash(apiService.apiBasePath) + globalStates!.shareInfo.metadata.voucherData.campaignImagePath}
                                />
                            </div>
                        </div>
                        <div className="gift-message"
                             style={{backgroundImage: `url(${globalStates!.shareInfo.metadata.cardData.designType})`}}>
                            { globalStates!.shareInfo.metadata.cardData.message }
                        </div>
                    </div>

                    <div className="cta-area">
                        <RoundedButton text="Send A Thank You Note" onClick={this.clickHandler} fullWidth={true} />
                        <RoundedButton text="View Your Gift" onClick={this.clickHandler} fullWidth={true} colorHex={colors.GrayDarker} />
                    </div>
                </ShareWrapper>
            )) }
        </>);
    }
}

export default withMeiosis(Share);


const ShareWrapper = styled.div`
    height: 100%;
    padding: ${gaps.Common};
    // background: url(${BGCurve}) center top / contain no-repeat;

    & .receive-gift-header {
        // padding: 0 ${gaps.Common};
        
        & h2 {}
        
        & .friend-card-horizontal { }
    }
    
    & .rounded-panel {
        margin-top: ${gaps.Large};
        border: 1px solid ${colors.Pink};
        border-radius: ${borderRadius}px;
        overflow: hidden;
        
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
                    background: ${colors.Gray} center / cover no-repeat;
                }
            }
        }  
        
        & .gift-message {
            padding: ${gaps.Common};
            min-height: 8rem;
        }
    }
    
    & .cta-area {
        margin-top: ${gaps.Common};
        
        & .rounded-button {
            margin-top: ${gaps.Small};
        }
    }
`;
