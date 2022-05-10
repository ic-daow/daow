import { BaseActor, ICreateActorOptions } from './actor';
import { _SERVICE } from './actor/photo.did';
export declare enum PictureStatus {
    Pending = "Pending",
    Disable = "Disable",
    Enable = "Enable"
}
export declare enum PictureErrors {
    NotFound = "NotFound",
    QuantityTooLarge = "QuantityTooLarge",
    AlreadyExisted = "AlreadyExisted"
}
declare type IPictureId = number;
interface IPicture {
    id: IPictureId;
    name: string;
    description: string;
    status: PictureStatus;
    data: IPictureData;
    owner: string;
    createdBy: string;
    createdAt: number;
}
interface IPictureData {
    type: string;
    buffer: number[] | File | Blob;
}
interface IBulkPictureData {
    data: Array<{
        id: number;
        picture: IPictureData;
    }>;
}
interface ICreatePictureArg {
    name: string;
    description: string;
    picture: IPictureData;
    owner: string;
}
interface ICreatePictureResult {
    id: IPictureId;
}
export declare class PictureActor extends BaseActor<_SERVICE> {
    /**
     * 创建actor
     */
    create(cid: string, options?: ICreateActorOptions): Promise<PictureActor>;
    /**
     * create picture
     */
    createPicture(arg: ICreatePictureArg): Promise<ICreatePictureResult>;
    /**
     * get picture amount
     */
    getPictureAmount(): Promise<number>;
    /**
     * get picture
     */
    getPicture(id: IPictureId): Promise<IPicture>;
    /**
     * get picture data
     */
    getPictureData(id: IPictureId): Promise<IPictureData>;
    /**
     * bulk get picture data
     */
    bulkGetPictureData(ids: IPictureId[]): Promise<IBulkPictureData>;
    private fromPicture;
    private toPicture;
}
export {};
