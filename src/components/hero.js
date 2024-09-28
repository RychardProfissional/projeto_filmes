'use client'

import { HiChevronDown } from 'react-icons/hi';

export default function Hero({ title }) {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight - 70,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative flex items-center justify-start w-screen h-screen bg-gray-300">
            <div className="ml-10">
                <h1 className="text-6xl">{title}</h1>
            </div>
            <div className='absolute text-4xl transform -translate-x-1/2 bottom-4 left-1/2 animate-bounce'>
                <HiChevronDown 
                    className="transition-colors hover:text-blue-600" 
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}
