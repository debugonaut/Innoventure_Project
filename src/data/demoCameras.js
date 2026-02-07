// Demo Cameras Data - Public footage from legitimate sources
// All footage URLs are from Google's public sample video repository

export const demoCameras = [
    {
        name: "Mumbai Traffic Cam - Bandra",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 19.0596, lng: 72.8295 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "Public traffic monitoring camera"
    },
    {
        name: "Station Road Cam - Central",
        type: "PTZ",
        resolution: "4K",
        location: { lat: 18.9685, lng: 72.8205 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "360° station entrance monitoring"
    },
    {
        name: "Colaba Causeway Cam",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 18.9067, lng: 72.8147 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Tourist area monitoring"
    },
    {
        name: "Gateway of India Cam",
        type: "Outdoor",
        resolution: "4K",
        location: { lat: 18.9220, lng: 72.8347 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Tourist landmark monitoring"
    },
    {
        name: "Metro Station Cam - Andheri",
        type: "Indoor",
        resolution: "1080p",
        location: { lat: 19.1136, lng: 72.8697 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        description: "Metro station interior"
    },
    {
        name: "Marine Drive Promenade",
        type: "PTZ",
        resolution: "1080p",
        location: { lat: 18.9432, lng: 72.8236 },
        status: "active",
        footageUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        description: "Coastal promenade monitoring"
    }
];
