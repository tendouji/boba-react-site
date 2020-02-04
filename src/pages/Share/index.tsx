import React from 'react';
import styled from 'styled-components';

// import RoundedPanel from "../../components/RoundedPanel";
// import RoundedButton from "../../components/Buttons";

import {apiService} from "../../services/api";
import {GlobalInitialState, ShareInfoType} from "../../services/globalState";
import {BGCurve} from '../../assets';
import {gaps} from "../../contants/layout";
import {routes} from "../../contants/routes";

import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import Preloader from "../../components/Preloader";


interface ShareProps extends WithMeiosisProps {
    [key: string]: any;
}

interface ShareState extends WithMeiosisProps {
    linkId: string;
    actionData: ShareInfoType;
    isLoading: boolean;
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
            })
        });
    }

    onGetActionDataByLinkIdSuccess = (data: any) => {
        this.setState({ actionData: data.result }, () => {

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
                                campaignImagePath: data2.result.imagePath,
                            }
                        }
                    });

                    apiService.ApiCall.HasSession({
                        onSuccess: this.onCheckSessionSuccess,
                        onError: this.onCheckSessionFailed,
                    });
                },
            });

        });
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
        const { isLoading } = this.state;

        return (<>
            { !!isLoading ? (
                <Preloader isShown={true} message={'redirecting...'} />
            ) : (
                <ShareWrapper className="share-screen">
                    some content here

                    {/*<div className="cta-area">
                        <Link to={routes.SIGNUP}>Sign up new account</Link>
                        <RoundedButton text="Sign In" onClick={this.clickHandler} disabled={!enableLoginButton} />
                    </div>*/}
                </ShareWrapper>
            )}
        </>);
    }
}

export default withMeiosis(Share);


const ShareWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    // background: url(${BGCurve}) center top / contain no-repeat;
    
    & .rounded-panel {
        padding: 0 ${gaps.Common} ${gaps.Common};
        transition: padding 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
        
        &.focused {
            padding: ${gaps.Common};
        }
    }
    
    & .cta-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: ${gaps.Large};
    }
`;
