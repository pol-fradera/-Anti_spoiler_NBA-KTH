import { initializeApp } from "firebase/app";
import firebaseConfig from "/src/firebaseConfig.js";
import { getDatabase, ref, get, set, child, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
import { reaction } from "mobx";
import { getGameDetails, getGamesFromArrayACB } from "./gameSource";


// Initialise firebase app, database, ref
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const db = getDatabase(app)

//const PATH; //User ID
//const rf = ref(db, PATH)

function modelToPersistence(/* TODO */model) {
    // TODO return an object
    console.log("Got into modelTopersistence", model.favTeams);

    return {
        favGames: model.favGames.map(objectToIdCB).sort(),
        favPlayers: model.favPlayers.map(objectToIdCB).sort(),
        favTeams: model.favTeams.sort(),
        currentDate: model.currentDate
    }

    function objectToIdCB(object) {
        return object.id;
    }
}

function persistenceToModel(/* TODO */data, model) {

    console.log("Got into persistencetoModel", model.favTeams);

    
    model.favTeams = data ? data.favTeams : [];
    model.currentDate = data ? data.currentDate : [];
    model.setGames(model.currentDate);
    console.log("TEAMS", model.favTeams);
    const promGames = data? data.favGames.map((gameId) => { return getGameDetails(gameId)}) : [];
    Promise.all(promGames).then((gameobj) => {model.favGames = gameobj; console.log("READY", model.favGames); model.ready = true; })
    //console.log("MODEL", model.favGames);
    //return Promise.resolve([...model.favGames,/*,mode.teams, model.favPlayers*/]);
}

function saveToFirebase(model) {
    if (model.userId) {
        console.log("Saving to firebase", model.ready);
        let rf = ref(db, model.userId);
        if (model.ready) set(rf, modelToPersistence(model));
    }

}
function readFromFirebase(model) {
    console.log("Reading persistence");
    if (model.userId) {
        console.log("Doing read persistence");
        let rf = ref(db, model.userId);
        model.ready = false;
        get(rf).then(convertACB)//.then(function modelReadyACB() { console.log("READY", model.favGames); model.ready = true; });
    }


    function convertACB(snapshot) {
        persistenceToModel(snapshot.val(), model);
    }
}

function connectToFirebase(model) {
    console.log("entered Connect persistence");
    console.log(model.userId);
    if(auth.currentUser) {}
    //readFromFirebase(model);

    auth.onAuthStateChanged(authChangedACB);

    function authChangedACB(uid) {
        model.updateCurrentUserId(auth.currentUser.uid);
        console.log("Auth changed persistence", auth.currentUser.uid);
        if (uid) { readFromFirebase(model); }
    }
    

    reaction(checkACB, effectACB);


    function checkACB() {
        return [model.favGames, model.favPlayers, model.favTeams, model.currentDate];
    }
    function effectACB() {
        saveToFirebase(model);
    }
}

// Remember to uncomment the following line:
export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }

export default connectToFirebase;