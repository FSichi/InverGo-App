import { types } from "../types/types";
import { firebase } from "../../firebase/firebase-config";
import { infoDBCleaning } from "./datosDB";
import { Toast } from "../../helpers/Toast";

export const startLoginEmailPassword = (email, password) => {

    if (email === '' || password === '') {
        (localStorage.getItem('lang') === 'es-MX')
            ? Toast.fire({ icon: 'warning', title: 'Por favor ingresa el correo y la contraseña' })
            : Toast.fire({ icon: 'warning', title: 'Please enter the email and password' })

        return;
    }

    return (dispatch) => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                (localStorage.getItem('lang') === 'es-MX')
                    ? Toast.fire({ icon: 'success', title: 'Inicio de Sesion Exitoso' })
                    : Toast.fire({ icon: 'success', title: 'Login Successful' })

                dispatch(login(user.uid, user.displayName, email));
            })
            .catch(e => {
                console.log(e);

                if (e.message === 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
                    (localStorage.getItem('lang') === 'es-MX')
                        ? Toast.fire({ icon: 'error', title: 'Usuario no encontrado' })
                        : Toast.fire({ icon: 'error', title: 'User not found' })
                }

                if (e.message === 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).') {

                    (localStorage.getItem('lang') === 'es-MX')
                        ? Toast.fire({ icon: 'error', title: 'Contraseña incorrecta' })
                        : Toast.fire({ icon: 'error', title: 'Wrong password' })
                }

                if (e.message === 'Firebase: The user account has been disabled by an administrator. (auth/user-disabled).') {

                    (localStorage.getItem('lang') === 'es-MX')
                        ? Toast.fire({ icon: 'error', title: 'Cuenta de usuario deshabilitada' })
                        : Toast.fire({ icon: 'error', title: 'User account disabled' })
                }

            });
    }
}

export const login = (uid, displayName, email) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email
    }
});

export const startLogOut = () => {

    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logOut());
        dispatch(infoDBCleaning());
    }
}

const logOut = () => ({
    type: types.logout
})
