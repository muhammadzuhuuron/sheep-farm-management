// Data Storage
let sheepData = JSON.parse(localStorage.getItem('sheepData')) || [];
let financialData = JSON.parse(localStorage.getItem('financialData')) || [];
let healthData = JSON.parse(localStorage.getItem('healthData')) || [];
let editingIndex = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateDashboard();
    renderSheepTable();
    updateHealthSheepDropdown();
    loadCharts();
});

// Event Listeners Setup
function setupEventListeners() {
    // Navigation Tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    // Sheep Form
    document.getElementById('sheepForm').addEventListener('submit', addSheep);

    // Filters
    document.getElementById('filterStatus').addEventListener('change', filterSheepTable);
    document.getElementById('filterType').addEventListener('change', filterSheepTable);
    document.getElementById('filterBreed').addEventListener('change', filterSheepTable);
    document.getElementById('searchSheep').addEventListener('input', filterSheepTable);

    // Finance Forms
    document.getElementById('incomeForm').addEventListener('submit', recordIncome);
    document.getElementById('expenseForm').addEventListener('submit', recordExpense);

    // Finance Tabs
    document.querySelectorAll('.finance-tab-btn').forEach(btn => {
        btn.addEventListener('click', switchFinanceTab);
    });

    // Health Form
    document.getElementById('healthForm').addEventListener('submit', addHealthRecord);

    // Edit Modal
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Edit Form Submit
    document.getElementById('editForm').addEventListener('submit', saveChanges);
    document.getElementById('deleteBtn').addEventListener('click', deleteSheep);

    // Export Buttons
    document.getElementById('exportInventory').addEventListener('click', exportInventoryCSV);
    document.getElementById('exportFinances').addEventListener('click', exportFinancesCSV);
    document.getElementById('exportHealth').addEventListener('click', exportHealthCSV);
    document.getElementById('printReport').addEventListener('click', printReport);
}

// Tab Switching
function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    e.target.classList.add('active');

    if (tabName === 'reports') {
        updateReports();
    }
}

// SHEEP INVENTORY MANAGEMENT

function addSheep(e) {
    e.preventDefault();
    
    const sheep = {
        id: Date.now(),
        sheepId: document.getElementById('sheepId').value,
        name: document.getElementById('sheepName').value || 'Unnamed',
        type: document.getElementById('sheepType').value,
        dob: document.getElementById('sheepDob').value,
        weight: parseFloat(document.getElementById('sheepWeight').value) || 0,
        value: parseFloat(document.getElementById('sheepValue').value),
        breed: document.getElementById('sheepBreed').value,
        status: document.getElementById('sheepStatus').value,
        dateAdded: new Date().toISOString()
    };

    sheepData.push(sheep);
    saveToLocalStorage();
    document.getElementById('sheepForm').reset();
    renderSheepTable();
    updateDashboard();
    updateHealthSheepDropdown();
    
    showNotification('Sheep added successfully!', 'success');
}

function renderSheepTable(data = sheepData) {
    const tbody = document.querySelector('#sheepTable tbody');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="10">No sheep added yet</td></tr>';
        return;
    }

    tbody.innerHTML = data.map(sheep => {
        const age = calculateAge(sheep.dob);
        const statusClass = `status-${sheep.status.toLowerCase().replace('-', '')}`;
        const typeClass = `type-${sheep.type.toLowerCase()}`;
        
        return `
            <tr>
                <td><strong>${sheep.sheepId}</strong></td>
                <td>${sheep.name}</td>
                <td><span class="type-badge ${typeClass}">${sheep.type}</span></td>
                <td>${sheep.breed}</td>
                <td>${age}</td>
                <td>${sheep.weight}</td>
                <td>$${sheep.value.toFixed(2)}</td>
                <td><span class="status-badge ${statusClass}">${sheep.status}</span></td>
                <td>${new Date(sheep.dob).toLocaleDateString()}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" onclick="openEditModal(${sheep.id})">Edit</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterSheepTable() {
    const status = document.getElementById('filterStatus').value;
    const type = document.getElementById('filterType').value;
    const breed = document.getElementById('filterBreed').value;
    const search = document.getElementById('searchSheep').value.toLowerCase();

    const filtered = sheepData.filter(sheep => {
        const matchStatus = !status || sheep.status === status;
        const matchType = !type || sheep.type === type;
        const matchBreed = !breed || sheep.breed === breed;
        const matchSearch = !search || 
                           sheep.sheepId.toLowerCase().includes(search) ||
                           sheep.name.toLowerCase().includes(search);
        
        return matchStatus && matchType && matchBreed && matchSearch;
    });

    renderSheepTable(filtered);
}

function openEditModal(sheepId) {
    const sheep = sheepData.find(s => s.id === sheepId);
    if (!sheep) return;

    editingIndex = sheepId;
    document.getElementById('editId').value = sheep.id;
    document.getElementById('editSheepId').value = sheep.sheepId;
    document.getElementById('editSheepName').value = sheep.name;
    document.getElementById('editSheepType').value = sheep.type;
    document.getElementById('editSheepDob').value = sheep.dob;
    document.getElementById('editSheepWeight').value = sheep.weight;
    document.getElementById('editSheepValue').value = sheep.value;
    document.getElementById('editSheepBreed').value = sheep.breed;
    document.getElementById('editSheepStatus').value = sheep.status;

    document.getElementById('editModal').style.display = 'block';
}

function saveChanges(e) {
    e.preventDefault();
    
    const index = sheepData.findIndex(s => s.id === editingIndex);
    if (index === -1) return;

    sheepData[index] = {
        ...sheepData[index],
        sheepId: document.getElementById('editSheepId').value,
        name: document.getElementById('editSheepName').value,
        type: document.getElementById('editSheepType').value,
        dob: document.getElementById('editSheepDob').value,
        weight: parseFloat(document.getElementById('editSheepWeight').value),
        value: parseFloat(document.getElementById('editSheepValue').value),
        breed: document.getElementById('editSheepBreed').value,
        status: document.getElementById('editSheepStatus').value
    };

    saveToLocalStorage();
    renderSheepTable();
    updateDashboard();
    updateHealthSheepDropdown();
    document.getElementById('editModal').style.display = 'none';
    showNotification('Sheep updated successfully!', 'success');
}

function deleteSheep() {
    if (!confirm('Are you sure you want to delete this sheep?')) return;

    sheepData = sheepData.filter(s => s.id !== editingIndex);
    saveToLocalStorage();
    renderSheepTable();
    updateDashboard();
    updateHealthSheepDropdown();
    document.getElementById('editModal').style.display = 'none';
    showNotification('Sheep deleted successfully!', 'success');
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age === 0) {
        const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        return `${days} days`;
    }
    
    return `${age} years`;
}

// FINANCIAL MANAGEMENT

function recordIncome(e) {
    e.preventDefault();

    const record = {
        id: Date.now(),
        type: 'Income',
        category: document.getElementById('incomeType').value,
        amount: parseFloat(document.getElementById('incomeAmount').value),
        date: document.getElementById('incomeDate').value,
        description: document.getElementById('incomeDescription').value,
        timestamp: new Date().toISOString()
    };

    financialData.push(record);
    saveToLocalStorage();
    document.getElementById('incomeForm').reset();
    renderFinancialTable();
    updateDashboard();
    updateReports();
    
    showNotification('Income recorded successfully!', 'success');
}

function recordExpense(e) {
    e.preventDefault();

    const record = {
        id: Date.now(),
        type: 'Expense',
        category: document.getElementById('expenseType').value,
        amount: parseFloat(document.getElementById('expenseAmount').value),
        date: document.getElementById('expenseDate').value,
        description: document.getElementById('expenseDescription').value,
        timestamp: new Date().toISOString()
    };

    financialData.push(record);
    saveToLocalStorage();
    document.getElementById('expenseForm').reset();
    renderFinancialTable();
    updateDashboard();
    updateReports();
    
    showNotification('Expense recorded successfully!', 'success');
}

function renderFinancialTable(filtered = null) {
    const tbody = document.querySelector('#financialTable tbody');
    const data = filtered || financialData;

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="7">No transactions recorded</td></tr>';
        return;
    }

    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let balance = 0;
    tbody.innerHTML = sortedData.map(record => {
        if (record.type === 'Income') {
            balance += record.amount;
        } else {
            balance -= record.amount;
        }

        const amountClass = record.type === 'Income' ? 'text-success' : 'text-danger';
        const sign = record.type === 'Income' ? '+' : '-';

        return `
            <tr>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.type}</td>
                <td>${record.category}</td>
                <td>${record.description}</td>
                <td class="${amountClass}"><strong>${sign}$${record.amount.toFixed(2)}</strong></td>
                <td>$${balance.toFixed(2)}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="deleteFinancialRecord(${record.id})">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

function switchFinanceTab(e) {
    const tab = e.target.dataset.financeTab;
    
    document.querySelectorAll('.finance-tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    let filtered = financialData;
    if (tab === 'income') {
        filtered = financialData.filter(r => r.type === 'Income');
    } else if (tab === 'expense') {
        filtered = financialData.filter(r => r.type === 'Expense');
    }

    renderFinancialTable(filtered);
}

function deleteFinancialRecord(recordId) {
    if (!confirm('Delete this transaction?')) return;
    
    financialData = financialData.filter(r => r.id !== recordId);
    saveToLocalStorage();
    renderFinancialTable();
    updateDashboard();
    updateReports();
    showNotification('Transaction deleted!', 'success');
}

// HEALTH RECORDS

function updateHealthSheepDropdown() {
    const select = document.getElementById('healthSheepId');
    select.innerHTML = '<option value="">Select Sheep</option>' + 
        sheepData.map(s => `<option value="${s.id}">${s.sheepId} - ${s.name}</option>`).join('');
}

function addHealthRecord(e) {
    e.preventDefault();

    const sheepId = document.getElementById('healthSheepId').value;
    const sheep = sheepData.find(s => s.id == sheepId);

    const record = {
        id: Date.now(),
        sheepId: sheepId,
        sheepName: sheep ? sheep.name : 'Unknown',
        sheepTag: sheep ? sheep.sheepId : 'Unknown',
        date: document.getElementById('healthDate').value,
        type: document.getElementById('healthType').value,
        description: document.getElementById('healthDescription').value,
        cost: parseFloat(document.getElementById('healthCost').value) || 0,
        notes: document.getElementById('healthNotes').value,
        timestamp: new Date().toISOString()
    };

    healthData.push(record);
    saveToLocalStorage();
    document.getElementById('healthForm').reset();
    renderHealthTable();
    updateDashboard();
    
    showNotification('Health record added!', 'success');
}

function renderHealthTable() {
    const tbody = document.querySelector('#healthTable tbody');

    if (healthData.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="8">No health records</td></tr>';
        return;
    }

    tbody.innerHTML = [...healthData].reverse().map(record => `
        <tr>
            <td>${record.sheepTag}</td>
            <td>${record.sheepName}</td>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.type}</td>
            <td>${record.description}</td>
            <td>$${record.cost.toFixed(2)}</td>
            <td>${record.notes}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteHealthRecord(${record.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function deleteHealthRecord(recordId) {
    if (!confirm('Delete this health record?')) return;
    
    healthData = healthData.filter(r => r.id !== recordId);
    saveToLocalStorage();
    renderHealthTable();
    updateDashboard();
    showNotification('Health record deleted!', 'success');
}

// DASHBOARD UPDATES

function updateDashboard() {
    // Sheep counts
    const totalSheep = sheepData.length;
    const activeSheep = sheepData.filter(s => s.status === 'Active').length;
    const males = sheepData.filter(s => s.type === 'Ram').length;
    const females = sheepData.filter(s => s.type === 'Ewe').length;
    const lambs = sheepData.filter(s => s.type === 'Lamb').length;

    // Financial calculations
    const totalIncome = financialData
        .filter(r => r.type === 'Income')
        .reduce((sum, r) => sum + r.amount, 0);
    
    const totalExpenses = financialData
        .filter(r => r.type === 'Expense')
        .reduce((sum, r) => sum + r.amount, 0);

    const totalValue = sheepData.reduce((sum, s) => sum + s.value, 0);
    const netProfit = totalIncome - totalExpenses;

    // Update UI
    document.getElementById('totalSheep').textContent = totalSheep;
    document.getElementById('totalValue').textContent = `$${totalValue.toFixed(2)}`;
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('totalMales').textContent = males;
    document.getElementById('totalFemales').textContent = females;
    document.getElementById('totalLambs').textContent = lambs;
    
    const profitElement = document.getElementById('netProfit');
    profitElement.textContent = `$${netProfit.toFixed(2)}`;
    profitElement.className = netProfit >= 0 ? 'stat-number' : 'stat-number text-danger';

    // Update summary section
    document.getElementById('summaryIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('summaryExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('summaryProfit').textContent = `$${netProfit.toFixed(2)}`;
    
    const margin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(2) : 0;
    document.getElementById('summaryMargin').textContent = `${margin}%`;
}

// REPORTS & CHARTS

function updateReports() {
    updateIncomeChart();
    updateExpenseChart();
    updateCategoryChart();
    updateTypeChart();
}

function getMonthlyData() {
    const months = {};
    
    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        months[monthKey] = { income: 0, expense: 0 };
    }

    financialData.forEach(record => {
        const date = new Date(record.date);
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        
        if (months[monthKey]) {
            if (record.type === 'Income') {
                months[monthKey].income += record.amount;
            } else {
                months[monthKey].expense += record.amount;
            }
        }
    });

    return months;
}

function updateIncomeChart() {
    const ctx = document.getElementById('incomeChart');
    if (!ctx) return;

    const monthlyData = getMonthlyData();
    const labels = Object.keys(monthlyData);
    const data = labels.map(m => monthlyData[m].income);

    ctx.innerHTML = '';
    const canvas = document.createElement('canvas');
    ctx.appendChild(canvas);
    
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Income',
                data: data,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            }
        }
    });
}

function updateExpenseChart() {
    const ctx = document.getElementById('expenseChart');
    if (!ctx) return;

    const monthlyData = getMonthlyData();
    const labels = Object.keys(monthlyData);
    const data = labels.map(m => monthlyData[m].expense);

    ctx.innerHTML = '';
    const canvas = document.createElement('canvas');
    ctx.appendChild(canvas);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Expenses',
                data: data,
                borderColor: '#f44336',
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            }
        }
    });
}

function updateCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const categories = {};
    financialData.filter(r => r.type === 'Expense').forEach(r => {
        categories[r.category] = (categories[r.category] || 0) + r.amount;
    });

    ctx.innerHTML = '';
    const canvas = document.createElement('canvas');
    ctx.appendChild(canvas);

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    '#667eea', '#764ba2', '#f093fb', '#4facfe',
                    '#00f2fe', '#43e97b', '#fa709a', '#fee140'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function updateTypeChart() {
    const ctx = document.getElementById('typeChart');
    if (!ctx) return;

    const types = {
        'Ram': sheepData.filter(s => s.type === 'Ram').length,
        'Ewe': sheepData.filter(s => s.type === 'Ewe').length,
        'Lamb': sheepData.filter(s => s.type === 'Lamb').length
    };

    ctx.innerHTML = '';
    const canvas = document.createElement('canvas');
    ctx.appendChild(canvas);

    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: ['Ram (Male)', 'Ewe (Female)', 'Lamb'],
            datasets: [{
                data: Object.values(types),
                backgroundColor: ['#667eea', '#ff9ff3', '#ffd93d']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function loadCharts() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js';
    script.onload = updateReports;
    document.head.appendChild(script);
}

// EXPORT FUNCTIONS

function exportInventoryCSV() {
    let csv = 'Sheep ID,Name,Type,Breed,Age,Weight (kg),Value ($),Status,Date of Birth\n';
    
    sheepData.forEach(sheep => {
        csv += `${sheep.sheepId},"${sheep.name}",${sheep.type},${sheep.breed},${calculateAge(sheep.dob)},${sheep.weight},${sheep.value},${sheep.status},${sheep.dob}\n`;
    });

    downloadCSV(csv, 'sheep_inventory.csv');
}

function exportFinancesCSV() {
    let csv = 'Date,Type,Category,Description,Amount ($)\n';
    
    const sorted = [...financialData].sort((a, b) => new Date(b.date) - new Date(a.date));
    sorted.forEach(record => {
        const amount = record.type === 'Income' ? record.amount : -record.amount;
        csv += `${record.date},${record.type},${record.category},"${record.description}",${amount}\n`;
    });

    downloadCSV(csv, 'financial_records.csv');
}

function exportHealthCSV() {
    let csv = 'Sheep ID,Name,Date,Type,Description,Cost ($),Notes\n';
    
    healthData.forEach(record => {
        csv += `${record.sheepTag},"${record.sheepName}",${record.date},${record.type},"${record.description}",${record.cost},"${record.notes}"\n`;
    });

    downloadCSV(csv, 'health_records.csv');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function printReport() {
    window.print();
}

// UTILITIES

function saveToLocalStorage() {
    localStorage.setItem('sheepData', JSON.stringify(sheepData));
    localStorage.setItem('financialData', JSON.stringify(financialData));
    localStorage.setItem('healthData', JSON.stringify(healthData));
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#667eea'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on load
renderSheepTable();
renderFinancialTable();
renderHealthTable();
updateHealthSheepDropdown();
updateDashboard();