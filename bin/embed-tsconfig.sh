#!/usr/bin/env bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

echo Embedding tsconfig.json...

SOURCE_DIR=../resources/tsconfig/03-compilations
COMPILATIONS=$(cd "$SOURCE_DIR" && ls tsconfig.*.json)
OUTPUT_DIR=../resources/tsconfig

for COMPILATION in $COMPILATIONS; do
    echo - "$COMPILATION"
    tsc -p "$SOURCE_DIR/$COMPILATION" --showConfig >"$OUTPUT_DIR/$COMPILATION"
done

# shellcheck disable=SC2086
node embed-tsconfig.mjs $COMPILATIONS

# shellcheck disable=SC2086
cd "$OUTPUT_DIR" && rm -f $COMPILATIONS
