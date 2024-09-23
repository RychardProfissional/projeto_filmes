'use client'

import { HiChevronUp } from 'react-icons/hi';
import { useWindowScroll } from 'react-use';

export default function BackToTop() {
    const { y } = useWindowScroll();
    
    return (
        <div className={`fixed bottom-0 right-0 bg-blue-50 m-3 rounded-full p-3 opacity-75 hover:opacity-100 transition-all ${ y > 100 ? '': 'hidden'}`}>
            <button
                className="flex items-center text-4xl transition-colors hover:text-blue-600"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <HiChevronUp className="inline-block" />
            </button>
        </div>  
    );
}

