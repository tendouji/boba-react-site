import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    borderRadius,
    cardSizeLabels,
    cardSizes,
    colors,
} from "../../contants/layout";
import {ProductDefault} from '../../assets';
import {checkImageURL} from "../../helpers";


type ImageCardProps = {
    title: string,
    imagePath: string,
    className?: string,
    size?: cardSizeLabels,
}

const ImageCard = (props: ImageCardProps) => {
    const [filteredPath, setImage] = useState('');

    useEffect(() => {
        async function checkImage(path: string) {
            const data: any = await checkImageURL(path);
            setImage(!!data.loaded ? path : String(ProductDefault));
        }
        checkImage(props.imagePath);
    }, [props.imagePath]);

    return (<>{ filteredPath !== '' ? (
        <ImageCardWrapper className={[
            "card-image",
            (!!props.className && props.className !== '' ? ` ${props.className}` : '')
        ].join('')} size={props.size}>
            <div className="image" style={{backgroundImage: `url(${filteredPath})`}}>
                {props.title}
            </div>
        </ImageCardWrapper>
    ) : null }</>)
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



const Imager = (props: ImageCardProps) => {
    const [filteredPath, setImage] = useState('');

    useEffect(() => {
        async function checkImage(path: string) {
            const data: any = await checkImageURL(path);
            setImage(!!data.loaded ? path : String(ProductDefault));
        }
        checkImage(props.imagePath);
    }, [props.imagePath]);

    return (<>{ filteredPath !== '' ? (
        <ImagerWrapper
            className={[
                "card-image",
                (!!props.className && props.className !== '' ? ` ${props.className}` : '')
            ].join('')}
            style={{backgroundImage: `url(${filteredPath})`}}>{props.title}</ImagerWrapper>
    ) : null }</>)
};


export { Imager };


const ImagerWrapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    background: ${colors.GrayDarker} center / cover no-repeat;
    font-size: 0;
`;