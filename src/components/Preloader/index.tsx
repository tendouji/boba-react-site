import React from "react";
import styled from "styled-components";
import {
    colors,
    fontSizes,
    gaps
} from "../../contants/layout";
import { Preloader as IconPreloader } from "../../assets";


interface PreloaderProps {
    isShown: boolean,
    message?: string,
}

interface PreloaderState {
    [key: string]: any,
}

class Preloader extends React.Component<PreloaderProps, PreloaderState> {
    constructor(props: PreloaderProps) {
        super(props);

        this.state = {
            isShown: false,
            message: 'Loading...'
        }
    }

    componentDidMount() {
        const { isShown, message } = this.props;
        this.setState({ isShown });
        if(!!message) {
            this.setState({ message });
        }
    }

    componentDidUpdate(prevProps: PreloaderProps) {
        if(prevProps.isShown !== this.props.isShown) {
            this.setState({ isShown: this.props.isShown });
        }
    }


    render() {
        const { isShown, message } = this.state;

        return (
            <PreloaderWrapper className={[
                "preloader",
                (!!isShown ? ' show' : '')
            ].join('')}>
                <div className="content">
                    <div className="icon"><IconPreloader /></div>
                    <div className="text">{message}</div>
                </div>
            </PreloaderWrapper>
        );
    }
}

export default Preloader;


const PreloaderWrapper = styled.div`
    display: none;
    height: 100%;
    background-color: rgba(255,255,255,0.8);
    justify-content: center;
    align-items: center;
    
    & .content {
        font-size: ${fontSizes.XSmall};
        text-align: center;
        color: ${colors.GrayDarker};
        
        & .icon {
            display: inline-block; 
            width: 60px;
            height: 60px;
            margin-bottom: ${gaps.XSmall};
            
            & > svg {
                height: 100%;
                width: 100%;
            }
        }
    }
    
    &.show {
        display: flex;
    }
`;