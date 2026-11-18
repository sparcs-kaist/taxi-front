#!/bin/sh
set -eu

# sed 치환 문자열에서 특별한 의미를 갖는 문자를 이스케이프합니다.
escape() {
  printf '%s' "$1" | sed -e 's/[&|\\]/\\&/g'
}

# 빌드된 HTML의 placeholder를 런타임 환경 변수로 치환합니다.
find /app/build -name '*.html' -exec sed -i \
  -e "s|%FRONT_URL%|$(escape "${REACT_APP_FRONT_URL:-}")|g" \
  -e "s|%REACT_APP_GTM_ID%|$(escape "${REACT_APP_GTM_ID:-}")|g" \
  {} +

npx react-inject-env set -d /app/build/

exec caddy run --config /app/serve/Caddyfile --adapter caddyfile
