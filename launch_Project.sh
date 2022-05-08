#!/bin/bash

function color_box_green()
{
    local s="$*"
    tput setaf 13
    echo " -${s//?/-}
| $(tput setaf 2)$s$(tput setaf 13) |
 -${s//?/-}-"
    tput sgr 0
}

function color_box_red()
{
    local s="$*"
    tput setaf 3
    echo " -${s//?/-}-
| $(tput setaf 1)$s$(tput setaf 3) |
 -${s//?/-}-"
    tput sgr 0
}

./config/autoremove.sh

echo ""
color_box_red "Installing Dependencies.."

echo "Update system :"
sleep 1
sudo apt update
sleep 1

echo ""
echo "Upgrade system :"
sleep 1
sudo apt -y upgrade
sleep 1

echo ""
echo "Install curl :"
sleep 1
sudo apt -y install curl
sleep 1

echo ""
echo "Installing nodejs :"
sleep 1
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sleep 1
sudo apt -y install nodejs
sleep 1

#echo ""
#echo "Installing npm :"
#sleep 1
#sudo apt -y install npm
#sleep 1

echo ""
echo "Dependencies Versions :"
sleep 1
echo "curl version : "
curl --version
sleep 1

echo "npm version : "
npm --version
sleep 1
echo "node version : "
node -v
sleep 1

echo "Install vue js : "
sleep 1
sudo npm install -g @vue/cli
sleep 1

echo ""
color_box_green "SUCCESS : Dependencies Installed.."

echo ""
color_box_green "Launching Project.."

sleep 1
cd poap_gen/
sleep 1
npm install
sleep 1
npm run serve
