import GameDetailsView from "/src/views/gameDetailsView.jsx";
import { observer } from "mobx-react-lite";

export default
    observer(             // needed for the presenter to update (its view) when relevant parts of the model change
        function GameDetails(props) {
            if (props.model.currentGamePromiseState.data && props.model.currentGamePlayersPromiseState.data) {
                return <GameDetailsView gameDetails={props.gameDetails}
                    gamePlayers={props.model.currentGamePlayersPromiseState}
                    addFavTeam={(team) => { console.log("HOLA"); props.model.addTeam(team) }} />;

            }
            return <div> Loading </div>

        }
    );