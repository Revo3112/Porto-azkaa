"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, FileText, Database, CheckCircle, Lightbulb, Award, ExternalLink, TrendingUp, Users, MapPin, ShoppingCart } from "lucide-react";
import gsap from "gsap";

interface ProjectGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  galleryType: "bnsp" | "msib" | "insight" | null;
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  content: {
    heading: string;
    description: string;
    [key: string]: any;
  };
}

// BNSP Project Slides
const bnspSlides: Slide[] = [
  {
    id: 1,
    title: "Project Overview",
    subtitle: "BNSP Associate Data Analyst Certification",
    icon: Award,
    content: {
      heading: "Student Performance Analysis",
      description: "A comprehensive data preparation project analyzing 2,000+ student records to identify patterns in academic performance, attendance, and payment behavior.",
      highlights: [
        { label: "Data Points", value: "2,000+ Records" },
        { label: "Tools Used", value: "Tableau, Python, SQL" },
        { label: "Duration", value: "KP.01 Module" },
        { label: "Source", value: "BNSP Official Dataset" }
      ]
    }
  },
  {
    id: 2,
    title: "Data Collection",
    subtitle: "Step 1: Gathering & Integration",
    icon: Database,
    content: {
      heading: "Systematic Data Collection Process",
      description: "Data was collected from BNSP's official Google Drive, specifically the Mahasiswa_Datasets.xlsx file. The integration process involved connecting Tableau to Excel for seamless analysis.",
      steps: [
        "Downloaded dataset from BNSP Google Drive",
        "Stored locally for efficient access",
        "Connected Tableau to Excel file",
        "Selected relevant sheets: Identitas & Akademik"
      ]
    }
  },
  {
    id: 3,
    title: "Data Validation",
    subtitle: "Step 2: Quality Assurance",
    icon: CheckCircle,
    content: {
      heading: "Ensuring Data Integrity",
      description: "Comprehensive validation process to ensure data completeness and accuracy. No missing values were found, and data characteristics were thoroughly analyzed.",
      validations: [
        "Analyzed data types and relationships",
        "Checked for missing values (0 found)",
        "Verified 2,000 rows per table",
        "Created completeness recommendations"
      ]
    }
  },
  {
    id: 4,
    title: "Database Implementation",
    subtitle: "Step 3: Technical Execution",
    icon: FileText,
    content: {
      heading: "Python & SQL Integration",
      description: "Implemented database access procedures using Python to create a robust connection. Successfully performed CRUD operations and query insertions.",
      tech: [
        "Created database schema and tables",
        "Established Python connection",
        "Implemented query procedures",
        "Tested database operations"
      ]
    }
  },
  {
    id: 5,
    title: "Key Insights",
    subtitle: "Findings & Analysis",
    icon: Lightbulb,
    content: {
      heading: "Data-Driven Discoveries",
      description: "Analysis revealed significant correlations between attendance and academic performance, along with payment variability patterns.",
      findings: [
        "High attendance correlates with better grades",
        "Clear patterns in IPK/IPS distribution",
        "Payment variability suggests economic factors",
        "Semester-wise performance tracking enabled"
      ]
    }
  },
  {
    id: 6,
    title: "Documentation",
    subtitle: "Full Project Report",
    icon: FileText,
    content: {
      heading: "Complete Presentation",
      description: "Access the full BNSP certification presentation including all methodologies, visualizations, and detailed recommendations.",
      action: {
        label: "View Full PDF",
        description: "Download or view the complete project documentation with all slides, analysis, and recommendations.",
        pdfUrl: "/DIT-ADA [Azkaa Rahiila Hardi] (3) (3).pdf"
      }
    }
  }
];

// MSIB Project Slides
const msibSlides: Slide[] = [
  {
    id: 1,
    title: "Project Overview",
    subtitle: "MSIB Data Academy - Insight Seekers Team",
    icon: Award,
    content: {
      heading: "European Bike Sales Strategy 2024",
      description: "Comprehensive analysis of bicycle sales trends across Europe to develop targeted marketing strategies. The project analyzed sales data based on age segments, product categories, and geographical regions to maximize profitability and market competitiveness.",
      highlights: [
        { label: "Team", value: "Insight Seekers" },
        { label: "Growth Rate", value: "23.2% (2014-2015)" },
        { label: "Focus Region", value: "Europe" },
        { label: "Tools", value: "Tableau Dashboard" }
      ]
    }
  },
  {
    id: 2,
    title: "Market Overview",
    subtitle: "Dashboard 1: Sales Trends Analysis",
    icon: TrendingUp,
    content: {
      heading: "European Bike Sales Overview",
      description: "Bike sales in Europe showed significant annual growth of 23.2% in 2014-2015. However, growth slowed in subsequent years, indicating the need for new strategies to maintain momentum.",
      findings: [
        "Accessories contribute the largest order quantity",
        "Bikes generate higher profit despite lower volume",
        "Clothing has the lowest sales - needs bundling strategy",
        "Age group 35-64 has highest orders (187.5K)"
      ]
    }
  },
  {
    id: 3,
    title: "Geographic Analysis",
    subtitle: "Dashboard 2: Sales Growth by Region",
    icon: MapPin,
    content: {
      heading: "2015 Sales Growth Analysis",
      description: "England dominates bike sales across all age groups, especially ages 25-64. Saarland and Nordrhein-Westfalen show good potential for under-25 and 65+ segments.",
      insights: [
        "England: Largest contributor across all age segments",
        "Saarland & Nordrhein-Westfalen: Emerging markets",
        "Bikes: Highest price = highest profit",
        "Accessories: Volume driver for mass appeal"
      ],
      recommendations: [
        "Maintain dominance in England market",
        "Launch localized campaigns in Saarland & Nordrhein-Westfalen",
        "Create accessory bundles with bikes",
        "Special discounts for youth segments"
      ]
    }
  },
  {
    id: 4,
    title: "Primary Segment Focus",
    subtitle: "Dashboard 3: Ages 25-64 Analysis",
    icon: Users,
    content: {
      heading: "Focus on High-Value Segment (25-64)",
      description: "The 25-64 age group represents the most valuable market segment with highest sales volume. England remains the top market, with accessories (tires, tubes at 25,029 units) leading sales.",
      topProducts: [
        { product: "Tires & Tubes", units: "25,029" },
        { product: "Bike Racks", units: "103" }
      ],
      strategies: [
        "Bundle promotions for high-selling accessories",
        "Volume discounts for bulk purchases",
        "Upsell low-selling items like bike racks",
        "Target premium product marketing"
      ]
    }
  },
  {
    id: 5,
    title: "Youth & Senior Markets",
    subtitle: "Dashboard 4 & 5: Niche Segments",
    icon: ShoppingCart,
    content: {
      heading: "Under 25 & 65+ Segments",
      description: "Under 25: High potential for long-term loyalty with England leading (343,692 sales). 65+: Focus on comfort and safety accessories, smaller but loyal market.",
      youthStrategy: [
        "Entry-level bikes & stylish accessories",
        "Social media campaigns (Instagram, TikTok)",
        "Community events & cycling tours",
        "First-time buyer discounts"
      ],
      seniorStrategy: [
        "Ergonomic & lightweight bikes / e-bikes",
        "Safety accessories & comfortable gear",
        "Health benefit focused marketing",
        "Local product demonstrations"
      ]
    }
  },
  {
    id: 6,
    title: "Strategic Recommendations",
    subtitle: "Conclusion & Next Steps",
    icon: Lightbulb,
    content: {
      heading: "Actionable Business Strategies",
      description: "Data-driven recommendations to optimize sales across all age segments and maintain competitive advantage in the European market.",
      strategies: [
        {
          segment: "Age 25-64 (Primary)",
          actions: ["Loyalty programs", "Premium promotions", "Lifestyle campaigns", "Local partnerships"]
        },
        {
          segment: "Under 25 (Growth)",
          actions: ["Entry-level products", "Social media focus", "Community events", "Student discounts"]
        },
        {
          segment: "65+ (Niche)",
          actions: ["Comfort products", "Safety gear", "Health marketing", "Local demos"]
        }
      ],
      action: {
        label: "View Full Presentation",
        description: "Access the complete MSIB Data Academy presentation with detailed dashboards and visualizations.",
        pdfUrl: "/MSIB Persentation.pdf"
      }
    }
  }
];

// Insight Dominasi Project Slides
const insightSlides: Slide[] = [
  {
    id: 1,
    title: "Project Overview",
    subtitle: "User Demographics & Digital Behavior Analysis",
    icon: Award,
    content: {
      heading: "Insight Dominasi Pengguna",
      description: "Data mining project analyzing user demographics, digital behavior patterns, and device preferences to identify high-value investment opportunities and market segments for smart investment decisions.",
      highlights: [
        { label: "Target Age", value: "30-34 Years" },
        { label: "Location", value: "Rural 38.5%" },
        { label: "Top Device", value: "Realme" },
        { label: "Main Interest", value: "Social Media" }
      ]
    }
  },
  {
    id: 2,
    title: "User Profile",
    subtitle: "Profil Pengguna Utama",
    icon: Users,
    content: {
      heading: "Pengguna 30-34 Tahun Paling Dominan",
      description: "Segmen usia dewasa muda menjadi kelompok terbesar, menunjukkan potensi pasar yang produktif dan tech-savvy. Social media menjadi minat digital tertinggi.",
      findings: [
        "Kelompok usia 30-34 tahun merupakan segmen terbesar",
        "Ideal untuk produk digital dan layanan finansial berbasis teknologi",
        "Daya beli kuat, produktif, dan tech-savvy",
        "Social media adalah minat utama digital"
      ],
      strategies: [
        "Strategi pemasaran melalui platform sosial akan sangat efektif",
        "Konten yang menarik dan interaktif akan membangun komunitas",
        "Fokus pada gaya hidup digital untuk meningkatkan engagement"
      ]
    }
  },
  {
    id: 3,
    title: "Device & Location",
    subtitle: "Preferensi Perangkat & Lokasi",
    icon: MapPin,
    content: {
      heading: "Realme Ungguli Merek Lain",
      description: "Realme menjadi merek smartphone paling banyak digunakan (50 users), menandakan preferensi terhadap nilai tambah performa dan harga kompetitif. Rural menjadi basis terbesar dengan 77 pengguna (38.5%).",
      deviceStats: [
        { brand: "Realme", users: "50" },
        { brand: "Vivo", users: "40" },
        { brand: "Samsung", users: "39" }
      ],
      locationDistribution: [
        { area: "Rural (Pedesaan)", percentage: "38.5%" },
        { area: "Urban (Perkotaan)", percentage: "31.5%" },
        { area: "Suburban (Pinggiran)", percentage: "30.0%" }
      ],
      recommendations: [
        "Optimalkan layanan digital untuk perangkat Realme",
        "Pertimbangkan kerja sama strategis dengan Realme untuk pre-install aplikasi",
        "Fokus pada solusi yang relevan dengan kebutuhan rural"
      ]
    }
  },
  {
    id: 4,
    title: "Age Segmentation",
    subtitle: "Analisis Segmentasi Usia",
    icon: TrendingUp,
    content: {
      heading: "Rentang Usia Produktif Mendominasi",
      description: "Kelompok 25-34 tahun menyumbang lebih dari setengah pengguna, menggambarkan daya beli yang kuat. Usia 40+ masih potensial sebagai pasar niche.",
      ageGroups: [
        { range: "30-34 Tahun", rank: "#1", note: "Paling Dominan" },
        { range: "25-29 Tahun", rank: "#2", note: "Produktif" },
        { range: "35-39 Tahun", rank: "#4", note: "Stable" }
      ],
      insights: [
        "Kelompok usia 25-34 tahun sangat cocok untuk produk berlangganan",
        "Usia 40+ adalah pasar yang tepat untuk aplikasi manajemen kesehatan",
        "Platform edukasi online untuk upskilling sangat relevan"
      ]
    }
  },
  {
    id: 5,
    title: "Digital Interest",
    subtitle: "Preferensi Minat Digital",
    icon: Lightbulb,
    content: {
      heading: "Social Media vs Learning & Banking",
      description: "Social media unggul jauh (62 pengguna), namun minat pada online learning (~48) dan digital banking (~47) hampir berimbang, menandakan kesempatan untuk integrasi.",
      interestStats: [
        { category: "Social Media", users: "62", avgAge: "29.12 tahun" },
        { category: "Online Learning", users: "~48", avgAge: "28.45 tahun" },
        { category: "Digital Banking", users: "~47", avgAge: "29.74 tahun" },
        { category: "E-Commerce", users: "42", avgAge: "29.46 tahun" }
      ],
      strategies: [
        "Integrasikan edukasi dan layanan finansial dalam ekosistem media sosial",
        "E-Commerce butuh trigger tambahan: Cashback, Gratis Ongkir, Bundling",
        "Frekuensi tertinggi di sekitar usia 23 dan 30 tahun"
      ]
    }
  },
  {
    id: 6,
    title: "Strategic Recommendations",
    subtitle: "Rekomendasi Investasi",
    icon: CheckCircle,
    content: {
      heading: "Fokus pada Pengguna Ideal",
      description: "Prioritaskan pengembangan fitur untuk persona pengguna yang paling dominan dan potensial untuk investasi yang tepat sasaran dan menguntungkan.",
      idealPersona: {
        demografi: "Pria/Wanita, 30-34 tahun",
        lokasi: "Berasal dari daerah rural (pedesaan)",
        minat: "Gemar menggunakan media sosial",
        perangkat: "Menggunakan smartphone Realme"
      },
      nextSteps: [
        { step: "Kampanye Media Sosial", desc: "Alokasikan dana untuk kampanye yang menargetkan pengguna ideal" },
        { step: "Kemitraan Strategis", desc: "Jalin kemitraan dengan Realme dan ekspansi infrastruktur di rural" },
        { step: "Monitoring & ROI", desc: "Pantau metrik adopsi dan retensi untuk membuktikan ROI yang menarik" }
      ],
      action: {
        label: "View Full Analysis",
        description: "Access the complete data mining presentation with detailed user analytics and investment recommendations.",
        pdfUrl: "/Insight Dominasi Pengguna_ Data Mining untuk Investasi Cerdas.pptx.pptx.pdf"
      }
    }
  }
];

export default function ProjectGallery({ isOpen, onClose, galleryType }: ProjectGalleryProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  // Get slides based on gallery type
  const slides = galleryType === "msib" ? msibSlides : galleryType === "insight" ? insightSlides : bnspSlides;

  // Handle slide change with smooth GSAP animation
  const goToSlide = useCallback((newIndex: number) => {
    if (isAnimating || newIndex === currentSlide) return;
    
    const direction = newIndex > currentSlide ? 1 : -1;
    const currentEl = slidesRef.current[currentSlide];
    const nextEl = slidesRef.current[newIndex];
    
    if (!currentEl || !nextEl) return;
    
    setIsAnimating(true);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);
        timelineRef.current = null;
      }
    });

    timelineRef.current.to(currentEl, {
      opacity: 0,
      x: direction * -50,
      duration: 0.25,
      ease: "power2.in"
    });

    timelineRef.current.set(nextEl, { 
      opacity: 0, 
      x: direction * 50,
      display: "block"
    });

    timelineRef.current.to(nextEl, {
      opacity: 1,
      x: 0,
      duration: 0.35,
      ease: "power2.out"
    });

    timelineRef.current.set(currentEl, { display: "none" });

  }, [currentSlide, isAnimating]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }, [currentSlide, goToSlide, slides.length]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevIndex);
  }, [currentSlide, goToSlide, slides.length]);

  // Initialize modal and first slide
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentSlide(0);
        slidesRef.current.forEach((slide, index) => {
          if (slide) {
            gsap.set(slide, { 
              opacity: index === 0 ? 1 : 0, 
              x: 0,
              display: index === 0 ? "block" : "none"
            });
          }
        });
      }, 300);
      return () => clearTimeout(timer);
    }

    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
    }

    gsapContextRef.current = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );

      slidesRef.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, {
            opacity: index === 0 ? 1 : 0,
            x: 0,
            display: index === 0 ? "block" : "none"
          });
        }
      });
    });

    return () => {
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
        gsapContextRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [isOpen]);

  const onCloseRef = useRef(onClose);
  const handleNextRef = useRef(handleNext);
  const handlePrevRef = useRef(handlePrev);

  useEffect(() => {
    onCloseRef.current = onClose;
    handleNextRef.current = handleNext;
    handlePrevRef.current = handlePrev;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowRight") handleNextRef.current();
      if (e.key === "ArrowLeft") handlePrevRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePDFView = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank");
  };

  if (!isOpen || !galleryType) return null;

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-6"
      style={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ 
          opacity: 0,
          maxHeight: "calc(100vh - 3rem)"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-800 text-sm truncate">{currentSlideData.title}</h3>
              <p className="text-[11px] text-slate-500 truncate">{currentSlideData.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Slide Counter */}
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <span className="text-slate-800 font-bold">{String(currentSlide + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors group"
            >
              <X className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
            </button>
          </div>
        </div>

        {/* Slide Content Container */}
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: "400px", maxHeight: "60vh" }}>
          {slides.map((slide, index) => {
            const SlideIcon = slide.icon;
            return (
              <div
                key={slide.id}
                ref={el => { slidesRef.current[index] = el; }}
                className="absolute inset-0 overflow-y-auto p-5 sm:p-6 bg-white"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  display: index === 0 ? "block" : "none",
                  transform: "translateX(0px)"
                }}
              >
                {/* Slide Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                    <SlideIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                      {slide.content.heading}
                    </h2>
                    <p className="text-sm text-slate-500">{slide.subtitle}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {slide.content.description}
                </p>

                {/* BNSP Slide Content */}
                {galleryType === "bnsp" && (
                  <>
                    {slide.content.highlights && (
                      <div className="grid grid-cols-2 gap-3">
                        {slide.content.highlights.map((item: any, i: number) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-blue-200 transition-colors">
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.steps && (
                      <div className="space-y-3">
                        {(slide.content.steps as string[]).map((step, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {i + 1}
                            </div>
                            <p className="text-slate-700 text-sm pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.validations && (
                      <div className="space-y-3">
                        {(slide.content.validations as string[]).map((validation, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                            <p className="text-slate-700 text-sm">{validation}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.tech && (
                      <div className="space-y-3">
                        {(slide.content.tech as string[]).map((tech, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <Database className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-slate-700 text-sm">{tech}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.findings && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(slide.content.findings as string[]).map((finding, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-slate-700 text-sm">{finding}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.action && (
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
                        <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{slide.content.action.label}</h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">{slide.content.action.description}</p>
                        <button 
                          onClick={() => handlePDFView(slide.content.action.pdfUrl)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-50 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open PDF
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* MSIB Slide Content */}
                {galleryType === "msib" && (
                  <>
                    {slide.content.highlights && (
                      <div className="grid grid-cols-2 gap-3">
                        {slide.content.highlights.map((item: any, i: number) => (
                          <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-[10px] text-blue-600 uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.findings && (
                      <div className="space-y-3">
                        {(slide.content.findings as string[]).map((finding, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <p className="text-slate-700 text-sm">{finding}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.insights && slide.content.recommendations && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Key Insights
                          </h4>
                          {(slide.content.insights as string[]).map((insight, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{insight}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Recommendations
                          </h4>
                          {(slide.content.recommendations as string[]).map((rec, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.content.topProducts && slide.content.strategies && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-sm mb-3">Top Products</h4>
                          <div className="space-y-2">
                            {(slide.content.topProducts as any[]).map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-white rounded-lg">
                                <span className="text-slate-700 text-sm">{item.product}</span>
                                <span className="font-bold text-blue-600 text-sm">{item.units} units</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-slate-800 text-sm">Strategies</h4>
                          {(slide.content.strategies as string[]).map((strategy, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                              <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                              </span>
                              <p className="text-slate-700 text-sm">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.content.youthStrategy && slide.content.seniorStrategy && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            Under 25 Strategy
                          </h4>
                          {(slide.content.youthStrategy as string[]).map((strategy, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{strategy}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4 text-teal-500" />
                            65+ Strategy
                          </h4>
                          {(slide.content.seniorStrategy as string[]).map((strategy, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-teal-50 rounded-lg border border-teal-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.content.strategies && Array.isArray(slide.content.strategies) && (slide.content.strategies as any[])[0]?.segment && (
                      <div className="space-y-4">
                        {(slide.content.strategies as any[]).map((strategy, i) => (
                          <div key={i} className="bg-gradient-to-r from-slate-50 to-white rounded-xl p-4 border border-slate-200">
                            <h4 className="font-bold text-slate-800 text-sm mb-2">{strategy.segment}</h4>
                            <div className="flex flex-wrap gap-2">
                              {strategy.actions.map((action: string, j: number) => (
                                <span key={j} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                                  {action}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.action && (
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
                        <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{slide.content.action.label}</h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">{slide.content.action.description}</p>
                        <button 
                          onClick={() => handlePDFView(slide.content.action.pdfUrl)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-blue-50 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open PDF
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Insight Dominasi Slide Content */}
                {galleryType === "insight" && (
                  <>
                    {slide.content.highlights && (
                      <div className="grid grid-cols-2 gap-3">
                        {slide.content.highlights.map((item: any, i: number) => (
                          <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                            <p className="text-[10px] text-purple-600 uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {slide.content.findings && slide.content.strategies && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Key Findings
                          </h4>
                          {(slide.content.findings as string[]).map((finding, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{finding}</p>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Strategies
                          </h4>
                          {(slide.content.strategies as string[]).map((strategy, i) => (
                            <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                              <p className="text-slate-700 text-xs">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.content.deviceStats && slide.content.locationDistribution && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-sm mb-3">Top Device Brands</h4>
                          <div className="space-y-2">
                            {(slide.content.deviceStats as any[]).map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-white rounded-lg">
                                <span className="text-slate-700 text-sm">{item.brand}</span>
                                <span className="font-bold text-purple-600 text-sm">{item.users} users</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-sm mb-3">Location Distribution</h4>
                          <div className="space-y-2">
                            {(slide.content.locationDistribution as any[]).map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-2 bg-white rounded-lg">
                                <span className="text-slate-700 text-sm">{item.area}</span>
                                <span className="font-bold text-blue-600 text-sm">{item.percentage}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {slide.content.recommendations && (
                          <div className="col-span-1 md:col-span-2 space-y-2">
                            <h4 className="font-semibold text-slate-800 text-sm">Recommendations</h4>
                            {(slide.content.recommendations as string[]).map((rec, i) => (
                              <div key={i} className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                <span className="w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                  {i + 1}
                                </span>
                                <p className="text-slate-700 text-sm">{rec}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {slide.content.ageGroups && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-sm mb-3">Age Group Rankings</h4>
                          <div className="space-y-2">
                            {(slide.content.ageGroups as any[]).map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold">
                                    {item.rank}
                                  </span>
                                  <span className="text-slate-700 text-sm">{item.range}</span>
                                </div>
                                <span className="text-xs text-slate-500">{item.note}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {slide.content.insights && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-800 text-sm">Insights</h4>
                            {(slide.content.insights as string[]).map((insight, i) => (
                              <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <p className="text-slate-700 text-xs">{insight}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {slide.content.interestStats && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                          <h4 className="font-semibold text-slate-800 text-sm mb-3">Digital Interest Statistics</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {(slide.content.interestStats as any[]).map((item, i) => (
                              <div key={i} className="p-3 bg-white rounded-lg border border-slate-200">
                                <p className="text-xs text-slate-500 mb-1">{item.category}</p>
                                <p className="font-bold text-slate-800">{item.users}</p>
                                <p className="text-[10px] text-slate-400">Avg: {item.avgAge}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {slide.content.strategies && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-slate-800 text-sm">Strategic Opportunities</h4>
                            {(slide.content.strategies as string[]).map((strategy, i) => (
                              <div key={i} className="flex items-start gap-2 p-3 bg-teal-50 rounded-lg border border-teal-100">
                                <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                  {i + 1}
                                </span>
                                <p className="text-slate-700 text-sm">{strategy}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {slide.content.idealPersona && slide.content.nextSteps && (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-5 border border-purple-200">
                          <h4 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Ideal User Persona
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-[10px] text-slate-500 uppercase">Demographics</p>
                              <p className="text-sm font-semibold text-slate-800">{(slide.content.idealPersona as any).demografi}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-[10px] text-slate-500 uppercase">Location</p>
                              <p className="text-sm font-semibold text-slate-800">{(slide.content.idealPersona as any).lokasi}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-[10px] text-slate-500 uppercase">Interest</p>
                              <p className="text-sm font-semibold text-slate-800">{(slide.content.idealPersona as any).minat}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-[10px] text-slate-500 uppercase">Device</p>
                              <p className="text-sm font-semibold text-slate-800">{(slide.content.idealPersona as any).perangkat}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-slate-800 text-sm">Next Investment Steps</h4>
                          {(slide.content.nextSteps as any[]).map((step, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200">
                              <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                                {i + 1}
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-800 text-sm">{step.step}</h5>
                                <p className="text-slate-600 text-xs mt-1">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.content.action && (
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-center">
                        <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">{slide.content.action.label}</h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">{slide.content.action.description}</p>
                        <button 
                          onClick={() => handlePDFView(slide.content.action.pdfUrl)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-purple-50 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open PDF
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 bg-slate-50 shrink-0">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Previous</span>
          </button>

          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-6 bg-blue-500" 
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            <span className="font-medium">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
