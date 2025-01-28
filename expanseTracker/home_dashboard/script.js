
// Dynamic Welcome Message
const welcomeMessage = document.getElementById("welcome-message");
const currentHour = new Date().getHours();
if (currentHour < 12) {
    welcomeMessage.textContent = "Good Morning!";
} else if (currentHour < 18) {
    welcomeMessage.textContent = "Good Afternoon!";
} else {
    welcomeMessage.textContent = "Good Evening!";
}

// Toggle dropdown visibility
document.getElementById("color-toggle-btn").addEventListener("click", () => {
    const dropdown = document.getElementById("color-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Apply theme when dropdown item is clicked
document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
        const theme = item.getAttribute("data-theme");
        document.body.className = ''; // Reset current theme
        document.body.classList.add(theme); // Apply new theme
        document.getElementById("color-dropdown").style.display = "none"; // Hide dropdown
    });
});

// Search functionality
const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".card-btn").forEach(button => {
        const toolName = button.textContent.toLowerCase();
        button.style.display = toolName.includes(query) ? "block" : "none";
    });
});

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    // Add the "show" class if scrolled more than 200px
    if (window.scrollY > 200) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Recent Activity (Mock Data)
// Recent Activity (Mock Data)
const activityList = document.getElementById("activity-list");
const activities = ["Opened Expense Tracker", "Viewed Currency Converter"];

// Check if the activityList element exists
if (activityList) {
    console.log("Activity List found!");
    
    // Clear the existing content before adding new items
    activityList.innerHTML = "";

    activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = activity;
        activityList.appendChild(li);
    });

    // Check if activities are added
    console.log("Activities added:", activities);
} else {
    console.error("Activity list element not found.");
}
// Toggle Mobile Menu

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});
