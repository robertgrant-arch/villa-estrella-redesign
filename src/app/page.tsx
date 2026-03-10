'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const BASE = 'https://villaestrella-costarica.com/wp-content/uploads/2021/06/';
const BASE18 = 'https://villaestrella-costarica.com/wp-content/uploads/2018/06/';

const IMAGES = {
  // Establishing / aerial / pool
  aerial:    BASE + 'vILLA-estrella-SV-120.jpg',
  hillside:  BASE + 'vILLA-estrella-SV-115.jpg',
  helipad:   BASE + 'vILLA-estrella-SV-113.jpg',
  pool:      BASE + 'vILLA-estrella-SV-109.jpg',
  exterior1: BASE + 'vILLA-estrella-SV-108.jpg',
  exterior2: BASE + 'vILLA-estrella-SV-107.jpg',
  exterior3: BASE + 'vILLA-estrella-SV-105.jpg',
  lounge:    BASE + 'vILLA-estrella-SV-103.jpg',
  dining:    BASE + 'vILLA-estrella-SV-102.jpg',
  kitchen:   BASE + 'vILLA-estrella-SV-101.jpg',
  living:    BASE + 'vILLA-estrella-SV-100.jpg',
  terrace:   BASE + 'vILLA-estrella-SV-98.jpg',
  view:      BASE + 'vILLA-estrella-SV-96.jpg',
  sunset:    BASE + 'vILLA-estrella-SV-92.jpg',
  garden:    BASE + 'vILLA-estrella-SV-88.jpg',
  path:      BASE + 'vILLA-estrella-SV-87.jpg',
  trees:     BASE + 'vILLA-estrella-SV-86.jpg',
  grounds:   BASE + 'vILLA-estrella-SV-85.jpg',
  arch:      BASE + 'vILLA-estrella-SV-84.jpg',
  // Bedrooms
  bed1:      BASE + 'vILLA-estrella-SV.jpg',
  bed2:      BASE + 'vILLA-estrella-SV-40.jpg',
  bed3:      BASE + 'vILLA-estrella-SV-43.jpg',
  bed4:      BASE + 'vILLA-estrella-SV-79.jpg',
  bed5:      BASE + 'vILLA-estrella-SV-78.jpg',
  bed6:      BASE + 'vILLA-estrella-SV-76.jpg',
  bed7:      BASE + 'vILLA-estrella-SV-15.jpg',
  bed8:      BASE + 'vILLA-estrella-SV-10.jpg',
  // Other interiors
  bath1:     BASE + 'vILLA-estrella-SV-73.jpg',
  bath2:     BASE + 'vILLA-estrella-SV-66.jpg',
  detail1:   BASE + 'vILLA-estrella-SV-61.jpg',
  detail2:   BASE + 'vILLA-estrella-SV-56.jpg',
  detail3:   BASE + 'vILLA-estrella-SV-39.jpg',
  detail4:   BASE + 'vILLA-estrella-SV-38.jpg',
  detail5:   BASE + 'vILLA-estrella-SV-36.jpg',
  detail6:   BASE + 'vILLA-estrella-SV-34.jpg',
  detail7:   BASE + 'vILLA-estrella-SV-33.jpg',
  detail8:   BASE + 'vILLA-estrella-SV-27.jpg',
  detail9:   BASE + 'vILLA-estrella-SV-23.jpg',
  detail10:  BASE + 'vILLA-estrella-SV-13.jpg',
  detail11:  BASE + 'vILLA-estrella-SV-5.jpg',
  // Wellness (2018)
  jacuzzi:   BASE18 + 'EF5A3306.jpg',
  wellness:  BASE18 + 'EF5A3290.jpg',
};

const BEDROOMS = [
  { name: 'The Ocean Suite',   size: '95 m²',  view: 'Pacific Ocean',     features: ['King bed', 'Private terrace', 'Soaking tub', 'Ocean view'],       img: IMAGES.bed1 },
  { name: 'The Jungle Loft',   size: '80 m²',  view: 'Rainforest Canopy', features: ['King bed', 'Outdoor shower', 'Hammock balcony', 'Forest view'],    img: IMAGES.bed2 },
  { name: 'The Sunset Room',   size: '75 m²',  view: 'Guanacaste Sunset', features: ['King bed', 'Private plunge pool', 'Rain shower', 'Sunset terrace'], img: IMAGES.bed3 },
  { name: 'The Palapa Suite',  size: '85 m²',  view: 'Pool & Garden',     features: ['King bed', 'Open-air bathroom', 'Daybed lounge', 'Garden access'],  img: IMAGES.bed4 },
  { name: 'The Treetop Room',  size: '70 m²',  view: 'Treetop Canopy',    features: ['Queen bed', 'Reading nook', 'Outdoor shower', 'Canopy views'],      img: IMAGES.bed5 },
  { name: 'The Casa Blanca',   size: '90 m²',  view: 'Courtyard & Sea',   features: ['King bed', 'Sitting room', 'Marble bath', 'Sea glimpses'],          img: IMAGES.bed6 },
  { name: 'The Garden Suite',  size: '78 m²',  view: 'Tropical Garden',   features: ['Twin kings', 'Private patio', 'Freestanding tub', 'Tropical garden'], img: IMAGES.bed7 },
  { name: 'The Penthouse',     size: '110 m²', view: '360° Panoramic',    features: ['Super king bed', 'Rooftop terrace', 'Jacuzzi', 'Panoramic views'],  img: IMAGES.bed8 },
];

const EXPERIENCES = [
  {
    category: 'Adventure',
    icon: '🌊',
    items: ['Sunset sailing & snorkeling', 'ATV jungle expeditions', 'Sport fishing charters', 'Zip-line canopy tours', 'Helicopter excursions', "Surfing lessons at Witch's Rock"],
    img: IMAGES.helipad,
  },
  {
    category: 'Wellness',
    icon: '✦',
    items: ['In-villa spa & massage', 'Sunrise yoga pavilion', 'Meditation in nature', 'Private chef nutrition plans', 'Cold plunge & infrared sauna', 'Sound healing ceremonies'],
    img: IMAGES.jacuzzi,
  },
  {
    category: 'Dining',
    icon: '🍽',
    items: ['Private chef, all meals included', 'Curated Costa Rican wine cellar', 'Farm-to-table breakfast spreads', 'Beachside candlelit dinners', 'Mixology & cocktail classes', 'Custom tasting menus on request'],
    img: IMAGES.dining,
  },
];

const GALLERY_IMAGES = [
  IMAGES.aerial, IMAGES.pool, IMAGES.hillside, IMAGES.helipad,
  IMAGES.exterior1, IMAGES.exterior2, IMAGES.lounge, IMAGES.dining,
  IMAGES.terrace, IMAGES.view, IMAGES.sunset, IMAGES.garden,
  IMAGES.detail1, IMAGES.detail3, IMAGES.bath1, IMAGES.wellness,
];

const TESTIMONIALS = [
  { name: 'The Harrison Family', location: 'New York, USA', text: 'Villa Estrella is unlike any place we\'ve ever stayed. The staff anticipated our every need, the food was extraordinary, and waking up to those Pacific views every morning felt like a dream we never wanted to leave.', rating: 5 },
  { name: 'Sofia & Marco Reyes', location: 'Madrid, Spain', text: 'We celebrated our anniversary here and it exceeded every expectation. The infinity pool overlooking the ocean at golden hour, the private chef\'s ceviche — pure magic. We will return every year.', rating: 5 },
  { name: 'The Chen Group', location: 'Singapore', text: 'Hosted our executive retreat here and the team is still talking about it. The helipad made logistics effortless, and the blend of luxury with raw nature is something no hotel can replicate.', rating: 5 },
];

const REELS = [
  'https://www.instagram.com/reel/C-_UJZjyMmk/embed/',
  'https://www.instagram.com/reel/DLqeH2mRoWg/embed/',
  'https://www.instagram.com/reel/DIsA4XBx1Em/embed/',
  'https://www.instagram.com/reel/DHuJEHpxhHo/embed/',
  'https://www.instagram.com/reel/DPNOJ2eDS8M/embed/',
  'https://www.instagram.com/reel/DN5ySBBDaqD/embed/',
];

export default function VillaEstrella() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', dates: '', guests: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  const navLinks = ['About', 'Accommodations', 'Experiences', 'Gallery', 'Reels', 'Testimonials', 'Contact'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const openLightbox = (img: string, idx: number) => { setLightboxImg(img); setLightboxIdx(idx); };
  const closeLightbox = () => setLightboxImg(null);
  const nextImg = () => { const n = (lightboxIdx + 1) % GALLERY_IMAGES.length; setLightboxImg(GALLERY_IMAGES[n]); setLightboxIdx(n); };
  const prevImg = () => { const n = (lightboxIdx - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length; setLightboxImg(GALLERY_IMAGES[n]); setLightboxIdx(n); };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #0A1628; color: #FAF8F5; }
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        ::selection { background: #C9A96E33; color: #C9A96E; }
        .gold-line::after { content: ''; display: block; width: 40px; height: 1px; background: #C9A96E; margin-top: 16px; }
        .gold-line-center::after { content: ''; display: block; width: 40px; height: 1px; background: #C9A96E; margin: 16px auto 0; }
      `}</style>

      {/* ── STICKY NAV ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0) 100%)' }}
      >
        <button onClick={() => scrollTo('hero')} className="font-display text-[#FAF8F5] text-xl tracking-[0.25em] uppercase">
          Villa <span className="text-[#C9A96E]">Estrella</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase())}
              className={`font-['Inter'] text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${activeSection === l.toLowerCase() ? 'text-[#C9A96E]' : 'text-[#FAF8F5]/70 hover:text-[#C9A96E]'}`}
            >
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')} className="ml-4 px-5 py-2 border border-[#C9A96E] text-[#C9A96E] text-xs tracking-[0.2em] uppercase hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all duration-300">
            Book Now
          </button>
        </div>
        <button className="md:hidden text-[#FAF8F5]" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`w-6 h-px bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-px bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A1628]/98 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="font-display text-3xl text-[#FAF8F5] hover:text-[#C9A96E] transition-colors">
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="mt-4 px-8 py-3 border border-[#C9A96E] text-[#C9A96E] text-sm tracking-[0.2em] uppercase">
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 w-full h-full">
          <img
            src={IMAGES.aerial}
            alt="Villa Estrella aerial view over the Pacific"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/30 to-[#0A1628]/80" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.4em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-[#C9A96E] text-xs uppercase tracking-[0.5em] mb-6 font-['Inter']"
          >
            Playa Ocotal · Guanacaste · Costa Rica
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[#FAF8F5] text-6xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-8"
          >
            Villa<br /><em className="text-[#C9A96E]">Estrella</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-[#FAF8F5]/70 text-lg md:text-xl font-light tracking-wide mb-10 max-w-xl mx-auto font-['Inter']"
          >
            8 bedrooms · All-inclusive luxury · Where the Pacific meets paradise
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollTo('contact')}
              className="px-10 py-4 bg-[#C9A96E] text-[#0A1628] text-sm tracking-[0.2em] uppercase font-medium hover:bg-[#FAF8F5] transition-colors duration-300"
            >
              Reserve Your Stay
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-10 py-4 border border-[#FAF8F5]/40 text-[#FAF8F5] text-sm tracking-[0.2em] uppercase hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              Discover More
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-[#FAF8F5]/40 text-xs tracking-[0.3em] uppercase font-['Inter']">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-[#FAF8F5] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <img src={IMAGES.aerial} alt="Villa Estrella aerial pool view" className="w-full h-[600px] object-cover" />
            <div className="absolute -bottom-8 -right-8 bg-[#0A1628] p-8 hidden md:block">
              <p className="font-display text-5xl text-[#C9A96E] font-light">8</p>
              <p className="text-[#FAF8F5]/60 text-xs tracking-[0.2em] uppercase mt-1 font-['Inter']">Luxury Suites</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">About the Estate</p>
            <h2 className="font-display text-[#0A1628] text-5xl md:text-6xl font-light leading-tight mb-6 gold-line">
              A Private World<br /><em>Above the Pacific</em>
            </h2>
            <div className="space-y-5 text-[#0A1628]/70 leading-relaxed font-['Inter'] text-sm">
              <p>
                Perched on a clifftop above the crystalline waters of Playa Ocotal in Guanacaste, Villa Estrella is Costa Rica's most exclusive private estate. Designed for those who seek the extraordinary, this all-inclusive sanctuary accommodates up to 22 guests across eight magnificent suites.
              </p>
              <p>
                Every detail has been curated for effortless indulgence — from the helipad and infinity pool that dissolves into the horizon, to the resident private chef who transforms local ingredients into culinary artistry each day.
              </p>
              <p>
                Here, the jungle meets the sea. Howler monkeys serenade your mornings while Pacific sunsets paint the sky in gold. This is not a vacation. This is a transformation.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#0A1628]/10">
              {[['8 / 8.5', 'Bed / Bath'], ['Sleeps 22', 'Max Guests'], ['All-Inclusive', 'Experience']].map(([val, label]) => (
                <div key={label}>
                  <p className="font-display text-[#0A1628] text-2xl font-medium">{val}</p>
                  <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mt-1 font-['Inter']">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACCOMMODATIONS ── */}
      <section id="accommodations" className="bg-[#0A1628] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">The Suites</p>
            <h2 className="font-display text-[#FAF8F5] text-5xl md:text-6xl font-light gold-line-center">
              Eight Worlds<br /><em className="text-[#C9A96E]">Unto Themselves</em>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#FAF8F5]/10">
            {BEDROOMS.map((room, i) => (
              <motion.div
                key={room.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7 }}
                className="group relative bg-[#0A1628] overflow-hidden cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.img}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#C9A96E]/20 backdrop-blur-sm border border-[#C9A96E]/30 px-3 py-1">
                    <span className="text-[#C9A96E] text-xs font-['Inter']">{room.size}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[#FAF8F5] text-xl font-light mb-1">{room.name}</h3>
                  <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mb-4 font-['Inter']">{room.view}</p>
                  <ul className="space-y-1.5">
                    {room.features.map((f) => (
                      <li key={f} className="text-[#FAF8F5]/50 text-xs font-['Inter'] flex items-center gap-2">
                        <span className="w-1 h-1 bg-[#C9A96E] rounded-full flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES ── */}
      <section id="experiences" className="bg-[#FAF8F5] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">Curated for You</p>
            <h2 className="font-display text-[#0A1628] text-5xl md:text-6xl font-light gold-line-center">
              The <em>Estrella</em><br />Experience
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="group"
              >
                <div className="relative h-80 overflow-hidden mb-6">
                  <img src={exp.img} alt={exp.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#0A1628]/40 group-hover:bg-[#0A1628]/20 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6">
                    <span className="font-display text-[#FAF8F5] text-4xl font-light">{exp.category}</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#0A1628]/70 text-sm font-['Inter']">
                      <span className="text-[#C9A96E] mt-0.5 text-xs">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="bg-[#0A1628] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">The Estate</p>
            <h2 className="font-display text-[#FAF8F5] text-5xl md:text-6xl font-light gold-line-center">
              <em className="text-[#C9A96E]">A Visual</em> Journey
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => openLightbox(img, i)}
                className={`cursor-pointer overflow-hidden group relative ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ height: i === 0 ? '500px' : '245px' }}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#0A1628]/0 group-hover:bg-[#0A1628]/30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-[#FAF8F5] text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A1628]/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-8 text-[#FAF8F5]/60 hover:text-[#FAF8F5] text-3xl z-10">×</button>
            <button onClick={(e) => { e.stopPropagation(); prevImg(); }} className="absolute left-6 text-[#FAF8F5]/60 hover:text-[#C9A96E] text-4xl z-10">‹</button>
            <motion.img
              key={lightboxImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={lightboxImg}
              alt="Lightbox"
              className="max-w-5xl max-h-[85vh] w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); nextImg(); }} className="absolute right-6 text-[#FAF8F5]/60 hover:text-[#C9A96E] text-4xl z-10">›</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INSTAGRAM REELS ── */}
      <section id="reels" className="bg-[#FAF8F5] py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">Follow the Story</p>
            <h2 className="font-display text-[#0A1628] text-5xl md:text-6xl font-light gold-line-center">
              Life at <em>Estrella</em>
            </h2>
          </motion.div>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-16 lg:px-24 pb-4">
          {REELS.map((reel, i) => (
            <motion.div
              key={reel}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
                            className="flex-shrink-0 border border-[#0A1628]/10"
              style={{ width: 320, height: 568, overflow: 'hidden', position: 'relative' }}
            >
              <iframe
                src={reel}
                              style={{
                                                width: '100%',
                height: 'calc(100% + 56px)',
                marginTop: -56,
                border: 'none',
                display: 'block',
              }}
                scrolling="no"
                allowTransparency
                allow="encrypted-media"
                title={`Instagram Reel ${i + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="bg-[#0A1628] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">Guest Voices</p>
            <h2 className="font-display text-[#FAF8F5] text-5xl md:text-6xl font-light gold-line-center">
              Unforgettable<br /><em className="text-[#C9A96E]">Moments</em>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-[#FAF8F5]/10 p-8 relative"
              >
                <div className="flex gap-1 mb-6">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <span key={j} className="text-[#C9A96E] text-sm">★</span>
                  ))}
                </div>
                <p className="font-display text-[#FAF8F5]/80 text-lg font-light leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div className="border-t border-[#FAF8F5]/10 pt-6">
                  <p className="text-[#FAF8F5] text-sm font-medium font-['Inter']">{t.name}</p>
                  <p className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase mt-1 font-['Inter']">{t.location}</p>
                </div>
                <div className="absolute top-6 right-8 font-display text-[#C9A96E]/20 text-6xl leading-none">"</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[#FAF8F5] py-28 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4 font-['Inter']">Reserve Your Stay</p>
            <h2 className="font-display text-[#0A1628] text-5xl md:text-6xl font-light leading-tight mb-6 gold-line">
              Begin Your<br /><em>Estrella Story</em>
            </h2>
            <p className="text-[#0A1628]/60 leading-relaxed mb-10 font-['Inter'] text-sm">
              Every stay at Villa Estrella is a bespoke experience. Our concierge team will work with you to craft your perfect retreat — from arrival by helicopter to your final sunset dinner on the terrace.
            </p>
            <div className="space-y-4">
              {[
                ['Availability', 'info@villaestrella-costarica.com'],
                ['Whatsapp', '+506 8888 0000'],
                ['Location', 'Playa Ocotal, Guanacaste, Costa Rica'],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 items-start">
                  <span className="text-[#C9A96E] text-xs tracking-[0.2em] uppercase w-24 flex-shrink-0 pt-0.5 font-['Inter']">{label}</span>
                  <span className="text-[#0A1628]/70 text-sm font-['Inter']">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <img src={IMAGES.terrace} alt="Villa terrace" className="w-full h-48 object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {formSent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 border border-[#C9A96E] flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#C9A96E] text-2xl">✦</span>
                  </div>
                  <h3 className="font-display text-[#0A1628] text-3xl font-light mb-4">Thank You</h3>
                  <p className="text-[#0A1628]/60 font-['Inter'] text-sm">Your inquiry has been received. Our concierge will be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <div className="space-y-5">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                      { key: 'dates', label: 'Preferred Dates', type: 'text', placeholder: 'e.g. Dec 15–22, 2025' },
                      { key: 'guests', label: 'Number of Guests', type: 'text', placeholder: 'How many guests?' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-[#0A1628] text-xs tracking-[0.2em] uppercase mb-2 font-['Inter']">{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full bg-transparent border border-[#0A1628]/20 px-4 py-3 text-[#0A1628] placeholder-[#0A1628]/30 text-sm font-['Inter'] focus:outline-none focus:border-[#C9A96E] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[#0A1628] text-xs tracking-[0.2em] uppercase mb-2 font-['Inter']">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your dream stay..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-transparent border border-[#0A1628]/20 px-4 py-3 text-[#0A1628] placeholder-[#0A1628]/30 text-sm font-['Inter'] focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-[#0A1628] text-[#FAF8F5] text-sm tracking-[0.2em] uppercase font-['Inter'] hover:bg-[#C9A96E] hover:text-[#0A1628] transition-all duration-300 mt-2"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="footer" className="bg-[#0A1628] border-t border-[#FAF8F5]/10 py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-display text-[#FAF8F5] text-3xl font-light mb-2">
                Villa <span className="text-[#C9A96E]">Estrella</span>
              </h3>
              <p className="text-[#FAF8F5]/40 text-xs tracking-[0.3em] uppercase mb-6 font-['Inter']">Playa Ocotal · Guanacaste · Costa Rica</p>
              <p className="text-[#FAF8F5]/50 text-sm leading-relaxed font-['Inter'] max-w-sm">
                Costa Rica's most exclusive private villa estate. Eight suites, all-inclusive luxury, and an infinity pool above the Pacific.
              </p>
            </div>
            <div>
              <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-6 font-['Inter']">Navigate</p>
              <ul className="space-y-3">
                {navLinks.map((l) => (
                  <li key={l}>
                    <button onClick={() => scrollTo(l.toLowerCase())} className="text-[#FAF8F5]/50 text-sm hover:text-[#C9A96E] transition-colors font-['Inter']">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-6 font-['Inter']">Contact</p>
              <ul className="space-y-3 text-[#FAF8F5]/50 text-sm font-['Inter']">
                <li>info@villaestrella-costarica.com</li>
                <li>+506 8888 0000</li>
                <li className="pt-4">
                  <a href="https://www.instagram.com/villaestrellacostarica/" target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:text-[#FAF8F5] transition-colors tracking-[0.1em] text-xs uppercase">
                    @villaestrellacostarica
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#FAF8F5]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#FAF8F5]/30 text-xs font-['Inter'] tracking-wide">
              © {new Date().getFullYear()} Villa Estrella Costa Rica. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'].map((t) => (
                <button key={t} className="text-[#FAF8F5]/30 text-xs hover:text-[#C9A96E] transition-colors font-['Inter']">{t}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
