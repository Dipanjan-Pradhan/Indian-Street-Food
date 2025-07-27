function addItemRow() {
    const container = document.getElementById('itemsContainer');
    const row = document.createElement('div');
    row.className = 'grid grid-cols-1 md:grid-cols-12 gap-4 item-row items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-100 hover:shadow-lg transition';
    row.innerHTML = `
        <input type="text" name="itemName[]" required 
                                   class="md:col-span-7 lg:col-span-9 px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white/80 backdrop-blur-sm text-blue-800 placeholder-blue-400" 
                                   placeholder="Item Name">
                            <input type="number" name="itemPrice[]" required min="0" step="0.01" 
                                   class="md:col-span-4 lg:col-span-2 px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base bg-white/80 backdrop-blur-sm text-blue-800 placeholder-blue-400" 
                                   placeholder="Price">
                            <button type="button" onclick="removeItemRow(this)" 
                                    class="col-span-1 text-red-500 hover:text-red-700 font-bold text-2xl transition p-2 cursor-pointer hover:scale-110">
                                <i class="fas fa-times"></i>
                            </button>`;
    container.appendChild(row);
}
function removeItemRow(btn) {
    const row = btn.parentElement;
    const container = document.getElementById('itemsContainer');
    if (container.children.length > 1) {
        container.removeChild(row);
    }
}
document.getElementById('itemsForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const items = [];
    const rows = document.querySelectorAll('#itemsContainer .item-row');
    rows.forEach(row => {
        const name = row.querySelector('input[name="itemName[]"]').value;
        const price = row.querySelector('input[name="itemPrice[]"]').value;
        if (name && price) {
            items.push({ itemname: name, price: parseFloat(price) });
        }
    });
    // Send to backend
    try {
        const res = await fetch('/api/supplieritem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(items)
        });
        if (res.ok) {
            // Show a non-intrusive success message
            let msg = document.createElement('div');
            msg.textContent = 'Items saved successfully!';
            msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 3000);
        } else {
            let msg = document.createElement('div');
            msg.textContent = 'Failed to save items.';
            msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 3000);
        }
    } catch (err) {
        let msg = document.createElement('div');
        msg.textContent = 'Error saving items.';
        msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }
});