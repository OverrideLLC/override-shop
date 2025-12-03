import { v2 as cloudinary } from 'cloudinary';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { PRODUCTS } from '../src/data/products';
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

// Polyfill for fetch if needed (Node 18+ has fetch built-in)
// if (!global.fetch) { ... }

async function seed() {
    console.log('🚀 Starting seed process...');

    try {
        // 1. Clear existing products (Optional, be careful!)
        console.log('🧹 Clearing existing products...');
        const snapshot = await getDocs(collection(db, 'products'));
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        console.log(`Deleted ${deletePromises.length} existing products.`);

        // 2. Process each product
        for (const product of PRODUCTS) {
            console.log(`📦 Processing: ${product.name}`);

            // Upload image to Cloudinary
            let imageUrl = product.image;
            try {
                console.log(`   ⬆️ Uploading image to Cloudinary...`);
                const uploadResult = await cloudinary.uploader.upload(product.image, {
                    folder: 'override-shop',
                    public_id: product.id,
                    overwrite: true
                });
                imageUrl = uploadResult.secure_url;
                console.log(`   ✅ Image uploaded: ${imageUrl}`);
            } catch (imgError) {
                console.error(`   ❌ Image upload failed for ${product.name}, using original URL.`, imgError);
            }

            // Save to Firestore
            const productData = {
                ...product,
                image: imageUrl,
                createdAt: new Date().toISOString()
            };

            // Remove the 'id' field from the data as Firestore generates its own, 
            // OR use setDoc with the ID if we want to keep them. 
            // Here we'll let Firestore generate IDs or just store the ID field inside.
            // Actually, let's keep the ID field inside for reference, but Firestore ID will be different unless we use setDoc.
            // For simplicity, we'll just addDoc.

            await addDoc(collection(db, 'products'), productData);
            console.log(`   ✅ Saved to Firestore`);
        }

        console.log('✨ Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

seed();
