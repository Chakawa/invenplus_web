/**
 * Partenaire Dashboard JavaScript
 * Gère les fonctionnalités du tableau de bord des pharmaciens partenaires
 */

class PartenaireDashboard {
  constructor() {
    this.init();
  }

  init() {
    this.initEventListeners();
    this.loadDashboardData();
    this.initRealTimeUpdates();
  }

  initEventListeners() {
    // Écouter les clics sur les boutons de réponse
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn-respond')) {
        this.handleRequestResponse(e.target.dataset.requestId);
      }
      
      if (e.target.matches('.btn-stock-alert')) {
        this.handleStockAlert(e.target.dataset.medicamentId);
      }
    });

    // Écouter les changements de statut
    document.addEventListener('change', (e) => {
      if (e.target.matches('.status-select')) {
        this.updateRequestStatus(e.target.dataset.requestId, e.target.value);
      }
    });
  }

  loadDashboardData() {
    // Charger les données du tableau de bord
    this.loadRecentRequests();
    this.loadStockAlerts();
    this.loadCandidates();
    this.updateStatistics();
  }

  loadRecentRequests() {
    // Simuler le chargement des demandes récentes
    const requests = [
      {
        id: 1,
        medicament: 'Paracétamol 500mg',
        client: 'Marie K.',
        zone: 'Plateau',
        statut: 'En attente',
        quantite: 'Boîte de 20',
        prix: '2500 FCFA'
      },
      {
        id: 2,
        medicament: 'Ibuprofène 400mg',
        client: 'Jean P.',
        zone: 'Cocody',
        statut: 'Traité',
        quantite: 'Boîte de 30',
        prix: '3500 FCFA'
      },
      {
        id: 3,
        medicament: 'Vitamine C 1000mg',
        client: 'Sophie L.',
        zone: 'Marcory',
        statut: 'En attente',
        quantite: 'Boîte de 60',
        prix: '4500 FCFA'
      }
    ];

    this.renderRequests(requests);
  }

  renderRequests(requests) {
    const tbody = document.querySelector('.requests-table tbody');
    if (!tbody) return;

    tbody.innerHTML = requests.map(request => `
      <tr data-request-id="${request.id}">
        <td>
          <div class="d-flex align-items-center">
            <div class="med-icon bg-success text-white rounded-circle me-2">
              <i class="fas fa-pills"></i>
            </div>
            <div>
              <div class="fw-bold">${request.medicament}</div>
              <small class="text-muted">${request.quantite}</small>
            </div>
          </div>
        </td>
        <td>${request.client}</td>
        <td>${request.zone}</td>
        <td>
          <select class="form-select form-select-sm status-select" data-request-id="${request.id}">
            <option value="En attente" ${request.statut === 'En attente' ? 'selected' : ''}>En attente</option>
            <option value="En cours" ${request.statut === 'En cours' ? 'selected' : ''}>En cours</option>
            <option value="Traité" ${request.statut === 'Traité' ? 'selected' : ''}>Traité</option>
            <option value="Annulé" ${request.statut === 'Annulé' ? 'selected' : ''}>Annulé</option>
          </select>
        </td>
        <td>
          <div class="d-flex gap-1">
            <button class="btn btn-success btn-sm btn-respond" data-request-id="${request.id}">
              <i class="fas fa-check me-1"></i>Disponible
            </button>
            <button class="btn btn-outline-secondary btn-sm" onclick="viewRequestDetails(${request.id})">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  loadStockAlerts() {
    // Simuler le chargement des alertes de stock
    const alerts = [
      {
        id: 1,
        medicament: 'Paracétamol 500mg',
        reste: 5,
        seuil: 10,
        niveau: 'warning'
      },
      {
        id: 2,
        medicament: 'Ibuprofène 400mg',
        reste: 2,
        seuil: 5,
        niveau: 'danger'
      },
      {
        id: 3,
        medicament: 'Vitamine C 1000mg',
        reste: 8,
        seuil: 15,
        niveau: 'warning'
      }
    ];

    this.renderStockAlerts(alerts);
  }

  renderStockAlerts(alerts) {
    const container = document.querySelector('.stock-alerts-container');
    if (!container) return;

    container.innerHTML = alerts.map(alert => `
      <div class="col-md-4">
        <div class="stock-alert bg-${alert.niveau} bg-opacity-10 p-3 rounded-3 border border-${alert.niveau}">
          <div class="d-flex align-items-center">
            <i class="fas fa-exclamation-triangle text-${alert.niveau} me-2"></i>
            <div>
              <h6 class="mb-1">${alert.medicament}</h6>
              <small class="text-muted">Reste: ${alert.reste} boîtes</small>
            </div>
          </div>
          <button class="btn btn-${alert.niveau} btn-sm mt-2 w-100 btn-stock-alert" data-medicament-id="${alert.id}">
            <i class="fas fa-plus me-1"></i>Commander
          </button>
        </div>
      </div>
    `).join('');
  }

  loadCandidates() {
    // Simuler le chargement des candidats
    const candidates = [
      {
        id: 1,
        nom: 'Kouassi M.',
        type: 'Étudiant en pharmacie',
        disponibilite: 'Stage',
        temps: 'Temps plein',
        experience: 'Débutant'
      },
      {
        id: 2,
        nom: 'Traoré F.',
        type: 'Assistant pharmacien',
        disponibilite: 'CDI',
        temps: 'Temps plein',
        experience: 'Expérimenté'
      },
      {
        id: 3,
        nom: 'Bamba A.',
        type: 'Technicien en pharmacie',
        disponibilite: 'CDD',
        temps: 'Temps plein',
        experience: 'Débutant'
      }
    ];

    this.renderCandidates(candidates);
  }

  renderCandidates(candidates) {
    const container = document.querySelector('.candidates-container');
    if (!container) return;

    container.innerHTML = candidates.map(candidate => `
      <div class="candidate-item d-flex align-items-center p-3 border-bottom">
        <div class="candidate-avatar bg-success text-white rounded-circle me-3">
          <i class="fas fa-user"></i>
        </div>
        <div class="flex-grow-1">
          <h6 class="mb-1">${candidate.nom}</h6>
          <small class="text-muted">${candidate.type}</small>
          <div class="mt-2">
            <span class="badge bg-light text-dark me-1">${candidate.disponibilite}</span>
            <span class="badge bg-light text-dark">${candidate.temps}</span>
          </div>
        </div>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-success" onclick="viewCandidateProfile(${candidate.id})">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn btn-sm btn-success" onclick="contactCandidate(${candidate.id})">
            <i class="fas fa-phone"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  updateStatistics() {
    // Mettre à jour les statistiques
    const stats = {
      demandesEnCours: 12,
      demandesTraitees: 45,
      stockFaible: 8,
      candidatsDisponibles: 15
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

  handleRequestResponse(requestId) {
    // Gérer la réponse à une demande
    const button = event.target;
    const row = button.closest('tr');
    
    // Mettre à jour le statut
    const statusSelect = row.querySelector('.status-select');
    statusSelect.value = 'Traité';
    
    // Désactiver le bouton
    button.innerHTML = '<i class="fas fa-check me-1"></i>Répondu';
    button.className = 'btn btn-success btn-sm disabled';
    button.disabled = true;
    
    // Afficher une notification
    this.showNotification('Demande traitée avec succès !', 'success');
    
    // Mettre à jour les statistiques
    this.updateStatistics();
  }

  handleStockAlert(medicamentId) {
    // Gérer l'alerte de stock
    const button = event.target;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Commande...';
    button.disabled = true;
    
    // Simuler une commande
    setTimeout(() => {
      button.innerHTML = '<i class="fas fa-check me-1"></i>Commandé';
      button.className = 'btn btn-success btn-sm';
      this.showNotification('Commande passée avec succès !', 'success');
    }, 2000);
  }

  updateRequestStatus(requestId, newStatus) {
    // Mettre à jour le statut d'une demande
    console.log(`Demande ${requestId} mise à jour: ${newStatus}`);
    
    // Ici on enverrait une requête API pour mettre à jour le statut
    this.showNotification(`Statut mis à jour: ${newStatus}`, 'info');
  }

  initRealTimeUpdates() {
    // Simuler des mises à jour en temps réel
    setInterval(() => {
      // Vérifier les nouvelles demandes
      this.checkNewRequests();
      
      // Vérifier les alertes de stock
      this.checkStockAlerts();
    }, 30000); // Vérifier toutes les 30 secondes
  }

  checkNewRequests() {
    // Simuler la vérification de nouvelles demandes
    const hasNewRequests = Math.random() > 0.7;
    
    if (hasNewRequests) {
      this.showNotification('Nouvelle demande reçue !', 'info');
      this.loadDashboardData(); // Recharger les données
    }
  }

  checkStockAlerts() {
    // Simuler la vérification des alertes de stock
    const hasStockAlert = Math.random() > 0.8;
    
    if (hasStockAlert) {
      this.showNotification('Alerte de stock détectée !', 'warning');
      this.loadStockAlerts(); // Recharger les alertes
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

// Fonctions globales pour les boutons
function viewRequestDetails(requestId) {
  // Afficher les détails d'une demande
  console.log(`Voir détails de la demande ${requestId}`);
  // Ici on ouvrirait un modal avec les détails
}

function viewCandidateProfile(candidateId) {
  // Afficher le profil d'un candidat
  console.log(`Voir profil du candidat ${candidateId}`);
  // Ici on ouvrirait un modal avec le profil
}

function contactCandidate(candidateId) {
  // Contacter un candidat
  console.log(`Contacter le candidat ${candidateId}`);
  // Ici on ouvrirait un modal de contact
}

// Initialiser le tableau de bord quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  new PartenaireDashboard();
});

