import { Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="border-t border-gray-100 bg-gray-50 text-gray-600">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <img src="https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/logos/Overridelogo.svg" alt="Override Logo" className="h-8 w-8" />
                            <span className="font-bold tracking-tight text-gray-900">@Override</span>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="mb-4 font-bold uppercase">Producto</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm hover:text-black transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm hover:text-black transition-colors">
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Empresa</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="https://www.override.com.mx/contacto" className="hover:text-black hover:underline dark:hover:text-white">Contacto</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-bold uppercase">Legal</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-600 dark:text-gray-400">
                            <li><a href="https://www.override.com.mx/avisos" className="hover:text-black hover:underline dark:hover:text-white">Avisos</a></li>
                            <li><a href="https://www.override.com.mx/privacidad" className="hover:text-black hover:underline dark:hover:text-white">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8">
                    <p className="text-xs text-gray-500">
                        © 2024 Override Shop. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Github className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
                        {/* Assuming Twitter and Instagram icons are available or need to be imported */}
                        {/* <Twitter className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" /> */}
                        {/* <Instagram className="h-5 w-5 text-gray-400 hover:text-black cursor-pointer transition-colors" /> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
