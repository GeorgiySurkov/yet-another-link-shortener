import { Schema, Document, model, Model } from 'mongoose';
import { generateToken } from '../token_generation';
import { port } from '../app';
import { TValidUrl } from '../types';


export const ShortenedUrlSchema: Schema = new Schema({
    redirectTo: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        default: generateToken
    },
    viewCount: {
        type: Number,
        required: true,
        default: 0
    }
})

ShortenedUrlSchema.virtual('shortenedUrl').get(function (this: IShortenedUrlDocument): TValidUrl {
    return `http://localhost:${port}/${this.token}`;
})

export interface IShortenedUrl {
    redirectTo: TValidUrl
}

export interface IShortenedUrlDocument extends IShortenedUrl, Document {
    shortenedUrl: TValidUrl,
    token: string,
    viewCount: number
}

export default model<IShortenedUrlDocument, Model<IShortenedUrlDocument>>("ShortenedUrl", ShortenedUrlSchema);
