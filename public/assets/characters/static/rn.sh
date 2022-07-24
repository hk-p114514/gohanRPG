#!/bin/bash

# rename pipo-enemyxxx.png to ???.png

# input number example '001' after print 'INPUT :'
echo -n "Input : "
read input

echo -n "after : "
read after

rename 's/pipo-enemy'"$input"'/'"$after"'/' ./*.png

./rn.sh

