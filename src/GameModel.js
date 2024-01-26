import {getGames, getGameDetails, getGamePlayers} from "/src/gameSource.js"
import resolvePromise from "/src/ResolvePromise.js";
import {getTodaysDate, getMaxScore} from '/src/utilities.js'

export default {

    favPlayers: [],
    favTeams: [],
    favGames: [],
    searchResultsPromiseState : {},
    currentGame : null,
    userId: null,
    currentDate : getTodaysDate(),
    currentGamePromiseState : {},
    currentGamePlayersPromiseState : {},

    updateCurrentUserId(value) {
      this.userId = value;
      console.log("ID changed", this.userId);
    },

    setGames(date) {
        if (date) {
            resolvePromise(getGames(date), this.searchResultsPromiseState)
        } else {
            resolvePromise(getGames(getTodaysDate()), this.searchResultsPromiseState)
        }
    },

    setCurrentGame(id){
        if (id && id !== this.currentGame) {
            resolvePromise(getGameDetails(id),this.currentGamePromiseState);
            resolvePromise(getGamePlayers(id),this.currentGamePlayersPromiseState);
            this.currentGame = id;  
        }
    },

    addPlayer(player){
        this.favPlayers = [...this.favPlayers, player];
    },

    removePlayer(playerToRemove){
        function keepPlayerCB(player){ //Return true if the id is different from the playerToRemove
            return player.id !== playerToRemove.id;
        }

        this.favPlayers.filter(keepPlayerCB);
    },

    removeTeam(teamToRemove){
        function keepTeamCB(game)
        { //Return true if the id is different from the playerToRemove
            return game !== teamToRemove;
        }
        this.favTeams = [...this.favTeams.filter(keepTeamCB)];
    },

    addGame(game){
        let contains = this.favGames.find(arrGame => arrGame.id === game.id);
        //console.log(this.favGames, contains);
        if (!contains) this.favGames = [...this.favGames, game];
        else console.log("NOt added");
    },

    addTeam(team){
        console.log("ADDDING", this.favTeams);
        let contains = this.favTeams.find(arrTeam => arrTeam === team);
        //console.log(this.favGames, contains);
        if (!contains) this.favTeams = [...this.favTeams, team];
        else console.log("NOt added");

        console.log("TEAMS", this.favTeams)
    },

    sortGamesByTotalScore(games){
        return [...games].sort(function (a, b) {
        return (a.scores.home.points + a.scores.visitors.points) - (b.scores.home.points + b.scores.visitors.points);
        });
    },

    sortGamesByMaxQuarterScore(games) {
        return [...games].sort(function (a, b) {
            const maxScoreA = getMaxScore(a);
            const maxScoreB = getMaxScore(b);
            return maxScoreA - maxScoreB;
        });
    }

}