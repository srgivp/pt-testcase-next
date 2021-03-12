import '../styles/globals.css';
import { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import Layout from '../components/Layout';
import '../components/components.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const theme = createMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout><Component {...pageProps} /></Layout>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
