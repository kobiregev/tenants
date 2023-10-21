import { TOKEN_KEY } from "../data/data";

export function getTokenFromLocalStorage(){
    return localStorage.getItem(TOKEN_KEY)
}
export function setTokenInLocalStorage(token){
    localStorage.setItem(TOKEN_KEY,token)
}
export function removeToken(){
    localStorage.removeItem(TOKEN_KEY);
}