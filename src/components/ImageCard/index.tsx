import React from 'react';
import styled from 'styled-components';
import {
    borderRadius,
    cardSizeLabels,
    cardSizes,
    colors,
} from "../../contants/layout";


type ImageCardProps = {
    title: string,
    imagePath: string,
    size?: cardSizeLabels,
}

const ImageCard: React.FC<ImageCardProps> = ({title, imagePath, size}) => {
    return (
        <ImageCardWrapper className="card-image" size={size}>
            <div className="image" style={{backgroundImage: `url(${imagePath})`}}>
                {title}
            </div>
        </ImageCardWrapper>
    );
};

export default ImageCard;


interface ImageCardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: cardSizeLabels,
}

const ImageCardWrapper = styled('div')<ImageCardWrapperProps>`
    display: inline-block;
    ${props => {
        const size = !!props.size ? cardSizeLabels[props.size] : cardSizeLabels.Small;
        return `width: ${cardSizes[size][0]}rem;`;
    }}
    
    & .image {
        ${props => {
            const size = !!props.size ? cardSizeLabels[props.size] : cardSizeLabels.Small;
            const w = cardSizes[size][0];
            const ratio = cardSizes[size][1] / cardSizes[size][0] * 100;
            return `
                padding-bottom: calc(${ratio}%  - 2px); // NOTE: 2px for border top and bottom
            `;
        }}
        width: 100%;
        height: 0;
        border: 1px solid ${colors.Pink};
        border-radius: ${borderRadius}px;
        box-sizing: border-box;
        background: ${colors.GrayDarker} center / cover no-repeat;
        font-size: 0;
    }
`;