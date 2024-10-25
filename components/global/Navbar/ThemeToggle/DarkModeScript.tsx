import Script from 'next/script';

export default function DarkModeScript() {
  return (
    <Script
      id="dark-mode-script"
      dangerouslySetInnerHTML={{
        __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
      }}
    />
  );
}
