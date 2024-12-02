import { Application } from "express";
import { HttpError, HttpStatus } from "../interfaces/httpError";
import articleRouter from './article.router';
import { errorHandler } from "../middlewares/error.middleware";

export const registerRouters = (app: Application) => {

    app.use('/articles', articleRouter);

    app.use('*', (req, res) => {
        throw new HttpError('Not Found', HttpStatus.NotFound);
    });

    app.use(errorHandler);
}