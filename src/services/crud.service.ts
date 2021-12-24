import mongoose from 'mongoose';
import { apiResponse } from "@interfaces/global";
import { JSONresponse } from '@api/components/helpers';

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
            return JSONresponse(true, 201, this.name + ' was created')
        }).catch((err: any) => {
            return JSONresponse(false, 500, err)
        })
    }

    /**
     * Find all items for initialiced model
     * @returns {apiResponse} JSON with all items found
     */
    public async findAll(): Promise<apiResponse> {
        return await this.model.find().then((result: Object) : apiResponse => {
            var response = result ? JSONresponse(true, 200, result) : JSONresponse(false, 404, 'There are no items for ' + this.name);
            return response;
        }).catch((err: mongoose.Error) => {
            return JSONresponse(false, 500, err);
        });
    }

    /**
     * Find one item by its id for initialiced model
     * @param {string} id Item id
     * @returns {apiResponse} JSON with one item found
     */
    public async findById(id: string): Promise<apiResponse> {
        return await this.model.findById(id).then((result: Object) : apiResponse => {
            var response = result ? JSONresponse(true, 200, result) : JSONresponse(false, 404, this.name + ' was not found');
            return response;
        }).catch((err: mongoose.Error) => {
            return JSONresponse(false, 500, err);
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
            return JSONresponse(false, 404, this.name + ' was not updated. No fields to update has been sent');
        }

        return await this.model.findOneAndUpdate(id, {$set: item}).then((result: Object) : apiResponse => {
            var response = result ? JSONresponse(true, 200, result) : JSONresponse(false, 404, this.name + ' was not updated');
            return response;
        }).catch((err: mongoose.Error) => {
            return JSONresponse(false, 500, err);
        });
    }

    /**
     * Delete one item referenced by its id
     * @param {string} id Item id to be deleted
     * @returns {apiResponse} JSON with operation result
     */
    public async delete(id: string): Promise<apiResponse> {
        return await this.model.findByIdAndDelete(id).then((result: Object) => {
            var response = result ? JSONresponse(true, 200, this.name + ' was deleted') : JSONresponse(false, 404, this.name + ' was not deleted');
            return response;
        }).catch((err: mongoose.Error) => {
            return JSONresponse(false, 500, err);
        });
    }
}

export default CRUD;