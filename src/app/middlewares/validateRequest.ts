import { AnyZodObject } from 'zod';
import { Response, Request, NextFunction } from 'express';

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;

// middleware --> validateRequest(userZodSchema)=> async (req, res, next)
