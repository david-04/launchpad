#!/usr/bin/env bash

set -e
cd "`dirname "${BASH_SOURCE[0]}"`/.."

echo Updating version information...

VERSION_NUMBER=$(scripts/get-version-number.sh)
COPYRIGHT_YEARS=$(scripts/get-copyright-years.sh)
METADATA_TS=src/resources/version-information.ts

sed -i "s/.*const VERSION_NUMBER_STRING.*/export const VERSION_NUMBER_STRING = \"$VERSION_NUMBER\";/g" $METADATA_TS
sed -i "s/.*const COPYRIGHT_YEARS.*/export const COPYRIGHT_YEARS = \"$COPYRIGHT_YEARS\";/g" $METADATA_TS
sed -i "s/.*David Hofmann.*/Copyright (c) $COPYRIGHT_YEARS David Hofmann/" LICENSE
sed -i "s/\"version\"\\s*:\\s*\"[^\"]*\"/\"version\": \"$VERSION_NUMBER\"/g" dist/package.json package.json
