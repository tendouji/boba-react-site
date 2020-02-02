import React from "react";
import styled from "styled-components";
import {
    borderRadius,
    buttonSizes,
    colors,
    commonStyle,
    elementSizes,
    fontSizes, gaps
} from "../../contants/layout";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RoundedButton from "../Buttons";


interface SnackBarProps {
    isShown: boolean,
    content: string,
    onClose: () => void,
    hasCTA?: boolean,
    CTAButtonLabel?: string,
    onCTAClick?: () => void,
}

interface SnackBarState {
    [key: string]: any,
}

class SnackBar extends React.Component<SnackBarProps, SnackBarState> {
    constructor(props: SnackBarProps) {
        super(props);
    }

    componentDidMount() {
        const { isShown } = this.props;
        this.setState({ show: isShown });
    }

    componentDidUpdate(prevProps: SnackBarProps) {
        if(prevProps.isShown !== this.props.isShown) {
            this.setState({ show: this.props.isShown });
            /*setTimeout(() => {
                if(this.state.isShown) {
                    this.closeHandler();
                }
            }, snackBarLifeSpan);*/
        }
    }

    onCTAClickHandler = () => {
        const { onCTAClick } = this.props;
        if(!!onCTAClick) {
            onCTAClick();
        }

        this.onCloseHandler();
    };

    onCloseHandler = () => {
        const { onClose } = this.props;
        onClose();
    };


    render() {
        const {
            isShown,
            content,
            hasCTA,
            CTAButtonLabel
        } = this.props;

        return (
            <SnackBarWrapper className={[
                "snack-bar",
                (!!isShown ? ' show' : '')
            ].join('')}>
                <div className="content"><span dangerouslySetInnerHTML={{__html: content}} /></div>
                { !!hasCTA && (
                    <RoundedButton text={CTAButtonLabel!} onClick={this.onCTAClickHandler!} />
                )}
                <button className="close-button" onClick={this.onCloseHandler}>
                    <HighlightOffIcon style={{ color: colors.Pink }} />
                </button>
            </SnackBarWrapper>
        );
    }
};

export default SnackBar;


const SnackBarWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: -200px;
    left: ${gaps.Common};
    width: calc(100% - 2 * ${gaps.Common});
    padding: ${gaps.Common};
    box-sizing: border-box;
    border: 1px solid ${colors.Gray};
    border-radius: ${borderRadius}px;
    background-color: ${colors.White};
    justify-content: space-between;
    align-items: center;
    transition: bottom 200ms;
    
    & .content {
        
    }
    
    & .rounded-button {
        margin-left: ${gaps.Small};
    }
    
    & .close-button {
        position: absolute;
        top: calc(-${buttonSizes.Small} / 3);
        right: calc(-${buttonSizes.Small} / 3);
        height: ${buttonSizes.Small};
        width: ${buttonSizes.Small};
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: ${colors.White};
        cursor: pointer;
        
        &:focus {
            outline: none;
        }
        
        & > svg {
            width: 100%;
            height: 100%;
        }
    }
    
    &.show {
        bottom: ${gaps.Common};
    }
    

    
    & .input-holder {
        height: ${elementSizes.SearchBarHeight};
        
        & input[type="text"] {
            float: left;
            width: calc(100% - ${elementSizes.SearchBarHeight} - ${gaps.Small});
            padding: 0 ${gaps.Common};
            line-height: ${elementSizes.SearchBarHeight};
            border: 0;
            box-sizing: border-box;
            background: transparent;
            font-size: ${fontSizes.Common};
            
            &:focus {
                outline: none;
            }
        }
        
        & .search-button {
            float: right;
            height: ${elementSizes.SearchBarHeight};
            width: ${elementSizes.SearchBarHeight};
            border: 0;
            background: transparent;
            
            &:focus {
                outline: none;
            }
        }
    }
    
    & > ul {
        display: flex;
        height: 100%;
        ${commonStyle.blankListStyle}
        
        & li {
            height: 100%;
            width: 25%;
            
            & > a {
                position: relative;
                display: flex;
                height: 100%;
                text-align: center;
                text-decoration: none;
                box-sizing: border-box;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
                & .icon {
                    line-height: 1em;
                    height: ${buttonSizes.Common};
                    width: ${buttonSizes.Common};
                    
                    & > svg {
                        height: 100%;
                        width: 100%;
                    }
                }
                
                & .text {
                    font-size: ${fontSizes.Small};
                    line-height: ${fontSizes.Small};
                }
            }
            
            &.active {
                & > a {
                    &:before {
                        position: absolute;
                        top: 0;
                        left: 20%;
                        height: 3px;
                        width: 60%;
                        content: '';
                        background: ${colors.Pink};
                    }
                }        
            }
        }
    }
`;