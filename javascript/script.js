// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSa4poUSDiUzeoSYLQ820dOAkY6O8GUAI",
    authDomain: "fedtest-92d2a.firebaseapp.com",
    projectId: "fedtest-92d2a",
    storageBucket: "fedtest-92d2a.firebasestorage.app",
    messagingSenderId: "861537843799",
    appId: "1:861537843799:web:88ffab07af36ae27344112",
    measurementId: "G-3QYRFVJXMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Function
document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "../index.html"; // Redirect after login
        })
        .catch((error) => {
            alert(error.message);
        });
});


// Google Authentication Function
const provider = new GoogleAuthProvider();
function googleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
      alert("Logged in as " + result.user.displayName);
    })
    .catch((error) => console.log(error));
}

// Signup Function
document.getElementById("signup-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful!");
      window.location.href = "login.html"; // Redirect to login page
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

else if (path.includes('filter-sort.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        // Close Filter & Sort Section
        const closeFilterBtn = document.getElementById("close-filter");
        const filterPage = document.getElementById("filter-page");
      
        closeFilterBtn.addEventListener("click", () => {
          filterPage.style.display = "none"; // Hides the filter page
        });
      
        // Toggle Filter Sections
        const toggleButtons = document.querySelectorAll(".filter-section .toggle-btn");
      
        toggleButtons.forEach((btn) => {
          btn.addEventListener("click", () => {
            const filterOptions = btn.parentElement.nextElementSibling; // Get the sibling div with options
            const icon = btn.querySelector("i");
      
            // Toggle visibility
            if (filterOptions.style.display === "block") {
              filterOptions.style.display = "none"; // Hide options
              icon.className = "fi fi-br-plus"; // Change back to plus icon
            } else {
              filterOptions.style.display = "block"; // Show options
              icon.className = "fi fi-br-minus"; // Change to minus icon
            }
          });
        });
    });
}

else if (path.includes('product.html')) {
    let isAdded = false;  // Flag to ensure the button is clicked only once

    document.getElementById("add-to-cart").addEventListener("click", function() {
        // Find the cart number element
        let cartNumber = document.querySelector(".cart-number");

        // Check if the cart number element exists
        if (cartNumber) {
            if (!isAdded) {
                // Increment the cart number by 1
                let currentNumber = parseInt(cartNumber.innerText);

                // Show the cart number and increment it
                currentNumber += 1;
                cartNumber.innerText = currentNumber;

                // Make sure the cart number is visible if it's not already
                cartNumber.style.display = "inline-block";  // Ensure it's visible

                // Animation: Pop-in effect for the cart number
                cartNumber.style.transform = "scale(0)";
                cartNumber.style.transition = "transform 0.3s ease-in-out";
                setTimeout(function() {
                    cartNumber.style.transform = "scale(1)";
                }, 10);

                // Set the flag to true to prevent future clicks from adding to the cart
                isAdded = true;
            }
        } else {
            console.error("Cart number element not found!");
        };
    });
};


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


// mystery box function

class MysteryBox {
    constructor() {
        this.prizes = [
            { points: 0, weight: 40 },    // 40% chance
            { points: 10, weight: 30 },   // 30% chance
            { points: 50, weight: 15 },   // 15% chance
            { points: 100, weight: 10 },  // 10% chance
            { points: 500, weight: 4 },   // 4% chance
            { points: 1000, weight: 1 }   // 1% chance
        ];
        
        this.boxElement = document.getElementById('mysteryBox');
        this.timerElement = document.getElementById('timer');
        this.init();
    }

    init() {
        this.updateBoxState();
        setInterval(() => this.updateBoxState(), 1000);
        this.boxElement.addEventListener('click', () => this.handleClick());
    }

    getNextOpenTime() {
        const now = new Date();
        const gmt8Offset = 8 * 60 * 60 * 1000; // GMT+8 offset in milliseconds
        const gmt8Time = new Date(now.getTime() + gmt8Offset);
        const nextReset = new Date(gmt8Time);
        nextReset.setHours(24, 0, 0, 0); // Set to next midnight GMT+8
        
        const lastOpen = localStorage.getItem('lastBoxOpen');
        if (!lastOpen) return null;
        
        const lastOpenDate = new Date(parseInt(lastOpen));
        const timeSinceOpen = now - lastOpenDate;
        
        if (timeSinceOpen < 24 * 60 * 60 * 1000) { // Less than 24 hours
            return new Date(lastOpenDate.getTime() + 24 * 60 * 60 * 1000);
        }
        
        return null;
    }

    updateBoxState() {
        const nextOpenTime = this.getNextOpenTime();
        
        if (nextOpenTime) {
            const timeRemaining = nextOpenTime - new Date();
            if (timeRemaining > 0) {
                const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
                const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
                
                this.timerElement.textContent = `Next box available in: ${hours}h ${minutes}m ${seconds}s`;
                this.boxElement.classList.add('disabled');
            } else {
                this.timerElement.textContent = 'Box is ready!';
                this.boxElement.classList.remove('disabled');
            }
        } else {
            this.timerElement.textContent = 'Box is ready!';
            this.boxElement.classList.remove('disabled');
        }
    }

    getRandomPrize() {
        const totalWeight = this.prizes.reduce((sum, prize) => sum + prize.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const prize of this.prizes) {
            random -= prize.weight;
            if (random <= 0) return prize.points;
        }
        
        return this.prizes[0].points; // Fallback
    }

    showPrizeAnimation(points) {
        const prizeElement = document.createElement('div');
        prizeElement.className = 'prize-animation';
        prizeElement.innerHTML = `
            <h2>Your Prize!</h2>
            <div class="prize-points">${points} Points</div>
            <button class="close-button">Close</button>
        `;
        
        document.body.appendChild(prizeElement);
        
        prizeElement.querySelector('.close-button').addEventListener('click', () => {
            prizeElement.remove();
        });
    }

    handleClick() {
        if (this.boxElement.classList.contains('disabled')) return;
        
        const points = this.getRandomPrize();
        localStorage.setItem('lastBoxOpen', new Date().getTime());
        this.updateBoxState();
        this.showPrizeAnimation(points);
        
        // Add points to the points system
        window.pointsSystem.addPoints(points);
    }
    
}

class PointsSystem {
    constructor() {
        this.points = parseInt(localStorage.getItem('userPoints')) || 0;
        this.rewards = [
            { name: 'Free Delivery', cost: 50000, code: 'FREEDEL' },
            { name: '10% Discount', cost: 10000, code: 'DISC10' },
            { name: '50% Discount', cost: 100000, code: 'DISC50' }
        ];
        this.init();
    }

    init() {
        this.updatePointsDisplay();
        this.renderRewards();
    }

    addPoints(amount) {
        this.points += amount;
        localStorage.setItem('userPoints', this.points);
        this.updatePointsDisplay();
        this.updateRewardAvailability();
    }

    updatePointsDisplay() {
        const pointsDisplay = document.getElementById('pointsDisplay');
        if (pointsDisplay) {
            pointsDisplay.textContent = this.points.toLocaleString();
        }
    }

    updateRewardAvailability() {
        this.rewards.forEach(reward => {
            const button = document.getElementById(`redeem-${reward.cost}`);
            if (button) {
                button.disabled = this.points < reward.cost;
            }
        });
    }

    redeemReward(reward) {
        if (this.points >= reward.cost) {
            this.points -= reward.cost;
            localStorage.setItem('userPoints', this.points);
            this.updatePointsDisplay();
            this.updateRewardAvailability();
            this.showRedemptionSuccess(reward);
        }
    }

    showRedemptionSuccess(reward) {
        const notification = document.createElement('div');
        notification.className = 'redemption-notification';
        notification.innerHTML = `
            <h3>Reward Redeemed!</h3>
            <p>You've successfully redeemed ${reward.name}</p>
            <p>Your code: <strong>${reward.code}</strong></p>
            <button class="close-button">Close</button>
        `;
        
        document.body.appendChild(notification);
        
        notification.querySelector('.close-button').addEventListener('click', () => {
            notification.remove();
        });
    }

    renderRewards() {
        const rewardsContainer = document.getElementById('rewardsContainer');
        if (rewardsContainer) {
            this.rewards.forEach(reward => {
                const rewardElement = document.createElement('div');
                rewardElement.className = 'reward-item';
                rewardElement.innerHTML = `
                    <h3>${reward.name}</h3>
                    <p>${reward.cost.toLocaleString()} points</p>
                    <button id="redeem-${reward.cost}" 
                            class="redeem-button" 
                            ${this.points < reward.cost ? 'disabled' : ''}>
                        Redeem
                    </button>
                `;
                
                rewardsContainer.appendChild(rewardElement);
                
                rewardElement.querySelector('.redeem-button').addEventListener('click', () => {
                    this.redeemReward(reward);
                });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Points and Mystery Box only if they exist on the page
    if (document.getElementById('mysteryBox')) {
        window.pointsSystem = new PointsSystem();
        new MysteryBox();
    }
const pointsToggle = document.querySelector('.points-toggle');
const pointsSidebar = document.querySelector('.points-sidebar');
const pointsClose = document.querySelector('.points-close');

if (pointsToggle && pointsSidebar && pointsClose) {
    pointsToggle.addEventListener('click', () => {
        pointsSidebar.classList.toggle('active');
        pointsToggle.classList.toggle('active');
    });

    pointsClose.addEventListener('click', () => {
        pointsSidebar.classList.remove('active');
        pointsToggle.classList.remove('active');
    });
}
}); 

// support function
const surveyForm = document.getElementById('surveyForm');
if (surveyForm) {
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
}

// publish

document.addEventListener("DOMContentLoaded", function () {
    const publishButton = document.querySelector(".action-buttons button:last-child"); // Select the "Publish" button

    if (publishButton) {
        publishButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default form submission (if needed)
            
            // Show a pop-up alert (You can replace this with a modal for better UI)
            alert("Listing created successfully!");

            // Optionally, reset the form
            document.getElementById("create-product-content").reset();
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkout-form");

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const payment = document.getElementById("payment").value;

        if (name === "" || address === "" || payment === "") {
            alert("Please fill out all fields before proceeding.");
        } else {
            window.location.href = "order-complete.html"; // Redirect on successful validation
        }
    });
});

