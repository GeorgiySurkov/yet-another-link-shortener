const BANNED_TOKENS: Set<string> = new Set(['shorten']);
const CHARS: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const TOKEN_LENGTH: number = 32;


export function generateToken() {
    let token: string = '';
    do {
        token = '';
        for (let i: number = 0; i < TOKEN_LENGTH; i++) {
            token += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        }
    } while (BANNED_TOKENS.has(token));
    return token;
}
