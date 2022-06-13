import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import { Separador } from '../UI/Separador'

export const About = () => {

    localStorage.setItem("ruta", `/about`);

    return (
        <div className='container'>

            {/* FUNCIONALIDADES */}

            <div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-5 mb-3">
                <div class="flex flex-wrap -mx-8">
                    <div class="w-full lg:w-1/2 px-8">
                        <div class="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
                            <h2 class="mb-4 text-3xl lg:text-4xl font-bold font-heading dark:text-white">
                                <FormattedMessage id="about.title" defaultMessage="Info 1" />
                            </h2>
                            <p class="mb-8 leading-loose text-gray-500 dark:text-gray-300">
                                <FormattedMessage id="about.subtitle" defaultMessage="Info 1" />
                            </p>
                            <div class="w-full md:w-1/3">
                                <Link to='/dashboard' type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    <FormattedMessage id="about.button" defaultMessage="Info 1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2 px-8">
                        <ul class="space-y-7">
                            <li class="flex -mx-4">
                                <div class="px-4">
                                    <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-indigo-400 text-teal-300 dark:bg-blue-50 dark:text-blue-600">
                                        1
                                    </span>
                                </div>
                                <div class="px-4">
                                    <h3 class="my-2 text-xl font-semibold dark:text-white">
                                        <FormattedMessage id="about.items.1" defaultMessage="Item 1" />
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-300 leading-loose">
                                        <FormattedMessage id="about.items.1.desc" defaultMessage="Item 1 Desc" />
                                    </p>
                                </div>
                            </li>
                            <li class="flex -mx-4">
                                <div class="px-4">
                                    <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-indigo-400 text-teal-300 dark:bg-blue-50 dark:text-blue-600">
                                        2
                                    </span>
                                </div>
                                <div class="px-4">
                                    <h3 class="my-2 text-xl font-semibold dark:text-white">
                                        <FormattedMessage id="about.items.2" defaultMessage="Item 2" />
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-300 leading-loose">
                                        <FormattedMessage id="about.items.2.desc" defaultMessage="Item 2 Desc" />
                                    </p>
                                </div>
                            </li>
                            <li class="flex -mx-4">
                                <div class="px-4">
                                    <span class="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-indigo-400 text-teal-300 dark:bg-blue-50 dark:text-blue-600">
                                        3
                                    </span>
                                </div>
                                <div class="px-4">
                                    <h3 class="my-2 text-xl font-semibold dark:text-white">
                                        <FormattedMessage id="about.items.3" defaultMessage="Item 3 Desc" />
                                    </h3>
                                    <p class="text-gray-500 dark:text-gray-300 leading-loose">
                                        <FormattedMessage id="about.items.3.desc" defaultMessage="Item 3 Desc" />
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Separador />

            {/* PREGUNTAS FRECUENTES */}

            <div className="py-20 px-4 dark:text-gray-100">
                <div className="mx-auto max-w-6xl flex flex-col lg:flex-row">
                    <h2 className="mr-8 w-full md:w-3/3 lg:w-1/3 text-3xl font-extrabold leading-9">
                        <FormattedMessage id="about.ask.title" defaultMessage=" PF ASK" />
                    </h2>
                    <dl className="w-full md:w-3/3 lg:w-2/3 md:mt-5 lg:mt-0">
                        <dt className="mb-4">
                            <h3 className="text-xl font-bold">
                                <FormattedMessage id="about.ask.1" defaultMessage="Ask 1" />
                            </h3>
                        </dt>
                        <dd className="mb-16 text-gray-500 dark:text-gray-300">
                            <FormattedMessage id="about.ask.1.desc" defaultMessage="Ask 1 Desk" />
                        </dd>
                        <dt className="mb-4">
                            <h3 className="text-xl font-bold">
                                <FormattedMessage id="about.ask.2" defaultMessage="Ask 2" />
                            </h3>
                        </dt>
                        <dd className="mb-16 text-gray-500 dark:text-gray-300">
                            <FormattedMessage id="about.ask.2.desc.1" defaultMessage="Ask 2.1 Desk" />
                            <p className='mt-3'>
                                <FormattedMessage id="about.ask.2.desc.2" defaultMessage="Ask 2.2 Desk" />
                            </p>
                        </dd>
                        <dt className="mb-4">
                            <h3 className="text-xl font-bold">
                                <FormattedMessage id="about.ask.3" defaultMessage="Ask 3" />
                            </h3>
                        </dt>
                        <dd className='text-gray-500 dark:text-gray-300'>
                            <FormattedMessage id="about.ask.3.desc" defaultMessage="Ask 3 Desk" />
                        </dd>
                    </dl>
                </div>
            </div>

        </div>
    )
}