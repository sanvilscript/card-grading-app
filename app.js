// Load configuration
const API_URL = CONFIG.API_URL;
const API_TOKEN = CONFIG.API_TOKEN;

let currentImageBase64 = null;
let currentMode = 'centering'; // 'centering', 'grading', or 'condition'

// Elements
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');
const actionButtons = document.getElementById('actionButtons');
const analyzeBtn = document.getElementById('analyzeBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const error = document.getElementById('error');

// Sidebar
const navCentering = document.getElementById('navCentering');
const navGrading = document.getElementById('navGrading');
const navCondition = document.getElementById('navCondition');
const modeTitle = document.getElementById('modeTitle');
const modeDescription = document.getElementById('modeDescription');

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

function toggleMobileMenu() {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

function closeMobileMenu() {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

// Sidebar Navigation
navCentering.addEventListener('click', () => {
    switchMode('centering');
    closeMobileMenu();
});
navGrading.addEventListener('click', () => {
    switchMode('grading');
    closeMobileMenu();
});
navCondition.addEventListener('click', () => {
    switchMode('condition');
    closeMobileMenu();
});

function switchMode(mode) {
    currentMode = mode;
    
    // Update nav buttons
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('bg-blue-600', 'text-white');
        item.classList.add('text-gray-300', 'hover:bg-gray-700');
    });
    
    if (mode === 'centering') {
        navCentering.classList.add('bg-blue-600', 'text-white');
        navCentering.classList.remove('text-gray-300', 'hover:bg-gray-700');
        modeTitle.textContent = 'Centering Analysis';
        modeDescription.textContent = 'Check your TCG card centering';
    } else if (mode === 'grading') {
        navGrading.classList.add('bg-blue-600', 'text-white');
        navGrading.classList.remove('text-gray-300', 'hover:bg-gray-700');
        modeTitle.textContent = 'Complete Grading';
        modeDescription.textContent = 'Full analysis: corners, edges, surface and centering';
    } else if (mode === 'condition') {
        navCondition.classList.add('bg-blue-600', 'text-white');
        navCondition.classList.remove('text-gray-300', 'hover:bg-gray-700');
        modeTitle.textContent = 'Card Condition';
        modeDescription.textContent = 'Evaluate card condition (TCGPlayer scale)';
    }
    
    // Reset UI when switching modes
    hideResults();
    hideError();
    hidePreview();
}

// Upload & Preview
imageInput.addEventListener('change', handleImageUpload);

async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    if (!file.type.match('image.*') && !file.name.toLowerCase().endsWith('.heic')) {
        showError('Please select a valid image file (PNG, JPG, JPEG, HEIC)');
        return;
    }

    try {
        let fileToProcess = file;
        
        // Convert HEIC to JPEG if needed
        if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
            showLoading();
            loading.querySelector('p').textContent = 'Converting HEIC...';
            
            const convertedBlob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.9
            });
            
            fileToProcess = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
                type: 'image/jpeg'
            });
            
            hideLoading();
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            currentImageBase64 = event.target.result;
            previewImage.src = currentImageBase64;
            preview.classList.remove('hidden');
            actionButtons.classList.remove('hidden');
            hideError();
            hideResults();
        };
        reader.readAsDataURL(fileToProcess);
    } catch (err) {
        hideLoading();
        showError('Error converting HEIC file: ' + err.message);
    }
}

// API Calls
analyzeBtn.addEventListener('click', () => {
    if (currentMode === 'centering') {
        analyzeCentering();
    } else if (currentMode === 'grading') {
        analyzeGrading();
    } else if (currentMode === 'condition') {
        analyzeCondition();
    }
});

async function analyzeCentering() {
    if (!currentImageBase64) return;

    showLoading();
    hideError();
    hideResults();

    try {
        const response = await fetch(`${API_URL}/centering`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_TOKEN}`
            },
            body: JSON.stringify({
                records: [{ _base64: currentImageBase64 }]
            })
        });

        const data = await response.json();
        
        if (data.status.code === 200 && data.records[0]) {
            displayCenteringResults(data.records[0]);
        } else if (data.status.code === 401) {
            throw new Error('Invalid API token or credits exhausted. Please check your Ximilar account at https://app.ximilar.com');
        } else {
            throw new Error(data.status.text || 'Analysis error');
        }
    } catch (err) {
        showError('Error during centering analysis: ' + err.message);
    } finally {
        hideLoading();
    }
}

async function analyzeGrading() {
    if (!currentImageBase64) return;

    showLoading();
    hideError();
    hideResults();

    try {
        const response = await fetch(`${API_URL}/grade`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_TOKEN}`
            },
            body: JSON.stringify({
                records: [{ _base64: currentImageBase64 }]
            })
        });

        const data = await response.json();
        
        if (data.status.code === 200 && data.records[0]) {
            displayGradingResults(data.records[0]);
        } else if (data.status.code === 401) {
            throw new Error('Invalid API token or credits exhausted. Please check your Ximilar account at https://app.ximilar.com');
        } else {
            throw new Error(data.status.text || 'Analysis error');
        }
    } catch (err) {
        showError('Error during complete grading: ' + err.message);
    } finally {
        hideLoading();
    }
}

async function analyzeCondition() {
    if (!currentImageBase64) return;

    showLoading();
    hideError();
    hideResults();

    try {
        const response = await fetch(`${API_URL}/condition`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${API_TOKEN}`
            },
            body: JSON.stringify({
                records: [{ _base64: currentImageBase64 }],
                mode: 'tcgplayer'
            })
        });

        const data = await response.json();
        
        if (data.status.code === 200 && data.records[0]) {
            displayConditionResults(data.records[0]);
        } else if (data.status.code === 401) {
            throw new Error('Invalid API token or credits exhausted. Please check your Ximilar account at https://app.ximilar.com');
        } else {
            throw new Error(data.status.text || 'Analysis error');
        }
    } catch (err) {
        showError('Error during condition analysis: ' + err.message);
    } finally {
        hideLoading();
    }
}

// Display Results
function displayCenteringResults(record) {
    const centering = record.card[0].centering;
    
    results.innerHTML = `
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 class="text-2xl font-bold text-white mb-6">Centering Results</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
                <!-- Centering Info -->
                <div>
                    <div class="bg-blue-900/30 border border-blue-700 rounded-lg p-6 mb-4">
                        <h3 class="text-lg font-semibold text-blue-300 mb-4">Measurements</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-400">Left/Right:</span>
                                <span class="font-bold text-lg text-white">${centering['left/right']}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-400">Top/Bottom:</span>
                                <span class="font-bold text-lg text-white">${centering['top/bottom']}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-green-900/30 border border-green-700 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-green-300 mb-2">Centering Grade</h3>
                        <div class="text-4xl font-bold text-green-400">${centering.grade}</div>
                    </div>
                </div>
                
                <!-- Processed Images -->
                <div>
                    ${record._exact_url_card ? `
                        <div class="mb-4">
                            <h3 class="text-sm font-semibold text-gray-400 mb-2">Analyzed Image</h3>
                            <img src="${record._exact_url_card}" class="w-full rounded-lg shadow-md border border-gray-700">
                        </div>
                    ` : ''}
                    ${record._clean_url_card ? `
                        <div>
                            <h3 class="text-sm font-semibold text-gray-400 mb-2">Clean Image</h3>
                            <img src="${record._clean_url_card}" class="w-full rounded-lg shadow-md border border-gray-700">
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    results.classList.remove('hidden');
}

function displayGradingResults(record) {
    const grades = record.grades;
    const centering = record.card[0].centering;
    const corners = record.corners;
    const edges = record.edges;
    const tags = record.card[0]._tags;
    
    results.innerHTML = `
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 class="text-2xl font-bold text-white mb-6">Complete Grading</h2>
            
            <!-- Final Grade -->
            <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-6 text-white text-center shadow-lg">
                <h3 class="text-xl font-semibold mb-2">Final Grade</h3>
                <div class="text-5xl font-bold mb-2">${grades.final}</div>
                <div class="text-xl">${grades.condition}</div>
            </div>
            
            <!-- Card Info Tags -->
            <div class="grid md:grid-cols-4 gap-4 mb-6">
                <div class="bg-indigo-900/30 border border-indigo-700 rounded-lg p-4 text-center">
                    <div class="text-xs text-gray-400 mb-1">Category</div>
                    <div class="text-sm font-bold text-white">${tags.Category[0].name.replace('Card/', '')}</div>
                    <div class="text-xs text-indigo-400 mt-1">${(tags.Category[0].prob * 100).toFixed(1)}%</div>
                </div>
                <div class="bg-${tags.Damaged[0].name === 'OK' ? 'green' : 'red'}-900/30 border border-${tags.Damaged[0].name === 'OK' ? 'green' : 'red'}-700 rounded-lg p-4 text-center">
                    <div class="text-xs text-gray-400 mb-1">Damaged</div>
                    <div class="text-sm font-bold text-white">${tags.Damaged[0].name}</div>
                    <div class="text-xs text-${tags.Damaged[0].name === 'OK' ? 'green' : 'red'}-400 mt-1">${(tags.Damaged[0].prob * 100).toFixed(1)}%</div>
                </div>
                <div class="bg-purple-900/30 border border-purple-700 rounded-lg p-4 text-center">
                    <div class="text-xs text-gray-400 mb-1">Autograph</div>
                    <div class="text-sm font-bold text-white">${tags.Autograph[0].name}</div>
                    <div class="text-xs text-purple-400 mt-1">${(tags.Autograph[0].prob * 100).toFixed(1)}%</div>
                </div>
                <div class="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4 text-center">
                    <div class="text-xs text-gray-400 mb-1">Side</div>
                    <div class="text-sm font-bold text-white">${tags.Side[0].name}</div>
                    <div class="text-xs text-cyan-400 mt-1">${(tags.Side[0].prob * 100).toFixed(1)}%</div>
                </div>
            </div>
            
            <!-- Grades Grid -->
            <div class="grid md:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center">
                    <div class="text-sm text-gray-400 mb-1">Corners</div>
                    <div class="text-3xl font-bold text-blue-400">${grades.corners}</div>
                </div>
                <div class="bg-green-900/30 border border-green-700 rounded-lg p-4 text-center">
                    <div class="text-sm text-gray-400 mb-1">Edges</div>
                    <div class="text-3xl font-bold text-green-400">${grades.edges}</div>
                </div>
                <div class="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-center">
                    <div class="text-sm text-gray-400 mb-1">Surface</div>
                    <div class="text-3xl font-bold text-yellow-400">${grades.surface}</div>
                </div>
                <div class="bg-purple-900/30 border border-purple-700 rounded-lg p-4 text-center">
                    <div class="text-sm text-gray-400 mb-1">Centering</div>
                    <div class="text-3xl font-bold text-purple-400">${grades.centering}</div>
                </div>
            </div>
            
            <!-- Details -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <!-- Corners Detail -->
                <div class="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                    <h3 class="font-semibold text-white mb-3">Corner Details</h3>
                    <div class="space-y-2">
                        ${corners.map(corner => `
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-400">${corner.name}:</span>
                                <span class="font-semibold text-white">${corner.grade}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Edges Detail -->
                <div class="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                    <h3 class="font-semibold text-white mb-3">Edge Details</h3>
                    <div class="space-y-2">
                        ${edges.map(edge => `
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-400">${edge.name}:</span>
                                <span class="font-semibold text-white">${edge.grade}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- Centering Details -->
            <div class="bg-gray-700/50 border border-gray-600 rounded-lg p-4 mb-6">
                <h3 class="font-semibold text-white mb-3">Centering Details</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <span class="text-sm text-gray-400">Left/Right:</span>
                        <span class="font-semibold text-white ml-2">${centering['left/right']}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">Top/Bottom:</span>
                        <span class="font-semibold text-white ml-2">${centering['top/bottom']}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">Pixels:</span>
                        <span class="font-semibold text-white ml-2">${centering.pixels.join(', ')}</span>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">Offsets:</span>
                        <span class="font-semibold text-white ml-2">${centering.offsets.map(o => o.toFixed(3)).join(', ')}</span>
                    </div>
                </div>
            </div>
            
            <!-- Processed Images -->
            ${record._exact_url_card || record._full_url_card ? `
                <div class="grid md:grid-cols-2 gap-4">
                    ${record._full_url_card ? `
                        <div>
                            <h3 class="text-sm font-semibold text-gray-400 mb-2">Full Analysis</h3>
                            <img src="${record._full_url_card}" class="w-full rounded-lg shadow-md border border-gray-700">
                        </div>
                    ` : ''}
                    ${record._exact_url_card ? `
                        <div>
                            <h3 class="text-sm font-semibold text-gray-400 mb-2">Analyzed Card</h3>
                            <img src="${record._exact_url_card}" class="w-full rounded-lg shadow-md border border-gray-700">
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `;
    
    results.classList.remove('hidden');
}

function displayConditionResults(record) {
    const cardObj = record._objects[0];
    const condition = cardObj.Condition[0];
    const category = cardObj.Category[0];
    
    results.innerHTML = `
        <div class="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 class="text-2xl font-bold text-white mb-6">Card Condition</h2>
            
            <!-- Main Condition -->
            <div class="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 mb-6 text-white text-center shadow-lg">
                <h3 class="text-xl font-semibold mb-2">Condition</h3>
                <div class="text-5xl font-bold mb-2">${condition.label}</div>
                <div class="text-lg">TCGPlayer Scale</div>
            </div>
            
            <!-- Condition Details -->
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div class="bg-orange-900/30 border border-orange-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-orange-300 mb-4">Assessment Details</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Value:</span>
                            <span class="font-bold text-lg text-white">${condition.value.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Scale:</span>
                            <span class="font-bold text-lg text-white">${condition.scale_value}/${condition.max_scale_value}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Mode:</span>
                            <span class="font-bold text-white uppercase">${condition.mode}</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-blue-300 mb-4">Card Category</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Type:</span>
                            <span class="font-bold text-white">${category.name}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-400">Probability:</span>
                            <span class="font-bold text-white">${(category.prob * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Scale Reference -->
            <div class="bg-gray-700/50 border border-gray-600 rounded-lg p-6">
                <h3 class="font-semibold text-white mb-4">TCGPlayer Scale</h3>
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    ${condition.scale.map((label, index) => `
                        <div class="text-center p-3 rounded-lg ${index === condition.scale_value ? 'bg-orange-600 text-white' : 'bg-gray-600 text-gray-300'}">
                            <div class="text-xs mb-1">${index + 1}</div>
                            <div class="text-sm font-semibold">${label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    results.classList.remove('hidden');
}

// UI Helpers
function showLoading() {
    loading.classList.remove('hidden');
    actionButtons.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
    actionButtons.classList.remove('hidden');
}

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function hideResults() {
    results.classList.add('hidden');
}

function hidePreview() {
    preview.classList.add('hidden');
    actionButtons.classList.add('hidden');
    currentImageBase64 = null;
    imageInput.value = '';
}
