zenity --ok-label="Login to NordVPN" --cancel-label="Cancel" --question --text "NordVPN Login is required. Let's get you logged in!"
EMAIL=$( zenity --entry --text="Type in your NordVPN Email" )
PASSWORD=$( zenity --password="Type in your NordVPN Password" )

if [ $? = 0 ]
then
    nordvpn login --legacy --username $EMAIL --password $PASSWORD
else
    echo "User exit"
fi

# Zenity is Linux only, it is used since most distros(Really all of them) come with Zenity pre-installed.
# This is used if the user is not logged into their NordVPN account, the VPN area of FalixNodes Desktop uses NordVPN commands, therefore NordVPN is required.
# FalixNodes Desktop has more interactions with NordVPN on Linux thanks to NordVPN providing more functions to their CLI on Linux.