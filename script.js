// script.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    // API Base URL and Key
    const API_BASE_URL = "https://watesigma-85a1.restdb.io/rest/test1"; // Replace with your actual API base URL
    const API_KEY = "67962c99c5711c1252f2c51d"; // Your API key from the dashboard

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({ email, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Login failed: ${errorData.message}`);
                } else {
                    const data = await response.json();
                    alert(`Login successful! Welcome, ${data.name}`);
                    // Redirect to the homepage or dashboard
                    window.location.href = "/index.html";
                }
            } catch (error) {
                alert("An error occurred during login. Please try again.");
                console.error("Login Error:", error);
            }
        });
    }

    // Handle Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            try {
                const response = await fetch(`${API_BASE_URL}/users/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({ name, email, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Signup failed: ${errorData.message}`);
                } else {
                    const data = await response.json();
                    alert("Signup successful! Please log in.");
                    // Redirect to login page
                    window.location.href = "login.html";
                }
            } catch (error) {
                alert("An error occurred during signup. Please try again.");
                console.error("Signup Error:", error);
            }
        });
    }
});