// routes
import Router from './routes/routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { UserContextProvider } from './modules/users/context';
import { getUser } from './utils/sessionManager';

const isLoggedIn = () => {
  const currentUser = getUser();
  console.log(currentUser)
  return currentUser != null;
}

// ----------------------------------------------------------------------

export default function App() {
  return (
    <UserContextProvider>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router isLoggedIn={isLoggedIn()} />
      </ThemeProvider>
    </UserContextProvider>
  );
}
