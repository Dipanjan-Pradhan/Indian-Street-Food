const searchBar = document.getElementById('searchBar');
const itemsContainer = document.getElementById('itemsContainer');

// Create suggestion dropdown
let suggestionBox = document.createElement('div');
suggestionBox.id = 'suggestionBox';
suggestionBox.style.position = 'absolute';
suggestionBox.style.zIndex = '50';
suggestionBox.style.background = 'white';
suggestionBox.style.border = '1px solid #cbd5e1';
suggestionBox.style.borderRadius = '0.5rem';
suggestionBox.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
suggestionBox.style.width = searchBar.offsetWidth + 'px';
suggestionBox.style.maxHeight = '200px';
suggestionBox.style.overflowY = 'auto';
suggestionBox.style.display = 'none';
suggestionBox.className = 'mt-1';
searchBar.parentElement.appendChild(suggestionBox);

function updateSuggestions() {
    const searchTerm = searchBar.value.trim().toLowerCase();
    const rows = document.querySelectorAll('#itemsContainer .item-row');
    let matches = [];
    rows.forEach(row => {
        const itemNameInput = row.querySelector('input[name="itemName[]"]');
        if (itemNameInput) {
            const itemName = itemNameInput.value.trim();
            if (itemName.toLowerCase().includes(searchTerm) && searchTerm.length > 0) {
                matches.push(itemName);
            }
        }
    });
    // Remove duplicates
    matches = [...new Set(matches)];
    // Show suggestions
    if (matches.length > 0) {
        suggestionBox.innerHTML = matches.map(name => `<div class='px-4 py-2 hover:bg-blue-100 cursor-pointer rounded'>${name}</div>`).join('');
        suggestionBox.style.display = '';
        suggestionBox.style.width = searchBar.offsetWidth + 'px';
    } else {
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
    }
}

searchBar.addEventListener('input', updateSuggestions);

// Handle click on suggestion
suggestionBox.addEventListener('mousedown', function(e) {
    if (e.target && e.target.textContent) {
        searchBar.value = e.target.textContent;
        suggestionBox.style.display = 'none';
        searchBar.dispatchEvent(new Event('input'));
    }
});

// Hide suggestions on blur (with slight delay for click)
searchBar.addEventListener('blur', function() {
    setTimeout(() => { suggestionBox.style.display = 'none'; }, 120);
});

// Show suggestions again on focus if there is a value
searchBar.addEventListener('focus', function() {
    if (searchBar.value.trim().length > 0) updateSuggestions();
}); 