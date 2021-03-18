#!/usr/bin/env bash

go build -o memo
GOOS=windows GOARCH=386 CGO_ENABLED=1 CC=i686-w64-mingw32-gcc go build -o memo.exe

#sudo apt-get install gcc-mingw-w64-i686 and sudo apt-get install gcc-mingw-w64-x86-64

sudo cp memo.exe /share/memo/
sudo cp -r public/  /share/memo/