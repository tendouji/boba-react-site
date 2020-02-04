import flyd from "flyd";

export enum PageType {
    Home = 'home',
    Friends = 'friends',
    Gift = 'gift',
    Voucher = 'voucher',
    Settings = 'settings',
}

export type UserInfoType = {
    username: string,
    id: string,
    voucherifyId: string,
    sourceId: string,
    displayName: string,
    email: string,
    imagePath: string,
    createdAt: string,
    friends: any[],
    notification: any[],
    giftList: any[],
    metadata: any,
}

export type SnackBarInfoType = {
    isShown: boolean,
    message: string,
    hasCTA?: boolean,
    CTAButtonLabel?: string,
    CTAClickHandler?: () => void,
    closeHandler?: () => void,
}

export type ShareInfoType = {
    isShare: boolean,
    _id: string,
    code: string,
    to: string[],
    from: string,
    status: string,
    type: string,
    createdAt: string,
    metadata: any,
}

export type GlobalStateInitialType = {
    userInfo: UserInfoType,
    curPage: string,
    isLoggedIn: boolean,
    shareInfo: ShareInfoType,
    showSnackBar: boolean,
    snackBarMessage: string,
    snackBarHasCTA: boolean,
    snackBarCTAButtonLabel: string,
    snackBarCTAClickHandler: () => void,
    snackBarCloseHandler: () => void,
}

export type GlobalActionType = {
    updateSnackBar: (info: SnackBarInfoType) => void,
    updateLoggedSession: (val: boolean) => void,
    updateCurPage: (val: PageType) => void,
    updateUserInfo: (info: UserInfoType) => void,
    updateShareInfo: (info: ShareInfoType) => void,
}

export const GlobalInitialState: GlobalStateInitialType = {
    userInfo: {
        username: '',
        id: '',
        voucherifyId: '',
        sourceId: '',
        displayName: '',
        email: '',
        imagePath: '',
        createdAt: '',
        friends: [],
        notification: [],
        giftList: [],
        metadata: null,
    },
    shareInfo: {
        isShare: false,
        _id: '',
        code: '',
        to: [],
        from: '',
        status: '',
        type: '',
        createdAt: '',
        metadata: null,
    },
    curPage: PageType.Home,
    isLoggedIn: false,
    showSnackBar: false,
    snackBarMessage: '',
    snackBarHasCTA: false,
    snackBarCTAButtonLabel: '',
    snackBarCTAClickHandler: () => null,
    snackBarCloseHandler: () => null,
};

const globalState: any = {
    GlobalInitialState,
    Actions: (update: flyd.Stream<unknown>): GlobalActionType => {
        return {
            updateSnackBar: (info: SnackBarInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.showSnackBar = info.isShown;
                    state.snackBarMessage = !!info.isShown ? info.message : '';
                    state.snackBarHasCTA = !!info.hasCTA;
                    state.snackBarCTAButtonLabel = !!info.CTAButtonLabel ? info.CTAButtonLabel : '';
                    state.snackBarCTAClickHandler = !!info.CTAClickHandler ? info.CTAClickHandler : () => null;
                    state.snackBarCloseHandler= !!info.closeHandler ? info.closeHandler : () => null;

                    return state;
                });
            },
            updateLoggedSession: (val: boolean) => {
                update((state: GlobalStateInitialType) => {
                    state.isLoggedIn = val;
                    return state;
                });
            },
            updateCurPage: (val: PageType) => {
                update((state: GlobalStateInitialType) => {
                    state.curPage = val;
                    return state;
                });
            },
            updateUserInfo: (info: UserInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.userInfo = info;
                    return state;
                });
            },
            updateShareInfo: (info: ShareInfoType) => {
                update((state: GlobalStateInitialType) => {
                    state.shareInfo = info;
                    return state;
                });
            }
        }
    }
};

export default globalState;