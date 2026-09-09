# 🐑 Sheep Farm Management System

A complete web-based solution for managing sheep farm inventory, finances, and health records. Built with HTML, CSS, and JavaScript with local storage persistence.

## Features

### 📊 Dashboard
- Real-time overview of farm statistics
- Total sheep count by type (Ram, Ewe, Lamb)
- Inventory valuation
- Year-to-date income and expenses
- Net profit/loss tracking

### 🐑 Inventory Management
- Add and manage individual sheep records
- Track sheep by ID, name, breed, and type
- Monitor sheep status (Active, Pregnant, Nursing, Injured, Sold)
- Record weight and estimated value
- Filter by status, type, breed, or search by ID/name
- Edit sheep information
- Delete records

### 💰 Financial Management
- Record income transactions (wool sales, meat sales, breeding stock, etc.)
- Record expenses (feed, veterinary care, equipment, labor, etc.)
- Categorized transaction history
- Running balance calculation
- Filter by transaction type
- Delete transactions

### 🏥 Health Records
- Track vaccinations and treatments for each sheep
- Record check-ups and medical events
- Track medical costs
- Birth and death records
- Detailed notes for each health event
- Link health records to specific sheep

### 📈 Reports & Analytics
- Monthly income trends
- Monthly expense trends
- Expense category breakdown (pie chart)
- Sheep type distribution
- Year-to-date financial summary
- Profit margin calculation

### 📥 Data Export
- Export inventory to CSV
- Export financial records to CSV
- Export health records to CSV
- Print reports functionality

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Core functionality
- **Chart.js** - Data visualization
- **LocalStorage API** - Data persistence

## Installation

1. Clone the repository:
```bash
git clone https://github.com/muhammadzuhuuron/sheep-farm-management.git
cd sheep-farm-management
```

2. Open `index.html` in a modern web browser:
```bash
# Using Python
python -m http.server 8000
# Then visit http://localhost:8000

# Or simply double-click index.html
```

## Usage Guide

### Adding a Sheep
1. Navigate to the **Inventory** tab
2. Fill in the form with sheep details:
   - Sheep ID/Tag Number (required)
   - Name (optional)
   - Type (Ram, Ewe, or Lamb)
   - Date of Birth
   - Weight (kg)
   - Estimated Value ($)
   - Breed
   - Current Status
3. Click "Add Sheep"

### Recording Finances
1. Go to **Finances** tab
2. Use either "Record Income" or "Record Expense" form
3. Select category, amount, date, and description
4. Click the appropriate button

### Health Tracking
1. Navigate to **Health Records** tab
2. Select a sheep from the dropdown
3. Enter health event details
4. Specify type (Vaccination, Treatment, Check-up, Birth, Death)
5. Add cost and notes if applicable
6. Submit the form

### Viewing Reports
1. Click on **Reports** tab
2. View interactive charts for:
   - Monthly income trends
   - Monthly expense trends
   - Expense categories breakdown
   - Sheep type distribution
3. Check year-to-date summary
4. Export or print reports

### Filtering & Searching
- Use dropdown filters to filter by status, type, or breed
- Use the search box to find sheep by ID or name
- Switch between All/Income/Expense tabs in finances section

## Data Structure

### Sheep Object
```javascript
{
  id: timestamp,
  sheepId: "TAG-001",
  name: "Fluffy",
  type: "Ewe", // Ram, Ewe, or Lamb
  dob: "2022-03-15",
  weight: 45.5,
  value: 250.00,
  breed: "Merino",
  status: "Active", // Active, Pregnant, Nursing, Injured, Sold
  dateAdded: ISO8601 timestamp
}
```

### Financial Record Object
```javascript
{
  id: timestamp,
  type: "Income", // Income or Expense
  category: "Wool Sale",
  amount: 150.00,
  date: "2024-01-15",
  description: "Sold 10 kg wool",
  timestamp: ISO8601 timestamp
}
```

### Health Record Object
```javascript
{
  id: timestamp,
  sheepId: sheepObjectId,
  sheepName: "Fluffy",
  sheepTag: "TAG-001",
  date: "2024-01-15",
  type: "Vaccination",
  description: "Annual flu shot",
  cost: 25.00,
  notes: "No adverse reactions",
  timestamp: ISO8601 timestamp
}
```

## Local Storage

All data is stored in browser's localStorage:
- `sheepData` - Sheep inventory
- `financialData` - Financial transactions
- `healthData` - Health records

Data persists across browser sessions. To clear data, open browser DevTools and run:
```javascript
localStorage.clear();
```

## Features in Detail

### Sheep Breeds Supported
- Merino
- Dorper
- Hampshire
- Suffolk
- Corriedale
- Other

### Income Categories
- Wool Sale
- Meat Sale
- Breeding Stock Sale
- Milk Sale
- Other

### Expense Categories
- Feed & Grain
- Veterinary Care
- Medication
- Shelter Maintenance
- Equipment & Tools
- Labor
- Transportation
- Utilities
- Other

### Health Event Types
- Vaccination
- Treatment
- Check-up
- Birth
- Death

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- Optimized for up to 1000+ sheep records
- Real-time filtering and searching
- Efficient chart rendering
- Smooth animations and transitions

## Responsive Design

- Desktop optimized (1400px max-width)
- Tablet friendly
- Mobile responsive layout
- Touch-friendly buttons and controls

## Keyboard Shortcuts

- Tab through form fields for quick data entry
- Enter to submit forms
- Escape to close modals

## Data Backup

To backup your data:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Run: `copy(localStorage.getItem('sheepData'))`
4. Paste into a text file and save

To restore:
1. Open DevTools Console
2. Run: `localStorage.setItem('sheepData', 'YOUR_COPIED_DATA')`

## Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in browser
- Clear browser cache and reload
- Check browser storage quota

### Charts Not Displaying
- Ensure Chart.js loads from CDN (internet required)
- Check browser console for errors
- Refresh the page

### Missing Sheep in Dropdown
- Add sheep to inventory first
- Refresh the page to sync dropdown

## Future Enhancements

- Backend database integration (Firebase, MongoDB)
- User authentication and multi-farm support
- Mobile app version
- Advanced analytics and forecasting
- Breeding records and pedigree tracking
- Photo gallery for sheep records
- Weather integration
- Integration with veterinary databases
- QR code scanning for sheep identification
- API integration for market prices

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Support

For issues or questions, please open a GitHub issue or contact the developer.

## Changelog

### Version 1.0.0 (Initial Release)
- Complete sheep inventory management
- Financial transaction recording
- Health record tracking
- Interactive dashboard and reports
- CSV export functionality
- Responsive design

---

Made with ❤️ for sheep farmers