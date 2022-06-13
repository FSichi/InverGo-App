import Chart from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'
import { FormattedMessage } from 'react-intl';
import { getRegistroMensual } from '../../../helpers/selector';

console.log(Chart);

export const DonoutGraf = ({ inversiones }) => {

    var cantInv = inversiones.filter(inv => inv.estado === false).length;
    var cantInvFin = inversiones.filter(inv => inv.estado === true).length;
    var labels = [];

    (localStorage.getItem('lang') === 'es-MX') ? labels = ['En Proceso', 'Finalizado'] : labels = ['In Process', 'Finished'];

    const data = {
        labels: labels,
        datasets: [{
            label: '',
            data: [cantInv, cantInvFin],
            backgroundColor: [
                'lightseagreen',
                'deepskyblue',
            ],
            borderColor: [
                'lightseagreen',
                'deepskyblue',
            ],
            color: 'red',
            borderWidth: 1
        }]
    };

    return (
        <div className='dark:bg-gray-900 rounded-xl p-3'>
            {
                (inversiones.length > 0)
                    ?
                    <Doughnut
                        data={data} height={313} width={100}
                        options={
                            {
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                        labels: {
                                            color: `${localStorage.getItem('color-theme') === 'dark' ? '#ffffff' : '#ffffff'}`,
                                        }
                                    }
                                }
                            }
                        }
                    />
                    :
                    <div className='text-center ms-3 me-3'>
                        <h3 className='text-xl'> <FormattedMessage id="dashboard.graf.1.0" defaultMessage="0 Investments" /> </h3>
                    </div>
            }
        </div>
    )
}

export const BarGraf = ({ inversiones, contactos }) => {

    const registros = getRegistroMensual(inversiones, contactos);
    var labels = [];

    (localStorage.getItem('lang') === 'es-MX') ? labels = ['Nuevos Usuarios', 'Nuevas Inversiones'] : labels = ['New Users', 'New Investments'];

    const data = {
        labels: [''],
        datasets: [
            {
                label: labels[0],
                data: [registros[1]],
                backgroundColor: '#ec4899',
                borderColor: '#ec4899',
                borderWidth: 1
            },
            {
                label: labels[1],
                data: [registros[0]],
                backgroundColor: '#fbbf24',
                borderColor: '#fbbf24',
                borderWidth: 1
            },

        ]
    };

    return (
        <div className='dark:bg-gray-900 rounded-xl p-3'>
            {
                (registros[0] === 0 && registros[1] === 0)
                    ?
                    (
                        <div className='text-center ms-3 me-3'>
                            <h3 className='text-xl'> <FormattedMessage id="dashboard.graf.1.0" defaultMessage="0 Investments" /> </h3>
                        </div>
                    )
                    :
                    (
                        <Bar
                            data={data} height={313} width={100}
                            options={
                                {
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: {
                                                color: `${localStorage.getItem('color-theme') === 'dark' ? '#ffffff' : '#ffffff'}`,
                                            }
                                        }
                                    },
                                    scales: {
                                        y: {
                                            ticks: {
                                                stepSize: 10,
                                                color: '#ffffff'
                                            },
                                        },
                                    }
                                }
                            }
                        />
                    )
            }
        </div>
    )
}