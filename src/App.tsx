import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CollectionProvider } from './context/CollectionContext';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { AnnouncementBar } from './components/AnnouncementBar';

function App() {
  return (
    <CartProvider>
      <CollectionProvider>
        <AnnouncementBar />
        <Layout>
          <Routes>
            <Route path="/" element={
              <div id="product-list" className="py-8 md:py-12">
                <ProductList />
              </div>
            } />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Layout>
      </CollectionProvider>
    </CartProvider>
  );
}

export default App;
