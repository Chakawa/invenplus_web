/**
 * Client Dashboard - InventPlus
 * Gestion du tableau de bord client avec toutes les fonctionnalités
 */

class ClientDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadDashboardData();
        this.initRealTimeUpdates();
        this.animateStatistics();
    }

    initEventListeners() {
        // Gestion des notifications
        document.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => this.handleNotificationClick(item));
        });

        // Gestion des actions rapides
        document.querySelectorAll('.quick-action-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleQuickAction(e, item));
        });

        // Gestion des médicaments favoris
        document.querySelectorAll('.favorite-medication .btn-outline-danger').forEach(btn => {
            btn.addEventListener('click', (e) => this.removeFavorite(e));
        });

        // Gestion des recherches récentes
        document.querySelectorAll('.search-item').forEach(item => {
            item.addEventListener('click', () => this.viewSearchDetails(item));
        });

        // Gestion du menu utilisateur
        const userMenu = document.querySelector('.dropdown-toggle');
        if (userMenu) {
            userMenu.addEventListener('click', () => this.toggleUserMenu());
        }
    }

    loadDashboardData() {
        // Charger les données du tableau de bord
        this.loadUserProfile();
        this.loadSearchHistory();
        this.loadFavoriteMedications();
        this.loadNotifications();
        this.updateStatistics();
    }

    loadUserProfile() {
        // Simuler le chargement du profil utilisateur
        const userName = localStorage.getItem('userName') || 'Jean Dupont';
        const userAvatar = document.querySelector('.welcome-avatar i');
        
        if (userAvatar) {
            userAvatar.parentElement.setAttribute('data-user', userName);
        }

        // Mettre à jour le nom dans le menu utilisateur
        const userMenuText = document.querySelector('.dropdown-toggle');
        if (userMenuText) {
            userMenuText.innerHTML = `<i class="fas fa-user-circle me-2"></i>${userName}`;
        }
    }

    loadSearchHistory() {
        // Simuler l'historique des recherches
        const searchHistory = [
            {
                medication: 'Paracétamol 500mg',
                location: 'Abidjan, Cocody',
                status: 'success',
                pharmacy: 'Pharmacie Centrale',
                price: '500 FCFA',
                date: 'Il y a 2 heures'
            },
            {
                medication: 'Amoxicilline 1g',
                location: 'Abidjan, Plateau',
                status: 'warning',
                pharmacy: 'En cours...',
                price: '--',
                date: 'Il y a 1 jour'
            },
            {
                medication: 'Vitamine C 1000mg',
                location: 'Abidjan, Yopougon',
                status: 'danger',
                pharmacy: 'Aucune réponse',
                price: '--',
                date: 'Il y a 2 jours'
            }
        ];

        this.renderSearchHistory(searchHistory);
    }

    renderSearchHistory(history) {
        const container = document.querySelector('.search-history');
        if (!container) return;

        container.innerHTML = history.map(item => `
            <div class="search-item" data-medication="${item.medication}">
                <div class="search-info">
                    <h6 class="medication-name">${item.medication}</h6>
                    <p class="search-details">
                        <i class="fas fa-map-marker-alt text-muted me-2"></i>
                        ${item.location}
                    </p>
                    <span class="search-date">${item.date}</span>
                </div>
                <div class="search-status">
                    <span class="badge bg-${item.status === 'success' ? 'success' : item.status === 'warning' ? 'warning' : 'danger'}">
                        ${item.status === 'success' ? 'Disponible' : item.status === 'warning' ? 'En attente' : 'Non disponible'}
                    </span>
                    <p class="pharmacy-name">${item.pharmacy}</p>
                    <p class="${item.price === '--' ? 'expired' : 'price'}">${item.price}</p>
                </div>
            </div>
        `).join('');

        // Réattacher les événements
        this.initEventListeners();
    }

    loadFavoriteMedications() {
        // Simuler les médicaments favoris
        const favorites = [
            {
                name: 'Paracétamol 500mg',
                lastPrice: '500 FCFA',
                availability: 'Disponible à 3 pharmacies',
                status: 'success'
            },
            {
                name: 'Vitamine C 1000mg',
                lastPrice: '800 FCFA',
                availability: 'Disponible à 1 pharmacie',
                status: 'warning'
            },
            {
                name: 'Ibuprofène 400mg',
                lastPrice: '600 FCFA',
                availability: 'Disponible à 5 pharmacies',
                status: 'success'
            }
        ];

        this.renderFavoriteMedications(favorites);
    }

    renderFavoriteMedications(favorites) {
        const container = document.querySelector('.favorite-medication');
        if (!container) return;

        const parent = container.parentElement.parentElement;
        parent.innerHTML = favorites.map(item => `
            <div class="col-md-4 mb-3">
                <div class="favorite-medication">
                    <div class="medication-icon">
                        <i class="fas fa-pills"></i>
                    </div>
                    <div class="medication-info">
                        <h6>${item.name}</h6>
                        <p class="text-muted">Dernier prix: ${item.lastPrice}</p>
                        <small class="text-${item.status}">${item.availability}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="this.removeFavorite(this)">
                        <i class="fas fa-heart-broken"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadNotifications() {
        // Simuler les notifications
        const notifications = [
            {
                type: 'success',
                title: 'Médicament disponible',
                message: 'Paracétamol trouvé à la Pharmacie Centrale',
                time: 'Il y a 2 heures',
                icon: 'fas fa-check'
            },
            {
                type: 'info',
                title: 'Mise à jour des prix',
                message: 'Nouveaux prix disponibles dans votre zone',
                time: 'Il y a 1 jour',
                icon: 'fas fa-info'
            },
            {
                type: 'warning',
                title: 'Recherche en cours',
                message: 'Amoxicilline en cours de vérification',
                time: 'Il y a 1 jour',
                icon: 'fas fa-clock'
            }
        ];

        this.renderNotifications(notifications);
    }

    renderNotifications(notifications) {
        const container = document.querySelector('.notifications-list');
        if (!container) return;

        container.innerHTML = notifications.map(item => `
            <div class="notification-item" data-type="${item.type}">
                <div class="notification-icon bg-${item.type}">
                    <i class="${item.icon}"></i>
                </div>
                <div class="notification-content">
                    <h6>${item.title}</h6>
                    <p>${item.message}</p>
                    <small class="text-muted">${item.time}</small>
                </div>
            </div>
        `).join('');
    }

    updateStatistics() {
        // Mettre à jour les statistiques
        const stats = {
            searches: 24,
            found: 18,
            pending: 6,
            pharmacies: 8
        };

        Object.keys(stats).forEach(key => {
            const element = document.querySelector(`[data-stat="${key}"]`);
            if (element) {
                this.animateNumber(element, stats[key]);
            }
        });
    }

    animateStatistics() {
        // Animer les statistiques au chargement
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (target) {
                this.animateNumber(stat, target);
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
            element.textContent = Math.floor(current);
        }, 30);
    }

    handleNotificationClick(notification) {
        const type = notification.getAttribute('data-type');
        const title = notification.querySelector('h6').textContent;
        
        // Afficher une notification toast
        if (window.showToast) {
            window.showToast(`Notification: ${title}`, type);
        } else {
            alert(`Notification: ${title}`);
        }

        // Marquer comme lue
        notification.classList.add('read');
    }

    handleQuickAction(event, item) {
        event.preventDefault();
        const action = item.querySelector('h6').textContent;
        
        if (action === 'Nouvelle Recherche') {
            window.location.href = '../pages/recherche-medicament.html';
        } else if (action === 'Pharmacies Proches') {
            this.showNearbyPharmacies();
        } else if (action === 'Favoris') {
            this.showFavorites();
        } else if (action === 'Paramètres') {
            this.showSettings();
        }
    }

    removeFavorite(event) {
        const button = event.target.closest('button');
        const medicationCard = button.closest('.favorite-medication');
        
        if (medicationCard) {
            medicationCard.style.opacity = '0.5';
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.className = 'btn btn-sm btn-success';
            button.disabled = true;
            
            // Afficher une notification
            if (window.showToast) {
                window.showToast('Médicament retiré des favoris', 'success');
            }
            
            // Supprimer après animation
            setTimeout(() => {
                medicationCard.remove();
            }, 500);
        }
    }

    viewSearchDetails(searchItem) {
        const medication = searchItem.querySelector('.medication-name').textContent;
        const status = searchItem.querySelector('.badge').textContent;
        
        // Afficher les détails de la recherche
        if (window.showToast) {
            window.showToast(`Détails de la recherche: ${medication}`, 'info');
        }
        
        // Ici on pourrait ouvrir un modal avec plus de détails
        console.log(`Voir détails pour: ${medication} - Statut: ${status}`);
    }

    showNearbyPharmacies() {
        // Simuler l'affichage des pharmacies proches
        if (window.showToast) {
            window.showToast('Chargement des pharmacies proches...', 'info');
        }
        
        // Ici on pourrait ouvrir un modal ou rediriger vers une page
        console.log('Afficher les pharmacies proches');
    }

    showFavorites() {
        // Simuler l'affichage des favoris
        if (window.showToast) {
            window.showToast('Affichage des médicaments favoris', 'info');
        }
        
        // Ici on pourrait ouvrir un modal ou rediriger vers une page
        console.log('Afficher les favoris');
    }

    showSettings() {
        // Simuler l'affichage des paramètres
        if (window.showToast) {
            window.showToast('Ouverture des paramètres', 'info');
        }
        
        // Ici on pourrait ouvrir un modal ou rediriger vers une page
        console.log('Afficher les paramètres');
    }

    toggleUserMenu() {
        // Gestion du menu utilisateur
        console.log('Menu utilisateur basculé');
    }

    initRealTimeUpdates() {
        // Simuler les mises à jour en temps réel
        setInterval(() => {
            this.checkNewNotifications();
            this.updateSearchTimers();
        }, 30000); // Vérifier toutes les 30 secondes
    }

    checkNewNotifications() {
        // Simuler la vérification de nouvelles notifications
        const hasNewNotifications = Math.random() > 0.7;
        
        if (hasNewNotifications) {
            this.addNewNotification();
        }
    }

    addNewNotification() {
        const notificationsList = document.querySelector('.notifications-list');
        if (!notificationsList) return;

        const newNotification = document.createElement('div');
        newNotification.className = 'notification-item new-notification';
        newNotification.setAttribute('data-type', 'info');
        newNotification.innerHTML = `
            <div class="notification-icon bg-info">
                <i class="fas fa-info"></i>
            </div>
            <div class="notification-content">
                <h6>Nouvelle notification</h6>
                <p>Mise à jour des informations</p>
                <small class="text-muted">À l'instant</small>
            </div>
        `;

        notificationsList.insertBefore(newNotification, notificationsList.firstChild);
        
        // Mettre à jour le compteur de notifications
        this.updateNotificationCount();
        
        // Supprimer après 5 secondes
        setTimeout(() => {
            if (newNotification.parentNode) {
                newNotification.remove();
                this.updateNotificationCount();
            }
        }, 5000);
    }

    updateNotificationCount() {
        const badge = document.querySelector('.position-absolute.badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent);
            const newCount = Math.max(0, currentCount + 1);
            badge.textContent = newCount;
        }
    }

    updateSearchTimers() {
        // Mettre à jour les timers des recherches en cours
        const timers = document.querySelectorAll('.timer');
        timers.forEach(timer => {
            if (timer.textContent.includes('Expire dans')) {
                // Simuler la mise à jour du timer
                const currentTime = timer.textContent.match(/(\d+):(\d+)/);
                if (currentTime) {
                    let minutes = parseInt(currentTime[1]);
                    let seconds = parseInt(currentTime[2]);
                    
                    if (seconds > 0) {
                        seconds--;
                    } else if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        // Timer expiré
                        timer.textContent = 'Expiré';
                        timer.className = 'expired';
                        timer.closest('.search-item').querySelector('.badge').className = 'badge bg-danger';
                        timer.closest('.search-item').querySelector('.badge').textContent = 'Non disponible';
                    }
                    
                    if (minutes > 0 || seconds > 0) {
                        timer.textContent = `Expire dans ${minutes}:${seconds.toString().padStart(2, '0')}`;
                    }
                }
            }
        });
    }
}

// Fonctions globales pour les interactions
window.removeFavorite = function(button) {
    const dashboard = window.clientDashboard;
    if (dashboard) {
        dashboard.removeFavorite({ target: button });
    }
};

// Initialisation du tableau de bord
document.addEventListener('DOMContentLoaded', function() {
    window.clientDashboard = new ClientDashboard();
});

// Export pour utilisation externe
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClientDashboard;
}

