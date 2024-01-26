import Main from "/src/reactjs/MainPresenter.jsx";
import Teams from "/src/reactjs/teamPresenter.jsx";
import Recommendations from "/src/reactjs/RecommendationsPresenter.jsx";
import "/src/css/main.css";
import { getNameFromGame } from "../utilities";
import { FcDeleteRow } from "react-icons/fc";

function MainView(props) {
    console.log(props.userLogged, props.model.favGames);
    return (
        <div className="main-view">
            <div id="upperBar">
                <div className="team">
                    {props.userLogged && (<span id="favTeams">Favourite teams: &nbsp; </span>)}
                    <ul id="teamsList">{/*Display when button clicked*/}
                        {props.model.favTeams.map(getTeamNamesCB)}
                    </ul>
                </div>

                <div className="game">
                    {/*{props.userLogged && (<span id="favGames">Favourite games</span>)}*/}
                    {/*<ul id="gamesList">/!*Display when button hover*!/*/}
                    {/*    {props.model.favGames.map(getGameNamesCB)}*/}
                    {/*</ul>*/}
                    Click on a game and pick favourite teams to diplay them on top!
                </div>

                {/*<div className="player">*/}
                {/*    {props.userLogged && (<span id="favPlayers">Favourite players</span>)}*/}
                {/*    <ul id="playersList"> /!*Display when button hover*!/*/}
                {/*        /!*sprops.model.favPlayers.map(getPlayerNamesCB)*!/*/}
                {/*    </ul>*/}
                {/*</div>*/}

                <div className="logout">
                    {props.userLogged ? (<button id="logout" onClick={logoutReq}>Log out</button>) : (<button onClick={clickedCB}>Log in</button>)}
                </div>
            </div>
            <div id="lowerDiv">
                <Teams model={props.model} />
                <Recommendations model={props.model} />
            </div>

        </div>
    );

    function logoutReq(evt) {
        props.logOutUser();
    }

    function getTeamNamesCB(object) {
        function removeTeamACB(evt){
            props.removeTeam(object);
        }

        return (        <li>
            {object}
            <button onClick={removeTeamACB} style={{background: 'none' }}>< FcDeleteRow size={24}/></button>
        </li>);
    }

    function getGameNamesCB(object) {
        //console.log("GIT NAME", object, object.teams.home.name);
            return (<li>{object.teams.home.name} - {object.teams.visitors.name}</li>);
     }

    function getPlayerNamesCB(object) {
        return (<li onClick={(evt) => {window.location.hash = "#/player/"}}>{object.name}</li>);
    }

    function clickedCB(evt) {
        window.location.hash = "/login";
    }


}

export default MainView;