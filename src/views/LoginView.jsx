import "../css/login_signup.css"
import {  toast } from "react-toastify";
import { FiMail, FiKey } from "react-icons/fi";

function LoginView(props) {

    function onLoginSubmit(evt) {
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
        props.logInUser(loginEmail,loginPassword);
    }

    function onLoginGoogle() {
        props.logInGoogle();
    }

    return (
        <body className={"login-signup-body"}>
          <div className={"container"}>
              <button className={"back-to-home-button"} onClick={(evt) => { window.location.hash="/"} }> &#8592; Back to home</button>
              <form onSubmit={onLoginSubmit}>
                  <h1>Log-in to your account</h1>
                  <label className="input-with-icon">
                      <FiMail className="icon" />
                      <input id="loginEmail" type="email" placeholder="Enter your e-mail" required={true}></input>
                  </label>
                  <label className="input-with-icon">
                      <FiKey className="icon" />
                      <input id="loginPassword" type="password" placeholder="Enter your password" required={true}></input>
                  </label>
                  {(props.errorMessage !== "") && <div className="error-message">{props.errorMessage}</div>}
                  <button type="submit" value="Log in">Log in</button>
                  <div>
                      <span style={{color: "white"}}>- or -</span>
                  </div>

                  <button onClick={onLoginGoogle}>
                      Log in with Google
                      <img className="google-icon" src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"></img>
                  </button>
              </form>
              {(props.infoMessage !== "") && <div>{toast.success(props.infoMessage)} {window.location.hash="/"}</div>}
              <p>
                  <span>Don't have an account yet? Sign up </span>
                  <a href="#signup">here.</a>
              </p>
          </div>
        </body>
    )
}

export default LoginView;