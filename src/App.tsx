import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, StickyNote, Calendar, Brain, Users, Target, Code,Zap, Star, ArrowRight, Play, Download, ChevronRight, ChevronUp, GraduationCap, Lightbulb, Bookmark, Search, TrendingUp, Award, FileText, Calculator, Globe, Cpu, MessageSquare, PenTool, Filter, ChevronDown, Plus, Minus, Save, CreditCard as Edit3, Trash2, CheckCircle, BarChart3, Settings, Eye, Heart, Rocket, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import { Chatbot } from './components/Chatbot/Chatbot';
import StudyToolsSection from './video/StudyToolsSection';



function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Search and filter states
  const [aiSearchTerm, setAiSearchTerm] = useState('');
  const [selectedAiCategory, setSelectedAiCategory] = useState('Tất Cả');
  const [materialsSearchTerm, setMaterialsSearchTerm] = useState('');
  const [selectedMaterialsCategory, setSelectedMaterialsCategory] = useState('Tất Cả');

  // Handle scroll to show/hide scroll to top button and track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      
      setScrollY(scrollTop);
      // Show button when scrolled past half of the viewport height
      setShowScrollToTop(scrollTop > windowHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleRegisterNow = () => {
    setShowRegistrationModal(true);
  };
  

  const studyTools = [
    {
      id: 'pomodoro',
      icon: Clock,
      title: "Bộ Đếm Pomodoro",
      description: "Tăng hiệu suất học tập với phiên học tập tập trung 25 phút",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: ["Tự động nghỉ giải lao", "Thống kê thời gian học", "Âm thanh thông báo"]
    },
    {
      id: 'notes',
      icon: StickyNote,
      title: "Ghi Chú Thông Minh",
      description: "Tổ chức và đồng bộ ghi chú trên mọi thiết bị",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      features: ["Đồng bộ đám mây", "Tìm kiếm nhanh", "Chia sẻ ghi chú"]
    },
    {
      id: 'schedule',
      icon: Calendar,
      title: "Thời Khóa Biểu",
      description: "Lập kế hoạch học tập và theo dõi tiến độ",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      features: ["Nhắc nhở tự động", "Theo dõi tiến độ", "Tích hợp lịch"]
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: "Thống Kê Học Tập",
      description: "Phân tích và theo dõi tiến độ học tập của bạn",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      features: ["Biểu đồ chi tiết", "Báo cáo tiến độ", "Mục tiêu cá nhân"]
    }
  ];

  const aiTools = [
    {
      name: "ChatGPT",
      description: "Trợ lý AI cho nghiên cứu, viết bài và giải quyết vấn đề",
      category: "AI Tổng Hợp",
      rating: 4.8,
      users: "100M+",
      icon: MessageSquare,
      useCase: "Giải thích bài tập, viết luận văn, brainstorming ý tưởng",
      tags: ["Nghiên cứu", "Viết lách", "Giải đáp"]
    },
    {
      name: "Grammarly",
      description: "Trợ lý viết AI cho ngữ pháp và phong cách hoàn hảo",
      category: "Viết Lách",
      rating: 4.7,
      users: "30M+",
      icon: PenTool,
      useCase: "Kiểm tra ngữ pháp tiếng Anh, cải thiện văn phong",
      tags: ["Ngữ pháp", "Tiếng Anh", "Chỉnh sửa"]
    },
    {
      name: "Wolfram Alpha",
      description: "Công cụ tính toán tri thức cho toán học và khoa học",
      category: "Toán Học",
      rating: 4.6,
      users: "10M+",
      icon: Calculator,
      useCase: "Giải phương trình, vẽ đồ thị, tính toán phức tạp",
      tags: ["Toán học", "Khoa học", "Tính toán"]
    },
    {
      name: "Notion AI",
      description: "Không gian làm việc thông minh cho ghi chú và quản lý dự án",
      category: "Năng Suất",
      rating: 4.8,
      users: "20M+",
      icon: FileText,
      useCase: "Tổ chức ghi chú, lập kế hoạch học tập, quản lý nhóm",
      tags: ["Ghi chú", "Quản lý", "Tổ chức"]
    },
    {
      name: "QuillBot",
      description: "Công cụ AI paraphrase và tóm tắt văn bản",
      category: "Viết Lách",
      rating: 4.5,
      users: "15M+",
      icon: Globe,
      useCase: "Viết lại câu, tóm tắt tài liệu, cải thiện từ vựng",
      tags: ["Paraphrase", "Tóm tắt", "Từ vựng"]
    },
    {
      name: "Photomath",
      description: "Giải toán AI với lời giải từng bước chi tiết",
      category: "Toán Học",
      rating: 4.7,
      users: "50M+",
      icon: Cpu,
      useCase: "Giải bài tập toán, học cách giải từng bước",
      tags: ["Giải toán", "Từng bước", "Học tập"]
    },
    {
      name: "Coursera AI",
      description: "Nền tảng học trực tuyến với AI cá nhân hóa",
      category: "Giáo Dục",
      rating: 4.6,
      users: "25M+",
      icon: GraduationCap,
      useCase: "Khóa học trực tuyến, chứng chỉ, học theo lộ trình",
      tags: ["Khóa học", "Chứng chỉ", "Trực tuyến"]
    },
    {
      name: "Duolingo",
      description: "Học ngoại ngữ với AI thích ứng",
      category: "Ngôn Ngữ",
      rating: 4.7,
      users: "40M+",
      icon: Globe,
      useCase: "Học tiếng Anh, tiếng Trung, các ngôn ngữ khác",
      tags: ["Ngoại ngữ", "Tiếng Anh", "Luyện tập"]
    }
  ];

  const studyMaterials = [
    {
      title: "Khoa Học Máy Tính",
      subjects: ["Cấu Trúc Dữ Liệu", "Thuật Toán", "Lập Trình"],
      resources: 156,
      level: "Từ Cơ Bản Đến Nâng Cao",
      icon: Cpu,
      description: "Tài liệu đầy đủ về lập trình và khoa học máy tính",
      category: "Công Nghệ",
      university: "Đại học Bách Khoa",
      downloads: "12K+"
    },
    {
      title: "Toán Học & Thống Kê",
      subjects: ["Giải Tích", "Đại Số Tuyến Tính", "Thống Kê"],
      resources: 234,
      level: "THPT Đến Đại Học",
      icon: Calculator,
      description: "Bài giảng và bài tập toán học từ cơ bản đến nâng cao",
      category: "Toán Học",
      university: "Đại học Khoa học Tự nhiên",
      downloads: "18K+"
    },
    {
      title: "Kinh Tế & Quản Trị",
      subjects: ["Tài Chính", "Marketing", "Quản Lý"],
      resources: 189,
      level: "Trung Cấp",
      icon: TrendingUp,
      description: "Kiến thức kinh doanh và quản trị hiện đại",
      category: "Kinh Tế",
      university: "Đại học Kinh tế Quốc dân",
      downloads: "9K+"
    },
    {
      title: "Khoa Học & Kỹ Thuật",
      subjects: ["Vật Lý", "Hóa Học", "Kỹ Thuật"],
      resources: 298,
      level: "Đại Học",
      icon: Zap,
      description: "Tài liệu chuyên sâu về khoa học tự nhiên và kỹ thuật",
      category: "Khoa Học",
      university: "Đại học Bách Khoa Hà Nội",
      downloads: "15K+"
    },
    {
      title: "Ngôn Ngữ & Văn Học",
      subjects: ["Tiếng Anh", "Văn Học", "Ngôn Ngữ Học"],
      resources: 167,
      level: "Trung Cấp Đến Nâng Cao",
      icon: Globe,
      description: "Tài liệu học ngoại ngữ và văn học",
      category: "Ngôn Ngữ",
      university: "Đại học Ngoại ngữ",
      downloads: "11K+"
    },
    {
      title: "Y Học & Sức Khỏe",
      subjects: ["Giải Phẫu", "Sinh Lý", "Dược Học"],
      resources: 203,
      level: "Đại Học",
      icon: Award,
      description: "Tài liệu y khoa và sức khỏe chuyên nghiệp",
      category: "Y Học",
      university: "Đại học Y Hà Nội",
      downloads: "8K+"
    }
  ];

  const aiCategories = ["Tất Cả", "AI Tổng Hợp", "Viết Lách", "Toán Học", "Năng Suất", "Giáo Dục", "Ngôn Ngữ"];
  const materialCategories = ["Tất Cả", "Công Nghệ", "Toán Học", "Kinh Tế", "Khoa Học", "Ngôn Ngữ", "Y Học"];

  const filteredAiTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(aiSearchTerm.toLowerCase()));
    const matchesCategory = selectedAiCategory === 'Tất Cả' || tool.category === selectedAiCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(materialsSearchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(materialsSearchTerm.toLowerCase()) ||
                         material.subjects.some(subject => subject.toLowerCase().includes(materialsSearchTerm.toLowerCase()));
    const matchesCategory = selectedMaterialsCategory === 'Tất Cả' || material.category === selectedMaterialsCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        onRegisterClick={handleRegisterNow}
      />

      <main className="relative">
{/* Hero Section */}
{/* backgroud */ }
<div className="min-h-screen bg-cover bg-center text-white relative">
<section
  id="trangchu"
  className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white"
>
  {/* Lớp nền gradient mờ */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/20 via-purple-800/20 to-black/40"></div>

  {/* Hiệu ứng sáng tròn sau nhân vật */}
  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-600/30 blur-[120px] rounded-full"></div>

  {/* Content chính giữa màn hình */}
  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 h-full">
    {/* LEFT TEXT SIDE */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-left flex flex-col justify-center h-full"
    >
      <h1 className="text-5xl md:text-5xl font-extrabold text-white leading-tight mb-6">
        Nền tảng học tập <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          thông minh dành cho sinh viên VHU
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-xl leading-relaxed">
        Nâng cao hiệu quả học tập với công cụ AI tiên tiến, tài liệu học tập đầy đủ, 
        và các tính năng năng suất được thiết kế dành riêng cho sinh viên.
      </p>

      <button
        onClick={handleRegisterNow}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center gap-2 w-fit"
      >
        <Play className="w-6 h-6" />
        <span>Đăng Ký Ngay</span>
      </button>
    </motion.div>

    {/* RIGHT ILLUSTRATION SIDE */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex justify-center items-center h-full"
    >
      {/* Hình nền phía sau */}
      <motion.img
        src="hinhanh/SVG/hihi.svg"
        alt="Background Effect"
        className="absolute w-[45rem] h-[45rem] object-contain z-0"
        animate={{ y: [0, -40, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hình chính */}
      <motion.img
        src="hinhanh/SVG/college project-pana.svg"
        alt="Study Illustration"
        className="w-[38rem] h-[38rem] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] relative z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </div>

  {/* INFINITE LOGO TICKER - ĐỐI TÁC */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
    <style>{`
      .infinite-ticker {
        white-space: nowrap;
        overflow: hidden;
        padding: 12px 0;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .ticker-content {
        display: inline-block;
        animation: scroll-left 50s linear infinite;
      }
      .ticker-content:hover {
        animation-play-state: paused;
      }
      .logo-item {
        display: inline-block;
        margin: 0 40px;
        height: 55px;
      }
      .logo-item img {
        height: 55px;
        width: auto;
        vertical-align: middle;
        filter: brightness(1.2);
      }
      @keyframes scroll-left {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}</style>

    <div className="infinite-ticker">
      <div className="ticker-content">
        {/* LOGOS */}
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 2.svg" alt="United" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 3.svg" alt="Santander" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 4.svg" alt="Unilever" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 5.svg" alt="Canva" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 6.svg" alt="Apple" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 7.svg" alt="Primerica" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 8.svg" alt="Ducati" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 9.svg" alt="ThermoFisher" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 1.svg" alt="ThermoFisher" /></div>
          <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 4.svg" alt="Unilever" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 5.svg" alt="Canva" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 6.svg" alt="Apple" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 7.svg" alt="Primerica" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 8.svg" alt="Ducati" /></div>
   
      </div>
    </div>
  </div>
</section>
{/* Enhanced Introducing Section with Scroll Interactions */}
<section
  id="introducing"
  className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900"
>
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.8; }
    }

    .float-animation {
      animation: float 6s ease-in-out infinite;
    }

    .moving-text-scroll {
      white-space: nowrap;
      position: absolute;
      font-weight: 700;
      background: linear-gradient(135deg, rgb(252, 4, 173), rgb(168, 85, 247), rgb(88, 0, 146));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      will-change: transform;
      transition: transform 0.1s linear;
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }
    
    .glass-card:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(168, 85, 247, 0.5);
      transform: translateY(-5px);
    }

    .gradient-text {
      background: linear-gradient(135deg, #a855f7, #ec4899, #f97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `}</style>

  {/* Animated gradient background blobs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div 
      className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        x: [0, -30, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 40, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  {/* Scroll-interactive moving text background */}
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <motion.p
      className="moving-text-scroll"
      style={{
        fontSize: "clamp(80px, 15vw, 180px)",
        top: "25%",
        left: "-10%",
        opacity: 0.15,
        transform: `translateX(${scrollY * 0.3}px)`,
      }}
    >
      STUDY VHU SMART LEARNING TOOLS
    </motion.p>
    <motion.p
      className="moving-text-scroll"
      style={{
        fontSize: "clamp(80px, 15vw, 180px)",
        top: "55%",
        right: "-10%",
        opacity: 0.15,
        transform: `translateX(${-scrollY * 0.25}px)`,
      }}
    >
      INNOVATION • EXCELLENCE • GROWTH
    </motion.p>
  </div>

  {/* Main content container */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left content - Text and description */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tại sao lại chọn{" "}
            <span className="gradient-text">Study VHU?</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            <span className="font-semibold text-purple-400">Study VHU</span> không chỉ là một ứng dụng học tập – 
            mà là <strong className="text-pink-400">nền tảng toàn diện</strong>, giúp sinh viên VHU quản lý việc học,
            rèn luyện kỷ luật, và phát triển bản thân trong kỷ nguyên số.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Với triết lý{" "}
            <span className="font-semibold text-purple-300">"Học tập không giới hạn"</span>, 
            Study VHU mang đến môi trường học tập 
            <span className="text-pink-300 font-medium"> thông minh – tập trung – hiệu quả</span>.
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">1000+</div>
            <div className="text-sm text-gray-300">Sinh viên</div>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1">500+</div>
            <div className="text-sm text-gray-300">Tài liệu</div>
          </div>
          <div className="glass-card rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-1">95%</div>
            <div className="text-sm text-gray-300">Hài lòng</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right content - Interactive feature cards */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Feature card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 float-animation"
          style={{ animationDelay: '0s' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Công Nghệ AI Tiên Tiến</h3>
              <p className="text-gray-300 text-sm">
                Trợ lý AI thông minh giúp bạn học tập hiệu quả hơn với gợi ý cá nhân hóa và phân tích tiến độ chi tiết.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 float-animation"
          style={{ animationDelay: '2s' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Cộng Đồng Năng Động</h3>
              <p className="text-gray-300 text-sm">
                Kết nối với hàng nghìn sinh viên, chia sẻ kiến thức và cùng nhau phát triển trong môi trường học tập tích cực.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 float-animation"
          style={{ animationDelay: '4s' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Mục Tiêu Rõ Ràng</h3>
              <p className="text-gray-300 text-sm">
                Thiết lập và theo dõi mục tiêu học tập của bạn với hệ thống quản lý thông minh và nhắc nhở tự động.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 float-animation"
          style={{ animationDelay: '1s' }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Trải Nghiệm Tối Ưu</h3>
              <p className="text-gray-300 text-sm">
                Giao diện hiện đại, dễ sử dụng được thiết kế đặc biệt cho sinh viên với hiệu năng cao trên mọi thiết bị.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>

    {/* Bottom call-to-action section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-20 text-center"
    >
      <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-4">
          Bắt đầu hành trình học tập thông minh ngay hôm nay
        </h3>
        <p className="text-gray-300 mb-6 text-lg">
          Tham gia cùng hàng nghìn sinh viên đã tin tưởng và sử dụng Study VHU để đạt được mục tiêu học tập của mình.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRegisterNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Trải nghiệm miễn phí</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            <span>Xem demo</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  </div>
</section>


<StudyToolsSection />










{/* Study Materials Section */}
<section >
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
        Tài Liệu Học Tập Toàn Diện
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Truy cập hàng nghìn tài liệu học tập được chọn lọc kỹ lưỡng theo nhiều chủ đề và cấp độ khác nhau.
      </p>
    </motion.div>

    <div className="flex flex-col lg:flex-row gap-10">
      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/4"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sticky top-24 border border-white/20">
          <h3 className="text-lg font-semibold mb-5 text-gray-100">🔍 Lọc & Tìm Kiếm</h3>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                value={materialsSearchTerm}
                onChange={(e) => setMaterialsSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm text-gray-200 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium text-gray-300 mb-3 text-sm">📂 Lĩnh Vực</h4>
            <div className="space-y-2">
              {materialCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedMaterialsCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedMaterialsCategory === category
                      ? "bg-pink-500/30 text-pink-300 font-medium"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6">
            <h4 className="font-medium text-gray-300 mb-3 text-sm">⚡ Bộ Lọc Nhanh</h4>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                📚 Tài liệu mới nhất
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                ⭐ Đánh giá cao
              </button>
              <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition">
                🔥 Phổ biến nhất
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Hiển thị {filteredMaterials.length} / {studyMaterials.length} tài liệu
            </p>
          </div>
        </div>
      </motion.div>

      {/* Materials Grid */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-3/4"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 border border-white/10 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-200/30 to-indigo-200/30 rounded-xl flex items-center justify-center">
                  <material.icon className="w-6 h-6 text-pink-300" />
                </div>
                <div className="text-right">
                  <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                    {material.resources} Tài Liệu
                  </span>
                  <span className="text-xs text-gray-400">{material.downloads} lượt tải</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-white">{material.title}</h3>
              <p className="text-gray-300 mb-2 text-sm flex-grow">{material.description}</p>
              <p className="text-gray-400 mb-2 text-sm">📍 {material.university}</p>
              <p className="text-gray-400 mb-4 text-sm">🎓 Cấp độ: {material.level}</p>

              <div className="mb-6">
                <h4 className="font-medium text-gray-200 mb-2 text-sm">Môn học bao gồm:</h4>
                <div className="flex flex-wrap gap-2">
                  {material.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-indigo-400/20 text-indigo-200 px-3 py-1 rounded-full text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={handleRegisterNow}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  Đăng Ký Truy Cập
                </button>
                <button className="px-4 py-3 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <BookOpen className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-400">Không tìm thấy tài liệu phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        )}
      </motion.div>
    </div>
  </div>
</section>













        {/* Inline Registration Form Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationForm 
              isOpen={true} 
              onClose={() => {}} 
              variant="inline" 
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Sẵn Sàng Thay Đổi Trải Nghiệm Học Tập?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Tham gia cùng hàng nghìn sinh viên đã nâng cao hiệu suất học tập với nền tảng của chúng tôi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleRegisterNow}
                  className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[200px]"
                >
                  Bắt Đầu Miễn Phí
                </button>
                <button 
                  onClick={handleRegisterNow}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
                >
                  Tìm Hiểu Thêm
                </button>
              </div>
            </motion.div>
          </div>
        </section>
</div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold">Study VHU</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Trao quyền cho sinh viên với các công cụ và tài nguyên tiên tiến để đạt được thành công trong học tập.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Công Cụ Học Tập</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Bộ Đếm Pomodoro</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ghi Chú Thông Minh</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Thời Khóa Biểu</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Thống Kê Học Tập</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Tài Nguyên</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Tài Liệu Học Tập</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Công Cụ AI</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Hướng Dẫn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cộng Đồng</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Trung Tâm Trợ Giúp</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Liên Hệ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Chính Sách Bảo Mật</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Điều Khoản Dịch Vụ</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
              <p>&copy; 2024 Study VHU. Tất cả quyền được bảo lưu.</p>
            </div>
          </div>
        </footer>
      </main>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#374151',
            border: '1px solid #E5E7EB',
          },
        }}
      />

      <RegistrationForm 
        isOpen={showRegistrationModal} 
        onClose={() => setShowRegistrationModal(false)} 
        variant="modal" 
      />

      {/* Chatbot Widget */}
      <Chatbot onRegisterClick={handleRegisterNow} />

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-24 z-40 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
          <div className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Về đầu trang
          </div>
        </motion.button>
      )}
    </div>
  );
}

export default App;

