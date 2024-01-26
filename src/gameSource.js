import { BASE_URL, API_KEY } from "/src/apiConfig.js";

function getGamesFromArrayACB(array_games_id) {
    if (array_games_id) {
        const ret_arr = [];

        for(let i = 0; i< array_games_id; i++){
            ret_arr = [...ret_arr, getGameDetails(array_games_id[i])];
        }
        /*array_games_id.map((id) => {
            ret_arr = [...ret_arr, getGameDetails(id)];
        })*/
        console.log("Game details", array_games_id);
        return ret_arr;
    }

    else return [];
}

function getGameDetails(id) {
    return fetch(BASE_URL + "games?id=" + id, { headers: { "X-Mashape-Key": API_KEY } }).then(createArrayACB).then(keepJustResultArrayACB).then(getFirstACB);
}

function getGamePlayers(id) {
    return fetch(BASE_URL + "players/statistics?game=" + id, { headers: { "X-Mashape-Key": API_KEY } }).then(createArrayACB).then(keepJustResultArrayACB);
}

function getGames(date){
    return fetch(BASE_URL+"games?date="+date, {headers: {"X-Mashape-Key" : API_KEY}}).then(createArrayACB).then(keepJustResultArrayACB);

}

function getFirstACB(result) {
    return result[0];
}

function keepJustResultArrayACB(result) {
    return result.response;
}
 

function createArrayACB(string) {

    return string.json();
}


export { getGames, getGameDetails, getGamePlayers, getGamesFromArrayACB };