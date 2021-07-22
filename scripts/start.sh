#!/bin/bash
cd /home/ubuntu/EveryReview/server
authbind --deep pm2 start index.js
