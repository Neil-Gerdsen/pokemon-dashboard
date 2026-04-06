# Pokémon Zoekpagina - React + Vite Applicatie

Dit project is een React-applicatie gebouwd met Vite die gebruikers in staat stelt om Pokémon-informatie te zoeken, bekijken en de top Pokémon te raadplegen.

## 📋 Inhoudsopgave

- [Installatie](#installatie)
- [Aan de slag](#aan-de-slag)
- [Project Structuur](#project-structuur)
- [Beschrijving van componenten](#beschrijving-van-componenten)
- [Beschikbare Scripts](#beschikbare-scripts)
- [Technologieën Gebruikt](#technologieën-gebruikt)

---

## 🛠️ Installatie

### Vereisten

Zorg ervoor dat je het volgende hebt geïnstalleerd:
- **Node.js** (versie 16 of hoger) - [Download hier](https://nodejs.org/)
- **npm** of **yarn** (komt mee met Node.js)

### Stappenplan

1. **Clone het project** (indien nodig)
   ```bash
   cd "c:/Users/Neil/OneDrive - ROC Nijmegen/roc jaar 2/periode 3/frondend/helloworld"
   ```

2. **Installeer alle dependencies**
   ```bash
   npm install
   ```
   Dit zal alle benodigde pakketten installeren die in `package.json` staan.

3. **Controleer de installatie**
   ```bash
   npm list
   ```

---

## 🚀 Aan de slag

### Development Server Starten

Om de applicatie in development mode te starten:

```bash
npm run dev
```

Dit zal de Vite development server starten met Hot Module Replacement (HMR) ingeschakeld. Je kunt de applicatie vervolgens openen in je browser (meestal op `http://localhost:5173`).

### Build voor Productie

Om een productie-build te maken:

```bash
npm run build
```

Dit zal een geoptimaliseerde versie van de applicatie maken in de `dist/` folder.

### Preview van Build

Om de gemaakte build lokaal te bekijken:

```bash
npm run preview
```

### Linting

Om de code te controleren op fouten en code-style problemen:

```bash
npm run lint
```

---

## 📁 Project Structuur

```
helloworld/
├── src/
│   ├── App.jsx                 # Hoofdcomponent met routing
│   ├── App.css                 # Stijlen voor de App
│   ├── main.jsx               # Entry point van de applicatie
│   ├── index.css              # Globale CSS stijlen
│   │
│   ├── Navigation.jsx         # Navigatiebalk component
│   ├── Navigation.css         # Navigatiebalk stijlen
│   │
│   ├── SearchPage.jsx         # Pagina voor zoeken naar Pokémon
│   ├── Filter.jsx             # Filter component voor zoekopdrachten
│   ├── PokemonCard.jsx        # Kaart component voor individuele Pokémon
│   │
│   ├── TopPokemonPage.jsx     # Pagina met top Pokémon
│   ├── GetTopPokemon.jsx      # Logic voor ophalen van top Pokémon
│   ├── SideBarPokemon.jsx     # Zijbalk component in top pagina
│   ├── pokemonStats.jsx       # Statistieken weergave voor Pokémon
│   │
│   ├── assets/
│   │   └── icons/
│   │       └── index.js       # Icon imports
│   │
├── public/                     # Statische bestanden
├── index.html                  # HTML entry point
├── vite.config.js             # Vite configuratie
├── tailwind.config.js         # Tailwind CSS configuratie
├── postcss.config.js          # PostCSS configuratie
├── eslint.config.js           # ESLint configuratie
├── package.json               # Project dependencies en scripts
└── README.md                  # Dit bestand

```

---

## 🔧 Beschrijving van Componenten

### **App.jsx**
- **Functie**: Hoofdcomponent van de applicatie
- **Bevat**: React Router setup met twee routes:
  - `/` - Zoekpagina voor Pokémon
  - `/top-pokemon` - Pagina met top Pokémon
- **Render**: Navigation-component en pagina's op basis van route

### **Navigation.jsx**
- **Functie**: Navigatiebalk aan de bovenkant van de pagina
- **Bevat**: Links naar de twee hoofdpagina's (Zoeken en Top Pokémon)
- **Stijlen**: Gedefinieerd in `Navigation.css`

### **SearchPage.jsx**
- **Functie**: Searchpagina waar gebruikers naar Pokémon kunnen zoeken
- **Bevat**: 
  - Zoekveld voor Pokémon naam
  - Filter component voor verfijning
  - PokemonCard componenten voor weergave van resultaten
- **API-integratie**: Haalt Pokémon data op van de Pokémon API

### **Filter.jsx**
- **Functie**: Filter component voor zoekopdrachten
- **Bevat**: Mogelijkheid om Pokémon te filteren op basis van:
  - Type
  - Generatie
  - Andere criteria
- **Interactie**: Update de zoekopdracht in real-time

### **PokemonCard.jsx**
- **Functie**: Toont informatie van één Pokémon in een kaartformaat
- **Bevat**:
  - Afbeelding van de Pokémon
  - Naam en type
  - Basisstatistieken (HP, Attack, Defense, etc.)
- **Design**: Responsive kaart met hover-effecten

### **TopPokemonPage.jsx**
- **Functie**: Pagina die de meest populaire of sterke Pokémon toont
- **Bevat**:
  - Zijbalk (SideBarPokemon) met ranked list
  - Detailweergave van geselecteerde Pokémon
- **Data**: Haalt top Pokémon op

### **GetTopPokemon.jsx**
- **Functie**: Bevat de logica voor ophalen van top Pokémon
- **Export**: Functie die top Pokémon data retourneert

### **SideBarPokemon.jsx**
- **Functie**: Zijbalk component in de top Pokémon pagina
- **Bevat**: Ranked list van top Pokémon
- **Interactie**: Click handlers voor selectie van Pokémon

### **pokemonStats.jsx**
- **Functie**: Toont gedetailleerde statistieken van Pokémon
- **Bevat**:
  - Grafische weergave van stats (via MUI Charts)
  - HP, Attack, Defense, Sp. Atk, Sp. Def, Speed
- **Visual**: Staafgrafieken of andere charttypen

---

## 📦 Technologieën Gebruikt

### Frontend Framework & Build Tool
- **React** (^19.2.0) - UI library voor het bouwen van gebruikersinterfaces
- **Vite** (^7.3.1) - Snelle build tool en development server

### Routing
- **React Router DOM** (^7.13.1) - Client-side routing voor navigatie tussen pagina's

### UI & Styling
- **Tailwind CSS** (^4.2.2) - Utility-first CSS framework
- **Material-UI (MUI)** (^7.3.9) - Componenten library
  - `@emotion/react` & `@emotion/styled` - CSS-in-JS oplossing voor MUI
- **MUI X-Charts** (^8.27.4) - Grafiekcomponenten voor datavisualisatie

### Development Tools
- **ESLint** (^9.39.1) - Code quality en style checker
- **PostCSS** (^8.5.8) - CSS transformatie tool
- **Autoprefixer** (^10.4.27) - Voegt vendor prefixes toe aan CSS

### Build & Preview
- **Vite Plugin React** (^5.1.1) - React ondersteuning voor Vite met Fast Refresh

---

## 🌐 Externe API's

Dit project gebruikt de **Pokémon API** (https://pokeapi.co) voor het ophalen van:
- Pokémon informatie (naam, type, afmeting)
- Pokémon afbeeldingen
- Statistieken en abilities
- Generatieinformatie

---

## 💡 Tips & Tricks

### Hot Module Replacement (HMR)
Vite ondersteunt HMR, wat betekent dat je wijzigingen direct in de browser ziet zonder het hele project opnieuw te laden.

### CSS Modules
Je kunt CSS modules gebruiken door bestanden te noemen als `Component.module.css` voor component-specifieke styling.

### Environment Variables
Maak een `.env` bestand aan in de root van het project om environment variabelen in te stellen:
```
VITE_POKEMON_API_URL=https://pokeapi.co/api/v2
```

### Debugging
Gebruik de React Developer Tools browser extensie voor debugging van React componenten.

---

## 📝 Licentie

Dit project is gemaakt voor educatieve doeleinden.

---

## 🤝 Vragen of Problemen?

Als je vragen hebt of tegen problemen aanloopt:
1. Zorg dat alle dependencies correct zijn geïnstalleerd (`npm install`)
2. Controleer dat Node.js versie 16 of hoger is geïnstalleerd
3. Probeer `npm cache clean --force` gevolgd door `npm install` opnieuw
4. Controleer de browser console op foutmeldingen
