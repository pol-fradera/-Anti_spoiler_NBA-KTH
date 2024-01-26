import MainView from "../views/MainView.jsx";
import { observer } from "mobx-react-lite";
import { signOut } from "firebase/auth"
import { toast } from "react-toastify";
import { auth } from "../firebaseModel.js"

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Main(props){
        function logOutUser() {
            signOut(auth).then((e) => {
                toast.success("You have been logged out successfully!");
                props.model.updateCurrentUserId("");
            }).
            catch((error) => toast.error("There has been an error while logging out. Please try again."));
        }

        return <MainView userLogged={props.model.userId?true:false} model={props.model} logOutUser={logOutUser}
        favGames={props.model.favGames} favTeams={props.model.favTeams } removeTeam={(team) => {props.model.removeTeam(team)}}
        />
    }
);