#!/bin/bash

baseDir='../server'
logFile='/home/wuyu/log/'

function start () {
    cd $baseDir
    nohup node index.js > $logFile/zx_server.log 2>&1  &
    echo $! > $logFile/zx_server.pid
}
function stop(){
    if [ -e $logFile/zx_server.pid ]; then
        kill -9 `cat $logFile/zx_server.pid`
        rm $logFile/zx_server.pid
    else
        echo "server not running"
    fi
}

case $1 in
    start)
        start
        ;;
    stop)
        stop
        ;;
esac