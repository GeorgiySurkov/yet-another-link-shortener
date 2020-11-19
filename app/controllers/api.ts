import { Router, Request, Response } from 'express';
import { isShortenRequestJSON } from '../validators';


const router: Router = Router();

router.post('/shorten', (req: Request, res: Response): void => {
    if (typeof req.body !== 'object' || !isShortenRequestJSON(req.body))
        return;
    res.send('Hello, World!');
});

router.get('/:url', (req: Request, res: Response): void => {

});

router.get('/:url/views', (req: Request, res: Response): void => {

})

export const ApiController: Router = router;