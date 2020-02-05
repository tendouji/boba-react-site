import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import {
    cardSizeLabels,
    cardSizes,
    colors,
    fontSizes,
    gaps,
    commonStyle, borderRadius
} from "../../contants/layout";
import {ProfileDefault} from "../../assets";
import {checkImageURL} from "../../helpers";



type ProfileCardProps = {
    title: string,
    imagePath: string,
    className?: string,
}

const ProfileCard = (props: ProfileCardProps) => {
    const [filteredPath, setImage] = useState('');

    useEffect(() => {
        async function checkImage(path: string) {
            const data: any = await checkImageURL(path);
            setImage(!!data.loaded ? path : String(ProfileDefault));
        }
        checkImage(props.imagePath);
    }, [props.imagePath]);

    return (<>{ filteredPath !== '' ? (
        <ProfileCardWrapper className={[
            "card-image",
            (!!props.className && props.className !== '' ? ` ${props.className}` : '')
        ].join('')}>
            <div className="image" style={{backgroundImage: `url(${filteredPath})`}}>
                {props.title}
            </div>
        </ProfileCardWrapper>
    ) : null }</>)
};


interface ProfileCardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: cardSizeLabels,
}

const ProfileCardWrapper = styled('div')<ProfileCardWrapperProps>`
    display: inline-block;
    width: ${cardSizes[cardSizeLabels.SmallSquare][0]}rem;
    
    & .image {
        padding-bottom: calc(100%  - 2px); // NOTE: 2px for border top and bottom
        width: 100%;
        height: 0;
        border: 1px solid ${colors.Pink};
        border-radius: ${borderRadius}px;
        box-sizing: border-box;
        background: ${colors.White} center / cover no-repeat;
        font-size: 0;
    }
`;

export { ProfileCard };



type FriendCardProps = {
    name: string,
    imagePath?: string,
    isURL?: boolean,
    urlPath?: string,
    urlState?: any,
}

const FriendCard: React.FC<FriendCardProps> = ({name, imagePath, isURL, urlPath = '', urlState}) => {
    const InnerContent = <>
        <ProfileCard
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
            <ProfileCard
                title={name}
                imagePath={(!!imagePath && imagePath !== '' ? imagePath : String(ProfileDefault))}
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


