import { Request, Response, NextFunction, json } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import HttpException from '../utils/HttpException';

export default class RequestValidator {
    static validate = <T extends object>(classInstance: ClassConstructor<T>) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            
            // *Convert body to class instance
            const convertedObject = plainToClass(classInstance, req.body);
            
            
            // *Validate the class instance
            await validate(convertedObject, { whitelist: true, forbidNonWhitelisted: true }).then((errors) => {

                if (errors.length > 0) {
                    let rawErrors: string[] = [];
                    for (const errorItem of errors) {
                        // *There is no any nested errors
                        if (!errorItem.children || errorItem.children?.length == 0) {
                            rawErrors = rawErrors.concat(...rawErrors, Object.values(errorItem.constraints ?? []));

                        } else {
                            // *There is nested errors
                            errorItem.children.forEach((el) => {
                                if (el.children && el.children.length > 0) {
                                    rawErrors = rawErrors.concat(...rawErrors, Array.isArray(el.children) ? Object.values(el.children[0].constraints ?? []) : Object.values(el.constraints ?? []));
                                    return;
                                }
                                rawErrors = rawErrors.concat(...rawErrors, Object.values(el.constraints ?? []));
                            })

                        }
                    }

                    // *Send first error to the response
                    next(HttpException.forbidden(rawErrors[0]));
                }
            });
            next();
        };
    };
}
