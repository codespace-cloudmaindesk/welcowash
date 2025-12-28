// import React, { useState, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/Button';

// import { GALLERY_ITEMS } from './Gallery.constants';
// import { galleryStyles as s } from './Gallery.styles';

// const getImageUrl = (name: string) =>
//   new URL(`../assets/${name}`, import.meta.url).href;

// export const GallerySection: React.FC = () => {
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   const Sparkles = s.icons.sparkles.component;
//   const Layers = s.icons.layers.component;
//   const GridIcon = s.icons.grid.component;
//   const Arrow = s.icons.arrow.component;

//   return (
//     <section className={s.section}>
//       <div className={s.hero.glow} />

//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <div className={s.hero.badge}>
//             <Sparkles className={s.icons.sparkles.className} />
//             Our Masterpieces
//           </div>

//           <h2 className={s.hero.heading}>
//             See the <span className={s.hero.gradient}>Difference</span>
//           </h2>

//           <p className={s.hero.subtitle}>
//             We rejuvenate vehicles using advanced detailing techniques.
//           </p>
//         </div>

//         <div className={s.grid.wrapper}>
//           {GALLERY_ITEMS.slice(0, 6).map((item, i) => (
//             <div
//               key={item.id}
//               className={s.grid.item}
//               onClick={() => {
//                 setIndex(i);
//                 setLightboxOpen(true);
//               }}
//             >
//               <img
//                 src={getImageUrl(item.after)}
//                 className={s.grid.image}
//                 alt={item.title}
//               />
//               <div className={s.grid.overlay} />
//               <div className={s.grid.content}>
//                 <span className={s.grid.category}>{item.category}</span>
//                 <h3 className={s.grid.title}>{item.title}</h3>
//                 <div className={s.grid.compare}>
//                   <Layers className={s.icons.layers.className} />
//                   Compare Before / After
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <Button
//             asChild
//             variant={s.buttons.viewAll.variant as any}
//             size={s.buttons.viewAll.size as any}
//             className={s.buttons.viewAll.className}
//           >
//             <Link to="/gallery">
//               <div className={s.buttons.viewAll.overlay} />
//               <span className={s.buttons.viewAll.content}>
//                 <GridIcon className={s.icons.grid.className} />
//                 View Full Gallery
//                 <Arrow className={s.icons.arrow.className} />
//               </span>
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GallerySection;
