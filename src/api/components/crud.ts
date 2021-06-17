import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { Interface } from 'readline';
import httpErrorHandler from '@services/errorHandler';

class CRUD {
    private name: string;
    private model: any;
    private dto: Interface;

    constructor(name: string) {
        this.name = name;
        this.model = this.initModel(name.toLowerCase());
        this.dto = this.initDto(name.toLowerCase());
    }

    private initModel(name: string) {
        require('./' + name + '/' + name + '.model');
        return mongoose.model(this.name);
    }

    private initDto(name: string) {
        return require('./' + name + '/' + name + '.dto');
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
        this.model.findOneAndUpdate(req.params.id, item, (err: any, result: any) => {
            if (err) return httpErrorHandler(err, res);
            if (result) {
                return res.status(200).json({
                    success: true,
                    result: result
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: _.name + ' not updated'
                });
            }
        });
    }

    public delete(req: Request, res: Response) {
        let _ = this;
        this.model.findByIdAndDelete(req.params.id, (err: any, result: any) => {
            if (err) return httpErrorHandler(err, res);
            if (result) {
                return res.status(200).json({
                    success: true,
                    result: result
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