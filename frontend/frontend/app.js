 
const API_BASE = 'http://localhost:5000/api';

 
let currentUser = JSON.parse(localStorage.getItem('user'));
let authToken = localStorage.getItem('token');

 
let msgBox;

 
window.onload = () => {
    msgBox = document.getElementById('message-box');
    
    const path = window.location.pathname;
    const isLogin = path.includes('login.html');
    const isRegister = path.includes('register.html');
    const isHome = path.includes('index.html') || path.endsWith('/');  

   
    if (authToken && currentUser) {
         
        if (isLogin || isRegister) {
            window.location.href = 'index.html';
            return;
        }
         
        if (isHome) setupHomePage();
    } else {
        
        if (isHome) {
            window.location.href = 'login.html';
            return;
        }
    }

    setupEventListeners();
};

 
function setupHomePage() {
    document.getElementById('nav-username').textContent = currentUser.name;
    document.getElementById('nav-role').textContent = currentUser.role;

    const adminPanel = document.getElementById('admin-panel');
    const eventsPanel = document.getElementById('events-panel');

    
    if (currentUser.role === 'admin') {
        adminPanel.classList.remove('hidden');
        eventsPanel.className = 'events-panel';
    } else {
        adminPanel.classList.add('hidden');
        eventsPanel.className = 'events-panel full-width';
    }

    fetchEvents();
}

 
function showMessage(msg, type = 'success') {
    if (!msgBox) return;
    msgBox.textContent = msg;
    msgBox.className = type === 'success' ? 'msg-success' : 'msg-error';
    msgBox.classList.add('show-message');
    setTimeout(() => msgBox.classList.remove('show-message'), 3500);
}

async function apiFetch(endpoint, options = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options, headers: { ...headers, ...options.headers }
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API request failed');
    return data;
}

window.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

 
function setupEventListeners() {
    
     
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const loader = document.getElementById('login-loader');
            try {
                loader.classList.remove('hidden');
                const data = await apiFetch('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: document.getElementById('login-email').value,
                        password: document.getElementById('login-password').value
                    })
                });

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'index.html'; // Redirect to Dashboard
            } catch (error) {
                showMessage(error.message, 'error');
                loader.classList.add('hidden');
            }
        });
    }

     
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const loader = document.getElementById('reg-loader');
            try {
                loader.classList.remove('hidden');
                await apiFetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: document.getElementById('reg-name').value,
                        email: document.getElementById('reg-email').value,
                        password: document.getElementById('reg-password').value,
                        role: document.getElementById('reg-role').value
                    })
                });
                
                 
                showMessage('Registration successful! Redirecting...');
                setTimeout(() => { window.location.href = 'login.html'; }, 1500);
            } catch (error) {
                showMessage(error.message, 'error');
                loader.classList.add('hidden');
            }
        });
    }

     
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.textContent;
            try {
                btn.textContent = 'Publishing...';
                await apiFetch('/events', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: document.getElementById('event-title').value,
                        date: document.getElementById('event-date').value,
                        location: document.getElementById('event-location').value,
                        description: document.getElementById('event-desc').value
                    })
                });
                showMessage('Event published successfully!');
                eventForm.reset();
                fetchEvents();
            } catch (error) {
                showMessage(error.message, 'error');
            } finally {
                btn.textContent = originalText;
            }
        });
    }
}

 

window.fetchEvents = async function() {
    const eventList = document.getElementById('event-list');
    if (!eventList) return;

    try {
        eventList.innerHTML = `<div class="text-center py-10 text-slate-400">Loading events...</div>`;
        const events = await apiFetch('/events', { method: 'GET' });
        
        if (events.length === 0) {
            eventList.innerHTML = `<div class="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">No events found. ${currentUser.role === 'admin' ? 'Create one from the panel!' : ''}</div>`;
            return;
        }

        eventList.innerHTML = events.map(event => {
            const d = new Date(event.date);
            const dateStr = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            
            const hasApplied = event.appliedUsers && event.appliedUsers.includes(currentUser.id);

            let actionButtons = '';
            if (currentUser.role === 'admin') {
                const attendeeCount = event.appliedUsers ? event.appliedUsers.length : 0;
                actionButtons = `
                    <div class="flex items-center justify-between w-full mt-4 pt-4 border-t border-slate-100">
                        <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">👥 ${attendeeCount} Registered</span>
                        <button onclick="deleteEvent('${event._id}')" class="text-sm text-red-600 hover:text-red-800 font-medium transition px-3 py-1.5 hover:bg-red-50 rounded-md">Delete</button>
                    </div>
                `;
            } else {
                if (hasApplied) {
                    actionButtons = `<button disabled class="mt-4 w-full bg-green-50 text-green-700 font-medium py-2 rounded-lg border border-green-200 cursor-not-allowed">✓ You're Registered</button>`;
                } else {
                    actionButtons = `<button onclick="applyForEvent('${event._id}')" class="mt-4 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 rounded-lg transition">Apply for Event</button>`;
                }
            }

            return `
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <h3 class="text-xl font-bold text-slate-900 mb-1">${event.title}</h3>
                    <p class="text-slate-600 text-sm mb-4 line-clamp-2">${event.description}</p>
                    <div class="flex flex-wrap gap-3 text-sm text-slate-500 font-medium">
                        <span class="flex items-center gap-1"> ${dateStr}</span>
                        <span class="flex items-center gap-1"> ${event.location}</span>
                    </div>
                    ${actionButtons}
                </div>
            `;
        }).join('');

    } catch (error) {
        showMessage('Failed to load events. Is the backend running?', 'error');
        eventList.innerHTML = `<div class="text-center py-10 text-red-500">Failed to connect to server.</div>`;
    }
}

window.deleteEvent = async function(id) {
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) return;
    try {
        await apiFetch(`/events/${id}`, { method: 'DELETE' });
        showMessage('Event deleted.', 'success');
        fetchEvents();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

window.applyForEvent = async function(id) {
    try {
        await apiFetch(`/events/${id}/apply`, { method: 'POST' });
        showMessage('Successfully registered for event!', 'success');
        fetchEvents();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}