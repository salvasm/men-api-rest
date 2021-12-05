import { Response, Request } from 'express';
import mongoose from 'mongoose';
import httpErrorHandler from '@services/errorHandler';

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
        item.save(function (err: any, result: any) {
            if (err) return httpErrorHandler(err, res);
            res.status(201).json({
                success: true,
                result: result
            });
        });
    }

    public findAll(req: Request, res: Response) {
        this.model.find(function (err: any, result: any) {
            if (err) return httpErrorHandler(err, res);
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
            if (result) {
                return res.status(200).json({
                    success: true,
                    result: result
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: _.name + ' not found'
                });
            }
        });

    }

    public update(req: Request, res: Response, item: any) {
        let _ = this;
        if (item.length) {
            this.model.findOneAndUpdate(req.params.id, {$set: item}, (err: any, result: any) => {
                if (err) return httpErrorHandler(err, res);
                if (result) {
                    return res.status(200).json({
                        success: true,
                        message: result._id + ' was updated',
                        result: item
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: _.name + ' not updated'
                    });
                }
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'Fields to update have not been sent'
            });
        }
    }

    public delete(req: Request, res: Response) {
        let _ = this;
        this.model.findByIdAndDelete(req.params.id, (err: any, result: any) => {
            if (err) return httpErrorHandler(err, res);
            if (result) {
                return res.status(200).json({
                    success: true,
                    result: result._id
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: _.name + ' not deleted'
                });
            }
        });
    }
}

export default CRUD;