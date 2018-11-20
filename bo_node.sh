#!/bin/bash

CONTAINER_NAME='vd_node'
DOCKER_IMG_NAME='vd/node:10.13.0'

# 먼저, 네트워크 브릿지 생성
# docker network create vd_bridge

docker_run_base() {
    # 8949 : nodejs
    docker run --name ${CONTAINER_NAME} $1 -it  \
        -p 8949:8949                            \
        -v /service/vdshare:/service/vdshare    \
        -v /service/vd_ctrl:/service/vd_ctrl    \
        -v /service/vd_node:/service/vd_node    \
        -v /service/vdshare/log/pm2:/root/.pm2  \
        -v /etc/localtime:/etc/localtime:ro     \
        --network=vd_bridge                     \
        ${DOCKER_IMG_NAME} /bin/bash

    docker exec -d -it ${CONTAINER_NAME}  /service/vd_ctrl/vd_node_restart.sh -dev
#    docker exec -d -it  ${CONTAINER_NAME}  /service/vd_ctrl/vd_ssh_restart.sh
#    docker exec -d ${CONTAINER_NAME}  /service/vd_ctrl/netstat.sh
}

docker_daemon() {
    echo 'docker_daemon'
    docker_run_base -d
}

docker_run() {
    echo 'docker_run'
    docker_run_base
}

# export <-> import
# save <-> load
# docker import ${CONTAINER_NAME}
# docker tag <docker-id> ${DOCKER_IMG_NAME}

if [ "$1" == "run" ]; then
    docker_run
elif [ "$1" == "exec" ]; then
    docker exec -it ${CONTAINER_NAME} bash
elif [ "$1" == "attach" ]; then
    docker attach ${CONTAINER_NAME}
elif [ "$1" == "stop" ]; then
    docker stop ${CONTAINER_NAME}
    docker rm  ${CONTAINER_NAME}
elif [ "$1" == "kill" ]; then
    docker kill ${CONTAINER_NAME}
    docker rm  ${CONTAINER_NAME}
elif [ "$1" == "rm" ]; then
  docker rm  ${CONTAINER_NAME}
elif [ "$1" == "restartd" ]; then
    docker stop ${CONTAINER_NAME}
    docker rm  ${CONTAINER_NAME}
    docker_daemon
elif [ "$1" == "restart" ]; then
    docker stop ${CONTAINER_NAME}
    docker rm  ${CONTAINER_NAME}
    docker_run
elif [ "$1" == "commit" ]; then
    docker commit ${CONTAINER_NAME} ${DOCKER_IMG_NAME}
elif [ "$1" == "import" ]; then
    docker import ${CONTAINER_NAME}.tar ${DOCKER_IMG_NAME}
elif [ "$1" == "export" ]; then
    docker export ${CONTAINER_NAME} > ${CONTAINER_NAME}.tar
elif [ "$1" == "save" ]; then
    docker save ${DOCKER_IMG_NAME} > ${CONTAINER_NAME}.save.tar
elif [ "$1" == "load" ]; then
    docker load < ${CONTAINER_NAME}.save.tar
else
    echo "usage : $0 <option>"
fi