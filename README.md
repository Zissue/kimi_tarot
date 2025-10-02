# 🌙 Art Nouveau Tarot

![Art Nouveau Tarot](https://github.com/user-attachments/assets/a3f1b687-e797-4805-96a6-af915c4405b9)

An immersive, mystical tarot reading web application inspired by the elegant Art Nouveau aesthetic. Experience the ancient wisdom of tarot through beautiful card artwork and intuitive digital interactions.

## ✨ Features

### 🎴 Interactive Tarot Readings
- **Single Card Reading**: Quick daily guidance and insight (default mode)
- **Three Card Spread**: Past, Present, and Future reading
- **Relationship Spread**: Explore love and connections
- **Celtic Cross**: Comprehensive 10-card life reading

### 🎨 Art Nouveau Design
- Elegant, mystical Art Nouveau-inspired interface
- Beautiful botanical patterns and flowing organic lines
- Warm color palette: Deep Forest Green, Golden accents, Burgundy, and Ivory
- Smooth CSS transitions and animations

### 📚 Complete Tarot Deck
- **78 Cards Total**:
  - 22 Major Arcana cards
  - 56 Minor Arcana cards (14 cards × 4 suits)
- Each card includes:
  - Upright and Reversed meanings
  - Keywords and symbolic associations
  - Elemental correspondences
  - Detailed interpretations

### 💫 Key Functionalities
- **Card Shuffling**: Shuffle the deck before each reading
- **Card Drawing**: Draw cards with smooth animations
- **Reading Interpretation**: Get detailed guidance for your reading
- **Save Readings**: Store readings in browser local storage
- **Reading History**: Review past readings and track your journey
- **Card Library**: Browse and study all 78 tarot cards

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No installation or build tools required!

### Quick Start

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/Zissue/kimi_tarot.git
   cd kimi_tarot
   ```

2. **Open in Browser**
   Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or use a local development server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx http-server
   ```
   Then navigate to `http://localhost:8000`

3. **Start Your Reading**
   - Select your spread type (Single Card is default)
   - Click "Shuffle Cards" to shuffle the deck (optional)
   - Click "Draw Cards" to receive your reading
   - Read your interpretation and guidance
   - Save your reading for later reflection

## 📖 How to Use

### Single Card Reading (Daily Guidance)

![Single Card Reading](https://github.com/user-attachments/assets/2ef2cb77-dbc9-4393-969c-4f6e8552e7e4)

1. The single card spread is selected by default
2. (Optional) Enter a question or intention in the text field
3. Click "Shuffle Cards" to shuffle the deck
4. Click "Draw Cards" to draw one card
5. View your card and its interpretation
6. Click "Save Reading" to store it in your journal
7. Click "New Reading" to start fresh

### Other Spread Types
- **Three Card Spread**: Select "Three Card" spread type before drawing
- **Relationship Spread**: Choose "Relationship" for love and connection guidance
- **Celtic Cross**: Select "Celtic Cross" for the comprehensive 10-card reading

### Exploring the Card Library
1. Click "Card Library" in the navigation menu
2. Browse all 78 cards in the grid layout
3. Filter by suit (Major Arcana, Cups, Wands, Swords, Pentacles)
4. Search for specific cards by name or keywords
5. Click any card to view detailed meanings and symbolism

### Viewing Reading History
1. Click "My Readings" in the navigation menu
2. Browse your saved readings chronologically
3. Filter by date, spread type, or search
4. Click on any reading to view full details
5. Add personal notes and reflections

## 🎯 Project Structure

```
kimi_tarot/
├── index.html              # Main tarot reading interface
├── library.html            # Card library and encyclopedia
├── readings.html           # Reading history and journal
├── main.js                 # Core JavaScript functionality
├── README.md              # This file
├── design.md              # Design style guide
├── interaction.md         # Interaction design documentation
├── outline.md            # Project outline and structure
└── resources/            # Media assets (card images, backgrounds)
    ├── major-arcana/     # Major Arcana card images
    ├── minor-arcana/     # Minor Arcana card images
    │   ├── wands/
    │   ├── cups/
    │   ├── swords/
    │   └── pentacles/
    ├── backgrounds/      # Background textures
    └── card-backs/       # Card back designs
```

## 🔮 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Art Nouveau styling with custom properties and animations
- **JavaScript (ES6+)**: Core functionality and interactivity
- **Local Storage**: Browser-based data persistence

### Browser Compatibility
- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- Mobile browsers: Responsive design optimized ✅

### Core Features Implementation

#### Tarot Deck Management
- 78-card deck with complete data structure
- Fisher-Yates shuffle algorithm for randomization
- 30% chance of reversed cards for authentic readings

#### Reading System
- Multiple spread layouts with position meanings
- Automated interpretation generation
- Local storage for reading persistence

#### UI Animations
- CSS transitions for smooth interactions
- Graceful degradation when animation libraries unavailable
- Card draw animations and hover effects

## 🎨 Customization

### Styling
Edit the CSS variables in `index.html` to customize colors:
```css
:root {
    --primary-bg: #2D4A3E;      /* Deep Forest Green */
    --accent-gold: #D4AF37;      /* Warm Gold */
    --accent-burgundy: #722F37;  /* Burgundy Wine */
    --text-ivory: #F5F5DC;       /* Soft Ivory */
}
```

### Card Data
Edit `main.js` to modify card meanings, add new cards, or customize interpretations.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1920px and above)
- Laptops (1366px - 1920px)
- Tablets (768px - 1366px)
- Mobile phones (320px - 768px)

## 🌟 Future Enhancements

Potential features for future development:
- [ ] User accounts and cloud storage
- [ ] Social sharing of readings
- [ ] Additional tarot spreads
- [ ] Card of the Day notifications
- [ ] Reading statistics and insights
- [ ] Multiple language support
- [ ] Audio guidance for readings
- [ ] Customizable card decks

## 🤝 Contributing

Contributions are welcome! Here are some ways you can contribute:
- Report bugs and issues
- Suggest new features or spreads
- Improve documentation
- Add new card interpretations
- Enhance the visual design
- Optimize performance

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- Inspired by the Art Nouveau movement and the works of Alphonse Mucha
- Traditional tarot meanings and symbolism
- The mystical tradition of tarot divination

## 📧 Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Check the documentation files (`design.md`, `interaction.md`, `outline.md`)

---

**Embrace the mystical journey within** 🌙✨

*"The cards are a mirror reflecting the wisdom within you."*
