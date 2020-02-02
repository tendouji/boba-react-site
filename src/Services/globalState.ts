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

export type GlobalStateInitialType = {
    userInfo: UserInfoType,
    curPage: string,
    isLoggedIn: boolean,

    showSnackBar: boolean,
    snackBarMessage: string,
    snackBarHasCTA: boolean,
    snackBarCTAButtonLabel: string,
    snackBarCTAClickHandler: () => void,
    snackBarCloseHandler: () => void,
}

export type GlobalActionType = {
    updateSnackBar: (   isShown: boolean,
                        message: string,
                        hasCTA?: boolean,
                        CTAButtonLabel?: string,
                        CTAClickHandler?: () => void,
                        closeHandler?: () => void) => void,
    updateLoggedSession: (val: boolean) => void,
    updateCurPage: (val: PageType) => void,
    updateUserInfo: (info: UserInfoType) => void,
}

const initial: GlobalStateInitialType = {
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
    initial,
    Actions: (update: flyd.Stream<unknown>): GlobalActionType => {
        return {
            updateSnackBar: (   isShown: boolean,
                                message: string,
                                hasCTA?: boolean,
                                CTAButtonLabel?: string,
                                CTAClickHandler?: () => void,
                                closeHandler?: () => void
                            ) => {
                update((state: GlobalStateInitialType) => {
                    state.showSnackBar = isShown;
                    state.snackBarMessage = !!isShown ? message : '';
                    state.snackBarHasCTA = !!hasCTA;
                    state.snackBarCTAButtonLabel = !!CTAButtonLabel ? CTAButtonLabel : '';
                    state.snackBarCTAClickHandler = !!CTAClickHandler ? CTAClickHandler : () => null;
                    state.snackBarCloseHandler= !!closeHandler ? closeHandler : () => null;

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
                console.log('Updating user info');
                update((state: GlobalStateInitialType) => {
                    state.userInfo = info;
                    return state;
                });
            }
        }
    }
};

export default globalState;