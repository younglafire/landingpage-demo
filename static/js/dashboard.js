// Dashboard JavaScript functionality

// Global variables
let activeTab = 'overview';
let activeTool = null;

// Study tools data with component availability
const dashboardStudyTools = [
    {
        id: 'pomodoro',
        icon: 'clock',
        title: "Bộ Đếm Pomodoro",
        description: "Tăng hiệu suất học tập với phiên học tập tập trung 25 phút",
        color: "bg-gradient-to-br from-red-500 to-red-600",
        features: ["Tự động nghỉ giải lao", "Thống kê thời gian học", "Âm thanh thông báo"],
        available: true
    },
    {
        id: 'notes',
        icon: 'sticky-note',
        title: "Ghi Chú Thông Minh",
        description: "Tổ chức và đồng bộ ghi chú trên mọi thiết bị",
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
        features: ["Đồng bộ đám mây", "Tìm kiếm nhanh", "Chia sẻ ghi chú"],
        available: true
    },
    {
        id: 'schedule',
        icon: 'calendar',
        title: "Thời Khóa Biểu",
        description: "Lập kế hoạch học tập và theo dõi tiến độ",
        color: "bg-gradient-to-br from-green-500 to-green-600",
        features: ["Nhắc nhở tự động", "Theo dõi tiến độ", "Tích hợp lịch"],
        available: true
    },
    {
        id: 'analytics',
        icon: 'bar-chart-3',
        title: "Thống Kê Học Tập",
        description: "Phân tích và theo dõi tiến độ học tập của bạn",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        features: ["Biểu đồ chi tiết", "Báo cáo tiến độ", "Mục tiêu cá nhân"],
        available: true
    },
    {
        id: 'flashcards',
        icon: 'brain',
        title: "Thẻ Ghi Nhớ",
        description: "Học từ vựng và kiến thức với hệ thống thẻ thông minh",
        color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        features: ["Thuật toán lặp lại", "Theo dõi tiến độ", "Chia sẻ bộ thẻ"],
        available: false
    },
    {
        id: 'mindmap',
        icon: 'target',
        title: "Sơ Đồ Tư Duy",
        description: "Tạo sơ đồ tư duy để tổ chức ý tưởng và kiến thức",
        color: "bg-gradient-to-br from-pink-500 to-pink-600",
        features: ["Giao diện kéo thả", "Xuất nhiều định dạng", "Cộng tác nhóm"],
        available: false
    },
    {
        id: 'quiz',
        icon: 'award',
        title: "Tạo Bài Kiểm Tra",
        description: "Tự tạo bài kiểm tra để ôn luyện kiến thức",
        color: "bg-gradient-to-br from-orange-500 to-orange-600",
        features: ["Nhiều dạng câu hỏi", "Chấm điểm tự động", "Phân tích kết quả"],
        available: false
    },
    {
        id: 'focus',
        icon: 'zap',
        title: "Chế Độ Tập Trung",
        description: "Chặn các trang web gây phân tâm khi học tập",
        color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        features: ["Chặn website", "Thống kê thời gian", "Chế độ khẩn cấp"],
        available: false
    }
];

// AI tools data (same as main.js)
const dashboardAiTools = [
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

const dashboardAiCategories = ["Tất Cả", "AI Tổng Hợp", "Viết Lách", "Toán Học", "Năng Suất", "Giáo Dục", "Ngôn Ngữ", "Nghiên Cứu", "Ghi Nhớ"];

// Filter states
let dashboardSelectedAiCategory = 'Tất Cả';
let dashboardAiSearchTerm = '';

// Tab management
function switchTab(tabId) {
    activeTab = tabId;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const activeContent = document.getElementById(`${tabId}-tab`);
    if (activeContent) {
        activeContent.classList.remove('hidden');
    }
    
    // Load content based on tab
    switch (tabId) {
        case 'tools':
            if (!activeTool) {
                renderDashboardTools();
            }
            break;
        case 'ai':
            renderDashboardAiTools();
            renderDashboardAiCategories();
            break;
        case 'progress':
            renderAnalytics();
            break;
    }
}

// Tool management
function handleDashboardToolClick(toolId) {
    const tool = dashboardStudyTools.find(t => t.id === toolId);
    if (!tool) return;
    
    if (!tool.available) {
        window.StudyVHU.showToast('Công cụ này đang được phát triển!', 'info');
        return;
    }
    
    activeTool = toolId;
    
    // Hide tools grid and show tool detail
    const toolsGrid = document.getElementById('tools-grid');
    const toolDetail = document.getElementById('tool-detail');
    const toolTitle = document.getElementById('tool-title');
    const toolContent = document.getElementById('tool-content');
    
    if (toolsGrid) toolsGrid.classList.add('hidden');
    if (toolDetail) toolDetail.classList.remove('hidden');
    if (toolTitle) toolTitle.textContent = tool.title;
    
    // Load tool content
    loadToolContent(toolId, toolContent);
}

function backToTools() {
    activeTool = null;
    
    const toolsGrid = document.getElementById('tools-grid');
    const toolDetail = document.getElementById('tool-detail');
    
    if (toolsGrid) toolsGrid.classList.remove('hidden');
    if (toolDetail) toolDetail.classList.add('hidden');
}

function loadToolContent(toolId, container) {
    if (!container) return;
    
    switch (toolId) {
        case 'pomodoro':
            container.innerHTML = renderPomodoroTool();
            initializePomodoroTool();
            break;
        case 'notes':
            container.innerHTML = renderNotesTool();
            initializeNotesTool();
            break;
        case 'schedule':
            container.innerHTML = renderScheduleTool();
            initializeScheduleTool();
            break;
        case 'analytics':
            container.innerHTML = renderAnalyticsTool();
            initializeAnalyticsTool();
            break;
        default:
            container.innerHTML = '<p class="text-gray-500">Công cụ đang được phát triển...</p>';
    }
    
    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Render functions
function renderDashboardTools() {
    const container = document.getElementById('tools-grid');
    if (!container) return;
    
    container.innerHTML = dashboardStudyTools.map((tool, index) => `
        <div onclick="handleDashboardToolClick('${tool.id}')" class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 cursor-pointer flex flex-col h-full animate-fade-in-up delay-${index * 100}">
            <div class="w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-4">
                <i data-lucide="${tool.icon}" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-lg font-semibold mb-3 text-gray-800">${tool.title}</h3>
            <p class="text-gray-600 mb-4 text-sm flex-grow">${tool.description}</p>
            <div class="space-y-2 mb-6">
                ${tool.features.map(feature => `
                    <div class="flex items-center space-x-2 text-xs text-gray-500">
                        <div class="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <div class="flex items-center justify-between mt-auto">
                <span class="px-3 py-1 rounded-full text-xs font-medium ${
                    tool.available ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }">
                    ${tool.available ? 'Sẵn sàng' : 'Sắp ra mắt'}
                </span>
                <i data-lucide="chevron-right" class="w-5 h-5 text-gray-400"></i>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderDashboardAiTools() {
    const filteredTools = filterDashboardAiTools();
    const container = document.getElementById('dashboard-ai-tools-grid');
    const noResults = document.getElementById('dashboard-ai-no-results');
    const resultsCount = document.getElementById('dashboard-ai-results-count');
    
    if (!container) return;
    
    if (filteredTools.length === 0) {
        container.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        if (noResults) noResults.classList.add('hidden');
    }
    
    if (resultsCount) {
        resultsCount.textContent = `Hiển thị ${filteredTools.length} / ${dashboardAiTools.length} công cụ`;
    }
    
    container.innerHTML = filteredTools.map((tool, index) => `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 animate-fade-in-up delay-${index * 100}">
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
                ${tool.tags.map(tag => `
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">${tag}</span>
                `).join('')}
            </div>
            
            <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">${tool.users} người dùng</span>
                <button onclick="handleDashboardAiToolClick('${tool.url}', '${tool.name}')" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[100px]">
                    <span>Truy Cập</span>
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

function renderDashboardAiCategories() {
    const container = document.getElementById('dashboard-ai-categories');
    if (!container) return;
    
    container.innerHTML = dashboardAiCategories.map(category => `
        <button
            onclick="selectDashboardAiCategory('${category}')"
            class="px-4 py-2 rounded-lg font-medium transition-colors ${
                dashboardSelectedAiCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }"
        >
            ${category}
        </button>
    `).join('');
}

function renderAnalytics() {
    const container = document.getElementById('analytics-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="space-y-6">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <i data-lucide="clock" class="w-6 h-6 text-blue-600"></i>
                        </div>
                        <span class="text-green-600 text-sm font-medium">+12%</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-1">24.5h</h3>
                    <p class="text-gray-600 text-sm">Tổng thời gian học</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <i data-lucide="target" class="w-6 h-6 text-purple-600"></i>
                        </div>
                        <span class="text-green-600 text-sm font-medium">+8%</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-1">42</h3>
                    <p class="text-gray-600 text-sm">Phiên học tập</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <i data-lucide="trending-up" class="w-6 h-6 text-green-600"></i>
                        </div>
                        <span class="text-green-600 text-sm font-medium">+5%</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-1">35m</h3>
                    <p class="text-gray-600 text-sm">Thời gian TB/phiên</p>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <i data-lucide="award" class="w-6 h-6 text-orange-600"></i>
                        </div>
                        <span class="text-green-600 text-sm font-medium">+15%</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-1">18</h3>
                    <p class="text-gray-600 text-sm">Nhiệm vụ hoàn thành</p>
                </div>
            </div>
            
            <!-- Charts Placeholder -->
            <div class="grid lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-6">Thời gian học theo tuần</h3>
                    <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p class="text-gray-500">Biểu đồ thời gian học</p>
                    </div>
                </div>
                
                <div class="bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800 mb-6">Phân bổ môn học</h3>
                    <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p class="text-gray-500">Biểu đồ phân bổ môn học</p>
                    </div>
                </div>
            </div>
            
            <!-- Study Streak -->
            <div class="bg-white rounded-2xl p-6 border border-gray-200">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold text-gray-800">Chuỗi học tập</h3>
                    <div class="flex items-center space-x-2 text-orange-600">
                        <i data-lucide="award" class="w-5 h-5"></i>
                        <span class="font-semibold">7 ngày liên tiếp</span>
                    </div>
                </div>
                
                <div class="grid grid-cols-7 gap-2">
                    ${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => `
                        <div class="text-center">
                            <div class="text-xs text-gray-500 mb-2">${day}</div>
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                                index < 5 ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gray-200 text-gray-400'
                            }">
                                ${index < 5 ? '✓' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Tool components
function renderPomodoroTool() {
    return `
        <div class="bg-white rounded-2xl p-8 border border-gray-200">
            <div class="text-center mb-8">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Pomodoro Timer</h3>
                <p class="text-gray-600">Chu kỳ 1 • Làm việc</p>
            </div>

            <!-- Mode Selector -->
            <div class="flex justify-center mb-8">
                <div class="bg-gray-100 rounded-full p-1 flex">
                    <button class="pomodoro-mode-btn active px-4 py-2 rounded-full text-sm font-medium transition-all" data-mode="work">
                        Làm việc
                    </button>
                    <button class="pomodoro-mode-btn px-4 py-2 rounded-full text-sm font-medium transition-all" data-mode="shortBreak">
                        Nghỉ ngắn
                    </button>
                    <button class="pomodoro-mode-btn px-4 py-2 rounded-full text-sm font-medium transition-all" data-mode="longBreak">
                        Nghỉ dài
                    </button>
                </div>
            </div>

            <!-- Timer Display -->
            <div class="relative mb-8">
                <div class="w-64 h-64 mx-auto relative">
                    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            class="text-gray-200"
                        />
                        <circle
                            id="pomodoro-progress"
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="url(#gradient)"
                            stroke-width="3"
                            fill="none"
                            stroke-dasharray="282.74"
                            stroke-dashoffset="282.74"
                            class="transition-all duration-1000 ease-linear"
                            stroke-linecap="round"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#3B82F6" />
                                <stop offset="100%" stop-color="#8B5CF6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center">
                            <div id="pomodoro-time" class="text-4xl font-bold text-gray-800 mb-2">
                                25:00
                            </div>
                            <div id="pomodoro-progress-text" class="text-sm text-gray-500">
                                0% hoàn thành
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Controls -->
            <div class="flex justify-center space-x-4 mb-6">
                <button id="pomodoro-play-pause" class="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <i data-lucide="play" class="w-6 h-6 ml-1"></i>
                </button>
                
                <button id="pomodoro-reset" class="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors">
                    <i data-lucide="rotate-ccw" class="w-5 h-5"></i>
                </button>
                
                <button id="pomodoro-skip" class="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300 transition-colors">
                    <i data-lucide="skip-forward" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Additional Controls -->
            <div class="flex justify-center space-x-4">
                <button id="pomodoro-mute" class="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <i data-lucide="volume-2" class="w-5 h-5"></i>
                </button>
                
                <button id="pomodoro-settings" class="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <i data-lucide="settings" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Settings Panel -->
            <div id="pomodoro-settings-panel" class="hidden mt-6 p-4 bg-gray-50 rounded-xl">
                <h4 class="font-semibold text-gray-800 mb-4">Cài đặt Timer</h4>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian làm việc (phút)
                        </label>
                        <input
                            type="number"
                            id="work-duration"
                            min="1"
                            max="60"
                            value="25"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nghỉ ngắn (phút)
                        </label>
                        <input
                            type="number"
                            id="short-break"
                            min="1"
                            max="30"
                            value="5"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Nghỉ dài (phút)
                        </label>
                        <input
                            type="number"
                            id="long-break"
                            min="1"
                            max="60"
                            value="15"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            id="auto-start"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label for="auto-start" class="ml-2 text-sm font-medium text-gray-700">
                            Tự động chuyển chế độ
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderNotesTool() {
    return `
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Ghi Chú Thông Minh</h3>
                <button id="add-note-btn" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    <span>Thêm ghi chú</span>
                </button>
            </div>

            <!-- Search and Filters -->
            <div class="mb-6 space-y-4">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                    <input
                        type="text"
                        id="notes-search"
                        placeholder="Tìm kiếm ghi chú..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="flex flex-wrap gap-2 items-center">
                    <button class="notes-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600" data-filter="favorites">
                        <i data-lucide="star" class="w-4 h-4 inline mr-1"></i>
                        Yêu thích
                    </button>
                    <button class="notes-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600" data-filter="recent">
                        Gần đây
                    </button>
                </div>
            </div>

            <!-- Notes Grid -->
            <div id="notes-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Sample notes -->
                <div class="note-card bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold text-gray-800 truncate">Công thức Toán học</h4>
                        <div class="flex items-center space-x-1">
                            <button class="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
                                <i data-lucide="star" class="w-4 h-4"></i>
                            </button>
                            <button class="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                                <i data-lucide="edit-3" class="w-4 h-4"></i>
                            </button>
                            <button class="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-3">
                        Các công thức đạo hàm cơ bản: (x^n)' = nx^(n-1), (sin x)' = cos x, (cos x)' = -sin x...
                    </p>
                    <div class="flex flex-wrap gap-1 mb-3">
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">#toán</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">#đạo-hàm</span>
                    </div>
                    <div class="text-xs text-gray-500">
                        2 giờ trước
                    </div>
                </div>

                <div class="note-card bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-between mb-3">
                        <h4 class="font-semibold text-gray-800 truncate">Từ vựng Tiếng Anh</h4>
                        <div class="flex items-center space-x-1">
                            <button class="p-1 text-yellow-500 hover:text-yellow-600 transition-colors">
                                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                            </button>
                            <button class="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                                <i data-lucide="edit-3" class="w-4 h-4"></i>
                            </button>
                            <button class="p-1 text-gray-400 hover:text-red-500 transition-colors">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm mb-3 line-clamp-3">
                        Vocabulary for IELTS: Abundant, Adequate, Beneficial, Comprehensive, Diverse...
                    </p>
                    <div class="flex flex-wrap gap-1 mb-3">
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">#english</span>
                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">#ielts</span>
                    </div>
                    <div class="text-xs text-gray-500">
                        1 ngày trước
                    </div>
                </div>
            </div>

            <!-- Add Note Modal -->
            <div id="add-note-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl p-6 w-full max-w-2xl">
                    <div class="flex items-center justify-between mb-6">
                        <h4 class="text-xl font-bold text-gray-800">Thêm ghi chú mới</h4>
                        <button id="close-note-modal" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <div class="space-y-4">
                        <input
                            type="text"
                            id="note-title"
                            placeholder="Tiêu đề ghi chú..."
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <textarea
                            id="note-content"
                            placeholder="Nội dung ghi chú..."
                            rows="6"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>

                        <div class="flex items-center space-x-2">
                            <input
                                type="text"
                                id="note-tag"
                                placeholder="Thêm tag..."
                                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button id="add-tag-btn" class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <i data-lucide="tag" class="w-4 h-4"></i>
                            </button>
                        </div>

                        <div id="note-tags" class="flex flex-wrap gap-2">
                            <!-- Tags will be added here -->
                        </div>

                        <div class="flex space-x-2">
                            <button id="save-note-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                                <i data-lucide="save" class="w-4 h-4"></i>
                                <span>Lưu</span>
                            </button>
                            <button id="cancel-note-btn" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderScheduleTool() {
    return `
        <div class="bg-white rounded-2xl p-6 border border-gray-200">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-gray-800">Thời Khóa Biểu</h3>
                <div class="flex items-center space-x-4">
                    <!-- View Mode Toggle -->
                    <div class="bg-gray-100 rounded-lg p-1 flex">
                        <button class="schedule-view-btn active px-3 py-1 rounded text-sm font-medium transition-colors" data-view="week">
                            Tuần
                        </button>
                        <button class="schedule-view-btn px-3 py-1 rounded text-sm font-medium transition-colors" data-view="day">
                            Ngày
                        </button>
                    </div>
                    
                    <button id="add-schedule-btn" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                        <i data-lucide="plus" class="w-4 h-4"></i>
                        <span>Thêm lịch</span>
                    </button>
                </div>
            </div>

            <!-- Filters -->
            <div class="mb-6 space-y-4">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                    <input
                        type="text"
                        id="schedule-search"
                        placeholder="Tìm kiếm lịch trình..."
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div class="flex flex-wrap gap-2">
                    <button class="schedule-filter-btn active px-3 py-1 rounded-full text-sm font-medium transition-colors border bg-blue-100 text-blue-800 border-blue-200" data-type="all">
                        Tất cả
                    </button>
                    <button class="schedule-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors border bg-gray-100 text-gray-600 border-gray-200" data-type="class">
                        Lớp học
                    </button>
                    <button class="schedule-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors border bg-gray-100 text-gray-600 border-gray-200" data-type="study">
                        Tự học
                    </button>
                    <button class="schedule-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors border bg-gray-100 text-gray-600 border-gray-200" data-type="exam">
                        Thi cử
                    </button>
                    <button class="schedule-filter-btn px-3 py-1 rounded-full text-sm font-medium transition-colors border bg-gray-100 text-gray-600 border-gray-200" data-type="assignment">
                        Bài tập
                    </button>
                </div>
            </div>

            <!-- Date Navigation -->
            <div class="mb-6 flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <button id="prev-period" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="chevron-left" class="w-5 h-5"></i>
                    </button>
                    <h4 id="current-period" class="text-lg font-semibold text-gray-800">
                        Tuần 25/12 - 31/12/2024
                    </h4>
                    <button id="next-period" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="chevron-right" class="w-5 h-5"></i>
                    </button>
                </div>
                <button id="today-btn" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                    Hôm nay
                </button>
            </div>

            <!-- Schedule View -->
            <div id="schedule-view">
                <!-- Week View -->
                <div id="week-view" class="grid grid-cols-7 gap-2">
                    ${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => `
                        <div class="min-h-[300px]">
                            <div class="text-center mb-2 p-2 bg-gray-50 rounded-lg">
                                <div class="text-sm font-medium text-gray-600">${day}</div>
                                <div class="text-lg font-bold ${index === 0 ? 'text-blue-600' : 'text-gray-800'}">
                                    ${25 + index}
                                </div>
                            </div>
                            <div class="space-y-2">
                                ${index < 3 ? `
                                    <div class="p-2 rounded-lg border text-xs bg-blue-100 text-blue-800 border-blue-200">
                                        <div class="font-medium truncate">Toán Cao Cấp</div>
                                        <div class="text-xs opacity-75">08:00 - 10:00</div>
                                        <div class="text-xs opacity-75 truncate">Phòng A101</div>
                                        <div class="flex items-center justify-between mt-1">
                                            <button class="p-1 rounded transition-colors text-green-600">
                                                <i data-lucide="check-circle" class="w-3 h-3"></i>
                                            </button>
                                            <button class="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                <i data-lucide="trash-2" class="w-3 h-3"></i>
                                            </button>
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Add Schedule Modal -->
            <div id="add-schedule-modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl p-6 w-full max-w-md">
                    <div class="flex items-center justify-between mb-6">
                        <h4 class="text-xl font-bold text-gray-800">Thêm lịch trình mới</h4>
                        <button id="close-schedule-modal" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>

                    <div class="space-y-4">
                        <input
                            type="text"
                            id="schedule-title"
                            placeholder="Tiêu đề"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <input
                            type="text"
                            id="schedule-subject"
                            placeholder="Môn học"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <input
                            type="text"
                            id="schedule-location"
                            placeholder="Địa điểm"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <select
                            id="schedule-type"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="class">Lớp học</option>
                            <option value="study">Tự học</option>
                            <option value="exam">Thi cử</option>
                            <option value="assignment">Bài tập</option>
                        </select>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <input
                                type="time"
                                id="schedule-start-time"
                                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="time"
                                id="schedule-end-time"
                                class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div class="flex space-x-2">
                            <button id="save-schedule-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                                <i data-lucide="plus" class="w-4 h-4"></i>
                                <span>Thêm</span>
                            </button>
                            <button id="cancel-schedule-btn" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAnalyticsTool() {
    return renderAnalytics();
}

// Tool initialization functions
function initializePomodoroTool() {
    let isRunning = false;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let mode = 'work';
    let interval = null;
    let isMuted = false;
    
    const modeConfig = {
        work: { duration: 25, label: 'Làm việc', color: 'from-red-500 to-red-600' },
        shortBreak: { duration: 5, label: 'Nghỉ ngắn', color: 'from-green-500 to-green-600' },
        longBreak: { duration: 15, label: 'Nghỉ dài', color: 'from-blue-500 to-blue-600' }
    };
    
    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('pomodoro-time').textContent = timeDisplay;
        
        const totalTime = modeConfig[mode].duration * 60;
        const progress = ((totalTime - timeLeft) / totalTime) * 100;
        document.getElementById('pomodoro-progress-text').textContent = `${Math.round(progress)}% hoàn thành`;
        
        // Update progress circle
        const circle = document.getElementById('pomodoro-progress');
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progress / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    function startTimer() {
        isRunning = true;
        document.querySelector('#pomodoro-play-pause i').setAttribute('data-lucide', 'pause');
        lucide.createIcons();
        
        interval = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                stopTimer();
                window.StudyVHU.showToast(`${modeConfig[mode].label} hoàn thành!`, 'success');
            }
        }, 1000);
    }
    
    function stopTimer() {
        isRunning = false;
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
        document.querySelector('#pomodoro-play-pause i').setAttribute('data-lucide', 'play');
        lucide.createIcons();
    }
    
    function resetTimer() {
        stopTimer();
        timeLeft = modeConfig[mode].duration * 60;
        updateDisplay();
    }
    
    function switchMode(newMode) {
        mode = newMode;
        resetTimer();
        
        // Update mode buttons
        document.querySelectorAll('.pomodoro-mode-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.mode === newMode) {
                btn.classList.add('active');
            }
        });
    }
    
    // Event listeners
    document.getElementById('pomodoro-play-pause').addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });
    
    document.getElementById('pomodoro-reset').addEventListener('click', resetTimer);
    
    document.getElementById('pomodoro-skip').addEventListener('click', () => {
        // Switch to next mode logic
        if (mode === 'work') {
            switchMode('shortBreak');
        } else {
            switchMode('work');
        }
    });
    
    document.getElementById('pomodoro-mute').addEventListener('click', () => {
        isMuted = !isMuted;
        const icon = document.querySelector('#pomodoro-mute i');
        icon.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
        lucide.createIcons();
    });
    
    document.getElementById('pomodoro-settings').addEventListener('click', () => {
        const panel = document.getElementById('pomodoro-settings-panel');
        panel.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.pomodoro-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchMode(btn.dataset.mode);
        });
    });
    
    // Initialize display
    updateDisplay();
}

function initializeNotesTool() {
    let notes = [];
    let currentTags = [];
    
    function showAddNoteModal() {
        document.getElementById('add-note-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function hideAddNoteModal() {
        document.getElementById('add-note-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Clear form
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.getElementById('note-tag').value = '';
        currentTags = [];
        renderNoteTags();
    }
    
    function addTag() {
        const tagInput = document.getElementById('note-tag');
        const tag = tagInput.value.trim();
        
        if (tag && !currentTags.includes(tag)) {
            currentTags.push(tag);
            renderNoteTags();
            tagInput.value = '';
        }
    }
    
    function removeTag(tag) {
        currentTags = currentTags.filter(t => t !== tag);
        renderNoteTags();
    }
    
    function renderNoteTags() {
        const container = document.getElementById('note-tags');
        container.innerHTML = currentTags.map(tag => `
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center space-x-1">
                <span>#${tag}</span>
                <button onclick="removeTag('${tag}')" class="text-blue-600 hover:text-blue-800">
                    <i data-lucide="x" class="w-3 h-3"></i>
                </button>
            </span>
        `).join('');
        lucide.createIcons();
    }
    
    function saveNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();
        
        if (!title) {
            window.StudyVHU.showToast('Vui lòng nhập tiêu đề ghi chú', 'error');
            return;
        }
        
        const note = {
            id: Date.now(),
            title,
            content,
            tags: [...currentTags],
            createdAt: new Date(),
            isFavorite: false
        };
        
        notes.unshift(note);
        hideAddNoteModal();
        window.StudyVHU.showToast('Đã thêm ghi chú mới', 'success');
        
        // In a real app, this would save to the backend
    }
    
    // Event listeners
    document.getElementById('add-note-btn').addEventListener('click', showAddNoteModal);
    document.getElementById('close-note-modal').addEventListener('click', hideAddNoteModal);
    document.getElementById('cancel-note-btn').addEventListener('click', hideAddNoteModal);
    document.getElementById('save-note-btn').addEventListener('click', saveNote);
    document.getElementById('add-tag-btn').addEventListener('click', addTag);
    
    document.getElementById('note-tag').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTag();
        }
    });
    
    // Make removeTag function global for the template
    window.removeTag = removeTag;
}

function initializeScheduleTool() {
    let currentView = 'week';
    let currentDate = new Date();
    
    function showAddScheduleModal() {
        document.getElementById('add-schedule-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function hideAddScheduleModal() {
        document.getElementById('add-schedule-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // Clear form
        document.getElementById('schedule-title').value = '';
        document.getElementById('schedule-subject').value = '';
        document.getElementById('schedule-location').value = '';
        document.getElementById('schedule-start-time').value = '';
        document.getElementById('schedule-end-time').value = '';
    }
    
    function saveScheduleItem() {
        const title = document.getElementById('schedule-title').value.trim();
        const startTime = document.getElementById('schedule-start-time').value;
        const endTime = document.getElementById('schedule-end-time').value;
        
        if (!title || !startTime || !endTime) {
            window.StudyVHU.showToast('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }
        
        if (endTime <= startTime) {
            window.StudyVHU.showToast('Thời gian kết thúc phải sau thời gian bắt đầu', 'error');
            return;
        }
        
        hideAddScheduleModal();
        window.StudyVHU.showToast('Đã thêm lịch trình mới', 'success');
        
        // In a real app, this would save to the backend
    }
    
    function switchView(view) {
        currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.schedule-view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Update view display
        // In a real app, this would render different views
    }
    
    function switchFilter(type) {
        // Update filter buttons
        document.querySelectorAll('.schedule-filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-blue-100', 'text-blue-800', 'border-blue-200');
            btn.classList.add('bg-gray-100', 'text-gray-600', 'border-gray-200');
            
            if (btn.dataset.type === type) {
                btn.classList.remove('bg-gray-100', 'text-gray-600', 'border-gray-200');
                btn.classList.add('active', 'bg-blue-100', 'text-blue-800', 'border-blue-200');
            }
        });
        
        // Filter schedule items
        // In a real app, this would filter the displayed items
    }
    
    // Event listeners
    document.getElementById('add-schedule-btn').addEventListener('click', showAddScheduleModal);
    document.getElementById('close-schedule-modal').addEventListener('click', hideAddScheduleModal);
    document.getElementById('cancel-schedule-btn').addEventListener('click', hideAddScheduleModal);
    document.getElementById('save-schedule-btn').addEventListener('click', saveScheduleItem);
    
    document.querySelectorAll('.schedule-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.view);
        });
    });
    
    document.querySelectorAll('.schedule-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchFilter(btn.dataset.type);
        });
    });
}

function initializeAnalyticsTool() {
    // Analytics tool is mostly static for now
    // In a real app, this would load charts and data from the backend
}

// Filter functions
function filterDashboardAiTools() {
    return dashboardAiTools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(dashboardAiSearchTerm.toLowerCase()) ||
                             tool.description.toLowerCase().includes(dashboardAiSearchTerm.toLowerCase()) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(dashboardAiSearchTerm.toLowerCase()));
        const matchesCategory = dashboardSelectedAiCategory === 'Tất Cả' || tool.category === dashboardSelectedAiCategory;
        return matchesSearch && matchesCategory;
    });
}

// Event handlers
function handleDashboardAiToolClick(url, name) {
    window.open(url, '_blank');
    window.StudyVHU.showToast(`Đang chuyển đến ${name}`, 'success');
}

function selectDashboardAiCategory(category) {
    dashboardSelectedAiCategory = category;
    renderDashboardAiCategories();
    renderDashboardAiTools();
}

// Initialize dashboard
function initializeDashboard() {
    // Set up tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Set up tool card clicks
    document.addEventListener('click', (e) => {
        const toolCard = e.target.closest('.tool-card');
        if (toolCard) {
            const toolId = toolCard.dataset.tool;
            if (toolId) {
                handleDashboardToolClick(toolId);
            }
        }
    });
    
    // Set up back to tools button
    const backToToolsBtn = document.getElementById('back-to-tools');
    if (backToToolsBtn) {
        backToToolsBtn.addEventListener('click', backToTools);
    }
    
    // Set up AI search
    const aiSearch = document.getElementById('dashboard-ai-search');
    if (aiSearch) {
        aiSearch.addEventListener('input', (e) => {
            dashboardAiSearchTerm = e.target.value;
            renderDashboardAiTools();
        });
    }
    
    // Set up user menu
    const userMenuBtn = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
        
        document.addEventListener('click', () => {
            userMenu.classList.add('hidden');
        });
    }
    
    // Initialize default tab
    switchTab('overview');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Export functions for global use
window.DashboardVHU = {
    switchTab,
    handleDashboardToolClick,
    backToTools,
    handleDashboardAiToolClick,
    selectDashboardAiCategory
};