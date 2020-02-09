const maskPhone = (phone: string) => {
    let num:string = phone;
    if(+num[0] === 6) {
        num = num.substring(1, num.length);
    }

    const preNum:string = num.substring(0, 3); // first 3 digit
    const postNum:string = num.substring(num.length-4, num.length); // last 4 digit

    return [
        preNum,
        new Array((num.length - 7) + 1).join('*'),
        postNum
    ].join('');
};

const removeLastSlash = (url: string) => url[url.length-1] === '/' ? url.substr(0, url.length-1) : url;

const setSessionStorage = (key: string, obj: any) => sessionStorage.setItem(key, JSON.stringify(obj));
const getSessionStorage = (key: string): string => sessionStorage.getItem(key) || '{}';
const clearSessionStorageByKey = (key: string) => sessionStorage.removeItem(key);

const checkImageURL = (urlPath: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({loaded: true});
        };
        img.onerror = () => {
            resolve({loaded: false});
        };
        img.src = urlPath;
    });
};



export {
    maskPhone,
    removeLastSlash,
    setSessionStorage,
    getSessionStorage,
    clearSessionStorageByKey,
    checkImageURL,
}