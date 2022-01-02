#!/usr/bin/env bash
set -euo pipefail

php artisan backup:database
php artisan migrate --force
php artisan db:seed --force