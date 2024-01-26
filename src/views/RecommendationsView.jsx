import { BiSolidBasketball } from "react-icons/bi";
export default function RecommendationsView(props){

    function hasGameHappened() {

        if (props.highestScoreGame.scores.home.linescore.length){
        return(
        <ul className="custom-list">
            <li><BiSolidBasketball /> Most points were scored in the game where {props.highestScoreGame.teams.home.name} hosted the {props.highestScoreGame.teams.visitors.name} with a total of {props.highestScoreGame.scores.home.points + props.highestScoreGame.scores.visitors.points} points.</li>
            <li><BiSolidBasketball /> Game with the least points scored in total was between {props.lowestScoreGame.teams.home.name} and {props.lowestScoreGame.teams.visitors.name}.</li>
            <li><BiSolidBasketball /> In the game between {props.highestScoringQuarterGame.teams.home.name} and {props.highestScoringQuarterGame.teams.visitors.name} one of the teams managed to score a whopping {props.highestScoringQuarter} points in a single quarter.</li>
        </ul>);}
        return 'Games have not yet been played';
    }

    return (<div className="recommendations-container">
        <span style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.5em'}}>Recommendations</span>
        {hasGameHappened()}
    </div>);
}