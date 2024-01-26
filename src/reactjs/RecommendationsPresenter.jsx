import RecommendationsView from "../views/RecommendationsView.jsx";
import { observer } from "mobx-react-lite";
import {getTodaysDate, getMaxScore} from '/src/utilities.js'


export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Recommendations(props){

        function handleDateChange(e){
            props.model.currentDate = e.target.value;
            props.model.setGames(e.target.value);
        }

        if (props.model.searchResultsPromiseState.data) {

            const sortedGames = props.model.sortGamesByTotalScore(props.model.searchResultsPromiseState.data)

            const sortedQuarters = props.model.sortGamesByMaxQuarterScore(props.model.searchResultsPromiseState.data)

            return <RecommendationsView games={props.model.searchResultsPromiseState.data}
                             handleDateChange={handleDateChange}
                             currentDate={props.model.currentDate}
                             highestScoringQuarterGame={sortedQuarters[sortedQuarters.length-1]}
                             highestScoringQuarter={getMaxScore(sortedQuarters[sortedQuarters.length-1])}
                             highestScoreGame={sortedGames[sortedGames.length-1]}
                             lowestScoreGame={sortedGames[0]}/>;
        }
        return <div> Loading </div>

    }
);