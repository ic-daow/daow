export const idlFactory = ({ IDL }) => {
  const ProjectCreateCommand = IDL.Record({
    'title' : IDL.Text,
    'logo' : IDL.Vec(IDL.Nat8),
    'memo' : IDL.Opt(IDL.Text),
    'tags' : IDL.Vec(IDL.Text),
    'links' : IDL.Vec(IDL.Text),
    'information' : IDL.Text,
    'contact_info' : IDL.Vec(IDL.Text),
    'wallet_addr' : IDL.Text,
    'owner_info' : IDL.Text,
  });
  const ProjectCreatedError = IDL.Variant({
    'ProjectAlreadyExists' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const ProjectCreatedResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : ProjectCreatedError,
  });
  const UserStatus = IDL.Variant({ 'Enable' : IDL.Null, 'Disable' : IDL.Null });
  const UserProfile = IDL.Record({
    'id' : IDL.Nat64,
    'status' : UserStatus,
    'owner' : IDL.Principal,
    'memo' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'created_at' : IDL.Nat64,
    'email' : IDL.Text,
  });
  const UserRegisterCommand = IDL.Record({
    'memo' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'email' : IDL.Text,
  });
  const RegisterResult = IDL.Variant({
    'user_already_exists' : IDL.Null,
    'internal_error' : IDL.Null,
    'user_already_disabled' : IDL.Record({ 'owner' : IDL.Principal }),
    'registered' : IDL.Record({ 'owner' : IDL.Principal }),
  });
  return IDL.Service({
    'create_project' : IDL.Func(
        [ProjectCreateCommand],
        [ProjectCreatedResult],
        [],
      ),
    'get_self' : IDL.Func([], [IDL.Opt(UserProfile)], []),
    'get_user' : IDL.Func([IDL.Text], [IDL.Opt(UserProfile)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'register_user' : IDL.Func([UserRegisterCommand], [RegisterResult], []),
  });
};
export const init = ({ IDL }) => { return []; };