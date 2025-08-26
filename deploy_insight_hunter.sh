#!/usr/bin/env bash
set -euo pipefail

PROJECT="${PROJECT:-insight-hunter-demo}"
OUTDIR="${OUTDIR:-dist}"

echo "==> Ensuring wrangler.toml exists and is Pages-ready"
if [[ ! -f wrangler.toml ]]; then
  cat > wrangler.toml <<TOML
name = "${PROJECT}"
compatibility_date = "2024-11-12"
pages_build_output_dir = "${OUTDIR}"
TOML
fi

# Guarantee pages_build_output_dir matches OUTDIR
if ! grep -q "^pages_build_output_dir *= *\"${OUTDIR}\"" wrangler.toml; then
  if grep -q "^pages_build_output_dir" wrangler.toml; then
    sed -i.bak "s|^pages_build_output_dir *= *\".*\"|pages_build_output_dir = \"${OUTDIR}\"|" wrangler.toml
  else
    printf "\npages_build_output_dir = \"%s\"\n" "${OUTDIR}" >> wrangler.toml
  fi
fi

echo "==> Building frontend"
npm run build

if [[ ! -d "${OUTDIR}" ]]; then
  echo "Build output folder \"${OUTDIR}\" not found. Aborting."
  exit 1
fi

# Decide auth path
if [[ -n "${CLOUDFLARE_API_TOKEN-}" ]]; then
  echo "==> Using API Token mode"
  # Ensure account_id exists in wrangler.toml
  if ! grep -q "^account_id *= *\"" wrangler.toml; then
    echo "==> Discovering account_id via wrangler whoami"
    ACCOUNT_ID="$(wrangler whoami 2>/dev/null | awk "/Account ID/ {print \$3; exit}")"
    if [[ -z "${ACCOUNT_ID}" ]]; then
      echo "Could not auto-detect Account ID. Set it manually in wrangler.toml or export ACCOUNT_ID."
      exit 1
    fi
    printf "account_id = \"%s\"\n" "${ACCOUNT_ID}" >> wrangler.toml
  fi
  echo "==> Deploying to Cloudflare Pages with API token"
  wrangler pages deploy "${OUTDIR}" --project-name="${PROJECT}"
else
  echo "==> Using OAuth mode (device login if needed)"
  if ! wrangler whoami >/dev/null 2>&1; then
    wrangler login
  fi
  echo "==> Deploying to Cloudflare Pages with OAuth"
  wrangler pages deploy "${OUTDIR}" --project-name="${PROJECT}"
fi

echo "==> Done. Your live URL is shown above by Wrangler.
