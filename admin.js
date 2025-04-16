import allServices from "./services/index.js";

// Admin credentials (in real application, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123",
};

// Initialize services from the default list if localStorage is empty
if (!localStorage.getItem("services")) {
    localStorage.setItem("services", JSON.stringify(allServices));
}

window.login = function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("Attempting to login with", { username, password }); // Debugging output

    if (
        username === ADMIN_CREDENTIALS.username &&
        password === ADMIN_CREDENTIALS.password
    ) {
        console.log("Login successful"); // Debugging output
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        displayAdminServices();
    } else {
        console.error("Invalid credentials"); // Debugging output
        alert("Invalid credentials!");
    }
};

function logout() {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("dashboard").style.display = "none";
}

function deleteService(index) {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    console.log("Deleting service at index:", index); // Debugging output
    if (index > -1 && index < services.length) {
        services.splice(index, 1); // Remove the service from the array
        localStorage.setItem("services", JSON.stringify(services)); // Update localStorage
        console.log("Service deleted successfully"); // Debugging output
        displayAdminServices(); // Refresh the displayed list of services
    } else {
        console.error("Invalid index for deletion"); // Error handling
    }
}

function displayAdminServices() {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    const servicesList = document.getElementById("adminServicesList");
    const categories = ["tires", "maintenance", "repairs", "diagnostic"];

    servicesList.innerHTML = categories
        .map(
            (category) => `
        <div class="category-section">
            <h3 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="category-services">
                ${
                    services
                        .filter((service) => service.category === category)
                        .map(
                            (service, index) => `
                        <div class="service-card">
                            <h3>${service.name}</h3>
                            <p>${service.description}</p>
                            <p>${service.price}</p>
                            <button onclick="deleteService(${index})" style="background: #ff4444;">Delete</button>
                        </div>
                    `,
                        )
                        .join("") || "<p>No services in this category</p>"
                }
            </div>
        </div>
    `,
        )
        .join("");
}

function addService() {
    const category = document.getElementById("serviceCategory").value;
    const name = document.getElementById("serviceName").value;
    const price = document.getElementById("servicePrice").value;
    const description = document.getElementById("serviceDescription").value;
    const imageFile = document.getElementById("serviceImage").files[0];

    if (name && price && description) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const services = JSON.parse(localStorage.getItem("services")) || [];
            services.push({
                category,
                name,
                price,
                description,
                image: e.target.result,
            });
            localStorage.setItem("services", JSON.stringify(services));
            displayAdminServices();
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const services = JSON.parse(localStorage.getItem("services")) || [];
            services.push({ category, name, price, description });
            localStorage.setItem("services", JSON.stringify(services));
            displayAdminServices();
        }
        clearForm();
    } else {
        alert("Please fill all fields!");
    }
}

function clearForm() {
    document.getElementById("serviceName").value = "";
    document.getElementById("servicePrice").value = "";
    document.getElementById("serviceDescription").value = "";
}
