
pub(crate) const EMPTY_STR : &str = "";

pub const TIME_NANOS_PER_DAY : u64 = 86400000000000;

pub const ICP_E8S_PER_ONE: u64 = 100000000;

pub const BLOCK_ARCHIVE_TRIGGER_THRESHOLD: u32 = 2000;
pub const BLOCK_ARCHIVE_SIZE: u32 = 1000;
pub const MIN_CANISTER_STORAGE_BYTES: u32 = 100 * 1024 * 1024;
// 3.9GB
pub const MAX_CANISTER_STORAGE_BYTES: u32 = 4294967295u32 - MIN_CANISTER_STORAGE_BYTES;
// 2T
pub const CYCLES_PER_AUTO_SCALING: u64 = 2_000_000_000_000;
pub const CYCLES_PER_DFT_CANISTER: u64 = 2_000_000_000_000;

pub const MAX_BLOCKS_PER_REQUEST: u32 = 100;
pub const MAX_MESSAGE_SIZE_BYTES: u32 = 1024 * 1024 + 8 * 1024 * 1024 / 10;
pub const DEFAULT_FEE_RATE_DECIMALS: u8 = 8;
/// The maximum number of transactions that we attempt to purge in one go.
/// If there are many transactions in the buffer, purging them all in one go
/// might require more instructions than one message execution allows.
/// Hence, we purge old transactions incrementally, up to
/// MAX_TRANSACTIONS_TO_PURGE at a time.
pub const MAX_TRANSACTIONS_TO_PURGE: usize = 100_000;
// transaction window (nanos)
pub const DEFAULT_TRANSACTION_WINDOW: u64 = 24 * 60 * 60 * (10u64.pow(9));
// default max transactions in windows
pub const DEFAULT_MAX_TRANSACTIONS_IN_WINDOW: u64 = 1_000_000u64;
// permitted drift (nanos)
pub const PERMITTED_DRIFT: u64 = 60 * (10u64.pow(9));