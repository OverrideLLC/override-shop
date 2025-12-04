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
            className="group relative border border-black bg-white transition-colors duration-200 hover:bg-black hover:text-white flex flex-col h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden border-b border-black">
                <img
                    src={product.image}
                    alt={product.name}
                    className={clsx(
                        "h-full w-full object-cover transition-all duration-500",
                        isHovered ? "scale-105 grayscale-0" : "grayscale"
                    )}
                />
                {!product.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <span className="border border-white bg-black px-4 py-2 font-mono text-white uppercase">
                            Agotado
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight">{product.name}</h3>
                    <span className="font-mono text-lg">${product.price}</span>
                </div>

                <p className={clsx(
                    "mb-4 text-sm font-mono flex-1",
                    isHovered ? "text-gray-300" : "text-gray-600"
                )}>
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
                                        "h-8 w-8 border text-xs font-mono transition-colors",
                                        selectedSize === size
                                            ? (isHovered ? "bg-white text-black border-white" : "bg-black text-white border-black")
                                            : "border-current hover:opacity-70"
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
                            "w-full py-3 border font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors",
                            isHovered
                                ? "bg-white text-black border-white hover:bg-gray-200"
                                : "bg-black text-white border-black hover:bg-gray-800",
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
