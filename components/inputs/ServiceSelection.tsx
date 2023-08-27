import { ServiceClass } from "@/classes/service";
import { filterList } from "@/utilities/helpers";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import ServiceTags from "../utilities/ServiceTags";

interface ServiceSelectionProps {
  services: ServiceClass[];
  defaultServiceIndex: number;
  handleServiceChange: (selectedService: ServiceClass) => void;
}

export default function ServiceSelection({services, defaultServiceIndex, handleServiceChange}: ServiceSelectionProps) {
  const [ selectedService, setSelectedService ] = useState<ServiceClass | null>(services[defaultServiceIndex]);
  const [query, setQuery] = useState('');

  const filteredServices: ServiceClass[] = query === ''
   ? services
   : filterList(query, services, ['name', 'joinedTags']);

  const onChange = (service: ServiceClass) => {
    setSelectedService(service);
    handleServiceChange(service);
  }

  return (
    <div className="relative">
      <Combobox 
        value={selectedService} 
        onChange={onChange}>
        <Combobox.Label
         className="block text-sm font-medium leading-6 text-gray-900"
        >Service</Combobox.Label>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(service: ServiceClass) => service?.name}
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
            <Combobox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredServices.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredServices.map((service) => (
                  <Combobox.Option
                    key={service.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : 'text-gray-900'
                      }`
                    }
                    value={service}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {service.name}
                          <span className="mx-3 space-x-2">
                            <ServiceTags tags={service.tags} />
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
  );
}