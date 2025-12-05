import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 'ropa',
        name: 'Ropa',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
        count: '12 Productos'
    },
    {
        id: 'accesorios',
        name: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1523293188086-b51292955c99?auto=format&fit=crop&q=80&w=800',
        count: '8 Productos'
    },
    {
        id: 'mats',
        name: 'Mats',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a9?auto=format&fit=crop&q=80&w=800',
        count: '5 Productos'
    }
];

export const FeaturedCategories = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Compra por Categoría</h2>
                        <p className="text-slate-500">Explora nuestras colecciones</p>
                    </div>
                    <Link to="/light/products" className="hidden md:flex items-center gap-2 text-accent font-bold hover:text-accent-dark transition-colors">
                        Ver todos los productos <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/light/products?category=${category.name}`}
                            className="group relative h-80 overflow-hidden rounded-3xl cursor-pointer"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <h3 className="text-3xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300 drop-shadow-lg">
                                    {category.name}
                                </h3>
                                <p className="text-white/90 text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 delay-75 drop-shadow-md">
                                    {category.count}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
