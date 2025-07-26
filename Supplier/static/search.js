document.getElementById('searchBar').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#itemsContainer .item-row');
    rows.forEach(row => {
        const itemNameInput = row.querySelector('input[name="itemName[]"]');
        if (itemNameInput) {
            const itemName = itemNameInput.value.toLowerCase();
            if (itemName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}); 