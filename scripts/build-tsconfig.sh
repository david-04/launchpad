#!/usr/bin/env bash

set -e
cd "`dirname "${BASH_SOURCE[0]}"`/.."

echo Building tsconfig.json...

SOURCE_DIR=resources/tsconfig/03-compilations
COMPILATIONS=$(cd "$SOURCE_DIR" && ls -1 tsconfig.*.json)
OUTPUT_DIR=resources/tsconfig

for COMPILATION in $COMPILATIONS
do
    echo - $COMPILATION
    node_modules/.bin/tsc -p "$SOURCE_DIR/$COMPILATION" --showConfig > "$OUTPUT_DIR/$COMPILATION"
done

node scripts/build-tsconfig.js $COMPILATIONS

cd $OUTPUT_DIR && rm -f $COMPILATIONS
