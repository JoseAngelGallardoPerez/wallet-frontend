#!/usr/bin/env sh

aws s3 rm --recursive s3://demo01.velmie-wallet.de
aws s3 sync --exclude '*.js' --exclude '*.css' --exclude '*.html' ./dist/default-application s3://demo01.velmie-wallet.de
aws s3 sync --exclude '*.*' --include '*.html' --cache-control max-age=0,no-cache,no-store,must-revalidate ./dist/default-application s3://demo01.velmie-wallet.de
#aws s3 sync --exclude '*.*' --include '*.js' --include '*.css' --content-encoding 'gzip' ./dist/default-application s3://demo01.velmie-wallet.de
aws s3 sync --exclude '*.*' --include '*.js' --include '*.css' ./dist/default-application s3://demo01.velmie-wallet.de
