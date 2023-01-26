import { ThemeProvider } from 'styled-components'
import { DefaultTheme } from './styles/themes/Default'
import { GlobalStyles } from './styles/themes/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyles />
      
    </ThemeProvider>
  )
}
