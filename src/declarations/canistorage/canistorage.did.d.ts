import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Error { 'code' : number, 'message' : string }
export interface Info {
  'updated_at' : bigint,
  'creator' : Principal,
  'sha256' : [] | [Uint8Array | number[]],
  'size' : bigint,
  'mime_type' : string,
  'created_at' : bigint,
  'updater' : Principal,
}
export interface Permission {
  'writable' : boolean,
  'readable' : boolean,
  'manageable' : boolean,
}
export type Result = { 'Ok' : null } |
  { 'Err' : Error };
export type Result_1 = { 'Ok' : Info } |
  { 'Err' : Error };
export type Result_2 = { 'Ok' : Permission } |
  { 'Err' : Error };
export type Result_3 = { 'Ok' : Array<string> } |
  { 'Err' : Error };
export type Result_4 = { 'Ok' : Uint8Array | number[] } |
  { 'Err' : Error };
export type Result_5 = { 'Ok' : bigint } |
  { 'Err' : Error };
export interface _SERVICE {
  'add_permission' : ActorMethod<
    [Principal, string, boolean, boolean, boolean],
    Result
  >,
  'beginUpload' : ActorMethod<[string, string, boolean], Result>,
  'cancelUpload' : ActorMethod<[string], Result>,
  'commitUpload' : ActorMethod<
    [string, bigint, [] | [Uint8Array | number[]]],
    Result
  >,
  'createDirectory' : ActorMethod<[string], Result>,
  'delete' : ActorMethod<[string], Result>,
  'deleteDirectory' : ActorMethod<[string], Result>,
  'getInfo' : ActorMethod<[string], Result_1>,
  'hasPermission' : ActorMethod<[string], Result_2>,
  'listFiles' : ActorMethod<[string], Result_3>,
  'load' : ActorMethod<[string], Result_4>,
  'remove_permission' : ActorMethod<
    [Principal, string, boolean, boolean, boolean],
    Result
  >,
  'save' : ActorMethod<
    [string, string, Uint8Array | number[], boolean],
    Result
  >,
  'sendData' : ActorMethod<[string, bigint, Uint8Array | number[]], Result_5>,
  'version' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
