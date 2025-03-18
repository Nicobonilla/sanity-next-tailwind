import clsx from "clsx";
import type { NavPageProps } from "./NavLink";

export default function ButtonNavContact({
    page,
    path,
    activeLink,
    onMouseEnter,
    onMouseLeave,
    toggleDrawerForm,
}: NavPageProps) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (page.slug === 'contacto' && toggleDrawerForm) {
            e.preventDefault();
            toggleDrawerForm();
            //trackButtonClick(page.slug, 'desk-nav');
        }
    };
    return (
        <button
            className={clsx(
                'truncate px-8 text-center font-montserrat text-sm uppercase text-neutral-800 drop-shadow-2xl',
                {
                    'py-3 group-hover:text-white': page.slug !== 'contacto',
                    'rounded-md bg-indigo-700 py-2 text-white hover:bg-indigo-600':
                        page.slug === 'contacto',
                    'bg-neutral-950 text-white':
                        (path !== '/' &&
                            activeLink === 'services' &&
                            path === `/${page.slug}`) ||
                        path === `/area-de-practica/derecho-familiar` ||
                        path === `/area-de-practica/derecho-imobiliario`,
                }
            )}
            onClick={handleClick}
            onMouseEnter={() => onMouseEnter(page.slug || '')} // Usar valor por defecto si slug es null
            onMouseLeave={onMouseLeave}
        >
            {page.title}
        </button>
    )
}