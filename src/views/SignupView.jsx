import "../css/login_signup.css"
import {FiKey, FiMail} from "react-icons/fi";

function SignupView(props) {

    function onSignupSubmit(evt) {
        const signupEmail = document.getElementById("signupEmail").value;
        const signupPassword = document.getElementById("signupPassword").value;
        const signupPasswordConfirmation = document.getElementById("signupPasswordConfirmation").value;

        props.signUpUser(signupEmail,signupPassword,signupPasswordConfirmation);
    }

    if (props.infoMessage !== "") {
        return (
            <div className={"login-signup-body"}>
                <div className="info-message">{props.infoMessage} Now it's time to {<a href="#login">Log in!</a>}</div>
            </div>
        )
    }

    return (
        <body className={"login-signup-body"}>
          <div className={"container"}>
              <button className={"back-to-home-button"} onClick={(evt) => { window.location.hash="/"} }> &#8592; Back to home</button>
              <form onSubmit={onSignupSubmit}>
                  <h1>Sign-up for a new account!</h1>
                  <label className="input-with-icon">
                      <FiMail className="icon" />
                      <input id="signupEmail" type="email" placeholder="Enter an e-mail" required={true}></input>
                  </label>
                  <label className="input-with-icon">
                      <FiKey className="icon" />
                      <input id="signupPassword" type="password" placeholder="Enter a password" required={true}></input>
                  </label>
                  <label className="input-with-icon">
                      <FiKey className="icon" />
                      <input id="signupPasswordConfirmation" type="password" placeholder="Enter the password again" required={true}></input>
                  </label>
                  {(props.errorMessage !== "") && <div className="error-message">{props.errorMessage}</div>}
                  <button type="submit" value="Sign up">Sign up</button>
              </form>
              <p>
                  <span>Already have an account? Log in </span>
                  <a href="#login">here.</a>
              </p>
          </div>
        </body>
    )
}

export default SignupView;