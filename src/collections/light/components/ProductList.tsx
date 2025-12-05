import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../../shared/hooks/useProducts';
import { ProductCard } from './ProductCard';
import type { Category } from '../../../shared/data/products';

export const ProductList = () => {
    const { products, loading, error } = useProducts();
    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-pulse text-xl font-medium text-slate-400">Cargando productos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-64 items-center justify-center text-red-500 font-medium">
                Error: {error}
            </div>
        );
    }

    // Group by category for a structured layout
    const allCategories: Category[] = ['Ropa', 'Accesorios', 'Mats'];
    const categories = selectedCategory
        ? allCategories.filter(c => c === selectedCategory)
        : allCategories;

    return (
        <div className="space-y-12 md:space-y-20 py-8 md:py-12">
            {categories.map(category => {
                const categoryProducts = products.filter(p => p.category === category);
                if (categoryProducts.length === 0) return null;

                return (
                    <section key={category} className="space-y-6 md:space-y-8">
                        <div className="flex items-center gap-4 md:gap-6">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{category}</h2>
                            <div className="h-px flex-1 bg-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
