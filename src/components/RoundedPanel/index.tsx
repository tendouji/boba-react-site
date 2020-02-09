import React from 'react';
import styled from 'styled-components';
import {
    borderRadius,
    boxShadow,
    colors,
    gaps
} from "../../constants/layout";


type RoundedPanelProps = {
    padded: boolean,
    hasShadow: boolean,
    children: any,
    className?: string,
}

const RoundedPanel: React.FC<RoundedPanelProps> = ({padded, hasShadow, children, className}) => {
    return (
        <RoundedPanelWrapper
            className={[
                "rounded-panel",
                (!!className ? ` ${className}` : '')
            ].join('')}
            padded={padded}
            hasShadow={hasShadow}
        >
            {children}
        </RoundedPanelWrapper>
    );
};

export default RoundedPanel;


type RoundedPanelWrapperType = {
    padded: boolean,
    hasShadow: boolean,
}

const RoundedPanelWrapper = styled('div')<RoundedPanelWrapperType>`
    ${props => !!props.padded ? `padding: ${gaps.Common};` : ''}
    border: 1px solid ${colors.PinkLight};
    border-radius: ${borderRadius}px;
    background: ${colors.White};
    ${props => !!props.hasShadow ? `box-shadow: ${boxShadow};` : ''}
`;