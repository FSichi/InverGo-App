import { useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';
import { getInversionByID, getMensajesSwal } from '../../../../../helpers/selector'
import { ViewInversion } from './ViewInversion';
import { startDeleteInversion } from '../../../../../redux/actions/datosDB';

export const Listado = ({ contacto, inversiones }) => {

    /* COSAS DE LA TABLA DE INVERSIONES */

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /* -------------------------------------------- */

    const dispatch = useDispatch();

    const [visualizar, setVisualizar] = useState(false);
    const [inversion, setInversion] = useState({});

    const handleVisualizar = (_id) => {
        setInversion(getInversionByID(_id, inversiones));
        setVisualizar(true);
    }

    const handleDelete = () => {

        const mensajesSwal = getMensajesSwal(4);

        Swal.fire({
            title: mensajesSwal[0],
            text: mensajesSwal[1],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: mensajesSwal[2],
            cancelButtonText: mensajesSwal[3],
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeleteInversion(inversion._id));
            }
        });

        // setVisualizar(false);
    }

    return (
        <>
            {
                (visualizar)
                    ?
                    (
                        <div className='row'>

                            <div className='col-12'>
                                <div className="p-3 shadow-xl rounded-lg flex justify-between bg-blue-900 dark:bg-black">
                                    <button
                                        className='text-xl flex hover:text-orange-600 dark:hover:text-indigo-600'
                                        onClick={() => { setVisualizar(false) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                                        </svg>
                                        <span className='mt-1 ml-3'> <FormattedMessage id="con.screen.actions.Inv.screen.1" defaultMessage="Back to List" /> </span>
                                    </button>

                                    <p className='text-2xl'> <FormattedMessage id="con.screen.actions.Inv.screen.title" defaultMessage="Details" /> </p>

                                    <button
                                        className='text-xl flex hover:text-red-400 dark:hover:text-red-600'
                                        onClick={handleDelete}>
                                        <span className='mt-1 mr-3'><FormattedMessage id="con.screen.actions.Inv.screen.2" defaultMessage="Delete" /></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className='col-12'>
                                <ViewInversion inversion={inversion} />
                            </div>

                        </div>
                    )
                    :
                    (
                        <>
                            {
                                (inversiones.length === 0)
                                    ?
                                    (
                                        <h2 className='text-center text-gray-100 text-2xl p-4 rounded-lg'>
                                            <FormattedMessage id="con.screen.actions.Inv.0" defaultMessage="Info No Client" values={{ name: contacto.nombre }} />
                                        </h2>
                                    )
                                    :
                                    (
                                        <TableContainer className='rounded-xl' style={{ maxWidth: 2000 }}>

                                            <Table className='table-styles'>

                                                <TableHead className='bg-indigo-900 dark:bg-gray-900 border-b-4 border-indigo-400 dark:border-gray-800'>
                                                    <TableRow>
                                                        <TableCell style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-400'> <FormattedMessage id="con.screen.actions.Inv.table.cap" defaultMessage="Capital" /> </span> </TableCell>
                                                        <TableCell style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-400'> <FormattedMessage id="con.screen.actions.Inv.table.tipo" defaultMessage="Type" /> </span> </TableCell>
                                                        <TableCell style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-400'> <FormattedMessage id="con.screen.actions.Inv.table.date" defaultMessage="START-END" /> </span> </TableCell>
                                                        <TableCell className='d-md-none d-lg-block text-center' style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-400'> <FormattedMessage id="con.screen.actions.Inv.table.estado" defaultMessage="State" /> </span> </TableCell>
                                                        <TableCell className='text-center' style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-400'> <FormattedMessage id="con.screen.actions.Inv.table.actions" defaultMessage="Actions" /> </span> </TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody className='bg-indigo-900 dark:bg-gray-900'>
                                                    {inversiones.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                                        <TableRow key={row._id}>
                                                            <TableCell>
                                                                <Typography><span className='text-gray-100 text-xl  ms-md-2' style={{ fontFamily: 'Josefin Sans' }}> $ {row.capitales.capital}</span></Typography>
                                                                <Typography><span className='text-green-600 text-md  ms-md-2' style={{ fontFamily: 'Josefin Sans' }}> $ {row.capitales.capitalFinal}</span></Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>
                                                                    <span className='text-gray-100 text-xl ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>
                                                                        {
                                                                            (row.tipo === 'Compuesto')
                                                                                ? <FormattedMessage id="con.screen.actions.Inv.table.tipo.a" defaultMessage="Compound" />
                                                                                : <FormattedMessage id="con.screen.actions.Inv.table.tipo.b" defaultMessage="Simple" />
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                                <Typography>
                                                                    <span className='text-orange-500 dark:text-indigo-300 text-md ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>
                                                                        {(row.tipo === 'Compuesto') ? 200 : 60}%
                                                                    </span>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography>
                                                                    <span className='text-gray-100 text-xl ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>
                                                                        {
                                                                            row.fechas.inicio[8] + row.fechas.inicio[9] + '-' +
                                                                            row.fechas.inicio[5] + row.fechas.inicio[6] + '-' +
                                                                            row.fechas.inicio[0] + row.fechas.inicio[1] + row.fechas.inicio[2] + row.fechas.inicio[3]
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                                <Typography>
                                                                    <span className='text-gray-300 dark:text-gray-400 text-md ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>
                                                                        {
                                                                            row.fechas.fin[8] + row.fechas.fin[9] + '-' +
                                                                            row.fechas.fin[5] + row.fechas.fin[6] + '-' +
                                                                            row.fechas.fin[0] + row.fechas.fin[1] + row.fechas.fin[2] + row.fechas.fin[3]
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell className='text-center d-md-none d-lg-block'>
                                                                <Typography
                                                                    style={{
                                                                        backgroundColor:
                                                                            (
                                                                                (row.estado === true && '#5EEAD4') ||
                                                                                (row.estado === false && '#FD8469')
                                                                            ),
                                                                        fontWeight: 'normal',
                                                                        color: 'white',
                                                                        fontSize: '1rem',
                                                                        borderRadius: 15,
                                                                        padding: '7px 15px',
                                                                        display: 'inline-block',
                                                                        fontFamily: 'Josefin Sans'
                                                                    }}
                                                                >
                                                                    {
                                                                        (row.estado === true)
                                                                            ? <FormattedMessage id="con.screen.actions.Inv.table.estado.b" defaultMessage="Completed" />
                                                                            : <FormattedMessage id="con.screen.actions.Inv.table.estado.a" defaultMessage="In Process" />
                                                                    }
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell className=' text-center'>
                                                                <button
                                                                    className='btn text-teal-300 dark:text-gray-200 bg-blue-600 dark:bg-indigo-600 hover:bg-teal-600 hover:text-gray-100 dark:hover:bg-gray-700'
                                                                    style={{ fontFamily: 'Josefin Sans' }}
                                                                    onClick={() => { handleVisualizar(row._id) }}
                                                                >
                                                                    <FormattedMessage id="con.screen.actions.Inv.table.actions.b" defaultMessage="Manage" />
                                                                </button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}

                                                    <TableRow className='border-t-4 border-indigo-400 dark:border-gray-800'>
                                                        <TablePagination
                                                            rowsPerPageOptions={[3, 5, 10, 15]}
                                                            count={inversiones.length}
                                                            rowsPerPage={rowsPerPage}
                                                            component='td'
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                        />
                                                    </TableRow>

                                                </TableBody>

                                            </Table>

                                        </TableContainer>
                                    )
                            }
                        </>

                    )
            }
        </>
    )
}