// Art Nouveau Tarot Website - Main JavaScript
// Complete tarot deck with meanings and functionality

// Simple animation fallback when anime.js is not available
function simpleAnimate(element, styles, duration = 500, onComplete = null) {
    if (typeof anime !== 'undefined') {
        // Use anime.js if available
        const animeProps = { targets: element, duration };
        Object.keys(styles).forEach(key => {
            animeProps[key] = styles[key];
        });
        if (onComplete) {
            animeProps.complete = onComplete;
        }
        anime(animeProps);
    } else {
        // Fallback to CSS transitions
        if (element) {
            // Handle transform-related properties
            const transformProps = [
                'translate', 'translateX', 'translateY', 'translateZ',
                'scale', 'scaleX', 'scaleY', 'scaleZ',
                'rotate', 'rotateX', 'rotateY', 'rotateZ',
                'skew', 'skewX', 'skewY', 'perspective'
            ];
            let transformString = '';
            Object.keys(styles).forEach(key => {
                if (transformProps.includes(key)) {
                    const value = Array.isArray(styles[key]) ? styles[key][1] : styles[key];
                    transformString += `${key}(${value}) `;
                } else {
                    // Convert camelCase to kebab-case for CSS custom properties
                    const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
                    const value = Array.isArray(styles[key]) ? styles[key][1] : styles[key];
                    if (cssKey in element.style) {
                        element.style[key] = value;
                    } else {
                        element.style.setProperty(cssKey, value);
                    }
                }
            });
            if (transformString) {
                element.style.transform = transformString.trim();
            }
            if (onComplete) {
                setTimeout(onComplete, duration);
            }
        }
    }
}

class TarotDeck {
    constructor() {
        this.cards = this.initializeDeck();
        this.currentReading = null;
        this.readingHistory = this.loadReadingHistory();
        this.isShuffling = false;
    }

    initializeDeck() {
        const majorArcana = [
            {
                name: "The Fool",
                image: "resources/major-arcana/fool.jpg",
                number: 0,
                suit: "major",
                keywords: ["new beginnings", "innocence", "free spirit", "potential"],
                upright: "New beginnings, innocence, spontaneity, and a free spirit. The Fool represents taking a leap of faith and embarking on a new journey with childlike wonder and optimism.",
                reversed: "Recklessness, taken advantage of, inconsideration. The reversed Fool warns of being naive or making hasty decisions without proper consideration.",
                element: "Air",
                astrology: "Uranus"
            },
            {
                name: "The Magician",
                image: "resources/major-arcana/magician.jpg",
                number: 1,
                suit: "major",
                keywords: ["willpower", "desire", "creation", "manifestation"],
                upright: "Willpower, desire, creation, manifestation. The Magician represents the power to make your dreams a reality through focus, determination, and using all available resources.",
                reversed: "Trickery, illusions, out of touch. The reversed Magician warns of manipulation, poor planning, or lacking the skills needed for success.",
                element: "Air",
                astrology: "Mercury"
            },
            {
                name: "The High Priestess",
                image: "resources/major-arcana/high-priestess.jpg",
                number: 2,
                suit: "major",
                keywords: ["intuitive", "unconscious", "inner voice", "mystery"],
                upright: "Intuitive, unconscious, inner voice, mystery. The High Priestess represents inner wisdom, spiritual knowledge, and trusting your intuition to guide you.",
                reversed: "Lack of center, lost inner voice, repressed feelings. The reversed High Priestess suggests ignoring your intuition or being out of touch with your inner self.",
                element: "Water",
                astrology: "Moon"
            },
            {
                name: "The Empress",
                image: "resources/major-arcana/empress.jpg",
                number: 3,
                suit: "major",
                keywords: ["motherhood", "fertility", "nature", "abundance"],
                upright: "Motherhood, fertility, nature, abundance. The Empress represents nurturing, creativity, and the fertile ground from which new life and ideas grow.",
                reversed: "Dependence, smothering, emptiness, nosiness. The reversed Empress warns of being overly dependent or neglecting your own needs while caring for others.",
                element: "Earth",
                astrology: "Venus"
            },
            {
                name: "The Emperor",
                image: "resources/major-arcana/emperor.jpg",
                number: 4,
                suit: "major",
                keywords: ["authority", "structure", "control", "fatherhood"],
                upright: "Authority, structure, control, fatherhood. The Emperor represents leadership, stability, and the establishment of order and security in your life.",
                reversed: "Tyranny, rigidity, coldness. The reversed Emperor warns of being too controlling, rigid, or misusing authority and power.",
                element: "Fire",
                astrology: "Aries"
            },
            {
                name: "The Lovers",
                image: "resources/major-arcana/lovers.jpg",
                number: 6,
                suit: "major",
                keywords: ["partnerships", "duality", "union", "choices"],
                upright: "Partnerships, duality, union, choices. The Lovers represent meaningful relationships, important decisions, and the harmony that comes from true connection.",
                reversed: "Loss of balance, one-sidedness, disharmony. The reversed Lovers suggest relationship problems, poor choices, or lack of alignment.",
                element: "Air",
                astrology: "Gemini"
            },
            {
                name: "Strength",
                image: "resources/major-arcana/strength.jpg",
                number: 8,
                suit: "major",
                keywords: ["courage", "patience", "inner strength", "compassion"],
                upright: "Courage, patience, inner strength, compassion. Strength represents the quiet power that comes from mastering your emotions and approaching challenges with love and understanding.",
                reversed: "Weakness, self-doubt, lack of self-discipline. The reversed Strength card suggests giving in to fear or losing control of your emotions.",
                element: "Fire",
                astrology: "Leo"
            },
            {
                name: "Death",
                image: "resources/major-arcana/death.jpg",
                number: 13,
                suit: "major",
                keywords: ["endings", "transformation", "rebirth", "change"],
                upright: "Endings, transformation, rebirth, change. Death represents the necessary ending that makes way for new beginnings and personal transformation.",
                reversed: "Resistance to change, personal transformation, inner purging. The reversed Death suggests struggling against necessary change or fearing transformation.",
                element: "Water",
                astrology: "Scorpio"
            },
            {
                name: "The Star",
                image: "resources/major-arcana/star.jpg",
                number: 17,
                suit: "major",
                keywords: ["hope", "spiritual guidance", "renewed purpose", "inspiration"],
                upright: "Hope, spiritual guidance, renewed purpose, inspiration. The Star represents healing, renewal, and the light that guides you toward your highest potential.",
                reversed: "Lack of faith, despair, self-trust, disconnection. The reversed Star suggests feeling hopeless or disconnected from your spiritual source.",
                element: "Air",
                astrology: "Aquarius"
            },
            {
                name: "The Moon",
                image: "resources/major-arcana/moon.jpg",
                number: 18,
                suit: "major",
                keywords: ["illusion", "mystery", "dreams", "intuition"],
                upright: "Illusion, mystery, dreams, intuition. The Moon represents the realm of the subconscious, where things may not be as they seem and intuition is your guide.",
                reversed: "Fear, confusion, misinterpretation, clarity. The reversed Moon suggests seeing through illusions or being overwhelmed by confusion and fear.",
                element: "Water",
                astrology: "Pisces"
            },
            {
                name: "The Sun",
                image: "resources/major-arcana/sun.jpg",
                number: 19,
                suit: "major",
                keywords: ["joy", "vitality", "success", "celebration"],
                upright: "Joy, vitality, success, celebration. The Sun represents happiness, positive energy, and the radiant light that illuminates your path to success.",
                reversed: "Inner child, feeling down, overly optimistic. The reversed Sun suggests temporary setbacks or needing to reconnect with your inner joy.",
                element: "Fire",
                astrology: "Sun"
            },
            {
                name: "The World",
                image: "resources/major-arcana/world.jpg",
                number: 21,
                suit: "major",
                keywords: ["completion", "fulfillment", "achievement", "integration"],
                upright: "Completion, fulfillment, achievement, integration. The World represents the successful completion of a journey and the sense of wholeness that comes with it.",
                reversed: "Seeking personal closure, short-cut to success. The reversed World suggests incomplete projects or needing to find closure before moving forward.",
                element: "Earth",
                astrology: "Saturn"
            }
        ];

        const minorArcana = [
            // Cups (Water Element)
            {
                name: "Ace of Cups",
                image: "resources/minor-arcana/cups/ace-cups.jpg",
                number: 1,
                suit: "cups",
                keywords: ["new feelings", "love", "intuition", "spirituality"],
                upright: "New feelings, love, intuition, spirituality. The Ace of Cups represents the beginning of emotional fulfillment and spiritual awakening.",
                reversed: "Emotional loss, blocked creativity, emptiness. The reversed Ace of Cups suggests emotional disappointment or creative blocks.",
                element: "Water"
            },
            {
                name: "Three of Cups",
                image: "resources/minor-arcana/cups/three-cups.jpg",
                number: 3,
                suit: "cups",
                keywords: ["friendship", "celebration", "community", "creativity"],
                upright: "Friendship, celebration, community, creativity. The Three of Cups represents joyful connections with others and shared happiness.",
                reversed: "Overindulgence, gossip, isolation. The reversed Three of Cups warns of social excess or feeling disconnected from others.",
                element: "Water"
            },
            // Wands (Fire Element)
            {
                name: "Ace of Wands",
                image: "resources/minor-arcana/wands/ace-wands.jpg",
                number: 1,
                suit: "wands",
                keywords: ["inspiration", "new opportunities", "growth", "potential"],
                upright: "Inspiration, new opportunities, growth, potential. The Ace of Wands represents the spark of creative energy and new ventures.",
                reversed: "Lack of motivation, delays, blocks. The reversed Ace of Wands suggests creative blocks or missed opportunities.",
                element: "Fire"
            },
            {
                name: "Eight of Wands",
                image: "resources/minor-arcana/wands/eight-wands.jpg",
                number: 8,
                suit: "wands",
                keywords: ["speed", "action", "movement", "quick decisions"],
                upright: "Speed, action, movement, quick decisions. The Eight of Wands represents rapid progress and swift movement toward your goals.",
                reversed: "Delays, frustration, resistance. The reversed Eight of Wands suggests obstacles slowing your progress.",
                element: "Fire"
            },
            // Swords (Air Element)
            {
                name: "Ace of Swords",
                image: "resources/minor-arcana/swords/ace-swords.jpg",
                number: 1,
                suit: "swords",
                keywords: ["clarity", "truth", "breakthrough", "new ideas"],
                upright: "Clarity, truth, breakthrough, new ideas. The Ace of Swords represents mental clarity and the power of clear thinking.",
                reversed: "Confusion, misinformation, lack of clarity. The reversed Ace of Swords warns of mental confusion or unclear thinking.",
                element: "Air"
            },
            {
                name: "Five of Swords",
                image: "resources/minor-arcana/swords/five-swords.jpg",
                number: 5,
                suit: "swords",
                keywords: ["conflict", "tension", "competition", "defeat"],
                upright: "Conflict, tension, competition, defeat. The Five of Swords represents conflict and the need to choose your battles wisely.",
                reversed: "Reconciliation, resolution, compromise. The reversed Five of Swords suggests moving past conflict toward peace.",
                element: "Air"
            },
            // Pentacles (Earth Element)
            {
                name: "Ace of Pentacles",
                image: "resources/minor-arcana/pentacles/ace-pentacles.jpg",
                number: 1,
                suit: "pentacles",
                keywords: ["manifestation", "new financial opportunity", "abundance"],
                upright: "Manifestation, new financial opportunity, abundance. The Ace of Pentacles represents material prosperity and new ventures.",
                reversed: "Lost opportunity, poor investment, lack of planning. The reversed Ace of Pentacles warns of financial setbacks or poor planning.",
                element: "Earth"
            },
            {
                name: "Ten of Pentacles",
                image: "resources/minor-arcana/pentacles/ten-pentacles.jpg",
                number: 10,
                suit: "pentacles",
                keywords: ["legacy", "inheritance", "family", "long-term success"],
                upright: "Legacy, inheritance, family, long-term success. The Ten of Pentacles represents lasting wealth and family prosperity.",
                reversed: "Family disputes, financial failure, instability. The reversed Ten of Pentacles warns of family conflicts or financial instability.",
                element: "Earth"
            }
        ];

        return [...majorArcana, ...minorArcana];
    }

    shuffleDeck() {
        const shuffled = [...this.cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    drawCards(count, spreadType = 'single') {
        const shuffledDeck = this.shuffleDeck();
        const drawnCards = shuffledDeck.slice(0, count);
        
        // Add position meanings based on spread type
        const positionedCards = this.addPositionMeanings(drawnCards, spreadType);
        
        return positionedCards;
    }

    addPositionMeanings(cards, spreadType) {
        const positions = {
            single: ['Your Guidance'],
            threeCard: ['Past', 'Present', 'Future'],
            celticCross: [
                'Present Situation',
                'Challenge',
                'Past Influences',
                'Future Influences',
                'Crown/Challenges',
                'Root/Foundation',
                'Advice',
                'External Influences',
                'Hopes/Fears',
                'Outcome'
            ],
            relationship: ['You', 'Partner', 'Relationship Dynamics']
        };

        return cards.map((card, index) => ({
            ...card,
            position: positions[spreadType] ? positions[spreadType][index] : `Position ${index + 1}`,
            isReversed: Math.random() < 0.3 // 30% chance of reversed cards
        }));
    }

    saveReading(cards, spreadType, question = '') {
        const reading = {
            id: Date.now(),
            date: new Date().toISOString(),
            spreadType,
            question,
            cards,
            interpretation: this.generateInterpretation(cards, spreadType)
        };

        this.readingHistory.unshift(reading);
        this.readingHistory = this.readingHistory.slice(0, 50); // Keep last 50 readings
        localStorage.setItem('tarotReadings', JSON.stringify(this.readingHistory));
        
        return reading;
    }

    generateInterpretation(cards, spreadType) {
        let interpretation = `Your ${spreadType} reading reveals:\n\n`;
        
        cards.forEach((card, index) => {
            const meaning = card.isReversed ? card.reversed : card.upright;
            interpretation += `${card.position}: ${card.name} - ${meaning}\n\n`;
        });

        return interpretation;
    }

    loadReadingHistory() {
        const saved = localStorage.getItem('tarotReadings');
        return saved ? JSON.parse(saved) : [];
    }

    getCardByName(name) {
        return this.cards.find(card => card.name.toLowerCase() === name.toLowerCase());
    }

    filterCards(suit = '', keyword = '') {
        return this.cards.filter(card => {
            const matchesSuit = !suit || card.suit === suit;
            const matchesKeyword = !keyword || 
                card.name.toLowerCase().includes(keyword.toLowerCase()) ||
                card.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()));
            
            return matchesSuit && matchesKeyword;
        });
    }
}

// Animation and UI Controller
class TarotUI {
    constructor() {
        this.deck = new TarotDeck();
        this.currentSpread = 'single';
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadReadingHistory();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Spread selection
        document.querySelectorAll('.spread-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectSpread(e.target.dataset.spread);
            });
        });

        // Shuffle and draw buttons
        const shuffleBtn = document.getElementById('shuffleBtn');
        const drawBtn = document.getElementById('drawBtn');
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => this.shuffleCards());
        }
        
        if (drawBtn) {
            drawBtn.addEventListener('click', () => this.drawReading());
        }

        // Card hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('tarot-card')) {
                this.addCardHoverEffect(e.target);
            }
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavigation(e);
            });
        });
    }

    selectSpread(spreadType) {
        this.currentSpread = spreadType;
        
        // Update UI
        document.querySelectorAll('.spread-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-spread="${spreadType}"]`).classList.add('active');

        // Update card count display
        const cardCounts = {
            single: 1,
            threeCard: 3,
            celticCross: 10,
            relationship: 3
        };

        const countDisplay = document.getElementById('cardCount');
        if (countDisplay) {
            countDisplay.textContent = `${cardCounts[spreadType]} cards`;
        }
    }

    shuffleCards() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const cardDeck = document.getElementById('cardDeck');
        
        if (!cardDeck) {
            this.isAnimating = false;
            return;
        }

        // Create shuffling animation
        setTimeout(() => {
            this.isAnimating = false;
            this.showShuffleComplete();
        }, 1500);

        // Add particle effects
        this.createParticleEffect(cardDeck);
    }

    showShuffleComplete() {
        const status = document.getElementById('readingStatus');
        if (status) {
            status.textContent = 'Cards are ready for your reading';
            status.classList.add('ready');
        }
    }

    drawReading() {
        if (this.isAnimating) return;
        
        const cardCounts = {
            single: 1,
            threeCard: 3,
            celticCross: 10,
            relationship: 3
        };

        const cardCount = cardCounts[this.currentSpread];
        const drawnCards = this.deck.drawCards(cardCount, this.currentSpread);
        
        this.animateCardDraw(drawnCards);
    }

    animateCardDraw(cards) {
        this.isAnimating = true;
        const readingArea = document.getElementById('readingArea');
        
        if (!readingArea) {
            this.isAnimating = false;
            return;
        }

        readingArea.innerHTML = '';
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                const cardElement = this.createCardElement(card);
                readingArea.appendChild(cardElement);
                
                // Animate card appearance using simpleAnimate
                simpleAnimate(cardElement, {
                    opacity: [0, 1],
                    translateY: [-50, 0],
                    scale: [0.8, 1]
                }, 800, () => {
                    if (index === cards.length - 1) {
                        this.showReadingInterpretation(cards);
                        this.isAnimating = false;
                    }
                });
            }, index * 300);
        });
    }

    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'tarot-card drawn-card';
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${card.image}" alt="${card.name}" loading="lazy">
                    <div class="card-info">
                        <h3>${card.name}</h3>
                        <p class="position">${card.position}</p>
                        ${card.isReversed ? '<span class="reversed">Reversed</span>' : ''}
                    </div>
                </div>
            </div>
        `;

        // Add click event for card details
        cardDiv.addEventListener('click', () => {
            this.showCardDetails(card);
        });

        return cardDiv;
    }

    showReadingInterpretation(cards) {
        const interpretation = this.deck.generateInterpretation(cards, this.currentSpread);
        const interpretationDiv = document.getElementById('interpretation');
        
        if (interpretationDiv) {
            interpretationDiv.innerHTML = `
                <div class="reading-results">
                    <h3>Your ${this.currentSpread} Reading</h3>
                    <div class="interpretation-text">${interpretation.replace(/\n/g, '<br>')}</div>
                    <div class="reading-actions">
                        <button onclick="tarotUI.saveCurrentReading()" class="save-btn">Save Reading</button>
                        <button onclick="tarotUI.newReading()" class="new-reading-btn">New Reading</button>
                    </div>
                </div>
            `;
            
            interpretationDiv.style.display = 'block';
            
            // Animate interpretation appearance using simpleAnimate
            simpleAnimate(interpretationDiv, {
                opacity: [0, 1],
                translateY: [30, 0]
            }, 800);
        }
    }

    showCardDetails(card) {
        const modal = document.getElementById('cardModal');
        const modalContent = document.getElementById('cardModalContent');
        
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="card-detail">
                <img src="${card.image}" alt="${card.name}">
                <div class="card-details">
                    <h2>${card.name}</h2>
                    <div class="card-position">
                        <strong>Position:</strong> ${card.position}
                        ${card.isReversed ? '<span class="reversed-tag">Reversed</span>' : '<span class="upright-tag">Upright</span>'}
                    </div>
                    <div class="keywords">
                        <strong>Keywords:</strong> ${card.keywords.join(', ')}
                    </div>
                    <div class="meaning">
                        <h4>Meaning:</h4>
                        <p>${card.isReversed ? card.reversed : card.upright}</p>
                    </div>
                    ${card.element ? `<div class="element"><strong>Element:</strong> ${card.element}</div>` : ''}
                </div>
            </div>
            <button class="close-modal" onclick="tarotUI.closeModal()">&times;</button>
        `;

        modal.style.display = 'flex';
        
        // Animate modal appearance using simpleAnimate
        simpleAnimate(modal, {
            opacity: [0, 1]
        }, 300);
    }

    closeModal() {
        const modal = document.getElementById('cardModal');
        if (modal) {
            // Animate modal close using simpleAnimate
            simpleAnimate(modal, {
                opacity: [1, 0]
            }, 300, () => {
                modal.style.display = 'none';
            });
        }
    }

    saveCurrentReading() {
        const question = document.getElementById('readingQuestion')?.value || '';
        const cards = Array.from(document.querySelectorAll('.drawn-card')).map(cardEl => {
            const cardName = cardEl.querySelector('h3').textContent;
            return this.deck.getCardByName(cardName);
        });

        if (cards.length > 0) {
            const reading = this.deck.saveReading(cards, this.currentSpread, question);
            this.showNotification('Reading saved to your journal!');
        }
    }

    newReading() {
        const readingArea = document.getElementById('readingArea');
        const interpretation = document.getElementById('interpretation');
        
        if (readingArea && readingArea.children.length > 0) {
            // Animate each card out using simpleAnimate
            Array.from(readingArea.children).forEach((child, index) => {
                simpleAnimate(child, {
                    opacity: [1, 0],
                    scale: [1, 0.8]
                }, 400, () => {
                    // Only clear after last animation completes
                    if (index === readingArea.children.length - 1) {
                        readingArea.innerHTML = '';
                        if (interpretation) {
                            interpretation.style.display = 'none';
                        }
                    }
                });
            });
        }
    }

    createParticleEffect(element) {
        // Simple particle effect using CSS animations
        const particles = document.createElement('div');
        particles.className = 'particle-effect';
        element.appendChild(particles);
        
        setTimeout(() => {
            particles.remove();
        }, 2000);
    }

    addCardHoverEffect(cardElement) {
        cardElement.addEventListener('mouseenter', () => {
            simpleAnimate(cardElement, {
                scale: 1.05
            }, 300);
        });

        cardElement.addEventListener('mouseleave', () => {
            simpleAnimate(cardElement, {
                scale: 1
            }, 300);
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate notification in using simpleAnimate
        simpleAnimate(notification, {
            opacity: [0, 1],
            translateY: [-50, 0]
        }, 400, () => {
            // After 3 seconds, animate it out
            setTimeout(() => {
                simpleAnimate(notification, {
                    opacity: [1, 0],
                    translateY: [0, -50]
                }, 400, () => {
                    notification.remove();
                });
            }, 3000);
        });
    }

    initializeAnimations() {
        // Initialize background animations
        this.createBackgroundEffect();
        
        // Initialize scroll animations
        this.setupScrollAnimations();
    }

    createBackgroundEffect() {
        const background = document.querySelector('.mystical-background');
        if (!background) return;

        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            background.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    handleNavigation(e) {
        // Handle smooth page transitions
        const target = e.target.getAttribute('href');
        if (target && target.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    loadReadingHistory() {
        const historyContainer = document.getElementById('readingHistory');
        if (!historyContainer) return;

        const readings = this.deck.readingHistory;
        
        if (readings.length === 0) {
            historyContainer.innerHTML = '<p class="no-readings">No readings saved yet. Start your first reading!</p>';
            return;
        }

        historyContainer.innerHTML = readings.map(reading => `
            <div class="reading-card" data-reading-id="${reading.id}">
                <div class="reading-header">
                    <h3>${reading.spreadType} Reading</h3>
                    <span class="reading-date">${new Date(reading.date).toLocaleDateString()}</span>
                </div>
                <div class="reading-preview">
                    ${reading.cards.map(card => `
                        <img src="${card.image}" alt="${card.name}" class="mini-card">
                    `).join('')}
                </div>
                <button onclick="tarotUI.viewReading('${reading.id}')" class="view-reading-btn">View Reading</button>
            </div>
        `).join('');
    }

    viewReading(readingId) {
        const reading = this.deck.readingHistory.find(r => r.id == readingId);
        if (!reading) return;

        // Display reading details in modal or dedicated view
        this.showReadingInterpretation(reading.cards);
    }
}

// Initialize the application
let tarotUI;

document.addEventListener('DOMContentLoaded', () => {
    tarotUI = new TarotUI();
    
    // Add some initial animations using simpleAnimate
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            simpleAnimate(heroContent, {
                opacity: [0, 1],
                translateY: [50, 0]
            }, 1000);
        }, 500);
    }
});

// Global functions for HTML onclick handlers
window.tarotUI = tarotUI;
window.saveReading = () => tarotUI?.saveCurrentReading();
window.newReading = () => tarotUI?.newReading();
window.closeModal = () => tarotUI?.closeModal();