import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { getContactosByTipo } from '../../../helpers/selector';
import { useForm } from '../../../hooks/useForm';
import { PantallaContactos } from './PantallaContactos';

export const Listado = () => {

    localStorage.setItem("ruta", `/con/list`);

    const { contactos } = useSelector(state => state.infoDB);

    const contactosAll = getContactosByTipo('Contacto', contactos);
    const inversoresAll = getContactosByTipo('Inversor', contactos);

    const [changeContact, setChangeContact] = useState(true);

    const [formValues, handleInputChange] = useForm({
        search: ''
    });

    const { search } = formValues;

    return (
        <div className='container-fluid list'>
            <div className='row'>

                {/* PARTE IZQUIERDA */}

                <div className='col-3 col-md-12 col-lg-3'>

                    {/* BOTONES */}

                    <div className='bg-indigo-600 dark:bg-gray-800 p-4 rounded-2xl'>
                        {
                            (changeContact)
                                ?
                                (
                                    <>
                                        <button className="p-3 rounded-lg bg-gray-900 text-teal-400 w-100 mb-4" onClick={() => { setChangeContact(true); }}>
                                            <p className="font-medium text-lg ml-4"><FormattedMessage id="con.list.1" defaultMessage="Contacts" /></p>
                                        </button>

                                        <button className="p-3 rounded-lg hover:bg-blue-900 dark:hover:bg-gray-700 hover:text-teal-300 w-100" onClick={() => { setChangeContact(false) }}>
                                            <p className="font-medium text-lg text-gray-300 ml-4"><FormattedMessage id="con.list.2" defaultMessage="Investors" /></p>
                                        </button>
                                    </>

                                )
                                :
                                (
                                    <>
                                        <button className="p-3 rounded-lg hover:bg-blue-900 dark:hover:bg-gray-700 hover:text-teal-300 w-100 mb-4" onClick={() => { setChangeContact(true) }}>
                                            <p className="font-medium text-lg text-gray-300 ml-4"><FormattedMessage id="con.list.1" defaultMessage="Contacts" /></p>
                                        </button>

                                        <button className="p-3 rounded-lg bg-gray-900 text-orange-400 w-100" onClick={() => { setChangeContact(false) }}>
                                            <p className="font-medium text-lg ml-4"><FormattedMessage id="con.list.2" defaultMessage="Investors" /></p>
                                        </button>
                                    </>
                                )
                        }
                    </div>

                    {/* FILTRAR */}

                    <div className='w-100 mt-3 bg-indigo-600 dark:bg-gray-800 rounded-2xl p-4'>
                        <div className='row'>
                            <div className='col-12 mb-4 text-center'>
                                <span className='text-gray-100 text-2xl'><FormattedMessage id="con.list.3" defaultMessage="Filter" /></span>
                            </div>
                            <div className='col-12 mt-1'>
                                <input
                                    type="text" placeholder='Name...' name='search' value={search} onChange={handleInputChange}
                                    className="form-control-lg text-center bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-100"
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* PARTE DERECHA */}

                <div className='col-9 col-md-12 col-lg-9 mt-md-4 mt-lg-0'>
                    <div className='bg-gray-800 rounded-2xl'>
                        {
                            (changeContact)
                                ? <PantallaContactos search={search} data={contactosAll} />
                                : <PantallaContactos search={search} data={inversoresAll} />
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}