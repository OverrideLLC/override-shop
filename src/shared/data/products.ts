export type Category = 'Ropa' | 'Accesorios' | 'Mats';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: Category;
    image: string;
    description: string;
    inStock: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'OVERRIDE_HOODIE_V1',
        price: 65.00,
        category: 'Ropa',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000',
        description: 'Algodón pesado. Corte oversize. Resistente a excepciones de puntero nulo.',
        inStock: true,
    },
    {
        id: '2',
        name: 'KERNEL_PANIC_TEE',
        price: 35.00,
        category: 'Ropa',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
        description: '100% Algodón. Pre-encogido. Para cuando todo lo demás falla.',
        inStock: true,
    },
    {
        id: '3',
        name: 'MECHANICAL_KEYCAP_SET',
        price: 45.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
        description: 'PBT Double-shot. Perfil Cherry. Click clack.',
        inStock: true,
    },
    {
        id: '4',
        name: 'DESK_MAT_DARK_MODE',
        price: 25.00,
        category: 'Mats',
        image: 'https://images.unsplash.com/photo-1629905678351-166d4ce0588e?auto=format&fit=crop&q=80&w=1000',
        description: '900x400mm. Impermeable. Optimizado para sensores ópticos.',
        inStock: true,
    },
    {
        id: '5',
        name: 'DEBUGGING_DUCK',
        price: 12.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&q=80&w=1000',
        description: 'El mejor oyente que tendrás. Nunca juzga tu código.',
        inStock: true,
    },
    {
        id: '6',
        name: 'VOID_CAP',
        price: 28.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
        description: 'Logo bordado. Correa ajustable. Modo headless.',
        inStock: false,
    }
];
