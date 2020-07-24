import Cookies from 'js-cookie';

const tokenKey = 'x-access-token';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) =>
    Cookies.set(tokenKey, token, {
        // secure: true,
        sameSite: 'strict',
    });
export const removeToken = () => Cookies.remove(tokenKey);
