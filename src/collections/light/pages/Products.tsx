import { ProductList } from '../components/ProductList';

export const Products = () => {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Todos los Productos</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Explora nuestra colección completa de ropa, accesorios y equipamiento para desarrolladores.
                </p>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-8" />
            </div>
            <ProductList />
        </div>
    );
};
