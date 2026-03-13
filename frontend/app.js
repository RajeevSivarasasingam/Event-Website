const API = "http://localhost:5000/api";

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        alert(data.message);
    }
}

// REGISTER
async function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    window.location.href = "login.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// LOAD EVENTS
async function loadEvents() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`${API}/events`, {
        headers: { Authorization: token }
    });

    const events = await res.json();
    const list = document.getElementById("event-list");

    events.forEach(e => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `<h3>${e.title}</h3><p>${e.date}</p>`;
        list.appendChild(div);
    });
}

if (window.location.pathname.includes("index.html")) {
    loadEvents();
}