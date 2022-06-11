import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { countriesEsp, countriesEng } from '../../../data/Countries'
import { getCountriesByLang } from '../../../helpers/selector'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Selector = ({ bg }) => {

    const countries = getCountriesByLang(countriesEsp, countriesEng);
    const [selected, setSelected] = useState(countries[0]);

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative">

                        <Listbox.Button
                            className={
                                (bg === '1')
                                    ? 'form-control form-control-lg rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-900 text-xl'
                                    : 'form-control form-control-lg rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-900 text-xl'
                            }
                        >
                            <span className="flex items-center">
                                <img src={selected.avatar} alt="" className="flex-shrink-0 h-7 w-7 rounded-full" />
                                <span className={(bg === '1') ? 'ml-5 block truncate text-gray-100' : 'ml-5 block truncate text-gray-900'}>
                                    {selected.name}
                                </span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open} as={Fragment}
                            leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-2 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {countries.map((country) => (
                                    <Listbox.Option
                                        key={country.id}
                                        value={country}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-gray-700' : 'text-gray-900',
                                                'cursor-default select-none relative py-3 pl-4 pr-9'
                                            )
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <div onClick={() => localStorage.setItem('country', country.value)}>
                                                <div className="flex items-center" >
                                                    <img src={country.avatar} alt="Flag IMG" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-4 block truncate text-lg')} >
                                                        {country.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>

                    </div>
                </>
            )}
        </Listbox>
    );
}