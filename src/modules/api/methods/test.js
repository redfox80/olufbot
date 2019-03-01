import { checkToken } from './auth';

export default (req, res) => {
    if(!checkToken(req)) {
        res.sendStatus(403);
        return 0;
    }

    res.json({
        ok: "Everything is gucci"
    });
}