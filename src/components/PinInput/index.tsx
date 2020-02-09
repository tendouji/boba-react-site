import React from 'react';
import styled from 'styled-components';
import CodeInput, {Types} from "@m3-moretv/react-code-input";

import {
    colors,
    fontSizes,
    gaps
} from "../../constants/layout";
import {otpResendTimeout} from "../../constants/app";
import {pinVerifyInstruction} from "../../constants/text";
import {maskPhone} from "../../helpers";

import RoundedButton from "../Buttons";


type PinInputProps = {
    phoneNo: string,
    onClickHandler: (curPin: string) => void,
}

type PinInputState = {
    curPin: string,
    enableVerifyCodeButton: boolean,
    otpTimerID: any,
    otpError: boolean,
    timerValue: number,
    showResendTimer: boolean,
}

class PinInput extends React.Component<PinInputProps, PinInputState> {
    private tickCount:number = 0;

    constructor(props: PinInputProps) {
        super(props);

        this.state = {
            enableVerifyCodeButton: false,
            curPin: '',
            otpTimerID: null,
            otpError: false,
            timerValue: otpResendTimeout,
            showResendTimer: false,
        };
    }

    componentDidMount() {
        this.startOTP();
    }

    componentWillUnmount() {
        clearInterval(this.state.otpTimerID);
        this.tickCount = 0;
    }

    startOTP = () => {
        this.setState({
            timerValue: otpResendTimeout,
            showResendTimer: false,
            otpError: false,
            otpTimerID: setInterval(() => this.otpTick(), 1000)
        });
    };

    otpTick = () => {
        this.tickCount++;
        let timeRemaining = otpResendTimeout - this.tickCount;

        if (timeRemaining >= 0) {
            this.setState({
                showResendTimer: false,
                timerValue: timeRemaining
            });
        } else {
            clearInterval(this.state.otpTimerID);
            this.tickCount = 0;
            this.setState({
                showResendTimer: true,
                timerValue: 0
            });
        }
    }

    pinChangeHandler = (inputVal: string) => {
        if(inputVal.length === 6) {
            this.setState({
                curPin: inputVal,
                enableVerifyCodeButton: true
            });
        } else {
            this.setState({ enableVerifyCodeButton: false });
        }
    };

    verifyCodeHandler = () => {
        const { onClickHandler } = this.props;
        const { curPin, } = this.state;

        if(!!onClickHandler && typeof onClickHandler === 'function') {
            onClickHandler(curPin);
        }
    };

    resendCode = (e: any) => {
        e.preventDefault();

        // trigger OTP api here

        this.startOTP();
    };

    render() {
        const { phoneNo } = this.props;
        const {
            timerValue,
            showResendTimer,
            enableVerifyCodeButton
        } = this.state;

        return (<>
            {pinVerifyInstruction(maskPhone(phoneNo))}

            <PinInputWrapper className="pin-input">
                <CodeInput
                    name="pin-code"
                    type={Types.number}
                    fields={6}
                    value=""
                    onChange={this.pinChangeHandler}
                />
            </PinInputWrapper>

            <div className="cta-area">
                <div className="resend-area">
                    { !!showResendTimer
                        ? <a href="#resendCode" onClick={this.resendCode}>{'Resend Code'}</a>
                        : <span className="disabled-text">{'Time remaining:'} {timerValue}s</span>
                    }
                </div>

                <RoundedButton text="Start Gifting" onClick={this.verifyCodeHandler} disabled={!enableVerifyCodeButton} />
            </div>
        </>);
    }
}

export default PinInput;


const pinHeight: string = '2rem';
const PinInputWrapper = styled.div`
    display: flex;
    height: ${pinHeight};
    margin: ${gaps.Common} 0;
    
    & [name="pin-code"] {
        width: 2rem;
        height: 100%;
        margin-right: ${gaps.Small};
        padding: 0;
        border: 0;
        border-bottom: 2px solid ${colors.Black};
        box-sizing: border-box;
        font-size: ${fontSizes.Large};
        text-align: center;
        /*
        background: -o-linear-gradient(left, #d1d1d1 2px, white 2px); // Opera
        background: -moz-linear-gradient(left, #d1d1d1 2px, white 2px); // Firefox
        background: -webkit-linear-gradient(left, #d1d1d1 2px, white 2px); // WebKit
        background: linear-gradient(0deg, #000 2px, white 2px);
        background-position: 0 calc(-${pinHeight} / 2 + 1px);
        background-repeat: no-repeat;
        background-size: contain;
        */
        -moz-appearance: textfield;
        
        &:focus {
            outline: none;
        }
    }
    
    & input[type=number]::-webkit-inner-spin-button, 
    & input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`;