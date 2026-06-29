/**
 * AegisCloud Command Center Engine
 * Client-Side Core State & Logic Module
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. NODE SELECTORS MAP
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const counterValue = document.getElementById('counterValue');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const loadMessage = document.getElementById('loadMessage');
    const logEventBtn = document.getElementById('logEventBtn');
    const clearLogBtn = document.getElementById('clearLogBtn');
    const activityLog = document.getElementById('activityLog');
    const statusToggleCheckbox = document.getElementById('statusToggleCheckbox');
    const systemStatusBadge = document.getElementById('systemStatusBadge');
    const podCounterLabel = document.getElementById('podCounterLabel');
    const memoryBar = document.getElementById('memoryBar');
    const memoryPercentageLabel = document.getElementById('memoryPercentageLabel');
    const cpuBar = document.getElementById('cpuBar');
    const cpuLoadLabel = document.getElementById('cpuLoadLabel');
    const liveClock = document.getElementById('liveClock');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');

    // System Central Volatile State
    let trafficIndex = 0;

    // Live Real-Time Clock Engine
    setInterval(() => {
        const timestamp = new Date().toTimeString().split(' ')[0] + ' UTC';
        liveClock.textContent = timestamp;
    }, 1000);

    // ==========================================================================
    // 2. INPUT-PROCESS-OUTPUT PIPELINE LOGIC
    // ==========================================================================
    
    // Telemetry Event Broadcaster Pipeline (Log Factory)
    function appendTelemetryLog(statusType, systemMessage) {
        const emptyState = activityLog.querySelector('.empty-state');
        if (emptyState) emptyState.remove();

        const timeStamp = new Date().toISOString().slice(11, 19);
        const logNode = document.createElement('li');
        
        let statusStyle = 'color: var(--primary-color); font-weight: bold;';
        if (statusType === 'WARN') statusStyle = 'color: #eab308; font-weight: bold;';
        if (statusType === 'CRIT') statusStyle = 'color: #ef4444; font-weight: bold;';
        if (statusType === 'EXEC') statusStyle = 'color: var(--accent-color); font-weight: bold;';

        logNode.innerHTML = `<span style="${statusStyle}">[${timeStamp}] [SYS_${statusType}]</span> ${systemMessage}`;
        activityLog.insertBefore(logNode, activityLog.firstChild);
    }

    // Dynamic State Optimization Engine (Processes mutations across elements)
    function runStateOptimizationCycle() {
        counterValue.textContent = trafficIndex;
        
        // Reactive calculation mutations for complex layout presentation
        let memoryAllocation = 25 + (trafficIndex * 4);
        memoryAllocation = Math.max(5, Math.min(100, memoryAllocation));
        
        memoryBar.style.width = `${memoryAllocation}%`;
        memoryPercentageLabel.textContent = `${memoryAllocation}%`;

        // Interactive threshold evaluation logic
        if (trafficIndex === 0) {
            counterValue.style.color = 'var(--primary-color)';
            loadMessage.textContent = 'System is running in an idle, baseline optimized state.';
            loadMessage.style.color = 'var(--text-muted)';
            cpuBar.style.width = '12%';
            cpuLoadLabel.textContent = 'Optimal';
            cpuLoadLabel.style.color = 'var(--text-muted)';
        } else if (trafficIndex > 0 && trafficIndex <= 5) {
            counterValue.style.color = 'var(--accent-color)';
            loadMessage.textContent = 'Standard operating request load detected. Container pools balancing.';
            loadMessage.style.color = 'var(--accent-color)';
            cpuBar.style.width = '35%';
            cpuLoadLabel.textContent = 'Normal';
            cpuLoadLabel.style.color = 'var(--accent-color)';
        } else if (trafficIndex > 5) {
            counterValue.style.color = '#eab308';
            loadMessage.textContent = 'High cluster request threshold. Auto-scale policies initialized.';
            loadMessage.style.color = '#eab308';
            cpuBar.style.width = '78%';
            cpuLoadLabel.textContent = 'Spike Alert';
            cpuLoadLabel.style.color = '#eab308';
        } else {
            counterValue.style.color = '#ef4444';
            loadMessage.textContent = 'Negative load indexing or channel throttling sequence initialized.';
            loadMessage.style.color = '#ef4444';
            cpuBar.style.width = '8%';
            cpuLoadLabel.textContent = 'Throttled';
            cpuLoadLabel.style.color = '#ef4444';
        }
    }

    // ==========================================================================
    // 3. EVENT LISTENERS ROUTING MATRIX
    // ==========================================================================

    // SPA Functional Router Toggling
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetSegment = link.getAttribute('data-page');
            
            navLinks.forEach(btn => btn.classList.remove('active'));
            pageViews.forEach(view => view.classList.remove('active'));
            
            link.classList.add('active');
            document.getElementById(`page-${targetSegment}`).classList.add('active');
            
            appendTelemetryLog('INFO', `Viewport rendering context shifted to layout cluster: "${targetSegment.toUpperCase()}"`);
        });
    });

    // Traffic Scaler Core Events
    increaseBtn.addEventListener('click', () => {
        trafficIndex++;
        runStateOptimizationCycle();
        appendTelemetryLog('EXEC', `Traffic scaled up. Current Index value processed: ${trafficIndex}`);
    });

    decreaseBtn.addEventListener('click', () => {
        trafficIndex--;
        runStateOptimizationCycle();
        appendTelemetryLog('EXEC', `Traffic scaled down. Current Index value processed: ${trafficIndex}`);
    });

    resetBtn.addEventListener('click', () => {
        trafficIndex = 0;
        runStateOptimizationCycle();
        appendTelemetryLog('WARN', 'Cluster queue optimization table restored to baseline limits.');
    });

    // Simulated Cyber Threat Attacks / Injection Packets
    logEventBtn.addEventListener('click', () => {
        const anomalies = [
            'DDoS threshold alert detected on Router Node C.',
            'Unauthorized handshake request intercepted from external IP.',
            'SSL/TLS certificate handshake verified successfully.',
            'Heap garbage collection routine cleared 24MB volatile allocation.'
        ];
        const selectedThreat = anomalies[Math.floor(Math.random() * anomalies.length)];
        const threatLevel = selectedThreat.includes('alert') || selectedThreat.includes('Unauthorized') ? 'CRIT' : 'INFO';
        
        appendTelemetryLog(threatLevel, `NETWORK_MONITOR: ${selectedThreat}`);
    });

    clearLogBtn.addEventListener('click', () => {
        activityLog.innerHTML = '<li class="empty-state">System event stream is empty. Interact with controls to broadcast telemetry data.</li>';
    });

    // Hardware Interface Safety Protocol Toggle Switch
    statusToggleCheckbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            systemStatusBadge.textContent = 'ISOLATED / OFFLINE';
            systemStatusBadge.className = 'badge badge-danger';
            podCounterLabel.textContent = '0 Pods Standby';
            appendTelemetryLog('CRIT', 'SECURITY NOTICE: Automated gateway routing matrix isolated from public access lines.');
        } else {
            systemStatusBadge.textContent = 'Operational';
            systemStatusBadge.className = 'badge badge-success';
            podCounterLabel.textContent = '12 Active Pods';
            appendTelemetryLog('INFO', 'SYSTEM UPDATE: Network topology restored to default production routing matrix.');
        }
    });

    // Global System Theme Toggler
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        if (activeTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.textContent = 'Toggle Dark Mode';
            appendTelemetryLog('INFO', 'THEME_ENGINE: Mutated variables to default system light layout mapping.');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = 'Toggle Light Mode';
            appendTelemetryLog('INFO', 'THEME_ENGINE: Mutated variables to enterprise charcoal dark layout mapping.');
        }
    });
});