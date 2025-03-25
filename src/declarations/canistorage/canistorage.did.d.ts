import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Download {
  'sha256' : [] | [Uint8Array | number[]],
  'downloaded_at' : bigint,
  'chunk' : Uint8Array | number[],
  'size' : bigint,
}
export interface Error { 'code' : number, 'message' : string }
export interface FileInfoForPoC {
  'updated_at' : bigint,
  'creator' : Principal,
  'writable' : Array<Principal>,
  'path' : string,
  'size' : bigint,
  'created_at' : bigint,
  'children' : [] | [Array<FileInfoForPoC>],
  'mimetype' : string,
  'readable' : Array<Principal>,
  'updater' : Principal,
  'manageable' : Array<Principal>,
}
export interface Info {
  'updated_at' : bigint,
  'creator' : Principal,
  'sha256' : [] | [Uint8Array | number[]],
  'size' : bigint,
  'created_at' : bigint,
  'mimetype' : string,
  'updater' : Principal,
}
export interface Permission {
  'writable' : boolean,
  'readable' : boolean,
  'manageable' : boolean,
}
export type Result = { 'Ok' : null } |
  { 'Err' : Error };
export type Result_1 = { 'Ok' : FileInfoForPoC } |
  { 'Err' : Error };
export type Result_2 = { 'Ok' : Info } |
  { 'Err' : Error };
export type Result_3 = { 'Ok' : Permission } |
  { 'Err' : Error };
export type Result_4 = { 'Ok' : Array<string> } |
  { 'Err' : Error };
export type Result_5 = { 'Ok' : Download } |
  { 'Err' : Error };
export type Result_6 = { 'Ok' : bigint } |
  { 'Err' : Error };
export interface _SERVICE {
  'addPermission' : ActorMethod<
    [string, Principal, boolean, boolean, boolean],
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
  'deleteDirectory' : ActorMethod<[string, boolean], Result>,
  'forceResetForPoC' : ActorMethod<[], Result>,
  'getAllInfoForPoC' : ActorMethod<[], Result_1>,
  'getInfo' : ActorMethod<[string], Result_2>,
  'hasPermission' : ActorMethod<[string], Result_3>,
  'initCanistorage' : ActorMethod<[], Result>,
  'listFiles' : ActorMethod<[string], Result_4>,
  'load' : ActorMethod<[string, bigint], Result_5>,
  'removePermission' : ActorMethod<
    [string, Principal, boolean, boolean, boolean],
    Result
  >,
  'save' : ActorMethod<
    [string, string, Uint8Array | number[], boolean],
    Result
  >,
  'sendData' : ActorMethod<[string, bigint, Uint8Array | number[]], Result_6>,
  'version' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
