export const idlFactory = ({ IDL }) => {
  const FileInfoForPoC = IDL.Rec();
  const Error = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : Error });
  FileInfoForPoC.fill(
    IDL.Record({
      'updated_at' : IDL.Nat64,
      'creator' : IDL.Principal,
      'writable' : IDL.Vec(IDL.Principal),
      'path' : IDL.Text,
      'size' : IDL.Nat64,
      'created_at' : IDL.Nat64,
      'children' : IDL.Opt(IDL.Vec(FileInfoForPoC)),
      'mimetype' : IDL.Text,
      'readable' : IDL.Vec(IDL.Principal),
      'updater' : IDL.Principal,
      'manageable' : IDL.Vec(IDL.Principal),
    })
  );
  const Result_1 = IDL.Variant({ 'Ok' : FileInfoForPoC, 'Err' : Error });
  const Info = IDL.Record({
    'updated_at' : IDL.Nat64,
    'creator' : IDL.Principal,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'size' : IDL.Nat64,
    'created_at' : IDL.Nat64,
    'mimetype' : IDL.Text,
    'updater' : IDL.Principal,
  });
  const Result_2 = IDL.Variant({ 'Ok' : Info, 'Err' : Error });
  const Permission = IDL.Record({
    'writable' : IDL.Bool,
    'readable' : IDL.Bool,
    'manageable' : IDL.Bool,
  });
  const Result_3 = IDL.Variant({ 'Ok' : Permission, 'Err' : Error });
  const Result_4 = IDL.Variant({ 'Ok' : IDL.Vec(IDL.Text), 'Err' : Error });
  const Download = IDL.Record({
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'downloaded_at' : IDL.Nat64,
    'chunk' : IDL.Vec(IDL.Nat8),
    'size' : IDL.Nat64,
  });
  const Result_5 = IDL.Variant({ 'Ok' : Download, 'Err' : Error });
  const Result_6 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : Error });
  return IDL.Service({
    'addPermission' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Bool, IDL.Bool, IDL.Bool],
        [Result],
        [],
      ),
    'beginUpload' : IDL.Func([IDL.Text, IDL.Text, IDL.Bool], [Result], []),
    'cancelUpload' : IDL.Func([IDL.Text], [Result], []),
    'commitUpload' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Opt(IDL.Vec(IDL.Nat8))],
        [Result],
        [],
      ),
    'createDirectory' : IDL.Func([IDL.Text], [Result], []),
    'delete' : IDL.Func([IDL.Text], [Result], []),
    'deleteDirectory' : IDL.Func([IDL.Text, IDL.Bool], [Result], []),
    'forceResetForPoC' : IDL.Func([], [Result], []),
    'getAllInfoForPoC' : IDL.Func([], [Result_1], ['query']),
    'getInfo' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'hasPermission' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'initCanistorage' : IDL.Func([], [Result], []),
    'listFiles' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'load' : IDL.Func([IDL.Text, IDL.Nat64], [Result_5], ['query']),
    'removePermission' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Bool, IDL.Bool, IDL.Bool],
        [Result],
        [],
      ),
    'save' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8), IDL.Bool],
        [Result],
        [],
      ),
    'sendData' : IDL.Func(
        [IDL.Text, IDL.Nat64, IDL.Vec(IDL.Nat8)],
        [Result_6],
        [],
      ),
    'version' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
