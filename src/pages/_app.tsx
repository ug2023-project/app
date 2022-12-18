import '@/styles/layers.css'

import { MantineProvider } from '@mantine/core'

import MainNavbar from '@/components/Navbars/MainNavbar'

type AppProps = {
  children: JSX.Element
}

const App = ({ children }: AppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="flex min-h-screen flex-col p-6">
        <MainNavbar />
        <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
      </div>
    </MantineProvider>
  )
}

export default App
