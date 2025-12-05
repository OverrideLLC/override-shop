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
        // Clear all collections
        await clearCollection('products');
        await clearCollection('products_dark');
        await clearCollection('hero');
        await clearCollection('hero_dark');

        // Seed Products (Light)
        console.log('\n📦 Seeding Light Products...');
        for (const product of PRODUCTS) {
            console.log(`   Processing: ${product.name}`);
            const imageUrl = await uploadImage(product.image, `product_${product.id}`);

            const productData = {
                ...product,
                image: imageUrl,
                createdAt: new Date().toISOString()
            };

            // Use setDoc to keep IDs consistent if needed, or addDoc
            await addDoc(collection(db, 'products'), productData);
        }

        // Seed Products (Dark)
        console.log('\n📦 Seeding Dark Products...');
        for (const product of PRODUCTS) {
            console.log(`   Processing: [DARK] ${product.name}`);
            // Reuse image but maybe different public_id if we wanted different images, 
            // but here we just reuse the URL logic (it will re-upload or we could optimize, but re-upload ensures it exists)
            // Optimization: We already uploaded it for light. But to be safe/simple, we'll just re-upload or use the same URL if we stored it.
            // For simplicity, let's just re-upload/check.
            const imageUrl = await uploadImage(product.image, `product_${product.id}`);

            const darkProductData = {
                ...product,
                name: `[DARK] ${product.name}`,
                description: `[TERMINAL_MODE] ${product.description}`,
                price: Number((product.price * 1.2).toFixed(2)),
                image: imageUrl,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, 'products_dark'), darkProductData);
        }

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
