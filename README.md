# Anti-spoiler-NBA-KTH

## Description
A problem for basketball fans in Europe is that NBA games usually happen in the middle of the
night. But when we wake up and open the NBA app it shows all the final results and spoils the
anticipation, when maybe we just wanted to see a specific game score or player performance and
watch the other games later.
There comes in our solution - an app that allows to selectively reveal only the scores of the game
(or per quarter or specific player) and not ruin the anticipation. Additionally we create
recommendations about which parts of the games could be the most interesting to rewatch.
(alternative to highlights which could be too compressed for some user liking)

## Authors
Pol Falguera Guillamón  
Pol Fradera Insa  
Reinis Freibergs  
Joan Palomares Solanes   

## How to deploy
Using the deployed app: https://anti-spoiler-nba-actionv2.web.app/

Or deploying by your self:
First, you need to install some packages using npm:
```
npm install react-tostify --save
npm install react-collapsible --save
npm install react-icons --save
```
Then, you can deploy the project using npm run dev

## What have we done
We implemented the Main page where using an api call we retrieve matches. By default all matches from today,
but user can use the date picker and select another date. The user can click on any of them and will be 
redirected to a new page where the user can unhide the score for each quarter. Additionally recommendations were
addded that indicate which games have the highest and lowest scores. Finally log-in and sign-up pages have been added and for now
place holders for favourite teams and players chosen by the user. The log-in and sign-in pages succesfully register and authenticate users.

## What we still plan to do
We are still working on authenticating the users to implement some persistance for favourites,
create a view where we offer the user some interesting games to see, and add some css.

Update the games view:
1.) Currently no signs whether the games have already happened or not.
2.) Write rules for live-game scores, canceled games or other unordinary situations

In the details view:
1.) Make sure that the game clicked on in the game view is actually the one whose details are shown
2.) Add more options - reveal all, reveal only highest scoring quarter etc.

In log-in and sign-up context:
1.) For both log-in and sign-up, views are planned to be upgraded (give a fancier look), showing successful operations messages or, on the contrary, fails and errors messages. Also, planning to add fill input boxes requirements.
2.) In the sign-up tool, confirm password is planned to be added with its respective errors(e.i. passwords do not match).
3.) Once the user logs in, User-id will be updated with the current logged user ID, UID, provided by the authentication state of firebase. This will allow us to keep track of and update the per-user persistence.
4.) Log-out service planned to be implemented, with the respective changes to the app.
5.) Also planning to add Google log in service.

Recommendations view:
1.) Add more filters based on user preferences

## Project file structure
All the code is in the 'src' folder. Some of the files that contains this folder are:
- GameModel.js -> Model of our app where is store the data of the user.
- ResolvePromise.js -> JavaScript file that implements functions to resolve promises.
- firebaseModel.js -> File that contains all necessary functionality to implement persistance.
- gameSource.js -> File that contains the calls for the API.
- index.jsx -> File that loads the webapp.
- utilities.js -> File with some useful functions.
- CSS -> Folder for the style files
- reactjs -> Folder for the presenters and react files.
- Views -> Folder that contains the files with all the views.
