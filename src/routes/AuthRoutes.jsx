import { Switch, Route, Redirect } from "react-router-dom"
import { Login } from '../components/Auth/Login'

export const AuthRoutes = () => {

    return (
        <div>
            <Switch>
                <Route exact path='/auth/login' component={Login} />
                {/* <Route exact path='/auth/register' component={Register} /> */}

                <Redirect to='/auth/login' />
            </Switch>
        </div>
    )
}