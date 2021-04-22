#!/usr/bin/env sh

API_DOMAIN=$(python fetch_whitelisted_domain.py "$API_BASE_URL")

echo "$API_DOMAIN"
echo "$API_BASE_URL"

find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,WHITELISTED_DOMAIN_TO_REPLACE,'"$API_DOMAIN"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,API_BASE_URL_TO_REPLACE,'"$API_BASE_URL"',g' {} \;
nginx -g "daemon off;"
