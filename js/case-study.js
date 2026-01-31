// case-study.js - JavaScript khusus untuk halaman studi kasus

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Animasi scroll untuk elemen studi kasus
    const caseStudySections = document.querySelectorAll('.case-study-section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    caseStudySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // 2. Highlight active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.footer-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // 3. Image zoom functionality
    const caseStudyImages = document.querySelectorAll('.case-study-image');
    
    caseStudyImages.forEach(img => {
        // Add click to zoom functionality
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
            
            if (this.classList.contains('zoomed')) {
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.innerHTML = `
                    <div class="overlay-content">
                        <button class="close-zoom">×</button>
                        <img src="${this.src}" alt="${this.alt}">
                    </div>
                `;
                
                document.body.appendChild(overlay);
                document.body.style.overflow = 'hidden';
                
                // Close functionality
                overlay.querySelector('.close-zoom').addEventListener('click', () => {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = 'auto';
                    this.classList.remove('zoomed');
                });
                
                // Close on overlay click
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        document.body.removeChild(overlay);
                        document.body.style.overflow = 'auto';
                        this.classList.remove('zoomed');
                    }
                });
            }
        });
    });
    
    // 4. Share functionality
    const shareData = {
        title: document.title,
        text: document.querySelector('meta[name="description"]')?.content || '',
        url: window.location.href
    };
    
    // Create share button if supported
    if (navigator.share) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.innerHTML = '🔗 Bagikan Studi Kasus';
        shareBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
        `;
        
        shareBtn.addEventListener('mouseenter', () => {
            shareBtn.style.transform = 'translateY(-2px)';
            shareBtn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        });
        
        shareBtn.addEventListener('mouseleave', () => {
            shareBtn.style.transform = 'translateY(0)';
            shareBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share(shareData);
                console.log('Studi kasus berhasil dibagikan');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
        
        document.body.appendChild(shareBtn);
    }
    
    // 5. Add CSS for zoomed images
    const style = document.createElement('style');
    style.textContent = `
        .image-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .overlay-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .overlay-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
        }
        
        .close-zoom {
            position: absolute;
            top: -40px;
            right: 0;
            background: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .case-study-image {
            cursor: zoom-in;
            transition: transform 0.3s ease;
        }
        
        .case-study-image:hover {
            transform: scale(1.02);
        }
        
        @media (max-width: 768px) {
            .share-btn {
                bottom: 70px;
                font-size: 0.9rem;
                padding: 10px 16px;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 6. Track time spent on case study
    let startTime = Date.now();
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        maxScroll = Math.max(maxScroll, window.scrollY);
    });
    
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
        const scrollDepth = Math.round((maxScroll / document.body.scrollHeight) * 100);
        
        // In a real implementation, send this data to analytics
        console.log(`User spent ${timeSpent}s on case study, scrolled ${scrollDepth}%`);
        
        // Example of sending to Google Analytics (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'case_study_read', {
                'case_study_title': document.title,
                'time_spent_seconds': timeSpent,
                'scroll_depth_percentage': scrollDepth
            });
        }
    });
    
    console.log(`Case Study: ${document.title} loaded successfully.`);
});
