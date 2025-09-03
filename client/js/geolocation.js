/**
 * Géolocalisation et Services de Localisation - InventPlus
 * Gestion de la géolocalisation automatique et des services de proximité
 */

class GeolocationService {
    constructor() {
        this.userPosition = null;
        this.nearbyPharmacies = [];
        this.guardPharmacies = [];
        this.init();
    }

    init() {
        this.requestGeolocation();
        this.loadGuardPharmacies();
    }

    requestGeolocation() {
        if (navigator.geolocation) {
            // Afficher un indicateur de chargement
            this.showLocationStatus('Localisation en cours...', 'info');
            
            navigator.geolocation.getCurrentPosition(
                (position) => this.onLocationSuccess(position),
                (error) => this.onLocationError(error),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        } else {
            this.showLocationStatus('Géolocalisation non supportée', 'error');
        }
    }

    onLocationSuccess(position) {
        this.userPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        };

        // Obtenir l'adresse à partir des coordonnées
        this.reverseGeocode(position.coords.latitude, position.coords.longitude);
        
        // Charger les pharmacies proches
        this.loadNearbyPharmacies();
        
        // Afficher le bouton des pharmacies proches
        this.showNearbyPharmaciesButton();
        
        this.showLocationStatus('Position trouvée avec succès', 'success');
    }

    onLocationError(error) {
        let message = '';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = 'Géolocalisation refusée. Vous pouvez sélectionner votre ville manuellement.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Position indisponible. Sélectionnez votre ville manuellement.';
                break;
            case error.TIMEOUT:
                message = 'Délai de géolocalisation dépassé. Sélectionnez votre ville manuellement.';
                break;
            default:
                message = 'Erreur de géolocalisation. Sélectionnez votre ville manuellement.';
                break;
        }
        this.showLocationStatus(message, 'warning');
    }

    reverseGeocode(lat, lng) {
        // Simulation de géocodage inverse pour la Côte d'Ivoire
        // Dans une vraie application, vous utiliseriez une API comme Google Maps
        const mockLocation = this.getMockLocationFromCoords(lat, lng);
        
        // Mettre à jour l'interface avec la localisation
        this.updateLocationDisplay(mockLocation);
    }

    getMockLocationFromCoords(lat, lng) {
        // Simulation basée sur les coordonnées approximatives des villes ivoiriennes
        const cities = [
            { name: 'Abidjan', lat: 5.3364, lng: -4.0267, communes: ['Plateau', 'Cocody', 'Yopougon'] },
            { name: 'Bouaké', lat: 7.6906, lng: -5.0300, communes: ['Centre-ville', 'Air France'] },
            { name: 'Yamoussoukro', lat: 6.8276, lng: -5.2893, communes: ['Centre-ville', 'Kossou'] }
        ];

        // Trouver la ville la plus proche
        let closestCity = cities[0];
        let minDistance = this.calculateDistance(lat, lng, cities[0].lat, cities[0].lng);

        cities.forEach(city => {
            const distance = this.calculateDistance(lat, lng, city.lat, city.lng);
            if (distance < minDistance) {
                minDistance = distance;
                closestCity = city;
            }
        });

        return {
            city: closestCity.name,
            commune: closestCity.communes[0],
            distance: Math.round(minDistance * 100) / 100
        };
    }

    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Rayon de la Terre en km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLng = this.deg2rad(lng2 - lng1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    deg2rad(deg) {
        return deg * (Math.PI/180);
    }

    updateLocationDisplay(location) {
        // Mettre à jour l'affichage de la localisation
        const locationDisplay = document.getElementById('currentLocation');
        if (locationDisplay) {
            locationDisplay.innerHTML = `
                <i class="fas fa-map-marker-alt text-success me-2"></i>
                <span class="fw-bold">${location.city}</span>
                <small class="text-muted ms-2">${location.commune}</small>
            `;
        }

        // Pré-sélectionner la ville dans le formulaire
        const villeSelect = document.getElementById('villeFilter');
        if (villeSelect) {
            villeSelect.value = location.city.toLowerCase();
            if (window.updateCommunes) {
                window.updateCommunes();
            }
        }
    }

    loadNearbyPharmacies() {
        // Simuler le chargement des pharmacies proches
        this.nearbyPharmacies = [
            {
                id: 1,
                name: 'Pharmacie Centrale',
                address: 'Boulevard de la République, Plateau',
                distance: 0.8,
                isOpen: true,
                isGuard: false,
                phone: '+225 01 23 45 67 89',
                coordinates: { lat: 5.3364, lng: -4.0267 }
            },
            {
                id: 2,
                name: 'Pharmacie Moderne',
                address: 'Rue des Jardins, Cocody',
                distance: 1.2,
                isOpen: true,
                isGuard: true,
                phone: '+225 01 23 45 67 90',
                coordinates: { lat: 5.3464, lng: -4.0167 }
            },
            {
                id: 3,
                name: 'Pharmacie Express',
                address: 'Avenue Chardy, Yopougon',
                distance: 2.1,
                isOpen: false,
                isGuard: true,
                phone: '+225 01 23 45 67 91',
                coordinates: { lat: 5.3264, lng: -4.0367 }
            }
        ];
    }

    loadGuardPharmacies() {
        // Charger les pharmacies de garde
        this.guardPharmacies = this.nearbyPharmacies.filter(pharmacy => pharmacy.isGuard);
    }

    showNearbyPharmaciesButton() {
        // Afficher le bouton des pharmacies proches
        const container = document.querySelector('.hero .container .row .col-lg-6');
        if (container && !document.getElementById('nearbyPharmaciesBtn')) {
            const buttonHTML = `
                <div class="mt-4" id="nearbyPharmaciesBtn">
                    <button class="btn btn-outline-success btn-lg me-3" onclick="geolocationService.showNearbyPharmacies()">
                        <i class="fas fa-map-marked-alt me-2"></i>
                        Pharmacies Proches
                    </button>
                    <button class="btn btn-warning btn-lg" onclick="geolocationService.showGuardPharmacies()">
                        <i class="fas fa-shield-alt me-2"></i>
                        Pharmacies de Garde
                    </button>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', buttonHTML);
        }
    }

    showNearbyPharmacies() {
        this.displayPharmaciesModal(this.nearbyPharmacies, 'Pharmacies Proches');
    }

    showGuardPharmacies() {
        this.displayPharmaciesModal(this.guardPharmacies, 'Pharmacies de Garde');
    }

    displayPharmaciesModal(pharmacies, title) {
        const modalHTML = `
            <div class="modal fade" id="pharmaciesModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-map-marked-alt me-2"></i>
                                ${title}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                ${pharmacies.map(pharmacy => `
                                    <div class="col-md-6 mb-3">
                                        <div class="card h-100 pharmacy-card" data-pharmacy-id="${pharmacy.id}">
                                            <div class="card-body">
                                                <div class="d-flex justify-content-between align-items-start mb-2">
                                                    <h6 class="card-title mb-0">${pharmacy.name}</h6>
                                                    <div class="d-flex gap-1">
                                                        ${pharmacy.isOpen ? '<span class="badge bg-success">Ouvert</span>' : '<span class="badge bg-danger">Fermé</span>'}
                                                        ${pharmacy.isGuard ? '<span class="badge bg-warning text-dark">Garde</span>' : ''}
                                                    </div>
                                                </div>
                                                <p class="card-text text-muted small mb-2">
                                                    <i class="fas fa-map-marker-alt me-1"></i>
                                                    ${pharmacy.address}
                                                </p>
                                                <p class="card-text text-muted small mb-3">
                                                    <i class="fas fa-route me-1"></i>
                                                    À ${pharmacy.distance} km de vous
                                                </p>
                                                <div class="d-flex gap-2">
                                                    <button class="btn btn-success btn-sm flex-fill" onclick="geolocationService.getDirections(${pharmacy.id})">
                                                        <i class="fas fa-directions me-1"></i>
                                                        Itinéraire
                                                    </button>
                                                    <button class="btn btn-outline-primary btn-sm flex-fill" onclick="geolocationService.contactPharmacy(${pharmacy.id})">
                                                        <i class="fas fa-phone me-1"></i>
                                                        Appeler
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="button" class="btn btn-success" onclick="geolocationService.refreshPharmacies()">
                                <i class="fas fa-sync-alt me-2"></i>
                                Actualiser
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Supprimer le modal existant s'il y en a un
        const existingModal = document.getElementById('pharmaciesModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Ajouter le nouveau modal
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Afficher le modal
        const modal = new bootstrap.Modal(document.getElementById('pharmaciesModal'));
        modal.show();
    }

    getDirections(pharmacyId) {
        const pharmacy = this.nearbyPharmacies.find(p => p.id === pharmacyId);
        if (!pharmacy) return;

        if (this.userPosition) {
            // Ouvrir Google Maps avec l'itinéraire
            const origin = `${this.userPosition.latitude},${this.userPosition.longitude}`;
            const destination = `${pharmacy.coordinates.lat},${pharmacy.coordinates.lng}`;
            const mapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
            
            window.open(mapsUrl, '_blank');
            
            this.showLocationStatus(`Itinéraire vers ${pharmacy.name} ouvert`, 'success');
        } else {
            // Fallback : ouvrir juste l'adresse de la pharmacie
            const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(pharmacy.address)}`;
            window.open(mapsUrl, '_blank');
        }
    }

    contactPharmacy(pharmacyId) {
        const pharmacy = this.nearbyPharmacies.find(p => p.id === pharmacyId);
        if (!pharmacy) return;

        // Afficher les options de contact
        const contactModal = `
            <div class="modal fade" id="contactModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-phone me-2"></i>
                                Contacter ${pharmacy.name}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-4">
                                <div class="pharmacy-contact-icon bg-primary text-white rounded-circle mx-auto mb-3">
                                    <i class="fas fa-clinic-medical"></i>
                                </div>
                                <h6>${pharmacy.name}</h6>
                                <p class="text-muted">${pharmacy.address}</p>
                            </div>
                            <div class="d-grid gap-3">
                                <button class="btn btn-success btn-lg" onclick="window.open('tel:${pharmacy.phone}')">
                                    <i class="fas fa-phone me-2"></i>
                                    Appeler maintenant
                                    <small class="d-block">${pharmacy.phone}</small>
                                </button>
                                <button class="btn btn-outline-primary" onclick="geolocationService.sendSMS('${pharmacy.phone}')">
                                    <i class="fas fa-sms me-2"></i>
                                    Envoyer un SMS
                                </button>
                                <button class="btn btn-outline-info" onclick="geolocationService.getDirections(${pharmacy.id})">
                                    <i class="fas fa-directions me-2"></i>
                                    Voir l'itinéraire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Supprimer le modal existant
        const existingModal = document.getElementById('contactModal');
        if (existingModal) existingModal.remove();

        // Ajouter et afficher le nouveau modal
        document.body.insertAdjacentHTML('beforeend', contactModal);
        const modal = new bootstrap.Modal(document.getElementById('contactModal'));
        modal.show();
    }

    sendSMS(phoneNumber) {
        const message = encodeURIComponent('Bonjour, je souhaite me renseigner sur la disponibilité d\'un médicament. Merci.');
        window.open(`sms:${phoneNumber}?body=${message}`);
    }

    refreshPharmacies() {
        this.showLocationStatus('Actualisation des pharmacies...', 'info');
        
        setTimeout(() => {
            this.loadNearbyPharmacies();
            this.showLocationStatus('Pharmacies actualisées', 'success');
            
            // Fermer et rouvrir le modal avec les nouvelles données
            const modal = bootstrap.Modal.getInstance(document.getElementById('pharmaciesModal'));
            if (modal) {
                modal.hide();
                setTimeout(() => this.showNearbyPharmacies(), 300);
            }
        }, 1500);
    }

    showLocationStatus(message, type) {
        if (window.showToast) {
            window.showToast(message, type, 3000);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Méthode pour obtenir la position actuelle (utilisée par d'autres modules)
    getCurrentPosition() {
        return this.userPosition;
    }

    // Méthode pour obtenir les pharmacies proches
    getNearbyPharmacies() {
        return this.nearbyPharmacies;
    }

    // Méthode pour obtenir les pharmacies de garde
    getGuardPharmacies() {
        return this.guardPharmacies;
    }
}

// Style pour l'icône de contact
const contactIconStyle = `
    .pharmacy-contact-icon {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
    }
    
    .pharmacy-card {
        transition: all 0.3s ease;
        border: 1px solid #e9ecef;
    }
    
    .pharmacy-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        border-color: var(--success-color);
    }
`;

// Ajouter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactIconStyle;
document.head.appendChild(styleSheet);

// Initialiser le service de géolocalisation
let geolocationService;
document.addEventListener('DOMContentLoaded', function() {
    geolocationService = new GeolocationService();
});

// Export pour utilisation globale
window.geolocationService = geolocationService;