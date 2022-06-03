// routes
import Router from './routes/routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { SnackbarProvider } from 'notistack';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { UserContextProvider } from './modules/users/context';


// ----------------------------------------------------------------------

export default function App() {
  return (
    <UserContextProvider>
      <SnackbarProvider 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
       maxSnack={3}>
        <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </ThemeProvider>
      </SnackbarProvider>
    </UserContextProvider>
  );
}
