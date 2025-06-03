'use client';
import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import GTMGlobals from './GTMGlobals';

export function GTMWrapper(): React.ReactElement {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <>
            {process.env.NEXT_PUBLIC_GTM_ID && (
                <>
                    {loaded && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
                    <GTMGlobals />
                </>
            )}
        </>
    );
}
