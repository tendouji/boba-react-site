import React from 'react';
import styled from 'styled-components';
import {
    buttonSizes,
    colors,
    fontSizes,
} from "../../constants/layout";


type RoundedButtonType = {
    text: string,
    onClick: () => void,
    colorHex?: string,
    size?: 'x-small' | 'small' | 'large' | 'x-large',
    fullWidth?: boolean,
    disabled?: boolean,
}

const RoundedButton: React.FC<RoundedButtonType> = ({text, onClick, colorHex, size, fullWidth, disabled}) => {
    return (
        <RoundedButtonWrapper
            className={[
                "rounded-button",
                (!!size? ` ${size}` : ''),
                (!!fullWidth? ' full-width' : ''),
            ].join('')}
            // height={'3rem'}
            onClick={onClick}
            {...(!!colorHex ? { colorHex } : {})}
            disabled={disabled}
        >{text}</RoundedButtonWrapper>
    );
};

export default RoundedButton;


interface RoundedButtonWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
    height?: string,
    colorHex?: string,
}

const RoundedButtonWrapper = styled('button')<RoundedButtonWrapperProps>`
    ${props => !!props.height ? `
        height: ${props.height};
        line-height: ${props.height};
        border-radius: calc(${props.height} / 2);
    ` : `
        height: ${buttonSizes.Common};
        line-height: ${buttonSizes.Common};
        border-radius: calc(${buttonSizes.Common} / 2);
    `}
    padding: 0 3rem;
    border: 0;
    color: ${colors.White};
    font-size: ${fontSizes.Common};
    font-weight: 500;
    text-align: center;
    background-color: ${props => !!props.colorHex ? props.colorHex : colors.Pink};
    white-space: nowrap;
    cursor: pointer;
    
    &:focus {
        outline: none;
    }
    
    &.small {
        height: ${buttonSizes.Small};
        line-height: ${buttonSizes.Small};
        border-radius: calc(${buttonSizes.Small} / 2);
    }
    
    &.large {
        height: ${buttonSizes.Large};
        line-height: ${buttonSizes.Large};
        border-radius: calc(${buttonSizes.Large} / 2);
    }
    
    &.full-width {
        width: 100%;
        box-sizing: border-box;
    }
    
    &:disabled {
        background-color: ${colors.Gray};
    }
`;