import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Error = { 'picNotFound' : null } |
  { 'tooLargeQuantity' : null } |
  { 'picAlreadyExisted' : null };
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
}
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<HeaderField>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface Picture { 'content' : Array<number>, 'fileType' : string }
export type PictureId = bigint;
export type PictureId__1 = bigint;
export interface PictureProfile {
  'id' : PictureId__1,
  'pic' : Picture__1,
  'status' : PictureStatus,
  'owner' : UserPrincipal__1,
  'createdAt' : Timestamp,
  'createdBy' : UserPrincipal__1,
  'description' : string,
  'picName' : string,
}
export type PictureStatus = { 'pending' : null } |
  { 'disable' : null } |
  { 'enable' : null };
export interface Picture__1 { 'content' : Array<number>, 'fileType' : string }
export type Result = { 'ok' : PictureId } |
  { 'err' : Error };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<[PictureId, Picture]> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : [] | [PictureProfile] } |
  { 'err' : Error };
export type Result_4 = { 'ok' : [] | [Picture] } |
  { 'err' : Error };
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Array<number>,
}
export interface StreamingCallbackToken {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Timestamp = bigint;
export type UserPrincipal = string;
export type UserPrincipal__1 = string;
export interface _SERVICE {
  'getPicture' : ActorMethod<[PictureId], Result_4>,
  'getPictureProfile' : ActorMethod<[PictureId], Result_3>,
  'getPictures' : ActorMethod<[Array<PictureId>], Result_2>,
  'getTotalPics' : ActorMethod<[], Result_1>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'savePic' : ActorMethod<[Picture, string, string, UserPrincipal], Result>,
}
import type { IDL } from '@dfinity/candid';
export const idlFactory: IDL;