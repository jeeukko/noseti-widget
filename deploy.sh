#!/bin/bash
VERSION=$(cat package.json | jq -r .version)

mkdir $VERSION
cp widget.{js,css} $VERSION
minify $VERSION/widget.js
minify $VERSION/widget.css
scp -r $VERSION jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
scp package.json jeeukko@nope.fi:/home/jeeukko/cdn-origin_nope_fi/noseti/
rm -r $VERSION
