import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../../../shared/data/products';
import { useCart } from '../../../shared/context/CartContext';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
}

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('L');
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const isApparel = product.category === 'Ropa';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        addItem(product, isApparel ? selectedSize : undefined);
    };

    return (
        <Link
            to={`/light/product/${product.id}`}
            className="group relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-accent/30"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-4">
                {!imageError ? (
                    <>
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            onError={() => setImageError(true)}
                            className={clsx(
                                "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                                isHovered && product.images[1] ? "opacity-0" : "opacity-100 scale-100"
                            )}
                        />
                        {product.images[1] && (
                            <img
                                src={product.images[1]}
                                alt={product.name}
                                className={clsx(
                                    "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                                    isHovered ? "opacity-100 scale-110" : "opacity-0"
                                )}
                            />
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-sm font-medium">No Image</span>
                    </div>
                )}

                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                        <span className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-500 rounded-full">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
                <div className="mb-2 flex items-start justify-between gap-4">
                    <h3 className="font-bold text-lg leading-tight text-slate-900 group-hover:text-accent transition-colors">{product.name}</h3>
                    <span className="text-lg font-bold text-slate-900">${product.price}</span>
                </div>

                <p className="mb-6 text-sm text-slate-500 leading-relaxed flex-1 line-clamp-2">
                    {product.description}
                </p>

                {/* Controls */}
                <div className="space-y-3 mt-auto" onClick={(e) => e.preventDefault()}>
                    {isApparel && (
                        <div className="flex gap-2">
                            {SIZES.map(size => (
                                <button
                                    key={size}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedSize(size);
                                    }}
                                    className={clsx(
                                        "h-8 w-8 text-xs font-medium transition-all rounded-full flex items-center justify-center",
                                        selectedSize === size
                                            ? "bg-accent text-white shadow-md scale-110"
                                            : "bg-gray-100 text-slate-600 hover:bg-gray-200"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={clsx(
                            "w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95",
                            !product.inStock && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <span>Agregar al Carrito</span>
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
};
