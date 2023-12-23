#!/usr/bin/env bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

echo Embedding assets...
node embed-assets.mjs "$@"
