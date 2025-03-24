'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from './GTMGlobals';

export function GTMWrapper() {
    return (
        <>
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <>
                    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
                    <GTMGlobals />
                </>
            )}
        </>
    );
}