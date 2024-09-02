#!/bin/bash

# Colors for output
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
BLUE="\033[34m"
ENDCOLOR="\033[0m"

# Clear the screen
clear

# Update and upgrade the system
echo -e "${BLUE}Updating and upgrading the system...${ENDCOLOR}"
apt update -y && apt upgrade -y

# Install required packages
echo -e "${BLUE}Installing required packages...${ENDCOLOR}"
apt install -y lolcat figlet neofetch screenfetch

# Setup directories
echo -e "${BLUE}Setting up directories...${ENDCOLOR}"
rm -rf /root/udp
mkdir -p /root/udp

# Banner
echo ""
sleep 2

# Set timezone to GMT+5:30
echo -e "${BLUE}Changing timezone to GMT+5:30 (Sri Lanka)...${ENDCOLOR}"
ln -fs /usr/share/zoneinfo/Asia/Colombo /etc/localtime

# Download and setup UDP-Custom
echo -e "${BLUE}Downloading and setting up UDP-Custom...${ENDCOLOR}"
wget "https://github.com/noobconner21/UDP-Custom-Script/raw/main/udp-custom-linux-amd64" -O /root/udp/udp-custom
chmod +x /root/udp/udp-custom

# Download default config
echo -e "${BLUE}Downloading default configuration...${ENDCOLOR}"
wget "https://raw.githubusercontent.com/noobconner21/UDP-Custom-Script/main/config.json" -O /root/udp/config.json
chmod 644 /root/udp/config.json

# Setup systemd service
echo -e "${BLUE}Setting up systemd service...${ENDCOLOR}"
if [ -z "$1" ]; then
    cat <<EOF > /etc/systemd/system/udp-custom.service
[Unit]
Description=UDP Custom by ePro Dev. Team and modify by SL CAT EHI TEAM

[Service]
User=root
Type=simple
ExecStart=/root/udp/udp-custom server
WorkingDirectory=/root/udp/
Restart=always
RestartSec=2s

[Install]
WantedBy=default.target
EOF
else
    cat <<EOF > /etc/systemd/system/udp-custom.service
[Unit]
Description=UDP Custom by ePro Dev. Team and modify by SL CAT EHI TEAM

[Service]
User=root
Type=simple
ExecStart=/root/udp/udp-custom server -exclude $1
WorkingDirectory=/root/udp/
Restart=always
RestartSec=2s

[Install]
WantedBy=default.target
EOF
fi

# Setup additional scripts
echo -e "${BLUE}Downloading and setting up additional scripts...${ENDCOLOR}"
cd $HOME
mkdir -p /etc/Sslablk
cd /etc/Sslablk
wget https://github.com/noobconner21/UDP-Custom-Script/raw/main/system.zip
unzip system.zip
cd /etc/Sslablk/system
mv menu /usr/local/bin
chmod +x ChangeUser.sh Adduser.sh DelUser.sh Userlist.sh RemoveScript.sh torrent.sh
cd /usr/local/bin
chmod +x menu
cd /etc/Sslablk
rm system.zip

# Final steps
echo -e "${GREEN}Installation completed.${ENDCOLOR}"
echo -e "${BLUE}Starting and enabling udp-custom service...${ENDCOLOR}"
systemctl start udp-custom &>/dev/null
systemctl enable udp-custom &>/dev/null

echo -e "${BLUE}Rebooting the system...${ENDCOLOR}"
reboot
