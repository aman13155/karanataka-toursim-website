const API_URL = "http://localhost:5000";

// Utility: Show message on page
function showMessage(targetId, message, success = true) {
  const el = document.getElementById(targetId);
  if (el) {
    el.textContent = message;
    el.style.color = success ? "limegreen" : "red";
  } else {
    alert(message);
  }
}

// Register
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    showMessage("registerMsg", data.message, res.ok);
    if (res.ok) e.target.reset();
  } catch (err) {
    showMessage("registerMsg", "⚠️ Server not reachable", false);
  }
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    showMessage("loginMsg", data.message, res.ok);
    if (res.ok) {
      localStorage.setItem("userEmail", email); // store session
      window.location.href = "index.html"; // redirect on success
    }
  } catch (err) {
    showMessage("loginMsg", "⚠️ Server not reachable", false);
  }
});

// Booking
// Support Form
// Support Form
document.getElementById("supportForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value;

  try {
    const res = await fetch(`${API_URL}/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, service, details })
    });

    const data = await res.json();
    document.getElementById("statusMsg").textContent = data.message;
    document.getElementById("statusMsg").style.color = res.ok ? "green" : "red";

    if (res.ok) e.target.reset();
  } catch (err) {
    document.getElementById("statusMsg").textContent = "⚠️ Server not reachable";
    document.getElementById("statusMsg").style.color = "red";
  }
});

