import { useState } from 'react';
import "/src/css/gameDetails.css"
import teamLogoLinks from '/src/utilities.js'


function GameDetailsView(props){
    const array = props.gameDetails;
    const g_id = array.id;
    const v_scores = array.scores.visitors;
    const h_scores = array.scores.home;
    window.model = props;

    const quarters = Array.from({ length: v_scores.linescore.length}, (_, index) => (index + 1).toString());

    function renderBodyTableCB(quarter) {
        const isExtraQuarter = quarter > 4;
        const quarter_OT = isExtraQuarter ? `OT${quarter - 4}` : quarter;
        return (
            <tr key={`a${quarter}${g_id}`}>
                <td>{quarter_OT}</td>
                <td>
                    <p 
                        id={`a${quarter}${g_id}`} 
                        style={{
                            display:"none", 
                            fontWeight: parseInt(v_scores.linescore[quarters.indexOf(quarter)]) > parseInt(h_scores.linescore[quarters.indexOf(quarter)]) ? 'bold' : 'normal'
                            }}>
                                {v_scores.linescore[quarters.indexOf(quarter)]}
                    </p>
                </td>
                <td>
                    <p 
                        id={`h${quarter}${g_id}`} 
                        style={{
                            display:"none", 
                            fontWeight: parseInt(h_scores.linescore[quarters.indexOf(quarter)]) > parseInt(v_scores.linescore[quarters.indexOf(quarter)]) ? 'bold' : 'normal'
                            }}>
                                {h_scores.linescore[quarters.indexOf(quarter)]}
                    </p>
                </td>
                <td style={{ width: '50px' }}>
                    <img id={`${quarter}${g_id}`}
                        src="https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png"
                        className="Unhide"
                        onClick={hideShowQuarterACB}>
                    </img>
                </td>
            </tr>
        );
    }

    return (
        <div className='game-details-view'>
            <h3>{array.date.start} - {array.arena.name}</h3>
            <table className="game-table">         
                <thead>
                    <tr>
                        <th>Quarter</th>
                        <th>{`${array.teams.visitors.name} `}<img src={array.teams.visitors.logo}
                                width="50"
                                height="33"
                               /></th>
                        <th><img src={array.teams.home.logo}
                                width="50"
                                height="33"
                               />{` ${array.teams.home.name}`}</th>
                        <th>Unhide/Hide</th>
                    </tr>
                </thead>
                <tbody>
                    {quarters.map(renderBodyTableCB)}
                    <tr>
                        <td>Total</td>
                        <td><p id={`ar${g_id}`} style={{display:"none", fontWeight: v_scores.points > h_scores.points ? 'bold' : 'normal'}}>{v_scores.points}</p></td>
                        <td><p id={`hr${g_id}`} style={{display:"none", fontWeight: h_scores.points > v_scores.points ? 'bold' : 'normal'}}>{h_scores.points}</p></td>
                        <td style={{ width: '50px' }}>
                            <img id={`r${g_id}`} src="https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png" className="Unhide" onClick={hideShowQuarterACB}></img>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={addHomeToFavCB}>Add {array.teams.home.name} to favourites</button>
            <button onClick={addVisToFavCB}>Add {array.teams.visitors.name} to favourites</button>
            <table className="game-table">
                <thead>
                    <tr>
                        <th>Recommendations</th>
                        <th>Info</th>
                        <th>Unhide/Hide</th>
                    </tr>
                </thead>
                <tbody>

                <tr>
                    <td>Quarter with the highest score</td>
                    <td style={{ width: '50%' }}> <p id={`rhq${g_id}`} style={{display:"none"}}>{highestQuarterCB()}</p></td>
                    <td style={{ width: '50px' }}>
                    <img id={`hq${g_id}`} src="https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png" className="Unhide" onClick={hideShowRecACB}></img>
                    </td>
                </tr>
                {/* <tr>
                    <td>Top scorer</td>
                    <td> <p id="rts" style={{display:"none"}}>{topScorerCB()}</p></td>
                    <td>
                    <img id="ts" src="https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png" className="Unhide" onClick={hideShowRecACB}></img>
                    </td>
                </tr> */}
                </tbody>
            </table>
        </div>
    );

    function backToMainACB(evt){
        window.location.hash="#/main";
    }


    function addHomeToFavCB(evt){
        console.log("PROPS.model = ", props.model);
        props.addFavTeam(array.teams.home.name);
    }
    function addVisToFavCB(evt){
        props.addFavTeam(array.teams.visitors.name);
    }
    
    function highestQuarterCB(){
        const totalScores = [
            parseInt(v_scores.linescore[0]) + parseInt(h_scores.linescore[0]),
            parseInt(v_scores.linescore[1]) + parseInt(h_scores.linescore[1]),
            parseInt(v_scores.linescore[2]) + parseInt(h_scores.linescore[2]),
            parseInt(v_scores.linescore[3]) + parseInt(h_scores.linescore[3]),
        ];
        const highestScoreIndex = totalScores.indexOf(Math.max(...totalScores));
        const highestScoreQuarter = highestScoreIndex + 1;
        const highestScore = totalScores[highestScoreIndex];
        //document.getElementById("Highest-quarter").innerHTML = `Q${highestScoreQuarter}: ${highestScore} points`
        return (`Q${highestScoreQuarter}: ${highestScore} points`);

    }

    // function topScorerCB(){
    //     const players = props.gamePlayers;
    //     console.log(players);
    //     const playerWithHighestPoints = players.reduce((maxPlayer, currentPlayer) => {
    //         return currentPlayer.points > maxPlayer.points ? currentPlayer : maxPlayer;
    //       }, players[0]);
    //     const firstname = playerWithHighestPoints.player.firstname;
    //     const lastname = playerWithHighestPoints.player.lastname;
    //     const points = playerWithHighestPoints.points;
    //     return (`${firstname} ${lastname}: ${points} points`)
    // }

    function hideShowRecACB(evt){
        const id = evt.target.id;
        const display = document.getElementById(`r${id}`).style.display;
        if (display == 'block') {
            document.getElementById(`r${id}`).style.display = 'none';
            document.getElementById(id).src = "https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png";
        }
        else {
            document.getElementById(`r${id}`).style.display = 'block';
            document.getElementById(id).src = "https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/hide-512.png";
        }
    }

    function hideShowQuarterACB(evt){
        const id = evt.target.id;
        const display = document.getElementById(`a${id}`).style.display;
        if (display == 'block') {
            document.getElementById(`a${id}`).style.display = 'none';
            document.getElementById(`h${id}`).style.display = 'none';
            document.getElementById(id).src = "https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/unhide-512.png";
        }
        else {
            document.getElementById(`a${id}`).style.display = 'block';
            document.getElementById(`h${id}`).style.display = 'block';
            document.getElementById(id).src = "https://cdn0.iconfinder.com/data/icons/ui-pack-2/32/hide-512.png";
        }
    }
}

export default GameDetailsView;