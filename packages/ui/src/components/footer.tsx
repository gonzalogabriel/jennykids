import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'

const footerNavigation = {
  shop: [
    { name: 'Niñas', href: '#' },
    { name: 'Niños', href: '#' },
    { name: 'Bebés', href: '#' },
    { name: 'Novedades', href: '#' },
  ],
  company: [
    { name: 'Quiénes somos', href: '#' },
    { name: 'Términos y condiciones', href: '#' },
    { name: 'Política de privacidad', href: '#' },
  ],
  account: [
    { name: 'Mi cuenta', href: '/login' },
    { name: 'Seguimiento de pedido', href: '#' },
    { name: 'Devoluciones', href: '#' },
  ],
  connect: [
    { name: 'Contáctanos', href: '#' },
    { name: 'Preguntas frecuentes', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white border-t border-gray-200">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Comprar</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.shop.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Empresa</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Mi Cuenta</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.account.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Conectar</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.connect.map((item) => (
                    <li key={item.name} className="text-sm">
                      <a href={item.href} className="text-gray-500 hover:text-gray-600">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 md:mt-16 xl:mt-0">
            <h3 className="text-sm font-medium text-gray-900">Suscríbete a nuestro boletín</h3>
            <p className="mt-6 text-sm text-gray-500">Recibe las últimas novedades, ofertas y más, directamente en tu correo.</p>
            <form className="mt-2 flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                type="text"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <div className="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 text-center">&copy; {new Date().getFullYear()} Jenny Kids. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 