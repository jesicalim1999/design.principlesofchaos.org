// script.js - JavaScript untuk Principles of Design Studio

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Update tahun di footer secara otomatis
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // 2. Toggle Menu Navigasi (Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Ganti ikon menu
            this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Tutup menu saat klik di luar
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }
    
    // 3. Smooth Scroll untuk link anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Tutup menu mobile jika terbuka
                if(mainNav) {
                    mainNav.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 4. Animasi saat scroll (reveal elements)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Amati elemen yang ingin dianimasikan
    document.querySelectorAll('.card, .portfolio-item, .step, .testimonial').forEach(el => {
        observer.observe(el);
    });
    
    // 5. Form handling untuk CTA (contoh sederhana)
    const ctaForm = document.querySelector('.cta-form');
    if(ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai form
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            
            // Validasi sederhana
            if(name && email) {
                // Di sini biasanya akan ada kode untuk mengirim data ke server
                alert(`Terima kasih ${name}! Kami akan menghubungi Anda di ${email} dalam 1x24 jam.`);
                this.reset();
            } else {
                alert('Harap isi semua bidang yang diperlukan.');
            }
        });
    }
    
    // 6. Optimasi performa: Lazy loading gambar
    if('loading' in HTMLImageElement.prototype) {
        // Browser mendukung lazy loading native
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback untuk browser lama
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    console.log('Principles of Design Studio website loaded successfully.');
});
