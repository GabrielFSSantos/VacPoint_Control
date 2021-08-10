import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {

  if (req.headers["x-forwarded-proto"] == "http") {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
  else {
    next();
  }
}