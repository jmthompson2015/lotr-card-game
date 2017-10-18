#! /bin/bash

export HOME=/Volumes/StorageDrive/jmthompson
export TARGET=${HOME}/git/lotr-card-game/src
export FORMAT="--format amd"

madge ${FORMAT} --circular ${TARGET}
