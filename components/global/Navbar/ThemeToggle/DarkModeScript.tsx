// components/global/DarkModeScript.tsx

import Script from 'next/script';

export default function DarkModeScript() {
  return (
    <Script
      id="dark-mode-script"
      strategy="afterInteractive"
      src="https://cdn.jsdelivr.net/npm/theme-change@1.0.2/index.min.js"
    />
  );
}
