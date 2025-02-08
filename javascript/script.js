// script.js

// Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyBSa4poUSDiUzeoSYLQ820dOAkY6O8GUAI",
//     authDomain: "fedtest-92d2a.firebaseapp.com",
//     projectId: "fedtest-92d2a",
//     storageBucket: "fedtest-92d2a.firebasestorage.app",
//     messagingSenderId: "861537843799",
//     appId: "1:861537843799:web:88ffab07af36ae27344112",
//     measurementId: "G-3QYRFVJXMG"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Google Authentication Function
// const provider = new firebase.auth.GoogleAuthProvider();

// function googleLogin() {
//     firebase.auth().signInWithPopup(provider)
//         .then((result) => {
//             console.log(result.user);
//             alert("Logged in as " + result.user.displayName);
//         })
//         .catch((error) => console.log(error));
// }

// Signup Function
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Signup successful!");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Login Function
document.getElementById("login-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "../index.html"; // Redirect after login
        })
        .catch((error) => {
            alert(error.message);
        });
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

else if (path.includes('purchase-history.html')) {
    // Get the arrow and submenu elements
    const arrow = document.querySelectorAll('.arrow');
    const submenu = document.querySelectorAll('.submenu');
    
    // Add a click event listener to toggle the submenu visibility
    arrow.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            submenu[index].classList.toggle('show'); // Toggle the 'show' class
        });
    })
}

else if (path.includes('account.html')) {
    // Get the arrow and submenu elements
    const arrow = document.querySelectorAll('.arrow');
    const submenu = document.querySelectorAll('.submenu');
    
    // Add a click event listener to toggle the submenu visibility
    arrow.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            submenu[index].classList.toggle('show'); // Toggle the 'show' class
        });
    })
}

else if (path.includes('promote.html')) {
    // Get the arrow and submenu elements
    const arrow = document.querySelectorAll('.arrow');
    const submenu = document.querySelectorAll('.submenu');
    
    // Add a click event listener to toggle the submenu visibility
    arrow.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            submenu[index].classList.toggle('show'); // Toggle the 'show' class
        });
    })
}

else if (path.includes('shop-all.html')) {
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("searchBar");
        const products = document.querySelectorAll(".product-item, .product-link");
        const categoryItems = document.querySelectorAll(".category-item");
        const priceFilter = document.getElementById("price-range");
        // Select all the like buttons
        const likeButtons = document.querySelectorAll('.like-button i');

        // Search Functionality
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.toLowerCase();
            products.forEach(product => {
                const name = product.dataset.name.toLowerCase();
                product.style.display = name.includes(query) ? "block" : "none";
            });
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const query = searchInput.value.toLowerCase();
                products.forEach(product => {
                    const name = product.dataset.name ? product.dataset.name.toLowerCase() : '';  // Check if data-name exists
                    product.style.display = name.includes(query) ? "block" : "none";
                });
            }
        });

        // Category Filtering
        categoryItems.forEach(item => {
            item.addEventListener("click", function () {
                const selectedCategory = this.dataset.category;
        
                products.forEach(product => {
                    // Check if it's a product item or wrapped inside a link
                    const productCategory = product.querySelector('.product-item') ? product.querySelector('.product-item').dataset.category : product.dataset.category;
                    
                    if (productCategory === selectedCategory || selectedCategory === "all") {
                        product.style.visibility = "visible";
                        product.style.position = "static";
                    } else {
                        product.style.visibility = "hidden";
                        product.style.position = "absolute";
                    }
                });
            });
        });

        // Price Filtering
        priceFilter.addEventListener("input", function () {
            const maxPrice = parseFloat(priceFilter.value);
            products.forEach(product => {
                const price = parseFloat(product.dataset.price);
                product.style.display = price <= maxPrice ? "block" : "none";
            });
        });

        // Loop through each button and add an event listener for the 'click' event
        likeButtons.forEach(button => {
            // Retrieve the product ID or a unique identifier from the data attribute
            const productItem = button.closest('.product-item');
            const productId = productItem.getAttribute('data-id');  // Make sure you add a unique data-id to each product

            // Check if the product is already liked (from localStorage)
            if (localStorage.getItem(productId) === 'liked') {
                button.classList.add('liked');
                button.style.color = 'red'; // Set the color of the heart
            }

            button.addEventListener('click', () => {
                // Toggle the 'liked' class on the <i> element when clicked
                button.classList.toggle('liked');
                // Change the text depending on whether the button is liked or not
                if (button.classList.contains('liked')) {
                    button.style.color = 'red'; // Set color to red when liked
                    localStorage.setItem(productId, 'liked'); // Store the like in localStorage
                } else {
                    button.style.color = 'black'; // Set color back to black when unliked
                    localStorage.removeItem(productId); // Remove the like from localStorage
                }
            });
        });
    });
}

else if (path.includes('checkout.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('checkout-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from reloading the page
            window.location.href = 'order-complete.html'; // Redirect to the order complete page
        });
    });
}


    // Select the menu toggle icon and side navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const sideNav = document.querySelector('.side-nav');
    const closeBtn = document.querySelector('.close-btn');

    if (menuToggle && sideNav && closeBtn) { // Check if elements exist
        menuToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
        });
        
        closeBtn.addEventListener('click', () => {
            sideNav.classList.remove('active');
        });
    }







// support function
document.addEventListener('DOMContentLoaded', () => {
    const surveyForm = document.getElementById('customer-survey');

    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const formData = {
            question1: document.querySelector('input[name="question1"]:checked')?.value,
            question2: document.querySelector('input[name="question2"]:checked')?.value,
            openEndedResponse: document.querySelector('textarea').value,
            rating: document.querySelector('input[name="rating"]:checked')?.value
        };

        // Basic form validation
        if (!formData.question1 || !formData.question2) {
            alert('Please answer all multiple-choice questions.');
            return;
        }

        // Here you would typically send the data to a server
        console.log('Survey Submission:', formData);
        
        // Optional: Show thank you message
        alert('Thank you for completing our survey!');
        surveyForm.reset();
    });
});



