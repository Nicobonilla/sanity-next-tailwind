'use client';

import { useState } from 'react';
import type { GetUnitBusinessListQueryResult } from '@/sanity.types';

interface ServiceSelectorProps {
  unitBusinessList: GetUnitBusinessListQueryResult;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
}

export default function ServiceSelector({
  unitBusinessList,
  selectedService,
  setSelectedService,
}: ServiceSelectorProps) {
  const [mainCategory, setMainCategory] = useState<'main' | null>('main');
  const [serviceCategory, setServiceCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setServiceCategory(serviceCategory === index ? null : index);
  };

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setMainCategory(null); // Cierra la categoría principal al seleccionar un servicio
    setServiceCategory(null); // Cierra las categorías de servicios al seleccionar un servicio
  };

  return (
    <div className="w-full rounded bg-[#1a201f] p-4 text-white">
      <label className="mb-2 block text-sm font-bold">
        ¿Qué Tipo de Asesoría necesitas?
      </label>

      {/* Botón de selección */}
      <div
        className="w-full cursor-pointer rounded bg-menuColor2 px-4 py-2 text-center"
        onClick={() => setMainCategory(mainCategory === 'main' ? null : 'main')}
      >
        {selectedService || 'Selecciona una Opción'}
      </div>

      {/* Acordeón de categorías */}
      {mainCategory === 'main' && (
        <div className="mt-2 rounded bg-[#1a201f] shadow-lg">
          {unitBusinessList.map((unitBusiness, index) => (
            <div key={unitBusiness.slug}>
              {/* Categoría (Unit Business Title) */}
              <div
                className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-menuColor2"
                onClick={() => toggleCategory(index)}
              >
                {unitBusiness?.title || ''}
                {serviceCategory === index ? '<' : '>'}
              </div>

              {/* Lista de servicios dentro de la categoría */}
              {serviceCategory === index && (
                <div className="ml-4 border-l border-gray-600">
                  {unitBusiness?.services?.map((service) => (
                    <div
                      key={service.slug}
                      className="cursor-pointer px-4 py-2 hover:bg-menuColor2"
                      onClick={(e) => {
                        e.stopPropagation(); // Detiene la propagación del evento
                        handleServiceClick(service?.title || '');
                      }}
                    >
                      {service?.title}
                    </div>
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
