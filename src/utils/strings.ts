export default class StringUtil {
    static generateRandom(n: number): string {
        const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;
        let result = "" ;
        for( let i = 0; i < n; i++ ){
            let rd = Math.floor(Math.random() * letters.length) + 1;
            result += letters[rd];
        }
        return result;
    }

    static isValidPassWord(pwd: string): boolean {
        return new RegExp("").test(pwd)
    }

    static isValidEmail(email: string): boolean {
        return new RegExp("").test(email)
    }
}