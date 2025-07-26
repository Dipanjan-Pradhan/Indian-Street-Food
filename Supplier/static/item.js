function addItemRow() {
    const container = document.getElementById('itemsContainer');
    const row = document.createElement('div');
    row.className = 'grid grid-cols-12 gap-4 item-row items-center bg-blue-50 rounded-lg p-4';
    row.innerHTML = `
        <input type="text" name="itemName[]" required class="col-span-7 lg:col-span-9 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Item Name">
        <input type="number" name="itemPrice[]" required min="0" step="0.01" class="col-span-4 lg:col-span-2 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Price">
        <button type="button" onclick="removeItemRow(this)" class="col-span-1 text-red-500 hover:text-red-700 font-bold text-2xl transition">&times;</button>
                    `;
    container.appendChild(row);
}
function removeItemRow(btn) {
    const row = btn.parentElement;
    const container = document.getElementById('itemsContainer');
    if (container.children.length > 1) {
        container.removeChild(row);
    }
}
document.getElementById('itemsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // You can handle form submission here (e.g., send data to backend or show a success message)
    alert('Items submitted!');
});