#!/usr/bin/env bash

set -e
cd "`dirname "${BASH_SOURCE[0]}"`/.."

echo Building tsconfig.json...

SOURCE_DIR=resources/tsconfig/03-compilations
OUTPUT_DIR=resources/tsconfig
TEMP_FILE=$(mktemp -u)

rm -rf "$OUTPUT_DIR/tsconfig.*.json"

for FILE in `cd "$SOURCE_DIR" && ls -1 tsconfig.*.json`
do
    echo - $FILE
    node_modules/.bin/tsc -p "$SOURCE_DIR/$FILE" --showConfig \
        | node scripts/build-tsconfig.js \
        > "$TEMP_FILE"
    mv -f "$TEMP_FILE" "$OUTPUT_DIR/$FILE"
done
