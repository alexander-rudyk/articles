import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export declare type ClassConstructor<T> = {
    new (...args: any[]): T;
};

export function validateDto<T extends object> (dto: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.query);

    const errors = await validate(instance);

    if (errors.length > 0) {
        res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
      return;
    }

    req.query = instance as any;
    next();
  };
};
