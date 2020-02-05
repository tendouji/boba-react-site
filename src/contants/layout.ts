type generalObjectType = {
    [key: string]: string
}

type colorType = generalObjectType;
type mediaBreakpointType = generalObjectType;
type elementSizeType = generalObjectType;
type cardSizeType = {
    [key: string]: number[]
};

const colors: colorType = {
    White: '#FFF',
    Black: '#222',
    GrayDarker: '#666',
    GrayDark: '#9B9095',
    Gray: '#d7d7d7',
    GrayLight: '#e5e5e5',
    GrayLighter: '#f5f5f5',
    Pink: '#FD7162',
    PinkLight: '#FFC8C2',

};

const mediaBreakpoints: mediaBreakpointType = {
    Medium: '37.5rem', // 600px
    Small: '25rem', // 400px
};

const elementSizes: {[key: string]: string | number}  = {
    AuthLogoSmall: '5.25rem', // 84px
    AuthLogoMedium: '7.5rem', // 120px
    MenuBarHeight: '4rem', // 54px
    SearchBarHeight: '2.5rem', // 40px
    MerchantLogoHeight: '5.625rem', // 90px
    GiftImageMaxWidth: '50rem', // 800px
    GiftImageRatioHeight: 40, // %
};

const gaps: elementSizeType = {
    XSmall: '0.3125rem', // 5px
    Small: '0.625rem', // 10px
    Common: '1rem', // 16px
    Large: '2rem', // 32px
};

const buttonSizes: elementSizeType = {
    Small: '1.875rem', // 30px
    Common: '2.5rem', // 40px
    Large: '3.125rem', // 50px
};

enum cardSizeLabels {
    SmallSquare = 'SmallSquare',
    Large = 'Large',
    Medium = 'Medium',
    Small = 'Small',
}

const cardSizes: cardSizeType = {
    [cardSizeLabels.Large]: [18.75, 11.25], // 300 x 180 px / ratio: 0.6
    [cardSizeLabels.Medium]: [15.625, 7.5], // 250 x 120 px
    [cardSizeLabels.Small]: [7.3125, 5.3125], // 117 x 85 px
    [cardSizeLabels.SmallSquare]: [5.625, 5.625, 1], // 90 x 90 px
};

const fontSizes: elementSizeType = {
    XSmall: '0.625rem', // 10px
    Small: '0.75rem', // 12px
    Common: '0.875rem', // 14px
    Large: '1rem', // 16px
    XLarge: '1.25rem', // 20px
};


const borderRadius: number = 6;
const boxShadow: string = '0 4px 3px rgba(0, 0, 0, 0.1);';

const commonStyle: generalObjectType = {
    floatClearStyle: `
        &:after {
        /* used to get auto height with float children */
            display: table;
            clear: both;
            content: '';
        }
    `,

    textOverflowStyle: `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    `,

    flexSpreadCenterStyle: `
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,

    blankListStyle: `
        padding: 0;
        margin: 0;
        list-style: none;
    `,

    scaledBGImageStyle: `
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    `,

    absoluteFullStyle: `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    `,
};


export {
    colors,
    gaps,
    mediaBreakpoints,
    elementSizes,
    buttonSizes,
    cardSizeLabels,
    cardSizes,
    fontSizes,

    borderRadius,
    boxShadow,

    commonStyle,
}