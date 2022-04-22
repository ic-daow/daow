#!/usr/bin/env bash

set -Eeuo pipefail

dids=(./src/canisters/daow/daow.did)

function build_binding() {
    cargo run -p binding --bin build_binding -- $1
}

for did in "${dids[@]}"; do
    build_binding $did
done
