'use client';

import dynamic from 'next/dynamic';
import { useContactDrawerContext } from '@/context/ContactDrawerContext';
import {
  GetUnitBusinessListQueryResult,
  SettingsQueryResult,
} from '@/sanity.types';

const Form = dynamic(() => import('@/components/global/Form'), {
  ssr: false,
});

export default function FormMount({
  unitBusinessList,
  settings,
}: {
  unitBusinessList: GetUnitBusinessListQueryResult;
  settings: SettingsQueryResult;
}) {
  const { isOpen } = useContactDrawerContext();

  return isOpen ? (
    <Form
      unitBusinessList={unitBusinessList}
      logo={settings?.logo}
      slogan={settings?.slogan}
    />
  ) : null;
}
