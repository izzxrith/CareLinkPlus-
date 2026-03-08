/**
 * CareLink+ | Main JavaScript
 * Final Year Project - Politeknik Ungku Omar
 * Authors: Muhammad Izzarith, Muhammad Aifa Ammar, Lok Mei Yu
 */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. COMPONENT LOADER (Header & Footer)
    // =========================================================
    const loadComponent = (placeholderId, filePath, callback) => {
        const el = document.getElementById(placeholderId);
        if (!el) return;
        fetch(filePath)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${filePath}`);
                return res.text();
            })
            .then(html => {
                el.innerHTML = html;
                if (callback) callback();
            })
            .catch(err => console.warn(`Component load error: ${err.message}`));
    };

    if (document.getElementById("header-placeholder")) {
        loadComponent("header-placeholder", "components/header.html", initNavigation);
    }
    if (document.getElementById("footer-placeholder")) {
        loadComponent("footer-placeholder", "components/footer.html", initFooterYear);
    }

    // =========================================================
    // 2. NAVIGATION (Mobile Toggle + Scroll Highlight)
    // =========================================================
    function initNavigation() {
        const toggle = document.getElementById("navToggle");
        const navLinks = document.getElementById("navLinks");
        const navActions = document.querySelector(".nav-actions");

        if (toggle && navLinks) {
            toggle.addEventListener("click", () => {
                navLinks.classList.toggle("open");
                if (navActions) navActions.classList.toggle("open");
                const isOpen = navLinks.classList.contains("open");
                toggle.setAttribute("aria-expanded", isOpen);
            });

            // Close on link click
            navLinks.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("open");
                    if (navActions) navActions.classList.remove("open");
                });
            });
        }

        // Sticky nav shadow on scroll
        const nav = document.querySelector("nav.main-nav");
        if (nav) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 20) {
                    nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                } else {
                    nav.style.boxShadow = "0 1px 0 #e2eded";
                }
            });
        }
    }

    // =========================================================
    // 3. SCROLL ANIMATIONS (Intersection Observer)
    // =========================================================
    const animateOnScroll = () => {
        const targets = document.querySelectorAll(
            ".feature-card, .team-card, .step-card, .hero-stat-item"
        );
        if (!targets.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        targets.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });
    };
    animateOnScroll();

    // =========================================================
    // 4. DASHBOARD LOGIC
    // =========================================================
});



// =========================================================
// UTILITY: Footer Year (Dynamic for Sesi II 25/26)
// =========================================================
function initFooterYear() {
    const yearEl = document.getElementById("footerYear");
    if (yearEl) {
        yearEl.textContent = "2025-2026";
    }
}
