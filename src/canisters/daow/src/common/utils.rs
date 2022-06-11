
use std::fmt::{Formatter, Display};

use ic_ledger_types::AccountIdentifier;


pub fn from_hex(hex_str: &str) -> Result<AccountIdentifier, String> {
    let hex: Vec<u8> = hex::decode(hex_str).map_err(|e| e.to_string())?;
    AccountIdentifier::from_slice(&hex[..]).map_err(|err| match err {
        // Since the input was provided in hex, return an error that is hex-friendly.
        AccountIdParseError::InvalidLength(_) => format!(
            "{} has a length of {} but we expected a length of 64 or 56",
            hex_str,
            hex_str.len()
        ),
        AccountIdParseError::InvalidChecksum(err) => err.to_string(),
    })
}

/// Converts a blob into an `AccountIdentifier`.
///
/// The blob can be either:
///
/// 1. The 32-byte canonical format (4 byte checksum + 28 byte hash).
/// 2. The 28-byte hash.
///
/// If the 32-byte canonical format is provided, the checksum is verified.
pub fn accountfrom_slice(v: &[u8]) -> Result<AccountIdentifier, AccountIdParseError> {
    // Try parsing it as a 32-byte blob.
    match v.try_into() {
        Ok(h) => {
            // It's a 32-byte blob. Validate the checksum.
            check_sum(h).map_err(AccountIdParseError::InvalidChecksum)
        }
        Err(_) => {
            // Try parsing it as a 28-byte hash.
            match v.try_into() {
                Ok(hash) => Ok(AccountIdentifier { hash }),
                Err(_) => Err(AccountIdParseError::InvalidLength(v.to_vec())),
            }
        }
    }
}

pub fn to_hex(&self) -> String {
    hex::encode(self.to_vec())
}

/// An error for reporting invalid checksums.
#[derive(Debug, PartialEq, Eq)]
pub struct ChecksumError {
    input: [u8; 32],
    expected_checksum: [u8; 4],
    found_checksum: [u8; 4],
}

impl Display for ChecksumError {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "Checksum failed for {}, expected check bytes {} but found {}",
            hex::encode(&self.input[..]),
            hex::encode(self.expected_checksum),
            hex::encode(self.found_checksum),
        )
    }
}

/// An error for reporting invalid Account Identifiers.
#[derive(Debug, PartialEq, Eq)]
pub enum AccountIdParseError {
    InvalidChecksum(ChecksumError),
    InvalidLength(Vec<u8>),
}