import { useProducts } from '../../../shared/hooks/useProducts';
import { ProductCard } from './ProductCard';
import type { Category } from '../../../shared/data/products';

export const ProductList = () => {
    const { products, loading, error } = useProducts();

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-pulse font-mono text-xl">CARGANDO_RECURSOS...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-red-600 font-mono">
                ERROR: {error}
            </div>
        );
    }

    // Group by category for a structured layout
    const categories: Category[] = ['Ropa', 'Accesorios', 'Mats'];

    return (
        <div className="space-y-16 py-12">
            {categories.map(category => {
                const categoryProducts = products.filter(p => p.category === category);
                if (categoryProducts.length === 0) return null;

                return (
                    <section key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold uppercase tracking-widest">{category}</h2>
                            <div className="h-px flex-1 bg-black"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {categoryProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
};
