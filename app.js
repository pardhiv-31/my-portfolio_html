(function () {
    "use strict";

    // -------------------------------------------------------------------------
    // PERSISTENT INTERNAL MEMORY ARRAYS (CORE VOLATILE RUNTIME POOLS)
    // -------------------------------------------------------------------------
    let workspaceTasks = [];
    let assetCart = [];

    // -------------------------------------------------------------------------
    // CENTRALIZED DIRECTORY NAVIGATION APPLICATION MATRIX
    // -------------------------------------------------------------------------
    const routes = {
        '#/': {
            render: function () {
                return `
                    <div class="view-card">
                        <h1 class="main-heading">System Operations Center</h1>
                        <p class="description-text">
                            Welcome to the AeroDesk optimized framework-free execution environment. 
                            This runtime engine acts as a localized container designed to prove the 
                            computational efficiency of client-side Document Object Model (DOM) mutation, 
                            asynchronous external network streams, and zero-latency hardware data pipelines.
                        </p>
                        <div class="grid-layout">
                            <div class="telemetry-card metric-blue">
                                <h3>Pure Vanilla JS</h3>
                                <p style="color: var(--text-muted); margin-top: 0.25rem;">Uncompiled Engine Framework</p>
                            </div>
                            <div class="telemetry-card metric-emerald">
                                <h3>&lt; 2.0ms Baseline</h3>
                                <p style="color: var(--text-muted); margin-top: 0.25rem;">Zero-Refresh UI Manipulation</p>
                            </div>
                            <div class="telemetry-card metric-purple">
                                <h3>Decoupled Shell</h3>
                                <p style="color: var(--text-muted); margin-top: 0.25rem;">Client-Executed Runspace</p>
                            </div>
                        </div>
                    </div>
                `;
            },
            init: function () {
                console.log("[ROUTER LOGIC]: Core Workspace Mounted at Index Domain.");
            }
        },
        '#/telemetry': {
            render: function () {
                return `
                    <div class="view-card">
                        <h1 class="main-heading">Asynchronous Global Telemetry Portal</h1>
                        <p class="description-text">Real-time external atmospheric metrics pulled securely across HTTPS communication links utilizing native non-blocking Promise pipelines.</p>
                        <div id="telemetry-display" class="grid-layout">
                            <div class="telemetry-card status-placeholder">
                                <div class="loading-spinner"></div>
                                <p style="color: var(--text-muted);">Establishing secure network socket thread... Ingesting REST stream.</p>
                            </div>
                        </div>
                    </div>
                `;
            },
            init: fetchTelemetryData
        },
        '#/tasks': {
            render: function () {
                return `
                    <div class="view-card">
                        <h1 class="main-heading">Sprint Backlog State Controller</h1>
                        <p class="description-text">Hardware-cached Agile workspace running local data mutation loops inside the browser security sandbox with absolute network independence.</p>
                        <div class="task-input-section">
                            <input type="text" id="task-input" autofocus autocomplete="off" placeholder="Input precise objective text string summary string...">
                            <button id="add-task-btn">Commit Objective</button>
                        </div>
                        <div style="margin-bottom: 1.5rem; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;" id="task-metric-count">
                            Metrics Summary: 0 Total Entries
                        </div>
                        <ul id="task-list-container" class="task-list"></ul>
                    </div>
                `;
            },
            init: initTaskManager
        },
        '#/marketplace': {
            render: function () {
                return `
                    <div class="view-card">
                        <h1 class="main-heading">AeroDesk Asset Marketplace</h1>
                        <p class="description-text">Expand your modular client runtime. Hot-reload premium developer plugins, metrics modules, and icon packs instantly into your core shell application environment.</p>
                        
                        <div class="marketplace-container">
                            <div class="grid-layout" style="margin-top: 0;">
                                <div class="product-card">
                                    <div>
                                        <h3 style="font-size: 1.1rem; color: var(--text-primary);">Terminal Emulator Script</h3>
                                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">Injects a native sandbox CLI window directly inside your Operations tab frame.</p>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                                        <span class="product-price">$45.00</span>
                                        <button class="buy-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.addAssetToCart('Terminal Emulator', 45)">Add to Cart</button>
                                    </div>
                                </div>

                                <div class="product-card">
                                    <div>
                                        <h3 style="font-size: 1.1rem; color: var(--text-primary);">System Monitor Engine</h3>
                                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">Advanced memory heap performance tracker for evaluating script processing.</p>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                                        <span class="product-price">$60.00</span>
                                        <button class="buy-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.addAssetToCart('System Monitor', 60)">Add to Cart</button>
                                    </div>
                                </div>

                                <div class="product-card">
                                    <div>
                                        <h3 style="font-size: 1.1rem; color: var(--text-primary);">Global JSON Parser Canvas</h3>
                                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem;">Dynamic tree structured validator to structure complex nested data streams instantly.</p>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                                        <span class="product-price">$25.00</span>
                                        <button class="buy-btn" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.addAssetToCart('JSON Parser', 25)">Add to Cart</button>
                                    </div>
                                </div>
                            </div>

                            <div class="cart-panel">
                                <h3 style="border-bottom: 1px solid var(--border-glass); padding-bottom: 0.75rem; font-size: 1.1rem;">Selected Package Cart</h3>
                                <div id="cart-items-wrapper" style="margin: 1rem 0; min-height: 80px;">
                                    <p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; margin-top: 1.5rem;">Cart is currently empty.</p>
                                </div>
                                <div style="border-top: 1px solid var(--border-glass); padding-top: 1rem; display: flex; justify-content: space-between; font-weight: 700;">
                                    <span style="color: var(--text-secondary); font-size: 0.95rem;">Total Balance:</span>
                                    <span id="cart-total-value" style="color: var(--color-success); font-size: 1.1rem;">$0.00</span>
                                </div>
                                <button id="checkout-btn" style="width: 100%; margin-top: 1.5rem; background: var(--color-success); color: var(--bg-base);" onclick="window.processAssetCheckout()">Deploy Modules</button>
                            </div>
                        </div>
                    </div>
                `;
            },
            init: function () {
                console.log("[MARKETPLACE]: CAPSTONE E-commerce asset pipeline module mounted.");
                window.renderAssetCart();
            }
        }
    };

    // -------------------------------------------------------------------------
    // CENTRAL CLIENT-SIDE ROUTER ENGINE ORCHESTRATOR & PERFORMACE MONITOR
    // -------------------------------------------------------------------------
    function routerController() {
        const currentHash = window.location.hash || '#/';
        const appRoot = document.getElementById('app-root');
        const activeRoute = routes[currentHash];

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });

        if (!activeRoute) {
            appRoot.innerHTML = `
                <div class="view-card" style="border-left: 4px solid var(--color-danger)">
                    <h1 style="color: var(--color-danger)">404 - Registry Fault</h1>
                    <p>The system requested address hash configuration parameter cannot be identified inside the lookup matrix.</p>
                </div>
            `;
            return;
        }

        // CAPSTONE ATTENTION GRABBER: Start microseconds cycle evaluation timer
        const renderStartTime = performance.now();

        appRoot.innerHTML = activeRoute.render();
        activeRoute.init();

        // Calculate paint times and total live nodes instantly
        setTimeout(function() {
            const renderEndTime = performance.now();
            const executionDelta = (renderEndTime - renderStartTime).toFixed(2);
            const absoluteDomElementsCount = document.getElementsByTagName('*').length;
            
            const domElementNode = document.getElementById('diagnostic-dom-count');
            const speedElementNode = document.getElementById('diagnostic-render-speed');
            
            if (domElementNode) domElementNode.innerText = absoluteDomElementsCount;
            if (speedElementNode) speedElementNode.innerText = `${executionDelta} ms`;
        }, 10);
    }

    // -------------------------------------------------------------------------
    // MODULE 2 LOGIC INTERFACE - ASYNCHRONOUS DATA CAPTURE TRACKS
    // -------------------------------------------------------------------------
    async function fetchTelemetryData() {
        const displayNode = document.getElementById('telemetry-display');
        try {
            const apiResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true');
            if (!apiResponse.ok) throw new Error('Data stream fetch handshake failed');
            
            const dataPayload = await apiResponse.json();
            const metrics = dataPayload.current_weather;

            displayNode.innerHTML = `
                <div class="telemetry-card metric-blue">
                    <h4>Regional Core Temperature</h4>
                    <div class="metric-value-display">${metrics.temperature}°C</div>
                </div>
                <div class="telemetry-card metric-emerald">
                    <h4>Wind Velocity Vector</h4>
                    <div class="metric-value-display">${metrics.windspeed} km/h</div>
                </div>
                <div class="telemetry-card metric-purple">
                    <h4>API Endpoint Diagnostic</h4>
                    <div class="metric-value-display" style="font-size: 1.5rem; color: var(--color-success); margin-top: 1rem;">200 OK STATUS</div>
                </div>
            `;
        } catch (error) {
            displayNode.innerHTML = `
                <div class="telemetry-card metric-danger" style="grid-column: 1 / -1;">
                    <h4>Network Execution Pipeline Disrupted</h4>
                    <p>${error.message}. Verification failure on host external data connection tracks.</p>
                </div>
            `;
        }
    }

    // -------------------------------------------------------------------------
    // MODULE 3 LOGIC INTERFACE - LOCAL STORAGE DATA MESH
    // -------------------------------------------------------------------------
    function initTaskManager() {
        const rawLocalStorageCache = localStorage.getItem('aerodesk_workspace_tasks');
        workspaceTasks = rawLocalStorageCache ? JSON.parse(rawLocalStorageCache) : [];
        
        renderTaskList();

        document.getElementById('add-task-btn').addEventListener('click', commitTaskAction);
        document.getElementById('task-input').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') commitTaskAction();
        });
    }

    function commitTaskAction() {
        const inputDomRef = document.getElementById('task-input');
        const cleanedTextPayload = inputDomRef.value.trim();
        if (!cleanedTextPayload) return;

        workspaceTasks.push({ id: Date.now(), text: cleanedTextPayload, completed: false });
        syncToHardwareStorage();
        inputDomRef.value = '';
        renderTaskList();
    }

    function toggleTaskState(targetNodeId) {
        workspaceTasks = workspaceTasks.map(taskItem => 
            taskItem.id === targetNodeId ? Object.assign({}, taskItem, { completed: !taskItem.completed }) : taskItem
        );
        syncToHardwareStorage();
        renderTaskList();
    }

    function purgeTaskAction(targetNodeId) {
        workspaceTasks = workspaceTasks.filter(taskItem => taskItem.id !== targetNodeId);
        syncToHardwareStorage();
        renderTaskList();
    }

    function syncToHardwareStorage() {
        localStorage.setItem('aerodesk_workspace_tasks', JSON.stringify(workspaceTasks));
    }

    function renderTaskList() {
        const displayContainerNode = document.getElementById('task-list-container');
        const trackingMetricsCountNode = document.getElementById('task-metric-count');
        if (!displayContainerNode) return;
        
        trackingMetricsCountNode.innerText = `Metrics Summary: ${workspaceTasks.length} Total Committed Record Items`;

        if (workspaceTasks.length === 0) {
            displayContainerNode.innerHTML = `<p style="color: var(--text-muted); text-align: center; width: 100%; padding: 2rem; border: 1px dashed var(--border-glass); border-radius: 12px;">The local physical allocation parameters are currently clear.</p>`;
            return;
        }

        displayContainerNode.innerHTML = '';
        workspaceTasks.forEach(function (taskNode) {
            const listRowItemElement = document.createElement('li');
            listRowItemElement.className = `task-item ${taskNode.completed ? 'completed' : ''}`;
            listRowItemElement.innerHTML = `
                <div id="toggle-trigger-${taskNode.id}" style="display: flex; align-items: center; gap: 1rem; width: 85%; cursor: pointer;">
                    <input type="checkbox" ${taskNode.completed ? 'checked' : ''} style="cursor: pointer;">
                    <span>${taskNode.text}</span>
                </div>
                <button class="purge-action-btn" id="delete-trigger-${taskNode.id}">Purge</button>
            `;
            displayContainerNode.appendChild(listRowItemElement);

            document.getElementById(`toggle-trigger-${taskNode.id}`).addEventListener('click', () => toggleTaskState(taskNode.id));
            document.getElementById(`delete-trigger-${taskNode.id}`).addEventListener('click', (e) => { e.stopPropagation(); purgeTaskAction(taskNode.id); });
        });
    }

    // -------------------------------------------------------------------------
    // MODULE 4 LOGIC INTERFACE - COMPLETE CAPSTONE STATE CARGO PIPELINE
    // -------------------------------------------------------------------------
    window.addAssetToCart = function (name, price) {
        assetCart.push({ id: Date.now(), name: name, price: price });
        window.renderAssetCart();
    };

    window.removeAssetFromCart = function (id) {
        assetCart = assetCart.filter(item => item.id !== id);
        window.renderAssetCart();
    };

    window.renderAssetCart = function () {
        const wrapper = document.getElementById('cart-items-wrapper');
        const totalText = document.getElementById('cart-total-value');
        if (!wrapper) return;

        if (assetCart.length === 0) {
            wrapper.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem; text-align: center; margin-top: 1.5rem;">Cart is empty.</p>`;
            totalText.innerText = "$0.00";
            return;
        }

        wrapper.innerHTML = '';
        let totalSum = 0;

        assetCart.forEach(function (item) {
            totalSum += item.price;
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span style="font-size:0.9rem; color: var(--text-primary); font-weight: 500;">${item.name}</span>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                    <span style="font-weight:700; color:var(--accent-glow); font-size:0.9rem;">$${item.price}</span>
                    <span style="color:var(--color-danger); cursor:pointer; font-weight:bold; font-size:0.8rem;" onclick="window.removeAssetFromCart(${item.id})">✕</span>
                </div>
            `;
            wrapper.appendChild(row);
        });

        totalText.innerText = `$${totalSum.toFixed(2)}`;
    };

    window.processAssetCheckout = function () {
        if (assetCart.length === 0) {
            alert("Handshake Aborted: Checkout card requires active items.");
            return;
        }
        alert(`Deployment Authorized! Successfully injected ${assetCart.length} modules into AeroDesk Core runtime.`);
        assetCart = [];
        window.renderAssetCart();
    };

    // -------------------------------------------------------------------------
    // APPLICATION SYSTEMS BOOTSTRAPPING TRACKS
    // -------------------------------------------------------------------------
    window.addEventListener('hashchange', routerController);
    window.addEventListener('load', routerController);
})();