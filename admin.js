const API_URL = "http://localhost:5000";

// Fetch Users
async function fetchUsers() {
  try {
    const res = await fetch(`${API_URL}/admin/users`);
    const users = await res.json();
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";
    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2">No users found</td></tr>`;
    } else {
      users.forEach(u => {
        const row = `<tr><td>${u.name}</td><td>${u.email}</td></tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// Fetch Bookings
async function fetchBookings() {
  try {
    const res = await fetch(`${API_URL}/admin/bookings`);
    const bookings = await res.json();
    const tbody = document.querySelector("#bookingsTable tbody");
    tbody.innerHTML = "";
    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">No bookings found</td></tr>`;
    } else {
      bookings.forEach(b => {
        const row = `
          <tr>
            <td>${b.name}</td>
            <td>${b.email}</td>
            <td>${b.place}</td>
            <td>${b.date ? new Date(b.date).toLocaleString("en-IN") : "-"}</td>
          </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    }
  } catch (err) {
    console.error("Error fetching bookings:", err);
  }
}

// Fetch Support
async function fetchSupport() {
  try {
    const res = await fetch(`${API_URL}/admin/support`);
    const requests = await res.json();
    const tbody = document.querySelector("#supportTable tbody");
    tbody.innerHTML = "";
    if (requests.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No support requests found</td></tr>`;
    } else {
      requests.forEach(r => {
        const row = `
          <tr>
            <td>${r.name}</td>
            <td>${r.email}</td>
            <td>${r.service}</td>
            <td>${r.details}</td>
            <td>${r.date ? new Date(r.date).toLocaleString("en-IN") : "-"}</td>
          </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
      });
    }
  } catch (err) {
    console.error("Error fetching support:", err);
  }
}

// Load data on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  fetchBookings();
  fetchSupport();
});
