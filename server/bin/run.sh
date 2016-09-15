#!/bin/bash

baseDir='../'
logFile='/data/yangjg/log/'
cd $baseDir
nohup node index.js > $logFile/zx_server.log 2>&1  &
echo $! > $logFile/zx_server.pid