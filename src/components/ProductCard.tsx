import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
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

    const isApparel = product.category === 'Ropa';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        addItem(product, isApparel ? selectedSize : undefined);
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group relative flex flex-col h-full border border-gray-200 dark:border-[#00ff00] bg-white dark:bg-black p-4 rounded-none transition-all duration-300 hover:shadow-lg dark:hover:shadow-none dark:hover:border-[#00ff00]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden border-b border-gray-200 dark:border-[#00ff00]">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className={clsx(
                        "absolute inset-0 h-full w-full object-cover transition-all duration-500",
                        isHovered && product.images[1] ? "opacity-0" : "opacity-100 scale-100"
                    )}
                />
                {product.images[1] && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className={clsx(
                            "absolute inset-0 h-full w-full object-cover transition-all duration-500",
                            isHovered ? "opacity-100 scale-105" : "opacity-0"
                        )}
                    />
                )}
                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
                        <span className="px-4 py-2 font-mono uppercase bg-red-600 text-white dark:bg-[#00ff00] dark:text-black">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-lg leading-tight break-words min-w-0 text-slate-900 dark:text-[#00ff00]">{product.name}</h3>
                    <span className="font-mono text-lg whitespace-nowrap text-slate-900 dark:text-[#00ff00]">${product.price}</span>
                </div>

                <p className="mb-4 text-sm text-slate-600 dark:text-[#00ff00]/80 font-mono flex-1 line-clamp-3 break-words">
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
                                        "h-8 w-8 text-xs font-mono transition-colors border",
                                        selectedSize === size
                                            ? "bg-slate-900 text-white border-slate-900 dark:bg-[#00ff00] dark:text-black dark:border-[#00ff00]"
                                            : "border-gray-300 text-slate-500 hover:border-slate-900 dark:border-[#00ff00]/50 dark:text-[#00ff00] dark:hover:border-[#00ff00]"
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
                            "w-full px-6 py-3 border border-slate-900 dark:border-[#00ff00] bg-slate-900 text-white dark:bg-black dark:text-[#00ff00] hover:bg-white hover:text-slate-900 dark:hover:bg-[#00ff00] dark:hover:text-black transition-colors duration-200 uppercase font-bold text-sm tracking-wider flex items-center justify-center gap-2 rounded-none",
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
