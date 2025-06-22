'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react'

const navigation = [
  { name: 'Niñas', href: '/categorias/ninas' },
  { name: 'Niños', href: '/categorias/ninos' },
  { name: 'Bebés', href: '/categorias/bebes' },
  { name: 'Novedades', href: '/novedades' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="relative bg-white z-20">
      <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <span className="sr-only">Jenny Kids</span>
                <h1 className="text-2xl font-bold text-gray-900">Jenny<span className="text-pink-500">Kids</span></h1>
              </Link>
            </div>

            {/* Flyout menus */}
            <div className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="ml-auto flex items-center">
              {/* Search */}
              <div className="flex lg:ml-6">
                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Buscar</span>
                  <Search className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              {/* Account */}
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 <Link href="/login" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Cuenta</span>
                  <User className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link href="/carrito" className="group -m-2 flex items-center p-2">
                  <ShoppingBag
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 z-40 flex">
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                    Iniciar sesión
                  </Link>
                </div>
                <div className="flow-root">
                  <Link href="/crear-cuenta" className="-m-2 block p-2 font-medium text-gray-900">
                    Crear cuenta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 