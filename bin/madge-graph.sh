#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/lotr-card-game/src
export OUTPUT=graph
export FORMAT="--format amd"
#export LAYOUT="--layout dot"
export LAYOUT="--layout neato"
#export LAYOUT="--layout fdp"
#export LAYOUT="--layout twopi"
#export LAYOUT="--layout circo"

rm ${OUTPUT}
mkdir ${OUTPUT}

# All
madge ${FORMAT} ${LAYOUT}  --image ${OUTPUT}/all.svg ${TARGET}

# Common
madge ${FORMAT} ${LAYOUT} --exclude '^(artifact|model|view|controller)' --image ${OUTPUT}/common.svg ${TARGET}

# Artifact
madge ${FORMAT} ${LAYOUT} --exclude '^(common|model|view|controller)' --image ${OUTPUT}/artifact.svg ${TARGET}

# Model
madge ${FORMAT} ${LAYOUT} --exclude '^(common|artifact|view|controller)' --image ${OUTPUT}/model.svg ${TARGET}

# View
madge ${FORMAT} ${LAYOUT} --exclude '^(common|artifact|model|controller)' --image ${OUTPUT}/view.svg ${TARGET}

# Controller
madge ${FORMAT} ${LAYOUT} --exclude '^(common|artifact|model|view)' --image ${OUTPUT}/controller.svg ${TARGET}
