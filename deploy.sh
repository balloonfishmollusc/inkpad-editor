#!/bin/sh
export key=/var/www/inkpad-editor

rm -rf $key
mkdir $key

npm run build
cp -r dist/* $key
