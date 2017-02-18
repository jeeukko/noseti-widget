#!/bin/bash
VERSION=$(cat package.json | jq -r .version)

mkdir $VERSION
cp widget.{js,css} $VERSION
scp -r $VERSION jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
scp package.json jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
rm -r $VERSION
