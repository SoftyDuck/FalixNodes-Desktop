zenity --ok-label="Login to Mullvad" --cancel-label="Cancel" --question --text "Mullvad Login is required. Let's get you logged in!"
MULLID=$( zenity --entry --text="Type in your Mullvad Account Number" )

if [ $? = 0 ]
then
    mullvad account set $MULLID
else
    echo "Mullvad login was cancelled."
fi