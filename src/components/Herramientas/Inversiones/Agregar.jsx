import { useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { calcularFechaFinInversion, getFechaActual } from '../../../helpers/selector';
import { Toast } from '../../../helpers/Toast';
import { useForm } from '../../../hooks/useForm';
import { startNewInversion } from '../../../redux/actions/datosDB';
import { Separador } from '../../UI/Separador';

const buttonStyle = `
        p-3 rounded-lg bg-blue-500 dark:bg-gray-900 dark:text-teal-300 
        w-100 lg:mt-0 md:mt-5 md:mr-9 md:ml-9 lg:mr-9 lg:ml-10 
        hover:bg-indigo-900 hover:text-gray-100 dark:hover:bg-green-900 dark:hover:text-gray-200
`;

export const Agregar = ({ uid }) => {

    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        capital: '',
        fechaInicio: '',
    });

    const { capital, fechaInicio } = formValues;

    const [changeTipo, setChangeTipo] = useState(true);
    const [fechaFin, setFechaFin] = useState('');

    const handleCalculateFechaFin = () => {

        if (fechaInicio === '') {

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Ingresa una Fecha de Inicio' : mje = 'Enter a Start Date';
            Toast.fire({ icon: 'error', title: mje });

            return;
        }

        var finCalculated = calcularFechaFinInversion(fechaInicio);

        setFechaFin(finCalculated);
    }

    const handleAddInversion = () => {

        if (capital === '' || fechaInicio === '' || fechaFin === '') {

            let mje = '';

            (localStorage.getItem('lang') === 'es-MX') ? mje = 'Todos los Campos Son Obligatorios' : mje = 'All Fields Are Required';
            Toast.fire({ icon: 'error', title: mje });

            return;
        }

        var capitalFinal = '';
        var tipoInv = '';

        if (changeTipo) {
            capitalFinal = capital * 3;
            tipoInv = 'Compuesto';
        } else {
            capitalFinal = capital * 1.60;
            tipoInv = 'Simple';
        }

        const fechaAlta = getFechaActual();

        var inversionNew = {
            tipo: tipoInv,
            estado: false,
            capitales: {
                capital: capital,
                capitalFinal: capitalFinal
            },
            fechas: {
                inicio: fechaInicio,
                fin: fechaFin,
                fechaAlta: fechaAlta
            },
            uid: {
                firebase: uid,
                enlace: uid
            }
        }

        dispatch(startNewInversion(inversionNew));
    }

    return (
        <div className='row mt-2 flex justify-between'>

            {/* INPUTS */}

            <div className='col-7 col-lg-7 col-md-12'>

                {/* CAPITAL INICIAL */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Inv.add.form.1" defaultMessage="Capital" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="text" placeholder="$ ... " value={capital} onChange={handleInputChange} name="capital"
                            className="form-control form-control-lg rounded-lg text-center"
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>

                {/* CAPITAL FINAL */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Inv.add.form.3" defaultMessage="End Capital" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        {
                            (capital === '')
                                ?
                                (
                                    <input
                                        type="text" placeholder="$ ... " disabled
                                        className="form-control form-control-lg rounded-lg text-center"
                                    />
                                )
                                :
                                (
                                    <div>
                                        {
                                            (changeTipo)
                                                ?
                                                (
                                                    <input
                                                        type="text" disabled value={`$ ` + new Intl.NumberFormat("de-DE").format((parseInt(capital) * 3).toString())}
                                                        className="form-control form-control-lg rounded-lg text-center"
                                                    />
                                                )
                                                :
                                                (
                                                    <input
                                                        type="text" disabled value={`$ ` + new Intl.NumberFormat("de-DE").format((parseInt(capital) * 1.6).toString())}
                                                        className="form-control form-control-lg rounded-lg text-center"
                                                    />
                                                )
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>

                <div className='mt-2 mb-2 ms-5 me-5'>
                    <Separador text={''} />
                </div>

                {/* FECHA INICIO */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3 text-xl mt-1"> <FormattedMessage id="con.screen.actions.Inv.add.form.2" defaultMessage="Start Date" /> </h2>
                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="date" value={fechaInicio} onChange={handleInputChange} name="fechaInicio"
                            className="form-control form-control-lg rounded-lg text-center"
                        />
                    </div>
                </div>

                {/* FECHA FINALIZACION  */}

                <div className="items-center w-full p-3 space-y-4 text-gray-100 md:inline-flex md:space-y-0">

                    <div className='max-w-sm mx-auto md:w-1/3'>
                        <button
                            className="p-3 rounded-xl bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 hover:bg-blue-900 hover:dark:bg-indigo-600"
                            onClick={handleCalculateFechaFin} type="button"
                        >
                            <p className="font-medium text-lg"> <FormattedMessage id="con.screen.actions.Inv.add.b.5" defaultMessage="End Date" /> </p>
                        </button>
                    </div>

                    <div className="max-w-sm mx-auto md:w-2/3">
                        <input
                            type="date" value={fechaFin} disabled
                            className="form-control form-control-lg rounded-lg text-center"
                        />
                    </div>
                </div>

            </div>

            {/* PARTE DERECHA */}

            <div className='col-4 col-lg-4 col-md-12 lg:mr-5'>

                {/* BOTONES --> COMPUESTO - SIMPLE */}

                <div className='bg-blue-900 dark:bg-gray-900 p-3 rounded-2xl md:mr-8 md:ml-8 md:mt-4 lg:mt-0'> {/* lg:mr-0 lg:ml-0 */}
                    {
                        (changeTipo)
                            ?
                            (
                                <>
                                    <button className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100 mb-4" onClick={() => { setChangeTipo(true) }}>
                                        <p className=" font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Inv.add.b.1" defaultMessage="Compound" /></p>
                                    </button>

                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-indigo-900 dark:hover:text-gray-200 w-100" onClick={() => { setChangeTipo(false) }}>
                                        <p className="font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Inv.add.b.2" defaultMessage="Simple" /></p>
                                    </button>
                                </>
                            )
                            :
                            (
                                <>
                                    <button className="p-3 rounded-lg text-gray-200 hover:bg-indigo-400 hover:text-gray-900 dark:hover:bg-indigo-900 dark:hover:text-gray-200 w-100 mb-4" onClick={() => { setChangeTipo(true) }}>
                                        <p className=" font-medium text-xl ml-4"><FormattedMessage id="con.screen.actions.Inv.add.b.1" defaultMessage="Compound" /></p>
                                    </button>

                                    <button className="p-3 rounded-lg bg-blue-500 text-gray-200 dark:bg-gray-700 dark:text-teal-300 w-100" onClick={() => { setChangeTipo(false) }}>
                                        <p className=" font-medium text-xl ml-4"> <FormattedMessage id="con.screen.actions.Inv.add.b.2" defaultMessage="Simple" /></p>
                                    </button>
                                </>
                            )
                    }
                </div>

                {/* BENEFICIO*/}

                <div className='row mt-4 flex justify-center'>

                    <div className='col-3 mt-2'>
                        <h2 className=" text-xl mt-1"><FormattedMessage id="con.screen.actions.Inv.add.b.3" defaultMessage="Benefit" /></h2>
                    </div>

                    <div className='col-5 ms-4'>
                        {
                            (changeTipo)
                                ?
                                (
                                    <input
                                        type="text" value={'200 %'} disabled
                                        className=" text-center rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-900 text-xl placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                )
                                :
                                (
                                    <input
                                        type="text" value={'60 %'} disabled
                                        className=" text-center rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-900 text-xl placeholder-gray-400 shadow-sm  focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    />
                                )
                        }
                    </div>

                </div>

                {/* BOTON CREAR */}

                <div className='flex justify-center mt-4'>
                    <button className={buttonStyle}
                        type="button" onClick={handleAddInversion}
                    >
                        <p className=" font-medium text-xl"><FormattedMessage id="con.screen.actions.Inv.add.b.4" defaultMessage="Create" /></p>
                    </button>
                </div>

            </div>

        </div>
    )
}