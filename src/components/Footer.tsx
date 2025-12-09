import { Github, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-gray-200 dark:border-[#00ff00] bg-white dark:bg-black text-slate-900 dark:text-[#00ff00] transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-6 w-6 dark:brightness-0 dark:invert dark:sepia dark:saturate-[5000%] dark:hue-rotate-[80deg]" />
                            <span className="font-bold tracking-tighter">@Override</span>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase">Producto</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <li><a href="https://www.override.com.mx/servicios" className="hover:underline decoration-1 underline-offset-4 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/70 dark:hover:text-[#00ff00]">Servicios</a></li>
                            <li><a href="https://www.override.com.mx/productos" className="hover:underline decoration-1 underline-offset-4 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/70 dark:hover:text-[#00ff00]">Productos</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Empresa</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <li><a href="https://www.override.com.mx/contacto" className="hover:underline decoration-1 underline-offset-4 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/70 dark:hover:text-[#00ff00]">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Legal</h3>
                        <ul className="space-y-2 font-mono text-sm">
                            <li><a href="https://www.override.com.mx/avisos" className="hover:underline decoration-1 underline-offset-4 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/70 dark:hover:text-[#00ff00]">Avisos</a></li>
                            <li><a href="https://www.override.com.mx/privacidad" className="hover:underline decoration-1 underline-offset-4 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/70 dark:hover:text-[#00ff00]">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 dark:border-[#00ff00] pt-8 gap-4 md:gap-0">
                    <p className="font-mono text-xs text-slate-500 dark:text-[#00ff00]/50">
                        © 2024 Override Shop. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://github.com/OverrideLLC" target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/50 dark:hover:text-[#00ff00] cursor-pointer" /></a>
                        <a href="https://twitter.com/OverrideLLC" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/50 dark:hover:text-[#00ff00] cursor-pointer" /></a>
                        <a href="https://instagram.com/OverrideLLC" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-[#00ff00]/50 dark:hover:text-[#00ff00] cursor-pointer" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
