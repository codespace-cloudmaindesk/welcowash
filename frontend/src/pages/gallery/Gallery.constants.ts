
export const GALLERY_ITEMS = [
    { id: 1, after: 'work-1.jpg', before: 'work-1.jpg', category: "Exterior Detail", title: "Ceramic Coating Finish" },
    { id: 2, after: 'work-2.jpg', before: 'work-2.jpg', category: "Luxury Care", title: "Premium Hand Wash" },
    { id: 3, after: 'work-3.jpg', before: 'work-3.jpg', category: "Interior Finish", title: "Leather Restoration" },
    { id: 4, after: 'work-4.jpg', before: 'work-4.jpg', category: "Full Service", title: "Complete Detailing" },
    { id: 5, after: 'work-5.jpg', before: 'work-5.jpg', category: "Paint Correction", title: "Swirl Mark Removal" },
    { id: 6, after: 'work-6.jpg', before: 'work-6.jpg', category: "Protection", title: "Wax & Sealant" },

    { id: 7, after: 'work-1.jpg', before: 'work-1.jpg', category: "Exterior Detail", title: "Wheel Polishing" },
    { id: 8, after: 'work-3.jpg', before: 'work-3.jpg', category: "Interior Finish", title: "Upholstery Deep Clean" },
    { id: 9, after: 'work-2.jpg', before: 'work-2.jpg', category: "Luxury Care", title: "Engine Bay Detail" },
    { id: 10, after: 'work-4.jpg', before: 'work-4.jpg', category: "Full Service", title: "Fleet Maintenance" },
    { id: 11, after: 'work-5.jpg', before: 'work-5.jpg', category: "Paint Correction", title: "Scratch Repair" },
    { id: 12, after: 'work-6.jpg', before: 'work-6.jpg', category: "Protection", title: "Glass Coating" },
];

export const CATEGORIES = ["All", ...new Set(GALLERY_ITEMS.map(item => item.category))];
