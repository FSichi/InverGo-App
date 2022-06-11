import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import { firebase } from '../firebase/firebase-config'
import { login } from '../redux/actions/auth'
import { cargarInfoDB } from '../redux/actions/datosDB'

import { LoadingPage } from '../components/UI/LoadingPage'
import { AppRoutes } from './AppRoutes'
import { AuthRoutes } from './AuthRoutes'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export const MainRoutes = () => {

    const dispatch = useDispatch();
    const { state } = useSelector(state => state.infoDB);

    const [checking, setChecking] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {

            if (user?.uid) {
                dispatch(login(user.uid, user.displayName, user.email));
                dispatch(cargarInfoDB(user.uid));
                setChecking(false);

                if (!state) {
                    setLoadingPage(true);
                    setIsLoggedIn(false);
                } else {
                    setLoadingPage(false);
                    setIsLoggedIn(true);
                }

            } else {
                setIsLoggedIn(false);
                setChecking(false);
            }
        });

    }, [dispatch, setChecking, setIsLoggedIn, state]);

    if (checking) {
        return (
            <h1 className='text-white dark:text-gray-900 text-center mt-5'>Wait a Second...</h1>
        )
    }

    if (loadingPage) {
        return (
            <LoadingPage />
        )
    }

    return (
        <Router>
            <Switch>
                <PublicRoute path="/auth" component={AuthRoutes} isAuthenticated={isLoggedIn} />
                <PrivateRoute exact path="/" component={AppRoutes} isAuthenticated={isLoggedIn} />
                <Redirect to={'/auth/login'} />
            </Switch>
        </Router>
    )
}