// Client Component for Exit Draft Mode button
'use client';

import { useRouter } from 'next/navigation';

export default function DisableDraftMode() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await fetch('/api/disable', { method: 'GET' });
        router.refresh();
      }}
    >
      Exit Draft Mode
    </button>
  );
}
