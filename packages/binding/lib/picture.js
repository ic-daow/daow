"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureActor = exports.PictureErrors = exports.PictureStatus = void 0;
const actor_1 = require("./actor");
const photo_did_1 = require("./actor/photo.did");
const utils_1 = require("./utils");
var PictureStatus;
(function (PictureStatus) {
    PictureStatus["Pending"] = "Pending";
    PictureStatus["Disable"] = "Disable";
    PictureStatus["Enable"] = "Enable";
})(PictureStatus = exports.PictureStatus || (exports.PictureStatus = {}));
function fromPictureStatus(error) {
    if ('pending' in error) {
        return PictureStatus.Pending;
    }
    else if ('disable' in error) {
        return PictureStatus.Disable;
    }
    else if ('enable' in error) {
        return PictureStatus.Enable;
    }
    else {
        throw new Error('uninmplemented');
    }
}
var PictureErrors;
(function (PictureErrors) {
    PictureErrors["NotFound"] = "NotFound";
    PictureErrors["QuantityTooLarge"] = "QuantityTooLarge";
    PictureErrors["AlreadyExisted"] = "AlreadyExisted";
})(PictureErrors = exports.PictureErrors || (exports.PictureErrors = {}));
function fromPictureError(error) {
    if ('picNotFound' in error) {
        return PictureErrors.NotFound;
    }
    else if ('tooLargeQuantity' in error) {
        return PictureErrors.QuantityTooLarge;
    }
    else if ('picAlreadyExisted' in error) {
        return PictureErrors.AlreadyExisted;
    }
    else {
        throw new Error('uninmplemented');
    }
}
class PictureActor extends actor_1.BaseActor {
    /**
     * 创建actor
     */
    async create(cid, options) {
        await this._create(cid, photo_did_1.idlFactory, options);
        return this;
    }
    /**
     * create picture
     */
    async createPicture(arg) {
        const result = await this.getActor().savePic(await this.toPicture(arg.picture), arg.name, arg.description, arg.owner);
        return (0, utils_1.fromResult)(result, (result) => ({ id: Number(result) }), (err) => fromPictureError(err));
    }
    /**
     * get picture amount
     */
    async getPictureAmount() {
        const result = await this.getActor().getTotalPics();
        return (0, utils_1.fromResult)(result, (result) => Number(result), (err) => fromPictureError(err));
    }
    /**
     * get picture
     */
    async getPicture(id) {
        const result = await this.getActor().getPictureProfile(BigInt(id));
        return (0, utils_1.fromResult)(result, (result1) => {
            const result2 = (0, utils_1.fromOption)(result1);
            if (result2 === undefined) {
                throw PictureErrors.NotFound;
            }
            return {
                id: Number(result2.id),
                name: result2.picName,
                description: result2.description,
                status: fromPictureStatus(result2.status),
                data: this.fromPicture(result2.pic),
                owner: result2.owner,
                createdBy: result2.createdBy,
                createdAt: Number(result2.createdAt),
            };
        }, (err) => fromPictureError(err));
    }
    /**
     * get picture data
     */
    async getPictureData(id) {
        const result = await this.getActor().getPicture(BigInt(id));
        return (0, utils_1.fromResult)(result, (result1) => {
            const result2 = (0, utils_1.fromOption)(result1);
            if (result2 === undefined) {
                throw PictureErrors.NotFound;
            }
            return this.fromPicture(result2);
        }, (err) => fromPictureError(err));
    }
    /**
     * bulk get picture data
     */
    async bulkGetPictureData(ids) {
        const result = await this.getActor().getPictures(ids.map((id) => BigInt(id)));
        return (0, utils_1.fromResult)(result, (result1) => {
            return {
                data: result1.map(([id, pic]) => ({
                    id: Number(id),
                    picture: this.fromPicture(pic),
                })),
            };
        }, (err) => fromPictureError(err));
    }
    fromPicture(file) {
        return { type: file.fileType, buffer: file.content };
    }
    async toPicture(file) {
        let content;
        if (file.buffer instanceof File || file.buffer instanceof Blob) {
            const buffer = await file.buffer.arrayBuffer();
            content = [...new Uint8Array(buffer)];
        }
        else if (Array.isArray(file.buffer)) {
            content = file.buffer;
        }
        else {
            throw new Error('unimplemented');
        }
        return { fileType: file.type, content };
    }
}
exports.PictureActor = PictureActor;
