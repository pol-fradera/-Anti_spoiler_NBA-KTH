import teamLogoLinks from '/src/utilities.js'
import Collapsible from 'react-collapsible';
import GameDetails from "/src/reactjs/gameDetailsPresenter.jsx";
import { FaStar } from "react-icons/fa6";

function TeamView(props){
    console.log(props);
    window.model = props;

    function compareTeamsByFavouritesCB(gameA, gameB){

        const isFavoriteA = props.favouriteTeams.includes(gameA.teams.home.name) || props.favouriteTeams.includes(gameA.teams.visitors.name)
        const isFavoriteB = props.favouriteTeams.includes(gameB.teams.home.name) || props.favouriteTeams.includes(gameB.teams.visitors.name)

        if (isFavoriteA && !isFavoriteB) {
            return -1; // teamA comes first
        } else if (!isFavoriteA && isFavoriteB) {
            return 1; // teamB comes first
        } else {
            return 0; // maintain the existing order
        }

    }

    function sortTeamsByFavourites(teams){
        return [... teams].sort(compareTeamsByFavouritesCB)
    }


    function renderSearchResultsCB(result) {

        function gameChoiceACB(){window.location.hash = "#/details"; console.log(result.home_team.name);}

        function chooseDetails(result) {
            if (result.scores.home.linescore[0]) {
                
                return (
                    <p>
                        <GameDetails gameDetails={result} model={props.model}/>
                    </p>
                );
            }
            return (
                <p style={{ textAlign: 'center' }}>Yet to be played</p>
            );
        }

        function chooseDetailsFront(result) {
            if (result.scores.home.linescore[0]) {
                return (
                    <p>-</p>
                );
            }
            return (
                <p style={{ textAlign: 'center' }}>Yet to be played</p>
            );
        }

        function indicateFavouriteTeam(gameName){
            if (props.favouriteTeams.includes(gameName)){
                return < FaStar />;
            } return ''
        }


        const columnStyle = {
            width: '180px', // Adjust the width as needed
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '10px', // Added space between rows
        };

        const separatorStyle = {
            fontSize: '20px',
            margin: '5px 0',
        };

        const imageStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center'}

        return (
                <div key={result.id}><Collapsible trigger={            <div key={result.id} style={imageStyle}>
                    <div>{indicateFavouriteTeam(result.teams.visitors.name)}</div>
                    <div style={columnStyle}>
                        <img
                            src={result.teams.visitors.logo}
                            width="50"
                            height="33"
                            alt={result.teams.visitors.nickname}
                            style={{ marginBottom: '5px' }}
                        />
                        <div>{result.teams.visitors.nickname}</div>
                    </div>
                    <div style={{ ...separatorStyle, margin: '0 10px', lineHeight: '50px' }}>{chooseDetailsFront(result)}</div>
                    <div style={columnStyle}>
                        <img
                            src={result.teams.home.logo}
                            width="50"
                            height="33"
                            alt={result.teams.home.nickname}
                            style={{ marginBottom: '5px' }}
                        />
                        <div>{result.teams.home.nickname}</div>
                    </div>
                    <div>{indicateFavouriteTeam(result.teams.home.name)}</div>
                </div>}>
                    {chooseDetails(result)}
                </Collapsible></div>
        );
    }


    return (
        <div>Pick the date to display games:
            <input
                type="date"
                value={props.currentDate}
                onChange={props.handleDateChange}
            />
            {sortTeamsByFavourites(props.games).map(renderSearchResultsCB)}
        </div>)
}

export default TeamView;