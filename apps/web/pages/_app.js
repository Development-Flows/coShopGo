import Layout from '../components/layout'
import { Roboto } from '@next/font/google'
import 'swiper/css';
import "../styles/global.css"

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
})

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout className={roboto.className}>
      <Component {...pageProps} />
    </Layout>
      )
}