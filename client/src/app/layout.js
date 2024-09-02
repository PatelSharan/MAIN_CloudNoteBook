import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoginState from '@/contexts/login/loginstate.js'
import LoadingState from '@/contexts/loading/LoadingState'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CloudNoteBook - Save Your Notes On Cloud',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginState>
          <LoadingState>
            <Navbar />
            <div className='min-h-[98vh] fontRobotoCondensed'>
              {children}
            </div>
            <Footer />
          </LoadingState>
        </LoginState>
      </body>
    </html>
  )
}
