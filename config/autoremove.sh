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

color_box_red "Remove Dependencies if installed.."

sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node* ~/.npm
sudo rm -rf /usr/local/lib/node*
sudo rm -rf /usr/local/bin/node*
sudo rm -rf /usr/local/include/node*
sudo rm -rf vue
sudo rm -rf vue-init
sudo rm -rf vue-list
sudo apt -y remove curl
sudo apt -y purge nodejs npm
sudo apt -y autoremove

color_box_green "SUCCESS"