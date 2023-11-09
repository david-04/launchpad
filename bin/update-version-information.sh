#!/usr/bin/env bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

echo Updating version information...

VERSION_NUMBER=$(get-version-number.sh)
VERSION_NUMBER_CODE=$(get-version-number.sh | sed 's/"//g;s/\./, /g;s/^/new Version(/;s/$/)/')
COPYRIGHT_YEARS=$(get-copyright-years.sh)
METADATA_TS=../src/resources/version-information.ts

sed -i "s/.*const VERSION_NUMBER.*/export const VERSION_NUMBER = $VERSION_NUMBER_CODE;/g" $METADATA_TS
sed -i "s/.*const COPYRIGHT_YEARS.*/export const COPYRIGHT_YEARS = \"$COPYRIGHT_YEARS\";/g" $METADATA_TS
sed -i "s/.*David Hofmann.*/Copyright (c) $COPYRIGHT_YEARS David Hofmann/" ../LICENSE
sed -i "s/\"version\"\\s*:\\s*\"[^\"]*\"/\"version\": \"$VERSION_NUMBER\"/g" ../dist/package.json ../package.json
