// Demo Cameras Data - Real public CCTV/surveillance camera feeds
// Sources: YouTube public live streams, public traffic cams, etc.

export const demoCameras = [
    {
        name: "Times Square Live Cam",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 40.7580, lng: -73.9855 },
        status: "active",
        // YouTube embed of Times Square live stream (EarthCam)
        footageUrl: "https://www.youtube.com/embed/AdUw5RdyZxI?autoplay=1&mute=1",
        streamType: "youtube",
        description: "24/7 live feed from Times Square, NYC"
    },
    {
        name: "Tokyo Shibuya Crossing",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 35.6595, lng: 139.7004 },
        status: "active",
        // YouTube embed of Shibuya Crossing live stream
        footageUrl: "https://www.youtube.com/embed/sfJkrvQ0tDg?autoplay=1&mute=1",
        streamType: "youtube",
        description: "Live view of world's busiest pedestrian crossing"
    },
    {
        name: "London Abbey Road Crossing",
        type: "Outdoor",
        resolution: "1080p",
        location: { lat: 51.5319, lng: -0.1769 },
        status: "active",
        // YouTube embed of Abbey Road crossing
        footageUrl: "https://www.youtube.com/embed/oAoF0l4yNPw?autoplay=1&mute=1",
        streamType: "youtube",
        description: "Famous Beatles crossing live cam"
    },
    {
        name: "Venice Italy Live Cam",
        type: "PTZ",
        resolution: "4K",
        location: { lat: 45.4408, lng: 12.3155 },
        status: "active",
        footageUrl: "https://www.youtube.com/embed/6WlI24rv__g?autoplay=1&mute=1",
        streamType: "youtube",
        description: "Live panoramic view of Venice canals"
    },
    {
        name: "NYC Traffic Cam - Brooklyn Bridge",
        type: "Outdoor",
        resolution: "720p",
        location: { lat: 40.7061, lng: -73.9969 },
        status: "active",
        // Public surveillance footage sample (looped)
        footageUrl: "https://www.youtube.com/embed/EEIk7gwjgIM?autoplay=1&mute=1&loop=1&playlist=EEIk7gwjgIM",
        streamType: "youtube",
        description: "Traffic monitoring camera"
    },
    {
        name: "ISS Live Earth View",
        type: "PTZ",
        resolution: "1080p",
        location: { lat: 0, lng: 0 },
        status: "active",
        // ISS live feed from space
        footageUrl: "https://www.youtube.com/embed/86YLFOog4GM?autoplay=1&mute=1",
        streamType: "youtube",
        description: "Live view from International Space Station"
    }
];
