
import { UIProvider } from '@/context/ui';
import '@/styles/globals.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import type { AppProps } from 'next/app'
import { lightTheme, darkTheme } from '../themes';
import { EntriesProvider } from '@/context/entries';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={ 3 }>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={ darkTheme }>
            <CssBaseline /> 
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>   
    </SnackbarProvider>
  )
}
