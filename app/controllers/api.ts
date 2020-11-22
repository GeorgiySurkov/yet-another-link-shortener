import { Router, Request, Response } from 'express';
import { parseShortenRequestJSON } from '../parsers';
import ShortenedUrlModel, { IShortenedUrl, IShortenedUrlDocument } from '../models/shortened_url';
import { IShortenRequestJSON } from '../types';
import { ParseError } from '../errors';


const router: Router = Router();

router.post('/shorten', async (req: Request, res: Response): Promise<void> => {
    if (req.headers["content-type"] != 'application/json')
        res.status(415).json({ status: "Error", message: "Unsupported Content-type" });
    let reqBody: IShortenRequestJSON;
    try {
        reqBody = parseShortenRequestJSON(req.body)
    } catch (err) {
        if (err instanceof ParseError) {
            res.status(400).json({ status: "Error", message: "Bad request" });
        }
        throw err;
    }
    const shortenedUrl: IShortenedUrl = {
        redirectTo: reqBody.urlToShorten
    }
    const shortenedUrlModel = new ShortenedUrlModel(shortenedUrl);
    await shortenedUrlModel.save();
    res.status(201).json({ status: "Created", shortenedUrl: shortenedUrlModel.shortenedUrl });
});

router.get('/:url', async (req: Request, res: Response): Promise<void> => {
    let token: string = req.params.url;
    let shortenedUrl = await ShortenedUrlModel.findOne({ token: token }).exec(); 
    if (shortenedUrl === null) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    shortenedUrl.viewCount++;
    await shortenedUrl.save();
    res.status(301)
        .location(shortenedUrl.redirectTo)
        .json({ redirectTo: shortenedUrl.redirectTo });
});

router.get('/:url/views', async (req: Request, res: Response): Promise<void> => {
    let token: string = req.params.url;
    let shortenedUrl = await ShortenedUrlModel.findOne({ token: token }).exec(); 
    if (shortenedUrl === null) {
        res.status(404).json({ message: "Not found" });
        return;
    }
    res.json({ viewCount: shortenedUrl.viewCount });
})

export const ApiController: Router = router;