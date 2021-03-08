import '../styles/globals.css';
import {FC} from 'react';
import {AppProps} from 'next/app';
import {wrapper} from "../redux/store";
import Layout from "../components/Layout";
import '../components/components.css';


const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    return <Layout><Component {...pageProps} /></Layout>
}

export default wrapper.withRedux(WrappedApp);
