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
        return new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/).test(pwd)
    }

    static isValidEmail(email: string): boolean {
        return new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)
    }
}