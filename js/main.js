// 九茂電梯官方網站 - 主要 JavaScript 功能

// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 手機版選單切換
    initMobileMenu();
    
    // 平滑滾動
    initSmoothScroll();
    
    // 表單驗證
    initFormValidation();
    
    // 導航列高亮當前頁面
    highlightCurrentPage();
    
    // 動畫效果
    initAnimations();
});

// 手機版選單切換
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 切換按鈕圖示
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.textContent = '✕';
            } else {
                mobileMenuToggle.textContent = '☰';
            }
        });
        
        // 點擊選單項目後關閉選單
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            });
        });
        
        // 點擊外部區域關閉選單
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.textContent = '☰';
            }
        });
    }
}

// 平滑滾動
function initSmoothScroll() {
    // 為所有內部連結添加平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是空連結或只是 #，不處理
            if (href === '#' || href === '') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 70; // 考慮導航列高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 表單驗證
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 獲取表單欄位
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // 驗證必填欄位
            if (!name || !phone || !subject || !message) {
                alert('請填寫所有必填欄位（標示 * 的欄位）');
                return;
            }
            
            // 驗證電話格式（簡單驗證）
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(phone)) {
                alert('請輸入有效的電話號碼');
                return;
            }
            
            // 驗證 Email 格式（如果有填寫）
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('請輸入有效的 E-mail 地址');
                    return;
                }
            }
            
            // 表單驗證通過，顯示成功訊息
            // 實際應用中可以發送到後端伺服器
            alert('感謝您的訊息！我們會盡快與您聯繫。\n\n' +
                  '姓名：' + name + '\n' +
                  '電話：' + phone + '\n' +
                  'E-mail：' + (email || '未提供') + '\n' +
                  '主旨：' + subject + '\n' +
                  '訊息：' + message);
            
            // 重置表單
            contactForm.reset();
        });
    }
}

// 高亮當前頁面
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.style.color = 'var(--primary-dark)';
            link.style.fontWeight = 'bold';
        }
    });
}

// 動畫效果
function initAnimations() {
    // 滾動時顯示元素
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 觀察所有卡片和區塊
    const animatedElements = document.querySelectorAll('.card, .service-item, .location-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 導航列滾動效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

// 返回頂部按鈕（可選功能）
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-dark);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });
    
    document.body.appendChild(button);
}

// 初始化返回頂部按鈕
createBackToTopButton();

