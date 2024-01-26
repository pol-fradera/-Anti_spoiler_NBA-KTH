import TeamView from "/src/views/teamView.jsx";
import { observer } from "mobx-react-lite";
import {getTodaysDate} from '/src/utilities.js'
import GameCombinationView from "../views/gameCombinationView.jsx";

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Teams(props){

        function handleDateChangeACB(e){
            console.log(props.model.currentDate);
            props.model.currentDate = e.target.value;
            props.model.setGames(e.target.value);
        }

        if (props.model.searchResultsPromiseState.data && props.model.currentGamePromiseState.data) {
            return <GameCombinationView games={props.model.searchResultsPromiseState.data}
                             game_data={props.model.currentGamePromiseState.data}
                             handleDateChange={handleDateChangeACB}
                             model={props.model}
                             favouriteTeams={props.model.favTeams}
                             currentDate={props.model.currentDate}/>;
        }
        return <div> Loading </div>

    }
);