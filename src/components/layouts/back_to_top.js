'use client'
import { useEffect, useState } from 'react';
import { HiChevronUp } from 'react-icons/hi';

export default function BackToTop() {
    const [isScrolling, setIsScrolling] = useState(false)
    

    
    return (
        <div className={`fixed bottom-0 right-0 hidden p-4 ${isScrolling ? '': 'hidden'}`}>
            <button
                className="text-4xl transition-colors hover:text-blue-600"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <HiChevronUp className="inline-block" />
            </button>
        </div>  
    );
}

