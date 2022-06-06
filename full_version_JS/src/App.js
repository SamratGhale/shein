// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
// components
import useUsers from './hooks/useUsers';
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';

// ----------------------------------------------------------------------

export default function App() {
  const { refresh } = useUsers();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <GlobalStyles />
              <ProgressBarStyle />
              <BaseOptionChartStyle />
              <Settings />
              <ScrollToTop />
              <GoogleAnalytics />
              {!refresh ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
