const defaultSuccessHandler = (callType: string, response: any) => console.log(`>>> ${callType} Success:`, response);
const defaultErrorHandler = (callType: string, response: any) => console.log(`>>> ${callType} Error:`, response);

interface ApiType {
    [key: string]: any,
}

const apiService = {
    apiBasePath: window.bobaObj.apiBasePath,

    get ApiAddress() {
        return {
            LoginSMS                    : this.apiBasePath + 'api/web/authentication/login-sms',
            LoginFinalised              : this.apiBasePath + 'api/web/authentication/login-finalised',
            RegisterSMS                 : this.apiBasePath + 'api/web/authentication/register-sms',
            RegisterFinalised           : this.apiBasePath + 'api/web/authentication/register-finalised',
            HasSession                  : this.apiBasePath + 'api/web/user/has-session',
            Homepage                    : this.apiBasePath + 'api/web/product/home',
            MerchantById                : this.apiBasePath + 'api/web/product/merchant',
            CampaignById                : this.apiBasePath + 'api/web/product/campaign',
            VoucherById                 : this.apiBasePath + 'api/web/product/voucher/get',
            GetCardDesigns              : this.apiBasePath + 'api/web/product/card-design/all',
            VoucherListByCampaignId     : this.apiBasePath + 'api/web/product/voucher/list',
            FirstVoucherByCampaignId    : this.apiBasePath + 'api/web/product/voucher/first',
            BuyShareVoucher             : this.apiBasePath + 'api/web/product/voucher/buy-share',
            BuyShareVoucherFinalised    : this.apiBasePath + 'api/web/product/voucher/buy-share-complete',
            AddContact                  : this.apiBasePath + 'api/web/friend/add',
            ActionDataByLinkId          : this.apiBasePath + 'api/public/action',
            CampaignLabelImageById      : this.apiBasePath + 'api/public/campaign',
        }
    },

    fetchData: (apiPath: string = '', opts: any = {}) => {
        const defaultRequest = {
            method: opts.method || 'GET',
            credentials: opts.credentials || 'same-origin',
            headers: opts.header || { 'Content-Type': 'application/json' },
            mode: opts.mode || 'cors',
            cache: opts.cache || 'no-cache',
        };

        const optObj: RequestInit = {
            ...defaultRequest,
            ...(opts.method === 'POST' ? { body: JSON.stringify(opts.data) || JSON.stringify({}) } : {})
        };

        return (
            fetch(apiPath, optObj)
                .then(response => response.json())
                .then(data => {
                    if(+data.code === 200) {
                        return data;
                    } else {
                        throw data;
                    }
                })
                .catch(error => ({ error: true, status: error }))
        );
    },

    get ApiCall() {
        return {
            LoginSMS: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('LoginSMS', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('LoginSMS', data);

                this.fetchData(this.ApiAddress.LoginSMS, {
                    method: 'POST',
                    data: {
                        username: opts.username
                    },
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            LoginFinalised: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('LoginFinalised', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('LoginFinalised', data);

                this.fetchData(this.ApiAddress.LoginFinalised, {
                    method: 'POST',
                    credentials: 'include',
                    data: {
                        username: opts.username,
                        shortcode: opts.shortcode,
                    },
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            RegisterSMS: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('RegisterSMS', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('RegisterSMS', data);

                this.fetchData(this.ApiAddress.RegisterSMS, {
                    method: 'POST',
                    data: {
                        username: opts.username
                    },
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            RegisterFinalised: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('RegisterFinalised', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('RegisterFinalised', data);

                this.fetchData(this.ApiAddress.RegisterFinalised, {
                    method: 'POST',
                    credentials: 'include',
                    data: {
                        username: opts.username,
                        shortcode: opts.shortcode,
                    },
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetHomePageData: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetHomePageData', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetHomePageData', data);

                this.fetchData(this.ApiAddress.Homepage, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            HasSession: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('HasSession', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('HasSession', data);

                this.fetchData(this.ApiAddress.HasSession, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetMerchantById: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetMerchantById', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetMerchantById', data);

                this.fetchData(this.ApiAddress.MerchantById + '/' + opts.merchantId, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetVoucherById: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetVoucherById', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetVoucherById', data);

                this.fetchData(this.ApiAddress.VoucherById, {
                    method: 'POST',
                    credentials: 'include',
                    data: {
                        voucherNo: opts.voucherNo
                    }
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetCampaignById: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetCampaignById', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetCampaignById', data);

                this.fetchData(this.ApiAddress.CampaignById + '/' + opts.campaignId, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetVoucherListByCampaignId: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetVoucherListByCampaignId', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetVoucherListByCampaignId', data);

                this.fetchData(this.ApiAddress.VoucherListByCampaignId + '/' + opts.campaignId, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetFirstVoucherByCampaignId: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetFirstVoucherByCampaignId', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetFirstVoucherByCampaignId', data);

                this.fetchData(this.ApiAddress.FirstVoucherByCampaignId + '/' + opts.campaignId, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetActionDataByLinkId: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetActionDataByLinkId', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetActionDataByLinkId', data);

                this.fetchData(this.ApiAddress.ActionDataByLinkId + '/' + opts.linkId, {}
                ).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetCampaignLabelImageById: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetCampaignLabelImageById', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetCampaignLabelImageById', data);

                this.fetchData(this.ApiAddress.CampaignLabelImageById + '/' + opts.campaignId, {}
                ).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },

            AddContact: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('AddContact', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('AddContact', data);

                this.fetchData(this.ApiAddress.AddContact, {
                    method: 'POST',
                    credentials: 'include',
                    data: {
                        friendNo: opts.friendNo,
                        friendName: opts.friendName,
                        friendDOB: opts.friendDOB,
                        friendPhoto: opts.friendPhoto,
                        senderId: opts.senderId,
                    },
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            GetCardDesigns: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('GetCardDesigns', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('GetCardDesigns', data);

                this.fetchData(this.ApiAddress.GetCardDesigns, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            BuyShareVoucher: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('BuyShareVoucher', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('BuyShareVoucher', data);

                this.fetchData(this.ApiAddress.BuyShareVoucher, {
                    method: 'POST',
                    credentials: 'include',
                    data: {
                        campaignId: opts.campaignId,
                        voucherNo: opts.voucherNo,
                        channel: opts.channel, // phone, email, whatsapp, boba
                        from: {
                            username: opts.senderNo,
                            displayName: opts.senderName,
                        },
                        to: {
                            username: opts.recipientNo,
                            displayName: opts.recipientName
                        },
                        cardData: {
                            designType: opts.shareCardDesign,
                            message: opts.shareMessage,
                        }
                    }
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
            BuyShareVoucherFinalised: (opts: ApiType) => {
                const onSuccess = !!opts.onSuccess
                    ? opts.onSuccess
                    : (data: any) => defaultSuccessHandler('BuyShareVoucherFinalised', data);

                const onError = !!opts.onError
                    ? opts.onError
                    : (data: any) => defaultErrorHandler('BuyShareVoucherFinalised', data);

                this.fetchData(this.ApiAddress.BuyShareVoucherFinalised, {
                    credentials: 'include',
                }).then((response: any) => !!response.error ? onError(response) : onSuccess(response)
                ).catch((error: any) => onError(error));
            },
        }
    }
};



export {
    apiService,
}