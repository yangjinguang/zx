#!/bin/bash

baseDir='../'
logFile='~/log/zx_server.log'
cd baseDir
nohup node index.js > $logFile 2 > &1  &
echo $! > $logFile/zx_server.pid