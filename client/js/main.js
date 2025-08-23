/**
 * Application principale InventPlus
 * Gère l'interactivité globale et les fonctionnalités communes
 */
class InventPlusApp {
  constructor() {
    this.init();
  }

  init() {
    this.initNavbar();
    this.initScrollAnimations();
    this.initMobileMenu();
    this.initSearch();
    this.initSmoothScrolling();
    this.initLazyLoading();
    this.initFormValidation();
    this.initTooltips();
    this.initBackToTop();
    this.initToastNotifications();
    this.initDarkMode();
  }

  /**
   * Initialise la navbar avec comportement de scroll
   */
  initNavbar() {
    const topNavbar = document.querySelector('.top-navbar');
    const secondaryNavbar = document.querySelector('.secondary-navbar');
    
    if (topNavbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          topNavbar.classList.add('scrolled');
        } else {
          topNavbar.classList.remove('scrolled');
        }
      });
    }
  }

  /**
   * Initialise les animations au scroll
   */
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, observerOptions);

    // Observer tous les éléments avec la classe 'animate'
    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Initialise le menu mobile
   */
  initMobileMenu() {
    const mobileMenuToggle = document.querySelector('[data-bs-toggle="offcanvas"]');
    const offcanvas = document.querySelector('.offcanvas-nav');
    
    if (mobileMenuToggle && offcanvas) {
      mobileMenuToggle.addEventListener('click', () => {
        offcanvas.classList.toggle('show');
      });
    }
  }

  /**
   * Initialise la fonctionnalité de recherche
   */
  initSearch() {
    const searchInput = document.getElementById('mainSearchInput');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
      // Recherche en temps réel
      searchInput.addEventListener('input', this.debounce((e) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
          this.performSearch(query);
        }
      }, 300));

      // Recherche au clic
      searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });

      // Recherche avec Entrée
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            this.performSearch(query);
          }
        }
      });
    }
  }

  /**
   * Effectue une recherche
   */
  performSearch(query) {
    // Stocker le terme de recherche
    localStorage.setItem('searchTerm', query);
    
    // Rediriger vers la page de recherche
    if (window.location.pathname !== '/recherche-medicament.html') {
      window.location.href = 'recherche-medicament.html';
    }
  }

  /**
   * Initialise le défilement fluide
   */
  initSmoothScrolling() {
    // Défilement fluide pour les liens internes
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

    // Défilement fluide pour les boutons de navigation
    document.querySelectorAll('.btn[data-scroll-to]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-scroll-to');
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Initialise le chargement différé
   */
  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Initialise la validation des formulaires
   */
  initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
          this.showToast('Veuillez corriger les erreurs dans le formulaire', 'error');
        }
      });
    });
  }

  /**
   * Valide un formulaire
   */
  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        this.showInputError(input, 'Ce champ est requis');
        isValid = false;
      } else {
        this.clearInputError(input);
      }
    });

    // Validation spécifique pour l'email
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      if (input.value && !this.isValidEmail(input.value)) {
        this.showInputError(input, 'Veuillez entrer une adresse email valide');
        isValid = false;
      }
    });

    // Validation spécifique pour le téléphone
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
      if (input.value && !this.isValidPhone(input.value)) {
        this.showInputError(input, 'Veuillez entrer un numéro de téléphone valide');
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Affiche une erreur sur un champ de saisie
   */
  showInputError(input, message) {
    this.clearInputError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    
    input.classList.add('is-invalid');
    input.parentNode.appendChild(errorDiv);
  }

  /**
   * Efface l'erreur d'un champ de saisie
   */
  clearInputError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  /**
   * Initialise les tooltips
   */
  initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  /**
   * Initialise le bouton retour en haut
   */
  initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-success btn-back-to-top';
    backToTopBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(backToTopBtn);

    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // Action du bouton
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
      backToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseleave', () => {
      backToTopBtn.style.transform = 'translateY(0) scale(1)';
    });
  }

  /**
   * Initialise les notifications toast
   */
  initToastNotifications() {
    // Créer le conteneur des toasts s'il n'existe pas
    if (!document.getElementById('toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
      toastContainer.style.cssText = 'z-index: 1055;';
      document.body.appendChild(toastContainer);
    }
  }

  /**
   * Affiche une notification toast
   */
  showToast(message, type = 'info', duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastId = 'toast-' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header bg-${type} text-white">
          <i class="fas fa-${this.getToastIcon(type)} me-2"></i>
          <strong class="me-auto">${this.getToastTitle(type)}</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: duration });
    toast.show();

    // Supprimer le toast après affichage
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  /**
   * Obtient l'icône pour le type de toast
   */
  getToastIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  }

  /**
   * Obtient le titre pour le type de toast
   */
  getToastTitle(type) {
    const titles = {
      success: 'Succès',
      error: 'Erreur',
      warning: 'Attention',
      info: 'Information'
    };
    return titles[type] || 'Information';
  }

  /**
   * Initialise le mode sombre
   */
  initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        this.showToast(
          `Mode ${isDark ? 'sombre' : 'clair'} activé`,
          'info',
          2000
        );
      });

      // Restaurer la préférence
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
      }
    }
  }

  /**
   * Utilitaires
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Utilitaires globaux
window.utils = {
  formatCurrency: (amount, currency = 'FCFA') => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  formatDate: (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Fonction globale pour rediriger vers la recherche
window.redirectToSearch = function() {
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput && searchInput.value.trim()) {
    localStorage.setItem('searchTerm', searchInput.value.trim());
    window.location.href = 'recherche-medicament.html';
  } else {
    window.location.href = 'recherche-medicament.html';
  }
};

// Fonction globale pour afficher les toasts
window.showToast = function(message, type = 'info', duration = 5000) {
  if (window.inventPlusApp) {
    window.inventPlusApp.showToast(message, type, duration);
  } else {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
};

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  window.inventPlusApp = new InventPlusApp();
  
  // Animation des statistiques si la fonction existe
  if (typeof animateStats === 'function') {
    const statsSection = document.querySelector('.bg-success');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(statsSection);
    }
  }
});

