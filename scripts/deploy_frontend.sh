#!/usr/bin/env bash

set -Eeuo pipefail

pushd packages/frontend
rm -rf dist
npm run build
popd

dfx deploy --network ic frontend
