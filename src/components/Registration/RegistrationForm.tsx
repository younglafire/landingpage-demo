import React, { useState } from 'react';
import { X, Mail, User, GraduationCap, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'modal' | 'inline';
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  yearOfStudy: string;
  major: string;
  university: string;
  interests: string[];
}

const studyYears = [
  'Năm 1',
  'Năm 2', 
  'Năm 3',
  'Năm 4',
  'Năm 5',
  'Sau đại học'
];

const majors = [
  'Công nghệ thông tin',
  'Kỹ thuật phần mềm',
  'Khoa học máy tính',
  'Toán học',
  'Vật lý',
  'Hóa học',
  'Sinh học',
  'Kinh tế',
  'Quản trị kinh doanh',
  'Kế toán',
  'Tài chính',
  'Marketing',
  'Ngôn ngữ Anh',
  'Văn học',
  'Lịch sử',
  'Triết học',
  'Y học',
  'Dược học',
  'Điều dưỡng',
  'Kỹ thuật cơ khí',
  'Kỹ thuật điện',
  'Kỹ thuật xây dựng',
  'Kiến trúc',
  'Khác'
];

const interestOptions = [
  'AI và Machine Learning',
  'Lập trình',
  'Toán học',
  'Khoa học',
  'Kinh doanh',
  'Ngoại ngữ',
  'Nghệ thuật',
  'Thể thao',
  'Du lịch',
  'Âm nhạc',
  'Đọc sách',
  'Viết lách'
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ 
  isOpen, 
  onClose, 
  variant = 'modal' 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    yearOfStudy: '',
    major: '',
    university: '',
    interests: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập họ và tên');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (!formData.yearOfStudy) {
      toast.error('Vui lòng chọn năm học');
      return false;
    }
    if (!formData.major) {
      toast.error('Vui lòng chọn chuyên ngành');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = 'service_gmpuo1u';
      const templateId = 'template_ezrvb8l';
      const publicKey = 'kbM08mVTKZ_oUTTIJkbM08mVTKZ_oUTTIJ';

      // Prepare template parameters
      const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        year_of_study: formData.yearOfStudy,
        major: formData.major,
        university: formData.university,
        interests: formData.interests.join(', '),
        registration_date: new Date().toLocaleDateString('vi-VN'),
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setIsSubmitted(true);
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email của bạn.');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          yearOfStudy: '',
          major: '',
          university: '',
          interests: []
        });
        if (variant === 'modal') {
          onClose();
        }
      }, 3000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <div className="space-y-6">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h3>
          <p className="text-gray-600">
            Cảm ơn bạn đã đăng ký. Chúng tôi đã gửi email xác nhận đến địa chỉ của bạn.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trường đại học
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tên trường đại học"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Năm học *
              </label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn năm học</option>
                {studyYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chuyên ngành *
              </label>
              <select
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn chuyên ngành</option>
                {majors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sở thích học tập (chọn tối đa 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  disabled={!formData.interests.includes(interest) && formData.interests.length >= 5}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Đăng ký ngay</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );

  if (variant === 'inline') {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Đăng Ký Tham Gia Study VHU
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tham gia cộng đồng học tập thông minh và nhận được những công cụ hỗ trợ học tập tốt nhất.
          </p>
        </div>
        {formContent}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Đăng Ký Study VHU
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {formContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};