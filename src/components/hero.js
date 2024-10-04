'use client'

import { HiChevronDown } from 'react-icons/hi';
import background from "../imagens/background.webp";

export default function Hero({ title }) {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight - 70,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-blue-100">
            <div 
                className="relative flex items-center justify-start w-screen h-[105vh] bg-gray-300 bg-opacity-70 rounded-b-[5%]"
                style={{ backgroundImage: `url(${background.src})` }}
            >
                <div className="ml-10 animate-slide-in">
                    <h1 className="font-serif font-bold tracking-wider text-white text-7xl">{title}</h1>
                </div>
                <div className='absolute text-4xl transform -translate-x-1/2 animate-bounce bottom-12 left-1/2'>
                    <HiChevronDown 
                        className="text-white transition-colors hover:text-blue-600" 
                        onClick={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}
