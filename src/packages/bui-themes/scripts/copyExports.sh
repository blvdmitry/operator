#!/usr/bin/env bash
cp -r dist/* . 

mv themes/legacy legacy 
mv themes/rentalcars rentalcars 
mv themes/traveller traveller 
mv themes/traveller_ex traveller_ex

mv themes/themes.js index.js 
mv themes/themes.d.ts index.d.ts