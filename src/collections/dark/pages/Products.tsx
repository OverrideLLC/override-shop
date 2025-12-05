import { ProductList } from '../components/ProductList';

export const Products = () => {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl font-bold text-[#00ff00] mb-4 font-mono uppercase tracking-widest">Todos los Productos</h1>
                <p className="text-gray-400 max-w-2xl mx-auto font-mono">
                    // ACCESO_CONCEDIDO: CATALOGO_COMPLETO
                </p>
                <div className="w-24 h-1 bg-[#00ff00] mx-auto mt-8" />
            </div>
            <ProductList />
        </div>
    );
};
