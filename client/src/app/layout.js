import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CloudNoteBook - Save Your Notes On Cloud',
  description: 'Save Your Notes On Cloud',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className='min-h-[98vh]'>
          {children}
        </div>
        <Footer />
      </body>
    </html >
  )
}
