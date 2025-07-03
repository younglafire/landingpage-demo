import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Clock, Target, TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { format, subDays, startOfDay } from 'date-fns';

export const StudyAnalytics: React.FC = () => {
  const { studySessions, scheduleItems } = useStore();

  // Generate mock data for demonstration
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const sessionsForDay = studySessions.filter(session => 
      startOfDay(session.date).getTime() === startOfDay(date).getTime()
    );
    
    return {
      day: format(date, 'EEE'),
      hours: sessionsForDay.reduce((total, session) => total + session.duration / 60, 0),
      sessions: sessionsForDay.length,
    };
  });

  const subjectData = [
    { name: 'Toán Học', value: 35, color: '#3B82F6' },
    { name: 'Lập Trình', value: 25, color: '#8B5CF6' },
    { name: 'Tiếng Anh', value: 20, color: '#10B981' },
    { name: 'Vật Lý', value: 15, color: '#F59E0B' },
    { name: 'Khác', value: 5, color: '#EF4444' },
  ];

  const totalHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const totalSessions = weeklyData.reduce((sum, day) => sum + day.sessions, 0);
  const avgSessionLength = totalSessions > 0 ? totalHours / totalSessions : 0;
  const completedTasks = scheduleItems.filter(item => item.isCompleted).length;

  const stats = [
    {
      icon: Clock,
      label: 'Tổng thời gian học',
      value: `${totalHours.toFixed(1)}h`,
      change: '+12%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Target,
      label: 'Phiên học tập',
      value: totalSessions.toString(),
      change: '+8%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      label: 'Thời gian TB/phiên',
      value: `${avgSessionLength.toFixed(0)}m`,
      change: '+5%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Award,
      label: 'Nhiệm vụ hoàn thành',
      value: completedTasks.toString(),
      change: '+15%',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Study Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Thời gian học theo tuần</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="hours" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Phân bổ môn học</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {subjectData.map((subject, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: subject.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{subject.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Streak */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Chuỗi học tập</h3>
          <div className="flex items-center space-x-2 text-orange-600">
            <Award className="w-5 h-5" />
            <span className="font-semibold">7 ngày liên tiếp</span>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day.day}</div>
              <div 
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  day.hours > 0 
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                }`}
              >
                {day.hours > 0 ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};