import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export const TablaContactos = ({ contactos }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    /* className='xs:invisible sm:invisible md:visible lg:visible' */

    return (
        <TableContainer className='rounded-xl' style={{ maxWidth: 2000 }}>

            <Table className='table-styles'>

                <TableHead className='bg-indigo-600 dark:bg-gray-800 border-b-4 border-indigo-900 dark:border-gray-900'>
                    <TableRow>
                        <TableCell className='text-center' style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-600'> <FormattedMessage id="con.list.table.name" defaultMessage="NAME" /> </span> </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-600'> <FormattedMessage id="con.list.table.phone" defaultMessage="PHONE" /> </span> </TableCell>
                        <TableCell className='text-center' style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-600'> <FormattedMessage id="con.list.table.nac" defaultMessage="NACIONALITY" /> </span> </TableCell>
                        <TableCell className='text-center' style={{ fontWeight: 'bold' }}> <span className='text-gray-200 dark:text-teal-600'> <FormattedMessage id="con.list.table.action" defaultMessage="ACTIONS" /> </span> </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody className='bg-indigo-600 dark:bg-gray-800'>
                    {contactos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row._id} className='border-b-2 border-indigo-900 dark:border-gray-900'>

                            <TableCell className='text-center'>
                                <Typography><span className='text-gray-100 font-bold text-xl ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.nombre}</span></Typography>
                                <Typography><span className='text-gray-400 dark:text-indigo-300 text-md ms-lg-3 ms-md-2' style={{ fontFamily: 'Josefin Sans' }}>{row.correo}</span></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography component={'span'} className='text-white' style={{ fontFamily: 'Josefin Sans' }}><span className='text-xl ms-2'>{row.telefono}</span></Typography>
                            </TableCell>
                            <TableCell className='text-center'>
                                <div className='row flex justify-end'>
                                    <div className='col-8'>
                                        <img src={`../../assets/flags/${row.nacionalidad}.svg`} alt='Flag Contact' style={{ borderRadius: '7px', height: '35px', width: '45px' }} />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className=' text-center'>
                                <Link
                                    className='btn px-3 py-2 text-teal-300 dark:text-gray-200 bg-blue-900 dark:bg-indigo-600 hover:bg-teal-600 hover:text-gray-100 dark:hover:bg-gray-900'
                                    style={{ fontFamily: 'Josefin Sans' }} to={`/con/${row._id}`}
                                >
                                    <FormattedMessage id="con.list.table.action.button" defaultMessage="Manage" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}

                    <TableRow className='border-t-4 border-indigo-900 dark:border-gray-900'>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 10, 15]}
                            count={contactos.length}
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