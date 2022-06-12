export const idlFactory = ({ IDL }) => {
  const ReleaseMethod = IDL.Variant({ 'Linear' : IDL.Null });
  const ReleaseRule = IDL.Record({
    'method' : ReleaseMethod,
    'start_date' : IDL.Nat64,
    'amount_per_day' : IDL.Nat64,
  });
  const Raise = IDL.Record({ 'currency' : IDL.Text, 'amount' : IDL.Nat64 });
  const CapitalDetail = IDL.Record({
    'release' : ReleaseRule,
    'raise' : Raise,
    'price_per_icp' : IDL.Nat64,
  });
  const ProjectApplyCapitalDetailCommand = IDL.Record({
    'id' : IDL.Nat64,
    'capital_detail' : CapitalDetail,
  });
  const ProjectError = IDL.Variant({
    'ProjectAlreadyExists' : IDL.Null,
    'ProjectAlreadyCompleted' : IDL.Null,
    'ProjectNotFound' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const BoolProjectResult = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ProjectError,
  });
  const ProjectApplyDescriptionCommand = IDL.Record({
    'id' : IDL.Nat64,
    'description' : IDL.Text,
  });
  const ProjectApplyRoadmapCommand = IDL.Record({
    'id' : IDL.Nat64,
    'roadmap' : IDL.Vec(IDL.Nat8),
  });
  const Team = IDL.Record({
    'twitter' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'picture_id' : IDL.Nat64,
    'picture' : IDL.Vec(IDL.Nat8),
    'position' : IDL.Text,
  });
  const ProjectApplyTeamCommand = IDL.Record({
    'id' : IDL.Nat64,
    'team' : Team,
  });
  const Distribution = IDL.Record({
    'marketing' : IDL.Text,
    'team' : IDL.Text,
  });
  const Tokenomics = IDL.Record({
    'did' : IDL.Text,
    'token' : IDL.Text,
    'distribution' : IDL.Vec(Distribution),
    'total_supply' : IDL.Nat64,
    'symbol' : IDL.Text,
  });
  const ProjectApplyTokenomicsCommand = IDL.Record({
    'id' : IDL.Nat64,
    'tokenomics' : Tokenomics,
  });
  const TrustBy = IDL.Record({
    'link' : IDL.Text,
    'logo' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'logo_id' : IDL.Nat64,
  });
  const ProjectApplyTrustByCommand = IDL.Record({
    'id' : IDL.Nat64,
    'trust_by' : TrustBy,
  });
  const ProjectCreateCommand = IDL.Record({ 'name' : IDL.Text });
  const ProjectCreatedResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : ProjectError,
  });
  const TransactionCreateCommand = IDL.Record({
    'to' : IDL.Text,
    'from' : IDL.Text,
    'memo' : IDL.Nat64,
    'project_id' : IDL.Nat64,
    'amount' : IDL.Nat64,
  });
  const TransactionError = IDL.Variant({
    'ProjectInvalid' : IDL.Null,
    'TransactionNotFinalized' : IDL.Null,
    'TransactionBlockHeightNotValid' : IDL.Null,
    'TransactionAlreadyExists' : IDL.Null,
    'TransactionNotFound' : IDL.Null,
  });
  const TransactionCreatedResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : TransactionError,
  });
  const ProjectIdCommand = IDL.Record({ 'id' : IDL.Nat64 });
  const UserError = IDL.Variant({
    'UserAlreadyExists' : IDL.Null,
    'UserAlreadyDisable' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const BoolUserResult = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : UserError });
  const ProjectEditCommand = IDL.Record({
    'id' : IDL.Nat64,
    'roadmap' : IDL.Vec(IDL.Nat8),
    'tokenomics' : Tokenomics,
    'owner' : IDL.Principal,
    'logo' : IDL.Vec(IDL.Nat8),
    'memo' : IDL.Text,
    'name' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'team' : Team,
    'description' : IDL.Text,
    'capital_detail' : CapitalDetail,
    'links' : IDL.Vec(IDL.Text),
    'logo_id' : IDL.Nat64,
    'contact_info' : IDL.Vec(IDL.Text),
    'wallet_addr' : IDL.Text,
    'trust_by' : TrustBy,
    'roadmap_id' : IDL.Nat64,
    'owner_info' : IDL.Text,
  });
  const UserStatus = IDL.Variant({ 'Enable' : IDL.Null, 'Disable' : IDL.Null });
  const UserEditCommand = IDL.Record({
    'status' : UserStatus,
    'interests' : IDL.Vec(IDL.Text),
    'avatar_uri' : IDL.Text,
    'memo' : IDL.Text,
    'name' : IDL.Text,
    'biography' : IDL.Text,
    'email' : IDL.Text,
    'avatar_id' : IDL.Nat64,
  });
  const ClaimProposalGetQuery = IDL.Record({ 'id' : IDL.Nat64 });
  const Weights = IDL.Record({ 'amount_e8s' : IDL.Nat64 });
  const ProposalState = IDL.Variant({
    'Failed' : IDL.Text,
    'Open' : IDL.Null,
    'Executing' : IDL.Null,
    'Rejected' : IDL.Null,
    'Succeeded' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const ProposalPayload = IDL.Record({
    'method' : IDL.Text,
    'canister_id' : IDL.Principal,
    'message' : IDL.Vec(IDL.Nat8),
  });
  const ClaimProposal = IDL.Record({
    'id' : IDL.Nat64,
    'votes_no' : Weights,
    'voters' : IDL.Vec(IDL.Principal),
    'created_at' : IDL.Nat64,
    'state' : ProposalState,
    'proposer' : IDL.Principal,
    'votes_yes' : Weights,
    'payload' : ProposalPayload,
  });
  const ClaimError = IDL.Variant({
    'ProjectInvalid' : IDL.Null,
    'ProposalNotFound' : IDL.Null,
    'VoterAlreadyVoted' : IDL.Null,
    'ProposalStateNotOpen' : IDL.Null,
    'ProposalAlreadyExists' : IDL.Null,
  });
  const ClaimProposalResult = IDL.Variant({
    'Ok' : ClaimProposal,
    'Err' : ClaimError,
  });
  const ProjectStatus = IDL.Variant({
    'Enable' : IDL.Null,
    'Disable' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const ProgressStage = IDL.Variant({
    'Unopen' : IDL.Null,
    'InProgress' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const ProjectProfile = IDL.Record({
    'id' : IDL.Nat64,
    'roadmap' : IDL.Vec(IDL.Nat8),
    'status' : ProjectStatus,
    'updated_at' : IDL.Nat64,
    'tokenomics' : Tokenomics,
    'owner' : IDL.Principal,
    'logo' : IDL.Vec(IDL.Nat8),
    'memo' : IDL.Text,
    'name' : IDL.Text,
    'tags' : IDL.Vec(IDL.Text),
    'team' : Team,
    'actual_raised' : IDL.Nat64,
    'description' : IDL.Text,
    'claimed' : IDL.Nat64,
    'capital_detail' : CapitalDetail,
    'created_at' : IDL.Nat64,
    'links' : IDL.Vec(IDL.Text),
    'logo_id' : IDL.Nat64,
    'progress' : ProgressStage,
    'contact_info' : IDL.Vec(IDL.Text),
    'wallet_addr' : IDL.Text,
    'trust_by' : TrustBy,
    'roadmap_id' : IDL.Nat64,
    'owner_info' : IDL.Text,
  });
  const ProjectResult = IDL.Variant({
    'Ok' : ProjectProfile,
    'Err' : ProjectError,
  });
  const UserProfile = IDL.Record({
    'id' : IDL.Nat64,
    'status' : UserStatus,
    'owner' : IDL.Principal,
    'interests' : IDL.Vec(IDL.Text),
    'avatar_uri' : IDL.Text,
    'memo' : IDL.Text,
    'name' : IDL.Text,
    'biography' : IDL.Text,
    'created_at' : IDL.Nat64,
    'email' : IDL.Text,
    'avatar_id' : IDL.Nat64,
  });
  const UserResult = IDL.Variant({ 'Ok' : UserProfile, 'Err' : UserError });
  const TransactionIdCommand = IDL.Record({ 'id' : IDL.Nat64 });
  const TransactionProfile = IDL.Record({
    'id' : IDL.Nat64,
    'to' : IDL.Text,
    'from' : IDL.Text,
    'memo' : IDL.Nat64,
    'created_at' : IDL.Nat64,
    'from_princiapl' : IDL.Principal,
    'is_finalize' : IDL.Bool,
    'project_id' : IDL.Nat64,
    'amount' : IDL.Nat64,
    'block_height' : IDL.Nat64,
  });
  const TransactionResult = IDL.Variant({
    'Ok' : TransactionProfile,
    'Err' : TransactionError,
  });
  const ProjectListQuery = IDL.Record({ 'status' : IDL.Text });
  const ProjectProfiles = IDL.Vec(ProjectProfile);
  const ProjectListResult = IDL.Variant({
    'Ok' : ProjectProfiles,
    'Err' : ProjectError,
  });
  const PageQuery = IDL.Record({
    'page_size' : IDL.Nat64,
    'querystring' : IDL.Text,
    'page_num' : IDL.Nat64,
  });
  const ClaimProposalPage = IDL.Record({
    'page_size' : IDL.Nat64,
    'data' : IDL.Vec(ClaimProposal),
    'page_num' : IDL.Nat64,
    'total_count' : IDL.Nat64,
  });
  const ClaimProposalPageResult = IDL.Variant({
    'Ok' : ClaimProposalPage,
    'Err' : ClaimError,
  });
  const ProjectPage = IDL.Record({
    'page_size' : IDL.Nat64,
    'data' : IDL.Vec(ProjectProfile),
    'page_num' : IDL.Nat64,
    'total_count' : IDL.Nat64,
  });
  const ProjectPageResult = IDL.Variant({
    'Ok' : ProjectPage,
    'Err' : ProjectError,
  });
  const TransactionPage = IDL.Record({
    'page_size' : IDL.Nat64,
    'data' : IDL.Vec(TransactionProfile),
    'page_num' : IDL.Nat64,
    'total_count' : IDL.Nat64,
  });
  const TransactionPageResult = IDL.Variant({
    'Ok' : TransactionPage,
    'Err' : TransactionError,
  });
  const UserRegisterCommand = IDL.Record({
    'memo' : IDL.Text,
    'name' : IDL.Text,
    'email' : IDL.Text,
  });
  const RegisterUserResult = IDL.Variant({
    'Ok' : IDL.Text,
    'Err' : UserError,
  });
  const ProposalSubmitResult = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : ClaimError,
  });
  const TransactionUpdateCommand = IDL.Record({
    'transaction_id' : IDL.Nat64,
    'memo' : IDL.Nat64,
    'project_id' : IDL.Nat64,
    'amount' : IDL.Nat64,
    'block_height' : IDL.Nat64,
  });
  const BoolTransactionResult = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : TransactionError,
  });
  const TransactionValidCommand = IDL.Record({
    'project_id' : IDL.Nat64,
    'block_height' : IDL.Nat64,
  });
  const Vote = IDL.Variant({ 'No' : IDL.Null, 'Yes' : IDL.Null });
  const VoteArgs = IDL.Record({ 'vote' : Vote, 'proposal_id' : IDL.Nat64 });
  const VoteResult = IDL.Variant({ 'Ok' : ProposalState, 'Err' : IDL.Text });
  return IDL.Service({
    'apply_project_capital_detail' : IDL.Func(
        [ProjectApplyCapitalDetailCommand],
        [BoolProjectResult],
        [],
      ),
    'apply_project_description' : IDL.Func(
        [ProjectApplyDescriptionCommand],
        [BoolProjectResult],
        [],
      ),
    'apply_project_roadmap' : IDL.Func(
        [ProjectApplyRoadmapCommand],
        [BoolProjectResult],
        [],
      ),
    'apply_project_team' : IDL.Func(
        [ProjectApplyTeamCommand],
        [BoolProjectResult],
        [],
      ),
    'apply_project_tokenomics' : IDL.Func(
        [ProjectApplyTokenomicsCommand],
        [BoolProjectResult],
        [],
      ),
    'apply_project_trust_by' : IDL.Func(
        [ProjectApplyTrustByCommand],
        [BoolProjectResult],
        [],
      ),
    'create_project' : IDL.Func(
        [ProjectCreateCommand],
        [ProjectCreatedResult],
        [],
      ),
    'create_transaction' : IDL.Func(
        [TransactionCreateCommand],
        [TransactionCreatedResult],
        [],
      ),
    'delete_projet' : IDL.Func([ProjectIdCommand], [BoolProjectResult], []),
    'disable_user' : IDL.Func([IDL.Principal], [BoolUserResult], []),
    'edit_project' : IDL.Func([ProjectEditCommand], [BoolProjectResult], []),
    'edit_user' : IDL.Func([UserEditCommand], [BoolUserResult], []),
    'enable_user' : IDL.Func([IDL.Principal], [BoolUserResult], []),
    'get_claim_proposal' : IDL.Func(
        [ClaimProposalGetQuery],
        [ClaimProposalResult],
        [],
      ),
    'get_project' : IDL.Func([ProjectIdCommand], [ProjectResult], []),
    'get_self' : IDL.Func([], [UserResult], []),
    'get_transaction' : IDL.Func(
        [TransactionIdCommand],
        [TransactionResult],
        [],
      ),
    'get_user' : IDL.Func([IDL.Text], [BoolUserResult], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'list_projects' : IDL.Func([ProjectListQuery], [ProjectListResult], []),
    'page_claim_proposals' : IDL.Func(
        [PageQuery],
        [ClaimProposalPageResult],
        [],
      ),
    'page_projects' : IDL.Func([PageQuery], [ProjectPageResult], []),
    'page_transactions' : IDL.Func([PageQuery], [TransactionPageResult], []),
    'register_user' : IDL.Func([UserRegisterCommand], [RegisterUserResult], []),
    'submit_claim_proposal' : IDL.Func(
        [ProposalPayload],
        [ProposalSubmitResult],
        [],
      ),
    'submit_projet' : IDL.Func([ProjectIdCommand], [BoolProjectResult], []),
    'update_transaction' : IDL.Func(
        [TransactionUpdateCommand],
        [BoolTransactionResult],
        [],
      ),
    'valid_transaction' : IDL.Func(
        [TransactionValidCommand],
        [BoolTransactionResult],
        [],
      ),
    'vote_claim_proposal' : IDL.Func([VoteArgs], [VoteResult], []),
  });
};
export const init = ({ IDL }) => { return []; };