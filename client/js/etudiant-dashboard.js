/**
 * Étudiant Dashboard JavaScript
 * Gère les fonctionnalités du tableau de bord des étudiants en pharmacie
 */

class EtudiantDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.initEventListeners();
    this.loadDashboardData();
    this.initRealTimeUpdates();
    this.initProfileCompletion();
  }

  initEventListeners() {
    // Écouter les clics sur les boutons de candidature
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn-apply')) {
        this.handleJobApplication(e.target.dataset.jobId);
      }
      
      if (e.target.matches('.btn-view-details')) {
        this.viewJobDetails(e.target.dataset.jobId);
      }
      
      if (e.target.matches('.btn-start-training')) {
        this.startTraining(e.target.dataset.trainingId);
      }
    });

    // Écouter les changements de profil
    document.addEventListener('change', (e) => {
      if (e.target.matches('.profile-input')) {
        this.updateProfileCompletion();
      }
    });
  }

  loadDashboardData() {
    // Charger les données du tableau de bord
    this.loadJobOffers();
    this.loadUpcomingInterviews();
    this.loadRecentActivities();
    this.loadTrainingRecommendations();
    this.updateStatistics();
  }

  loadJobOffers() {
    // Simuler le chargement des offres d'emploi
    const jobOffers = [
      {
        id: 1,
        title: 'Stage en pharmacie',
        company: 'Pharmacie Centrale - Plateau',
        type: 'Stage',
        duration: '6 mois',
        salary: '150,000 FCFA',
        location: 'Plateau',
        description: 'Recherche d\'un stagiaire motivé pour rejoindre notre équipe. Formation complète et possibilité d\'embauche.',
        tags: ['Stage', 'Temps plein', '6 mois'],
        status: 'active'
      },
      {
        id: 2,
        title: 'Assistant pharmacien',
        company: 'Pharmacie Moderne - Cocody',
        type: 'CDD',
        duration: '1 an',
        salary: '200,000 FCFA',
        location: 'Cocody',
        description: 'Poste d\'assistant pharmacien dans une pharmacie moderne. Expérience requise: 1 an minimum.',
        tags: ['CDD', 'Temps plein', '1 an'],
        status: 'active'
      },
      {
        id: 3,
        title: 'Technicien en pharmacie',
        company: 'Pharmacie Santé - Marcory',
        type: 'CDI',
        duration: 'Permanent',
        salary: '250,000 FCFA',
        location: 'Marcory',
        description: 'Poste permanent de technicien en pharmacie. Excellente opportunité de carrière avec formation continue.',
        tags: ['CDI', 'Temps plein', 'Permanent'],
        status: 'active'
      }
    ];

    this.renderJobOffers(jobOffers);
  }

  renderJobOffers(jobOffers) {
    const container = document.querySelector('.job-offers-list');
    if (!container) return;

    container.innerHTML = jobOffers.map(job => `
      <div class="job-offer-item p-4 border-bottom" data-job-id="${job.id}">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 class="mb-1 fw-bold">${job.title}</h6>
            <p class="text-muted mb-2">${job.company}</p>
            <div class="d-flex gap-2 mb-2">
              ${job.tags.map(tag => `<span class="badge bg-success">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="text-end">
            <div class="text-success fw-bold mb-1">${job.salary}</div>
            <small class="text-muted">Par mois</small>
          </div>
        </div>
        <p class="mb-3">${job.description}</p>
        <div class="d-flex gap-2">
          <button class="btn btn-success btn-sm btn-apply" data-job-id="${job.id}">
            <i class="fas fa-check me-1"></i>Postuler
          </button>
          <button class="btn btn-outline-secondary btn-sm btn-view-details" data-job-id="${job.id}">
            <i class="fas fa-eye me-1"></i>Voir détails
          </button>
        </div>
      </div>
    `).join('');
  }

  loadUpcomingInterviews() {
    // Simuler le chargement des entretiens à venir
    const interviews = [
      {
        id: 1,
        company: 'Pharmacie Centrale',
        date: 'Demain, 14h00',
        status: 'Confirmé',
        type: 'Stage'
      },
      {
        id: 2,
        company: 'Pharmacie Moderne',
        date: 'Vendredi, 10h00',
        status: 'En attente',
        type: 'CDD'
      },
      {
        id: 3,
        company: 'Pharmacie Santé',
        date: 'Lundi, 16h00',
        status: 'Programmé',
        type: 'CDI'
      }
    ];

    this.renderInterviews(interviews);
  }

  renderInterviews(interviews) {
    const container = document.querySelector('.interview-list');
    if (!container) return;

    container.innerHTML = interviews.map(interview => `
      <div class="interview-item p-3 border-bottom">
        <div class="d-flex align-items-center">
          <div class="interview-icon bg-primary text-white rounded-circle me-3">
            <i class="fas fa-building"></i>
          </div>
          <div class="flex-grow-1">
            <h6 class="mb-1">${interview.company}</h6>
            <small class="text-muted">${interview.date}</small>
            <div class="mt-2">
              <span class="badge bg-${this.getStatusColor(interview.status)}">${interview.status}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  getStatusColor(status) {
    const colors = {
      'Confirmé': 'success',
      'En attente': 'warning',
      'Programmé': 'info'
    };
    return colors[status] || 'secondary';
  }

  loadRecentActivities() {
    // Simuler le chargement des activités récentes
    const activities = [
      {
        id: 1,
        type: 'view',
        message: 'Votre profil a été consulté par Pharmacie Centrale',
        time: 'Il y a 2h',
        icon: 'fas fa-eye',
        color: 'success'
      },
      {
        id: 2,
        type: 'application',
        message: 'Vous avez postulé à 3 offres d\'emploi',
        time: 'Il y a 1 jour',
        icon: 'fas fa-check',
        color: 'primary'
      },
      {
        id: 3,
        type: 'rating',
        message: 'Votre profil a reçu 5 étoiles',
        time: 'Il y a 3 jours',
        icon: 'fas fa-star',
        color: 'warning'
      }
    ];

    this.renderActivities(activities);
  }

  renderActivities(activities) {
    const container = document.querySelector('.activity-list');
    if (!container) return;

    container.innerHTML = activities.map(activity => `
      <div class="activity-item d-flex align-items-start p-2">
        <i class="${activity.icon} text-${activity.color} mt-1 me-2"></i>
        <div>
          <small class="text-muted">${activity.time}</small>
          <div>${activity.message}</div>
        </div>
      </div>
    `).join('');
  }

  loadTrainingRecommendations() {
    // Simuler le chargement des formations recommandées
    const trainings = [
      {
        id: 1,
        title: 'Gestion des stocks',
        duration: '2h',
        type: 'Gratuit',
        status: 'available'
      },
      {
        id: 2,
        title: 'Vente et conseil',
        duration: '3h',
        type: 'Premium',
        status: 'locked'
      },
      {
        id: 3,
        title: 'Sécurité pharmaceutique',
        duration: '1.5h',
        type: 'Gratuit',
        status: 'available'
      }
    ];

    this.renderTrainings(trainings);
  }

  renderTrainings(trainings) {
    const container = document.querySelector('.training-recommendations');
    if (!container) return;

    container.innerHTML = trainings.map(training => `
      <div class="col-md-4">
        <div class="training-card bg-light p-3 rounded-3 border">
          <div class="d-flex align-items-center mb-2">
            <i class="fas fa-certificate text-success me-2"></i>
            <h6 class="mb-0">${training.title}</h6>
          </div>
          <p class="text-muted small mb-2">Formation en ligne - ${training.duration}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="badge bg-${training.status === 'available' ? 'success' : 'warning'}">${training.type}</span>
            ${training.status === 'available' 
              ? `<button class="btn btn-primary btn-sm btn-start-training" data-training-id="${training.id}">
                   <i class="fas fa-play me-1"></i>Commencer
                 </button>`
              : `<button class="btn btn-outline-warning btn-sm">
                   <i class="fas fa-lock me-1"></i>Débloquer
                 </button>`
            }
          </div>
        </div>
      </div>
    `).join('');
  }

  updateStatistics() {
    // Mettre à jour les statistiques
    const stats = {
      offresRecues: 8,
      pharmaciesConsultees: 15,
      entretiensProgrammes: 3,
      formationsSuivies: 12
    };

    // Animer les statistiques
    Object.entries(stats).forEach(([key, value]) => {
      const element = document.querySelector(`[data-stat="${key}"]`);
      if (element) {
        this.animateNumber(element, value);
      }
    });
  }

  animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 50);
  }

  initProfileCompletion() {
    // Initialiser la barre de progression du profil
    const progressBar = document.querySelector('.profile-progress .progress-bar');
    const progressText = document.querySelector('.profile-progress .progress-text');
    
    if (progressBar && progressText) {
      const completion = 95; // 95% complété
      progressBar.style.width = `${completion}%`;
      progressText.textContent = `${completion}% complété`;
    }
  }

  updateProfileCompletion() {
    // Mettre à jour la complétion du profil
    const inputs = document.querySelectorAll('.profile-input');
    let completedFields = 0;
    
    inputs.forEach(input => {
      if (input.value.trim()) {
        completedFields++;
      }
    });
    
    const completion = Math.round((completedFields / inputs.length) * 100);
    const progressBar = document.querySelector('.profile-progress .progress-bar');
    const progressText = document.querySelector('.profile-progress .progress-text');
    
    if (progressBar && progressText) {
      progressBar.style.width = `${completion}%`;
      progressText.textContent = `${completion}% complété`;
    }
  }

  handleJobApplication(jobId) {
    // Gérer la candidature à un emploi
    const button = event.target;
    const jobItem = button.closest('.job-offer-item');
    
    // Mettre à jour le bouton
    button.innerHTML = '<i class="fas fa-check me-1"></i>Postulé';
    button.className = 'btn btn-success btn-sm disabled';
    button.disabled = true;
    
    // Afficher une notification
    this.showNotification('Candidature envoyée avec succès !', 'success');
    
    // Mettre à jour les statistiques
    this.updateStatistics();
    
    // Ajouter une activité
    this.addActivity('application', `Vous avez postulé à ${jobItem.querySelector('h6').textContent}`);
  }

  viewJobDetails(jobId) {
    // Afficher les détails d'un emploi
    console.log(`Voir détails de l'emploi ${jobId}`);
    // Ici on ouvrirait un modal avec les détails complets
    this.showNotification('Ouverture des détails de l\'emploi...', 'info');
  }

  startTraining(trainingId) {
    // Commencer une formation
    const button = event.target;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Chargement...';
    button.disabled = true;
    
    // Simuler le chargement de la formation
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-play me-1"></i>En cours';
      button.className = 'btn btn-success btn-sm';
      this.showNotification('Formation démarrée !', 'success');
      
      // Ajouter une activité
      this.addActivity('training', 'Formation "Gestion des stocks" démarrée');
    }, 2000);
  }

  addActivity(type, message) {
    // Ajouter une nouvelle activité
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item d-flex align-items-start p-2';
    newActivity.innerHTML = `
      <i class="fas fa-plus text-success mt-1 me-2"></i>
      <div>
        <small class="text-muted">À l'instant</small>
        <div>${message}</div>
      </div>
    `;
    
    // Insérer au début de la liste
    activityList.insertBefore(newActivity, activityList.firstChild);
    
    // Limiter le nombre d'activités affichées
    const activities = activityList.querySelectorAll('.activity-item');
    if (activities.length > 5) {
      activities[activities.length - 1].remove();
    }
  }

  initRealTimeUpdates() {
    // Simuler des mises à jour en temps réel
    setInterval(() => {
      // Vérifier les nouvelles offres
      this.checkNewJobOffers();
      
      // Vérifier les nouveaux entretiens
      this.checkNewInterviews();
    }, 45000); // Vérifier toutes les 45 secondes
  }

  checkNewJobOffers() {
    // Simuler la vérification de nouvelles offres
    const hasNewOffers = Math.random() > 0.8;
    
    if (hasNewOffers) {
      this.showNotification('Nouvelle offre d\'emploi disponible !', 'info');
      this.loadJobOffers(); // Recharger les offres
    }
  }

  checkNewInterviews() {
    // Simuler la vérification de nouveaux entretiens
    const hasNewInterviews = Math.random() > 0.9;
    
    if (hasNewInterviews) {
      this.showNotification('Nouvel entretien programmé !', 'info');
      this.loadUpcomingInterviews(); // Recharger les entretiens
    }
  }

  showNotification(message, type = 'info') {
    // Afficher une notification
    if (window.showToast) {
      window.showToast(message, type);
    } else {
      // Fallback si showToast n'est pas disponible
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
      alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
      alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      document.body.appendChild(alertDiv);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 5000);
    }
  }
}

// Initialiser le tableau de bord quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new EtudiantDashboard();
});


