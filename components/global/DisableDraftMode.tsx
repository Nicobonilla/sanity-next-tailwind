// Client Component for Exit Draft Mode button
'use client';

import { useRouter } from 'next/navigation';

export default function DisableDraftMode() {
  const router = useRouter();

  return (
    <button
      className="fixed left-auto right-10 top-24 z-50 rounded-md bg-blue-500 px-4 py-2 text-white"
      onClick={async () => {
        await fetch('/api/disable', { method: 'GET' });
        router.refresh();
      }}
    >
      Exit Draft Mode
    </button>
  );
}
