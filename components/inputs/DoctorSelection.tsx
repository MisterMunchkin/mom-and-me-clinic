import { DoctorClass } from "@/classes/doctor";
import { filterList } from "@/utilities/helpers";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import ServiceTags from "../ServiceTags";

interface DoctorSelectionProps {
  doctors: DoctorClass[];
  defaultDoctorIndex: number;
  handleDoctorChange: (selectedDoctor: DoctorClass) => void;
}

export default function DoctorSelection({doctors, defaultDoctorIndex, handleDoctorChange}: DoctorSelectionProps) {
  const [ selectedDoctor, setSelectedDoctor ] = useState<DoctorClass>(doctors[defaultDoctorIndex]);
  const [query, setQuery] = useState('');

  // handleDoctorChange(selectedDoctor);
  // useEffect(() => {
  // }, [handleDoctorChange, selectedDoctor]);

  const filteredDoctors: DoctorClass[] = query === ''
    ? doctors
    : filterList(query, doctors, ['name', 'joinedTags']);

  const onChange = (doctor: DoctorClass) => {
    setSelectedDoctor(doctor);
    handleDoctorChange(doctor);
  }

  return (
    <div className="relative">
      <Combobox 
        value={selectedDoctor} 
        onChange={onChange}>
        <Combobox.Label
         className="block text-sm font-medium leading-6 text-gray-900"
        >Doctor</Combobox.Label>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(doctor: DoctorClass) => doctor?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredDoctors.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <Combobox.Option
                    key={doctor.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      }`
                    }
                    value={doctor}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {doctor.name}
                          <span className="mx-3 space-x-2">
                            <ServiceTags tags={doctor.serviceTags} />
                          </span>
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-primary'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}