// ===== MEDICAMENT SEARCH FUNCTIONALITY =====

// Variables globales
let currentSearchTerm = '';
let currentFilters = {
  ville: [],
  commune: '',
  forme: [],
  prix: [],
  disponibilite: []
};

// Données des villes et communes de Côte d'Ivoire
const villesCommunes = {
  abidjan: [
    'Plateau', 'Cocody', 'Yopougon', 'Marcory', 'Treichville', 'Adjamé', 
    'Abobo', 'Port-Bouët', 'Koumassi', 'Bingerville', 'Songon', 'Anyama'
  ],
  bouake: [
    'Centre-ville', 'Air France', 'Brobo', 'Sakassou', 'Béoumi', 'Botro'
  ],
  yamoussoukro: [
    'Centre-ville', 'Kossou', 'Tiébissou', 'Attiégouakro', 'Lolobo'
  ],
  'san-pedro': [
    'Centre-ville', 'Grand-Béréby', 'Tabou', 'Sassandra'
  ],
  korhogo: [
    'Centre-ville', 'Ferkessédougou', 'Boundiali', 'Sinématiali'
  ],
  man: [
    'Centre-ville', 'Danané', 'Zouan-Hounien', 'Biankouma'
  ],
  gagnoa: [
    'Centre-ville', 'Oumé', 'Sinfra', 'Issia'
  ],
  dabou: [
    'Centre-ville', 'Jacqueville', 'Grand-Lahou'
  ],
  agboville: [
    'Centre-ville', 'Adzopé', 'Akoupé', 'Afféry'
  ],
  dimbokro: [
    'Centre-ville', 'Bocanda', 'Daoukro', 'M\'Bahiakro'
  ],
  bondoukou: [
    'Centre-ville', 'Tanda', 'Bouna', 'Transua'
  ],
  abengourou: [
    'Centre-ville', 'Agnibilékrou', 'Bettie', 'M\'Batto'
  ],
  'grand-bassam': [
    'Centre-ville', 'Moossou', 'Bracodi', 'Vridi'
  ],
  assinie: [
    'Centre-ville', 'Mafia', 'M\'Bokro', 'Adjin'
  ]
};

// Variables pour le timer
let searchTimer = null;
let timeRemaining = 600; // 10 minutes en secondes

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
  setupEventListeners();
});

// Initialisation de la recherche
function initializeSearch() {
  // Récupérer le terme de recherche depuis l'URL si disponible
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');
  
  if (searchTerm) {
    currentSearchTerm = searchTerm;
    document.getElementById('medicamentSearch').value = searchTerm;
    performSearch(searchTerm);
  }
  
  // Initialiser les filtres
  initializeFilters();
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Formulaire de recherche
  const searchForm = document.getElementById('medicamentSearchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchInput = document.getElementById('medicamentSearch');
      const searchTerm = searchInput.value.trim();
      
      if (searchTerm) {
        performSearch(searchTerm);
      } else {
        showAlert('Veuillez entrer un terme de recherche', 'warning');
      }
    });
  }
  
  // Filtres
  setupFilterEventListeners();
  
  // Tri des résultats
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      sortResults(this.value);
    });
  }
}

// Configuration des écouteurs d'événements pour les filtres
function setupFilterEventListeners() {
  // Filtres de forme
  const formeFilters = document.querySelectorAll('input[value^="comprime"], input[value^="sirop"], input[value^="gelule"], input[value^="injection"]');
  formeFilters.forEach(filter => {
    filter.addEventListener('change', updateFilters);
  });
  
  // Filtres de prix
  const prixFilters = document.querySelectorAll('input[value^="1000"], input[value^="2000"], input[value^="5000"], input[value^="10000"]');
  prixFilters.forEach(filter => {
    filter.addEventListener('change', updateFilters);
  });
  
  // Filtres de disponibilité
  const disponibiliteFilters = document.querySelectorAll('input[value^="disponible"], input[value^="rupture"]');
  disponibiliteFilters.forEach(filter => {
    filter.addEventListener('change', updateFilters);
  });
}

// Mise à jour des filtres
function updateFilters() {
  currentFilters.ville = document.getElementById('villeFilter').value;
  currentFilters.commune = document.getElementById('communeFilter').value;
  currentFilters.forme = getCheckedValues('input[value^="comprime"], input[value^="sirop"], input[value^="gelule"], input[value^="injection"]');
  currentFilters.prix = getCheckedValues('input[value^="1000"], input[value^="2000"], input[value^="5000"], input[value^="10000"]');
  currentFilters.disponibilite = getCheckedValues('input[value^="disponible"], input[value^="rupture"]');
  
  // Appliquer les filtres aux résultats existants
  applyFiltersToResults();
}

// Obtenir les valeurs cochées
function getCheckedValues(selector) {
  const checkboxes = document.querySelectorAll(selector);
  const values = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      values.push(checkbox.value);
    }
  });
  return values;
}

// Recherche rapide
function quickSearch(term) {
  document.getElementById('medicamentSearch').value = term;
  performSearch(term);
}

// Effectuer une recherche
function performSearch(searchTerm) {
  currentSearchTerm = searchTerm;
  
  // Vérifier que la ville est sélectionnée
  if (!currentFilters.ville) {
    showAlert('Veuillez sélectionner une ville pour effectuer la recherche', 'warning');
    return;
  }
  
  // Afficher la section de progression
  showSearchProgress();
  
  // Démarrer le timer de 10 minutes
  startSearchTimer();
  
  // Simuler l'envoi aux pharmacies
  simulatePharmacyNotifications();
  
  // Mettre à jour l'URL
  updateURL(searchTerm);
}

// Simulation des résultats de recherche
function simulateSearchResults(searchTerm) {
  const mockResults = [
    {
      id: 1,
      nom: searchTerm + ' 500mg',
      forme: 'Comprimé',
      pharmacie: 'Pharmacie Centrale',
      ville: 'Abidjan',
      quartier: 'Plateau',
      prix: 750,
      ancienPrix: 850,
      reduction: 12,
      stock: 'En stock',
      quantite: 45,
      note: 4.8,
      avis: 127,
      horaires: 'Ouvert jusqu\'à 18h00'
    },
    {
      id: 2,
      nom: searchTerm + ' 500mg',
      forme: 'Comprimé',
      pharmacie: 'Pharmacie du Marché',
      ville: 'Abidjan',
      quartier: 'Yopougon',
      prix: 800,
      ancienPrix: null,
      reduction: null,
      stock: 'En stock',
      quantite: 23,
      note: 4.6,
      avis: 89,
      horaires: 'Ouvert jusqu\'à 19h00'
    },
    {
      id: 3,
      nom: searchTerm + ' 500mg',
      forme: 'Sirop',
      pharmacie: 'Pharmacie Saint-Jean',
      ville: 'Abidjan',
      quartier: 'Cocody',
      prix: 1200,
      ancienPrix: null,
      reduction: null,
      stock: 'En stock',
      quantite: 12,
      note: 4.9,
      avis: 156,
      horaires: 'Ouvert jusqu\'à 17h30'
    }
  ];
  
  return mockResults;
}

// Affichage des résultats de recherche
function displaySearchResults(results) {
  const resultsSection = document.getElementById('resultsSection');
  const noResultsSection = document.getElementById('noResultsSection');
  const resultsContainer = document.getElementById('resultsContainer');
  const resultsCount = document.getElementById('totalResults');
  
  if (results.length === 0) {
    if (resultsSection) resultsSection.style.display = 'none';
    if (noResultsSection) noResultsSection.style.display = 'block';
    return;
  }
  
  if (noResultsSection) noResultsSection.style.display = 'none';
  if (resultsSection) resultsSection.style.display = 'block';
  
  // Mettre à jour le compteur
  if (resultsCount) {
    resultsCount.textContent = results.length;
  }
  
  // Générer le HTML des résultats
  if (resultsContainer) {
    resultsContainer.innerHTML = results.map(result => generateResultHTML(result)).join('');
  }
  
  // Appliquer les filtres actuels
  applyFiltersToResults();
}

// Génération du HTML pour un résultat
function generateResultHTML(result) {
  const reductionHTML = result.reduction ? `<span class="old-price">${result.ancienPrix} FCFA</span><span class="discount">-${result.reduction}%</span>` : '';
  
  return `
    <div class="result-card" data-id="${result.id}" data-ville="${result.ville}" data-forme="${result.forme}" data-prix="${result.prix}" data-stock="${result.stock}">
      <div class="result-header">
        <div class="result-title">
          <h5 class="medicament-name">${result.nom}</h5>
          <span class="medicament-form">${result.forme}</span>
        </div>
        <div class="result-actions">
          <button class="btn btn-sm btn-outline-success" onclick="toggleFavorite(this)">
            <i class="far fa-heart"></i>
          </button>
          <button class="btn btn-sm btn-outline-primary" onclick="shareResult(this)">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
      
      <div class="result-content">
        <div class="result-info">
          <div class="info-item">
            <i class="fas fa-building text-muted"></i>
            <span>${result.pharmacie}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt text-muted"></i>
            <span>${result.quartier}, ${result.ville}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-clock text-muted"></i>
            <span>${result.horaires}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-star text-warning"></i>
            <span>${result.note}/5 (${result.avis} avis)</span>
          </div>
        </div>
        
        <div class="result-pricing">
          <div class="price-info">
            <span class="current-price">${result.prix} FCFA</span>
            ${reductionHTML}
          </div>
          <div class="stock-info">
            <span class="stock-status ${result.stock === 'En stock' ? 'available' : 'unavailable'}">${result.stock}</span>
            <small class="stock-quantity">Quantité: ${result.quantite}</small>
          </div>
        </div>
      </div>
      
      <div class="result-footer">
        <button class="btn btn-success" onclick="contactPharmacy('${result.pharmacie.toLowerCase().replace(/\s+/g, '-')}')">
          <i class="fas fa-phone me-2"></i>
          Contacter
        </button>
        <button class="btn btn-outline-success" onclick="getDirections('${result.pharmacie.toLowerCase().replace(/\s+/g, '-')}')">
          <i class="fas fa-directions me-2"></i>
          Itinéraire
        </button>
        <button class="btn btn-outline-primary" onclick="setNotification('${result.nom.toLowerCase().replace(/\s+/g, '-')}')">
          <i class="fas fa-bell me-2"></i>
          Alerte stock
        </button>
      </div>
    </div>
  `;
}

// Application des filtres aux résultats
function applyFiltersToResults() {
  const resultCards = document.querySelectorAll('.result-card');
  let visibleCount = 0;
  
  resultCards.forEach(card => {
    const ville = card.dataset.ville;
    const forme = card.dataset.forme;
    const prix = parseInt(card.dataset.prix);
    const stock = card.dataset.stock;
    
    let shouldShow = true;
    
    // Filtre par ville
    if (currentFilters.ville.length > 0 && !currentFilters.ville.includes(ville.toLowerCase())) {
      shouldShow = false;
    }
    
    // Filtre par forme
    if (currentFilters.forme.length > 0 && !currentFilters.forme.includes(forme.toLowerCase())) {
      shouldShow = false;
    }
    
    // Filtre par prix
    if (currentFilters.prix.length > 0) {
      const priceMatch = currentFilters.prix.some(priceFilter => {
        const maxPrice = parseInt(priceFilter);
        return prix <= maxPrice;
      });
      if (!priceMatch) shouldShow = false;
    }
    
    // Filtre par disponibilité
    if (currentFilters.disponibilite.length > 0) {
      const stockStatus = stock === 'En stock' ? 'disponible' : 'rupture';
      if (!currentFilters.disponibilite.includes(stockStatus)) {
        shouldShow = false;
      }
    }
    
    // Afficher/masquer la carte
    card.style.display = shouldShow ? 'block' : 'none';
    if (shouldShow) visibleCount++;
  });
  
  // Mettre à jour le compteur de résultats
  const resultsCount = document.getElementById('totalResults');
  if (resultsCount) {
    resultsCount.textContent = visibleCount;
  }
  
  // Afficher le message "aucun résultat" si nécessaire
  const noResultsSection = document.getElementById('noResultsSection');
  if (visibleCount === 0 && noResultsSection) {
    noResultsSection.style.display = 'block';
  } else if (noResultsSection) {
    noResultsSection.style.display = 'none';
  }
}

// Tri des résultats
function sortResults(sortBy) {
  const resultsContainer = document.getElementById('resultsContainer');
  if (!resultsContainer) return;
  
  const resultCards = Array.from(resultsContainer.querySelectorAll('.result-card'));
  
  resultCards.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseInt(a.dataset.prix) - parseInt(b.dataset.prix);
      case 'price-desc':
        return parseInt(b.dataset.prix) - parseInt(a.dataset.prix);
      case 'rating':
        const ratingA = parseFloat(a.querySelector('.fas.fa-star').parentNode.textContent.split('/')[0]);
        const ratingB = parseFloat(b.querySelector('.fas.fa-star').parentNode.textContent.split('/')[0]);
        return ratingB - ratingA;
      default:
        return 0; // Pertinence (ordre original)
    }
  });
  
  // Réorganiser les cartes dans le DOM
  resultCards.forEach(card => resultsContainer.appendChild(card));
}

// État de chargement
function showLoadingState() {
  const resultsSection = document.getElementById('resultsSection');
  if (resultsSection) {
    resultsSection.style.display = 'block';
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = `
        <div class="text-center py-5">
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
          <p class="mt-3 text-muted">Recherche en cours...</p>
        </div>
      `;
    }
  }
}

function hideLoadingState() {
  // L'état de chargement est remplacé par les résultats
}

// Mise à jour de l'URL
function updateURL(searchTerm) {
  const url = new URL(window.location);
  url.searchParams.set('q', searchTerm);
  window.history.pushState({}, '', url);
}

// Fonctions d'action
function toggleFavorite(button) {
  const icon = button.querySelector('i');
  if (icon.classList.contains('far')) {
    icon.classList.remove('far');
    icon.classList.add('fas');
    button.classList.remove('btn-outline-success');
    button.classList.add('btn-success');
    showAlert('Ajouté aux favoris', 'success');
  } else {
    icon.classList.remove('fas');
    icon.classList.add('far');
    button.classList.remove('btn-success');
    button.classList.add('btn-outline-success');
    showAlert('Retiré des favoris', 'info');
  }
}

function shareResult(button) {
  if (navigator.share) {
    navigator.share({
      title: 'Médicament trouvé sur InventPlus',
      text: 'J\'ai trouvé ce médicament sur InventPlus',
      url: window.location.href
    });
  } else {
    // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showAlert('Lien copié dans le presse-papiers', 'success');
    });
  }
}

function contactPharmacy(pharmacyId) {
  showAlert('Fonctionnalité de contact en cours de développement', 'info');
}

function getDirections(pharmacyId) {
  showAlert('Fonctionnalité d\'itinéraire en cours de développement', 'info');
}

function setNotification(medicamentId) {
  showAlert('Alerte de stock configurée', 'success');
}

function clearSearch() {
  document.getElementById('medicamentSearch').value = '';
  const resultsSection = document.getElementById('resultsSection');
  const noResultsSection = document.getElementById('noResultsSection');
  
  if (resultsSection) resultsSection.style.display = 'none';
  if (noResultsSection) noResultsSection.style.display = 'none';
  
  // Réinitialiser les filtres
  resetFilters();
}

function resetFilters() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  currentFilters = {
    ville: [],
    forme: [],
    prix: [],
    disponibilite: []
  };
}

function applyFilters() {
  updateFilters();
  showAlert('Filtres appliqués', 'success');
}

// Affichage des alertes
function showAlert(message, type = 'info') {
  const alertContainer = document.createElement('div');
  alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertContainer.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
  alertContainer.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(alertContainer);
  
  // Auto-suppression après 5 secondes
  setTimeout(() => {
    if (alertContainer.parentNode) {
      alertContainer.remove();
    }
  }, 5000);
}

// Initialisation des filtres
function initializeFilters() {
  // Les filtres sont déjà configurés dans le HTML
  // Cette fonction peut être étendue pour charger des filtres depuis une API
}

// Redirection vers la page de recherche (pour la navbar principale)
function redirectToSearch() {
  const searchInput = document.getElementById('mainSearchInput');
  const searchTerm = searchInput.value.trim();
  
  if (searchTerm) {
    window.location.href = `recherche-medicament.html?q=${encodeURIComponent(searchTerm)}`;
  } else {
    window.location.href = 'recherche-medicament.html';
  }
}

// Fonction pour mettre à jour les communes selon la ville sélectionnée
function updateCommunes() {
  const villeSelect = document.getElementById('villeFilter');
  const communeSelect = document.getElementById('communeFilter');
  const selectedVille = villeSelect.value;
  
  // Réinitialiser et désactiver le select des communes
  communeSelect.innerHTML = '<option value="">Sélectionnez une commune/quartier</option>';
  communeSelect.disabled = true;
  
  if (selectedVille && villesCommunes[selectedVille]) {
    // Activer le select des communes
    communeSelect.disabled = false;
    
    // Ajouter les communes de la ville sélectionnée
    villesCommunes[selectedVille].forEach(commune => {
      const option = document.createElement('option');
      option.value = commune.toLowerCase().replace(/\s+/g, '-');
      option.textContent = commune;
      communeSelect.appendChild(option);
    });
  }
  
  // Mettre à jour les filtres
  updateFilters();
}

// Afficher la section de progression de recherche
function showSearchProgress() {
  const searchProgressSection = document.getElementById('searchProgressSection');
  const resultsSection = document.getElementById('resultsSection');
  const noResultsSection = document.getElementById('noResultsSection');
  
  if (searchProgressSection) searchProgressSection.style.display = 'block';
  if (resultsSection) resultsSection.style.display = 'none';
  if (noResultsSection) noResultsSection.style.display = 'none';
  
  // Réinitialiser le timer
  timeRemaining = 600;
  updateTimerDisplay();
}

// Démarrer le timer de recherche
function startSearchTimer() {
  if (searchTimer) {
    clearInterval(searchTimer);
  }
  
  searchTimer = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    updateProgressBar();
    
    if (timeRemaining <= 0) {
      clearInterval(searchTimer);
      handleSearchTimeout();
    }
  }, 1000);
}

// Mettre à jour l'affichage du timer
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const minutesElement = document.querySelector('.timer-countdown .minutes');
  const secondsElement = document.querySelector('.timer-countdown .seconds');
  
  if (minutesElement && secondsElement) {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
  }
}

// Mettre à jour la barre de progression
function updateProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    const progress = (timeRemaining / 600) * 100;
    progressBar.style.width = progress + '%';
    
    // Changer la couleur selon le temps restant
    if (timeRemaining <= 60) {
      progressBar.className = 'progress-bar bg-danger';
    } else if (timeRemaining <= 300) {
      progressBar.className = 'progress-bar bg-warning';
    } else {
      progressBar.className = 'progress-bar bg-success';
    }
  }
}

// Gérer l'expiration du temps de recherche
function handleSearchTimeout() {
  const statusMessages = document.getElementById('statusMessages');
  if (statusMessages) {
    statusMessages.innerHTML = `
      <div class="status-item">
        <i class="fas fa-exclamation-triangle text-warning me-2"></i>
        <span>Temps écoulé. Aucune pharmacie n'a répondu dans les 10 minutes.</span>
      </div>
      <div class="status-item">
        <i class="fas fa-info-circle text-info me-2"></i>
        <span>Vous pouvez relancer une nouvelle recherche ou essayer avec d'autres critères.</span>
      </div>
    `;
  }
  
  // Afficher un bouton pour relancer la recherche
  const searchProgressContainer = document.querySelector('.search-progress-container');
  if (searchProgressContainer) {
    const retryButton = document.createElement('div');
    retryButton.className = 'text-center mt-4';
    retryButton.innerHTML = `
      <button class="btn btn-success btn-lg" onclick="retrySearch()">
        <i class="fas fa-redo me-2"></i>Relancer la recherche
      </button>
    `;
    searchProgressContainer.appendChild(retryButton);
  }
}

// Simuler les notifications aux pharmacies
function simulatePharmacyNotifications() {
  const statusMessages = document.getElementById('statusMessages');
  if (!statusMessages) return;
  
  // Ajouter des messages de statut progressifs
  setTimeout(() => {
    addStatusMessage('Recherche en cours dans votre zone géographique...', 'info');
  }, 1000);
  
  setTimeout(() => {
    addStatusMessage('Notifications envoyées aux pharmacies partenaires', 'success');
  }, 3000);
  
  setTimeout(() => {
    addStatusMessage('En attente de réponse des pharmacies...', 'info');
  }, 5000);
  
  // Simuler une réponse de pharmacie après 5-8 minutes
  const responseTime = Math.random() * 180 + 300; // Entre 5 et 8 minutes
  setTimeout(() => {
    if (timeRemaining > 0) {
      simulatePharmacyResponse();
    }
  }, responseTime * 1000);
}

// Ajouter un message de statut
function addStatusMessage(message, type = 'info') {
  const statusMessages = document.getElementById('statusMessages');
  if (!statusMessages) return;
  
  const statusItem = document.createElement('div');
  statusItem.className = `status-item ${type === 'success' ? 'bg-success bg-opacity-10' : 'bg-info bg-opacity-10'}`;
  statusItem.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle text-success' : 'info-circle text-info'} me-2"></i>
    <span>${message}</span>
  `;
  
  statusMessages.appendChild(statusItem);
}

// Simuler une réponse de pharmacie
function simulatePharmacyResponse() {
  clearInterval(searchTimer);
  
  addStatusMessage('Pharmacie trouvée ! Vérification de la disponibilité...', 'success');
  
  setTimeout(() => {
    addStatusMessage('Médicament disponible ! Affichage des résultats...', 'success');
    
    // Afficher les résultats
    const results = simulateSearchResults(currentSearchTerm);
    displaySearchResults(results);
    
    // Masquer la section de progression
    const searchProgressSection = document.getElementById('searchProgressSection');
    if (searchProgressSection) {
      searchProgressSection.style.display = 'none';
    }
  }, 2000);
}

// Relancer la recherche
function retrySearch() {
  // Masquer la section de progression
  const searchProgressSection = document.getElementById('searchProgressSection');
  if (searchProgressSection) {
    searchProgressSection.style.display = 'none';
  }
  
  // Réinitialiser le formulaire
  document.getElementById('medicamentSearchForm').reset();
  document.getElementById('communeFilter').innerHTML = '<option value="">Sélectionnez d\'abord une ville</option>';
  document.getElementById('communeFilter').disabled = true;
  
  // Réinitialiser les filtres
  currentFilters = {
    ville: '',
    commune: '',
    forme: [],
    prix: [],
    disponibilite: []
  };
}

// Export des fonctions pour utilisation globale
window.medicamentSearch = {
  performSearch,
  quickSearch,
  toggleFavorite,
  shareResult,
  contactPharmacy,
  getDirections,
  setNotification,
  clearSearch,
  applyFilters,
  redirectToSearch,
  updateCommunes,
  retrySearch
};

