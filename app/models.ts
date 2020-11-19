import { Schema, Document, model, Model } from 'mongoose';
import { generateToken } from './token_generation';
import { port } from './app';


export const ShortenedUrlSchema: Schema = new Schema({
    redirectTo: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        default: generateToken,
    }
})

ShortenedUrlSchema.virtual('shortenedUrl').get(function (this: IShortenedUrl): string {
    return `http://localhost:${port}/${this.token}`;
})

export interface IShortenedUrl {
    redirectTo: string,
    token: string
}

export interface IShortenedUrlDocument extends IShortenedUrl, Document {
    shortenedUrl: string
}

export default model<IShortenedUrlDocument, Model<IShortenedUrlDocument>>("ShortenedUrl", ShortenedUrlSchema);
