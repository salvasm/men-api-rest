import { Response, Request } from 'express';
import mongoose from 'mongoose';
import httpErrorHandler from '@services/errorHandler';
import logger from '@config/logger';

class CRUD {
    private name: string;
    public model: any;

    constructor(name: string) {
        this.name = name;
        this.model = this.initModel(name.toLowerCase());
    }

    private initModel(name: string) {
        require('./' + name + '/' + name + '.model');
        return mongoose.model(this.name);
    }

    public create(req: Request, res: Response, item: any) {
        let _ = this;
        item.save(function (err: any, result: any) {
            if (err) return httpErrorHandler(err, res);
            logger.info(req.method + ' ' + req.originalUrl);
            res.status(201).json({
                success: true,
                message: _.name + ' was created',
                result: result._id,
            });
        });
    }

    public findAll(req: Request, res: Response) {
        this.model.find(function (err: any, result: any) {
            if (err) return httpErrorHandler(err, res);
            logger.info(req.method + ' ' + req.originalUrl);
            return res.status(200).json({
                success: true,
                result: result
            });
        });
    }

    public findById(req: Request, res: Response) {
        let _ = this;
        this.model.findById(req.params.id, function (err: any, result: any) {
            if (err) return httpErrorHandler(err, res);
            logger.info(req.method + ' ' + req.originalUrl);
            if (result) {
                return res.status(200).json({
                    success: true,
                    result: result
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: _.name + ' was not found'
                });
            }
        });

    }

    public update(req: Request, res: Response, item: any) {
        let _ = this;
        if (item.length) {
            this.model.findOneAndUpdate(req.params.id, {$set: item}, (err: any, result: any) => {
                if (err) return httpErrorHandler(err, res);
                logger.info(req.method + ' ' + req.originalUrl);
                if (result) {
                    return res.status(200).json({
                        success: true,
                        message: _.name + ' data was updated',
                        result: result._id,
                        fields: item
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: _.name + ' was not updated'
                    });
                }
            });
        } else {
            return res.status(200).json({
                success: false,
                message: _.name + ' was not updated. No fields to update has been sent'
            });
        }
    }

    public delete(req: Request, res: Response) {
        let _ = this;
        this.model.findByIdAndDelete(req.params.id, (err: any, result: any) => {
            if (err) return httpErrorHandler(err, res);
            logger.info(req.method + ' ' + req.originalUrl);
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: _.name + ' was deleted',
                    result: result._id
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: _.name + ' was not deleted'
                });
            }
        });
    }
}

export default CRUD;