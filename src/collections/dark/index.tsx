import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './pages/ProductDetails';

import { Products } from './pages/Products';

export const DarkCollection = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    <div id="product-list" className="py-12">
                        <ProductList />
                    </div>
                } />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};
