import React from "react";

import {PageType} from "../services/globalState";
import {
    IconCalendar,
    IconFriends,
    IconGift,
    IconSettings,
    IconVoucher,

    IconBeauty,
    IconDining,
    IconFashion,
    IconSupermarket,
    SocialMail,
    SocialPhone,
    SocialFB,
    SocialMessenger,
    SocialWhatsapp,
} from "../assets";

const otpResendTimeout = 30;
const snackBarLifeSpan = 5;
const snackBarShowDelay = 0.5;

const sessionStorageKey: {[key: string]: string} = {
    user: 'userSessionObj',
    gift: 'giftSessionObj',
};

const categoryLinks: {[key: string]: any} = {
    beauty: <IconBeauty />,
    dining: <IconDining />,
    fashion: <IconFashion />,
    supermarket: <IconSupermarket />,
};

const menuBarLinks = [{
    name: 'Home',
    path: '/main',
    label: PageType.Home,
    icon: IconCalendar,
}, {
    name: 'Friends',
    path: '/friends',
    label: PageType.Friends,
    icon: IconFriends,
}, {
    name: 'Gift',
    path: '/gift',
    label: PageType.Gift,
    icon: IconGift,
}, {
    name: 'Voucher',
    path: '/voucher',
    label: PageType.Voucher,
    icon: IconVoucher,
}, {
    name: 'Settings',
    path: '/settings',
    label: PageType.Settings,
    icon: IconSettings,
}];

const brandDetailsLinks: {[key: string]: any} = [{
    label: 'Store Web',
    icon: <IconBeauty />,
    path: '/store-web',
}, {
    label: 'Directions',
    icon: <IconBeauty />,
    path: '/directions',
}, {
    label: 'Contact',
    icon: <IconBeauty />,
    path: '/contact',
}];

const pageComponentList: string[] = [
    'Main',
    'GiftDetails',
];

const socialShareList = [{
    label: 'Mail',
    icon: SocialMail,
    key: 'email',
}, {
    label: 'Phone',
    icon: SocialPhone,
    key: 'phone',
}, {
    label: 'Facebook',
    icon: SocialFB,
    key: 'fb',
}, {
    label: 'Messenger',
    icon: SocialMessenger,
    key: 'fbmsg',
}, {
    label: 'Whatsapp',
    icon: SocialWhatsapp,
    key: 'whatsapp',
}];



export {
    sessionStorageKey,
    otpResendTimeout,
    snackBarLifeSpan,
    snackBarShowDelay,
    categoryLinks,
    menuBarLinks,
    brandDetailsLinks,
    pageComponentList,
    socialShareList,
}