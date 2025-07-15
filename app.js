// Application data
const appData = {
  "projects": [
    {
      "id": 1,
      "name": "E-commerce Platform",
      "status": "deployed",
      "deployedAt": "2024-01-15T10:30:00Z",
      "branch": "main",
      "commits": 42,
      "performance": 98,
      "visitors": 15420,
      "url": "https://ecommerce-platform.vercel.app"
    },
    {
      "id": 2,
      "name": "Marketing Dashboard",
      "status": "building",
      "deployedAt": "2024-01-14T16:20:00Z",
      "branch": "develop",
      "commits": 28,
      "performance": 85,
      "visitors": 8230,
      "url": "https://marketing-dash.vercel.app"
    },
    {
      "id": 3,
      "name": "Mobile App API",
      "status": "error",
      "deployedAt": "2024-01-13T14:15:00Z",
      "branch": "main",
      "commits": 67,
      "performance": 45,
      "visitors": 2100,
      "url": "https://mobile-api.vercel.app"
    },
    {
      "id": 4,
      "name": "Portfolio Website",
      "status": "deployed",
      "deployedAt": "2024-01-12T09:45:00Z",
      "branch": "main",
      "commits": 15,
      "performance": 95,
      "visitors": 5680,
      "url": "https://portfolio-site.vercel.app"
    },
    {
      "id": 5,
      "name": "Blog Platform",
      "status": "deploying",
      "deployedAt": "2024-01-11T11:30:00Z",
      "branch": "feature/cms",
      "commits": 33,
      "performance": 78,
      "visitors": 12340,
      "url": "https://blog-platform.vercel.app"
    }
  ],
  "deployments": [
    {
      "id": 1,
      "projectId": 1,
      "status": "completed",
      "duration": "2m 45s",
      "timestamp": "2024-01-15T10:30:00Z",
      "commit": "feat: add payment integration",
      "branch": "main"
    },
    {
      "id": 2,
      "projectId": 2,
      "status": "in_progress",
      "duration": "1m 20s",
      "timestamp": "2024-01-15T11:45:00Z",
      "commit": "fix: dashboard responsiveness",
      "branch": "develop"
    },
    {
      "id": 3,
      "projectId": 3,
      "status": "failed",
      "duration": "0m 45s",
      "timestamp": "2024-01-15T09:15:00Z",
      "commit": "update: API endpoints",
      "branch": "main"
    }
  ],
  "metrics": {
    "totalProjects": 12,
    "activeDeployments": 3,
    "successRate": 94.5,
    "avgBuildTime": "2m 15s",
    "totalRequests": 1250000,
    "errorRate": 0.02,
    "responseTime": 145,
    "uptime": 99.9
  },
  "analytics": {
    "visitors": [
      { "date": "2024-01-09", "count": 1200 },
      { "date": "2024-01-10", "count": 1450 },
      { "date": "2024-01-11", "count": 1800 },
      { "date": "2024-01-12", "count": 1650 },
      { "date": "2024-01-13", "count": 2100 },
      { "date": "2024-01-14", "count": 1900 },
      { "date": "2024-01-15", "count": 2300 }
    ],
    "performance": [
      { "project": "E-commerce", "score": 98 },
      { "project": "Marketing", "score": 85 },
      { "project": "Mobile API", "score": 45 },
      { "project": "Portfolio", "score": 95 },
      { "project": "Blog", "score": 78 }
    ],
    "regions": [
      { "region": "North America", "requests": 45000 },
      { "region": "Europe", "requests": 32000 },
      { "region": "Asia", "requests": 28000 },
      { "region": "South America", "requests": 8000 },
      { "region": "Africa", "requests": 5000 }
    ]
  },
  "security": {
    "threats": [
      { "type": "DDoS", "severity": "high", "blocked": 1250 },
      { "type": "SQL Injection", "severity": "medium", "blocked": 45 },
      { "type": "XSS", "severity": "low", "blocked": 12 }
    ],
    "certificates": [
      { "domain": "ecommerce-platform.vercel.app", "expires": "2024-04-15", "status": "valid" },
      { "domain": "marketing-dash.vercel.app", "expires": "2024-03-20", "status": "valid" },
      { "domain": "mobile-api.vercel.app", "expires": "2024-02-28", "status": "expiring" }
    ]
  },
  "resources": {
    "bandwidth": { "used": 2.3, "limit": 100, "unit": "TB" },
    "storage": { "used": 45, "limit": 500, "unit": "GB" },
    "functions": { "used": 125000, "limit": 1000000, "unit": "invocations" },
    "edge": { "used": 85, "limit": 100, "unit": "locations" }
  }
};

// Global state
let charts = {};
let draggedProject = null;
let isOnline = true;
let currentTheme = 'light';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderDashboard();
  renderProjects();
  renderDeployments();
  renderAnalytics();
  renderSecurity();
  renderResources();
  startRealTimeUpdates();
  updateTime();
  setInterval(updateTime, 1000);
}

function setupEventListeners() {
  // Navigation
  document.addEventListener('click', handleNavigation);
  
  // Sidebar toggle
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Project search and filter
  document.getElementById('projectSearch').addEventListener('input', filterProjects);
  document.getElementById('statusFilter').addEventListener('change', filterProjects);
  
  // Chat form
  document.getElementById('chatForm').addEventListener('submit', handleChatSubmit);
  
  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboard);
}

function handleNavigation(e) {
  const navLink = e.target.closest('.nav-link');
  if (navLink) {
    e.preventDefault();
    const section = navLink.dataset.section;
    switchSection(section);
    
    // Update active state
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    navLink.classList.add('active');
  }
}

function switchSection(sectionName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(sectionName);
  if (targetPage) {
    targetPage.classList.add('active');
    
    // Initialize charts if needed
    if (sectionName === 'analytics' && !charts.regionChart) {
      setTimeout(() => renderAnalytics(), 100);
    }
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');
  
  sidebar.classList.toggle('collapsed');
  main.classList.toggle('expanded');
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  
  // Update theme icon
  const icon = document.getElementById('themeIcon');
  if (currentTheme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/>';
  }
  
  showToast('Theme switched to ' + currentTheme + ' mode', 'info');
}

function renderDashboard() {
  const metricsGrid = document.querySelector('.metrics-grid');
  const metrics = [
    { label: 'Total Projects', value: appData.metrics.totalProjects, change: '+2', changeType: 'positive' },
    { label: 'Active Deployments', value: appData.metrics.activeDeployments, change: '+1', changeType: 'positive' },
    { label: 'Success Rate', value: appData.metrics.successRate + '%', change: '+1.2%', changeType: 'positive' },
    { label: 'Avg Build Time', value: appData.metrics.avgBuildTime, change: '-15s', changeType: 'positive' },
    { label: 'Total Requests', value: formatNumber(appData.metrics.totalRequests), change: '+12%', changeType: 'positive' },
    { label: 'Error Rate', value: appData.metrics.errorRate + '%', change: '-0.01%', changeType: 'positive' },
    { label: 'Response Time', value: appData.metrics.responseTime + 'ms', change: '-5ms', changeType: 'positive' },
    { label: 'Uptime', value: appData.metrics.uptime + '%', change: '+0.1%', changeType: 'positive' }
  ];
  
  metricsGrid.innerHTML = metrics.map(metric => `
    <div class="metric-card">
      <div class="metric-value" data-value="${metric.value}">${metric.value}</div>
      <div class="metric-label">${metric.label}</div>
      <div class="metric-change ${metric.changeType}">${metric.change}</div>
    </div>
  `).join('');
  
  // Animate counters
  animateCounters();
  
  // Render dashboard charts
  renderDashboardCharts();
}

function animateCounters() {
  document.querySelectorAll('.metric-value').forEach(element => {
    const finalValue = element.dataset.value;
    const isNumber = /^\d+(\.\d+)?/.test(finalValue);
    
    if (isNumber) {
      const numValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
      animateCounter(element, 0, numValue, 1000, finalValue);
    }
  });
}

function animateCounter(element, start, end, duration, finalText) {
  const range = end - start;
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    
    const current = start + (range * easeProgress);
    const suffix = finalText.replace(/[\d.]/g, '');
    element.textContent = Math.floor(current) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = finalText;
    }
  }
  
  update();
}

function renderDashboardCharts() {
  // Visitors chart
  const visitorsCtx = document.getElementById('visitorsChart');
  if (visitorsCtx && !charts.visitorsChart) {
    charts.visitorsChart = new Chart(visitorsCtx, {
      type: 'line',
      data: {
        labels: appData.analytics.visitors.map(v => new Date(v.date).toLocaleDateString()),
        datasets: [{
          label: 'Daily Visitors',
          data: appData.analytics.visitors.map(v => v.count),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(0,0,0,0.1)' } }
        }
      }
    });
  }
  
  // Performance chart
  const performanceCtx = document.getElementById('performanceChart');
  if (performanceCtx && !charts.performanceChart) {
    charts.performanceChart = new Chart(performanceCtx, {
      type: 'bar',
      data: {
        labels: appData.analytics.performance.map(p => p.project),
        datasets: [{
          label: 'Performance Score',
          data: appData.analytics.performance.map(p => p.score),
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { 
            grid: { color: 'rgba(0,0,0,0.1)' },
            max: 100
          }
        }
      }
    });
  }
}

function renderProjects() {
  const projectList = document.getElementById('projectList');
  
  function createProjectCard(project) {
    return `
      <div class="project-card" draggable="true" data-project-id="${project.id}">
        <div class="project-header">
          <h3 class="project-name">${project.name}</h3>
          <div class="project-status ${project.status}">${project.status}</div>
        </div>
        <div class="project-meta">
          <div>Branch: ${project.branch}</div>
          <div>Commits: ${project.commits}</div>
          <div>Performance: ${project.performance}%</div>
          <div>Visitors: ${formatNumber(project.visitors)}</div>
        </div>
        <div class="project-actions">
          <button class="btn btn--sm btn--outline" onclick="openProject('${project.url}')">View</button>
          <button class="btn btn--sm btn--secondary" onclick="showProjectDetails(${project.id})">Details</button>
        </div>
      </div>
    `;
  }
  
  projectList.innerHTML = appData.projects.map(createProjectCard).join('');
  
  // Add drag and drop functionality
  setupProjectDragDrop();
}

function setupProjectDragDrop() {
  const projectList = document.getElementById('projectList');
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
  });
  
  // Set up drop zone on the project list container
  projectList.addEventListener('dragover', handleDragOver);
  projectList.addEventListener('drop', handleDrop);
  
  // Add drag over effects to cards
  projectCards.forEach(card => {
    card.addEventListener('dragenter', handleDragEnter);
    card.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragStart(e) {
  draggedProject = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
  
  // Add visual feedback
  setTimeout(() => {
    this.style.opacity = '0.5';
  }, 0);
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  this.style.opacity = '';
  draggedProject = null;
  
  // Remove all drop indicators
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
  if (this !== draggedProject) {
    this.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  this.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  
  if (draggedProject) {
    const targetCard = e.target.closest('.project-card');
    const projectList = document.getElementById('projectList');
    
    if (targetCard && targetCard !== draggedProject) {
      // Get the bounding box of the target
      const rect = targetCard.getBoundingClientRect();
      const midpoint = rect.left + rect.width / 2;
      
      // Determine if we should insert before or after
      if (e.clientX < midpoint) {
        projectList.insertBefore(draggedProject, targetCard);
      } else {
        projectList.insertBefore(draggedProject, targetCard.nextSibling);
      }
      
      showToast('Project order updated', 'success');
    } else if (!targetCard) {
      // Dropped on empty space - append to end
      projectList.appendChild(draggedProject);
      showToast('Project moved to end', 'info');
    }
    
    // Clean up
    targetCard?.classList.remove('drag-over');
  }
}

function filterProjects() {
  const searchTerm = document.getElementById('projectSearch').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const projectName = card.querySelector('.project-name').textContent.toLowerCase();
    const projectStatus = card.querySelector('.project-status').textContent;
    
    const matchesSearch = projectName.includes(searchTerm);
    const matchesStatus = !statusFilter || projectStatus === statusFilter;
    
    card.style.display = matchesSearch && matchesStatus ? 'block' : 'none';
  });
}

function renderDeployments() {
  const table = document.getElementById('deploymentsTable');
  const headers = ['Project', 'Status', 'Duration', 'Commit', 'Branch', 'Timestamp'];
  
  const headerRow = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  
  const rows = appData.deployments.map(deployment => {
    const project = appData.projects.find(p => p.id === deployment.projectId);
    return `
      <tr>
        <td>${project ? project.name : 'Unknown'}</td>
        <td><span class="deployment-status ${deployment.status}">${deployment.status.replace('_', ' ')}</span></td>
        <td>${deployment.duration}</td>
        <td class="truncate" style="max-width: 200px;">${deployment.commit}</td>
        <td><code>${deployment.branch}</code></td>
        <td>${new Date(deployment.timestamp).toLocaleString()}</td>
      </tr>
    `;
  }).join('');
  
  table.innerHTML = headerRow + rows;
}

function renderAnalytics() {
  const regionCtx = document.getElementById('regionChart');
  if (regionCtx && !charts.regionChart) {
    charts.regionChart = new Chart(regionCtx, {
      type: 'doughnut',
      data: {
        labels: appData.analytics.regions.map(r => r.region),
        datasets: [{
          data: appData.analytics.regions.map(r => r.requests),
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}

function renderSecurity() {
  const securityContent = document.getElementById('securityContent');
  
  const threatsHtml = appData.security.threats.map(threat => `
    <div class="security-threat">
      <div class="threat-info">
        <h4>${threat.type}</h4>
        <div>Blocked: ${threat.blocked} attempts</div>
      </div>
      <div class="threat-severity ${threat.severity}">${threat.severity}</div>
    </div>
  `).join('');
  
  const certificatesHtml = `
    <div class="card mt-8">
      <div class="card__body">
        <h3>SSL Certificates</h3>
        ${appData.security.certificates.map(cert => `
          <div class="flex justify-between items-center py-8" style="border-bottom: 1px solid var(--color-border);">
            <div>
              <div class="font-weight-medium">${cert.domain}</div>
              <div class="text-sm color-text-secondary">Expires: ${cert.expires}</div>
            </div>
            <div class="status status--${cert.status === 'valid' ? 'success' : 'warning'}">${cert.status}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  securityContent.innerHTML = `
    <div>
      <h3>Threat Detection</h3>
      ${threatsHtml}
    </div>
    ${certificatesHtml}
  `;
}

function renderResources() {
  const resourcesContent = document.getElementById('resourcesContent');
  
  const resourcesHtml = Object.entries(appData.resources).map(([key, resource]) => {
    const percentage = (resource.used / resource.limit) * 100;
    return `
      <div class="resource-card">
        <div class="resource-header">
          <div class="resource-name">${key}</div>
          <div class="resource-usage">${resource.used} / ${resource.limit} ${resource.unit}</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="text-sm color-text-secondary">${percentage.toFixed(1)}% used</div>
      </div>
    `;
  }).join('');
  
  resourcesContent.innerHTML = resourcesHtml;
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (message) {
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you manage your deployments. What would you like to know?",
        "Your applications are performing well. The E-commerce Platform has a 98% performance score.",
        "I notice you have an error in your Mobile App API. Would you like me to help troubleshoot?",
        "Your total requests have increased by 12% this week. Great job!",
        "I can help you optimize your build times. Consider enabling caching for faster deployments."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage(randomResponse, 'assistant');
    }, 1000);
  }
}

function addChatMessage(message, sender) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function openProject(url) {
  window.open(url, '_blank');
}

function showProjectDetails(projectId) {
  const project = appData.projects.find(p => p.id === projectId);
  if (project) {
    showModal('Project Details', `
      <div class="mb-8">
        <h4>${project.name}</h4>
        <div class="status status--${project.status === 'deployed' ? 'success' : project.status === 'error' ? 'error' : 'warning'} mb-8">${project.status}</div>
      </div>
      <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 16px;">
        <div><strong>Branch:</strong> ${project.branch}</div>
        <div><strong>Commits:</strong> ${project.commits}</div>
        <div><strong>Performance:</strong> ${project.performance}%</div>
        <div><strong>Visitors:</strong> ${formatNumber(project.visitors)}</div>
        <div><strong>Deployed:</strong> ${new Date(project.deployedAt).toLocaleString()}</div>
        <div><strong>URL:</strong> <a href="${project.url}" target="_blank">${project.url}</a></div>
      </div>
    `);
  }
}

function showModal(title, content) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = content;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modalClose').focus();
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function handleKeyboard(e) {
  // ESC to close modal
  if (e.key === 'Escape' && !document.getElementById('modal').classList.contains('hidden')) {
    closeModal();
  }
  
  // Ctrl/Cmd + / for help
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    showModal('Keyboard Shortcuts', `
      <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 16px;">
        <div><kbd>Esc</kbd> Close modal</div>
        <div><kbd>Ctrl/⌘ + /</kbd> Show help</div>
        <div><kbd>Ctrl/⌘ + K</kbd> Search projects</div>
        <div><kbd>T</kbd> Toggle theme</div>
      </div>
    `);
  }
  
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.getElementById('projectSearch').focus();
    switchSection('projects');
  }
  
  // T for theme toggle
  if (e.key === 't' || e.key === 'T') {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      toggleTheme();
    }
  }
}

function startRealTimeUpdates() {
  // Simulate WebSocket updates
  setInterval(() => {
    updateRealTimeMetrics();
  }, 5000);
  
  // Simulate connection status changes
  setInterval(() => {
    simulateConnectionStatus();
  }, 30000);
}

function updateRealTimeMetrics() {
  // Simulate metric updates
  const metrics = document.querySelectorAll('.metric-value');
  metrics.forEach(metric => {
    const currentText = metric.textContent;
    const isNumber = /^\d+/.test(currentText);
    
    if (isNumber && Math.random() > 0.7) {
      const currentValue = parseInt(currentText);
      const change = Math.floor(Math.random() * 10) - 5;
      const newValue = Math.max(0, currentValue + change);
      metric.textContent = currentText.replace(/\d+/, newValue);
    }
  });
  
  // Update charts with new data
  if (charts.visitorsChart) {
    const newCount = Math.floor(Math.random() * 500) + 1800;
    charts.visitorsChart.data.datasets[0].data.push(newCount);
    charts.visitorsChart.data.labels.push('Now');
    
    // Keep only last 10 data points
    if (charts.visitorsChart.data.datasets[0].data.length > 10) {
      charts.visitorsChart.data.datasets[0].data.shift();
      charts.visitorsChart.data.labels.shift();
    }
    
    charts.visitorsChart.update('none');
  }
}

function simulateConnectionStatus() {
  isOnline = !isOnline;
  const indicator = document.getElementById('connectionIndicator');
  const offlineIndicator = document.getElementById('offlineIndicator');
  
  if (isOnline) {
    indicator.textContent = 'Online';
    indicator.className = 'status status--success';
    offlineIndicator.classList.add('hidden');
    showToast('Connection restored', 'success');
  } else {
    indicator.textContent = 'Offline';
    indicator.className = 'status status--error';
    offlineIndicator.classList.remove('hidden');
    showToast('Connection lost', 'error');
  }
}

function updateTime() {
  document.getElementById('timeNow').textContent = new Date().toLocaleTimeString();
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Initialize chat with welcome message
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    addChatMessage('Hello! I\'m your AI assistant. I can help you manage deployments, analyze performance, and answer questions about your projects.', 'assistant');
  }, 1000);
});