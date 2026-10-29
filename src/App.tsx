/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Upload,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShoppingBag,
  Heart,
  Eye,
  Info,
  Layers,
  ArrowUpRight,
  Video,
  Award,
  Truck,
  RotateCcw,
  Users,
  Building2,
  FileText,
  BadgeCheck,
  Compass,
  Car,
  Filter,
  CheckCircle2,
  Send,
  HelpCircle,
  Gift,
  Share2,
  Volume2,
  VolumeX,
  Flame,
  Zap
} from 'lucide-react';

// Authentically generated high-resolution assets
import heroGarmentsImg from './assets/images/hero_garments_store_1793108271093.jpg';
import boysClothingImg from './assets/images/boys_clothing_card_1793108271898.jpg';
import girlsClothingImg from './assets/images/girls_clothing_card_1793108273031.jpg';
import ladiesWearImg from './assets/images/ladies_wear_card_1793108273352.jpg';
import smStreetImg from './assets/images/sm_street_calicut_shop_1793108273667.jpg';

interface StoreHoursStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
}

interface ProductItem {
  id: string;
  name: string;
  category: 'boys' | 'girls' | 'ladies';
  ageGroup: string;
  fabric: string;
  priceEstimate: string;
  image: string;
  highlights: string[];
  description: string;
  festive: boolean;
  colors: string[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

export type FestivalSeason = 'all' | 'onam' | 'eid' | 'wedding';

export interface StoreBranch {
  id: 'sm-street' | 'pantheeramkavu';
  name: string;
  badge: string;
  shortName: string;
  area: string;
  addressLines: string[];
  landmark: string;
  pincode: string;
  phones: string[];
  mapsQuery: string;
  mapsEmbed: string;
  parkingTip: string;
  highlights: string[];
}

export const STORE_BRANCHES: StoreBranch[] = [
  {
    id: 'sm-street',
    name: 'Colour Plus — S.M. Street Flagship',
    badge: 'Main Heritage Store (Since 1998)',
    shortName: 'S.M. Street (Mittai Theruvu)',
    area: 'Mittai Theruvu, Kozhikode',
    addressLines: [
      'Colour Plus',
      'S.M. Street (Mittai Theruvu),',
      'Kozhikode (Calicut) - 673001,',
      'Kerala, India.'
    ],
    landmark: 'Central Mittai Theruvu Heritage Walkway',
    pincode: '673001',
    phones: ['79071 41419', '98953 38544', '99614 21201'],
    mapsQuery: 'S.M.+Street+Kozhikode+Calicut',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0617327318725!2d75.77663431526487!3d11.249539292001402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593a20e29b19%3A0xe5a3c0353c7cba2a!2sS.M.%20Street%2C%20Palayam%2C%20Kozhikode%2C%20Kerala%20673001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin',
    parkingTip: 'S.M. Street is a heritage pedestrian walkway. For 4-wheelers, convenient parking is available at Maniyan Kulam Multi-Level Car Parking or near Calicut Railway Station (350m walk).',
    highlights: ['25+ Years Legacy', 'Complete 3-Floor Family Collection', 'Central Kozhikode Heritage Landmark']
  },
  {
    id: 'pantheeramkavu',
    name: 'Colour Plus — Pantheeramkavu Branch',
    badge: 'Express Store & Easy Parking',
    shortName: 'Pantheeramkavu Branch',
    area: 'Pantheeramkavu, Kozhikode',
    addressLines: [
      'Colour Plus',
      'Pantheeramkavu,',
      'Kozhikode (Calicut) - 673001,',
      'Kerala, India.'
    ],
    landmark: 'Pantheeramkavu Junction / Calicut Bypass Access',
    pincode: '673001',
    phones: ['79071 41419', '98953 38544', '99614 21201'],
    mapsQuery: 'Pantheeramkavu+Kozhikode+Kerala',
    mapsEmbed: 'https://maps.google.com/maps?q=Pantheeramkavu+Kozhikode+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed',
    parkingTip: 'Direct highway road access with dedicated customer vehicle parking available right outside our Pantheeramkavu branch. Hassle-free for fast family visits.',
    highlights: ['Hassle-Free Direct Parking', 'Curated Kids & Ladies Collections', 'Fast Highway Bypass Access']
  }
];

// 3D Perspective Tilt Card Component with Interactive Specular Light Glare
export function TiltCard({
  children,
  className = '',
  style = {}
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;
    setRotateX(rX);
    setRotateY(rY);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.22 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {glare.opacity > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}

// Smooth Number Counter with Easing Animation
export function AnimatedCounter({ end, suffix = '', duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'boys' | 'girls' | 'ladies'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeColorIndex, setActiveColorIndex] = useState<{ [productId: string]: number }>({});
  
  // Festival celebration mode state
  const [activeSeason, setActiveSeason] = useState<FestivalSeason>('all');

  // Live Activity Social Proof Ticker
  const activityItems = [
    { text: "Just now: Nadakkavu customer reserved Girls' Kasavu Frock on WhatsApp", icon: "🌸" },
    { text: "4m ago: WhatsApp enquiry for Boys' Cotton Shirts & Kurtas from Calicut Beach", icon: "👦" },
    { text: "11m ago: Video Shopping tour scheduled with NRI family in Dubai (UAE)", icon: "📹" },
    { text: "19m ago: Walk-in customer bought 3 Designer Lucknowi Kurtis at S.M. Street", icon: "👗" },
    { text: "28m ago: Kozhikode family selected festive matching outfits for family celebration", icon: "✨" }
  ];
  const [activityIndex, setActivityIndex] = useState(0);
  const [showActivityToast, setShowActivityToast] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activityItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activityItems.length]);

  // Scrolltide Ref & Motion Transforms for Hero Section
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const smoothHeroScroll = useSpring(heroScrollProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  
  // Parallax and 3D tilts tied to scroll
  const heroTextY = useTransform(smoothHeroScroll, [0, 1], [0, 70]);
  const heroCardRotateX = useTransform(smoothHeroScroll, [0, 1], [0, 14]);
  const heroCardRotateY = useTransform(smoothHeroScroll, [0, 1], [0, -10]);
  const heroCardScale = useTransform(smoothHeroScroll, [0, 1], [1, 0.94]);
  const heroOrbTranslateY = useTransform(smoothHeroScroll, [0, 1], [0, 120]);

  // Gallery Scrolltide Ref
  const galleryRef = useRef<HTMLDivElement>(null);

  // Custom logo preview state (Allows shop owners / entrepreneurs to preview real logo)
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  
  // Modals
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPublishGuide, setShowPublishGuide] = useState(false);
  const [showVideoShoppingModal, setShowVideoShoppingModal] = useState(false);
  const [showSizeGuideModal, setShowSizeGuideModal] = useState(false);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [privilegeSignedUp, setPrivilegeSignedUp] = useState(false);
  
  // Audio chime feedback state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Creative Particle Confetti Emitter
  const [particles, setParticles] = useState<Particle[]>([]);

  // Smart Wardrobe Finder State (Interactive Quiz)
  const [finderStep, setFinderStep] = useState(1);
  const [finderTarget, setFinderTarget] = useState<'boys' | 'girls' | 'ladies'>('boys');
  const [finderOccasion, setFinderOccasion] = useState('Festive & Weddings');
  const [finderAge, setFinderAge] = useState('2-5 Years');

  // Video Shopping Form
  const [videoName, setVideoName] = useState('');
  const [videoPhone, setVideoPhone] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [videoCategory, setVideoCategory] = useState("Ladies' Festive Wear & Kurtis");

  // Selected Store Branch (S.M. Street Flagship vs Pantheeramkavu Branch)
  const [selectedBranchId, setSelectedBranchId] = useState<'sm-street' | 'pantheeramkavu'>('sm-street');
  const activeBranch = STORE_BRANCHES.find((b) => b.id === selectedBranchId) || STORE_BRANCHES[0];

  // Contact Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: 'S.M. Street (Mittai Theruvu) Flagship',
    category: "Boys' clothing (0-12 yrs)",
    message: ''
  });

  // Store Hours calculation for Kozhikode (IST UTC+5:30)
  const [storeStatus, setStoreStatus] = useState<StoreHoursStatus>({
    isOpen: true,
    statusText: 'Open Now',
    subText: '10:00 AM – 9:00 PM'
  });

  // Synthesize gentle boutique audio chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // Audio not supported or blocked by browser autoplay
    }
  };

  // Synthesize rich Indian festive chord
  const playFestiveChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major celebratory arpeggio)
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        const start = audioCtx.currentTime + idx * 0.07;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.05, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch {
      // Audio not supported
    }
  };

  // Trigger celebratory festive particle burst
  const triggerConfetti = () => {
    playChime();
    const colors = ['#E8268F', '#D4AF37', '#FF69B4', '#10B981', '#F59E0B'];
    const newParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.4 + Math.random() * 200,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      rotation: Math.random() * 360
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  useEffect(() => {
    function computeHours() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);

      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const currentMins = hours * 60 + minutes;

      const openMins = 10 * 60; // 10:00 AM
      const closeMins = 21 * 60; // 9:00 PM

      const isOpen = currentMins >= openMins && currentMins < closeMins;

      if (isOpen) {
        const remainingMins = closeMins - currentMins;
        const remHours = Math.floor(remainingMins / 60);
        const remMins = remainingMins % 60;
        setStoreStatus({
          isOpen: true,
          statusText: 'Open Now',
          subText: `Closes at 9:00 PM (${remHours > 0 ? `${remHours}h ` : ''}${remMins}m left today)`
        });
      } else {
        setStoreStatus({
          isOpen: false,
          statusText: 'Closed Now',
          subText: 'Opens at 10:00 AM (Monday to Sunday)'
        });
      }
    }

    computeHours();
    const timer = setInterval(computeHours, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setCustomLogoUrl(uploadEvent.target?.result as string);
        triggerConfetti();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerConfetti();
    const primaryPhone = '917907141419';
    let text = `*New Customer Inquiry - Colour Plus S.M. Street*\n\n`;
    text += `👤 *Customer Name:* ${formData.name}\n`;
    text += `📱 *Customer Mobile:* ${formData.phone}\n`;
    text += `📍 *Store Branch:* ${formData.branch}\n`;
    text += `🛍️ *Collection Interest:* ${formData.category}\n`;
    if (formData.message) {
      text += `💬 *Specific Requirements:* ${formData.message}\n`;
    }
    text += `\n_Sent directly from Colour Plus Online Store (Kozhikode: S.M. Street & Pantheeramkavu)_`;

    const url = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleVideoShoppingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerConfetti();
    const primaryPhone = '917907141419';
    let text = `*Live WhatsApp Video Shopping Request - Colour Plus*\n\n`;
    text += `👤 *Shopper Name:* ${videoName}\n`;
    text += `📱 *Phone / WhatsApp:* ${videoPhone}\n`;
    text += `📅 *Preferred Date/Time:* ${videoDate || 'As soon as possible'}\n`;
    text += `👗 *Interested Garments:* ${videoCategory}\n\n`;
    text += `_Please arrange a personal video walkthrough of the store racks._`;

    const url = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(text)}`;
    window.location.href = url;
    setShowVideoShoppingModal(false);
  };

  // Curated products catalog with verified details
  const products: ProductItem[] = [
    {
      id: 'boy-1',
      name: "Kids Festive Dhoti & Royal Kurta Set",
      category: 'boys',
      ageGroup: "0 to 10 Years",
      fabric: "South Indian Breathable Art Silk & Cotton",
      priceEstimate: "Fair & Affordable (₹450 – ₹1,250)",
      image: boysClothingImg,
      highlights: ["Skin-soft lining", "Elastic waistband dhoti", "Festive gold zari work", "Non-irritant dyes"],
      description: "Designed specifically for Onam, Eid, Vishu, birthdays, and weddings. Features elegant golden motifs on vibrant jewel tones.",
      festive: true,
      colors: ['#0284C7', '#10B981', '#F59E0B']
    },
    {
      id: 'boy-2',
      name: "Smart Casual Oxford Cotton Shirts & Trousers",
      category: 'boys',
      ageGroup: "2 to 12 Years",
      fabric: "100% Combed Malabar Cotton",
      priceEstimate: "Daily Value (₹350 – ₹850)",
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80',
      highlights: ["Pre-shrunk cotton", "Reinforced stitching", "Fade-resistant colors", "Playproof stretch"],
      description: "Crisp collared shirts with lively checks, stripes, and modern prints matched with comfortable twill pants.",
      festive: false,
      colors: ['#3B82F6', '#EA580C', '#475569']
    },
    {
      id: 'girl-1',
      name: "Enchanted Princess Layered Party Frock",
      category: 'girls',
      ageGroup: "6 Months to 14 Years",
      fabric: "Soft Tulle with 100% Pure Cotton Underlining",
      priceEstimate: "Affordable Luxury (₹550 – ₹1,850)",
      image: girlsClothingImg,
      highlights: ["Zero-itch inner lining", "Full flare twirl cut", "Delicate floral appliqué", "Concealed back zip"],
      description: "A showstopping party dress crafted with multiple layers of fluffy net and a gentle inner cotton shield for total comfort.",
      festive: true,
      colors: ['#E8268F', '#F472B6', '#FCD34D']
    },
    {
      id: 'girl-2',
      name: "Kerala Traditional Kasavu & Designer Lehengas",
      category: 'girls',
      ageGroup: "1 to 16 Years",
      fabric: "Authentic Zari Weave & Rich Brocade",
      priceEstimate: "Traditional Festive (₹650 – ₹2,100)",
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
      highlights: ["Adjustable drawstring", "Matching handcrafted dupatta", "Lightweight festive charm"],
      description: "Cherished ethnic ensemble for family celebrations, temple visits, and school cultural performances.",
      festive: true,
      colors: ['#D4AF37', '#9333EA', '#DC2626']
    },
    {
      id: 'lady-1',
      name: "Handcrafted Lucknowi & Zari Designer Kurti",
      category: 'ladies',
      ageGroup: "Sizes S to 4XL (36 to 48)",
      fabric: "Chanderi Silk & Mercerized Cotton",
      priceEstimate: "Designer Value (₹590 – ₹1,950)",
      image: ladiesWearImg,
      highlights: ["Intricate neckline embroidery", "Flattering A-line silhouette", "Colorfast guarantee", "Plus sizes available"],
      description: "Contemporary ethnic elegance tailored for modern Kerala women. Pairs effortlessly with palazzos, cigarette pants, or jeans.",
      festive: true,
      colors: ['#059669', '#E8268F', '#1E3A8A']
    },
    {
      id: 'lady-2',
      name: "Festive Anarkali Gown with Foil Mirror Accents",
      category: 'ladies',
      ageGroup: "Sizes M to 3XL",
      fabric: "Flowing Georgette & Satin Weave",
      priceEstimate: "Wedding Special (₹1,150 – ₹2,800)",
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      highlights: ["Dramatic flared hem", "Lightweight all-day wear", "Rich festive tones"],
      description: "Graceful silhouettes for festive banquets, family engagements, and wedding receptions in Kozhikode.",
      festive: true,
      colors: ['#BE123C', '#1E40AF', '#B45309']
    },
    {
      id: 'boy-3',
      name: "Traditional Kasavu Zari Kurta & Mundu Duo",
      category: 'boys',
      ageGroup: "1 to 12 Years",
      fabric: "South Indian Pure Kasavu Weave & Cotton",
      priceEstimate: "Festive Exclusive (₹490 – ₹1,350)",
      image: smStreetImg,
      highlights: ["Pure golden kasavu border", "Velcro easy-fit mundu", "Breathable festival fabric", "Authentic Kerala look"],
      description: "The quintessential Onam, Vishu, and temple festival attire for boys. Features smooth golden borders that never scrape delicate skin.",
      festive: true,
      colors: ['#D4AF37', '#10B981', '#9333EA']
    },
    {
      id: 'girl-3',
      name: "Pastel Blossom Flared Twirl Gown with Shimmer",
      category: 'girls',
      ageGroup: "2 to 14 Years",
      fabric: "Organza Silk with Hypoallergenic Cotton Lining",
      priceEstimate: "Party Elegance (₹680 – ₹2,250)",
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=80',
      highlights: ["360-degree twirl flare", "Hidden soft zipper", "Lightweight organza shimmer", "Festival floral flair"],
      description: "An ethereal birthday and festive party dress designed to make every girl feel like royalty with absolute comfort.",
      festive: true,
      colors: ['#F472B6', '#38BDF8', '#C084FC']
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const copyStandaloneHtmlToClipboard = async () => {
    try {
      const response = await fetch('/standalone.html');
      const htmlText = await response.text();
      await navigator.clipboard.writeText(htmlText);
      setCopiedCode(true);
      triggerConfetti();
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] text-slate-800 flex flex-col selection:bg-pink-100 selection:text-[#E8268F] relative overflow-x-hidden">
      
      {/* =================================================================
          CONFETTI PARTICLE SYSTEM (Client Celebration)
          ================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, x: p.x, y: p.y }}
              animate={{
                opacity: 0,
                scale: 1.4,
                y: p.y - 180 + Math.random() * 80,
                x: p.x + (Math.random() - 0.5) * 140,
                rotate: p.rotation + 360
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '3px'
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Live Social Proof Activity Toast */}
      {showActivityToast && (
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md border border-pink-200 p-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs text-slate-700"
        >
          <div className="w-8 h-8 rounded-full bg-pink-100 text-[#E8268F] flex items-center justify-center shrink-0 text-base shadow-xs">
            {activityItems[activityIndex].icon}
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="font-semibold text-slate-900 leading-tight truncate">
              {activityItems[activityIndex].text}
            </p>
            <p className="text-[10px] text-pink-600 font-medium mt-0.5">S.M. Street Store · Verified Activity</p>
          </div>
          <button
            onClick={() => setShowActivityToast(false)}
            className="text-slate-400 hover:text-slate-600 p-1 shrink-0 cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* =================================================================
          OWNER & STRATEGIC TOOLBAR
          ================================================================= */}
      <nav aria-label="Owner and strategic utilities" className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-medium">
              <Sparkles className="w-3 h-3 text-[#E8268F]" />
              Merchant Portal
            </span>
            <label className="cursor-pointer text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors underline">
              <Upload className="w-3.5 h-3.5 text-pink-400" />
              <span>{customLogoUrl ? `Logo Loaded: ${logoFileName || 'Custom'}` : 'Upload & Test Your Brand Logo'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </label>
            {customLogoUrl && (
              <button 
                onClick={() => setCustomLogoUrl(null)} 
                className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors ml-1"
              >
                (Reset)
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={() => { setSoundEnabled(!soundEnabled); if (!soundEnabled) playChime(); }}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              title={soundEnabled ? "Mute interactive chimes" : "Enable interactive sound effects"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Chime On' : 'Chime Off'}</span>
            </button>

            <button
              onClick={() => { playChime(); setShowVideoShoppingModal(true); }}
              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded font-medium flex items-center gap-1 transition-colors border border-emerald-500/40"
            >
              <Video className="w-3 h-3" />
              <span>NRI Video Shopping</span>
            </button>

            <button
              onClick={() => { playChime(); setShowExportModal(true); }}
              className="px-2.5 py-1 bg-[#E8268F] hover:bg-[#D0187B] text-white rounded font-medium flex items-center gap-1 transition-colors"
            >
              <Download className="w-3 h-3" />
              Single-File HTML
            </button>

            <button
              onClick={() => { playChime(); setShowPublishGuide(true); }}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors hidden sm:flex"
            >
              <Info className="w-3.5 h-3.5 text-pink-400" />
              Free Hosting
            </button>
          </div>
        </div>
      </nav>

      {/* =================================================================
          TOP BRAND STRIP: S.M. STREET KOZHIKODE, LIVE HOURS & NRI HOTLINE
          ================================================================= */}
      <div className="bg-gradient-to-r from-pink-950 via-[#E8268F] to-pink-950 text-white text-xs py-2 px-4 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 relative z-10">
          
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-xs text-white">
              <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-300'}`}></span>
              <span>{storeStatus.statusText}</span>
            </div>
            <span className="hidden sm:inline text-pink-100">{storeStatus.subText}</span>
            <span className="hidden md:inline text-pink-200">·</span>
            <span className="hidden md:inline text-pink-100">2 Stores: S.M. Street & Pantheeramkavu, Kozhikode</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium">
            <button
              onClick={() => { playChime(); setShowVideoShoppingModal(true); }}
              className="text-emerald-200 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full transition-colors"
            >
              <Video className="w-3 h-3 text-emerald-300" />
              <span>Live Video Shopping</span>
            </button>

            <span className="hidden lg:inline text-pink-200">|</span>
            <a href="tel:+917907141419" className="hover:underline flex items-center gap-1">
              📞 79071 41419
            </a>
          </div>

        </div>
      </div>

      {/* =================================================================
          PREMIUM 3D STICKY NAVIGATION BAR WITH GLASSMORPHISM & MICRO-INTERACTIONS
          ================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-100/80 shadow-md shadow-pink-950/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* 3D Interactive Logo Lockup with Spring Hover & Specular Depth */}
          <a href="#home" onClick={playChime} className="flex items-center gap-3.5 group">
            <motion.div 
              style={{ perspective: 1000 }}
              whileHover={{ rotateY: 15, rotateX: -6, scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#E8268F] to-amber-400 opacity-60 blur-xs group-hover:opacity-100 transition-opacity"></div>
              {customLogoUrl ? (
                <img 
                  src={customLogoUrl} 
                  alt="Colour Plus Logo" 
                  className="relative h-12 w-12 object-contain rounded-full shadow-md ring-2 ring-pink-200 bg-white p-0.5" 
                />
              ) : (
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#E8268F] via-pink-600 to-amber-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-pink-500/25 ring-2 ring-white transition-transform">
                  <span className="font-display tracking-wider drop-shadow-sm">C+</span>
                </div>
              )}
            </motion.div>
            
            <div className="flex flex-col">
              <span className="font-display text-2xl text-[#E8268F] tracking-tight leading-none group-hover:text-pink-700 transition-colors flex items-center gap-1.5">
                Colour Plus
                <Sparkles className="w-3.5 h-3.5 text-amber-500 opacity-80 group-hover:rotate-45 transition-transform" />
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-1">
                The Ocean of Garments · Kozhikode
              </span>
            </div>
          </a>

          {/* 3D Elevated Navigation Links with Smooth Hover Indicator */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700">
            {[
              { id: 'home', label: 'Home' },
              { id: 'gallery', label: '3D Gallery' },
              { id: 'collections', label: 'Lookbook' },
              { id: 'finder', label: 'Outfit Finder' },
              { id: 'experience', label: 'Boutique Lounge' },
              { id: 'about', label: 'Since 1998' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'contact', label: 'Stores & Map' }
            ].map((navItem) => (
              <motion.a
                key={navItem.id}
                href={`#${navItem.id}`}
                onClick={playChime}
                whileHover={{ y: -2.5, scale: 1.02 }}
                whileTap={{ y: 0 }}
                className="hover:text-[#E8268F] transition-colors py-1.5 px-2 relative group text-xs font-semibold uppercase tracking-wider"
              >
                {navItem.label}
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#E8268F] to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Action CTAs with 3D Depth */}
          <div className="hidden sm:flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { playChime(); setShowSizeGuideModal(true); }}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#E8268F] bg-slate-100/80 hover:bg-pink-50 rounded-xl transition-all border border-slate-200 shadow-2xs flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              Size Guide
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href="tel:+917907141419"
              onClick={playChime}
              className="px-3.5 py-2 text-xs font-semibold text-[#E8268F] bg-pink-50 hover:bg-pink-100/90 rounded-xl transition-all border border-pink-200/80 shadow-2xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/917907141419?text=Hello%20Colour%20Plus,%20I%20would%20like%20to%20know%20more%20about%20your%20clothing%20collections."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { triggerConfetti(); }}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#E8268F] to-pink-600 hover:from-pink-600 hover:to-[#D0187B] rounded-xl transition-all shadow-md shadow-pink-500/25 flex items-center gap-1.5 shine-effect border border-pink-400/30"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Us
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => { playChime(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="xl:hidden p-2 text-slate-600 hover:text-[#E8268F] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Dropdown with 3D Slide */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 px-6 pt-3 pb-6 shadow-2xl"
            >
              <div className="flex flex-col space-y-2.5 text-sm font-semibold text-slate-800">
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Home</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between text-[#E8268F]">
                  <span>✨ 3D Garments Gallery</span> <ChevronRight className="w-4 h-4 text-[#E8268F]" />
                </a>
                <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Garment Lookbook</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#finder" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Smart Outfit Finder</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Boutique Experience & Trial</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Since 1998 (Our Story)</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Customer Reviews</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#E8268F] py-2 flex items-center justify-between">
                  <span>Contact & Store Map (2 Branches)</span> <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-pink-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setShowVideoShoppingModal(true); setMobileMenuOpen(false); }}
                  className="text-center py-2.5 px-3 bg-emerald-50 text-emerald-800 font-semibold rounded-xl text-xs border border-emerald-200 flex items-center justify-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-600" /> Video Tour
                </button>
                <a
                  href="https://wa.me/917907141419?text=Hello%20Colour%20Plus!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2.5 px-3 bg-[#E8268F] text-white font-semibold rounded-xl text-xs shadow-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =================================================================
          KASAVU GOLD SHIMMER RIBBON & FESTIVAL CELEBRATION MODE BAR
          ================================================================= */}
      <div className="h-1 kasavu-gold-ribbon w-full"></div>
      <div className="bg-gradient-to-r from-pink-50/90 via-white to-pink-50/90 border-b border-pink-100 py-2.5 px-4 shadow-2xs relative z-20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8268F]"></span>
            </span>
            <span className="text-[#E8268F] font-bold uppercase tracking-wider text-[11px]">Celebration Mode:</span>
            <span className="hidden md:inline text-slate-500 font-normal">Choose your shopping theme for live styling & music</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Season Boutique', icon: '✨' },
              { id: 'onam', label: 'Onam & Vishu', icon: '🌼' },
              { id: 'eid', label: 'Eid Mubarak', icon: '🌙' },
              { id: 'wedding', label: 'Wedding Specials', icon: '💍' }
            ].map((season) => (
              <motion.button
                key={season.id}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveSeason(season.id as FestivalSeason);
                  playFestiveChime();
                  triggerConfetti();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSeason === season.id
                    ? 'bg-[#E8268F] text-white shadow-md shadow-pink-500/25 ring-2 ring-pink-200'
                    : 'bg-white hover:bg-pink-100/70 text-slate-700 border border-pink-200/80 shadow-2xs'
                }`}
              >
                <span>{season.icon}</span>
                <span>{season.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* =================================================================
          HERO SECTION: 3D ANIMATIONS & SCROLLTIDE PERSPECTIVE SHOWCASE
          ================================================================= */}
      <section 
        id="home" 
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-b from-pink-50/80 via-white to-pink-50/40 pt-10 pb-20 lg:pt-16 lg:pb-32 border-b border-pink-100"
      >
        
        {/* Scrolltide Ambient Floating Orbs in Background */}
        <motion.div 
          style={{ y: heroOrbTranslateY }}
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/50 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          style={{ y: heroOrbTranslateY }}
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-200/35 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline with Scrolltide Parallax */}
            <motion.div 
              style={{ y: heroTextY }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {/* 3D Elevated Trust Badge with Pulsing Ring */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200/80 shadow-xs text-xs text-[#E8268F] font-bold tracking-wide backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8268F]"></span>
                  </span>
                  Direct Retail Family Boutique · Over 25+ Golden Years on S.M. Street
                </div>

                {/* Dynamic Festive Season Alert Badge */}
                {activeSeason !== 'all' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold text-xs shadow-md shadow-pink-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>
                      {activeSeason === 'onam' && '🌼 Onam & Vishu Kasavu Edition Active!'}
                      {activeSeason === 'eid' && '🌙 Eid Mubarak Designer Silks Active!'}
                      {activeSeason === 'wedding' && '💍 Wedding Trousseau Special Active!'}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Creative Staggered Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                <motion.span 
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="block font-display text-[#E8268F] text-5xl sm:text-6xl lg:text-7xl mb-2 drop-shadow-xs"
                >
                  Colour Plus
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-slate-900 block"
                >
                  The Ocean of Garments
                </motion.span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Kozhikode’s premier family fashion boutique on the historic <strong className="text-slate-900 font-semibold">S.M. Street (Mittai Theruvu)</strong> and <strong className="text-slate-900 font-semibold">Pantheeramkavu</strong> bypass. We handpick every single piece with pure fabrics and fair prices—exclusively for individual families, infants, kids, and ladies.
              </p>

              {/* Retail Promise Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-100/60 rounded-xl border border-pink-200/70 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#E8268F]" />
                <span>100% Retail Family Shopping · Direct Boutique Selection · Handcrafted Quality for Every Wardrobe</span>
              </div>

              {/* Main 3D Animated CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+917907141419"
                  onClick={playChime}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#E8268F] to-pink-600 hover:from-pink-600 hover:to-[#D0187B] rounded-xl shadow-lg shadow-pink-500/25 transition-all flex items-center gap-2 shine-effect border border-pink-300/30"
                >
                  <Phone className="w-5 h-5" />
                  Call Now (79071 41419)
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/917907141419?text=Hello%20Colour%20Plus!%20I%20am%20visiting%20your%20shop%20at%20S.M.%20Street%20and%20want%20to%20know%20about%20your%20latest%20arrivals."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  WhatsApp Us
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { playChime(); setShowVideoShoppingModal(true); }}
                  className="px-5 py-3.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4 text-emerald-600" />
                  Video Shopping (NRI/Gulf)
                </motion.button>
              </div>

              {/* Direct Store Lines with 3D hover bounce */}
              <div className="pt-3 border-t border-pink-100">
                <p className="text-xs text-slate-500 mb-2 font-medium">Direct Store Lines for Quick Assistance:</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                  {[
                    { number: '79071 41419', label: 'Helpline / Video' },
                    { number: '98953 38544', label: 'S.M. Street Line' },
                    { number: '99614 21201', label: 'Pantheeramkavu Line' }
                  ].map((phone) => (
                    <motion.a 
                      key={phone.number}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:+91${phone.number.replace(/\s+/g, '')}`} 
                      className="px-3 py-1.5 bg-white border border-pink-200 rounded-xl text-slate-700 hover:text-[#E8268F] hover:border-[#E8268F] transition-all font-medium flex items-center gap-1.5 shadow-2xs"
                    >
                      <Phone className="w-3 h-3 text-[#E8268F]" /> 
                      <span className="font-semibold">{phone.number}</span>
                      <span className="text-[10px] text-slate-400">({phone.label})</span>
                    </motion.a>
                  ))}
                </div>
              </div>

            </motion.div>

            {/* Right Visual Showcase with Scrolltide 3D Tilt & Multi-Layer Depth */}
            <motion.div 
              style={{
                rotateX: heroCardRotateX,
                rotateY: heroCardRotateY,
                scale: heroCardScale,
                perspective: 1200,
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none" style={{ transformStyle: 'preserve-3d' }}>
                
                {/* 3D Floating Badge 1: 🌊 The Ocean of Garments (Z-Index + 3D Transform) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: 'translateZ(50px)' }}
                  className="absolute -top-5 -left-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-pink-200 text-xs font-bold text-[#E8268F] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>🌊 The Ocean of Garments</span>
                </motion.div>

                {/* 3D Floating Badge 2: S.M. Street & Pantheeramkavu (Z-Index + 3D Transform) */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  style={{ transform: 'translateZ(40px)' }}
                  className="absolute -bottom-4 -right-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-pink-200 text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-[#E8268F]" />
                  <span>S.M. Street & Pantheeramkavu</span>
                </motion.div>

                {/* Interactive 3D Perspective Tilt Card with Specular Glare */}
                <TiltCard className="relative bg-white p-3.5 rounded-3xl shadow-2xl border border-pink-200/90 group" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50" style={{ transform: 'translateZ(20px)' }}>
                    <img
                      src={heroGarmentsImg}
                      alt="Colour Plus - The Ocean of Garments S.M. Street Kozhikode"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#E8268F] shadow-sm uppercase tracking-wider">
                      Since 1998
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div>
                        <p className="font-bold text-sm drop-shadow-sm">Festive & Everyday Elegance</p>
                        <p className="text-pink-200 text-[11px]">Infants, Kids (0-12y) & Women</p>
                      </div>
                      <span className="bg-[#E8268F] px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        Kozhikode
                      </span>
                    </div>
                  </div>

                  {/* Brand & VIP Action Inset Card */}
                  <div className="mt-3.5 p-3.5 bg-gradient-to-r from-pink-50/90 to-white rounded-2xl border border-pink-100 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center gap-3">
                      {customLogoUrl ? (
                        <img src={customLogoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-full bg-white p-0.5 border border-pink-200 shadow-xs" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E8268F] to-amber-500 text-white font-display flex items-center justify-center text-lg font-bold shadow-xs">
                          C+
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-800">Colour Plus Kozhikode</p>
                        <p className="text-[11px] text-slate-500">Mittai Theruvu · Kerala - 673001</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => { triggerConfetti(); setShowPrivilegeModal(true); }}
                      className="text-xs font-semibold text-[#E8268F] bg-white border border-pink-200 hover:bg-pink-100 px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors shadow-2xs"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#E8268F]" />
                      VIP Club
                    </motion.button>
                  </div>
                </TiltCard>

              </div>
            </motion.div>

          </div>
        </div>

        {/* Silky Undulating "Ocean of Garments" Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none select-none">
          <svg className="w-[200%] h-full animate-silk-wave text-white fill-current opacity-95" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C150,90 350,10 500,60 C650,110 900,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* =================================================================
          ANIMATED STATS & CREDIBILITY COUNTER STRIP
          ================================================================= */}
      <section className="bg-white py-10 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <motion.div 
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 transition-all flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E8268F] flex items-center justify-center mb-2 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                <AnimatedCounter end={25} suffix="+" />
              </span>
              <p className="text-xs font-semibold text-slate-700 mt-1">Years on S.M. Street</p>
              <p className="text-[11px] text-slate-500">Continuous family trust since 1998</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 transition-all flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E8268F] flex items-center justify-center mb-2 shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                <AnimatedCounter end={100} suffix="k+" />
              </span>
              <p className="text-xs font-semibold text-slate-700 mt-1">Happy Shoppers</p>
              <p className="text-[11px] text-slate-500">Generations of Kozhikode families</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 transition-all flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E8268F] flex items-center justify-center mb-2 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                <AnimatedCounter end={100} suffix="%" />
              </span>
              <p className="text-xs font-semibold text-slate-700 mt-1">Pure Fabric Quality</p>
              <p className="text-[11px] text-slate-500">Non-toxic skin-safe dyes</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 transition-all flex flex-col items-center"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#E8268F] flex items-center justify-center mb-2 shadow-xs">
                <Video className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-600 font-sans">Live</span>
              <p className="text-xs font-semibold text-slate-700 mt-1">Video Call Shopping</p>
              <p className="text-[11px] text-slate-500">Walk the racks from Gulf / NRI home</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =================================================================
          3D INTERACTIVE GARMENTS GALLERY & LOOKBOOK SHOWCASE
          ================================================================= */}
      <section 
        id="gallery" 
        ref={galleryRef}
        className="py-16 sm:py-28 bg-gradient-to-b from-pink-50/50 via-white to-pink-50/40 border-b border-pink-100 relative overflow-hidden"
      >
        {/* Anchor point for #collections */}
        <div id="collections" className="-mt-24 pt-24 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pink-200/90 text-[#E8268F] font-bold text-xs uppercase tracking-widest shadow-2xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>3D Interactive Boutique Gallery</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Garment Lookbook in 3D
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              Hover to tilt cards in 3D perspective, preview real fabric shade families with color swatches, and easily enquire directly on WhatsApp.
            </p>

            {/* Filter Tabs with 3D Depth */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'All Curated Outfits', count: products.length },
                { id: 'boys', label: "Boys' (0-12 Years)", count: products.filter(p => p.category === 'boys').length },
                { id: 'girls', label: "Girls' (All Ages)", count: products.filter(p => p.category === 'girls').length },
                { id: 'ladies', label: "Ladies' Kurtis & Gowns", count: products.filter(p => p.category === 'ladies').length }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { playChime(); setActiveTab(tab.id as 'all' | 'boys' | 'girls' | 'ladies'); }}
                  className={`px-4 py-2.5 text-xs font-bold rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-2xs ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#E8268F] to-pink-600 text-white shadow-md shadow-pink-500/25 ring-2 ring-pink-200'
                      : 'bg-white text-slate-700 hover:bg-pink-50 border border-pink-200/80 hover:border-pink-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#E8268F]'}`}>
                    {tab.count}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 3D Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const selectedColor = product.colors[activeColorIndex[product.id] || 0];
              return (
                <TiltCard
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-pink-100/90 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between"
                  style={{ borderTopColor: selectedColor, borderTopWidth: '4px', transformStyle: 'preserve-3d' }}
                >
                  <div>
                    {/* Visual Card Image with 3D Depth Floating Tags */}
                    <div 
                      className="relative aspect-[4/3] bg-pink-100 overflow-hidden cursor-pointer" 
                      onClick={() => { playChime(); setSelectedProduct(product); }}
                      style={{ transform: 'translateZ(15px)' }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                      <div 
                        className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#E8268F] shadow-sm flex items-center gap-1.5"
                        style={{ transform: 'translateZ(30px)' }}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{product.ageGroup}</span>
                      </div>

                      {product.festive && (
                        <div 
                          className="absolute top-3.5 right-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md uppercase tracking-wider flex items-center gap-1"
                          style={{ transform: 'translateZ(30px)' }}
                        >
                          <Sparkles className="w-3 h-3 text-amber-200" />
                          Festive Special
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-bold text-[#E8268F] uppercase tracking-wider text-[11px]">
                          {product.category === 'boys' ? "Boys' Department" : product.category === 'girls' ? "Girls' Department" : "Ladies' Department"}
                        </span>
                        
                        {/* Interactive Color Swatches */}
                        <div className="flex items-center gap-1.5" title="Available Color Highlights">
                          {product.colors.map((c, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                playChime();
                                setActiveColorIndex({ ...activeColorIndex, [product.id]: idx });
                              }}
                              className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                                (activeColorIndex[product.id] || 0) === idx ? 'scale-125 ring-2 ring-[#E8268F] ring-offset-1' : 'hover:scale-110 opacity-75'
                              }`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>

                      <h3 
                        onClick={() => { playChime(); setSelectedProduct(product); }}
                        className="text-lg font-bold text-slate-900 group-hover:text-[#E8268F] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {product.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] font-semibold bg-pink-50 text-slate-700 px-2.5 py-1 rounded-lg border border-pink-100/90">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100/90 mt-4 flex items-center gap-2.5">
                    <button
                      onClick={() => { playChime(); setSelectedProduct(product); }}
                      className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Details</span>
                    </button>

                    <a
                      href={`https://wa.me/917907141419?text=${encodeURIComponent(`Hello Colour Plus! I am interested in: ${product.name} (${product.ageGroup}). Please share available sizes and colors.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => { triggerConfetti(); }}
                      className="flex-1 py-2.5 px-3 bg-gradient-to-r from-[#E8268F] to-pink-600 hover:from-pink-600 hover:to-[#D0187B] text-white text-xs font-bold rounded-xl text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-pink-500/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </TiltCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* =================================================================
          INTERACTIVE SMART OUTFIT FINDER
          ================================================================= */}
      <section id="finder" className="py-16 sm:py-20 bg-white border-b border-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-pink-50 via-white to-pink-50 border border-pink-200 shadow-md relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-pink-200 rounded-full text-xs font-bold text-[#E8268F] mb-2 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Interactive Shopping Assistant
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Find Your Perfect Outfit in 3 Steps
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Answer 3 quick questions to get personalized recommendations tailored to your upcoming celebration or daily need.
              </p>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${finderStep >= 1 ? 'bg-[#E8268F] text-white' : 'bg-slate-200 text-slate-600'}`}>1</div>
              <div className="w-8 h-0.5 bg-pink-200"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${finderStep >= 2 ? 'bg-[#E8268F] text-white' : 'bg-slate-200 text-slate-600'}`}>2</div>
              <div className="w-8 h-0.5 bg-pink-200"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${finderStep === 3 ? 'bg-[#E8268F] text-white' : 'bg-slate-200 text-slate-600'}`}>3</div>
            </div>

            {/* Quiz Step 1 */}
            {finderStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 text-center uppercase tracking-wide">
                  Step 1: Who is this garment for?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { playChime(); setFinderTarget('boys'); setFinderStep(2); }}
                    className="p-4 rounded-xl border-2 border-pink-200 hover:border-[#E8268F] bg-white hover:bg-pink-50/50 transition-all text-center group"
                  >
                    <span className="text-2xl mb-1 block">👦</span>
                    <strong className="block text-sm text-slate-900 group-hover:text-[#E8268F]">Boys' Clothing</strong>
                    <span className="text-xs text-slate-500">Ages 0 to 12 Years</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { playChime(); setFinderTarget('girls'); setFinderStep(2); }}
                    className="p-4 rounded-xl border-2 border-pink-200 hover:border-[#E8268F] bg-white hover:bg-pink-50/50 transition-all text-center group"
                  >
                    <span className="text-2xl mb-1 block">👧</span>
                    <strong className="block text-sm text-slate-900 group-hover:text-[#E8268F]">Girls' Clothing</strong>
                    <span className="text-xs text-slate-500">All Ages (Babies to Teens)</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { playChime(); setFinderTarget('ladies'); setFinderStep(2); }}
                    className="p-4 rounded-xl border-2 border-pink-200 hover:border-[#E8268F] bg-white hover:bg-pink-50/50 transition-all text-center group"
                  >
                    <span className="text-2xl mb-1 block">👗</span>
                    <strong className="block text-sm text-slate-900 group-hover:text-[#E8268F]">Ladies' Wear</strong>
                    <span className="text-xs text-slate-500">Kurtis, Gowns, Dresses</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Quiz Step 2 */}
            {finderStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 text-center uppercase tracking-wide">
                  Step 2: What occasion are you dressing for?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Festive & Weddings (Eid / Onam / Pooja)', 'Casual & School Daily Wear', 'Birthday / Party Celebration'].map((occ) => (
                    <motion.button
                      key={occ}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { playChime(); triggerConfetti(); setFinderOccasion(occ); setFinderStep(3); }}
                      className="p-4 rounded-xl border-2 border-pink-200 hover:border-[#E8268F] bg-white hover:bg-pink-50/50 transition-all text-center group"
                    >
                      <strong className="block text-sm text-slate-900 group-hover:text-[#E8268F]">{occ}</strong>
                      <span className="text-xs text-slate-500 mt-1 block">Click to select</span>
                    </motion.button>
                  ))}
                </div>
                <div className="text-center pt-2">
                  <button onClick={() => { playChime(); setFinderStep(1); }} className="text-xs text-slate-500 hover:underline">
                    ← Back to step 1
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quiz Step 3 */}
            {finderStep === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-2xl border border-pink-200 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Recommended Match Ready at Colour Plus!</h4>
                  <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                    Based on your selection for <strong className="text-slate-900">{finderTarget.toUpperCase()}</strong> for <strong className="text-slate-900">{finderOccasion}</strong>, our S.M. Street store has over 40+ curated designs in pure cotton and festive weaves.
                  </p>
                </div>

                <div className="p-4 bg-pink-50 rounded-xl border border-pink-200 text-xs text-slate-700 max-w-md mx-auto flex items-center justify-between">
                  <span>Target: <strong>{finderTarget}</strong></span>
                  <span>Occasion: <strong>{finderOccasion}</strong></span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/917907141419?text=${encodeURIComponent(`Hello Colour Plus! I completed the Smart Outfit Finder on your website. I am looking for ${finderTarget} clothing for ${finderOccasion}. Can you share photos of available options?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={triggerConfetti}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send Match Query to WhatsApp
                  </motion.a>

                  <button
                    onClick={() => { playChime(); setFinderStep(1); }}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Restart Finder
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* =================================================================
          SECTION: EXCLUSIVE FAMILY BOUTIQUE EXPERIENCE & FITTING LOUNGE
          ================================================================= */}
      <section id="experience" className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-pink-950 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8268F]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                The Colour Plus Family Experience · Retail Excellence
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Why Calicut Families Cherish Shopping with Us
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As a beloved destination on historic S.M. Street since 1998 and Pantheeramkavu bypass, <strong className="text-white">Colour Plus</strong> is dedicated exclusively to individual family wardrobes. Every dress, kurta, and frock on our racks is handpicked with motherly care.
              </p>

              {/* 4 Pillars of the Boutique Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-0.5">100% Skin-Safe & Non-Toxic</strong>
                    Soft combed cotton linings designed for Kerala weather—zero heat rash and zero itchiness for babies and kids.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors flex items-start gap-3">
                  <Heart className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-0.5">Individual Handpicked Pieces</strong>
                    Every outfit is uniquely curated for your child and family. We focus exclusively on personal family collections and festive wardrobes.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors flex items-start gap-3">
                  <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-0.5">In-Store Trial & Alterations</strong>
                    Spacious family fitting rooms with on-spot sleeve, waist, and length adjustments by our in-house master tailors.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors flex items-start gap-3">
                  <Video className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-sm mb-0.5">NRI Live Video Walkthrough</strong>
                    Personal 1-on-1 WhatsApp video shopping for Gulf families in the UAE, Saudi, Qatar & Oman with swift home courier.
                  </div>
                </div>
              </div>

              {/* Retail Promise Note */}
              <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-200 text-xs flex items-center gap-2.5">
                <Info className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  <strong>Retail Boutique Promise:</strong> We cater exclusively to individual retail families, parents, and festival celebrations with personalized attention and custom sizing support.
                </span>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { playChime(); setShowVideoShoppingModal(true); }}
                  className="px-6 py-3.5 bg-[#E8268F] hover:bg-[#D0187B] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 shine-effect"
                >
                  <Video className="w-4 h-4" />
                  Book Live Video Tour
                </motion.button>

                <a
                  href="https://wa.me/917907141419?text=Hello%20Colour%20Plus,%20I%20am%20looking%20for%20special%20family%20festive%20wear%20and%20would%20like%20guidance."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors border border-white/20 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Chat with Personal Stylist
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ y: -5, rotateY: 5 }}
                className="bg-white/10 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-white/20 max-w-sm w-full space-y-5 shadow-2xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8268F]/30 text-pink-300 flex items-center justify-center font-bold text-xl ring-2 ring-pink-400/40">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">The Boutique Promise</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Generations of Kozhikode parents bring their children to Colour Plus because every garment is inspected for softness, vibrant festival colours, and honest value."
                </p>

                <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Retail Specialization:</span>
                    <strong className="text-white">Kids (0-12y) & Women</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fitting Assistance:</span>
                    <strong className="text-emerald-400">Complimentary</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Direct Hotline:</span>
                    <strong className="text-pink-300">+91 79071 41419</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Heritage Trust:</span>
                    <strong className="text-amber-300">Since 1998 (25+ Years)</strong>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =================================================================
          SECTION 3: ABOUT US & HERITAGE (Since 1998)
          ================================================================= */}
      <section id="about" className="py-16 sm:py-24 bg-white border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#E8268F] font-semibold text-xs tracking-widest uppercase">Our Heritage & Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Serving Kozhikode with Love & Style Since 1998
            </h2>
            <div className="ornamental-divider my-4">
              <span className="font-script text-2xl text-[#E8268F]">Colour Plus S.M. Street</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-slate-600 leading-relaxed text-base sm:text-lg">
              <p>
                <strong className="text-slate-900 font-semibold">Colour Plus</strong> was founded on the historic <strong className="text-slate-900 font-semibold">S.M. Street (Mittai Theruvu)</strong> in Kozhikode in <strong className="text-[#E8268F] font-semibold">1998</strong>. For over a quarter century, our store has stood as a beloved landmark where families from all across Calicut and Malabar come to purchase the happiest clothes for their children and women.
              </p>
              <p>
                Known popularly as <span className="font-script text-2xl text-[#E8268F] font-bold">"The Ocean of Garments"</span>, we maintain an exhaustive variety so that every customer walks away delighted. Whether you need an infant gift set, trendy boys polo tees, sparkling party frocks, or sophisticated designer kurtis, you will discover uncompromised quality at prices that respect your hard-earned money.
              </p>
              <p>
                Our philosophy is simple: <strong className="text-slate-900 font-semibold">honesty, hospitality, and pure fabric comfort</strong>. That is why grandparents who shopped with us in 1998 now bring their grandchildren to Colour Plus today.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ rotateY: 5, scale: 1.02 }}
                className="relative w-full max-w-sm"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#E8268F] to-pink-700 text-white shadow-xl text-center relative overflow-hidden">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white text-[#E8268F] font-display text-3xl font-bold flex items-center justify-center shadow-lg mb-4 ring-4 ring-pink-300/40">
                    C+
                  </div>

                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-xs rounded-full text-xs font-semibold tracking-widest uppercase mb-2">
                    Historic Boutique
                  </span>

                  <h3 className="text-3xl font-bold mb-1">Established 1998</h3>
                  <p className="font-script text-2xl text-pink-100 mb-4">S.M. Street · Mittai Theruvu</p>

                  <div className="h-0.5 w-16 bg-pink-200/50 mx-auto my-4"></div>

                  <p className="text-xs text-pink-50 leading-relaxed font-light">
                    "Dressing Calicut's precious celebrations with vibrant colours, gentle fabrics, and timeless comfort for over a quarter of a century."
                  </p>

                  <div className="mt-6 flex flex-col gap-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-[#E8268F] rounded-xl font-semibold text-xs hover:bg-pink-50 transition-colors shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      Get Directions to S.M. Street
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          CUSTOMER REVIEWS
          ================================================================= */}
      <section id="reviews" className="py-16 sm:py-24 bg-pink-50/30 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#E8268F] font-semibold text-xs tracking-widest uppercase">Verified Customer Experiences</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Loved by Kozhikode & NRI Families
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Real testimonials from shoppers who trust Colour Plus year after year for festivals and weddings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div whileHover={{ y: -6 }} className="bg-white p-7 rounded-2xl border border-pink-100 shadow-xs hover:shadow-lg transition-all relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Verified Shopper
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "We have been buying Eid and birthday dresses for my children here for over 10 years. Colour Plus is always our first stop on S.M. Street! Excellent quality materials that remain soft even after repeated washes."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E8268F] font-bold text-sm flex items-center justify-center">
                  FA
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Fathima Asharaf</p>
                  <p className="text-[11px] text-slate-500">Mankavu, Kozhikode · 10+ Yr Customer</p>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="bg-white p-7 rounded-2xl border border-pink-100 shadow-xs hover:shadow-lg transition-all relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Video Shopper
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "Shopping from Dubai for my sister's wedding in Calicut was effortless! The team did a WhatsApp video call, showed kurtis and festive gowns in real lighting, and packed everything with love."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E8268F] font-bold text-sm flex items-center justify-center">
                  SN
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Sneha Nambiar</p>
                  <p className="text-[11px] text-slate-500">Sharjah, UAE / Nadakkavu</p>
                </div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="bg-white p-7 rounded-2xl border border-pink-100 shadow-xs hover:shadow-lg transition-all relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3" /> Family Shopper
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "We bought matching festive attire for our entire family for Eid and family weddings. The fabric softness for our 4-year-old was unbelievable—no itching all day, and the ladies' kurtis fit like tailor-made boutique wear."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-[#E8268F] font-bold text-sm flex items-center justify-center">
                  FZ
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Fathima Zahra</p>
                  <p className="text-[11px] text-slate-500">Mankavu, Kozhikode · Mother of Two</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =================================================================
          CONTACT, STORE DIRECTIONS & LIVE MAP
          ================================================================= */}
      <section id="contact" className="py-16 sm:py-24 bg-pink-50/50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[#E8268F] font-semibold text-xs tracking-widest uppercase">Plan Your Visit or Inquiry</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Our Kozhikode Stores & Direct Contact
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Serving you at two prime Calicut locations: our historic S.M. Street flagship and our convenient Pantheeramkavu bypass branch.
            </p>

            {/* Interactive Branch Switcher Tabs */}
            <div className="mt-6 inline-flex p-1.5 bg-white border border-pink-200 rounded-2xl shadow-xs gap-2">
              {STORE_BRANCHES.map((branch) => {
                const isActive = selectedBranchId === branch.id;
                return (
                  <button
                    key={branch.id}
                    onClick={() => {
                      setSelectedBranchId(branch.id);
                      setFormData(prev => ({
                        ...prev,
                        branch: branch.name
                      }));
                      playChime();
                    }}
                    className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#E8268F] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50'
                    }`}
                  >
                    <MapPin className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E8268F]'}`} />
                    <span>{branch.shortName}</span>
                    <span className={`hidden md:inline text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-pink-100 text-[#E8268F]'
                    }`}>
                      {branch.id === 'sm-street' ? 'Flagship' : 'Branch 2'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Address & 3 Direct Call Buttons */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E8268F] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        {activeBranch.shortName}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#E8268F]">
                        {activeBranch.badge}
                      </span>
                    </div>
                    <div className="text-slate-700 text-sm mt-1.5 leading-relaxed">
                      {activeBranch.addressLines.map((line, idx) => (
                        <p key={idx} className={idx === 0 ? "font-semibold text-slate-900" : ""}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Landmark:</span> {activeBranch.landmark}
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${activeBranch.mapsQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#E8268F] hover:underline mt-2.5"
                    >
                      Open {activeBranch.shortName} in Google Maps <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E8268F] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Opening Hours</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        storeStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {storeStatus.statusText}
                      </span>
                    </div>
                    <p className="text-slate-700 text-sm mt-1">
                      Monday to Sunday: <span className="font-semibold text-slate-900">10:00 AM – 9:00 PM</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Open during all festive shopping seasons.</p>
                  </div>
                </div>
              </div>

              {/* THREE DIRECT PHONES */}
              <div className="bg-white p-6 rounded-2xl border border-pink-100 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">
                  Store Direct Call Lines
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Tap any number below to connect with our counter directly:
                </p>

                <div className="space-y-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+917907141419"
                    className="p-3 rounded-xl bg-pink-50/60 hover:bg-pink-100 border border-pink-200 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#E8268F] text-white flex items-center justify-center text-sm font-bold">1</span>
                      <div>
                        <span className="text-xs text-slate-500 block">Primary Helpline / WhatsApp</span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#E8268F]">+91 79071 41419</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#E8268F] bg-white px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Call
                    </span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+919895338544"
                    className="p-3 rounded-xl bg-pink-50/60 hover:bg-pink-100 border border-pink-200 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#E8268F] text-white flex items-center justify-center text-sm font-bold">2</span>
                      <div>
                        <span className="text-xs text-slate-500 block">Store Line 2</span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#E8268F]">+91 98953 38544</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#E8268F] bg-white px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Call
                    </span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="tel:+919961421201"
                    className="p-3 rounded-xl bg-pink-50/60 hover:bg-pink-100 border border-pink-200 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#E8268F] text-white flex items-center justify-center text-sm font-bold">3</span>
                      <div>
                        <span className="text-xs text-slate-500 block">Store Line 3</span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#E8268F]">+91 99614 21201</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#E8268F] bg-white px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Call
                    </span>
                  </motion.a>
                </div>
              </div>

              {/* Parking Assistant dynamically tailored to selected branch */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#E8268F]" />
                  Visiting & Parking: {activeBranch.shortName}
                </p>
                <p className="leading-relaxed">
                  {activeBranch.parkingTip}
                </p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {activeBranch.highlights.map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white text-[11px] font-medium text-slate-700 border border-slate-200">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* WhatsApp Form & Map */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-pink-100 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">Send an Enquiry Directly to WhatsApp</h3>
                  <span className="text-xs font-medium text-[#E8268F]">Instant Malabar Support</span>
                </div>
                <p className="text-xs text-slate-500 mb-6">
                  Fill in your details below to instantly launch WhatsApp with your pre-formatted enquiry.
                </p>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="input-name" className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        placeholder="e.g. Rahul / Aisha"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] focus:ring-1 focus:ring-[#E8268F]"
                      />
                    </div>
                    <div>
                      <label htmlFor="input-phone" className="block text-xs font-medium text-slate-700 mb-1">Your Mobile Number *</label>
                      <input
                        id="input-phone"
                        type="tel"
                        required
                        placeholder="e.g. 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] focus:ring-1 focus:ring-[#E8268F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="select-collection" className="block text-xs font-medium text-slate-700 mb-1">Interested Collection</label>
                    <select
                      id="select-collection"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] focus:ring-1 focus:ring-[#E8268F] bg-white"
                    >
                      <option value="Boys' clothing (0-12 yrs)">Boys' Clothing (Age 0-12)</option>
                      <option value="Girls' clothing (All ages)">Girls' Clothing (All ages)</option>
                      <option value="Ladies Kurtis & Gowns">Ladies' Wear (Kurtis, Gowns, Dresses)</option>
                      <option value="Festive / Wedding Wear">Festive & Special Occasion Wear</option>
                      <option value="Family Festival Matching Sets">Family Festival Outfits & Kids Sets</option>
                      <option value="Store Visit & Directions">Store Directions / General Query</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="input-message" className="block text-xs font-medium text-slate-700 mb-1">Your Message or Query</label>
                    <textarea
                      id="input-message"
                      rows={3}
                      placeholder="Tell us what size, color or dress style you are looking for..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] focus:ring-1 focus:ring-[#E8268F]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp to Colour Plus (+91 79071 41419)
                  </motion.button>
                </form>
              </div>

              {/* EMBEDDED GOOGLE MAP OF S.M. STREET KOZHIKODE */}
              <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-xs overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E8268F]" />
                    Map: S.M. Street (Mittai Theruvu), Kozhikode
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">PIN: 673001</span>
                </div>
                <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-100 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0617327318725!2d75.77663431526487!3d11.249539292001402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6593a20e29b19%3A0xe5a3c0353c7cba2a!2sS.M.%20Street%2C%20Palayam%2C%20Kozhikode%2C%20Kerala%20673001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of S.M. Street Kozhikode"
                    className="w-full h-full"
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =================================================================
          SECTION 9: FOOTER
          ================================================================= */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {customLogoUrl ? (
                  <img src={customLogoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-full bg-white p-0.5" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#E8268F] text-white font-display text-lg flex items-center justify-center font-bold">
                    C+
                  </div>
                )}
                <div>
                  <span className="font-display text-2xl text-white">Colour Plus</span>
                  <p className="text-[11px] text-pink-400 uppercase tracking-widest font-medium">The Ocean of Garments</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trusted family garments shop on famous S.M. Street (Mittai Theruvu), Kozhikode since 1998. Curating quality garments for boys, girls, and women for over 25 years.
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-pink-300 rounded-full text-xs font-medium">
                  Established 1998 · Kozhikode
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#E8268F] transition-colors">Home</a></li>
                <li><a href="#gallery" className="hover:text-[#E8268F] transition-colors">3D Garments Gallery</a></li>
                <li><a href="#collections" className="hover:text-[#E8268F] transition-colors">Garments Lookbook</a></li>
                <li><a href="#finder" className="hover:text-[#E8268F] transition-colors">Smart Outfit Finder</a></li>
                <li><a href="#experience" className="hover:text-[#E8268F] transition-colors">Boutique Experience Lounge</a></li>
                <li><a href="#about" className="hover:text-[#E8268F] transition-colors">Since 1998 Heritage</a></li>
                <li><a href="#reviews" className="hover:text-[#E8268F] transition-colors">Customer Reviews</a></li>
                <li><a href="#contact" className="hover:text-[#E8268F] transition-colors">Store Directions & Map</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Our Store Locations</h4>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="border-b border-slate-800/80 pb-2">
                  <strong className="text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8268F]"></span>
                    Flagship Store (Since 1998):
                  </strong>
                  S.M. Street (Mittai Theruvu),<br />
                  Kozhikode - 673001, Kerala
                </li>
                <li className="border-b border-slate-800/80 pb-2">
                  <strong className="text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8268F]"></span>
                    Pantheeramkavu Branch:
                  </strong>
                  Pantheeramkavu, Bypass Access,<br />
                  Kozhikode - 673001, Kerala
                </li>
                <li>
                  <strong className="text-white block">Call Lines (Both Stores):</strong>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href="tel:+917907141419" className="hover:text-pink-300">📞 79071 41419 (Helpline / WhatsApp)</a>
                    <a href="tel:+919895338544" className="hover:text-pink-300">📞 98953 38544</a>
                    <a href="tel:+919961421201" className="hover:text-pink-300">📞 99614 21201</a>
                  </div>
                </li>
                <li className="pt-0.5">
                  <strong className="text-white block">Opening Hours:</strong>
                  10:00 AM – 9:00 PM (Daily at both locations)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Services</h4>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Connect directly for live NRI video shopping, custom sizing guidance, or festival outfit reservations.
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowVideoShoppingModal(true)}
                  className="px-3 py-1.5 bg-emerald-700/50 hover:bg-emerald-700 text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5" /> Book Video Tour
                </button>
                <button
                  onClick={() => setShowPrivilegeModal(true)}
                  className="px-3 py-1.5 bg-pink-700/50 hover:bg-pink-700 text-pink-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" /> VIP Pass
                </button>
              </div>

              <div className="mt-5">
                <a
                  href="https://wa.me/917907141419?text=Hello%20Colour%20Plus!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:underline"
                >
                  <span>Chat directly on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 1998 – {new Date().getFullYear()} Colour Plus. All rights reserved. The Ocean of Garments.</p>
            <p>S.M. Street (Mittai Theruvu) & Pantheeramkavu, Kozhikode, Kerala - 673001</p>
          </div>

        </div>
      </footer>

      {/* =================================================================
          FLOATING WHATSAPP CHAT BUTTON WITH MULTI-LAYER PULSE RINGS
          ================================================================= */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Animated Greeting Bubble */}
        <motion.a 
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="https://wa.me/917907141419?text=Hello%20Colour%20Plus,%20I%20am%20chatting%20from%20your%20website%20and%20have%20an%20enquiry." 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={triggerConfetti}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-white text-slate-800 text-xs font-semibold rounded-full shadow-lg border border-pink-100 hover:shadow-xl transition-all hover:text-[#E8268F]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>👋 Looking for festive wear? Chat with us!</span>
        </motion.a>

        {/* Concentric Pulse Rings & Circular WhatsApp Icon */}
        <div className="relative">
          <span className="absolute -inset-2 rounded-full bg-emerald-500 animate-pulse-ring pointer-events-none"></span>
          <motion.a 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/917907141419?text=Hello%20Colour%20Plus,%20I%20am%20chatting%20from%20your%20website%20and%20have%20an%20enquiry." 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Chat with Colour Plus on WhatsApp"
            onClick={triggerConfetti}
            className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-colors focus:outline-none ring-4 ring-white relative z-10"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.a>
        </div>
      </aside>

      {/* =================================================================
          MODAL: PRODUCT DETAILS & ENQUIRY
          ================================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-[#E8268F] uppercase tracking-wide">
                {selectedProduct.category} Department
              </span>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-700 text-xl font-bold">
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden bg-pink-50">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedProduct.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-pink-50/60 p-4 rounded-xl border border-pink-100">
              <div>
                <span className="text-slate-500 block">Age / Size Range:</span>
                <strong className="text-slate-900">{selectedProduct.ageGroup}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Fabric & Weave:</span>
                <strong className="text-slate-900">{selectedProduct.fabric}</strong>
              </div>
              <div className="col-span-2 pt-2 border-t border-pink-200/60">
                <span className="text-slate-500 block">Pricing Range:</span>
                <strong className="text-[#E8268F] font-semibold">{selectedProduct.priceEstimate}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/917907141419?text=${encodeURIComponent(`Hello Colour Plus! I am interested in: ${selectedProduct.name}. Do you have this currently in stock?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve / Check Stock on WhatsApp
              </a>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* =================================================================
          MODAL: LIVE VIDEO SHOPPING (For NRI & Gulf Families)
          ================================================================= */}
      {showVideoShoppingModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Live Video Shopping Tour</h3>
                  <p className="text-xs text-slate-500">Walk through S.M. Street racks live on WhatsApp</p>
                </div>
              </div>
              <button onClick={() => setShowVideoShoppingModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Ideal for Gulf NRIs (Dubai, Saudi, Qatar) and outstation families! One of our senior sales stylists will walk with you through our clothing racks via WhatsApp video call so you can see fabrics and colors in real-time.
            </p>

            <form onSubmit={handleVideoShoppingSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sujith / Reema"
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your WhatsApp Number (with Country Code) *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +971 50 123 4567 or +91 98765 43210"
                  value={videoPhone}
                  onChange={(e) => setVideoPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Garments You Want to See</label>
                <select
                  value={videoCategory}
                  onChange={(e) => setVideoCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] bg-white"
                >
                  <option value="Ladies Festive Wear & Kurtis">Ladies' Festive Kurtis & Party Gowns</option>
                  <option value="Boys Festive Dhotis & Kurtas">Boys' Festive Kurtas & Shirts (0-12 yrs)</option>
                  <option value="Girls Princess Frocks & Lehengas">Girls' Frocks & Lehengas</option>
                  <option value="Full Family Matching Outfits">Full Family Celebration Matching Outfits</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Time / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Today evening 5 PM IST"
                  value={videoDate}
                  onChange={(e) => setVideoDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                Schedule Video Call on WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* =================================================================
          MODAL: SIZE & FIT GUIDE
          ================================================================= */}
      {showSizeGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E8268F]" />
                <h3 className="text-base font-bold text-slate-900">Garment Sizing & Fit Reference</h3>
              </div>
              <button onClick={() => setShowSizeGuideModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-pink-50/70 rounded-xl border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-2">👦 Boys' Clothing (Age 0 to 12 Years)</h4>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded border"><strong>0-1 Y</strong><br />18 - 20" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>2-4 Y</strong><br />22 - 24" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>5-7 Y</strong><br />26 - 28" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>8-10 Y</strong><br />30" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>11-12 Y</strong><br />32 - 34" Chest</div>
                </div>
              </div>

              <div className="p-4 bg-pink-50/70 rounded-xl border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-2">👧 Girls' Frocks & Lehengas</h4>
                <p className="text-slate-600 mb-2">All our frocks feature soft elastic smocking or adjustable back tie strings to accommodate healthy growth.</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded border"><strong>Toddler</strong><br />Length 16 - 22"</div>
                  <div className="bg-white p-2 rounded border"><strong>4-7 Y</strong><br />Length 24 - 30"</div>
                  <div className="bg-white p-2 rounded border"><strong>8-11 Y</strong><br />Length 32 - 38"</div>
                  <div className="bg-white p-2 rounded border"><strong>Teen / 12+</strong><br />Length 40 - 46"</div>
                </div>
              </div>

              <div className="p-4 bg-pink-50/70 rounded-xl border border-pink-100">
                <h4 className="font-bold text-slate-900 mb-2">👗 Ladies' Kurtis & Gowns</h4>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[11px]">
                  <div className="bg-white p-2 rounded border"><strong>S</strong><br />36" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>M</strong><br />38" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>L</strong><br />40" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>XL</strong><br />42" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>XXL</strong><br />44" Chest</div>
                  <div className="bg-white p-2 rounded border"><strong>3XL/4XL</strong><br />46 - 48"</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSizeGuideModal(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Close Guide
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* =================================================================
          MODAL: PRIVILEGE CLUB / FESTIVE PERKS
          ================================================================= */}
      {showPrivilegeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-5 text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#E8268F] to-amber-400 text-white flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#E8268F] uppercase tracking-widest">VIP Customer Circle</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Colour Plus Privilege</h3>
              <p className="text-xs text-slate-600 mt-2">
                Join 5,000+ Kozhikode families enjoying 5% festive cashback, festival pre-bookings, and special birthday discounts.
              </p>
            </div>

            {!privilegeSignedUp ? (
              <div className="space-y-3 pt-2">
                <input
                  type="tel"
                  placeholder="Enter your WhatsApp number"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#E8268F] text-center"
                />
                <button
                  onClick={() => { triggerConfetti(); setPrivilegeSignedUp(true); }}
                  className="w-full py-3 bg-[#E8268F] hover:bg-[#D0187B] text-white font-semibold text-xs rounded-xl shadow-md transition-all shine-effect"
                >
                  Activate Free VIP Privilege Pass
                </button>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-medium">
                ✓ Congratulations! Your Colour Plus Privilege status is active. Show your mobile number at our S.M. Street billing counter for festive discounts!
              </div>
            )}

            <button onClick={() => setShowPrivilegeModal(false)} className="text-xs text-slate-400 hover:underline pt-2 block mx-auto">
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* =================================================================
          MODAL: EXPORT / COPY STANDALONE SINGLE-FILE HTML
          ================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#E8268F] flex items-center justify-center font-bold">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your Standalone Single-File index.html</h3>
                  <p className="text-xs text-slate-500">Ready to copy and run directly or host for free</p>
                </div>
              </div>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              We have generated your complete, standalone <code className="bg-slate-100 px-1 py-0.5 rounded text-[#E8268F]">index.html</code> file with all HTML, CSS, JavaScript, responsive mobile navigation, WhatsApp form, Google Maps, click-to-call buttons, and comments for easily updating your text or logo.
            </p>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900">Choose how you'd like to get it:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={copyStandaloneHtmlToClipboard}
                  className="py-2.5 px-4 bg-[#E8268F] hover:bg-[#D0187B] text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  {copiedCode ? "Copied HTML to Clipboard!" : "Copy HTML Code (1-Click)"}
                </button>

                <a
                  href="/standalone.html"
                  download="index.html"
                  className="py-2.5 px-4 bg-slate-900 hover:bg-black text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <Download className="w-4 h-4" />
                  Download "index.html"
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="/standalone.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#E8268F] hover:underline flex items-center gap-1 font-medium"
              >
                Open Raw Standalone HTML in New Tab <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL: FREE PUBLISHING STEPS
          ================================================================= */}
      {showPublishGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-[#E8268F] flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">How to Publish for Free (Zero Cost)</h3>
                  <p className="text-xs text-slate-500">Step-by-step instructions for Netlify and GitHub Pages</p>
                </div>
              </div>
              <button onClick={() => setShowPublishGuide(false)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-100 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E8268F] text-white flex items-center justify-center text-[10px]">1</span>
                  Option 1: Netlify Drop (Fastest — 1 Minute, No Coding Required)
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                  <li>Download your <code>index.html</code> file using the download button above.</li>
                  <li>Put <code>index.html</code> in a new folder on your computer named <code>colour-plus-website</code>.</li>
                  <li>Go to <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-[#E8268F] font-semibold underline">app.netlify.com/drop</a> in your browser.</li>
                  <li>Drag and drop that folder into the Netlify box.</li>
                  <li>Your site is instantly published with a free live link with free SSL/HTTPS!</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px]">2</span>
                  Option 2: GitHub Pages (Permanent & 100% Free)
                </h4>
                <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                  <li>Log in to <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#E8268F] font-semibold underline">github.com</a> and click <strong>New Repository</strong>.</li>
                  <li>Name it <code>colourplus</code> and set it to <strong>Public</strong>.</li>
                  <li>Click <strong>Upload an existing file</strong> and upload your <code>index.html</code>.</li>
                  <li>Go to <strong>Settings → Pages</strong> in your repository.</li>
                  <li>Under <strong>Branch</strong>, select <code>main</code> (root) and click <strong>Save</strong>.</li>
                  <li>In about 60 seconds, your site will be live at <code>https://yourusername.github.io/colourplus/</code>!</li>
                </ol>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPublishGuide(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
