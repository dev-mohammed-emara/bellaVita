document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // Lenis Smooth Scrolling Initialization
  // =========================================================================
  // =========================================================================
  // Optimized Lenis Smooth Scrolling (Faster & Snappier)
  // =========================================================================
  const lenis = new Lenis({
    duration: 0.8, // Dropped from 1.2s to 0.8s for faster transitions
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -14 * t)), // Aggressive exponential curve for quick starts
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWaveform: true,
    mouseMultiplier: 1.1, // Slightly amplified wheel input sensitivity
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // RequestAnimationFrame loop for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Synchronize window scroll events with Lenis
  lenis.on('scroll', () => {
    handleHeaderScroll();
    handleStatsScroll();
    if (typeof handleScrollSpy === 'function') handleScrollSpy();
  });


  // =========================================================================
  // Header background toggle on scroll
  // =========================================================================
  const header = document.getElementById('siteHeader');
  
  const handleHeaderScroll = () => {
    if (!header) return;
    // Using window.scrollY works perfectly with Lenis instances targeting document body
    if (window.scrollY > 50) {
      header.classList.add('scrolled', 'bg-white/95', 'backdrop-blur-xl', 'shadow-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.add('bg-transparent');
      header.classList.remove('scrolled', 'bg-white/95', 'backdrop-blur-xl', 'shadow-md');
    }
  };
  
  if (header) {
    handleHeaderScroll(); // Trigger on load
  }


  // =========================================================================
  // Mobile menu toggle
  // =========================================================================
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const menuWrapper = document.getElementById('mobileMenuWrapper');
  const menuOverlay = document.getElementById('mobileOverlay');
  const menuContent = document.getElementById('mobileMenuContent');

  if (toggleBtn && menuWrapper && menuOverlay && menuContent) {
    const toggleMenu = () => {
      const isOpen = menuContent.classList.contains('open');
      const iconPath = document.getElementById('mobileMenuIconPath');
      if (isOpen) {
        // Close
        menuContent.classList.remove('open');
        menuOverlay.classList.remove('opacity-100');
        menuOverlay.classList.add('opacity-0', 'pointer-events-none');
        if (iconPath) {
          iconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
        setTimeout(() => {
          menuWrapper.classList.add('pointer-events-none');
        }, 400);
        
        // Re-enable Lenis scrolling when menu is closed
        lenis.start();
      } else {
        // Open
        menuWrapper.classList.remove('pointer-events-none');
        menuOverlay.classList.remove('pointer-events-none', 'opacity-0');
        menuOverlay.classList.add('opacity-100');
        menuContent.classList.add('open');
        if (iconPath) {
          iconPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
        
        // Disable Lenis scrolling when mobile menu overlay is active
        lenis.stop();
      }
    };

    toggleBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking navigation items and scroll nicely using Lenis
    menuContent.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // If it's an anchor link, intercept it for Lenis smooth navigation
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          if (menuContent.classList.contains('open')) {
            toggleMenu();
          }
          
          // Let the mobile menu closing animation breathe before starting scroll
          setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              lenis.scrollTo(targetElement);
            }
          }, 300);
        } else {
          // Fallback for fallback standard links
          if (menuContent.classList.contains('open')) {
            toggleMenu();
          }
        }
      });
    });
  }


  // =========================================================================
  // Countdown Timer logic
  // =========================================================================
  const targetDate = new Date('September 16, 2026 09:00:00').getTime();
  const daysBox = document.getElementById('daysBox');
  const hoursBox = document.getElementById('hoursBox');
  const minsBox = document.getElementById('minsBox');
  const secsBox = document.getElementById('secsBox');

  if (daysBox && hoursBox && minsBox && secsBox) {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff <= 0) {
        daysBox.innerText = '00';
        hoursBox.innerText = '00';
        minsBox.innerText = '00';
        secsBox.innerText = '00';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      daysBox.innerText = days;
      hoursBox.innerText = hours;
      minsBox.innerText = mins;
      secsBox.innerText = secs;
    };
    setInterval(updateCountdown, 1000);
    updateCountdown();
  }


  // =========================================================================
  // Stats counter scroll count-up animation
  // =========================================================================
  const stats = document.querySelectorAll('.stat-val');
  let animated = false;

  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const speed = target / 50;
      const interval = setInterval(() => {
        current += speed;
        if (current >= target) {
          stat.innerText = target + '+';
          clearInterval(interval);
        } else {
          stat.innerText = Math.floor(current) + '+';
        }
      }, 30);
    });
  };

  const handleStatsScroll = () => {
    if (animated || stats.length === 0) return;
    const rect = stats[0].getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      animateStats();
      animated = true;
    }
  };

  if (stats.length > 0) {
    handleStatsScroll(); // Trigger if already visible on layout load
  }


  // =========================================================================
  // Speaker Profile Modal logic
  // =========================================================================
  const speakerInfo = {
    sarah: {
      name: "Dr. Sarah Mitchell",
      title: "Dermatology & Aesthetics",
      bio: "Leading researcher in anti-aging treatments with 20+ years of clinical experience. Published over 100 peer-reviewed papers in regenerative skin health.",
      img: "./images/photo-1594122230689-45899d9e6f69.jfif"
    },
    omar: {
      name: "Dr. Omar Al-Rahman",
      title: "Cosmetic Medicine",
      bio: "Facial rejuvenation clinical expert specializing in tissue lifting, dermal fillers, and patient safety optimization across the GCC region.",
      img: "./images/photo-1516841273335-e39b37888115.jfif"
    },
    elena: {
      name: "Dr. Elena Rostova",
      title: "Beauty Tech & Bio-Sciences",
      bio: "European bio-sensing specialist developing next-generation skin diagnostic sensors and smart cosmetic formulation techniques.",
      img: "./images/photo-1558008258-3256797b43f3.jfif"
    },
    marcus: {
      name: "Dr. Marcus Vance",
      title: "Wellness & Longevity",
      bio: "Longevity pioneer focused on cellular rejuvenation, metabolic age reversal protocols, and clinical nutritional systems.",
      img: "./images/photo-1571645163064-77faa9676a46.jfif"
    }
  };

  const modal = document.getElementById('speakerModal');
  const closeBtn = document.getElementById('closeModalBtn');

  if (modal && closeBtn) {
    document.querySelectorAll('.show-profile-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-speaker');
        const data = speakerInfo[id];
        if (data) {
          document.getElementById('modalImg').src = data.img;
          document.getElementById('modalName').innerText = data.name;
          document.getElementById('modalTitle').innerText = data.title;
          document.getElementById('modalBio').innerText = data.bio;
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          
          // Stop global scrolling when modal is active
          lenis.stop();
        }
      });
    });

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      // Re-enable global scrolling
      lenis.start();
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on overlay click
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }


  // =========================================================================
  // Toast alert helper
  // =========================================================================
  const toast = document.getElementById('toast');
  const showToast = (msg) => {
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  };


  // =========================================================================
  // Form submits
  // =========================================================================
  const registerForm = document.getElementById('summitRegisterForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      showToast(`Thank you, Dr. ${name}! Your registration pass inquiry is submitted.`);
      registerForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to our summit newsletter!");
      newsletterForm.reset();
    });
  }

  const newsletterFormFooter = document.getElementById('newsletterFormFooter');
  if (newsletterFormFooter) {
    newsletterFormFooter.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to our summit newsletter!");
      newsletterFormFooter.reset();
    });
  }


  // =========================================================================
  // FAQ Accordion logic
  // =========================================================================
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');
      
      // Close other FAQs
      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.remove('open');
      });
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));
      
      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.classList.add('open');
        
        // Recalculate layout dimensions for smooth scrolling if content sizes change dynamically
        setTimeout(() => {
          lenis.resize();
        }, 300);
      }
    });
  });
  
  // Connect standard link items outside the mobile menu to Lenis smooth travel
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it belongs to mobile menu (already handled)
    if (anchor.closest('#mobileMenuContent')) return;
    
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement);
      }
    });
  });

  // =========================================================================
  // Scroll Spy & Smooth Anchor Scrolling
  // =========================================================================
  window.handleScrollSpy = () => {
    if (!document.getElementById('about')) return; // Only on homepage
    
    let current = '#';
    const sectionsToTrack = ['#about', '#program', '#speakers', '#sponsors', '#venue', '#contact'];
    
    sectionsToTrack.forEach(id => {
      const el = document.querySelector(id);
      if (el && window.scrollY >= el.offsetTop - 200) {
        current = id;
      }
    });

    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
      const span = link.querySelector('span');
      if (!span) return;
      
      const href = link.getAttribute('href');
      const isMatch = href === current || (current === '#' && (href === '#' || href === './index.html'));
      
      if (isMatch) {
        link.classList.remove('text-[#2D2B3D]/90', 'hover:text-accent');
        link.classList.add('text-accent');
        span.classList.remove('w-0', 'group-hover:w-full');
        span.classList.add('w-full');
      } else {
        link.classList.remove('text-accent');
        link.classList.add('text-[#2D2B3D]/90', 'hover:text-accent');
        span.classList.remove('w-full');
        span.classList.add('w-0', 'group-hover:w-full');
      }
    });
  };

  // Initial call
  handleScrollSpy();

  // Smooth scroll for all hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { offset: 0 });
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -80 });
        }
      }
    });
  });

});