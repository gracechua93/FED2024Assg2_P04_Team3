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

const path = window.location.pathname;

document.querySelectorAll(".category-buttons button").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".category-buttons button").forEach(btn => btn.classList.remove("selected")); // Remove class from all
        this.classList.add("selected"); // Add class to clicked button
    });
});

if (path.includes("contact.html")) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      })
    })
  
    const hiddenInfo = document.querySelectorAll(".faq-item");
    hiddenInfo.forEach((el) => observer.observe(el));
  
}

else if (path.includes("login.html")) {
    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Show the loading animation
        const loadingDiv = document.getElementById('loading-animation');
        loadingDiv.style.display = 'flex';

        // Simulate server processing (e.g., 3 seconds delay)
        setTimeout(() => {
            // Hide the loading animation
            loadingDiv.style.display = 'none';

            // Redirect to index
            window.location.href = 'index.html';
        }, 3000);
    });
}

else if (path.includes("create-listing.html")) {
    document.querySelectorAll('arrow').forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            const dropdown = event.target.closest('.menu-item');
            const submenu = dropdown.nextElementSibling; // Find the corresponding submenu
            if (submenu) {
                submenu.classList.toggle('show'); // Toggle the 'show' class
            }
        });
    });

    // Get the arrow and submenu elements
    const arrow = document.querySelectorAll('.arrow');
    const submenu = document.querySelectorAll('.submenu');
    
    // Add a click event listener to toggle the submenu visibility
    arrow.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            submenu[index].classList.toggle('show'); // Toggle the 'show' class
        });
    })


    // Get the button and file input
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-input');

    // Trigger file input when the button is clicked
    uploadButton.addEventListener('click', (event) => {
        event.preventDefault();
        fileInput.click();
    });

    // Handle the file selection
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(`File selected: ${file.name}`);
        }
    });
}
