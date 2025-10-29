# PDU Dashboard - Data Center Power Monitoring

A comprehensive Power Distribution Unit (PDU) monitoring dashboard designed for data center operations. This dashboard provides real-time monitoring of critical PDU metrics with educational information panels explaining the importance of each measurement.

## 🚀 [Live Demo](https://stone98.github.io/PDU_Dashboard/)

Try the interactive dashboard with real-time simulated data from a live data center PDU.

## Features

### 🔋 **Power Monitoring**
- **Total Power Consumption**: Real-time power usage with capacity warnings
- **Input Voltage**: Voltage stability monitoring with range validation
- **Total Current**: Current load monitoring with overload protection
- **Power Factor**: Efficiency monitoring and optimization guidance

### 🌡️ **Environmental Monitoring**
- **Temperature**: PDU temperature monitoring for overheating prevention
- **Humidity**: Environmental humidity tracking for equipment protection
- **Frequency**: Power frequency monitoring for grid stability

### ⚡ **Circuit-Level Monitoring**
- Individual circuit current monitoring
- Load percentage calculations
- Status indicators for each circuit
- Support for up to 8 circuits (expandable)

### 🚨 **Alert System**
- Real-time threshold monitoring
- Visual status indicators (Normal/Warning/Critical)
- Active alerts panel with timestamps
- Color-coded status system

### 📚 **Educational Information Panel**
- **Why Monitor?**: Explains the importance of each metric
- **What to Look For**: Threshold tables and warning signs
- **Best Practices**: Industry recommendations
- **Troubleshooting**: Common issues and solutions

## Monitored Metrics

| Metric | Normal Range | Warning Threshold | Critical Threshold |
|--------|-------------|-------------------|-------------------|
| Power | < 25.6 kW | 25.6 - 30.4 kW | > 30.4 kW |
| Voltage | 200-240V | 195-205V, 235-245V | < 195V, > 245V |
| Current | < 50.4 A | 50.4 - 59.85 A | > 59.85 A |
| Temperature | < 35°C | 35-40°C | > 40°C |
| Humidity | 30-70% | 25-30%, 70-75% | < 25%, > 75% |
| Frequency | 49.5-50.5 Hz | 49-49.5, 50.5-51 Hz | < 49Hz, > 51Hz |
| Power Factor | > 0.95 | 0.85-0.95 | < 0.85 |

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. The dashboard will start with simulated data

### File Structure
```
PDU_Dashboard/
├── index.html          # Main dashboard page
├── styles.css          # Dashboard styling
├── script.js           # Dashboard functionality
└── README.md           # This documentation
```

## Usage

### Main Dashboard
- **Overview Cards**: Display key metrics with real-time updates
- **Circuit Status**: Monitor individual circuit loads and status
- **Environmental Status**: Track temperature, humidity, and power quality
- **Active Alerts**: View current warnings and critical alerts

### Information Panel
- Click the **ℹ️ info button** next to any metric
- Learn why each metric is important to monitor
- Understand what values to watch for
- Get best practices and troubleshooting tips
- Close panel by clicking the **✕** or clicking outside

### Status Indicators
- **🟢 Green**: Normal operation
- **🟡 Yellow**: Warning - attention required
- **🔴 Red**: Critical - immediate action needed

## Key Monitoring Areas

### 1. Power Consumption
- **Purpose**: Prevent overload conditions and manage capacity
- **Critical for**: Equipment safety, cost management, capacity planning
- **Watch for**: Trends approaching 80% capacity (25.6 kW)

### 2. Voltage Stability
- **Purpose**: Ensure stable power delivery to equipment
- **Critical for**: Equipment protection, performance optimization
- **Watch for**: Fluctuations outside 200-240V range

### 3. Current Monitoring
- **Purpose**: Prevent circuit overloading and overheating
- **Critical for**: Fire prevention, circuit protection
- **Watch for**: Individual circuits approaching 80% capacity

### 4. Temperature Control
- **Purpose**: Prevent overheating and equipment damage
- **Critical for**: Equipment longevity, fire prevention
- **Watch for**: Temperatures above 35°C

### 5. Environmental Conditions
- **Purpose**: Maintain optimal operating environment
- **Critical for**: Equipment reliability, corrosion prevention
- **Watch for**: Humidity outside 30-70% range

## Customization

### Modifying Thresholds
Edit the `thresholds` object in `script.js`:
```javascript
this.thresholds = {
    power: { warning: 25.6, critical: 30.4 },
    voltage: { low: 200, high: 240 },
    // ... other thresholds
};
```

### Adding Circuits
Modify the `circuitNames` array in the `generateCircuits()` method:
```javascript
const circuitNames = [
    'Server Rack A1-A5', 
    'Server Rack A6-A10',
    // Add more circuits here
];
```

### Updating Information Content
Edit the `infoPanelData` object in `script.js` to modify the educational content.

## Data Simulation

The dashboard includes realistic data simulation for demonstration:
- Values fluctuate within realistic ranges
- Occasional threshold violations for testing alerts
- Updates every 2 seconds
- Simulates real-world data center conditions

## Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## Responsive Design

The dashboard is fully responsive and works on:
- 🖥️ Desktop computers
- 💻 Laptops
- 📱 Tablets
- 📱 Mobile phones

## Security Considerations

For production deployment:
- Implement proper authentication
- Use HTTPS for secure communication
- Validate all data inputs
- Implement rate limiting
- Add access logging

## License

This project is provided as-is for educational and demonstration purposes.

## Support

For questions or issues:
1. Check the information panels for monitoring guidance
2. Review the threshold tables for normal operating ranges
3. Consult data center best practices documentation

---

**⚠️ Important**: This is a demonstration dashboard with simulated data. For production use, integrate with your actual PDU monitoring system and implement proper security measures.