import { IShortenRequestJSON, TValidUrl } from './types';
import { ParseError } from './errors';


export function parseShortenRequestJSON(body: object): IShortenRequestJSON {
    if ('urlToShorten' in body && 
    Object.keys(body).length === 1 &&
    typeof (body as IShortenRequestJSON).urlToShorten === 'string') {
        const parsed_body = body as IShortenRequestJSON;
        parsed_body.urlToShorten = parseUrl(parsed_body.urlToShorten);
        return parsed_body
    }
    throw new ParseError('Invalid request.');
}


export function parseUrl(s: string): TValidUrl {
    let urlRE = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    let url = new RegExp(urlRE, 'i'); 
    if (s.length < 2083 && url.test(s)) {
        return s as TValidUrl;
    };
    throw new ParseError('Invalid url');
}