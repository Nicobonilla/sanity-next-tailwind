'use client';

import { useState } from 'react';
import type { GetUnitBusinessListQueryResult } from '@/sanity.types';
import { IoIosArrowDown } from 'react-icons/io';

interface ServiceSelectorProps {
  unitBusinessList: GetUnitBusinessListQueryResult;
  selectedService: string | null;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ServiceSelector({
  unitBusinessList,
  selectedService,
  handleFormChange,
}: ServiceSelectorProps) {
  const [mainCategory, setMainCategory] = useState<'main' | null>('main');
  const [serviceCategory, setServiceCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setServiceCategory(serviceCategory === index ? null : index);
  };

  const handleServiceClick = (
    mainCategory: string,
    serviceCategory: string
  ) => {
    // Create synthetic events to use handleFormChange
    const mainEvent = {
      target: {
        name: 'mainCategory',
        value: mainCategory,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const serviceEvent = {
      target: {
        name: 'serviceCategory',
        value: serviceCategory,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleFormChange(mainEvent);
    handleFormChange(serviceEvent);
    setMainCategory(null);
    setServiceCategory(null);
  };

  return (
    <div className="w-full rounded bg-[#1a201f] p-4 text-white">
      <label className="mb-2 block text-sm font-bold">
        ¿Qué Tipo de Asesoría necesitas?
      </label>
      <button
        className="w-full cursor-pointer rounded bg-menuColor2 px-4 py-2 text-center hover:bg-menuColor2/90 focus:outline-none focus:ring-2 focus:ring-menuColor2"
        onClick={() => setMainCategory(mainCategory === 'main' ? null : 'main')}
        aria-expanded={mainCategory === 'main'}
        aria-controls="service-categories"
        type="button"
      >
        {selectedService || 'Selecciona una Opción'}
      </button>

      {mainCategory === 'main' && (
        <div
          id="service-categories"
          className="mt-2 rounded bg-[#1a201f] shadow-lg"
        >
          {unitBusinessList?.map((unitBusiness, index) => (
            <div key={unitBusiness.slug}>
              <button
                className="flex w-full items-center justify-between px-4 py-2 hover:bg-menuColor2 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                onClick={() => toggleCategory(index)}
                aria-expanded={serviceCategory === index}
                aria-controls={`services-${index}`}
                type="button"
              >
                <span>{unitBusiness?.title || 'Untitled Category'}</span>
                <div
                  className={`inline-block transition-transform duration-300 ${serviceCategory === index ? '-rotate-90' : 'rotate-0'}`}
                >
                  <IoIosArrowDown size={20} />
                </div>
              </button>

              {serviceCategory === index && (
                <div
                  id={`services-${index}`}
                  className="ml-4 border-l border-gray-600"
                >
                  {unitBusiness?.services?.map((service) => (
                    <button
                      key={service.slug}
                      className="w-full px-4 py-2 text-left hover:bg-menuColor2 focus:outline-none focus:ring-2 focus:ring-menuColor2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceClick(
                          service?.title || '',
                          unitBusiness?.title || ''
                        );
                      }}
                      type="button"
                    >
                      {service?.title || 'Untitled Service'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
