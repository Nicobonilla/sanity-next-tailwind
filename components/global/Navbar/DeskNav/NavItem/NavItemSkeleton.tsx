import clsx from 'clsx';
import SubsectionsContainerSimpleSk from './SubsectionsContainerSimpleSk';
import NavLinkSkeleton from './NavLinkSkeleton';
import type { DeskNavProps } from '..';

export default function NavItemSkeleton({
    pages,
    unitBusinessList,
}: DeskNavProps) {

    return (
        <>
            {pages?.map((page: DeskNavProps['pages'][number]) => {
                const isContact = page.slug === 'contacto';
                const isService = page.slug === 'services';
                return (
                    <li
                        key={page.title}
                        className={clsx(
                            'group relative my-auto flex size-full cursor-pointer items-center justify-center',
                            {
                                'hover:bg-neutral-950 hover:text-white': !isContact,
                                'ml-4 h-8 rounded-sm bg-blue-900/90 hover:bg-blue-950': isContact,
                            }
                        )}
                    >
                        <NavLinkSkeleton page={page} />
                        {unitBusinessList && isService && <SubsectionsContainerSimpleSk unitBusinessList={unitBusinessList} />}
                    </li>
                )
            })}
        </>
    );
}