#!/usr/bin/env bash

set -Eeuo pipefail

dids=(./src/canisters/daow/daow.did)

function build_binding() {
    set -x
    cargo run -p binding --bin build_binding -- $1 "packages/binding/src/actor"
    set +x
}

for did in "${dids[@]}"; do
    build_binding $did
done

binding_ws=@daow/binding
set -x
npm install -w $binding_ws
npm run -w $binding_ws build
