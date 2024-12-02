import { NextFunction, Request, Response } from "express";
import { HttpError, HttpStatus } from "../interfaces/httpError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    switch (true) {
        case err instanceof HttpError:
            res.status(err.status).json({ message: err.message });
            return;
        default:
            console.log(err);
            res.status(HttpStatus.ServerError).json({ message: 'Something went wrong' });
            return;
    }
}