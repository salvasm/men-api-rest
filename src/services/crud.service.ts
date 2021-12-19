import mongoose from 'mongoose';
import { apiResponse } from "@interfaces/global";

class CRUD {
    private name: string;
    public model: any;

    constructor(name: string) {
        this.name = name;
        this.model = this.initModel(name.toLowerCase());
    }

    /**
     * Initialize CRUD model
     * @param {string} name Model's name to initialize
     * @returns {mongoose.Model} Model
     */
    private initModel(name: string) {
        require('@components/' + name + '/' + name + '.model');
        return mongoose.model(this.name);
    }

    /**
     * Create one item for initialiced model
     * @param {any} item Any object to be created
     * @returns {apiResponse} JSON with operation result
     */
    public async create(item: any): Promise<apiResponse> {
        return await item.save().then((result: Object) : apiResponse => {
            console.log(result);
            return {
                success: true,
                status: 201,
                message: this.name + ' was created'
            }
        }).catch((err: any) => {
            return {
                success: false,
                status: 500,
                error: err
            }
        })
    }

    /**
     * Find all items for initialiced model
     * @returns {apiResponse} JSON with all items found
     */
    public async findAll(): Promise<apiResponse> {
        return await this.model.find().then((result: Object) : apiResponse => {
            var response;

            if (result) {
                response = {
                    success: true,
                    status: 200,
                    result: result
                }
            } else {
                response = {
                    success: false,
                    status: 404,
                    result: 'There are no items for ' + this.name
                }
            }

            return response;
        }).catch((err: mongoose.Error) => {
            return {
                success: false,
                status: 500,
                error: err
            }
        });
    }

    /**
     * Find one item by its id for initialiced model
     * @param {string} id Item id
     * @returns {apiResponse} JSON with one item found
     */
    public async findById(id: string): Promise<apiResponse> {
        return await this.model.findById(id).then((result: Object) : apiResponse => {
            var response;

            if (result) {
                response = {
                    success: true,
                    status: 200,
                    result: result
                }
            } else {
                response = {
                    success: false,
                    status: 404,
                    result: this.name + ' was not found'
                }
            }

            return response;
        }).catch((err: mongoose.Error) => {
            return {
                success: false,
                status: 500,
                error: err
            }
        });
    }

    /**
     * Update one item referenced by its id
     * @param {string} id Item id to be updated
     * @param {any} item Item object with params to be updated
     * @returns {apiResponse} JSON with operation result
     */
    public async update(id: string, item: any): Promise<apiResponse> {
        if (!item.length) {
            return {
                success: false,
                status: 404,
                message: this.name + ' was not updated. No fields to update has been sent'
            }
        }

        return await this.model.findOneAndUpdate(id, {$set: item}).then((result: Object) : apiResponse => {
            var response;

            if (result) {
                response = {
                    success: true,
                    status: 200,
                    result: result
                }
            } else {
                response = {
                    success: false,
                    status: 404,
                    result: this.name + ' was not updated'
                }
            }

            return response;
        }).catch((err: mongoose.Error) => {
            return {
                success: false,
                status: 500,
                error: err
            }
        });
    }

    /**
     * Delete one item referenced by its id
     * @param {string} id Item id to be deleted
     * @returns {apiResponse} JSON with operation result
     */
    public async delete(id: string): Promise<apiResponse> {
        return await this.model.findByIdAndDelete(id).then((result: Object) => {
            var response;

            if (result) {
                response = {
                    success: true,
                    status: 200,
                    result: this.name + ' was deleted'
                }
            } else {
                response = {
                    success: false,
                    status: 404,
                    result: this.name + ' was not deleted'
                }
            }

            return response;
        }).catch((err: mongoose.Error) => {
            return {
                success: false,
                status: 500,
                error: err
            }
        });
    }
}

export default CRUD;