import './globals.css'
import { Inter } from 'next/font/google'
import { SupabaseProvider } from '@/lib/providers/supabase-provider'
import { Header, Footer } from '@jennykids/ui'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Jenny Kids - Ropa para niños y niñas',
  description: 'La mejor tienda de ropa infantil en Colombia. Calidad y estilo para los más pequeños.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans bg-gray-50 text-gray-800`}>
        <SupabaseProvider>
          <Header />
          {children}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  )
}
