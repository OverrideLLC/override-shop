import { v2 as cloudinary } from 'cloudinary';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { PRODUCTS } from '../src/shared/data/products';
import * as dotenv from 'dotenv';

dotenv.config();

// Cloudinary Config
cloudinary.config({
    cloud_name: 'dbvyawggp',
    api_key: '944847686314542',
    api_secret: '9T8hScozIc5zVOFJNMiDGUxjdGM',
    secure: true
});

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAiHI761iwpNC--PPpViCfM3hLayo_HfKc",
    authDomain: "override-shops.firebaseapp.com",
    projectId: "override-shops",
    storageBucket: "override-shops.firebasestorage.app",
    messagingSenderId: "960396045126",
    appId: "1:960396045126:web:2ea11a43a8133268481347",
    measurementId: "G-T61ETT4EYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const HERO_LIGHT = {
    title: "Summer Collection 2025",
    subtitle: "Discover the new wave of minimalist fashion. Designed for the modern creator.",
    ctaText: "Ver Productos",
    ctaLink: "/light/products",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
};

const HERO_DARK = {
    title: "SYSTEM_OVERRIDE_INIT",
    subtitle: "> ACCESSING_SECURE_VAULT... [SUCCESS] > DEPLOYING_TACTICAL_GEAR...",
    ctaText: "EXECUTE_ORDER_66",
    ctaLink: "/dark/products",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
};

async function clearCollection(collectionName: string) {
    console.log(`🧹 Clearing ${collectionName}...`);
    const snapshot = await getDocs(collection(db, collectionName));
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log(`   Deleted ${deletePromises.length} documents from ${collectionName}.`);
}

async function uploadImage(url: string, publicId: string) {
    try {
        const uploadResult = await cloudinary.uploader.upload(url, {
            folder: 'override-shop',
            public_id: publicId,
            overwrite: true
        });
        return uploadResult.secure_url;
    } catch (error) {
        console.error(`   ❌ Image upload failed for ${publicId}, using original URL.`, error);
        return url;
    }
}

async function seed() {
    console.log('🚀 Starting seed process...');

    try {
        // Clear collections
        await clearCollection('collections');
        // We might want to clear 'products' too if we are abandoning it, but let's leave it alone or clear it to avoid confusion
        await clearCollection('products');
        await clearCollection('products_dark');
        await clearCollection('hero');
        await clearCollection('hero_dark');
        await clearCollection('categories');

        // Extract and Seed Categories
        console.log('\n📂 Seeding Categories...');
        const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
        for (const category of categories) {
            console.log(`   Processing Category: ${category}`);
            await addDoc(collection(db, 'categories'), {
                name: category,
                createdAt: new Date().toISOString()
            });
        }

        // Helper to seed a collection (Light/Dark)
        const seedCollection = async (name: string, products: typeof PRODUCTS, isDark: boolean = false) => {
            console.log(`\n📦 Seeding ${name} Collection...`);

            // Create the main collection document first
            const collectionRef = await addDoc(collection(db, 'collections'), {
                name: name,
                productIds: [], // Will update later
                timeStamp: Math.floor(Date.now() / 1000).toString()
            });

            const productIds: string[] = [];
            const itemsRef = collection(db, 'collections', collectionRef.id, 'items');

            for (const product of products) {
                console.log(`   Processing: ${isDark ? '[DARK] ' : ''}${product.name}`);

                // Upload images
                const imageUrls = [];
                for (let i = 0; i < product.images.length; i++) {
                    const url = await uploadImage(product.images[i], `product_${product.id}_${i}${isDark ? '_dark' : ''}`);
                    imageUrls.push(url);
                }

                const productData = {
                    ...product,
                    name: isDark ? `[DARK] ${product.name}` : product.name,
                    description: isDark ? `[TERMINAL_MODE] ${product.description}` : product.description,
                    price: isDark ? Number((product.price * 1.2).toFixed(2)) : product.price,
                    images: imageUrls,
                    image: imageUrls[0], // Legacy support
                    createdAt: new Date().toISOString()
                };

                // Add to 'items' subcollection
                // We use addDoc to let Firestore generate the ID, or setDoc with product.id if we want consistent IDs
                // Screenshot shows generated-looking IDs like "RPp..." which are 20 chars, likely auto-generated or specific
                // Let's use addDoc for now as it's standard
                const productDoc = await addDoc(itemsRef, productData);

                // Update the product doc with its own ID if needed, but Firestore has it in metadata
                // Screenshot shows 'id' field inside the doc matching the doc ID? 
                // "id: RPp..." and Doc ID seems to be "RPp..." (from the header breadcrumb)
                // To achieve this, we can setDoc with a custom ID or update the doc after creation.
                // Let's generic addDoc and then update the 'id' field to match.
                await setDoc(productDoc, { ...productData, id: productDoc.id }); // Ensure ID is in the data

                productIds.push(productDoc.id);
            }

            // Update parent collection doc with product IDs
            await setDoc(collectionRef, { productIds }, { merge: true });
        };

        // Seed Light Collection
        await seedCollection('Light', PRODUCTS, false);

        // Seed Dark Collection
        await seedCollection('Dark', PRODUCTS, true);

        // Seed Hero (Light)
        console.log('\n🦸 Seeding Light Hero...');
        const heroLightImage = await uploadImage(HERO_LIGHT.imageUrl, 'hero_light');
        await addDoc(collection(db, 'hero'), { ...HERO_LIGHT, imageUrl: heroLightImage });

        // Seed Hero (Dark)
        console.log('\n🦹 Seeding Dark Hero...');
        const heroDarkImage = await uploadImage(HERO_DARK.imageUrl, 'hero_dark');
        await addDoc(collection(db, 'hero_dark'), { ...HERO_DARK, imageUrl: heroDarkImage });

        console.log('\n✨ Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
