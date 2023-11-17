import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const activeRoute = router.pathname
  const activeRouteClass = 'rounded-t-md px-4 py-2 bg-gray-300 dark:bg-slate-700 cursor-pointer shadow-md z-10'
  const inactiveRouteClass = 'rounded-t-md px-4 py-2 bg-gray-200 dark:bg-slate-800 cursor-pointer'
  const getRouteClass = (route: string) => {
    return activeRoute === route ? activeRouteClass : inactiveRouteClass
  }
  return <>
    <div className='flex min-h-screen flex-col'>
      <header className='flex items-center px-4 md:px-24 pt-4'>
        <div className={getRouteClass('/')} onClick={() => {
          router.push('/')
        }}>
          User Search
        </div>
        <div className={getRouteClass('/create')} onClick={() => {
          router.push('/create')
        }}>
          User Creation
        </div>
        <div className='flex-1'></div>
        <button className='px-4 py-2 bg-stone-900 text-white dark:bg-stone-800 rounded-t-md' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
      </header>
      <main className={`z-20 bg-white dark:bg-slate-950 flex min-h-screen flex-col items-center p-2 gap-2 mx-4 md:mx-24 mb-4 border border-gray-200 dark:border-slate-700 ${inter.className}`} >
        {children}
      </main>
    </div>
  </>
}
