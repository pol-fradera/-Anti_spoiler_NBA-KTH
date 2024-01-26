import SignUpView from "../views/SignupView.jsx";
import { observer } from "mobx-react-lite";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebaseModel.js"


export default
observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function Signup(props){
        const [infoMsg, setInfoMsg] = useState("");
        const [errorMsg, setErrorMsg] = useState("");
        function registerNewUser(signupEmail,signupPassword,signupPasswordConfirmation){
            if (signupPassword !== signupPasswordConfirmation) { setErrorMsg("Passwords do not match."); }
            else {
                createUserWithEmailAndPassword(auth, signupEmail, signupPassword).
                then((user) => {
                    setErrorMsg("");
                    setInfoMsg("User created successfully!");
                }).catch((error) => {
                    if (error.code === "auth/weak-password") {
                        setErrorMsg("Please choose a stronger password.");
                    } else if (error.code === "auth/email-already-in-use") {
                        setErrorMsg("The email address is already in use.");
                    }
                    else {
                        setErrorMsg("There has been an error during registration. Please try again.")
                    }
                });
            }
        }
        return <SignUpView signUpUser={registerNewUser} infoMessage={infoMsg} errorMessage={errorMsg} />
    }
);