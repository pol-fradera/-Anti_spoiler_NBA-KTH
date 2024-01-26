import Teams from "./teamPresenter.jsx";
import Login from "./LoginPresenter.jsx";
import Signup from "./SignupPresenter.jsx"
import Main from "./MainPresenter.jsx";
import GameDetails from "./gameDetailsPresenter.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function makeRouter(props){
    return createHashRouter([
        {
            path: "/",
            element:<Main model={props.model} />
        },
        {
            path: "/main",
            element:<Main model={props.model} />
        },
        {
            path: "/login",
            element:<Login model={props.model} />
        },
        {
            path: "/signup",
            element:<Signup model={props.model} />
        },
        {
            path: "/teams",
            element:<Teams model={props.model} />
        },
        {
            path: "/details",
            element:<GameDetails model={props.model} />
        },
    ])
}

export default 
observer(
    function ReactRoot(props){
        return <div><RouterProvider router={makeRouter(props)}/>
            <ToastContainer position="bottom-right"
                            autoClose={3000}
                            theme="colored"/></div>;
    }
)

