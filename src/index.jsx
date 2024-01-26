import ReactRoot from "/src/reactjs/ReactRoot.jsx";
import model from "/src/GameModel.js"
import connectToFirebase from "/src/firebaseModel.js" ;



import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model);


import {createRoot} from "react-dom/client";
createRoot(document.getElementById('root'))
    .render(<ReactRoot model={reactiveModel}/>);

reactiveModel.setGames("");
reactiveModel.setCurrentGame("12910");

connectToFirebase(reactiveModel);