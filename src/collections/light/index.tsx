import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { FeaturedCategories } from './components/FeaturedCategories';
import { TrustIndicators } from './components/TrustIndicators';
import { Products } from './pages/Products';

export const LightCollection = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={
                    <div className="flex flex-col gap-8 md:gap-12">
                        <FeaturedCategories />
                        <div id="product-list" className="py-8 md:py-12">
                            <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Nuevos Productos</h2>
                                <div className="w-16 md:w-24 h-1 bg-accent mx-auto rounded-full" />
                            </div>
                            <ProductList />
                        </div>
                        <TrustIndicators />
                    </div>
                } />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
        </Layout>
    );
};
