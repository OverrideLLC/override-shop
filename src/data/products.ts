export type Category = string;

export interface Product {
    id: string;
    name: string;
    price: number;
    category: Category;
    images: string[];
    description: string;
    inStock: boolean;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'OVERRIDE_HOODIE_V1',
        price: 65.00,
        category: 'Ropa',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Algodón pesado. Corte oversize. Resistente a excepciones de puntero nulo.',
        inStock: true,
    },
    {
        id: '2',
        name: 'KERNEL_PANIC_TEE',
        price: 35.00,
        category: 'Ropa',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000'
        ],
        description: '100% Algodón. Pre-encogido. Para cuando todo lo demás falla.',
        inStock: true,
    },
    {
        id: '3',
        name: 'MECHANICAL_KEYCAP_SET',
        price: 45.00,
        category: 'Accesorios',
        images: [
            'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'PBT Double-shot. Perfil Cherry. Click clack.',
        inStock: true,
    },
    {
        id: '4',
        name: 'DESK_MAT_DARK_MODE',
        price: 25.00,
        category: 'Mats',
        images: [
            'https://images.unsplash.com/photo-1629905678351-166d4ce0588e?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1629905678351-166d4ce0588e?auto=format&fit=crop&q=80&w=1000'
        ],
        description: '900x400mm. Impermeable. Optimizado para sensores ópticos.',
        inStock: true,
    },
    {
        id: '5',
        name: 'DEBUGGING_DUCK',
        price: 12.00,
        category: 'Accesorios',
        images: [
            'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'El mejor oyente que tendrás. Nunca juzga tu código.',
        inStock: true,
    },
    {
        id: '6',
        name: 'VOID_CAP',
        price: 28.00,
        category: 'Accesorios',
        images: [
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Logo bordado. Correa ajustable. Modo headless.',
        inStock: false,
    },
    {
        id: '7',
        name: 'REACT_HOOK_TEE',
        price: 32.00,
        category: 'Ropa',
        images: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'No rompas las reglas de los hooks. 100% Algodón.',
        inStock: true,
    },
    {
        id: '8',
        name: 'TYPESCRIPT_MUG',
        price: 18.00,
        category: 'Accesorios',
        images: [
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Tipado fuerte para tu café fuerte. Cerámica.',
        inStock: true,
    },
    {
        id: '9',
        name: 'MINIMALIST_MAT_V2',
        price: 30.00,
        category: 'Mats',
        images: [
            'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Superficie de control. Base de goma antideslizante.',
        inStock: true,
    },
    {
        id: '10',
        name: 'GIT_CHEAT_SHEET_MOUSEPAD',
        price: 22.00,
        category: 'Mats',
        images: [
            'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Nunca olvides cómo salir de vim. Tamaño XL.',
        inStock: true,
    },
    {
        id: '11',
        name: 'DOCKER_CONTAINER_BOTTLE',
        price: 25.00,
        category: 'Accesorios',
        images: [
            'https://images.unsplash.com/photo-1602143407151-01114192003b?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1602143407151-01114192003b?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Aislada al vacío. Mantiene tus bebidas calientes o frías.',
        inStock: true,
    },
    {
        id: '12',
        name: 'KUBERNETES_HOODIE',
        price: 70.00,
        category: 'Ropa',
        images: [
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000',
            'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000'
        ],
        description: 'Orquesta tu estilo. Cómoda y escalable.',
        inStock: true,
    }
];
