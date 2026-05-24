/**
 * CareLink+ | Main JavaScript
 * Final Year Project and Hackathon - Politeknik Ungku Omar
 * Authors: Muhammad Izzarith, Muhammad Aifa Ammar, Lok Mei Yu
 */

document.addEventListener("DOMContentLoaded", function() {

    // Component Loader (Header & Footer)
    function loadComponent(placeholderId, filePath, callback) {
        var el = document.getElementById(placeholderId);
        if (!el) {
            console.log("Placeholder not found: " + placeholderId);
            return;
        }
        
        fetch(filePath)
            .then(function(res) {
                if (!res.ok) throw new Error("Failed to load " + filePath + " - Status: " + res.status);
                return res.text();
            })
            .then(function(html) {
                el.innerHTML = html;
                if (callback) callback();
                console.log("Loaded: " + filePath);
            })
            .catch(function(err) {
                console.warn("Component load error: " + err.message);
                el.innerHTML = '<div style="background:red;color:white;padding:10px;text-align:center;">Footer failed to load. Check file path.</div>';
            });
    }

    function initNavigation() {
        var toggle = document.getElementById("navToggle");
        var navLinks = document.getElementById("navLinks");
        var navActions = document.querySelector(".nav-actions");

        if (toggle && navLinks) {
            toggle.addEventListener("click", function() {
                navLinks.classList.toggle("open");
                if (navActions) {
                    navActions.classList.toggle("open");
                }
                var isOpen = navLinks.classList.contains("open");
                toggle.setAttribute("aria-expanded", isOpen);
            });

            var links = navLinks.querySelectorAll("a");
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("click", function() {
                    navLinks.classList.remove("open");
                    if (navActions) {
                        navActions.classList.remove("open");
                    }
                });
            }
        }

        var nav = document.querySelector("nav.main-nav");
        if (nav) {
            window.addEventListener("scroll", function() {
                if (window.scrollY > 20) {
                    nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                } else {
                    nav.style.boxShadow = "0 1px 0 #e2eded";
                }
            });
        }
    }

    // Load Header
    if (document.getElementById("header-placeholder")) {
        loadComponent("header-placeholder", "components/header.html", initNavigation);
    } else {
        console.log("Header placeholder not found - using inline header");
        initNavigation();
    }

    // Load Footer
    if (document.getElementById("footer-placeholder")) {
        loadComponent("footer-placeholder", "components/footer.html", function() {
            var yearEl = document.getElementById("footerYear");
            if (yearEl) yearEl.textContent = "2025-2026";
        });
    } else {
        console.log("Footer placeholder not found");
        var yearEl = document.getElementById("footerYear");
        if (yearEl) yearEl.textContent = "2025-2026";
    }

    // Scroll Animations (Intersection Observer)
    var targets = document.querySelectorAll(".feature-card, .team-card, .hero-stat-item, .pillar-card, .madani-card");
    
    if (targets.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.style.opacity = "1";
                    entries[i].target.style.transform = "translateY(0)";
                    observer.unobserve(entries[i].target);
                }
            }
        }, { threshold: 0.1 });

        for (var i = 0; i < targets.length; i++) {
            targets[i].style.opacity = "0";
            targets[i].style.transform = "translateY(30px)";
            targets[i].style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(targets[i]);
        }
    }

});

// Image Modal Functionality
function openModal(imageSrc) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});