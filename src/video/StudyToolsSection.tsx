import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, FileText, Users, Shield } from "lucide-react";

interface Tool {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export default function StudyToolsDemo() {
  const tools: Tool[] = [
    {
      id: "timer",
      title: "Bộ đếm thời gian",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description:
        "Tập trung hơn với bộ đếm Pomodoro và hẹn giờ học thông minh.",
      features: [
        "Chế độ Pomodoro",
        "Hẹn giờ linh hoạt",
        "Nhắc nhở nghỉ ngơi",
        "Theo dõi số lần hoàn thành",
      ],
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "schedule",
      title: "Thời khóa biểu",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
      description:
        "Sắp xếp thời gian học tập khoa học với thời khóa biểu thông minh.",
      features: [
        "Tạo lịch học",
        "Xem lịch theo tuần/tháng",
        "Thông báo nhắc học",
        "Đồng bộ Google Calendar",
      ],
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "notes",
      title: "Ghi chú",
      videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
      description:
        "Ghi chép và lưu trữ thông tin học tập dễ dàng mọi lúc mọi nơi.",
      features: [
        "Soạn ghi chú nhanh",
        "Đính kèm hình ảnh",
        "Đồng bộ đa thiết bị",
        "Tìm kiếm thông minh",
      ],
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "group",
      title: "Học nhóm",
      videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
      description:
        "Cùng bạn bè trao đổi và học tập hiệu quả hơn với công cụ học nhóm.",
      features: [
        "Chat nhóm",
        "Chia sẻ tài liệu",
        "Họp video trực tiếp",
        "Bảng trắng cộng tác",
      ],
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "secure",
      title: "Bảo mật dữ liệu",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
      description: "Dữ liệu học tập của bạn luôn được bảo vệ an toàn.",
      features: [
        "Mã hóa dữ liệu",
        "Sao lưu đám mây",
        "Quyền riêng tư cá nhân",
        "Quản lý đăng nhập",
      ],
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  const [activeTool, setActiveTool] = useState<Tool>(tools[0]);

  return (
    <section
      id="video"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white px-6 py-20"
    >
      {/* Hiệu ứng mờ nền */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-purple-600/30 blur-[160px] rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[20rem] h-[20rem] bg-blue-500/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 mb-10"
      >
  <h1
  className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-300 via-pink-400 to-blue-400 bg-clip-text text-transparent inline-block leading-tight md:leading-[1.1]"
>
  Bộ Công Cụ Học Tập
</h1>

<p className="text-base md:text-lg text-white/80 mt-4 leading-relaxed max-w-2xl mx-auto">
  Quản lý thời gian, ghi chú và học nhóm — tất cả trong một nền tảng duy nhất.
</p>

      </motion.div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-10 bg-white/10 backdrop-blur-lg rounded-full px-5 py-3 border border-white/10 shadow-lg relative z-10"
      >
        {tools.map((tool) => (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTool(tool)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-medium ${
              activeTool.id === tool.id
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {tool.icon}
            {tool.title}
          </motion.button>
        ))}
      </motion.div>

      {/* Content Card */}
      <motion.div
        key={activeTool.id}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Video Section */}
        <div className="relative w-full aspect-video md:aspect-auto md:h-[28rem]">
          <iframe
            src={activeTool.videoUrl}
            title={activeTool.title}
            className="absolute inset-0 w-full h-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Info Section */}
        <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-purple-950/40 to-blue-900/30">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
            {activeTool.icon} {activeTool.title}
          </h2>
          <p className="text-white/90 mb-5">{activeTool.description}</p>

          <h3 className="text-purple-300 font-semibold mb-2">
            ✨ Tính năng nổi bật
          </h3>
          <ul className="space-y-1">
            {activeTool.features.map((f, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="text-pink-400 mr-2">✔</span> {f}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-sm shadow-lg hover:shadow-pink-500/30 transition-all duration-300 w-fit"
          >
            Tìm hiểu thêm
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
