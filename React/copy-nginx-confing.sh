#!/bin/bash

if [ ! -f /etc/nginx/sites-available/default ]; then
    cp /app/nginx.conf /etc/nginx/sites-available/default
fi
