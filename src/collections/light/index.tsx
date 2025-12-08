import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { Products } from './pages/Products';

export const LightCollection = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    <div className="flex flex-col gap-8 md:gap-12">
                        <div id="product-list" className="py-8 md:py-12">
                            <ProductList />
                        </div>
                    </div>
                } />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};
