import { useState } from 'react'
import Select from 'react-select';
import { getEstructuraByOption } from '../../../helpers/selector';
import { Informacion } from './Informacion';
import Swal from 'sweetalert2';
import { FormattedMessage } from 'react-intl';
import { customStylesTareas, Estructuras, OptionEstructuras } from '../../../helpers/estructurasSelector';

export const EstructurasScreen = () => {

    localStorage.setItem("ruta", `/tools/etr`);

    const [optionEstructura, setOptionEstructura] = useState({});
    const [estructura, setEstructura] = useState({});
    const [visualizar, setVisualizar] = useState(false);

    const handleGenerar = () => {

        setVisualizar(false);
        setEstructura(getEstructuraByOption(optionEstructura.value, Estructuras));

        var mje = '';

        (localStorage.getItem("lang") === 'es-MX') ? mje = 'Generando Estructura. Espera por favor' : mje = 'Generating Structure. Please wait';

        Swal.fire({
            title: `${mje}`,
            timer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                setVisualizar(true);
            }
        });
    }

    return (
        <div className='container est text-gray-100'>

            <div className='row d-flex justify-content-center'>
                <div className='col-5'>
                    <div className='bg-indigo-600 dark:bg-gray-800 rounded-2xl p-3'>
                        <div className='row flex justify-between'>
                            <div className='col-8 text-2xl mt-2'>
                                <FormattedMessage id="tools.structures.select" defaultMessage="Select" />
                            </div>
                            <div className='col-4'>
                                <Select
                                    className='fw-bold text-center text-white text-lg' styles={customStylesTareas} isSearchable={false}
                                    options={OptionEstructuras} defaultValue={optionEstructura} onChange={setOptionEstructura}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-3 mt-2'>
                    <button
                        className="p-3 rounded-lg w-50 bg-blue-400 text-gray-900 hover:bg-blue-900 hover:text-gray-200 hover:border-2 hover:border-teal-300 dark:bg-indigo-900 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:border-2 dark:hover:border-indigo-600"
                        onClick={handleGenerar}
                    >
                        <p className="font-medium text-xl">
                            <FormattedMessage id="tools.structures.btn" defaultMessage="Generate" />
                        </p>
                    </button>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    {
                        (visualizar)
                        &&
                        (
                            <>
                                <div className='mt-5 bg-indigo-600 dark:bg-gray-800 p-3 rounded-2xl'>
                                    <Informacion estructura={estructura} />
                                </div>
                                <div className='mt-5 mb-5 flex justify-center'>
                                    <img src={`../assets/img/${estructura.id}.png`} alt="Estructura IMG" />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>

        </div>
    )
}