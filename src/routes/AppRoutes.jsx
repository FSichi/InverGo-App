import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { AddScreen } from '../components/Contactos/Add/AddScreen';
import { ContactoScreen } from '../components/Contactos/ContactoScreen/ContactoScreen';
import { Listado } from '../components/Contactos/Listado/Listado';
import { EstructurasScreen } from '../components/Herramientas/Estructuras/EstructurasScreen';
import { EventosScreen } from '../components/Herramientas/Eventos/EventosScreen';
import { InversionesScreen } from '../components/Herramientas/Inversiones/InversionesScreen';
import { About } from '../components/Perfil/About';
import { PerfilScreen } from '../components/Perfil/PerfilScreen';
import { Prices } from '../components/Perfil/Prices';
import { TerminosyCondiciones } from '../components/Perfil/TerminosyCondiciones';
import { Dashboard } from '../components/UI/Dashboard/Dashboard';
import { Footer } from '../components/UI/Footer';
import NavBar from '../components/UI/NavBar/Navbar';


export const AppRoutes = () => {

    const [state, setState] = useState(false);
    const [ruta, setRuta] = useState('');

    if (localStorage.getItem('ruta') !== null && !state) {
        setRuta(localStorage.getItem('ruta'));
        setState(true);
        localStorage.removeItem('ruta');
    }

    return (
        <Router>

            <NavBar />

            <Switch>

                <Route path="/dashboard" component={Dashboard}></Route>

                {/* RUTAS CONTACTOS */}

                <Route path="/con/add" component={AddScreen}></Route>
                <Route path="/con/list" component={Listado}></Route>
                <Route exact path="/con/:id" component={ContactoScreen}></Route>

                {/* RUTAS HERRAMIENTAS */}

                <Route path="/tools/etr" component={EstructurasScreen}></Route>
                <Route path="/tools/evt" component={EventosScreen}></Route>
                <Route path="/tools/inv" component={InversionesScreen}></Route>

                {/* RUTAS DE PERFIL */}

                <Route path="/perfil" component={PerfilScreen}></Route>
                <Route path="/prices" component={Prices}></Route>
                <Route path="/terms" component={TerminosyCondiciones}></Route>
                <Route path="/about" component={About}></Route>

                {
                    (state)
                    &&
                    (
                        <Redirect to={ruta} />
                    )

                }

                <Redirect to={'/dashboard'} />

            </Switch>

            <Footer />

        </Router>
    )
}