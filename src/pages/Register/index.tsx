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
import withMeiosis, {WithMeiosisProps} from "../../components/HOC";
import {setSessionStorage} from "../../helpers";
import {sessionStorageKey} from "../../contants/app";


interface RegisterProps extends WithMeiosisProps {
    [key: string]: any
}

interface RegisterState extends WithMeiosisProps {
    isPanelFocused: boolean,
    enableSignUpButton: boolean,
    isVerifyCode: boolean,
    curPhone: string,
    linkId: string,
    giftImage: string,
    [key: string]: any;
}

class Register extends React.Component<RegisterProps, RegisterState> {
    private userNameRef: React.RefObject<HTMLInputElement>;

    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            isPanelFocused: false,
            enableSignUpButton: false,
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

        if(!!globalStates!.shareInfo.isShare) { // NOTE: has share data
            this.setState({
                linkId: globalStates!.shareInfo.code,
                giftImage: globalStates!.shareInfo.metadata.voucherData.campaignImagePath,
            });
        }
    };

    clickHandler = () => {
        const usernameVal = this.userNameRef.current!.value;
        this.setState({ curPhone: usernameVal });

        apiService.ApiCall.RegisterSMS({
            username: usernameVal,
            onSuccess: this.onRegisterSMSSuccess,
            onError: this.onRegisterSMSError,
        });
    };

    onRegisterSMSSuccess = (data: any) => {
        if(+data.code === 200) {
            this.setState({ isVerifyCode: true });
        } else {
            this.onRegisterSMSError(data);
        }
    };

    onRegisterSMSError = (data: any) => {
        const { globalActions } = this.props;

        switch(data.status.message) {
            case 'Phone already registered':
                globalActions.updateSnackBar({
                    isShown: true,
                    message: `The number you input is already registered. Would you like to Sign In instead?`,
                    hasCTA: true,
                    CTAButtonLabel: 'Sign In',
                    CTAClickHandler: this.goToSignIn
                });
                break;
            default:

        }
    };

    changeHandler = () => {
        const usernameVal = this.userNameRef.current!.value;
        this.setState({ enableSignUpButton: (usernameVal !== '') });
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

        apiService.ApiCall.RegisterFinalised({
            username: curPhone,
            shortcode: curPin,
            onSuccess: this.onRegisterFinalisedSuccess,
            onError: this.onRegisterFinalisedError,
        });
    };

    onRegisterFinalisedSuccess = (data: any) => {
        const { history } = this.props;

        if(+data.code === 200) {
            setSessionStorage(sessionStorageKey.user, data.result);

            history.push({
                pathname: routes.HOME,
                state: {
                    isRegister: true,
                    userInfo: data.result,
                }
            });
        } else {
            this.onRegisterFinalisedError(data);
        }
    };

    onRegisterFinalisedError = (data: any) => {
        console.log('error', data);
    };

    goToSignIn = () => {
        const { history } = this.props;
        history.replace({ pathname: routes.SIGNIN });
    };

    render() {
        const {
            isPanelFocused,
            enableSignUpButton,
            isVerifyCode,
            curPhone,
            linkId,
            giftImage,
        } = this.state;

        return (
            <RegisterWrapper className="register-screen">
                { !isVerifyCode ? (
                    <AuthForm
                        title="Sign Up"
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
                            <Link to={routes.SIGNIN}>Sign in to your account</Link>
                            <RoundedButton text="Sign Up" onClick={this.clickHandler} disabled={!enableSignUpButton} />
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
            </RegisterWrapper>
        );
    }
}

export default withMeiosis(Register);


const RegisterWrapper = styled.div`
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
