#!/bin/bash
outfile="selectybox-min.js"
uglifyjs selectybox.js -m -c --comments -o $outfile
echo "" >> $outfile
