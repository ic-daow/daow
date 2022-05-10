import { BaseActor, ICreateActorOptions } from './actor'
import {
  _SERVICE,
  Error as PictureError,
  idlFactory,
  Picture,
  PictureId,
  PictureProfile,
  PictureStatus as _PictureStatus,
} from './actor/photo.did'
import { fromOption, fromResult, ICOption } from './utils'

export enum PictureStatus {
  Pending = 'Pending',
  Disable = 'Disable',
  Enable = 'Enable',
}

function fromPictureStatus(error: _PictureStatus): PictureStatus {
  if ('pending' in error) {
    return PictureStatus.Pending
  } else if ('disable' in error) {
    return PictureStatus.Disable
  } else if ('enable' in error) {
    return PictureStatus.Enable
  } else {
    throw new Error('uninmplemented')
  }
}

export enum PictureErrors {
  NotFound = 'NotFound',
  QuantityTooLarge = 'QuantityTooLarge',
  AlreadyExisted = 'AlreadyExisted',
}

function fromPictureError(error: PictureError): PictureErrors {
  if ('picNotFound' in error) {
    return PictureErrors.NotFound
  } else if ('tooLargeQuantity' in error) {
    return PictureErrors.QuantityTooLarge
  } else if ('picAlreadyExisted' in error) {
    return PictureErrors.AlreadyExisted
  } else {
    throw new Error('uninmplemented')
  }
}

type IPictureId = number

interface IPicture {
  id: IPictureId
  name: string
  description: string
  status: PictureStatus
  data: IPictureData
  owner: string
  createdBy: string
  createdAt: number
}

interface IPictureData {
  fileType: string
  content: number[]
}

interface IBulkPictureData {
  data: Array<{
    id: number
    data: IPictureData
  }>
}

interface ICreatePictureArg {
  name: string
  description: string
  owner: string
  file: IPictureData
}

interface ICreatePictureResult {
  id: IPictureId
}

export class PictureActor extends BaseActor<_SERVICE> {
  /**
   * 创建actor
   */
  public async create(cid: string, options?: ICreateActorOptions): Promise<PictureActor> {
    await this._create(cid, idlFactory, options)
    return this
  }

  /**
   * create picture
   */
  public async createPicture(arg: ICreatePictureArg): Promise<ICreatePictureResult> {
    const result = await this.getActor().savePic(arg.file, arg.name, arg.description, arg.owner)
    return fromResult<PictureId, PictureError, ICreatePictureResult, PictureErrors>(
      result,
      (result) => ({ id: Number(result) }),
      (err) => fromPictureError(err),
    )
  }

  /**
   * get picture amount
   */
  public async getPictureAmount(): Promise<number> {
    const result = await this.getActor().getTotalPics()
    return fromResult<bigint, PictureError, number, PictureErrors>(
      result,
      (result) => Number(result),
      (err) => fromPictureError(err),
    )
  }

  /**
   * get picture
   */
  public async getPicture(id: IPictureId): Promise<IPicture> {
    const result = await this.getActor().getPictureProfile(BigInt(id))
    return fromResult<ICOption<PictureProfile>, PictureError, IPicture, PictureErrors>(
      result,
      (result1) => {
        const result2 = fromOption(result1)
        if (result2 === undefined) {
          throw PictureErrors.NotFound
        }
        return {
          id: Number(result2.id),
          name: result2.picName,
          description: result2.description,
          status: fromPictureStatus(result2.status),
          data: result2.pic,
          owner: result2.owner,
          createdBy: result2.createdBy,
          createdAt: Number(result2.createdAt),
        }
      },
      (err) => fromPictureError(err),
    )
  }

  /**
   * get picture data
   */
  public async getPictureData(id: IPictureId): Promise<IPictureData> {
    const result = await this.getActor().getPicture(BigInt(id))
    return fromResult<ICOption<Picture>, PictureError, IPictureData, PictureErrors>(
      result,
      (result1) => {
        const result2 = fromOption(result1)
        if (result2 === undefined) {
          throw PictureErrors.NotFound
        }
        return result2
      },
      (err) => fromPictureError(err),
    )
  }

  /**
   * bulk get picture data
   */
  public async bulkGetPictureData(ids: IPictureId[]): Promise<IBulkPictureData> {
    const result = await this.getActor().getPictures(ids.map((id) => BigInt(id)))
    return fromResult<Array<[PictureId, Picture]>, PictureError, IBulkPictureData, PictureErrors>(
      result,
      (result1) => {
        return { data: result1.map(([id, pic]) => ({ id: Number(id), data: pic })) }
      },
      (err) => fromPictureError(err),
    )
  }
}
