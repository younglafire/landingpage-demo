import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, StickyNote, Calendar, Brain, Users, Target, Code,Zap, Star, ArrowRight, Play, Download, ChevronRight, ChevronUp, GraduationCap, Lightbulb, Bookmark, Search, TrendingUp, Award, FileText, Calculator, Globe, Cpu, MessageSquare, PenTool, Filter, ChevronDown, Plus, Minus, Save, CreditCard as Edit3, Trash2, CheckCircle, BarChart3, Settings, Eye, Heart, Rocket, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Layout/Header';
import { RegistrationForm } from './components/Registration/RegistrationForm';
import StudyToolsSection from './video/StudyToolsSection';




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
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0f172a]">
    {/* Background gradient + shape */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
    <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-10 left-10"></div>
    <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

    {/* Content container */}
    <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
      {/* LEFT TEXT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Nền tảng học tập <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            thông minh dành cho sinh viên VHU
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
          Nâng cao hiệu quả học tập với công cụ AI tiên tiến, tài liệu học tập đầy đủ,
          và các tính năng năng suất được thiết kế dành riêng cho sinh viên.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleRegisterNow}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Play className="w-5 h-5" />
            <span>Đăng Ký Ngay</span>
          </button>
        </div>
      </motion.div>

      {/* RIGHT ILLUSTRATION SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-center items-center"
      >
        {/* Ảnh minh họa tạm (bạn có thể đổi link này sang ảnh PNG/SVG tùy ý) */}
        <img
          src="hinhanh/Learning.svg"
          
          alt="Study Illustration"
        className="w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] object-contain drop-shadow-2xl"

        />

        {/* Floating small icons / shapes */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 left-10 w-16 h-16 bg-blue-500/30 rounded-full blur-xl"
        ></motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 -right-10 w-20 h-20 bg-pink-500/30 rounded-full blur-xl"
        ></motion.div>
      </motion.div>
    </div>
  </section>




{/* Introducing Section */}
<section id="introducing" className="py-24 bg-gradient-to-br from-[#0A0F1E] via-[#111936] to-[#1C0F2E] relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

    {/* Text Content */}
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Giới thiệu về <br /> Study VHU
      </h2>

      <p className="text-xl text-gray-300 leading-relaxed">
        <span className="font-semibold text-purple-300">Study VHU</span> không chỉ là một ứng dụng học tập – 
        mà là <strong className="text-blue-300">nền tảng toàn diện</strong>, giúp sinh viên VHU quản lý việc học,
        rèn luyện kỷ luật, và phát triển bản thân trong kỷ nguyên số.
      </p>

      <p className="text-lg text-gray-400 leading-relaxed">
        Từ Pomodoro, ghi chú, thống kê học tập cho đến trợ lý AI, Study VHU mang đến một không gian học tập
        <span className="text-pink-300"> tập trung – thông minh – hiệu quả</span>.
      </p>

      <p className="text-lg text-gray-400 leading-relaxed">
        Với triết lý <span className="font-semibold text-purple-300">“Học tập không giới hạn”</span>, Study VHU
        hướng tới việc tạo ra một môi trường nơi mọi sinh viên đều có thể khai phá tiềm năng tối đa của mình.
      </p>
    </motion.div>

    {/* Image Grid */}
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 gap-6"
    >
      {/* Large Image */}
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="col-span-2"
      >
        <img 
          src="hinhanh/Online calendar-pana.svg" 
          alt="Study VHU Dashboard"
          className="rounded-2xl shadow-xl border border-purple-500/30"
        />
      </motion.div>

      {/* Small Image 1 */}
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        <img 
          src="hinhanh/Research paper-amico (1).svg" 
          alt="Pomodoro Tool"
          className="rounded-2xl shadow-xl border border-blue-500/30"
        />
      </motion.div>

      {/* Small Image 2 */}
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <img 
          src="hinhanh/Notes-bro.svg" 
          alt="Study Statistics"
          className="rounded-2xl shadow-xl border border-pink-500/30"
        />
      </motion.div>
    </motion.div>

  </div>
</section>



<StudyToolsSection />





        {/* AI Tools Section */}
        <section id="ai" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Công Nghệ AI Hỗ Trợ Học Tập
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Khám phá các công cụ AI tốt nhất để tăng tốc quá trình học tập và nâng cao hiệu suất học tập.
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/4"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Lọc & Tìm Kiếm</h3>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm công cụ AI..."
                        value={aiSearchTerm}
                        onChange={(e) => setAiSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3 text-sm">Danh Mục</h4>
                    <div className="space-y-2">
                      {aiCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedAiCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedAiCategory === category
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Hiển thị {filteredAiTools.length} / {aiTools.length} công cụ
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - AI Tools Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-3/4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredAiTools.map((tool, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 flex flex-col h-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                            <tool.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {tool.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{tool.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">{tool.name}</h3>
                      <p className="text-gray-600 mb-3 text-sm flex-grow">{tool.description}</p>
                      <p className="text-xs text-gray-500 mb-4 italic">{tool.useCase}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tool.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-gray-500">{tool.users} người dùng</span>
                        <button 
                          onClick={handleRegisterNow}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-1 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <span>Đăng Ký</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredAiTools.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Search className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">Không tìm thấy công cụ AI phù hợp với tiêu chí tìm kiếm.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>















        

        {/* Study Materials Section */}
        <section id="materials" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tài Liệu Học Tập Toàn Diện
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Truy cập hàng nghìn tài liệu học tập được tuyển chọn kỹ lưỡng theo nhiều chủ đề và cấp độ khác nhau.
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Sidebar - Filters */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/4"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Lọc & Tìm Kiếm</h3>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm tài liệu..."
                        value={materialsSearchTerm}
                        onChange={(e) => setMaterialsSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3 text-sm">Lĩnh Vực</h4>
                    <div className="space-y-2">
                      {materialCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedMaterialsCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedMaterialsCategory === category
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-3 text-sm">Bộ Lọc Nhanh</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                        📚 Tài liệu mới nhất
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                        ⭐ Đánh giá cao
                      </button>
                      <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                        🔥 Phổ biến nhất
                      </button>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Hiển thị {filteredMaterials.length} / {studyMaterials.length} tài liệu
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Content - Materials Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-3/4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredMaterials.map((material, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200/50 flex flex-col h-full"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <material.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-right">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium block mb-1">
                            {material.resources} Tài Liệu
                          </span>
                          <span className="text-xs text-gray-500">{material.downloads} lượt tải</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{material.title}</h3>
                      <p className="text-gray-600 mb-2 text-sm flex-grow">{material.description}</p>
                      <p className="text-gray-600 mb-2 text-sm">📍 {material.university}</p>
                      <p className="text-gray-600 mb-4 text-sm">🎓 Cấp độ: {material.level}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-700 mb-2 text-sm">Môn học bao gồm:</h4>
                        <div className="flex flex-wrap gap-2">
                          {material.subjects.map((subject, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-auto">
                        <button 
                          onClick={handleRegisterNow}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                        >
                          Đăng Ký Truy Cập
                        </button>
                        <button className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredMaterials.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <BookOpen className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">Không tìm thấy tài liệu phù hợp với tiêu chí tìm kiếm.</p>
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

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
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