import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getContactoByID, getEventosContacto, getInversionesContacto } from '../../../helpers/selector';
import { AccionScreen } from './Views/AccionScreen';
import { PerfilScreen } from './Views/PerfilScreen';

export const ContactoScreen = ({ history }) => {

    const { id } = useParams();
    const { contactos, eventos, inversiones } = useSelector(state => state.infoDB);

    const contacto = getContactoByID(id, contactos);
    const eventosContacto = getEventosContacto(id, eventos);
    const inversionesContacto = getInversionesContacto(id, inversiones);

    const [changeSeleccion, setChangeSeleccion] = useState(true);
    localStorage.setItem("ruta", `/con/${id}`);

    return (

        <div className='container list'>

            <div className='row mt-4 mb-2'>

                <div className='col-12 col-md-12 col-lg-3' >

                    {/* NOMBRE Y TIPO CONTACTO */}

                    <div className='bg-indigo-600 dark:bg-gray-800 p-3 rounded-2xl'>

                        {/* IMAGEN Y NOMBRE - NACIONALIDAD */}

                        <div className='row'>
                            <div className='col-12 col-md-12 col-lg-12 flex justify-center'>
                                {
                                    (contacto.nacionalidad === 'Estados Unidos')
                                        ? <img className="rounded-lg" width="80px" src={`../../assets/flags/US.svg`} alt='Logo Perfil' />
                                        : <img className="rounded-lg" width="80px" src={`../../assets/flags/${contacto.nacionalidad}.svg`} alt='Logo Perfil' />
                                }
                            </div>
                            <div className='col-md-12 col-lg-12 mt-3 mb-1 text-center'>
                                <h2 className="text-gray-200 text-3xl md:text-4xl lg:text-3xl">{contacto.nombre}</h2>
                            </div>
                            <div className='col-md-12 col-lg-12 text-center flex justify-center'>
                                <h4 className="text-gray-200 text-2xl md:text-3xl lg:text-2xl bg-indigo-900 dark:bg-indigo-700 p-2 rounded-xl mt-2 w-50">
                                    {
                                        (contacto.tipoContacto === 'Inversor')
                                            ? <FormattedMessage id="con.screen.type.2" defaultMessage="Investor" />
                                            : <FormattedMessage id="con.screen.type.1" defaultMessage="Contact" />
                                    }
                                </h4>
                            </div>
                        </div>

                    </div>

                    {/* BOTONES */}

                    <div className='bg-indigo-600 dark:bg-gray-800 p-3 mt-4 rounded-2xl'>
                        {
                            (changeSeleccion)
                                ?
                                (
                                    <>
                                        <button className="p-3 rounded-lg bg-indigo-900 text-gray-200 w-100 mb-4" onClick={() => { setChangeSeleccion(true); }}>
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.b.1" defaultMessage="Profile" /></p>
                                        </button>
                                        <button className="p-3 rounded-lg text-gray-200 hover:bg-blue-400 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-teal-300 w-100" onClick={() => { setChangeSeleccion(false) }}>
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.b.2" defaultMessage="Actions" /></p>
                                        </button>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <button className="p-3 rounded-lg text-gray-200 hover:bg-blue-400 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-teal-300 w-100 mb-4" onClick={() => { setChangeSeleccion(true) }}>
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.b.1" defaultMessage="Profile" /></p>
                                        </button>
                                        <button className="p-3 rounded-lg bg-indigo-900 text-gray-100 w-100" onClick={() => { setChangeSeleccion(false) }}>
                                            <p className="font-medium text-xl ml-4"><FormattedMessage id="con.screen.b.2" defaultMessage="Actions" /></p>
                                        </button>
                                    </>
                                )
                        }
                    </div>

                </div>

                <div className='col-12 col-md-12 col-lg-9 mt-md-4 mt-lg-0'>
                    {
                        (changeSeleccion)
                            ? <PerfilScreen contacto={contacto} eventos={eventosContacto} inversiones={inversionesContacto} history={history} />
                            : <AccionScreen contacto={contacto} eventos={eventosContacto} inversiones={inversionesContacto} />
                    }
                </div>

            </div>

        </div>
    )
}