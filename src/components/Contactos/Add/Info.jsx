import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

export const Info = () => {
    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <Popover.Button>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mt-2 text-teal-300 dark:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap='round' strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-100" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1"
                    >

                        <Popover.Panel
                            className="absolute z-10 transform w-max max-w-md lg:-translate-x-56 md:-translate-x-52 -translate-x-40 lg:-left-50 md:-translate-y-72 lg:-translate-y-64 border border-primary"
                            style={{ backgroundColor: '#000a12', borderRadius: '10px' }}
                            onClick={() => { close(); }}
                        >
                            <div className="shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                <div className="relative grid gap-1 px-5 py-6 sm:gap-8 sm:p-8" >
                                    <p className="mt-1 text-md text-gray-400"><FormattedMessage id="con.info.1" defaultMessage="Tittle" /></p>
                                    <p className="mt-1 text-md text-gray-400">
                                        <span className='text-indigo-500'> <FormattedMessage id="con.info.2.1" defaultMessage="Option 1" /> </span>
                                        <FormattedMessage id="con.info.2.2" defaultMessage="Option 1 Desc" />
                                    </p>
                                    <p className="mt-1 text-md text-gray-400">
                                        <span className='text-indigo-500'> <FormattedMessage id="con.info.3.1" defaultMessage="Option 2" /> </span>
                                        <FormattedMessage id="con.info.3.2" defaultMessage="Option 2 Desc" />
                                    </p>
                                </div>
                            </div>

                        </Popover.Panel>

                    </Transition>
                </>
            )}
        </Popover>
    )
}