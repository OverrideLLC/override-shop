import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useProduct } from '../../../shared/hooks/useProduct';
import { useCart } from '../../../shared/context/CartContext';
import { useState } from 'react';
import { clsx } from 'clsx';

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];

export const ProductDetails = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('L');
    const [selectedImage, setSelectedImage] = useState<string>('');

    // Initialize selectedImage when product loads
    if (product && !selectedImage && product.images.length > 0) {
        setSelectedImage(product.images[0]);
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-pulse font-mono text-xl">CARGANDO_DATOS...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
                <div className="font-mono text-red-600">ERROR: {error || 'Product not found'}</div>
                <div className="mb-8">
                    <Link to="/dark" className="inline-flex items-center gap-2 text-[#00ff00] hover:underline decoration-1 underline-offset-4 font-mono text-sm uppercase">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver al catalogo</span>
                    </Link>
                </div>
            </div>
        );
    }

    const isApparel = product.category === 'Ropa';

    return (
        <div className="py-12">
            <Link to="/dark" className="mb-8 inline-flex items-center gap-2 font-mono text-sm hover:underline text-[#00ff00]">
                <ArrowLeft className="h-4 w-4" />
                VOLVER_AL_CATALOGO
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square w-full overflow-hidden border border-[#00ff00]">
                        <img
                            src={selectedImage || product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={clsx(
                                    "aspect-square overflow-hidden border transition-all",
                                    selectedImage === img ? "border-[#00ff00] opacity-100" : "border-[#00ff00]/30 opacity-50 hover:opacity-100 hover:border-[#00ff00]"
                                )}
                            >
                                <img src={img} alt={`${product.name} view ${idx + 1}`} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <div className="mb-2 inline-block w-fit border border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                        {product.category}
                    </div>
                    <h1 className="mb-4 text-4xl font-black uppercase tracking-tighter md:text-6xl">
                        {product.name}
                    </h1>
                    <p className="mb-8 font-mono text-2xl font-bold">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mb-6 border-t border-b border-black py-6">
                        <p className="font-mono text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {isApparel && (
                            <div className="space-y-2">
                                <label className="font-mono text-sm font-bold uppercase">Seleccionar Talla:</label>
                                <div className="flex gap-3">
                                    {SIZES.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={clsx(
                                                "h-12 w-12 border text-sm font-mono transition-all",
                                                selectedSize === size
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-black border-black hover:bg-gray-100"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => addItem(product, isApparel ? selectedSize : undefined)}
                            disabled={!product.inStock}
                            className={clsx(
                                "w-full py-4 border font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-lg",
                                "bg-black text-white border-black hover:bg-white hover:text-black",
                                !product.inStock && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            <span>Agregar al Carrito</span>
                            <Plus className="h-5 w-5" />
                        </button>

                        {!product.inStock && (
                            <p className="text-center font-mono text-sm text-red-600">
                // EXCEPCION_AGOTADO
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
