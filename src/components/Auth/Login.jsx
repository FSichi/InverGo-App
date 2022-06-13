import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { startLoginEmailPassword } from '../../redux/actions/auth';
import { FormattedMessage } from 'react-intl';

export const Login = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [contactoView, setContactoView] = useState(false);

    const handleLogin = (data) => {
        dispatch(startLoginEmailPassword(data.email, data.password));
        (localStorage.getItem('avatar') === null) && localStorage.setItem("avatar", '0');
    }

    return (
        <div className="container loginSize">
            <div className="row flex justify-center">

                <div className="col-12 col-md-9 col-lg-6 col-xl-5">
                    <div className="card bg-indigo-600 dark:bg-gray-800 text-gray-100 rounded-2xl">
                        <div className="card-body p-5 text-center">

                            <form className="pb-5" onSubmit={handleSubmit(handleLogin)}>

                                <h2 className="fw-bold mb-2 text-uppercase text-2xl"> <FormattedMessage id="auth.login" defaultMessage="Login" /> </h2>
                                <p className="text-gray-400 mb-3"> <FormattedMessage id="auth.login.desc" defaultMessage="Login Desc" /> </p>

                                <input
                                    type="email" placeholder='Correo Electronico' {...register("email")}
                                    className="form-control form-control-lg text-center mb-4" name='email'
                                />

                                <input
                                    type="password" placeholder='Contraseña' {...register("password")}
                                    className="form-control form-control-lg text-center mb-4" name='password'
                                />

                                <button type="submit" className="p-3 rounded-xl bg-gray-900 text-teal-300 w-50 mt-2 hover:bg-blue-800 dark:hover:bg-indigo-600 dark:hover:text-gray-100">
                                    <FormattedMessage id="auth.login.button" defaultMessage="Login" />
                                </button>

                            </form>

                            {/* <>
                            <span className="mb-0">
                                <FormattedMessage id="auth.login.ref" defaultMessage="Login Ref" />
                                <Link className="fw-bold ms-2 text-orange-500 hover:text-teal-300 dark:text-indigo-400 dark:hover:text-teal-300" to='/auth/register' >
                                    <FormattedMessage id="auth.login.ref.button" defaultMessage="Login Ref Button" />
                                </Link>
                            </span>
                        </> */}


                            <span className="mb-0">
                                <FormattedMessage id="auth.login.problem.text" defaultMessage="Login Problems" />
                                <button
                                    className="fw-bold ms-2 text-orange-500 hover:text-teal-300 dark:text-indigo-400 dark:hover:text-teal-300"
                                    onClick={() => setContactoView(!contactoView)}
                                >
                                    <FormattedMessage id="auth.login.problem.button" defaultMessage="Login Problem Button" />
                                </button>
                            </span>

                        </div>
                    </div>
                </div>

                {
                    (contactoView)
                    &&
                    (
                        <div className="col-12 col-md-9 col-lg-6 col-xl-5 mt-md-5 mt-lg-0">
                            <div className="card bg-indigo-600 dark:bg-gray-800 text-gray-100 rounded-2xl p-5">
                                <h2 className="fw-bold mb-2 text-uppercase text-2xl text-center">
                                    <FormattedMessage id="auth.login.problem.title" defaultMessage="Contact Title" />
                                </h2>

                                <p className="text-gray-200 text-xl mt-3 text-center">
                                    <FormattedMessage id="auth.login.problem.email" defaultMessage="Contact Email" />
                                    <span className='text-orange-500 hover:text-teal-300 dark:text-indigo-400 dark:hover:text-teal-300'> info.invergo@gmail.com </span>
                                </p>

                                <div className="relative flex mt-3 items-center">
                                    <div className="flex-grow border-t border-indigo-400"></div>
                                    <div className="flex-grow border-t border-indigo-400"></div>
                                </div>

                                <p className="text-gray-200 text-xl mt-4 text-center"> <FormattedMessage id="auth.login.problem.desc.1" defaultMessage="Contact Desc 1" /> </p>
                                <p className="text-cyan-200 dark:text-teal-300 text-xl mt-2 text-center"><FormattedMessage id="auth.login.problem.desc.2" defaultMessage="Contact Desc 2" /></p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};