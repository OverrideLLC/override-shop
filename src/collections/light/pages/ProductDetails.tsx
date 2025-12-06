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
                    <Link to="/light" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors font-medium text-sm">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Catalog</span>
                    </Link>
                </div>
            </div>
        );
    }

    const isApparel = product.category === 'Ropa';

    return (
        <div className="py-12">
            <Link to="/light" className="mb-8 inline-flex items-center gap-2 font-medium text-slate-600 hover:text-accent transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Volver al Catálogo
            </Link>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
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
                                    "aspect-square overflow-hidden rounded-xl border-2 transition-all",
                                    selectedImage === img ? "border-accent opacity-100" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img src={img} alt={`${product.name} view ${idx + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col pt-4">
                    <div className="mb-4 inline-block w-fit px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent bg-accent-light rounded-full">
                        {product.category}
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        {product.name}
                    </h1>
                    <p className="mb-8 text-3xl font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mb-6 py-6 border-t border-b border-gray-100">
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {isApparel && (
                            <div className="space-y-4">
                                <label className="text-sm font-bold uppercase tracking-wide text-slate-900">Seleccionar Talla</label>
                                <div className="flex gap-3">
                                    {SIZES.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={clsx(
                                                "h-12 w-12 text-sm font-medium transition-all rounded-xl flex items-center justify-center",
                                                selectedSize === size
                                                    ? "bg-slate-900 text-white shadow-lg scale-110"
                                                    : "bg-gray-100 text-slate-600 hover:bg-gray-200"
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
                                "w-full py-5 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-lg rounded-2xl shadow-xl",
                                "bg-accent text-white hover:bg-accent-dark hover:shadow-accent/30 transform active:scale-95",
                                !product.inStock && "opacity-50 cursor-not-allowed bg-gray-300 shadow-none"
                            )}
                        >
                            <span>Agregar al Carrito</span>
                            <Plus className="h-5 w-5" />
                        </button>

                        {!product.inStock && (
                            <p className="text-center text-sm text-red-500 font-medium bg-red-50 py-2 rounded-lg">
                                Actualmente Agotado
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
