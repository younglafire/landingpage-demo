import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  StickyNote, 
  Calendar, 
  BarChart3, 
  Brain, 
  Calculator, 
  BookOpen, 
  Target, 
  Timer, 
  FileText, 
  PenTool, 
  Search, 
  Filter, 
  Star, 
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  MessageSquare,
  Globe,
  Award,
  Cpu,
  TrendingUp,
  Users,
  Zap,
  Settings,
  ChevronRight,
  Lightbulb,
  Rocket,
  Shield,
  Heart
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AdvancedPomodoro } from '../Tools/AdvancedPomodoro';
import { SmartNotes } from '../Tools/SmartNotes';
import { ScheduleManager } from '../Tools/ScheduleManager';
import { StudyAnalytics } from './StudyAnalytics';
import toast from 'react-hot-toast';

export const StudyDashboard: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [aiSearchTerm, setAiSearchTerm] = useState('');
  const [selectedAiCategory, setSelectedAiCategory] = useState('Tất Cả');

  const studyTools = [
    {
      id: 'pomodoro',
      icon: Clock,
      title: "Bộ Đếm Pomodoro",
      description: "Tăng hiệu suất học tập với phiên học tập tập trung 25 phút",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      features: ["Tự động nghỉ giải lao", "Thống kê thời gian học", "Âm thanh thông báo"],
      component: AdvancedPomodoro
    },
    {
      id: 'notes',
      icon: StickyNote,
      title: "Ghi Chú Thông Minh",
      description: "Tổ chức và đồng bộ ghi chú trên mọi thiết bị",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      features: ["Đồng bộ đám mây", "Tìm kiếm nhanh", "Chia sẻ ghi chú"],
      component: SmartNotes
    },
    {
      id: 'schedule',
      icon: Calendar,
      title: "Thời Khóa Biểu",
      description: "Lập kế hoạch học tập và theo dõi tiến độ",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      features: ["Nhắc nhở tự động", "Theo dõi tiến độ", "Tích hợp lịch"],
      component: ScheduleManager
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: "Thống Kê Học Tập",
      description: "Phân tích và theo dõi tiến độ học tập của bạn",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      features: ["Biểu đồ chi tiết", "Báo cáo tiến độ", "Mục tiêu cá nhân"],
      component: StudyAnalytics
    },
    {
      id: 'flashcards',
      icon: Brain,
      title: "Thẻ Ghi Nhớ",
      description: "Học từ vựng và kiến thức với hệ thống thẻ thông minh",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      features: ["Thuật toán lặp lại", "Theo dõi tiến độ", "Chia sẻ bộ thẻ"],
      component: null
    },
    {
      id: 'mindmap',
      icon: Target,
      title: "Sơ Đồ Tư Duy",
      description: "Tạo sơ đồ tư duy để tổ chức ý tưởng và kiến thức",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      features: ["Giao diện kéo thả", "Xuất nhiều định dạng", "Cộng tác nhóm"],
      component: null
    },
    {
      id: 'quiz',
      icon: Award,
      title: "Tạo Bài Kiểm Tra",
      description: "Tự tạo bài kiểm tra để ôn luyện kiến thức",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      features: ["Nhiều dạng câu hỏi", "Chấm điểm tự động", "Phân tích kết quả"],
      component: null
    },
    {
      id: 'focus',
      icon: Zap,
      title: "Chế Độ Tập Trung",
      description: "Chặn các trang web gây phân tâm khi học tập",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      features: ["Chặn website", "Thống kê thời gian", "Chế độ khẩn cấp"],
      component: null
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
      tags: ["Nghiên cứu", "Viết lách", "Giải đáp"],
      url: "https://chat.openai.com",
      isPremium: false
    },
    {
      name: "Grammarly",
      description: "Trợ lý viết AI cho ngữ pháp và phong cách hoàn hảo",
      category: "Viết Lách",
      rating: 4.7,
      users: "30M+",
      icon: PenTool,
      useCase: "Kiểm tra ngữ pháp tiếng Anh, cải thiện văn phong",
      tags: ["Ngữ pháp", "Tiếng Anh", "Chỉnh sửa"],
      url: "https://grammarly.com",
      isPremium: true
    },
    {
      name: "Wolfram Alpha",
      description: "Công cụ tính toán tri thức cho toán học và khoa học",
      category: "Toán Học",
      rating: 4.6,
      users: "10M+",
      icon: Calculator,
      useCase: "Giải phương trình, vẽ đồ thị, tính toán phức tạp",
      tags: ["Toán học", "Khoa học", "Tính toán"],
      url: "https://wolframalpha.com",
      isPremium: false
    },
    {
      name: "Notion AI",
      description: "Không gian làm việc thông minh cho ghi chú và quản lý dự án",
      category: "Năng Suất",
      rating: 4.8,
      users: "20M+",
      icon: FileText,
      useCase: "Tổ chức ghi chú, lập kế hoạch học tập, quản lý nhóm",
      tags: ["Ghi chú", "Quản lý", "Tổ chức"],
      url: "https://notion.so",
      isPremium: true
    },
    {
      name: "QuillBot",
      description: "Công cụ AI paraphrase và tóm tắt văn bản",
      category: "Viết Lách",
      rating: 4.5,
      users: "15M+",
      icon: Globe,
      useCase: "Viết lại câu, tóm tắt tài liệu, cải thiện từ vựng",
      tags: ["Paraphrase", "Tóm tắt", "Từ vựng"],
      url: "https://quillbot.com",
      isPremium: false
    },
    {
      name: "Photomath",
      description: "Giải toán AI với lời giải từng bước chi tiết",
      category: "Toán Học",
      rating: 4.7,
      users: "50M+",
      icon: Cpu,
      useCase: "Giải bài tập toán, học cách giải từng bước",
      tags: ["Giải toán", "Từng bước", "Học tập"],
      url: "https://photomath.com",
      isPremium: false
    },
    {
      name: "Coursera AI",
      description: "Nền tảng học trực tuyến với AI cá nhân hóa",
      category: "Giáo Dục",
      rating: 4.6,
      users: "25M+",
      icon: BookOpen,
      useCase: "Khóa học trực tuyến, chứng chỉ, học theo lộ trình",
      tags: ["Khóa học", "Chứng chỉ", "Trực tuyến"],
      url: "https://coursera.org",
      isPremium: true
    },
    {
      name: "Duolingo",
      description: "Học ngoại ngữ với AI thích ứng",
      category: "Ngôn Ngữ",
      rating: 4.7,
      users: "40M+",
      icon: Globe,
      useCase: "Học tiếng Anh, tiếng Trung, các ngôn ngữ khác",
      tags: ["Ngoại ngữ", "Tiếng Anh", "Luyện tập"],
      url: "https://duolingo.com",
      isPremium: false
    },
    {
      name: "Perplexity AI",
      description: "Công cụ tìm kiếm AI với nguồn tin đáng tin cậy",
      category: "Nghiên Cứu",
      rating: 4.5,
      users: "5M+",
      icon: Search,
      useCase: "Nghiên cứu học thuật, tìm kiếm thông tin chính xác",
      tags: ["Tìm kiếm", "Nghiên cứu", "Nguồn tin"],
      url: "https://perplexity.ai",
      isPremium: false
    },
    {
      name: "Anki",
      description: "Hệ thống thẻ ghi nhớ với thuật toán lặp lại cách quãng",
      category: "Ghi Nhớ",
      rating: 4.6,
      users: "8M+",
      icon: Brain,
      useCase: "Học từ vựng, ghi nhớ kiến thức lâu dài",
      tags: ["Thẻ ghi nhớ", "Lặp lại", "Ghi nhớ"],
      url: "https://apps.ankiweb.net",
      isPremium: false
    }
  ];

  const aiCategories = ["Tất Cả", "AI Tổng Hợp", "Viết Lách", "Toán Học", "Năng Suất", "Giáo Dục", "Ngôn Ngữ", "Nghiên Cứu", "Ghi Nhớ"];

  const filteredAiTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(aiSearchTerm.toLowerCase()));
    const matchesCategory = selectedAiCategory === 'Tất Cả' || tool.category === selectedAiCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (toolId: string) => {
    const tool = studyTools.find(t => t.id === toolId);
    if (tool?.component) {
      setActiveTool(toolId);
      setActiveTab('tools');
    } else {
      toast.info('Công cụ này đang được phát triển!');
    }
  };

  const handleAiToolClick = (url: string, name: string) => {
    window.open(url, '_blank');
    toast.success(`Đang chuyển đến ${name}`);
  };

  const renderActiveToolComponent = () => {
    const tool = studyTools.find(t => t.id === activeTool);
    if (tool?.component) {
      const Component = tool.component;
      return <Component />;
    }
    return null;
  };

  const tabs = [
    { id: 'overview', label: 'Tổng Quan', icon: BarChart3 },
    { id: 'tools', label: 'Công Cụ Học Tập', icon: Settings },
    { id: 'ai', label: 'AI Hỗ Trợ', icon: Brain },
    { id: 'progress', label: 'Tiến Độ', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Chào mừng trở lại, {user?.name}! 👋
                </h1>
                <p className="text-gray-600">
                  Sẵn sàng cho một phiên học tập hiệu quả hôm nay?
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-500">Ngày liên tiếp</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">2.5h</div>
                  <div className="text-sm text-gray-500">Hôm nay</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">85%</div>
                  <div className="text-sm text-gray-500">Mục tiêu tuần</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50">
            <div className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'tools') setActiveTool(null);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studyTools.slice(0, 4).map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleToolClick(tool.id)}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 cursor-pointer"
                  >
                    <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{tool.title}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Hoạt Động Gần Đây</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Hoàn thành phiên Pomodoro 25 phút</p>
                      <p className="text-sm text-gray-500">Môn: Toán học - 2 giờ trước</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <StickyNote className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Tạo ghi chú mới: "Công thức đạo hàm"</p>
                      <p className="text-sm text-gray-500">4 giờ trước</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Hoàn thành bài tập Vật lý</p>
                      <p className="text-sm text-gray-500">Hôm qua</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tools' && (
            <motion.div
              key="tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {activeTool ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {studyTools.find(t => t.id === activeTool)?.title}
                    </h2>
                    <button
                      onClick={() => setActiveTool(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Quay lại
                    </button>
                  </div>
                  {renderActiveToolComponent()}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {studyTools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleToolClick(tool.id)}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 cursor-pointer"
                    >
                      <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4`}>
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">{tool.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
                      <div className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tool.component ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tool.component ? 'Sẵn sàng' : 'Sắp ra mắt'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* AI Tools Header */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Hỗ Trợ Học Tập</h2>
                <p className="text-gray-600 mb-6">
                  Khám phá các công cụ AI tốt nhất để tăng tốc quá trình học tập và nâng cao hiệu suất.
                </p>

                {/* Search and Filter */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm công cụ AI..."
                      value={aiSearchTerm}
                      onChange={(e) => setAiSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedAiCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedAiCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Hiển thị {filteredAiTools.length} / {aiTools.length} công cụ
                </div>
              </div>

              {/* AI Tools Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAiTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <tool.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            {tool.category}
                          </span>
                          {tool.isPremium && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{tool.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{tool.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm">{tool.description}</p>
                    <p className="text-xs text-gray-500 mb-4 italic">{tool.useCase}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{tool.users} người dùng</span>
                      <button
                        onClick={() => handleAiToolClick(tool.url, tool.name)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[100px]"
                      >
                        <span>Truy Cập</span>
                        <ExternalLink className="w-4 h-4" />
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
          )}

          {activeTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StudyAnalytics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};