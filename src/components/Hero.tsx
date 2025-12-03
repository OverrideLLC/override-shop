import { ArrowRight } from 'lucide-react';

export const Hero = () => {
    const scrollToProducts = () => {
        const productList = document.getElementById('product-list');
        if (productList) {
            productList.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative border-b border-black">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="flex flex-col justify-center border-b border-black p-8 lg:border-b-0 lg:border-r lg:p-16">
                    <div className="mb-6 inline-block w-fit border border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
                        New Collection 2025
                    </div>
                    <h1 className="mb-6 text-6xl font-black uppercase leading-none tracking-tighter md:text-8xl">
                        System<br />Override
                    </h1>
                    <p className="mb-8 max-w-md font-mono text-lg text-gray-600">
                        Minimalist apparel designed for the modern developer.
                        Compile your wardrobe with our latest drop.
                    </p>
                    <button
                        onClick={scrollToProducts}
                        className="group flex w-fit items-center gap-3 border border-black bg-black px-8 py-4 text-white transition-all hover:bg-white hover:text-black"
                    >
                        <span className="font-bold uppercase tracking-widest">Shop Collection</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>

                {/* Right Image */}
                <div className="relative aspect-square lg:aspect-auto lg:h-full">
                    <img
                        src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000"
                        alt="Featured Product"
                        className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                    />
                    <div className="absolute bottom-0 left-0 border-t border-r border-black bg-white px-4 py-2 font-mono text-xs font-bold">
                        FEATURED: OVERRIDE_HOODIE_V1
                    </div>
                </div>
            </div>

            {/* Marquee Strip */}
            <div className="overflow-hidden border-t border-black bg-black py-3 text-white">
                <div className="flex animate-marquee whitespace-nowrap font-mono text-sm font-bold uppercase tracking-widest">
                    <span className="mx-4">/// WEAR_THE_CODE</span>
                    <span className="mx-4">/// GIT_PUSH_FORCE</span>
                    <span className="mx-4">/// NO_BUGS_ONLY_FEATURES</span>
                    <span className="mx-4">/// SUDO_MAKE_ME_A_SANDWICH</span>
                    <span className="mx-4">/// WEAR_THE_CODE</span>
                    <span className="mx-4">/// GIT_PUSH_FORCE</span>
                    <span className="mx-4">/// NO_BUGS_ONLY_FEATURES</span>
                    <span className="mx-4">/// SUDO_MAKE_ME_A_SANDWICH</span>
                </div>
            </div>
        </div>
    );
};
