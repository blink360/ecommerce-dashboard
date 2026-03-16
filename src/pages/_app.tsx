import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Header from 'src/components/common/Header';
import { CartProvider } from 'src/contexts/CartContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  );
}