import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import AuthForm from "../../components/AuthForm";
import IconTextField from '../../components/IconTextField';
import RoundedPanel from "../../components/RoundedPanel";
import PinInput from "../../components/PinInput";
import RoundedButton from "../../components/Buttons";

import {gaps} from "../../contants/layout";
import {routes} from "../../contants/routes";
import {apiService} from "../../services/api";
import {BGCurve} from '../../assets';
import {setSessionStorage} from "../../helpers";
import {sessionStorageKey} from "../../contants/app";
import withMeiosis, {WithMeiosisProps} from "../../components/HOC";



interface LoginProps extends WithMeiosisProps {
    [key: string]: any;
}

interface LoginState extends WithMeiosisProps {
    isPanelFocused: boolean,
    enableLoginButton: boolean,
    isVerifyCode: boolean,
    curPhone: string,
    linkId: string,
    giftImage: string,
    [key: string]: any;
}

class Login extends React.Component<LoginProps, LoginState> {
    private userNameRef: React.RefObject<HTMLInputElement>;

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            isPanelFocused: false,
            enableLoginButton: false,
            isVerifyCode: false,
            curPhone: '',
            linkId: '',
            giftImage: '',
            ...props.globalStates!
        };

        this.userNameRef = React.createRef();
    }

    componentDidMount() {
        const { globalStates } = this.props;

        if(!!globalStates!.shareInfo.isShare) {
            this.setState({
                linkId: globalStates!.shareInfo.code,
                giftImage: globalStates!.shareInfo.metadata.voucherData.campaignImagePath,
            });
        }
    }

    clickHandler = () => {
        const usernameVal = this.userNameRef.current!.value;
        this.setState({ curPhone: usernameVal });

        apiService.ApiCall.LoginSMS({
            username: usernameVal,
            onSuccess: this.onLoginSMSSuccess,
            onError: this.onLoginSMSError,
        });
    };

    onLoginSMSSuccess = (data: any) => {
        if(+data.code === 200) {
            this.setState({ isVerifyCode: true });
        } else {
            this.onLoginSMSError(data);
        }
    };

    onLoginSMSError = (data: any) => {
        console.log('error', data);
    };

    changeHandler = () => {
        const usernameVal = this.userNameRef.current!.value;
        this.setState({ enableLoginButton: (usernameVal !== '') });
    };

    focusHandler = () => {
        this.setState({ isPanelFocused: true });
    };

    blurHandler = () => {
        const usernameVal = this.userNameRef.current!.value;
        this.setState({ isPanelFocused: (usernameVal !== '') });
    };

    verifyCodeHandler = (curPin: string) => {
        const { curPhone } = this.state;

        apiService.ApiCall.LoginFinalised({
            username: curPhone,
            shortcode: curPin,
            onSuccess: this.onLoginFinalisedSuccess,
            onError: this.onLoginFinalisedError,
        });
    };

    onLoginFinalisedSuccess = (data: any) => {
        const { history } = this.props;

        if(+data.code === 200) {
            setSessionStorage(sessionStorageKey.user, JSON.stringify(data.result));

            history.push({
                pathname: routes.HOME,
                state: {
                    isRegister: false,
                    userInfo: data.result,
                }
            });
        } else {
            this.onLoginFinalisedError(data);
        }
    };

    onLoginFinalisedError = (data: any) => {
        console.log('error', data);
    };

    render() {
        const {
            isPanelFocused,
            enableLoginButton,
            isVerifyCode,
            curPhone,
            linkId,
            giftImage,
        } = this.state;

        return (
            <LoginWrapper className="login-screen">
                { !isVerifyCode ? (
                    <AuthForm
                        title="Sign In"
                        actionId={linkId}
                        giftImage={giftImage}
                    >
                        <RoundedPanel
                            padded={true}
                            hasShadow={true}
                            className={!!isPanelFocused ? 'focused' : ''}
                        >
                            <IconTextField
                                id="username"
                                type="tel"
                                label="Phone Number"
                                Icon={AccountCircleOutlined}
                                onFocus={this.focusHandler}
                                onBlur={this.blurHandler}
                                onChange={this.changeHandler}
                                ref={this.userNameRef}
                            />
                        </RoundedPanel>
                        <div className="cta-area">
                            <Link to={routes.SIGNUP + (!!linkId && linkId !== '' ? `/${linkId}` : '')}>Sign up new account</Link>
                            <RoundedButton text="Sign In" onClick={this.clickHandler} disabled={!enableLoginButton} />
                        </div>
                    </AuthForm>
                ) : (
                    <AuthForm title="Insert your code">
                        <PinInput
                            phoneNo={curPhone}
                            onClickHandler={this.verifyCodeHandler}
                        />
                    </AuthForm>
                )}
            </LoginWrapper>
        );
    }
}

export default withMeiosis(Login);


const LoginWrapper = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: url(${BGCurve}) center top / contain no-repeat;
    
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
