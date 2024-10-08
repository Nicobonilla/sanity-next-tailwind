import React from 'react';
import { Links, NavProps } from '@/types';
import Link from 'next/link';

const Simple: React.FC<NavProps> = ({ links }) => {
    return (
            <div className="hidden lg:flex items-center justify-end space-x-3 w-full h-full">
                {links.map( ( link: Links )=> (
                    <div key={link.section} 
                    className="relative group h-full">
                        <button className={`inline-flex  
                        w-full h-full
                        items-center px-2 
                        text-xl text-white rounded 
                        hover:text-gray-400
                        transition duration-300
                        cursor-pointer
                        `}
                        href ={ link.href }
                        >
                            {link.section}
                        </button>
                        {link.subsections && link.subsections.length > 0 && (
                            <div className="absolute hidden right-0 
                            pt-2 w-48 z-10
                            bg-white shadow-xl
                            group-hover:block">
                                
                                {link.subsections.map(( { section, href}, subIndex) => (
                                    <Link
                                        key={section}
                                        href={ href }
                                        className={`block px-4 py-4 
                                            text-xs text-gray-700 
                                            hover:bg-[#6f97d9] hover:text-white 
                                            ${ subIndex === 0
                                                ? "border-t border-blue-500"
                                                : "border-t border-gray-500"
                                        }`}
                                    >
                                        {section}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
    );
};

export default Simple;
