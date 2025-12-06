import { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative bg-black text-white px-4 py-2 text-center border-b border-white/10 z-50">
            <div className="container mx-auto flex items-center justify-center relative">
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest font-mono">
                    ENVIOS GRATIS A TODO MÉXICO.
                </p>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Cerrar anuncio"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};
