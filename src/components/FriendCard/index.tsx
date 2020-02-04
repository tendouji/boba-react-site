import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import {
    cardSizeLabels,
    cardSizes,
    colors,
    fontSizes,
    gaps,
    commonStyle
} from "../../contants/layout";
import ImageCard from "../ImageCard";
import {ProfileDefault} from "../../assets";


type FriendCardProps = {
    name: string,
    imagePath?: string,
    isURL?: boolean,
    urlPath?: string,
    urlState?: any,
}

const FriendCard: React.FC<FriendCardProps> = ({name, imagePath, isURL, urlPath = '', urlState}) => {
    const InnerContent = <>
        <ImageCard
            size={cardSizeLabels.SmallSquare}
            title={name}
            imagePath={(!!imagePath && imagePath !== '' ? imagePath : String(ProfileDefault))}
        />
        <div className="caption" style={{width: `${cardSizes[cardSizeLabels.SmallSquare][1]}rem`}}>
            {name}
        </div>
    </>;

    return (!!isURL ? (
        <FriendCardLinkWrapper
            className="friend-card"
            to={{
                pathname: urlPath,
                ...(!!urlState ? {state: urlState} : {})
            }}
        >{InnerContent}</FriendCardLinkWrapper>
    ) : (
        <FriendCardDivWrapper className="friend-card">{InnerContent}</FriendCardDivWrapper>
    ));
};

export default FriendCard;


const commonStyleStr = `
    color: ${colors.GrayDarker};
                
    & .card-image {
        vertical-align: top;
    }                
    
    & .caption {
        margin-top: ${gaps.XSmall};
        ${commonStyle.textOverflowStyle}
    }
`;

const FriendCardLinkWrapper = styled(Link)`
    text-decoration: none;
    font-size: ${fontSizes.Small};
    
    ${commonStyleStr}
`;

const FriendCardDivWrapper = styled.div`
    ${commonStyleStr}
`;



type FriendCardHorizontalProps = {
    name: string,
    imagePath: string,
    message?: string,
}

const FriendCardHorizontal: React.FC<FriendCardHorizontalProps> = ({name, imagePath, message = ''}) => {
    return (
        <FriendCardHorizontalWrapper className="friend-card-horizontal">
            <ImageCard
                size={cardSizeLabels.SmallSquare}
                title={name}
                imagePath={imagePath}
            />
            <div className="text">
                <div className="name">{name}</div>
                <div className="message">{message}</div>
            </div>
        </FriendCardHorizontalWrapper>
    );
};

export { FriendCardHorizontal };


const FriendCardHorizontalWrapper = styled.div`
    ${commonStyle.flexSpreadCenterStyle}
    
    & .card-image { }
    
    & .text {
        width: calc(100% - ${cardSizes[cardSizeLabels.SmallSquare][1]}rem - ${gaps.Common});
        font-size: ${fontSizes.Common};
        line-height: 1.5em;
        
        & .name {
            color: ${colors.Pink};
            font-size: ${fontSizes.Large};
            font-weight: 700;
        }
        
        & .message { }
    }
`;


