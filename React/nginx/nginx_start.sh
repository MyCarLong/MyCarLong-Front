#!/bin/sh
nginx -t
nginx -g 'daemon off;'
nginx -s reload