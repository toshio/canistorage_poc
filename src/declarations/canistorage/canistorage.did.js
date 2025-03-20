export const idlFactory = ({ IDL }) => {
  const Error = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : Error });
  const Info = IDL.Record({
    'updated_at' : IDL.Nat64,
    'creator' : IDL.Principal,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'size' : IDL.Nat64,
    'mime_type' : IDL.Text,
    'created_at' : IDL.Nat64,
    'updater' : IDL.Principal,
  });
  const Result_1 = IDL.Variant({ 'Ok' : Info, 'Err' : Error });
  const Permission = IDL.Record({
    'writable' : IDL.Bool,
    'readable' : IDL.Bool,
    'manageable' : IDL.Bool,
  });
  const Result_2 = IDL.Variant({ 'Ok' : Permission, 'Err' : Error });
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Vec(IDL.Text), 'Err' : Error });
  const Result_4 = IDL.Variant({ 'Ok' : IDL.Vec(IDL.Nat8), 'Err' : Error });
  const Result_5 = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : Error });
  return IDL.Service({
    'add_permission' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Bool, IDL.Bool, IDL.Bool],
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
    'deleteDirectory' : IDL.Func([IDL.Text], [Result], []),
    'getInfo' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'hasPermission' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'listFiles' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'load' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'remove_permission' : IDL.Func(
        [IDL.Principal, IDL.Text, IDL.Bool, IDL.Bool, IDL.Bool],
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
        [Result_5],
        [],
      ),
    'version' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
