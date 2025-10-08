// Enhance the holiday Google clone with suggestions, quick links and themed data

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const googleSearchBtn = document.getElementById('googleSearchBtn');
    const luckyBtn = document.getElementById('luckyBtn');
    const suggestionsList = document.getElementById('suggestionsList');
    const clearBtn = document.getElementById('clearBtn');
    const quickLinkButtons = document.querySelectorAll('.search-quick-links button');
    const trendGrid = document.getElementById('trendGrid');

    const suggestionData = [
        'christmas cookie recipes',
        'holiday gift ideas for friends',
        'winter solstice traditions',
        'best holiday markets near me',
        'new year celebration events',
        'festive playlist on youtube',
        'how to make hot chocolate bombs',
        'family games for christmas eve',
        'sustainable gift wrapping',
        'DIY holiday decorations',
    ];

    const trendingSearches = [
        {
            title: 'AI generated greeting cards',
            volume: 'Searches up 340% this week',
            description: 'Design personalised digital cards with holiday motifs in minutes.'
        },
        {
            title: 'Snowfall near me',
            volume: 'Searches up 185% this week',
            description: 'Check the latest forecasts to plan your next snow day adventure.'
        },
        {
            title: 'Festive dessert recipes',
            volume: 'Searches up 220% this week',
            description: 'Discover trending recipes and baking guides for seasonal treats.'
        },
        {
            title: 'Eco-friendly wrapping paper',
            volume: 'Searches up 160% this week',
            description: 'Learn how to wrap gifts beautifully with recyclable materials.'
        },
        {
            title: 'Holiday light displays',
            volume: 'Searches up 410% this week',
            description: 'Find nearby neighbourhoods that are lighting up the season.'
        },
        {
            title: 'New year countdown events',
            volume: 'Searches up 200% this week',
            description: 'See where to join the biggest celebrations as the year winds down.'
        }
    ];

    let activeSuggestionIndex = -1;

    function renderTrendingSearches() {
        if (!trendGrid) return;

        trendGrid.innerHTML = '';
        trendingSearches.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'trend-card';
            card.innerHTML = `
                <span class="trend-rank">#${index + 1}</span>
                <h3 class="trend-title">${item.title}</h3>
                <p class="trend-volume">${item.volume}</p>
                <p class="trend-description">${item.description}</p>
            `;
            trendGrid.appendChild(card);
        });
    }

    function performGoogleSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchInput.focus();
            return;
        }
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    function feelingLuckySearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchInput.focus();
            return;
        }
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`;
    }

    function clearSuggestions() {
        suggestionsList.innerHTML = '';
        suggestionsList.classList.remove('visible');
        activeSuggestionIndex = -1;
    }

    function showDefaultSuggestions() {
        suggestionsList.innerHTML = '';
        suggestionData.slice(0, 6).forEach((text) => {
            const item = buildSuggestionItem(text);
            suggestionsList.appendChild(item);
        });
        suggestionsList.classList.add('visible');
        activeSuggestionIndex = -1;
    }

    function buildSuggestionItem(text) {
        const item = document.createElement('li');
        item.setAttribute('role', 'option');
        item.dataset.query = text;

        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'search';

        const label = document.createElement('span');
        label.textContent = text;

        item.append(icon, label);
        return item;
    }

    function updateSuggestions(value) {
        const query = value.trim().toLowerCase();
        if (!query) {
            clearSuggestions();
            return;
        }

        const filtered = suggestionData
            .filter((item) => item.toLowerCase().includes(query))
            .slice(0, 6);

        if (!filtered.length) {
            clearSuggestions();
            return;
        }

        suggestionsList.innerHTML = '';
        filtered.forEach((text) => {
            const item = buildSuggestionItem(text);
            suggestionsList.appendChild(item);
        });
        suggestionsList.classList.add('visible');
        activeSuggestionIndex = -1;
    }

    function setActiveSuggestion(index) {
        const items = suggestionsList.querySelectorAll('li');
        if (!items.length) return;

        items.forEach((item, idx) => {
            item.classList.toggle('active', idx === index);
        });
    }

    function selectSuggestion(index) {
        const items = suggestionsList.querySelectorAll('li');
        if (!items.length || index < 0 || index >= items.length) return;
        const selected = items[index];
        searchInput.value = selected.dataset.query;
        clearSuggestions();
        performGoogleSearch();
    }

    renderTrendingSearches();

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        performGoogleSearch();
    });

    googleSearchBtn.addEventListener('click', performGoogleSearch);
    luckyBtn.addEventListener('click', feelingLuckySearch);

    searchInput.addEventListener('input', (event) => {
        updateSuggestions(event.target.value);
    });

    searchInput.addEventListener('focus', (event) => {
        if (event.target.value) {
            updateSuggestions(event.target.value);
        }
    });

    searchInput.addEventListener('keydown', (event) => {
        const items = suggestionsList.querySelectorAll('li');
        if (!items.length) {
            if (event.key === 'ArrowDown' && suggestionData.length) {
                showDefaultSuggestions();
                const newItems = suggestionsList.querySelectorAll('li');
                if (newItems.length) {
                    activeSuggestionIndex = 0;
                    setActiveSuggestion(activeSuggestionIndex);
                }
            }
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
                setActiveSuggestion(activeSuggestionIndex);
                break;
            case 'ArrowUp':
                event.preventDefault();
                activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
                setActiveSuggestion(activeSuggestionIndex);
                break;
            case 'Enter':
                if (activeSuggestionIndex >= 0) {
                    event.preventDefault();
                    selectSuggestion(activeSuggestionIndex);
                }
                break;
            case 'Escape':
                clearSuggestions();
                break;
            default:
                break;
        }
    });

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSuggestions();
        searchInput.focus();
    });

    suggestionsList.addEventListener('mousedown', (event) => {
        // Prevent the input from losing focus before click handler runs
        event.preventDefault();
    });

    suggestionsList.addEventListener('click', (event) => {
        const item = event.target.closest('li');
        if (!item) return;
        searchInput.value = item.dataset.query;
        clearSuggestions();
        searchInput.focus();
    });

    document.addEventListener('click', (event) => {
        if (!searchForm.contains(event.target) && !suggestionsList.contains(event.target)) {
            clearSuggestions();
        }
    });

    quickLinkButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const query = button.dataset.query;
            searchInput.value = query;
            clearSuggestions();
            performGoogleSearch();
        });
    });
});
