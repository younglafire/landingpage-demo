import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, BookOpen, Edit3, Trash2, CheckCircle, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { format, addDays, startOfWeek, isSameDay, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import toast from 'react-hot-toast';

export const ScheduleManager: React.FC = () => {
  const { scheduleItems, addScheduleItem, updateScheduleItem, deleteScheduleItem } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [filterType, setFilterType] = useState<'all' | 'class' | 'study' | 'exam' | 'assignment'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newItem, setNewItem] = useState({
    title: '',
    subject: '',
    location: '',
    startTime: '',
    endTime: '',
    type: 'class' as const,
  });

  const typeColors = {
    class: 'bg-blue-100 text-blue-800 border-blue-200',
    study: 'bg-green-100 text-green-800 border-green-200',
    exam: 'bg-red-100 text-red-800 border-red-200',
    assignment: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const typeLabels = {
    class: 'Lớp học',
    study: 'Tự học',
    exam: 'Thi cử',
    assignment: 'Bài tập',
  };

  const handleAddItem = () => {
    if (!newItem.title.trim() || !newItem.startTime || !newItem.endTime) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const startDateTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newItem.startTime}`);
    const endDateTime = new Date(`${format(selectedDate, 'yyyy-MM-dd')}T${newItem.endTime}`);

    if (endDateTime <= startDateTime) {
      toast.error('Thời gian kết thúc phải sau thời gian bắt đầu');
      return;
    }

    addScheduleItem({
      title: newItem.title,
      subject: newItem.subject,
      location: newItem.location,
      startTime: startDateTime,
      endTime: endDateTime,
      type: newItem.type,
      isCompleted: false,
    });

    setNewItem({
      title: '',
      subject: '',
      location: '',
      startTime: '',
      endTime: '',
      type: 'class',
    });
    setShowAddForm(false);
    toast.success('Đã thêm lịch trình mới');
  };

  const toggleComplete = (id: string) => {
    const item = scheduleItems.find(item => item.id === id);
    if (item) {
      updateScheduleItem(id, { isCompleted: !item.isCompleted });
      toast.success(item.isCompleted ? 'Đã bỏ đánh dấu hoàn thành' : 'Đã đánh dấu hoàn thành');
    }
  };

  const handleDelete = (id: string) => {
    deleteScheduleItem(id);
    toast.success('Đã xóa lịch trình');
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const getItemsForDate = (date: Date) => {
    return scheduleItems.filter(item => {
      const itemDate = new Date(item.startTime);
      const matchesDate = isSameDay(itemDate, date);
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDate && matchesType && matchesSearch;
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const weekDays = getWeekDays();

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Thời Khóa Biểu</h2>
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tuần
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ngày
            </button>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm lịch</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm lịch trình..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(typeLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setFilterType(filterType === type ? 'all' : type as any)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors border ${
                filterType === type
                  ? typeColors[type as keyof typeof typeColors]
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
          {filterType !== 'all' && (
            <button
              onClick={() => setFilterType('all')}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Date Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, viewMode === 'week' ? -7 : -1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ←
          </button>
          <h3 className="text-lg font-semibold text-gray-800">
            {viewMode === 'week' 
              ? `Tuần ${format(weekDays[0], 'dd/MM')} - ${format(weekDays[6], 'dd/MM/yyyy')}`
              : format(selectedDate, 'EEEE, dd/MM/yyyy', { locale: vi })
            }
          </h3>
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, viewMode === 'week' ? 7 : 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            →
          </button>
        </div>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
        >
          Hôm nay
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 rounded-xl"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Thêm lịch trình mới</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tiêu đề"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Môn học"
                value={newItem.subject}
                onChange={(e) => setNewItem({ ...newItem, subject: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Địa điểm"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(typeLabels).map(([type, label]) => (
                  <option key={type} value={type}>{label}</option>
                ))}
              </select>
              <input
                type="time"
                value={newItem.startTime}
                onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={newItem.endTime}
                onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAddItem}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm</span>
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Hủy
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule View */}
      {viewMode === 'week' ? (
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="min-h-[300px]">
              <div className="text-center mb-2 p-2 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-600">
                  {format(day, 'EEE', { locale: vi })}
                </div>
                <div className={`text-lg font-bold ${
                  isSameDay(day, new Date()) ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {format(day, 'dd')}
                </div>
              </div>
              <div className="space-y-2">
                {getItemsForDate(day).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-2 rounded-lg border text-xs ${typeColors[item.type]} ${
                      item.isCompleted ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="font-medium truncate">{item.title}</div>
                    <div className="text-xs opacity-75">
                      {format(new Date(item.startTime), 'HH:mm')} - {format(new Date(item.endTime), 'HH:mm')}
                    </div>
                    {item.location && (
                      <div className="text-xs opacity-75 truncate">{item.location}</div>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`p-1 rounded transition-colors ${
                          item.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {getItemsForDate(selectedDate).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${typeColors[item.type]} ${
                item.isCompleted ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      item.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {format(new Date(item.startTime), 'HH:mm')} - {format(new Date(item.endTime), 'HH:mm')}
                  </span>
                </div>
                {item.subject && (
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{item.subject}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          
          {getItemsForDate(selectedDate).length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Không có lịch trình nào cho ngày này</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};