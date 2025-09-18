// Main JavaScript file for Study VHU platform

// Global variables
let isAuthenticated = false;
let currentUser = null;
let isLogin = true;

// Data arrays
const studyTools = [
    {
        id: 'pomodoro',
        icon: 'clock',
        title: "Bộ Đếm Pomodoro",
        description: "Tăng hiệu suất học tập với phiên học tập tập trung 25 phút",
        color: "bg-gradient-to-br from-red-500 to-red-600",
        features: ["Tự động nghỉ giải lao", "Thống kê thời gian học", "Âm thanh thông báo"]
    },
    {
        id: 'notes',
        icon: 'sticky-note',
        title: "Ghi Chú Thông Minh",
        description: "Tổ chức và đồng bộ ghi chú trên mọi thiết bị",
        color: "bg-gradient-to-br from-purple-500 to-purple-600",
        features: ["Đồng bộ đám mây", "Tìm kiếm nhanh", "Chia sẻ ghi chú"]
    },
    {
        id: 'schedule',
        icon: 'calendar',
        title: "Thời Khóa Biểu",
        description: "Lập kế hoạch học tập và theo dõi tiến độ",
        color: "bg-gradient-to-br from-green-500 to-green-600",
        features: ["Nhắc nhở tự động", "Theo dõi tiến độ", "Tích hợp lịch"]
    },
    {
        id: 'analytics',
        icon: 'bar-chart-3',
        title: "Thống Kê Học Tập",
        description: "Phân tích và theo dõi tiến độ học tập của bạn",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
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
    }
];

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

const aiCategories = ["Tất Cả", "AI Tổng Hợp", "Viết Lách", "Toán Học", "Năng Suất", "Giáo Dục", "Ngôn Ngữ"];
const materialCategories = ["Tất Cả", "Công Nghệ", "Toán Học", "Kinh Tế", "Khoa Học", "Ngôn Ngữ", "Y Học"];

// Filter states
let selectedAiCategory = 'Tất Cả';
let selectedMaterialsCategory = 'Tất Cả';
let aiSearchTerm = '';
let materialsSearchTerm = '';

// Utility functions
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type} transform translate-x-full`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-triangle',
        info: 'info'
    };

    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <i data-lucide="${iconMap[type]}" class="w-5 h-5 text-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-600"></i>
            <span class="text-gray-800">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons();

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 5000);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// API functions
async function makeRequest(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, mergedOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Request failed:', error);
        showToast('Có lỗi xảy ra. Vui lòng thử lại.', 'error');
        return null;
    }
}

// Authentication functions
async function handleAuth(formData, isLoginMode) {
    const url = isLoginMode ? '/auth/login/' : '/auth/register/';
    const data = await makeRequest(url, {
        method: 'POST',
        body: formData
    });

    if (data && data.success) {
        showToast(isLoginMode ? 'Đăng nhập thành công!' : 'Đăng ký thành công!', 'success');
        setTimeout(() => {
            window.location.href = data.redirect;
        }, 1000);
    } else {
        showToast(data?.error || 'Có lỗi xảy ra', 'error');
    }
}

// Filter functions
function filterAiTools() {
    return aiTools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                             tool.description.toLowerCase().includes(aiSearchTerm.toLowerCase()) ||
                             tool.tags.some(tag => tag.toLowerCase().includes(aiSearchTerm.toLowerCase()));
        const matchesCategory = selectedAiCategory === 'Tất Cả' || tool.category === selectedAiCategory;
        return matchesSearch && matchesCategory;
    });
}

function filterMaterials() {
    return studyMaterials.filter(material => {
        const matchesSearch = material.title.toLowerCase().includes(materialsSearchTerm.toLowerCase()) ||
                             material.description.toLowerCase().includes(materialsSearchTerm.toLowerCase()) ||
                             material.subjects.some(subject => subject.toLowerCase().includes(materialsSearchTerm.toLowerCase()));
        const matchesCategory = selectedMaterialsCategory === 'Tất Cả' || material.category === selectedMaterialsCategory;
        return matchesSearch && matchesCategory;
    });
}

// Render functions
function renderStudyTools() {
    const container = document.getElementById('study-tools');
    if (!container) return;

    container.innerHTML = studyTools.map((tool, index) => `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 flex flex-col h-full animate-fade-in-up delay-${index * 100}">
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
            <button onclick="handleToolDemo('${tool.id}')" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 mt-auto">
                <span>Dùng Thử Ngay</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
        </div>
    `).join('');

    lucide.createIcons();
}

function renderAiTools() {
    const filteredTools = filterAiTools();
    const container = document.getElementById('ai-tools-grid');
    const noResults = document.getElementById('ai-no-results');
    const resultsCount = document.getElementById('ai-results-count');

    if (!container) return;

    if (filteredTools.length === 0) {
        container.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        if (noResults) noResults.classList.add('hidden');
    }

    if (resultsCount) {
        resultsCount.textContent = `Hiển thị ${filteredTools.length} / ${aiTools.length} công cụ`;
    }

    container.innerHTML = filteredTools.map((tool, index) => `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200/50 flex flex-col h-full animate-fade-in-up delay-${index * 100}">
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
            <p class="text-gray-600 mb-3 text-sm flex-grow">${tool.description}</p>
            <p class="text-xs text-gray-500 mb-4 italic">${tool.useCase}</p>

            <div class="flex flex-wrap gap-1 mb-4">
                ${tool.tags.map(tag => `
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">${tag}</span>
                `).join('')}
            </div>

            <div class="flex items-center justify-between mt-auto">
                <span class="text-xs text-gray-500">${tool.users} người dùng</span>
                <button onclick="handleAiToolClick('${tool.url}', '${tool.name}')" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium flex items-center justify-center space-x-2 text-sm px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[100px]">
                    <span>Truy Cập</span>
                    <i data-lucide="external-link" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function renderMaterials() {
    const filteredMaterials = filterMaterials();
    const container = document.getElementById('materials-grid');
    const noResults = document.getElementById('materials-no-results');
    const resultsCount = document.getElementById('materials-results-count');

    if (!container) return;

    if (filteredMaterials.length === 0) {
        container.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
    } else {
        container.classList.remove('hidden');
        if (noResults) noResults.classList.add('hidden');
    }

    if (resultsCount) {
        resultsCount.textContent = `Hiển thị ${filteredMaterials.length} / ${studyMaterials.length} tài liệu`;
    }

    container.innerHTML = filteredMaterials.map((material, index) => `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200/50 flex flex-col h-full animate-fade-in-up delay-${index * 100}">
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
                    ${material.subjects.map(subject => `
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">${subject}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="flex space-x-2 mt-auto">
                <button onclick="handleMaterialAccess('${material.title}')" class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
                    Truy Cập Tài Liệu
                </button>
                <button onclick="handleBookmark('${material.title}', 'material')" class="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <i data-lucide="bookmark" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function renderAiCategories() {
    const container = document.getElementById('ai-categories');
    if (!container) return;

    container.innerHTML = aiCategories.map(category => `
        <button
            onclick="selectAiCategory('${category}')"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedAiCategory === category
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
            }"
        >
            ${category}
        </button>
    `).join('');
}

function renderMaterialCategories() {
    const container = document.getElementById('materials-categories');
    if (!container) return;

    container.innerHTML = materialCategories.map(category => `
        <button
            onclick="selectMaterialCategory('${category}')"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedMaterialsCategory === category
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
            }"
        >
            ${category}
        </button>
    `).join('');
}

// Event handlers
function handleToolDemo(toolId) {
    if (!isAuthenticated) {
        showAuthModal();
        return;
    }
    showToast('Chuyển đến công cụ ' + toolId, 'info');
    // In a real app, this would navigate to the tool
}

function handleAiToolClick(url, name) {
    window.open(url, '_blank');
    showToast(`Đang chuyển đến ${name}`, 'success');
}

function handleMaterialAccess(title) {
    if (!isAuthenticated) {
        showAuthModal();
        return;
    }
    showToast(`Truy cập tài liệu: ${title}`, 'info');
}

function handleBookmark(title, type) {
    if (!isAuthenticated) {
        showAuthModal();
        return;
    }
    showToast(`Đã thêm "${title}" vào bookmark`, 'success');
}

function selectAiCategory(category) {
    selectedAiCategory = category;
    renderAiCategories();
    renderAiTools();
}

function selectMaterialCategory(category) {
    selectedMaterialsCategory = category;
    renderMaterialCategories();
    renderMaterials();
}

function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function toggleAuthMode() {
    isLogin = !isLogin;
    const title = document.getElementById('auth-modal-title');
    const nameField = document.getElementById('name-field');
    const submitBtn = document.getElementById('auth-submit-btn');
    const switchText = document.getElementById('auth-switch-text');
    const switchBtn = document.getElementById('auth-switch-btn');

    if (title) title.textContent = isLogin ? 'Đăng Nhập' : 'Đăng Ký';
    if (nameField) nameField.classList.toggle('hidden', isLogin);
    if (submitBtn) submitBtn.textContent = isLogin ? 'Đăng Nhập' : 'Đăng Ký';
    if (switchText) switchText.textContent = isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?';
    if (switchBtn) switchBtn.textContent = isLogin ? 'Đăng ký ngay' : 'Đăng nhập';
}

// Initialize page
function initializePage() {
    // Check if user is authenticated (this would come from Django template)
    isAuthenticated = document.body.dataset.authenticated === 'true';

    // Render components
    renderStudyTools();
    renderAiTools();
    renderMaterials();
    renderAiCategories();
    renderMaterialCategories();

    // Set up event listeners
    setupEventListeners();

    // Initialize scroll effects
    setupScrollEffects();

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
                lucide.createIcons();
            }
        });
    }

    // User menu toggle
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

    // Auth modal
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const startStudyingBtn = document.getElementById('start-studying-btn');
    const ctaStartBtn = document.getElementById('cta-start-btn');
    const authModalClose = document.getElementById('auth-modal-close');
    const authSwitchBtn = document.getElementById('auth-switch-btn');
    const authForm = document.getElementById('auth-form');

    [loginBtn, mobileLoginBtn, startStudyingBtn, ctaStartBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                if (!isAuthenticated) {
                    showAuthModal();
                } else if (btn === startStudyingBtn || btn === ctaStartBtn) {
                    window.location.href = '/dashboard/';
                }
            });
        }
    });

    if (authModalClose) {
        authModalClose.addEventListener('click', hideAuthModal);
    }

    if (authSwitchBtn) {
        authSwitchBtn.addEventListener('click', toggleAuthMode);
    }

    // Auth form submission
    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(authForm);
            
            // Add username field for login (use email as username)
            if (isLogin) {
                formData.set('username', formData.get('email'));
            }
            
            await handleAuth(formData, isLogin);
        });
    }

    // Password toggle
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePassword.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', type === 'password' ? 'eye-off' : 'eye');
                lucide.createIcons();
            }
        });
    }

    // Search inputs
    const aiSearch = document.getElementById('ai-search');
    const materialsSearch = document.getElementById('materials-search');

    if (aiSearch) {
        aiSearch.addEventListener('input', (e) => {
            aiSearchTerm = e.target.value;
            renderAiTools();
        });
    }

    if (materialsSearch) {
        materialsSearch.addEventListener('input', (e) => {
            materialsSearchTerm = e.target.value;
            renderMaterials();
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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
}

function setupScrollEffects() {
    const header = document.getElementById('header');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset > 10;
        
        // Header scroll effect
        if (header) {
            if (scrolled) {
                header.classList.add('bg-white/95', 'shadow-lg', 'backdrop-blur-lg', 'border-b', 'border-gray-200/70');
                header.classList.remove('bg-white/80', 'backdrop-blur-md', 'border-transparent');
            } else {
                header.classList.remove('bg-white/95', 'shadow-lg', 'backdrop-blur-lg', 'border-b', 'border-gray-200/70');
                header.classList.add('bg-white/80', 'backdrop-blur-md', 'border-transparent');
            }
        }

        // Scroll to top button
        if (scrollToTopBtn) {
            const showScrollTop = window.pageYOffset > window.innerHeight / 2;
            if (showScrollTop) {
                scrollToTopBtn.classList.remove('hidden');
            } else {
                scrollToTopBtn.classList.add('hidden');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Export functions for use in other scripts
window.StudyVHU = {
    showToast,
    handleToolDemo,
    handleAiToolClick,
    handleMaterialAccess,
    handleBookmark,
    selectAiCategory,
    selectMaterialCategory,
    showAuthModal,
    hideAuthModal,
    toggleAuthMode,
    makeRequest,
    getCookie
};