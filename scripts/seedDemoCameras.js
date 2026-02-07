// Demo Data Seeder for CCTV Access Management Portal
// This script adds placeholder cameras with public footage for demo/hackathon purposes

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Public CCTV footage sources (all consensual, publicly available)
const demoCameras = [
    {
        name: "Mumbai Traffic Cam - Bandra",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 19.0596, lng: 72.8295 },
        status: "active",
        footageUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video
        description: "Public traffic monitoring camera at Bandra junction"
    },
    {
        name: "Station Road Cam - Mumbai Central",
        type: "PTZ",
        resolution: "4K",
        location: { lat: 18.9685, lng: 72.8205 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "360° monitoring of station entrance area"
    },
    {
        name: "Colaba Causeway Cam",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 18.9067, lng: 72.8147 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Tourist area monitoring camera"
    },
    {
        name: "Gateway of India Cam",
        type: "Outdoor",
        resolution: "4K",
        location: { lat: 18.9220, lng: 72.8347 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "High-traffic tourist spot monitoring"
    },
    {
        name: "Andheri Metro Station Cam",
        type: "Indoor",
        resolution: "1080p",
        location: { lat: 19.1136, lng: 72.8697 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        description: "Metro station interior monitoring"
    },
    {
        name: "Marine Drive Promenade",
        type: "PTZ",
        resolution: "1080p",
        location: { lat: 18.9432, lng: 72.8236 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        description: "Coastal promenade monitoring"
    }
];

async function seedDemoCameras() {
    console.log('🌱 Starting demo camera seeding...\n');
    
    try {
        // Use a demo owner ID (you can replace this with your actual user ID)
        const demoOwnerId = "demo-owner-hackathon";
        const demoOwnerName = "Demo Owner (Hackathon)";
        
        for (const camera of demoCameras) {
            const cameraData = {
                ...camera,
                ownerId: demoOwnerId,
                ownerName: demoOwnerName,
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString(),
                isDemo: true // Flag to identify demo cameras
            };
            
            const docRef = await addDoc(collection(db, 'cameras'), cameraData);
            console.log(`✅ Added: ${camera.name} (ID: ${docRef.id})`);
        }
        
        console.log(`\n🎉 Successfully seeded ${demoCameras.length} demo cameras!`);
        console.log('\n📝 Note: These cameras are marked with isDemo: true');
        console.log('💡 Demo Owner ID:', demoOwnerId);
        console.log('\nTo view these cameras, sign in as an owner or update the ownerId to your user ID.');
        
    } catch (error) {
        console.error('❌ Error seeding cameras:', error);
        process.exit(1);
    }
    
    process.exit(0);
}

// Run the seeder
seedDemoCameras();
