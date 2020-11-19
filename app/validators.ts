import { IShortenRequestJSON } from './interfaces';
import { ParseError } from './errors';


export function isShortenRequestJSON(body: object): body is IShortenRequestJSON {
    return 'urlToShorten' in body && 
        Object.keys(body).length === 1 &&
        typeof (body as IShortenRequestJSON).urlToShorten === 'string';
}
