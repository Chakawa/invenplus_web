/**
 * Données des Villes et Communes de Côte d'Ivoire - InventPlus
 * Base de données complète des villes et communes ivoiriennes
 */

const COTE_DIVOIRE_CITIES = {
    // District d'Abidjan
    'abidjan': {
        name: 'Abidjan',
        region: 'District d\'Abidjan',
        communes: [
            'Plateau', 'Cocody', 'Yopougon', 'Marcory', 'Treichville', 
            'Adjamé', 'Abobo', 'Port-Bouët', 'Koumassi', 'Bingerville', 
            'Songon', 'Anyama', 'Attécoubé', 'Brofodoumé'
        ]
    },

    // District de Yamoussoukro
    'yamoussoukro': {
        name: 'Yamoussoukro',
        region: 'District de Yamoussoukro',
        communes: [
            'Centre-ville', 'Kossou', 'Tiébissou', 'Attiégouakro', 
            'Lolobo', 'N\'Gokro', 'Diabo'
        ]
    },

    // Région du Gbêkê
    'bouake': {
        name: 'Bouaké',
        region: 'Gbêkê',
        communes: [
            'Centre-ville', 'Air France', 'Brobo', 'Sakassou', 
            'Béoumi', 'Botro', 'Kondrobo', 'Mamini'
        ]
    },

    // Région du Bas-Sassandra
    'san-pedro': {
        name: 'San-Pédro',
        region: 'Bas-Sassandra',
        communes: [
            'Centre-ville', 'Grand-Béréby', 'Tabou', 'Sassandra',
            'Soubré', 'Méagui', 'Gabiadji'
        ]
    },

    // Région du Poro
    'korhogo': {
        name: 'Korhogo',
        region: 'Poro',
        communes: [
            'Centre-ville', 'Ferkessédougou', 'Boundiali', 'Sinématiali',
            'Dikodougou', 'Karakoro', 'Lataha'
        ]
    },

    // Région du Tonkpi
    'man': {
        name: 'Man',
        region: 'Tonkpi',
        communes: [
            'Centre-ville', 'Danané', 'Zouan-Hounien', 'Biankouma',
            'Sipilou', 'Logoualé', 'Sandougou-Soba'
        ]
    },

    // Région du Gôh
    'gagnoa': {
        name: 'Gagnoa',
        region: 'Gôh',
        communes: [
            'Centre-ville', 'Oumé', 'Sinfra', 'Issia',
            'Bayota', 'Dignago', 'Guibéroua'
        ]
    },

    // Région du Haut-Sassandra
    'daloa': {
        name: 'Daloa',
        region: 'Haut-Sassandra',
        communes: [
            'Centre-ville', 'Vavoua', 'Zoukougbeu', 'Gadouan',
            'Bédiala', 'Zaguiéta'
        ]
    },

    // Région de l'Agnéby-Tiassa
    'agboville': {
        name: 'Agboville',
        region: 'Agnéby-Tiassa',
        communes: [
            'Centre-ville', 'Adzopé', 'Akoupé', 'Afféry',
            'Céchi', 'Rubino', 'Yakassé-Attobrou'
        ]
    },

    'dabou': {
        name: 'Dabou',
        region: 'Agnéby-Tiassa',
        communes: [
            'Centre-ville', 'Jacqueville', 'Grand-Lahou',
            'Toupah', 'Cosrou-Bodoukou'
        ]
    },

    // Région du N'zi
    'dimbokro': {
        name: 'Dimbokro',
        region: 'N\'zi',
        communes: [
            'Centre-ville', 'Bocanda', 'Daoukro', 'M\'Bahiakro',
            'Ettrokro', 'Ananda'
        ]
    },

    // Région du Gontougo
    'bondoukou': {
        name: 'Bondoukou',
        region: 'Gontougo',
        communes: [
            'Centre-ville', 'Tanda', 'Bouna', 'Transua',
            'Gouméré', 'Laoudi-Ba', 'Tagadi'
        ]
    },

    // Région de l'Indénié-Djuablin
    'abengourou': {
        name: 'Abengourou',
        region: 'Indénié-Djuablin',
        communes: [
            'Centre-ville', 'Agnibilékrou', 'Bettie', 'M\'Batto',
            'Niablé', 'Yakassé-Féyassé', 'Zaranou'
        ]
    },

    // Région du Sud-Comoé
    'grand-bassam': {
        name: 'Grand-Bassam',
        region: 'Sud-Comoé',
        communes: [
            'Centre-ville', 'Moossou', 'Bracodi', 'Vridi',
            'Bonoua', 'Alépé', 'Adiaké'
        ]
    },

    'assinie': {
        name: 'Assinie',
        region: 'Sud-Comoé',
        communes: [
            'Centre-ville', 'Mafia', 'M\'Bokro', 'Adjin',
            'Etuéboué', 'Nouamou'
        ]
    },

    // Région du Lôh-Djiboua
    'divo': {
        name: 'Divo',
        region: 'Lôh-Djiboua',
        communes: [
            'Centre-ville', 'Fresco', 'Lakota', 'Guitry',
            'Zéprégühé', 'Hiré'
        ]
    },

    // Région de la Marahoué
    'bouafle': {
        name: 'Bouaflé',
        region: 'Marahoué',
        communes: [
            'Centre-ville', 'Sinfra', 'Zuénoula', 'Bonon',
            'Kanzra', 'Gohitafla'
        ]
    },

    // Région du Bélier
    'toumodi': {
        name: 'Toumodi',
        region: 'Bélier',
        communes: [
            'Centre-ville', 'Djébonoua', 'Kotobi', 'Anoumaba',
            'Angoda', 'Diégonéfla'
        ]
    },

    // Région de l'Iffou
    'mbahiakro': {
        name: 'M\'Bahiakro',
        region: 'Iffou',
        communes: [
            'Centre-ville', 'Prikro', 'Famienkro', 'Koffi-Amonkro'
        ]
    },

    // Région du Moronou
    'arrah': {
        name: 'Arrah',
        region: 'Moronou',
        communes: [
            'Centre-ville', 'Bongouanou', 'M\'Batto', 'Tiémélékro'
        ]
    },

    // Région du Kabadougou
    'odienne': {
        name: 'Odienné',
        region: 'Kabadougou',
        communes: [
            'Centre-ville', 'Gbéléban', 'Kimbirila-Nord', 'Madinani',
            'Samatiguila', 'Séguélon'
        ]
    },

    // Région du Tchologo
    'ferkessedougou': {
        name: 'Ferkessédougou',
        region: 'Tchologo',
        communes: [
            'Centre-ville', 'Kong', 'Ouangolodougou', 'Togoniéré'
        ]
    },

    // Région du Hambol
    'katiola': {
        name: 'Katiola',
        region: 'Hambol',
        communes: [
            'Centre-ville', 'Dabakala', 'Niakaramandougou', 'Fronan'
        ]
    },

    // Région du Worodougou
    'seguela': {
        name: 'Séguéla',
        region: 'Worodougou',
        communes: [
            'Centre-ville', 'Kani', 'Massala', 'Bobi-Dioulasso'
        ]
    },

    // Région du Bafing
    'touba': {
        name: 'Touba',
        region: 'Bafing',
        communes: [
            'Centre-ville', 'Koro', 'Ouaninou', 'Guintéguéla'
        ]
    },

    // Région du Folon
    'minignan': {
        name: 'Minignan',
        region: 'Folon',
        communes: [
            'Centre-ville', 'Kaniasso', 'Tienko', 'Booko'
        ]
    },

    // Région du Cavally
    'guiglo': {
        name: 'Guiglo',
        region: 'Cavally',
        communes: [
            'Centre-ville', 'Blolequin', 'Toulepleu', 'Taï',
            'Grabo', 'Djiroutou'
        ]
    },

    // Région du Guémon
    'duekoue': {
        name: 'Duékoué',
        region: 'Guémon',
        communes: [
            'Centre-ville', 'Bangolo', 'Facobly', 'Guézon'
        ]
    },

    // Région de la Nawa
    'soubre': {
        name: 'Soubré',
        region: 'Nawa',
        communes: [
            'Centre-ville', 'Buyo', 'Gueyo', 'Lauzoua',
            'Okrouyo', 'Grand-Zattry'
        ]
    }
};

// Fonction pour obtenir toutes les villes
function getAllCities() {
    return Object.keys(COTE_DIVOIRE_CITIES).map(key => ({
        value: key,
        name: COTE_DIVOIRE_CITIES[key].name,
        region: COTE_DIVOIRE_CITIES[key].region
    }));
}

// Fonction pour obtenir les communes d'une ville
function getCommunesByCity(cityKey) {
    return COTE_DIVOIRE_CITIES[cityKey] ? COTE_DIVOIRE_CITIES[cityKey].communes : [];
}

// Fonction pour rechercher une ville par nom
function findCityByName(cityName) {
    const cityKey = Object.keys(COTE_DIVOIRE_CITIES).find(key => 
        COTE_DIVOIRE_CITIES[key].name.toLowerCase() === cityName.toLowerCase()
    );
    return cityKey ? COTE_DIVOIRE_CITIES[cityKey] : null;
}

// Export pour utilisation globale
window.COTE_DIVOIRE_CITIES = COTE_DIVOIRE_CITIES;
window.getAllCities = getAllCities;
window.getCommunesByCity = getCommunesByCity;
window.findCityByName = findCityByName;