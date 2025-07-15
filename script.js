// Global state management
const AppState = {
  user: null,
  isAuthenticated: false,
  notes: [],
  scheduleItems: [],
  studySessions: [],
  bookmarks: [],
  timerSettings: {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStart: false,
  },
  currentView: 'landing',
  activeTab: 'overview',
  activeTool: null,
  aiSearchTerm: '',
  selectedAiCategory: 'Tất Cả',
  materialsSearchTerm: '',
  selectedMaterialsCategory: 'Tất Cả',
  // Pomodoro timer state
  pomodoroState: {
    timeLeft: 25 * 60,
    isRunning: false,
    mode: 'work',
    cycle: 1,
    isMuted: false,
    showSettings: false,
    intervalId: null
  }
};

// Study tools data
const studyTools = [
  {
    id: 'pomodoro',
    icon: 'clock',
    title: "Bộ Đếm Pomodoro",
    description: "Tăng hiệu suất học tập với phiên học tập tập trung 25 phút",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    features: ["Tự động nghỉ giải lao", "Thống kê thời gian học", "Âm thanh thông báo"],
    hasComponent: true
  },
  {
    id: 'notes',
    icon: 'sticky-note',
    title: "Ghi Chú Thông Minh",
    description: "Tổ chức và đồng bộ ghi chú trên mọi thiết bị",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    features: ["Đồng bộ đám mây", "Tìm kiếm nhanh", "Chia sẻ ghi chú"],
    hasComponent: false
  },
  {
    id: 'schedule',
    icon: 'calendar',
    title: "Thời Khóa Biểu",
    description: "Lập kế hoạch học tập và theo dõi tiến độ",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    features: ["Nhắc nhở tự động", "Theo dõi tiến độ", "Tích hợp lịch"],
    hasComponent: false
  },
  {
    id: 'analytics',
    icon: 'bar-chart-3',
    title: "Thống Kê Học Tập",
    description: "Phân tích và theo dõi tiến độ học tập của bạn",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    features: ["Biểu đồ chi tiết", "Báo cáo tiến độ", "Mục tiêu cá nhân"],
    hasComponent: false
  },
  {
    id: 'flashcards',
    icon: 'brain',
    title: "Thẻ Ghi Nhớ",
    description: "Học từ vựng và kiến thức với hệ thống thẻ thông minh",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    features: ["Thuật toán lặp lại", "Theo dõi tiến độ", "Chia sẻ bộ thẻ"],
    hasComponent: false
  },
  {
    id: 'mindmap',
    icon: 'target',
    title: "Sơ Đồ Tư Duy",
    description: "Tạo sơ đồ tư duy để tổ chức ý tưởng và kiến thức",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
    features: ["Giao diện kéo thả", "Xuất nhiều định dạng", "Cộng tác nhóm"],
    hasComponent: false
  },
  {
    id: 'quiz',
    icon: 'award',
    title: "Tạo Bài Kiểm Tra",
    description: "Tự tạo bài kiểm tra để ôn luyện kiến thức",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    features: ["Nhiều dạng câu hỏi", "Chấm điểm tự động", "Phân tích kết quả"],
    hasComponent: false
  },
  {
    id: 'focus',
    icon: 'zap',
    title: "Chế Độ Tập Trung",
    description: "Chặn các trang web gây phân tâm khi học tập",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
    features: ["Chặn website", "Thống kê thời gian", "Chế độ khẩn cấp"],
    hasComponent: false
  }
];

// AI tools data
const aiTools = [
  {
    name: "ChatGPT",
    description: "Trợ lý AI cho nghiên cứu, viết bài và giải quyết vấn đề",
    category: "AI Tổng Hợp",
    rating: 4.8,
    users: "100M+",
    icon: "message-square",
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
    icon: "pen-tool",
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
    icon: "calculator",
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
    icon: "file-text",
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
    icon: "globe",
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
    icon: "cpu",
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
    icon: "book-open",
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
    icon: "globe",
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
    icon: "search",
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
    icon: "brain",
    useCase: "Học từ vựng, ghi nhớ kiến thức lâu dài",
    tags: ["Thẻ ghi nhớ", "Lặp lại", "Ghi nhớ"],
    url: "https://apps.ankiweb.net",
    isPremium: false
  }
];

// Study materials data
const studyMaterials = [
  {
    title: "Khoa Học Máy Tính",
    subjects: ["Cấu Trúc Dữ Liệu", "Thuật Toán", "Lập Trình"],
    resources: 156,
    level: "Từ Cơ Bản Đến Nâng Cao",
    icon: "cpu",
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
    icon: "calculator",
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
    icon: "trending-up",
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
    icon: "zap",
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
    icon: "globe",
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
    icon: "award",
    description: "Tài liệu y khoa và sức khỏe chuyên nghiệp",
    category: "Y Học",
    university: "Đại học Y Hà Nội",
    downloads: "8K+"
  }
];

// Categories
const aiCategories = ["Tất Cả", "AI Tổng Hợp", "Viết Lách", "Toán Học", "Năng Suất", "Giáo Dục", "Ngôn Ngữ", "Nghiên Cứu", "Ghi Nhớ"];
const materialCategories = ["Tất Cả", "Công Nghệ", "Toán Học", "Kinh Tế", "Khoa Học", "Ngôn Ngữ", "Y Học"];

// Utility functions
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 
               type === 'error' ? 'x-circle' : 
               'info';
  
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <i data-lucide="${icon}" class="w-5 h-5"></i>
      <span>${message}</span>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  lucide.createIcons();
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toastContainer.removeChild(toast), 300);
  }, 3000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function saveToLocalStorage() {
  localStorage.setItem('study-vhu-storage', JSON.stringify({
    user: AppState.user,
    isAuthenticated: AppState.isAuthenticated,
    notes: AppState.notes,
    scheduleItems: AppState.scheduleItems,
    studySessions: AppState.studySessions,
    bookmarks: AppState.bookmarks,
    timerSettings: AppState.timerSettings,
  }));
}

function loadFromLocalStorage() {
  const stored = localStorage.getItem('study-vhu-storage');
  if (stored) {
    const data = JSON.parse(stored);
    AppState.user = data.user;
    AppState.isAuthenticated = data.isAuthenticated;
    AppState.notes = data.notes || [];
    AppState.scheduleItems = data.scheduleItems || [];
    AppState.studySessions = data.studySessions || [];
    AppState.bookmarks = data.bookmarks || [];
    AppState.timerSettings = data.timerSettings || AppState.timerSettings;
  }
}

// Authentication functions
function showAuthModal() {
  document.getElementById('auth-modal').classList.remove('hidden');
}

function hideAuthModal() {
  document.getElementById('auth-modal').classList.add('hidden');
}

function toggleAuthMode() {
  const isLogin = document.getElementById('auth-modal-title').textContent === 'Đăng Nhập';
  const nameField = document.getElementById('name-field');
  const authTitle = document.getElementById('auth-modal-title');
  const authSubmit = document.getElementById('auth-submit');
  const authSwitchText = document.getElementById('auth-switch-text');
  const authSwitchButton = document.getElementById('auth-switch-button');
  
  if (isLogin) {
    // Switch to register
    nameField.classList.remove('hidden');
    authTitle.textContent = 'Đăng Ký';
    authSubmit.textContent = 'Đăng Ký';
    authSwitchText.textContent = 'Đã có tài khoản?';
    authSwitchButton.textContent = 'Đăng nhập';
  } else {
    // Switch to login
    nameField.classList.add('hidden');
    authTitle.textContent = 'Đăng Nhập';
    authSubmit.textContent = 'Đăng Nhập';
    authSwitchText.textContent = 'Chưa có tài khoản?';
    authSwitchButton.textContent = 'Đăng ký ngay';
  }
}

function handleAuth(event) {
  event.preventDefault();
  const isLogin = document.getElementById('auth-modal-title').textContent === 'Đăng Nhập';
  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;
  const name = document.getElementById('name-input').value;
  
  if (!email || !password || (!isLogin && !name)) {
    showToast('Vui lòng điền đầy đủ thông tin', 'error');
    return;
  }
  
  // Simulate authentication
  const user = {
    id: Date.now().toString(),
    name: name || email.split('@')[0],
    email: email,
    plan: 'free',
    joinDate: new Date(),
  };
  
  AppState.user = user;
  AppState.isAuthenticated = true;
  
  updateUserInterface();
  saveToLocalStorage();
  hideAuthModal();
  showToast(isLogin ? 'Đăng nhập thành công!' : 'Đăng ký thành công!', 'success');
  
  // Clear form
  document.getElementById('auth-form').reset();
}

function logout() {
  AppState.user = null;
  AppState.isAuthenticated = false;
  updateUserInterface();
  saveToLocalStorage();
  showToast('Đã đăng xuất', 'info');
  
  // Hide user menu
  document.getElementById('user-dropdown').classList.add('hidden');
  
  // Return to landing page if in dashboard
  if (AppState.currentView === 'dashboard') {
    showLandingPage();
  }
}

function updateUserInterface() {
  const loginButton = document.getElementById('login-button');
  const mobileLoginButton = document.getElementById('mobile-login-button');
  const mobileLoginContainer = document.getElementById('mobile-login-container');
  const userMenuContainer = document.getElementById('user-menu-container');
  const userAvatar = document.getElementById('user-avatar');
  const userName = document.getElementById('user-name');
  const dropdownUserName = document.getElementById('dropdown-user-name');
  const dropdownUserEmail = document.getElementById('dropdown-user-email');
  const dashboardWelcome = document.getElementById('dashboard-welcome');
  
  if (AppState.isAuthenticated && AppState.user) {
    // Hide login buttons
    loginButton.classList.add('hidden');
    mobileLoginContainer.classList.add('hidden');
    
    // Show user menu
    userMenuContainer.classList.remove('hidden');
    
    // Update user info
    userAvatar.textContent = AppState.user.name.charAt(0).toUpperCase();
    userName.textContent = AppState.user.name;
    dropdownUserName.textContent = AppState.user.name;
    dropdownUserEmail.textContent = AppState.user.email;
    dashboardWelcome.textContent = `Chào mừng trở lại, ${AppState.user.name}! 👋`;
  } else {
    // Show login buttons
    loginButton.classList.remove('hidden');
    mobileLoginContainer.classList.remove('hidden');
    
    // Hide user menu
    userMenuContainer.classList.add('hidden');
  }
}

// Navigation functions
function showStudyDashboard() {
  if (!AppState.isAuthenticated) {
    showToast('Vui lòng đăng nhập để sử dụng tính năng này', 'error');
    return;
  }
  
  AppState.currentView = 'dashboard';
  document.getElementById('landing-page').classList.add('hidden');
  document.getElementById('study-dashboard').classList.remove('hidden');
  
  // Initialize dashboard
  initializeDashboard();
}

function showLandingPage() {
  AppState.currentView = 'landing';
  document.getElementById('study-dashboard').classList.add('hidden');
  document.getElementById('landing-page').classList.remove('hidden');
}

function switchDashboardTab(tabId) {
  // Update tab buttons
  document.querySelectorAll('.dashboard-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  
  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });
  document.getElementById(`${tabId}-tab`).classList.remove('hidden');
  
  AppState.activeTab = tabId;
  
  // Initialize specific tab content
  if (tabId === 'progress') {
    initializeCharts();
  }
}

// Dashboard initialization
function initializeDashboard() {
  renderQuickActions();
  renderToolsGrid();
  renderAiToolsGrid();
  switchDashboardTab('overview');
}

function renderQuickActions() {
  const container = document.getElementById('quick-actions');
  container.innerHTML = '';
  
  studyTools.slice(0, 4).forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 cursor-pointer';
    toolElement.style.animationDelay = `${index * 0.1}s`;
    
    toolElement.innerHTML = `
      <div class="w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4">
        <i data-lucide="${tool.icon}" class="w-7 h-7 text-white"></i>
      </div>
      <h3 class="text-lg font-semibold mb-2 text-gray-800">${tool.title}</h3>
      <p class="text-gray-600 text-sm">${tool.description}</p>
    `;
    
    toolElement.addEventListener('click', () => handleToolClick(tool.id));
    container.appendChild(toolElement);
  });
  
  lucide.createIcons();
}

function renderToolsGrid() {
  const container = document.getElementById('tools-grid');
  container.innerHTML = '';
  
  studyTools.forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 cursor-pointer';
    toolElement.style.animationDelay = `${index * 0.1}s`;
    
    const featuresHtml = tool.features.map(feature => `
      <div class="flex items-center space-x-2 text-xs text-gray-500">
        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        <span>${feature}</span>
      </div>
    `).join('');
    
    toolElement.innerHTML = `
      <div class="w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4">
        <i data-lucide="${tool.icon}" class="w-7 h-7 text-white"></i>
      </div>
      <h3 class="text-lg font-semibold mb-3 text-gray-800">${tool.title}</h3>
      <p class="text-gray-600 mb-4 text-sm">${tool.description}</p>
      <div class="space-y-2 mb-6">
        ${featuresHtml}
      </div>
      <div class="flex items-center justify-between">
        <span class="px-3 py-1 rounded-full text-xs font-medium ${
          tool.hasComponent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }">
          ${tool.hasComponent ? 'Sẵn sàng' : 'Sắp ra mắt'}
        </span>
        <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
      </div>
    `;
    
    toolElement.addEventListener('click', () => handleToolClick(tool.id));
    container.appendChild(toolElement);
  });
  
  lucide.createIcons();
}

function renderAiToolsGrid() {
  const container = document.getElementById('ai-tools-grid');
  const searchInput = document.getElementById('ai-search');
  const categoriesContainer = document.getElementById('ai-categories');
  const resultsCount = document.getElementById('ai-results-count');
  
  // Render categories
  categoriesContainer.innerHTML = '';
  aiCategories.forEach(category => {
    const button = document.createElement('button');
    button.className = `px-4 py-2 rounded-lg font-medium transition-colors ${
      AppState.selectedAiCategory === category
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;
    button.textContent = category;
    button.addEventListener('click', () => {
      AppState.selectedAiCategory = category;
      renderAiToolsGrid();
    });
    categoriesContainer.appendChild(button);
  });
  
  // Filter tools
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()));
    const matchesCategory = AppState.selectedAiCategory === 'Tất Cả' || tool.category === AppState.selectedAiCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Update results count
  resultsCount.textContent = `Hiển thị ${filteredTools.length} / ${aiTools.length} công cụ`;
  
  // Render tools
  container.innerHTML = '';
  filteredTools.forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50';
    toolElement.style.animationDelay = `${index * 0.1}s`;
    
    const tagsHtml = tool.tags.map(tag => `
      <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">${tag}</span>
    `).join('');
    
    toolElement.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            <i data-lucide="${tool.icon}" class="w-5 h-5 text-blue-600"></i>
          </div>
          <div class="flex items-center space-x-2">
            <span class="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              ${tool.category}
            </span>
            ${tool.isPremium ? '<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Premium</span>' : ''}
          </div>
        </div>
        <div class="flex items-center space-x-1">
          <i data-lucide="star" class="w-4 h-4 text-yellow-500 fill-current"></i>
          <span class="text-sm text-gray-600">${tool.rating}</span>
        </div>
      </div>

      <h3 class="text-lg font-semibold mb-2 text-gray-800">${tool.name}</h3>
      <p class="text-gray-600 mb-3 text-sm">${tool.description}</p>
      <p class="text-xs text-gray-500 mb-4 italic">${tool.useCase}</p>

      <div class="flex flex-wrap gap-1 mb-4">
        ${tagsHtml}
      </div>

      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">${tool.users} người dùng</span>
        <button class="ai-tool-btn bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[100px]" data-url="${tool.url}" data-name="${tool.name}">
          <span>Truy Cập</span>
          <i data-lucide="external-link" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    
    container.appendChild(toolElement);
  });
  
  // Add event listeners for AI tool buttons
  document.querySelectorAll('.ai-tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.getAttribute('data-url');
      const name = e.currentTarget.getAttribute('data-name');
      window.open(url, '_blank');
      showToast(`Đang chuyển đến ${name}`, 'success');
    });
  });
  
  // Update search input event listener
  searchInput.value = AppState.aiSearchTerm;
  searchInput.addEventListener('input', (e) => {
    AppState.aiSearchTerm = e.target.value;
    renderAiToolsGrid();
  });
  
  lucide.createIcons();
}

// Landing page functions
function renderStudyToolsGrid() {
  const container = document.getElementById('study-tools-grid');
  container.innerHTML = '';
  
  studyTools.slice(0, 4).forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 flex flex-col h-full';
    toolElement.style.animationDelay = `${index * 0.1}s`;
    
    const featuresHtml = tool.features.map(feature => `
      <div class="flex items-center space-x-2 text-xs text-gray-500">
        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        <span>${feature}</span>
      </div>
    `).join('');
    
    toolElement.innerHTML = `
      <div class="w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4">
        <i data-lucide="${tool.icon}" class="w-7 h-7 text-white"></i>
      </div>
      <h3 class="text-lg font-semibold mb-3 text-gray-800">${tool.title}</h3>
      <p class="text-gray-600 mb-4 text-sm flex-grow">${tool.description}</p>
      <div class="space-y-2 mb-6">
        ${featuresHtml}
      </div>
      <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-auto">
        <span>Dùng Thử Ngay</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    `;
    
    toolElement.querySelector('button').addEventListener('click', () => handleToolClick(tool.id));
    container.appendChild(toolElement);
  });
  
  lucide.createIcons();
}

function renderAiToolsLandingGrid() {
  const container = document.getElementById('ai-tools-landing-grid');
  const searchInput = document.getElementById('ai-tools-search');
  const categoriesContainer = document.getElementById('ai-tools-categories');
  const countElement = document.getElementById('ai-tools-count');
  const noResultsElement = document.getElementById('ai-tools-no-results');
  
  // Render categories
  categoriesContainer.innerHTML = '';
  aiCategories.forEach(category => {
    const button = document.createElement('button');
    button.className = `w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
      AppState.selectedAiCategory === category
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
    button.textContent = category;
    button.addEventListener('click', () => {
      AppState.selectedAiCategory = category;
      renderAiToolsLandingGrid();
    });
    categoriesContainer.appendChild(button);
  });
  
  // Filter tools
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(AppState.aiSearchTerm.toLowerCase()));
    const matchesCategory = AppState.selectedAiCategory === 'Tất Cả' || tool.category === AppState.selectedAiCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Update count
  countElement.textContent = `Hiển thị ${filteredTools.length} / ${aiTools.length} công cụ`;
  
  // Show/hide no results
  if (filteredTools.length === 0) {
    container.classList.add('hidden');
    noResultsElement.classList.remove('hidden');
  } else {
    container.classList.remove('hidden');
    noResultsElement.classList.add('hidden');
  }
  
  // Render tools
  container.innerHTML = '';
  filteredTools.forEach((tool, index) => {
    const toolElement = document.createElement('div');
    toolElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 flex flex-col h-full';
    toolElement.style.animationDelay = `${index * 0.1}s`;
    
    const tagsHtml = tool.tags.map(tag => `
      <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">${tag}</span>
    `).join('');
    
    toolElement.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            <i data-lucide="${tool.icon}" class="w-5 h-5 text-blue-600"></i>
          </div>
          <span class="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            ${tool.category}
          </span>
        </div>
        <div class="flex items-center space-x-1">
          <i data-lucide="star" class="w-4 h-4 text-yellow-500 fill-current"></i>
          <span class="text-sm text-gray-600">${tool.rating}</span>
        </div>
      </div>
      
      <h3 class="text-lg font-semibold mb-2 text-gray-800">${tool.name}</h3>
      <p class="text-gray-600 mb-3 text-sm flex-grow">${tool.description}</p>
      <p class="text-xs text-gray-500 mb-4 italic">${tool.useCase}</p>
      
      <div class="flex flex-wrap gap-1 mb-4">
        ${tagsHtml}
      </div>
      
      <div class="flex items-center justify-between mt-auto">
        <span class="text-xs text-gray-500">${tool.users} người dùng</span>
        <button class="ai-tool-landing-btn bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-1 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105" data-url="${tool.url}" data-name="${tool.name}">
          <span>Khám Phá</span>
          <i data-lucide="chevron-right" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    
    container.appendChild(toolElement);
  });
  
  // Add event listeners
  document.querySelectorAll('.ai-tool-landing-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.getAttribute('data-url');
      const name = e.currentTarget.getAttribute('data-name');
      window.open(url, '_blank');
      showToast(`Đang chuyển đến ${name}`, 'success');
    });
  });
  
  // Update search input
  searchInput.value = AppState.aiSearchTerm;
  searchInput.addEventListener('input', (e) => {
    AppState.aiSearchTerm = e.target.value;
    renderAiToolsLandingGrid();
  });
  
  lucide.createIcons();
}

function renderMaterialsGrid() {
  const container = document.getElementById('materials-grid');
  const searchInput = document.getElementById('materials-search');
  const categoriesContainer = document.getElementById('materials-categories');
  const countElement = document.getElementById('materials-count');
  const noResultsElement = document.getElementById('materials-no-results');
  
  // Render categories
  categoriesContainer.innerHTML = '';
  materialCategories.forEach(category => {
    const button = document.createElement('button');
    button.className = `w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
      AppState.selectedMaterialsCategory === category
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-600 hover:bg-gray-100'
    }`;
    button.textContent = category;
    button.addEventListener('click', () => {
      AppState.selectedMaterialsCategory = category;
      renderMaterialsGrid();
    });
    categoriesContainer.appendChild(button);
  });
  
  // Filter materials
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(AppState.materialsSearchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(AppState.materialsSearchTerm.toLowerCase()) ||
                         material.subjects.some(subject => subject.toLowerCase().includes(AppState.materialsSearchTerm.toLowerCase()));
    const matchesCategory = AppState.selectedMaterialsCategory === 'Tất Cả' || material.category === AppState.selectedMaterialsCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Update count
  countElement.textContent = `Hiển thị ${filteredMaterials.length} / ${studyMaterials.length} tài liệu`;
  
  // Show/hide no results
  if (filteredMaterials.length === 0) {
    container.classList.add('hidden');
    noResultsElement.classList.remove('hidden');
  } else {
    container.classList.remove('hidden');
    noResultsElement.classList.add('hidden');
  }
  
  // Render materials
  container.innerHTML = '';
  filteredMaterials.forEach((material, index) => {
    const materialElement = document.createElement('div');
    materialElement.className = 'bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200/50 flex flex-col h-full';
    materialElement.style.animationDelay = `${index * 0.1}s`;
    
    const subjectsHtml = material.subjects.map(subject => `
      <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">${subject}</span>
    `).join('');
    
    materialElement.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
          <i data-lucide="${material.icon}" class="w-6 h-6 text-blue-600"></i>
        </div>
        <div class="text-right">
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium block mb-1">
            ${material.resources} Tài Liệu
          </span>
          <span class="text-xs text-gray-500">${material.downloads} lượt tải</span>
        </div>
      </div>
      
      <h3 class="text-xl font-semibold mb-2 text-gray-800">${material.title}</h3>
      <p class="text-gray-600 mb-2 text-sm flex-grow">${material.description}</p>
      <p class="text-gray-600 mb-2 text-sm">📍 ${material.university}</p>
      <p class="text-gray-600 mb-4 text-sm">🎓 Cấp độ: ${material.level}</p>
      
      <div class="mb-6">
        <h4 class="font-medium text-gray-700 mb-2 text-sm">Môn học bao gồm:</h4>
        <div class="flex flex-wrap gap-2">
          ${subjectsHtml}
        </div>
      </div>
      
      <div class="flex space-x-2 mt-auto">
        <button class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
          Truy Cập Tài Liệu
        </button>
        <button class="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
          <i data-lucide="bookmark" class="w-4 h-4"></i>
        </button>
      </div>
    `;
    
    container.appendChild(materialElement);
  });
  
  // Update search input
  searchInput.value = AppState.materialsSearchTerm;
  searchInput.addEventListener('input', (e) => {
    AppState.materialsSearchTerm = e.target.value;
    renderMaterialsGrid();
  });
  
  lucide.createIcons();
}

// Tool handling
function handleToolClick(toolId) {
  const tool = studyTools.find(t => t.id === toolId);
  if (tool?.hasComponent) {
    if (toolId === 'pomodoro') {
      showPomodoroModal();
    } else {
      showToast('Công cụ này đang được phát triển!', 'info');
    }
  } else {
    showToast('Công cụ này đang được phát triển!', 'info');
  }
}

// Pomodoro Timer functions
function showPomodoroModal() {
  document.getElementById('pomodoro-modal').classList.remove('hidden');
  initializePomodoro();
}

function hidePomodoroModal() {
  document.getElementById('pomodoro-modal').classList.add('hidden');
  if (AppState.pomodoroState.intervalId) {
    clearInterval(AppState.pomodoroState.intervalId);
    AppState.pomodoroState.intervalId = null;
  }
  AppState.pomodoroState.isRunning = false;
}

function initializePomodoro() {
  updatePomodoroDisplay();
  updatePomodoroProgress();
}

function updatePomodoroDisplay() {
  const timerDisplay = document.getElementById('timer-display');
  const timerProgress = document.getElementById('timer-progress');
  const pomodoroMode = document.getElementById('pomodoro-mode');
  const pomodoroCycle = document.getElementById('pomodoro-cycle');
  
  timerDisplay.textContent = formatTime(AppState.pomodoroState.timeLeft);
  
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration, label: 'Làm việc' },
    shortBreak: { duration: AppState.timerSettings.shortBreak, label: 'Nghỉ ngắn' },
    longBreak: { duration: AppState.timerSettings.longBreak, label: 'Nghỉ dài' }
  };
  
  const currentMode = modeConfig[AppState.pomodoroState.mode];
  const progress = ((currentMode.duration * 60 - AppState.pomodoroState.timeLeft) / (currentMode.duration * 60)) * 100;
  
  timerProgress.textContent = `${Math.round(progress)}% hoàn thành`;
  pomodoroMode.textContent = currentMode.label;
  pomodoroCycle.textContent = AppState.pomodoroState.cycle;
}

function updatePomodoroProgress() {
  const progressCircle = document.getElementById('progress-circle');
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration },
    shortBreak: { duration: AppState.timerSettings.shortBreak },
    longBreak: { duration: AppState.timerSettings.longBreak }
  };
  
  const currentMode = modeConfig[AppState.pomodoroState.mode];
  const progress = ((currentMode.duration * 60 - AppState.pomodoroState.timeLeft) / (currentMode.duration * 60)) * 100;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - progress / 100);
  
  progressCircle.style.strokeDashoffset = offset;
}

function togglePomodoro() {
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playPauseIcon = playPauseBtn.querySelector('i');
  
  if (AppState.pomodoroState.isRunning) {
    // Pause
    AppState.pomodoroState.isRunning = false;
    if (AppState.pomodoroState.intervalId) {
      clearInterval(AppState.pomodoroState.intervalId);
      AppState.pomodoroState.intervalId = null;
    }
    playPauseIcon.setAttribute('data-lucide', 'play');
    playPauseIcon.classList.add('ml-1');
  } else {
    // Play
    AppState.pomodoroState.isRunning = true;
    AppState.pomodoroState.intervalId = setInterval(() => {
      AppState.pomodoroState.timeLeft--;
      updatePomodoroDisplay();
      updatePomodoroProgress();
      
      if (AppState.pomodoroState.timeLeft <= 0) {
        handlePomodoroComplete();
      }
    }, 1000);
    playPauseIcon.setAttribute('data-lucide', 'pause');
    playPauseIcon.classList.remove('ml-1');
  }
  
  lucide.createIcons();
}

function resetPomodoro() {
  AppState.pomodoroState.isRunning = false;
  if (AppState.pomodoroState.intervalId) {
    clearInterval(AppState.pomodoroState.intervalId);
    AppState.pomodoroState.intervalId = null;
  }
  
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration },
    shortBreak: { duration: AppState.timerSettings.shortBreak },
    longBreak: { duration: AppState.timerSettings.longBreak }
  };
  
  AppState.pomodoroState.timeLeft = modeConfig[AppState.pomodoroState.mode].duration * 60;
  
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playPauseIcon = playPauseBtn.querySelector('i');
  playPauseIcon.setAttribute('data-lucide', 'play');
  playPauseIcon.classList.add('ml-1');
  
  updatePomodoroDisplay();
  updatePomodoroProgress();
  lucide.createIcons();
}

function skipPomodoro() {
  handlePomodoroComplete();
}

function handlePomodoroComplete() {
  AppState.pomodoroState.isRunning = false;
  if (AppState.pomodoroState.intervalId) {
    clearInterval(AppState.pomodoroState.intervalId);
    AppState.pomodoroState.intervalId = null;
  }
  
  // Play notification sound (if not muted)
  if (!AppState.pomodoroState.isMuted) {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
  
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration, label: 'Làm việc' },
    shortBreak: { duration: AppState.timerSettings.shortBreak, label: 'Nghỉ ngắn' },
    longBreak: { duration: AppState.timerSettings.longBreak, label: 'Nghỉ dài' }
  };
  
  showToast(`${modeConfig[AppState.pomodoroState.mode].label} hoàn thành!`, 'success');
  
  // Save study session if it was work mode
  if (AppState.pomodoroState.mode === 'work') {
    AppState.studySessions.push({
      id: Date.now().toString(),
      duration: AppState.timerSettings.workDuration * 60,
      subject: 'Pomodoro Session',
      date: new Date(),
      type: 'pomodoro'
    });
    saveToLocalStorage();
  }
  
  // Auto-advance to next mode
  if (AppState.timerSettings.autoStart) {
    setTimeout(() => {
      switchPomodoroMode();
    }, 1000);
  }
}

function switchPomodoroMode() {
  if (AppState.pomodoroState.mode === 'work') {
    if (AppState.pomodoroState.cycle % 4 === 0) {
      AppState.pomodoroState.mode = 'longBreak';
    } else {
      AppState.pomodoroState.mode = 'shortBreak';
    }
  } else {
    AppState.pomodoroState.mode = 'work';
    if (AppState.pomodoroState.mode === 'work') {
      AppState.pomodoroState.cycle++;
    }
  }
  
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration },
    shortBreak: { duration: AppState.timerSettings.shortBreak },
    longBreak: { duration: AppState.timerSettings.longBreak }
  };
  
  AppState.pomodoroState.timeLeft = modeConfig[AppState.pomodoroState.mode].duration * 60;
  updatePomodoroModeButtons();
  updatePomodoroDisplay();
  updatePomodoroProgress();
}

function setPomodoroMode(mode) {
  AppState.pomodoroState.mode = mode;
  AppState.pomodoroState.isRunning = false;
  
  if (AppState.pomodoroState.intervalId) {
    clearInterval(AppState.pomodoroState.intervalId);
    AppState.pomodoroState.intervalId = null;
  }
  
  const modeConfig = {
    work: { duration: AppState.timerSettings.workDuration },
    shortBreak: { duration: AppState.timerSettings.shortBreak },
    longBreak: { duration: AppState.timerSettings.longBreak }
  };
  
  AppState.pomodoroState.timeLeft = modeConfig[mode].duration * 60;
  
  updatePomodoroModeButtons();
  updatePomodoroDisplay();
  updatePomodoroProgress();
  
  const playPauseBtn = document.getElementById('play-pause-btn');
  const playPauseIcon = playPauseBtn.querySelector('i');
  playPauseIcon.setAttribute('data-lucide', 'play');
  playPauseIcon.classList.add('ml-1');
  lucide.createIcons();
}

function updatePomodoroModeButtons() {
  const workBtn = document.getElementById('work-mode');
  const shortBreakBtn = document.getElementById('short-break-mode');
  const longBreakBtn = document.getElementById('long-break-mode');
  
  // Reset all buttons
  [workBtn, shortBreakBtn, longBreakBtn].forEach(btn => {
    btn.className = 'px-4 py-2 rounded-full text-sm font-medium transition-all text-gray-600 hover:text-gray-800';
  });
  
  // Highlight active button
  const activeBtn = AppState.pomodoroState.mode === 'work' ? workBtn :
                   AppState.pomodoroState.mode === 'shortBreak' ? shortBreakBtn : longBreakBtn;
  activeBtn.className = 'px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-gray-800 shadow-sm';
}

function togglePomodoroMute() {
  AppState.pomodoroState.isMuted = !AppState.pomodoroState.isMuted;
  const muteBtn = document.getElementById('mute-btn');
  const muteIcon = muteBtn.querySelector('i');
  
  muteIcon.setAttribute('data-lucide', AppState.pomodoroState.isMuted ? 'volume-x' : 'volume-2');
  lucide.createIcons();
}

function togglePomodoroSettings() {
  AppState.pomodoroState.showSettings = !AppState.pomodoroState.showSettings;
  const settingsPanel = document.getElementById('timer-settings');
  
  if (AppState.pomodoroState.showSettings) {
    settingsPanel.classList.remove('hidden');
    // Update input values
    document.getElementById('work-duration').value = AppState.timerSettings.workDuration;
    document.getElementById('short-break-duration').value = AppState.timerSettings.shortBreak;
    document.getElementById('long-break-duration').value = AppState.timerSettings.longBreak;
    document.getElementById('auto-start').checked = AppState.timerSettings.autoStart;
  } else {
    settingsPanel.classList.add('hidden');
  }
}

function updateTimerSettings() {
  AppState.timerSettings.workDuration = parseInt(document.getElementById('work-duration').value);
  AppState.timerSettings.shortBreak = parseInt(document.getElementById('short-break-duration').value);
  AppState.timerSettings.longBreak = parseInt(document.getElementById('long-break-duration').value);
  AppState.timerSettings.autoStart = document.getElementById('auto-start').checked;
  
  saveToLocalStorage();
  showToast('Đã cập nhật cài đặt timer', 'success');
}

// Charts initialization
function initializeCharts() {
  // Weekly study hours chart
  const weeklyCtx = document.getElementById('weekly-chart');
  if (weeklyCtx) {
    new Chart(weeklyCtx, {
      type: 'bar',
      data: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [{
          label: 'Giờ học',
          data: [3.5, 4.2, 2.8, 5.1, 3.9, 2.3, 1.8],
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(229, 231, 235, 0.5)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  // Subject distribution chart
  const subjectCtx = document.getElementById('subject-chart');
  if (subjectCtx) {
    new Chart(subjectCtx, {
      type: 'doughnut',
      data: {
        labels: ['Toán Học', 'Lập Trình', 'Tiếng Anh', 'Vật Lý', 'Khác'],
        datasets: [{
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            '#3B82F6',
            '#8B5CF6',
            '#10B981',
            '#F59E0B',
            '#EF4444'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Load saved data
  loadFromLocalStorage();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Update UI based on auth state
  updateUserInterface();
  
  // Initialize landing page content
  renderStudyToolsGrid();
  renderAiToolsLandingGrid();
  renderMaterialsGrid();
  
  // Header event listeners
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = this.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      icon.setAttribute('data-lucide', 'x');
    } else {
      mobileMenu.classList.add('hidden');
      icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });
  
  // User menu toggle
  document.getElementById('user-menu-button').addEventListener('click', function() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
  });
  
  // Close user menu when clicking outside
  document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('user-menu-container');
    const dropdown = document.getElementById('user-dropdown');
    
    if (!userMenu.contains(event.target)) {
      dropdown.classList.add('hidden');
    }
  });
  
  // Auth modal event listeners
  document.getElementById('login-button').addEventListener('click', showAuthModal);
  document.getElementById('mobile-login-button').addEventListener('click', showAuthModal);
  document.getElementById('close-auth-modal').addEventListener('click', hideAuthModal);
  document.getElementById('auth-switch-button').addEventListener('click', toggleAuthMode);
  document.getElementById('auth-form').addEventListener('submit', handleAuth);
  document.getElementById('logout-button').addEventListener('click', logout);
  
  // Password toggle
  document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password-input');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.setAttribute('data-lucide', 'eye-off');
    } else {
      passwordInput.type = 'password';
      icon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
  });
  
  // Navigation event listeners
  document.getElementById('start-studying-btn').addEventListener('click', showStudyDashboard);
  document.getElementById('back-to-home').addEventListener('click', showLandingPage);
  
  // Dashboard tab switching
  document.querySelectorAll('.dashboard-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      switchDashboardTab(tabId);
    });
  });
  
  // Pomodoro modal event listeners
  document.getElementById('close-pomodoro-modal').addEventListener('click', hidePomodoroModal);
  document.getElementById('play-pause-btn').addEventListener('click', togglePomodoro);
  document.getElementById('reset-btn').addEventListener('click', resetPomodoro);
  document.getElementById('skip-btn').addEventListener('click', skipPomodoro);
  document.getElementById('mute-btn').addEventListener('click', togglePomodoroMute);
  document.getElementById('settings-btn').addEventListener('click', togglePomodoroSettings);
  
  // Pomodoro mode buttons
  document.getElementById('work-mode').addEventListener('click', () => setPomodoroMode('work'));
  document.getElementById('short-break-mode').addEventListener('click', () => setPomodoroMode('shortBreak'));
  document.getElementById('long-break-mode').addEventListener('click', () => setPomodoroMode('longBreak'));
  
  // Timer settings inputs
  document.getElementById('work-duration').addEventListener('change', updateTimerSettings);
  document.getElementById('short-break-duration').addEventListener('change', updateTimerSettings);
  document.getElementById('long-break-duration').addEventListener('change', updateTimerSettings);
  document.getElementById('auto-start').addEventListener('change', updateTimerSettings);
  
  // Close modals when clicking outside
  document.getElementById('auth-modal').addEventListener('click', function(event) {
    if (event.target === this) {
      hideAuthModal();
    }
  });
  
  document.getElementById('pomodoro-modal').addEventListener('click', function(event) {
    if (event.target === this) {
      hidePomodoroModal();
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Initialize the application
console.log('Study VHU Platform initialized successfully!');