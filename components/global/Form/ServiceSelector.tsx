'use client';

import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { trackLeadFormServiceSelect } from '@/components/lib/GTMTrackers';
import type { GetUnitBusinessListQueryResult } from '@/sanity.types';

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
    mainCategoryValue: string,
    serviceCategoryValue: string
  ) => {
    const mainEvent = {
      target: {
        name: 'mainCategory',
        value: mainCategoryValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    const serviceEvent = {
      target: {
        name: 'serviceCategory',
        value: serviceCategoryValue,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleFormChange(mainEvent);
    handleFormChange(serviceEvent);
    setMainCategory(null);
    setServiceCategory(null);
  };

  return (
    <div className="space-y-3 rounded-[8px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4">
      <label
        className="block text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text-soft)]"
        htmlFor="service-selector-trigger"
      >
        ¿Qué tipo de asesoría necesita?
      </label>

      <button
        aria-controls="service-categories"
        aria-expanded={mainCategory === 'main'}
        className="flex min-h-[52px] w-full items-center justify-between rounded-[8px] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-4 py-3 text-left text-[color:var(--color-text)] transition-colors duration-200 hover:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(139,106,67,0.28)]"
        id="service-selector-trigger"
        onClick={() => setMainCategory(mainCategory === 'main' ? null : 'main')}
        type="button"
      >
        <span className="pr-4">
          {selectedService || 'Seleccione un área y un servicio'}
        </span>
        <IoIosArrowDown
          className={`shrink-0 text-[color:var(--color-text-soft)] transition-transform duration-300 ${mainCategory === 'main' ? 'rotate-180' : 'rotate-0'}`}
          size={18}
        />
      </button>

      {mainCategory === 'main' && (
        <div
          className="overflow-hidden rounded-[8px] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[var(--shadow-soft)]"
          id="service-categories"
        >
          {unitBusinessList?.map((unitBusiness, index) => (
            <div
              className="border-b border-[color:rgba(31,39,51,0.08)] last:border-b-0"
              key={unitBusiness.slug}
            >
              <button
                aria-controls={`services-${index}`}
                aria-expanded={serviceCategory === index}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-[color:var(--color-text)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.04)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(139,106,67,0.28)]"
                onClick={() => toggleCategory(index)}
                type="button"
              >
                <span className="font-medium">
                  {unitBusiness?.title || 'Área sin nombre'}
                </span>
                <span
                  className={`inline-flex text-[color:var(--color-text-soft)] transition-transform duration-300 ${serviceCategory === index ? '-rotate-90' : 'rotate-0'}`}
                >
                  <IoIosArrowDown size={20} />
                </span>
              </button>

              {serviceCategory === index && (
                <div
                  className="mx-4 mb-4 border-l border-[color:var(--color-border)] bg-[color:rgba(245,242,236,0.72)]"
                  id={`services-${index}`}
                >
                  {unitBusiness?.services?.map((service) => (
                    <button
                      className="w-full px-4 py-3 text-left text-sm text-[color:var(--color-text)] transition-colors duration-200 hover:bg-[color:rgba(30,42,56,0.06)] focus:outline-none focus:ring-2 focus:ring-[color:rgba(139,106,67,0.28)]"
                      key={service.slug}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleServiceClick(
                          unitBusiness?.title || '',
                          service?.title || ''
                        );
                        trackLeadFormServiceSelect({
                          areaTitle: unitBusiness?.title || '',
                          serviceSlug: service?.slug || '',
                          serviceTitle: service?.title || '',
                        });
                      }}
                      type="button"
                    >
                      {service?.title || 'Servicio sin nombre'}
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
