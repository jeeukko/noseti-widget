#!/bin/bash
VERSION=$(cat version.txt)

mkdir $VERSION
cp widget.{js,css} $VERSION
scp -r $VERSION jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
scp version.txt jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
