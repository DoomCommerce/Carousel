#!/usr/bin/env bash

clear

echo 'Starting test theme ..'

#
#   » Creates a live preview of the /Dev/Theme folder
#


set -a
config=.config/.env && test -f $config && source $config
set +a


Store="${1:-$Store}"


shopify theme dev       \
    --store=$Store      \
    --path='./Dev/Theme'
