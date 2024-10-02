'use client'

import logo from '@/imagens/logo.webp'
import { Drawer, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi'
import { HiBars3BottomRight } from "react-icons/hi2";
import { useWindowScroll } from 'react-use';

const nav = [
    {
        name: 'Filmes',
        href: '/filmes',
    },
    {
        name: 'Generos',
        href: '/generos',
    },
    {
        name: 'Home',
        href: '/',
    },
    // {
    //     name: 'Login',
    //     href: '/login',
    // },
    // {
    //     name: 'Registro',
    //     href: '/register',
    // },
]

export default function Header({ small = false }) {
    const [open, setOpen] = useState(false);
    const { y } = useWindowScroll();

    return (
        <>
            <header className={`flex justify-between items-center fixed top-0 w-full z-10 transition-all duration-500 ${small || y > 3 ? 'h-16 px-5' : 'h-24 px-3'} bg-blue-50`}>
                <div className="w-24 h-full bg-center bg-cover">
                    <img src={logo.src} alt="Logotipo" className="object-contain w-full h-full" />
                </div>
                <nav className="hidden gap-4 tems-center md:flex">
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center w-48 py-1 pl-2 bg-white rounded-md pr-9 focus:ring-2">
                            <input 
                                type="text" 
                                placeholder="Pesquisar" 
                                className="flex-1 w-3 text-left bg-transparent focus:outline-none" 
                            />
                            <BiSearch className="absolute p-1 text-blue-500 transition-all -translate-y-1/2 rounded-md h-7 w-7 top-1/2 right-1 hover:bg-blue-100" />
                        </div>
                        {nav.map(({ name, href }) => (
                            <a key={name} href={href} className="text-lg font-bold text-blue-500 transition-colors hover:text-blue-600">
                                {name}
                            </a>
                        ))}
                    </div>
                </nav>
                <HiBars3BottomRight className="block text-3xl text-blue-500 transition-colors cursor-pointer md:hidden hover:text-blue-600" onClick={() => setOpen(true)}/>
            </header>
            {small && (<div className='h-16' />)} {/* Preça é um negocio triste*//*-faf acho que o seu portugês é mais triste ainda*/}
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                className="z-20"
                overlayClassName="z-20"
            >
                <Typography variant="h4" className="text-center">
                    Menu
                </Typography>
            </Drawer>        
        </>
    );
}
