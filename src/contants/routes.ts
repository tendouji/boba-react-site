type generalObjectType = {
    [key: string]: string
}

const routes: generalObjectType = {
    HOME: '/',
    get SIGNIN() { return this.HOME + 'signin' },
    get SIGNUP() { return this.HOME + 'signup' },
    get MAIN() { return this.HOME + 'main' },
    get CONTACT() { return this.HOME + 'contact' },
    get BRAND_DETAILS() { return this.HOME + 'brand-details' },
    get GIFT_DETAILS() { return this.HOME + 'gift-details' },
    get SHARE_GIFT() { return this.HOME + 'share-gift' },
    get PROFILE() { return this.HOME + 'profile' },
    get THANK_YOU() { return this.HOME + 'thank-you' },
};

export {
    routes,
}