// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent the form from submitting the usual way

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Send login data to backend
    try {
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login successful!");
            // Redirect to another page (e.g., dashboard) after login
            window.location.href = "dashboard.html";  // Example redirect
        } else {
            alert(result.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Error during login. Please try again later.");
    }
});

// Handle register form submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent the form from submitting the usual way

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Send registration data to backend
    try {
        const response = await fetch("http://localhost:3000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registration successful!");
            // Redirect to login page after registration
            window.location.href = "login.html";  // Example redirect
        } else {
            alert(result.message || "Registration failed");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("Error during registration. Please try again later.");
    }
});
