import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onRegisterClick?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! 👋 Tôi là trợ lý ảo của Study VHU. Tôi có thể giúp bạn tìm hiểu về:\n\n• Công cụ học tập\n• Công cụ AI\n• Tài liệu học tập\n• Đăng ký tài khoản\n\nBạn muốn biết điều gì?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(xin chào|chào|hello|hi|hey)/)) {
      return 'Xin chào! 👋 Rất vui được hỗ trợ bạn. Bạn muốn tìm hiểu về công cụ học tập, công cụ AI, tài liệu học tập hay đăng ký tài khoản?';
    }

    // Study Tools
    if (lowerMessage.includes('công cụ học tập') || lowerMessage.includes('học tập')) {
      return 'Study VHU cung cấp 4 công cụ học tập chính:\n\n🕒 **Bộ Đếm Pomodoro** - Tăng hiệu suất với phiên học 25 phút\n📝 **Ghi Chú Thông Minh** - Đồng bộ ghi chú trên mọi thiết bị\n📅 **Thời Khóa Biểu** - Lập kế hoạch và theo dõi tiến độ\n📊 **Thống Kê Học Tập** - Phân tích và theo dõi tiến độ\n\nBạn muốn biết thêm về công cụ nào?';
    }

    // Pomodoro
    if (lowerMessage.includes('pomodoro')) {
      return 'Bộ Đếm Pomodoro giúp bạn:\n• Tăng hiệu suất học tập với phiên 25 phút\n• Tự động nghỉ giải lao\n• Thống kê thời gian học\n• Âm thanh thông báo\n\nPhương pháp Pomodoro giúp duy trì sự tập trung cao độ! 🎯';
    }

    // Notes
    if (lowerMessage.includes('ghi chú')) {
      return 'Ghi Chú Thông Minh có các tính năng:\n• Đồng bộ đám mây tự động\n• Tìm kiếm nhanh\n• Chia sẻ ghi chú với bạn bè\n• Tổ chức theo thư mục\n\nGiúp bạn không bao giờ mất ghi chú quan trọng! 📝';
    }

    // Schedule
    if (lowerMessage.includes('thời khóa biểu') || lowerMessage.includes('lịch học')) {
      return 'Thời Khóa Biểu giúp bạn:\n• Lập kế hoạch học tập hiệu quả\n• Nhắc nhở tự động\n• Theo dõi tiến độ\n• Tích hợp với lịch của bạn\n\nQuản lý thời gian thông minh hơn! 📅';
    }

    // Analytics
    if (lowerMessage.includes('thống kê') || lowerMessage.includes('phân tích')) {
      return 'Thống Kê Học Tập cung cấp:\n• Biểu đồ chi tiết về tiến độ\n• Báo cáo học tập\n• Mục tiêu cá nhân\n• Phân tích xu hướng học tập\n\nGiúp bạn hiểu rõ điểm mạnh và cải thiện! 📊';
    }

    // AI Tools
    if (lowerMessage.includes('công cụ ai') || lowerMessage.includes('ai')) {
      return 'Study VHU giới thiệu các công cụ AI hàng đầu:\n\n🤖 **ChatGPT** - Trợ lý AI tổng hợp\n✍️ **Grammarly** - Kiểm tra ngữ pháp tiếng Anh\n🧮 **Wolfram Alpha** - Giải toán và khoa học\n📚 **Notion AI** - Ghi chú và quản lý\n📝 **QuillBot** - Paraphrase và tóm tắt\n📷 **Photomath** - Giải toán từ ảnh\n\nBạn muốn biết chi tiết về công cụ nào?';
    }

    // ChatGPT
    if (lowerMessage.includes('chatgpt') || lowerMessage.includes('chat gpt')) {
      return 'ChatGPT là trợ lý AI mạnh mẽ giúp:\n• Giải thích bài tập phức tạp\n• Viết luận văn và bài tập\n• Brainstorming ý tưởng\n• Trả lời câu hỏi học tập\n\nRất hữu ích cho nghiên cứu và viết lách! 🤖';
    }

    // Grammarly
    if (lowerMessage.includes('grammarly')) {
      return 'Grammarly giúp bạn:\n• Kiểm tra ngữ pháp tiếng Anh\n• Cải thiện văn phong\n• Đề xuất từ vựng tốt hơn\n• Phát hiện lỗi chính tả\n\nHoàn hảo cho sinh viên học tiếng Anh! ✍️';
    }

    // Wolfram Alpha
    if (lowerMessage.includes('wolfram')) {
      return 'Wolfram Alpha là công cụ tính toán mạnh mẽ:\n• Giải phương trình toán học\n• Vẽ đồ thị\n• Tính toán khoa học phức tạp\n• Tra cứu công thức\n\nLý tưởng cho toán học và khoa học! 🧮';
    }

    // Study Materials
    if (lowerMessage.includes('tài liệu') || lowerMessage.includes('học liệu')) {
      return 'Study VHU cung cấp tài liệu đa dạng:\n\n💻 **Khoa Học Máy Tính** - 156 tài liệu\n🔢 **Toán Học & Thống Kê** - 234 tài liệu\n💼 **Kinh Tế & Quản Trị** - 189 tài liệu\n⚡ **Khoa Học & Kỹ Thuật** - 298 tài liệu\n🌐 **Ngôn Ngữ & Văn Học** - 167 tài liệu\n⚕️ **Y Học & Sức Khỏe** - 203 tài liệu\n\nBạn quan tâm đến lĩnh vực nào?';
    }

    // Computer Science
    if (lowerMessage.includes('máy tính') || lowerMessage.includes('lập trình') || lowerMessage.includes('code')) {
      return 'Tài liệu Khoa Học Máy Tính bao gồm:\n• Cấu Trúc Dữ Liệu\n• Thuật Toán\n• Lập Trình (nhiều ngôn ngữ)\n• 156 tài liệu từ cơ bản đến nâng cao\n\nTừ Đại học Bách Khoa với 12K+ lượt tải! 💻';
    }

    // Math
    if (lowerMessage.includes('toán')) {
      return 'Tài liệu Toán Học & Thống Kê gồm:\n• Giải Tích\n• Đại Số Tuyến Tính\n• Thống Kê\n• 234 tài liệu từ THPT đến Đại Học\n\nTừ Đại học Khoa học Tự nhiên với 18K+ lượt tải! 🔢';
    }

    // Registration
    if (lowerMessage.includes('đăng ký') || lowerMessage.includes('tài khoản') || lowerMessage.includes('sign up')) {
      if (onRegisterClick) {
        setTimeout(() => onRegisterClick(), 500);
      }
      return 'Để đăng ký tài khoản Study VHU, bạn cần:\n\n1. Điền form đăng ký (tên, email, SĐT)\n2. Chọn năm học và chuyên ngành\n3. Chọn sở thích học tập\n4. Gửi form\n\nTôi sẽ mở form đăng ký cho bạn ngay! ✨';
    }

    // Features
    if (lowerMessage.includes('tính năng') || lowerMessage.includes('làm được gì')) {
      return 'Study VHU giúp bạn:\n\n✨ Học tập hiệu quả hơn với công cụ Pomodoro\n📝 Quản lý ghi chú thông minh\n📅 Lập kế hoạch học tập\n📊 Theo dõi tiến độ\n🤖 Truy cập công cụ AI hàng đầu\n📚 Tài liệu học tập phong phú\n\nTất cả trong một nền tảng duy nhất!';
    }

    // Benefits
    if (lowerMessage.includes('lợi ích') || lowerMessage.includes('tại sao')) {
      return 'Lợi ích khi dùng Study VHU:\n\n🎯 Tăng hiệu suất học tập 40%\n⏰ Quản lý thời gian tốt hơn\n📈 Theo dõi tiến độ rõ ràng\n🤝 Cộng đồng sinh viên VHU\n💡 Công cụ AI miễn phí\n📚 Tài liệu đầy đủ, cập nhật\n\nNền tảng toàn diện cho sinh viên!';
    }

    // Price/Cost
    if (lowerMessage.includes('giá') || lowerMessage.includes('phí') || lowerMessage.includes('miễn phí')) {
      return 'Study VHU hoàn toàn MIỄN PHÍ! 🎉\n\n• Không mất phí đăng ký\n• Không giới hạn tính năng\n• Truy cập tất cả tài liệu\n• Cập nhật thường xuyên\n\nĐăng ký ngay để trải nghiệm!';
    }

    // Help/Support
    if (lowerMessage.includes('giúp') || lowerMessage.includes('hỗ trợ') || lowerMessage.includes('help')) {
      return 'Tôi có thể giúp bạn về:\n\n1️⃣ Công cụ học tập (Pomodoro, Ghi chú, Lịch...)\n2️⃣ Công cụ AI (ChatGPT, Grammarly...)\n3️⃣ Tài liệu học tập (các lĩnh vực)\n4️⃣ Đăng ký tài khoản\n5️⃣ Tính năng và lợi ích\n\nHãy hỏi tôi bất cứ điều gì! 😊';
    }

    // Contact
    if (lowerMessage.includes('liên hệ') || lowerMessage.includes('contact')) {
      return 'Bạn có thể liên hệ với Study VHU qua:\n\n📧 Email: support@studyvhu.com\n🌐 Website: https://studyvhu.com\n\nHoặc điền form đăng ký và chúng tôi sẽ liên hệ lại với bạn!';
    }
   // Emotional / casual responses
  if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thanks')) {
    return 'Không có gì đâu 😊. Rất vui khi được giúp bạn!';
  }
    // Default response
    return 'Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. 😅\n\nBạn có thể hỏi tôi về:\n• Công cụ học tập\n• Công cụ AI\n• Tài liệu học tập\n• Đăng ký tài khoản\n• Tính năng và lợi ích\n\nHoặc gõ "giúp" để xem các chủ đề tôi có thể hỗ trợ!';
  
      // Motivation
  if (lowerMessage.includes('học tốt') || lowerMessage.includes('mẹo học') || lowerMessage.includes('lười')) {
    return '💡 Mẹo học tập hiệu quả:\n1️⃣ Dùng Pomodoro 25 phút\n2️⃣ Ghi chú ngắn gọn bằng từ khóa\n3️⃣ Học theo nhóm hoặc dùng AI hỗ trợ\n4️⃣ Nghỉ ngơi đủ và tập thể dục nhẹ\n\nKiên trì nhỏ mỗi ngày tạo nên thành công lớn! 🚀';
  }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };





    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: '📚 Tài liệu', action: 'Tài liệu học tập có gì?' },
    { label: '🤖 AI Tools', action: 'Công cụ AI có gì?' },
    { label: '🕒 Học tập', action: 'Công cụ học tập là gì?' },
    { label: '✨ Đăng ký', action: 'Làm sao để đăng ký?' },
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute right-full mr-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              Cần giúp đỡ? Hãy hỏi tôi!
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Study VHU Bot</h3>
                  <p className="text-xs text-white/80">Trợ lý học tập thông minh</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-gray-50 border-b flex gap-2 overflow-x-auto scrollbar-hide">
              {quickActions.map((qa, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(qa.action)}
                  className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-xs font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 transition-all duration-200 whitespace-nowrap shadow-sm"
                >
                  {qa.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm'
                        : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-md border border-gray-100'
                    } px-4 py-3`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-1 text-purple-600 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-md border border-gray-100 px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-4 bg-white border-t">
              <div className="flex items-center space-x-2">
           <input
  ref={inputRef}
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="💬 Gõ câu hỏi của bạn..."
  className="flex-1 px-5 py-3 rounded-full bg-white/80 text-gray-800 placeholder-gray-400 shadow-inner 
             border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-300 
             transition-all duration-200 outline-none"
 />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="w-11 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Nhấn Enter để gửi tin nhắn
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
