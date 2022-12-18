import '@/styles/layers.css'

import MainNavbar from '@/components/Navbars/MainNavbar'

type AppProps = {
  children: JSX.Element
}

const App = ({ children }: AppProps) => {
  return (
    <div className="flex min-h-screen flex-col p-6">
      <MainNavbar />
      <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
    </div>
  )
}

export default App
