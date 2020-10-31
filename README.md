### Overview
This project is a web app that allows you to search the stats for any player in Destiny 2.<br/>
Created react and node.js.<br/>
Data is pulled from the [Bungie.net API](https://github.com/Bungie-net/api).<br/>

### Setup
After downloading go into the file src.components.CharList.js<br/>
Change the variable apiKey to your personal api key<br/>
You key does not need any advanced permissions<br/>
After those changes return to the root directory and run npm start<br/>
The app should now be launched on localhost<br/>

### Usage
The top of the page has search bar where you enter the display name of the target chaacter<br/>
Under that will be the option to select the platform of the desired character<br/>
After filling those out click the search button and the player stats will be displayed.<br/>

*There is also an update button to refresh your character list in case there is a delay from the api request<br/>

### Information
Data is separated by the individual characters on the searched account<br/>
Cards will be displayed with general character info as well as detailed stats<br/>
Stats are separated by PVE, PVP, and Gambit<br/>

### Future updates
Currently planning to add the following features/fixes:<br/>
-Auto updating the characters when they are retrieved from the api and removing the refresh button<br/>
-More detailed stats such as favorite weapon and personal records<br/>
-A UI that doesn't look like it was made in 1995<br/>
