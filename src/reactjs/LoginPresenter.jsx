import LoginView from "/src/views/LoginView.jsx";
import { observer } from "mobx-react-lite";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider} from "../firebaseModel.js";
import { useState } from "react"

export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Login(props){
        const [errorMsg, setErrorMsg] = useState("");
        const [infoMsg, setInfoMsg] = useState("");

        function logInUser(loginEmail,loginPassword) {
            signInWithEmailAndPassword(auth, loginEmail, loginPassword).
            then((user) => {
                setErrorMsg("");
                setInfoMsg("Log in process was a complete success!");
                props.model.updateCurrentUserId(user.user.uid);
            }).catch((error) => {
                if (error.code === "auth/invalid-login-credentials") {
                    setErrorMsg("The email or the password introduced are not correct. Please try again.");
                }
                else {
                    setErrorMsg("There has been an error during the log in process. Please try again.")
                }
            });
        }
      
        function logInGoogle() {
            signInWithPopup(auth, provider).
            then((user) => {
                setErrorMsg("");
                setInfoMsg("Log in with Google was a complete success!");
                props.model.updateCurrentUserId(user.user.uid);
            }).catch((error) => {
                setErrorMsg("An error occurred while logging in. Error: " + error.message);
            });
        }

        return <LoginView logInUser={logInUser} logInGoogle={logInGoogle} errorMessage={errorMsg} infoMessage={infoMsg}/>
    }
);