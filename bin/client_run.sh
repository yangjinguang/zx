#!/bin/bash

baseDir='../'
logFile='/data/yangjg/log/'

function start () {
    cd $baseDir
    nohup gulp serve > $logFile/zx_client.log 2>&1  &
    echo $! > $logFile/zx_client.pid
}
function stop(){
    if [ -e $logFile/zx_client.pid ]; then
        kill -9 `cat $logFile/zx_client.pid`
        rm $logFile/zx_client.pid
    else
        echo "client not running"
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