import Layout from "../../components/Layout.jsx";
// import {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {WHITEBOARDS_PAGE} from "../../utils/UrlConstants.js";
// import authService from "../../APIs/AuthService.js";
import {Button, CssBaseline} from "@mui/material";
import {TestComponent} from "../../components/TestComponent.jsx";

const LoginPage = () => {

    // example of a plain login page with no token auth

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [errorMsg, setErrorMsg] = useState(''); // should be displayed if credentials are incorrect
    //
    // const navigate = useNavigate();
    //
    // // navigate to page based on user role
    // const navigateCallback = () => {
    //     const role = Storage.getUserRole()
    //     if (role === 'PLAYER') {
    //         navigate(WHITEBOARDS_PAGE)
    //     } else if (role === 'ADMIN') {
    //         //todo
    //     } else if (role === 'STAFF') {
    //         //todo
    //     }
    // }
    //
    // // Example of service function usage
    // // on LogIn button click
    // const logIn = () => {
    //     authService.logIn(username, password)
    //         .then(res => {
    //             console.log(res) // to test
    //             navigateCallback()
    //         })
    //         .catch(err => {
    //             console.log(err) // to test
    //             setErrorMsg(err.response.data)
    //         })
    // }
    //
    // // if already logged in, send to dashboard
    // useEffect(() => {
    //     const userId = Storage.getUserId()
    //     if (userId) {
    //         navigateCallback()
    //     }
    // }, [])

    return (
        <CssBaseline>
            <TestComponent text={"Login"}/>
        </CssBaseline>
    )

}

export default LoginPage;