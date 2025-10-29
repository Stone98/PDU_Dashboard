// PDU Dashboard JavaScript
class PDUDashboard {
    constructor() {
        this.data = {
            totalPower: 0,
            inputVoltage: 0,
            totalCurrent: 0,
            temperature: 0,
            humidity: 0,
            frequency: 0,
            powerFactor: 0,
            circuits: [],
            alerts: []
        };

        this.thresholds = {
            power: { warning: 25.6, critical: 30.4 }, // 80% and 95% of 32kW
            voltage: { low: 200, high: 240 },
            current: { warning: 50.4, critical: 59.85 }, // 80% and 95% of 63A
            temperature: { warning: 35, critical: 40 },
            humidity: { low: 30, high: 70 },
            frequency: { low: 49.5, high: 50.5 },
            powerFactor: { warning: 0.85 }
        };

        this.infoPanelData = {
            power: {
                title: "Total Power Consumption",
                content: `
                    <h4>Why Monitor Power?</h4>
                    <p>Power consumption monitoring is critical for:</p>
                    <ul>
                        <li><strong>Capacity Planning:</strong> Ensures you don't exceed PDU capacity</li>
                        <li><strong>Cost Management:</strong> Tracks energy usage for billing and efficiency</li>
                        <li><strong>Safety:</strong> Prevents overload conditions that can cause fires</li>
                        <li><strong>Equipment Protection:</strong> Overloaded circuits can damage expensive equipment</li>
                    </ul>
                    
                    <h4>What to Look For:</h4>
                    <table class="threshold-table">
                        <tr><th>Status</th><th>Power Level</th><th>Action Required</th></tr>
                        <tr><td>Normal</td><td>< 25.6 kW</td><td>Continue monitoring</td></tr>
                        <tr><td>Warning</td><td>25.6 - 30.4 kW</td><td>Plan load redistribution</td></tr>
                        <tr><td>Critical</td><td>> 30.4 kW</td><td>Immediate action required</td></tr>
                    </table>
                    
                    <h4>Best Practices:</h4>
                    <ul>
                        <li>Keep power usage below 80% of rated capacity</li>
                        <li>Monitor trends to predict capacity needs</li>
                        <li>Balance loads across phases when possible</li>
                    </ul>
                `
            },
            voltage: {
                title: "Input Voltage Monitoring",
                content: `
                    <h4>Why Monitor Voltage?</h4>
                    <p>Voltage monitoring is essential for:</p>
                    <ul>
                        <li><strong>Equipment Protection:</strong> Prevents damage from voltage fluctuations</li>
                        <li><strong>Performance:</strong> Ensures optimal equipment operation</li>
                        <li><strong>Power Quality:</strong> Maintains stable power delivery</li>
                        <li><strong>Early Warning:</strong> Detects utility power issues</li>
                    </ul>
                    
                    <h4>What to Look For:</h4>
                    <table class="threshold-table">
                        <tr><th>Status</th><th>Voltage Range</th><th>Impact</th></tr>
                        <tr><td>Normal</td><td>200-240V</td><td>Optimal operation</td></tr>
                        <tr><td>Low</td><td>< 200V</td><td>Equipment underperformance</td></tr>
                        <tr><td>High</td><td>> 240V</td><td>Risk of equipment damage</td></tr>
                    </table>
                    
                    <h4>Common Causes of Voltage Issues:</h4>
                    <ul>
                        <li>Utility grid fluctuations</li>
                        <li>Transformer problems</li>
                        <li>Overloaded circuits</li>
                        <li>Poor electrical connections</li>
                    </ul>
                `
            },
            current: {
                title: "Current Monitoring",
                content: `
                    <h4>Why Monitor Current?</h4>
                    <p>Current monitoring helps with:</p>
                    <ul>
                        <li><strong>Load Management:</strong> Prevents circuit overloading</li>
                        <li><strong>Safety:</strong> High current can cause overheating and fires</li>
                        <li><strong>Efficiency:</strong> Optimal current levels improve power efficiency</li>
                        <li><strong>Predictive Maintenance:</strong> Current spikes indicate equipment issues</li>
                    </ul>
                    
                    <h4>What to Look For:</h4>
                    <table class="threshold-table">
                        <tr><th>Status</th><th>Current Level</th><th>Action</th></tr>
                        <tr><td>Normal</td><td>< 50.4 A</td><td>Normal operation</td></tr>
                        <tr><td>Warning</td><td>50.4 - 59.85 A</td><td>Consider load balancing</td></tr>
                        <tr><td>Critical</td><td>> 59.85 A</td><td>Immediate load reduction</td></tr>
                    </table>
                    
                    <h4>Safety Considerations:</h4>
                    <ul>
                        <li>High current causes heat buildup</li>
                        <li>Can damage circuit breakers</li>
                        <li>May cause insulation breakdown</li>
                        <li>Fire risk at extreme levels</li>
                    </ul>
                `
            },
            temperature: {
                title: "Temperature Monitoring",
                content: `
                    <h4>Why Monitor Temperature?</h4>
                    <p>Temperature monitoring is crucial for:</p>
                    <ul>
                        <li><strong>Equipment Longevity:</strong> Heat reduces component lifespan</li>
                        <li><strong>Safety:</strong> Overheating can cause fires</li>
                        <li><strong>Performance:</strong> High temperatures degrade efficiency</li>
                        <li><strong>Cooling Efficiency:</strong> Monitors HVAC effectiveness</li>
                    </ul>
                    
                    <h4>What to Look For:</h4>
                    <table class="threshold-table">
                        <tr><th>Status</th><th>Temperature</th><th>Action Required</th></tr>
                        <tr><td>Normal</td><td>< 35°C</td><td>Continue monitoring</td></tr>
                        <tr><td>Warning</td><td>35-40°C</td><td>Check cooling systems</td></tr>
                        <tr><td>Critical</td><td>> 40°C</td><td>Emergency cooling needed</td></tr>
                    </table>
                    
                    <h4>Temperature Management:</h4>
                    <ul>
                        <li>Ensure proper airflow around PDU</li>
                        <li>Check HVAC system operation</li>
                        <li>Monitor for blocked vents</li>
                        <li>Consider load reduction if overheating</li>
                    </ul>
                `
            },
            humidity: {
                title: "Humidity Monitoring",
                content: `
                    <h4>Why Monitor Humidity?</h4>
                    <p>Humidity control is important for:</p>
                    <ul>
                        <li><strong>Corrosion Prevention:</strong> High humidity causes metal corrosion</li>
                        <li><strong>Static Control:</strong> Low humidity increases static electricity</li>
                        <li><strong>Equipment Protection:</strong> Extreme humidity damages electronics</li>
                        <li><strong>Condensation Prevention:</strong> Prevents water damage</li>
                    </ul>
                    
                    <h4>Optimal Range:</h4>
                    <p>Data centers should maintain humidity between 30-70% relative humidity (RH).</p>
                    
                    <h4>Issues to Watch For:</h4>
                    <ul>
                        <li><strong>High Humidity (>70%):</strong> Condensation, corrosion risk</li>
                        <li><strong>Low Humidity (<30%):</strong> Static electricity, component damage</li>
                        <li><strong>Rapid Changes:</strong> HVAC system problems</li>
                    </ul>
                `
            },
            frequency: {
                title: "Frequency Monitoring",
                content: `
                    <h4>Why Monitor Frequency?</h4>
                    <p>Power frequency monitoring indicates:</p>
                    <ul>
                        <li><strong>Grid Stability:</strong> Frequency reflects utility grid health</li>
                        <li><strong>Power Quality:</strong> Stable frequency ensures proper equipment operation</li>
                        <li><strong>Generator Health:</strong> Frequency drift indicates generator issues</li>
                        <li><strong>Load Balance:</strong> Heavy loads can affect frequency</li>
                    </ul>
                    
                    <h4>Normal Operating Range:</h4>
                    <p>Standard power frequency should be 50Hz ±0.5Hz (Europe/Asia) or 60Hz ±0.5Hz (North America).</p>
                    
                    <h4>Frequency Issues:</h4>
                    <ul>
                        <li><strong>High Frequency:</strong> Generator over-speed, light load</li>
                        <li><strong>Low Frequency:</strong> Generator under-speed, heavy load</li>
                        <li><strong>Instability:</strong> Poor governor control, grid issues</li>
                    </ul>
                `
            },
            powerfactor: {
                title: "Power Factor Monitoring",
                content: `
                    <h4>Why Monitor Power Factor?</h4>
                    <p>Power factor monitoring helps with:</p>
                    <ul>
                        <li><strong>Efficiency:</strong> Poor power factor wastes energy</li>
                        <li><strong>Cost Control:</strong> Utilities may charge penalties for low power factor</li>
                        <li><strong>Capacity Utilization:</strong> Better power factor increases usable capacity</li>
                        <li><strong>Equipment Sizing:</strong> Affects electrical system design</li>
                    </ul>
                    
                    <h4>Power Factor Scale:</h4>
                    <table class="threshold-table">
                        <tr><th>Power Factor</th><th>Status</th><th>Efficiency</th></tr>
                        <tr><td>0.95 - 1.0</td><td>Excellent</td><td>Very High</td></tr>
                        <tr><td>0.85 - 0.95</td><td>Good</td><td>Acceptable</td></tr>
                        <tr><td>< 0.85</td><td>Poor</td><td>Inefficient</td></tr>
                    </table>
                    
                    <h4>Improving Power Factor:</h4>
                    <ul>
                        <li>Install power factor correction capacitors</li>
                        <li>Use high-efficiency equipment</li>
                        <li>Balance inductive and capacitive loads</li>
                        <li>Regular maintenance of motors and transformers</li>
                    </ul>
                `
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateCircuits();
        this.startDataSimulation();
        this.updateLastUpdateTime();
        
        // Update time every second
        setInterval(() => this.updateLastUpdateTime(), 1000);
    }

    setupEventListeners() {
        // Info button click handlers
        document.querySelectorAll('.info-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const infoType = e.currentTarget.getAttribute('data-info');
                this.showInfoPanel(infoType);
            });
        });

        // Close info panel
        document.getElementById('closeInfoPanel').addEventListener('click', () => {
            this.hideInfoPanel();
        });

        document.getElementById('infoOverlay').addEventListener('click', () => {
            this.hideInfoPanel();
        });
    }

    generateCircuits() {
        const circuitsGrid = document.getElementById('circuitsGrid');
        const circuitNames = [
            'Server Rack A1-A5', 'Server Rack A6-A10', 'Server Rack B1-B5', 'Server Rack B6-B10',
            'Network Equipment', 'Storage Arrays', 'Cooling System', 'Lighting & Misc'
        ];

        circuitNames.forEach((name, index) => {
            const circuit = document.createElement('div');
            circuit.className = 'circuit-card fade-in';
            circuit.innerHTML = `
                <div class="circuit-header">
                    <span class="circuit-name">${name}</span>
                    <span class="circuit-status status-online" id="circuit-status-${index}"></span>
                </div>
                <div class="circuit-current" id="circuit-current-${index}">0.0 A</div>
                <div class="circuit-load" id="circuit-load-${index}">Load: 0%</div>
            `;
            circuitsGrid.appendChild(circuit);
        });

        // Initialize circuit data
        this.data.circuits = circuitNames.map((name, index) => ({
            id: index,
            name,
            current: 0,
            maxCurrent: 15, // 15A per circuit
            status: 'normal'
        }));
    }

    startDataSimulation() {
        // Initial values
        this.data.totalPower = 18.5;
        this.data.inputVoltage = 220;
        this.data.totalCurrent = 42.3;
        this.data.temperature = 28;
        this.data.humidity = 45;
        this.data.frequency = 50.0;
        this.data.powerFactor = 0.92;

        // Start simulation
        setInterval(() => {
            this.simulateDataChanges();
            this.updateDisplay();
            this.checkThresholds();
        }, 2000);

        // Initial display update
        this.updateDisplay();
    }

    simulateDataChanges() {
        // Simulate realistic data changes
        this.data.totalPower += (Math.random() - 0.5) * 0.5;
        this.data.totalPower = Math.max(15, Math.min(32, this.data.totalPower));

        this.data.inputVoltage += (Math.random() - 0.5) * 2;
        this.data.inputVoltage = Math.max(195, Math.min(245, this.data.inputVoltage));

        this.data.totalCurrent += (Math.random() - 0.5) * 1;
        this.data.totalCurrent = Math.max(30, Math.min(63, this.data.totalCurrent));

        this.data.temperature += (Math.random() - 0.5) * 0.5;
        this.data.temperature = Math.max(20, Math.min(45, this.data.temperature));

        this.data.humidity += (Math.random() - 0.5) * 2;
        this.data.humidity = Math.max(25, Math.min(75, this.data.humidity));

        this.data.frequency += (Math.random() - 0.5) * 0.1;
        this.data.frequency = Math.max(49, Math.min(51, this.data.frequency));

        this.data.powerFactor += (Math.random() - 0.5) * 0.02;
        this.data.powerFactor = Math.max(0.8, Math.min(1.0, this.data.powerFactor));

        // Update circuit data
        this.data.circuits.forEach(circuit => {
            circuit.current += (Math.random() - 0.5) * 0.5;
            circuit.current = Math.max(0, Math.min(circuit.maxCurrent, circuit.current));
        });
    }

    updateDisplay() {
        // Update main metrics
        document.getElementById('totalPower').textContent = this.data.totalPower.toFixed(1);
        document.getElementById('inputVoltage').textContent = this.data.inputVoltage.toFixed(0);
        document.getElementById('totalCurrent').textContent = this.data.totalCurrent.toFixed(1);
        document.getElementById('temperature').textContent = this.data.temperature.toFixed(1);
        document.getElementById('humidity').textContent = this.data.humidity.toFixed(0);
        document.getElementById('frequency').textContent = this.data.frequency.toFixed(1);
        document.getElementById('powerFactor').textContent = this.data.powerFactor.toFixed(2);

        // Update circuit displays
        this.data.circuits.forEach(circuit => {
            const currentElement = document.getElementById(`circuit-current-${circuit.id}`);
            const loadElement = document.getElementById(`circuit-load-${circuit.id}`);
            const statusElement = document.getElementById(`circuit-status-${circuit.id}`);

            if (currentElement) {
                currentElement.textContent = `${circuit.current.toFixed(1)} A`;
                const loadPercent = (circuit.current / circuit.maxCurrent * 100).toFixed(0);
                loadElement.textContent = `Load: ${loadPercent}%`;

                // Update status indicator
                statusElement.className = `circuit-status ${this.getStatusClass(circuit.current, circuit.maxCurrent * 0.8, circuit.maxCurrent * 0.95)}`;
            }
        });
    }

    checkThresholds() {
        this.data.alerts = [];

        // Check power
        const powerStatus = this.checkThreshold(this.data.totalPower, this.thresholds.power.warning, this.thresholds.power.critical);
        document.getElementById('powerStatus').textContent = this.capitalizeFirst(powerStatus);
        document.getElementById('powerStatus').className = `metric-status status-${powerStatus}`;

        if (powerStatus !== 'normal') {
            this.data.alerts.push({
                type: powerStatus,
                title: 'Power Consumption Alert',
                description: `Total power consumption is ${this.data.totalPower.toFixed(1)} kW`,
                time: new Date().toLocaleTimeString()
            });
        }

        // Check voltage
        const voltageStatus = this.checkVoltageThreshold(this.data.inputVoltage);
        document.getElementById('voltageStatus').textContent = this.capitalizeFirst(voltageStatus);
        document.getElementById('voltageStatus').className = `metric-status status-${voltageStatus}`;

        if (voltageStatus !== 'normal') {
            this.data.alerts.push({
                type: voltageStatus,
                title: 'Voltage Alert',
                description: `Input voltage is ${this.data.inputVoltage.toFixed(0)} V`,
                time: new Date().toLocaleTimeString()
            });
        }

        // Check current
        const currentStatus = this.checkThreshold(this.data.totalCurrent, this.thresholds.current.warning, this.thresholds.current.critical);
        document.getElementById('currentStatus').textContent = this.capitalizeFirst(currentStatus);
        document.getElementById('currentStatus').className = `metric-status status-${currentStatus}`;

        if (currentStatus !== 'normal') {
            this.data.alerts.push({
                type: currentStatus,
                title: 'Current Alert',
                description: `Total current is ${this.data.totalCurrent.toFixed(1)} A`,
                time: new Date().toLocaleTimeString()
            });
        }

        // Check temperature
        const tempStatus = this.checkThreshold(this.data.temperature, this.thresholds.temperature.warning, this.thresholds.temperature.critical);
        document.getElementById('temperatureStatus').textContent = this.capitalizeFirst(tempStatus);
        document.getElementById('temperatureStatus').className = `metric-status status-${tempStatus}`;

        if (tempStatus !== 'normal') {
            this.data.alerts.push({
                type: tempStatus,
                title: 'Temperature Alert',
                description: `PDU temperature is ${this.data.temperature.toFixed(1)}°C`,
                time: new Date().toLocaleTimeString()
            });
        }

        // Check humidity
        const humidityStatus = this.checkHumidityThreshold(this.data.humidity);
        document.getElementById('humidityStatus').textContent = this.capitalizeFirst(humidityStatus);
        document.getElementById('humidityStatus').className = `metric-status status-${humidityStatus}`;

        // Check frequency
        const frequencyStatus = this.checkFrequencyThreshold(this.data.frequency);
        document.getElementById('frequencyStatus').textContent = this.capitalizeFirst(frequencyStatus);
        document.getElementById('frequencyStatus').className = `metric-status status-${frequencyStatus}`;

        // Check power factor
        const pfStatus = this.checkPowerFactorThreshold(this.data.powerFactor);
        document.getElementById('powerFactorStatus').textContent = this.capitalizeFirst(pfStatus);
        document.getElementById('powerFactorStatus').className = `metric-status status-${pfStatus}`;

        this.updateAlerts();
    }

    checkThreshold(value, warning, critical) {
        if (value >= critical) return 'critical';
        if (value >= warning) return 'warning';
        return 'normal';
    }

    checkVoltageThreshold(voltage) {
        if (voltage < this.thresholds.voltage.low || voltage > this.thresholds.voltage.high) {
            return 'critical';
        }
        if (voltage < this.thresholds.voltage.low + 5 || voltage > this.thresholds.voltage.high - 5) {
            return 'warning';
        }
        return 'normal';
    }

    checkHumidityThreshold(humidity) {
        if (humidity < this.thresholds.humidity.low || humidity > this.thresholds.humidity.high) {
            return 'warning';
        }
        return 'normal';
    }

    checkFrequencyThreshold(frequency) {
        if (frequency < this.thresholds.frequency.low || frequency > this.thresholds.frequency.high) {
            return 'critical';
        }
        return 'normal';
    }

    checkPowerFactorThreshold(pf) {
        if (pf < this.thresholds.powerFactor.warning) {
            return 'warning';
        }
        return 'normal';
    }

    getStatusClass(current, warning, critical) {
        if (current >= critical) return 'status-critical';
        if (current >= warning) return 'status-warning';
        return 'status-online';
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    updateAlerts() {
        const alertsContainer = document.getElementById('alertsContainer');
        
        if (this.data.alerts.length === 0) {
            alertsContainer.innerHTML = '<p class="text-center" style="color: #00ff88; padding: 2rem;">No active alerts - All systems operating normally</p>';
            return;
        }

        alertsContainer.innerHTML = this.data.alerts.map(alert => `
            <div class="alert-item alert-${alert.type} fade-in">
                <div class="alert-icon">
                    <i class="fas fa-${alert.type === 'critical' ? 'exclamation-triangle' : 'exclamation-circle'}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-description">${alert.description}</div>
                </div>
                <div class="alert-time">${alert.time}</div>
            </div>
        `).join('');
    }

    showInfoPanel(infoType) {
        const panel = document.getElementById('infoPanel');
        const overlay = document.getElementById('infoOverlay');
        const title = document.getElementById('infoTitle');
        const body = document.getElementById('infoBody');

        const info = this.infoPanelData[infoType];
        if (info) {
            title.textContent = info.title;
            body.innerHTML = info.content;
            
            panel.classList.add('active');
            overlay.classList.add('active');
        }
    }

    hideInfoPanel() {
        const panel = document.getElementById('infoPanel');
        const overlay = document.getElementById('infoOverlay');
        
        panel.classList.remove('active');
        overlay.classList.remove('active');
    }

    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById('lastUpdate').textContent = timeString;
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PDUDashboard();
});

// Add some utility functions for potential future enhancements
const Utils = {
    formatBytes: (bytes) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    generateUUID: () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};