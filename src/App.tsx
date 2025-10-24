import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, StickyNote, Calendar, Brain, Users, Target, Code,Zap, Star, ArrowRight, Play, Download, ChevronRight, ChevronUp, GraduationCap, Lightbulb, Bookmark, Search, TrendingUp, Award, FileText, Calculator, Globe, Cpu, MessageSquare, PenTool, Filter, ChevronDown, Plus, Minus, Save, CreditCard as Edit3, Trash2, CheckCircle, BarChart3, Settings, Eye, Heart, Rocket, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import StudyToolsSection from './video/StudyToolsSection';
import { Chatbot } from './components/Chatbot/Chatbot';
import HexagonSection from "./component/HexagonSection";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Search and filter states
  const [aiSearchTerm, setAiSearchTerm] = useState('');
  const [selectedAiCategory, setSelectedAiCategory] = useState('Tất Cả');
  const [materialsSearchTerm, setMaterialsSearchTerm] = useState('');
  const [selectedMaterialsCategory, setSelectedMaterialsCategory] = useState('Tất Cả');

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      
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
  {/* 🌟 Ngôi sao lấp lánh xung quanh (to hơn) */}
  <div className="absolute inset-0 pointer-events-none">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.span
        key={i}
        className="absolute bg-white rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 5 + 4}px`, // ⭐ tăng kích thước từ 4 đến 9px
          height: `${Math.random() * 5 + 4}px`,
          opacity: 0.9,
          boxShadow: "0 0 12px rgba(255,255,255,0.7)", // ánh sáng mạnh hơn
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>

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
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 3.svg" alt="ThermoFisher" /></div>
          <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 4.svg" alt="Unilever" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 5.svg" alt="Canva" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 6.svg" alt="Apple" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 7.svg" alt="Primerica" /></div>
        <div className="logo-item"><img src="hinhanh/icon/SVG/Asset 8.svg" alt="Ducati" /></div>
   
      </div>
    </div>
  </div>
</section>
<section
  id="introducing"
  className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden text-gray-900 py-20"
>
  <style>{`
    .moving-text.to-left {
      animation: moveLeft 25s linear infinite;
    }
    .moving-text.to-right {
      animation: moveRight 25s linear infinite;
    }
    @keyframes moveLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes moveRight {
      from { transform: translateX(0); }
      to { transform: translateX(50%); }
    }
  `}</style>

  {/* 🌈 Nền gradient mịn hơn giống hình bạn gửi */}
  <div
    className="absolute inset-0"
    style={{
      background: `
        radial-gradient(
          circle at center,
          rgba(251,194,235,0.95) 0%,
          rgba(161,140,209,0.9) 50%,
          rgba(192,132,252,0.95) 100%
        )
      `,
    }}
  />

  {/* 💨 Chữ chạy nền */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <p
      className="moving-text to-left pb-4 hidden md:block"
      style={{
        background:
          "-webkit-linear-gradient(top, rgb(252, 4, 173), rgb(88, 0, 146))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "160px",
        whiteSpace: "nowrap",
        position: "absolute",
        fontWeight: 600,
        left: "-153px",
        opacity: 0.25,
        top: "35%",
      }}
    >
      STUDY VHU STUDY VHU STUDY VHU STUDY VHU
    </p>

    <p
      className="moving-text to-right pt-4 hidden md:block"
      style={{
        background:
          "-webkit-linear-gradient(top, rgb(252, 4, 173), rgb(88, 0, 146))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "160px",
        whiteSpace: "nowrap",
        position: "absolute",
        fontWeight: 600,
        right: "-107px",
        opacity: 0.25,
        top: "50%",
      }}
    >
      STUDY VHU STUDY VHU STUDY VHU STUDY VHU
    </p>
  </div>

  {/* 🧩 Nội dung chính */}
  <div className="relative z-10 flex flex-col items-center text-center px-4 w-full overflow-hidden">
    {/* Tiêu đề */}
    <div className="mb-10 px-4">
      <h2
        className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 bg-clip-text text-transparent"
        style={{
          fontFamily: "'Anton', sans-serif",
          display: "inline-block",
          padding: "14px 48px",
          letterSpacing: "2px",
          borderRadius: "10px",
        }}
      >
        Công cụ hỗ trợ học tập này dành cho ai ?
      </h2>

      <p className="text-lg md:text-xl text-purple-800/90 font-medium mt-4 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
        Những đối tượng phù hợp nhất với nền tảng{" "}
        <span className="font-bold text-purple-900">Study&nbsp;VHU</span>
      </p>

      <div className="mt-6 h-1 w-32 bg-gradient-to-r from-pink-400 to-purple-600 mx-auto rounded-full shadow-lg" />
    </div>

    {/* 3 khung nhân vật */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl w-full px-4 md:px-0">
      {[
        {
          num: "01",
          label: "STUDENT",
          title: "Sinh viên VHU",
          desc: "Những sinh viên muốn học hiệu quả hơn, nắm chắc kiến thức, và sử dụng AI để hỗ trợ việc học tập hàng ngày.",
          img: "https://cdn-icons-png.flaticon.com/512/3940/3940413.png",
        },
        {
          num: "02",
          label: "LEARNER",
          title: "Người học chủ động",
          desc: "Những bạn muốn tự học, ôn luyện, hoặc tìm tài liệu – đề thi, bài giảng, công cụ hỗ trợ học tập tiện lợi.",
          img: "https://cdn-icons-png.flaticon.com/512/4712/4712107.png",
        },
        {
          num: "03",
          label: "ALUMNI",
          title: "Cựu sinh viên & người đi làm",
          desc: "Những người đã tốt nghiệp nhưng muốn trau dồi thêm kỹ năng, cập nhật kiến thức mới, hoặc tìm tài liệu hỗ trợ chuyên môn.",
          img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center overflow-hidden"
        >
          {/* Khung ảnh bo tròn */}
          <div className="relative w-56 md:w-64 h-80 md:h-96 bg-gradient-to-b from-purple-600 to-pink-500 rounded-t-[50%] border-4 border-yellow-400 shadow-xl overflow-hidden flex items-center justify-center">
            <img
              src={item.img}
              alt={item.title}
              className="w-32 md:w-44 h-32 md:h-44 object-contain mt-8 md:mt-10"
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-pink-700 text-sm font-bold px-2 py-1 rounded-full mt-2 shadow-md">
              {item.num}
            </div>
          </div>

          {/* Nội dung khung */}
          <div className="mt-6 px-2 md:px-0">
            <span className="text-xs font-semibold bg-pink-100 text-pink-600 px-4 py-1 rounded-full">
              {item.label}
            </span>
            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
            <p className="text-sm text-gray-700 mt-2 max-w-xs mx-auto">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>












<HexagonSection />


<Chatbot/>

<StudyToolsSection />





<section
  id="pricing"
  className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-400 via-purple-700 to-indigo-900 text-white overflow-hidden"
>
  {/* Hiệu ứng nền */}
  <div className="absolute top-10 left-20 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-10 right-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 animate-bounce-slow"></div>

  {/* Khối nội dung chính */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
    
    {/* =============== Thẻ 1 - Gói nhóm học tập =============== */}
    <div className="group bg-white text-center rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]">
      <div className="bg-pink-500 text-white font-bold py-4 text-lg group-hover:brightness-110 transition">
        GÓI HỌC NHÓM
      </div>
      <div className="p-8 text-gray-800">
        <div className="flex justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-pink-300 via-purple-400 to-yellow-300 flex items-center justify-center">
            <img src="/images/group.svg" alt="Gói học nhóm" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Dành cho nhóm từ 3 người trở lên</p>
        <h2 className="text-3xl font-extrabold text-black my-2">Tiết kiệm 20%</h2>
        <p className="text-sm text-gray-500 mb-6">
          Cùng học – cùng tiến bộ. Gói ưu đãi đặc biệt giúp tiết kiệm chi phí khi đăng ký học theo nhóm.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-full transition">
          Đăng kí ngay
        </button>
      </div>
    </div>

    {/* =============== Thẻ 2 - Gói cá nhân =============== */}
    <div className="group bg-white text-center rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]">
      <div className="bg-yellow-400 text-white font-bold py-4 text-lg group-hover:brightness-110 transition">
        GÓI CÁ NHÂN
      </div>
      <div className="p-8 text-gray-800">
        <div className="flex justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 flex items-center justify-center">
            <img src="/images/single.svg" alt="Gói cá nhân" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Phù hợp cho học viên tự học</p>
        <h2 className="text-3xl font-extrabold text-black my-2">Lộ trình riêng biệt</h2>
        <p className="text-sm text-gray-500 mb-6">
          Thiết kế khóa học cá nhân hóa theo năng lực và mục tiêu riêng. Giúp bạn học nhanh – nắm chắc kiến thức.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full transition">
          Đăng kí ngay
        </button>
      </div>
    </div>

    {/* =============== Thẻ 3 - Gói cựu học viên =============== */}
    <div className="group bg-white text-center rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-4 hover:scale-110 hover:shadow-[0_0_40px_10px_rgba(255,255,255,0.2)]">
      <div className="bg-purple-500 text-white font-bold py-4 text-lg group-hover:brightness-110 transition">
        GÓI CỰU HỌC VIÊN
      </div>
      <div className="p-8 text-gray-800">
        <div className="flex justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-300 via-pink-400 to-yellow-300 flex items-center justify-center">
            <img src="/images/oldstudent.svg" alt="Cựu học viên" className="w-24 h-24 object-contain" />
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-2">Ưu đãi đặc biệt cho học viên quay lại</p>
        <h2 className="text-3xl font-extrabold text-black my-2">Giảm đến 30%</h2>
        <p className="text-sm text-gray-500 mb-6">
          Cảm ơn bạn đã đồng hành! Học viên cũ được tặng ưu đãi học phí hoặc khóa kỹ năng miễn phí.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition">
          Đăng kí ngay
        </button>
      </div>
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



    </div>
  );
}

export default App;