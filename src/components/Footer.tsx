import { Mail, Phone, Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="mt-20 border-t border-black bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-10 w-10 brightness-0" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase">Producto</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="https://www.override.com.mx/servicios" className="hover:text-black hover:underline">Servicios</a></li>
                            <li><a href="https://www.override.com.mx/productos" className="hover:text-black hover:underline">Productos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Empresa</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="https://www.override.com.mx/contacto" className="hover:text-black hover:underline">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Legal</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-600">
                            <li><a href="https://www.override.com.mx/avisos" className="hover:text-black hover:underline">Avisos</a></li>
                            <li><a href="https://www.override.com.mx/privacidad" className="hover:text-black hover:underline">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
                    <p className="font-mono text-xs text-gray-500">
                        © 2025 @Override fun Shop(). Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6 text-gray-400">
                        <a href="mailto:contacto@override.com.mx" className="hover:text-black transition-colors"><Mail className="h-6 w-6" /></a>
                        <a href="tel:+524522007824" className="hover:text-black transition-colors"><Phone className="h-6 w-6" /></a>
                        <a href="https://github.com/OverrideLLC" className="hover:text-black transition-colors"><Github className="h-6 w-6" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
