document.addEventListener('DOMContentLoaded', async function() {
  // Function to load HTML content into placeholders
  async function loadSection(url, placeholderId) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
      const data = await response.text();
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) {
        placeholder.innerHTML = data;
        console.log(`Successfully loaded ${url} into ${placeholderId}`);
      } else {
        console.error(`Placeholder ${placeholderId} not found`);
      }
    } catch (error) {
      console.error('Error loading section:', error);
      document.getElementById(placeholderId).innerHTML = `<p>Error loading ${url}. Please try again later.</p>`;
    }
  }

  // Load all sections sequentially
  await loadSection('sidebar/readme.html', 'sidebar-placeholder');
  await loadSection('about/info.html', 'about-placeholder');
  await loadSection('about/education.html', 'educations-placeholder');
  await loadSection('about/experiences.html', 'experiences-placeholder');
  await loadSection('pubs/readme.html', 'publications-placeholder');
  await loadSection('projects/readme.html', 'projects-placeholder');
  await loadSection('news/readme.html', 'news-placeholder');

  // Initialize functionality after loading
  initializeFeatures();

  function initializeFeatures() {
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-theme');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
    });

    // Intersection Observer for scroll animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(element => {
      observer.observe(element);
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
});