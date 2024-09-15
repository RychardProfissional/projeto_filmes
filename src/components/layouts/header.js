'use client'

import logo from '@/app/imagens/example.png'
import { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi'
import { useWindowScroll } from 'react-use';

export default function Header() {
    const { x, y } = useWindowScroll();
    
    return (
        
        <header className={`flex justify-between fixed top-0 w-full z-10 transition-all duration-500 ${y > 100 ? 'h-16 px-5' : 'h-24 px-3'} bg-blue-50`}>
            <div className="w-24 h-full bg-center bg-cover">
                <img src={logo.src} alt="Logotipo" className="object-contain w-full h-full" />
            </div>
            <nav className="flex items-center gap-4">
                <a href="/" className="text-lg font-bold text-blue-600 transition-colors hover:text-blue-800">
                    In cio
                </a>
                <a href="/filmes" className="text-lg text-gray-600 transition-colors hover:text-gray-800">
                    Filmes
                </a>
                <div className="relative flex items-center w-48 py-1 pl-2 bg-white rounded-md pr-9 focus:ring-2">
                    <input 
                        type="text" 
                        placeholder="Pesquisar" 
                        className="flex-1 w-3 text-left bg-transparent focus:outline-none" 
                    />
                    <BiSearch className="absolute p-1 text-blue-500 transition-all -translate-y-1/2 rounded-md h-7 w-7 top-1/2 right-1 hover:bg-blue-100" />
                </div>
                <a href="/login" className="text-lg text-blue-600 transition-colors hover:text-blue-800">
                    Login
                </a>
                <a href="/register" className="text-lg text-blue-600 transition-colors hover:text-blue-800">
                    Registro
                </a>
            </nav>
        </header>
    );
}

