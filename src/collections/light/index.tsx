import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { Hero } from './components/Hero';
import { ProductDetails } from './pages/ProductDetails';

export const LightCollection = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    <>
                        <Hero />
                        <div id="product-list" className="py-12">
                            <ProductList />
                        </div>
                    </>
                } />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};
