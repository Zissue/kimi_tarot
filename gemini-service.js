// Gemini Flash 2.5 API Service for Personalized Tarot Interpretations
class GeminiService {
    constructor() {
        this.apiKey = null;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
        this.isConfigured = false;
    }

    // Set the API key
    setApiKey(apiKey) {
        this.apiKey = apiKey;
        this.isConfigured = !!apiKey && apiKey.trim() !== '' && apiKey !== 'your_api_key_here';
    }

    // Check if service is configured
    isReady() {
        return this.isConfigured;
    }

    // Generate personalized tarot interpretation using Gemini Flash 2.5
    async generatePersonalizedInterpretation(cards, spreadType, question = '') {
        if (!this.isConfigured) {
            throw new Error('Gemini API key not configured');
        }

        const prompt = this.buildPrompt(cards, spreadType, question);
        
        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response format from API');
            }

            const interpretation = data.candidates[0].content.parts[0].text;
            return interpretation;
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    // Build the prompt for Gemini
    buildPrompt(cards, spreadType, question) {
        const spreadNames = {
            single: 'Single Card',
            threeCard: 'Three Card (Past, Present, Future)',
            relationship: 'Relationship',
            celticCross: 'Celtic Cross'
        };
        const displayName = spreadNames[spreadType] || spreadType;

        let prompt = `You are an experienced tarot reader with deep knowledge of symbolism, intuition, and spiritual guidance. Please provide a personalized, insightful, and compassionate tarot reading interpretation.\n\n`;
        
        prompt += `Spread Type: ${displayName}\n`;
        
        if (question && question.trim()) {
            prompt += `Question/Intention: ${question}\n`;
        }
        
        prompt += `\nCards Drawn:\n`;
        
        cards.forEach((card, index) => {
            const orientation = card.isReversed ? 'Reversed' : 'Upright';
            prompt += `\n${index + 1}. Position: ${card.position}\n`;
            prompt += `   Card: ${card.name} (${orientation})\n`;
            prompt += `   Keywords: ${card.keywords.join(', ')}\n`;
            
            if (card.element) {
                prompt += `   Element: ${card.element}\n`;
            }
            
            const meaning = card.isReversed ? card.reversed : card.upright;
            prompt += `   Traditional Meaning: ${meaning}\n`;
        });
        
        prompt += `\n\nPlease provide a personalized interpretation that:\n`;
        prompt += `1. Synthesizes the cards together as a cohesive narrative\n`;
        prompt += `2. Considers the position meanings and how cards relate to each other\n`;
        prompt += `3. Offers practical guidance and actionable insights\n`;
        prompt += `4. Is warm, empowering, and supportive in tone\n`;
        prompt += `5. Respects the traditional meanings while adding personal depth\n`;
        
        if (question && question.trim()) {
            prompt += `6. Directly addresses the question or intention provided\n`;
        }
        
        prompt += `\nFormat the response in clear paragraphs with good flow. Start with an overview, then discuss each card in relation to its position, and conclude with overall guidance.`;
        
        return prompt;
    }

    // Get API key from localStorage
    loadApiKey() {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            this.setApiKey(storedKey);
        }
        return storedKey;
    }

    // Save API key to localStorage
    saveApiKey(apiKey) {
        if (apiKey && apiKey.trim()) {
            localStorage.setItem('gemini_api_key', apiKey.trim());
            this.setApiKey(apiKey.trim());
        }
    }

    // Clear API key
    clearApiKey() {
        localStorage.removeItem('gemini_api_key');
        this.apiKey = null;
        this.isConfigured = false;
    }
}

// Create global instance
const geminiService = new GeminiService();
