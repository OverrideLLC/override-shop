import { Renderer } from '../components/renderer/Renderer';
import { getLayoutConfig } from '../lib/firestore';
import { ProductList } from '../components/ProductList';
import { Hero } from '../components/Hero';

export const revalidate = 600; // 10 minutes

export default async function Home() {
    const config = await getLayoutConfig();

    if (!config) {
        // Fallback if no config found (manual layout)
        return (
            <div id="home-fallback">
                <Hero />
                <div id="product-list" className="py-8 md:py-12">
                    <ProductList />
                </div>
            </div>
        );
    }

    return (
        <main>
            <Renderer sections={config.sections} />
        </main>
    );
}
