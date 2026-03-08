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
        loadComponent("footer-placeholder", "components/footer.html", () => {
            const yearEl = document.getElementById("footerYear");
            if (yearEl) yearEl.textContent = new Date().getFullYear();
        });
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
    if (document.getElementById("studentTableBody")) {
        initDashboard();
    }
});

// =========================================================
// DASHBOARD MODULE
// =========================================================
function initDashboard() {

    // --- 4a. Dynamic Date ---
    const dateEl = document.getElementById("currentDate");
    if (dateEl) {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        dateEl.textContent = now.toLocaleDateString("en-MY", options);
    }

    // --- 4b. Mock Student Data ---
    const students = [
        { id: "S001", name: "Ahmad Faris",    initials: "AF", bpm: 72,  status: "Safe",    location: "Classroom A" },
        { id: "S002", name: "Mei Ling",        initials: "ML", bpm: 85,  status: "Safe",    location: "Classroom B" },
        { id: "S003", name: "Raju Kumar",      initials: "RK", bpm: 118, status: "Alert",   location: "Hallway" },
        { id: "S004", name: "Sarah Johari",    initials: "SJ", bpm: 68,  status: "Safe",    location: "Classroom A" },
        { id: "S005", name: "Kenji Tanaka",    initials: "KT", bpm: 95,  status: "Warning", location: "Canteen" },
        { id: "S006", name: "Nurul Ain",       initials: "NA", bpm: 74,  status: "Safe",    location: "Classroom C" },
    ];

    const tableBody = document.getElementById("studentTableBody");
    let alertCount = 0;
    let totalBPM = 0;

    // --- 4c. Render Table ---
    students.forEach(s => {
        totalBPM += s.bpm;
        if (s.status === "Alert") alertCount++;

        let bpmClass = "normal";
        if (s.bpm >= 100 && s.bpm < 110) bpmClass = "elevated";
        if (s.bpm >= 110) bpmClass = "critical";

        let statusClass = s.status.toLowerCase();
        let avatarClass = s.status === "Alert" ? "alert-avatar" : "";
        let actionClass = s.status === "Alert" ? "action-btn alert-btn" : "action-btn";
        let actionText = s.status === "Alert" ? "Respond" : "Track";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong style="font-family: 'Courier New', monospace; color: var(--text-muted); font-size:0.85rem;">${s.id}</strong></td>
            <td>
                <div class="student-name-cell">
                    <div class="student-avatar ${avatarClass}">${s.initials}</div>
                    <div>
                        <div style="font-weight:600;">${s.name}</div>
                        <div style="font-size:0.75rem; color:var(--text-muted);">${s.location}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="bpm-cell ${bpmClass}">
                    <i class="fas fa-heartbeat"></i> ${s.bpm} <span style="font-size:0.75rem; font-weight:400; color:var(--text-muted);">bpm</span>
                </div>
            </td>
            <td><span class="status-badge ${statusClass}">${s.status}</span></td>
            <td><button class="${actionClass}">${actionText}</button></td>
        `;
        tableBody.appendChild(row);
    });

    // --- 4d. Update KPI Cards ---
    const avgBPM = Math.round(totalBPM / students.length);

    animateCounter("activeStudents", students.length);
    animateCounter("avgHeartRate", avgBPM);
    animateCounter("alertCount", alertCount);

    if (alertCount > 0) {
        const alertCard = document.getElementById("alertCard");
        if (alertCard) alertCard.classList.add("animate-pulse");
    }

    // --- 4e. Alert Banner ---
    if (alertCount > 0) {
        const alertBanner = document.getElementById("alertBanner");
        if (alertBanner) {
            alertBanner.style.display = "flex";
            const alertNames = students
                .filter(s => s.status === "Alert")
                .map(s => s.name)
                .join(", ");
            const alertTextEl = alertBanner.querySelector(".alert-text");
            if (alertTextEl) {
                alertTextEl.textContent = `⚠ Critical Alert: ${alertNames} requires immediate attention!`;
            }
            const dismissBtn = alertBanner.querySelector(".alert-dismiss");
            if (dismissBtn) {
                dismissBtn.addEventListener("click", () => {
                    alertBanner.style.display = "none";
                });
            }
        }
    }

    // --- 4f. Chart.js Stress Analysis ---
    const ctx = document.getElementById("heartRateChart");
    if (!ctx) return;

    // Generate 30-minute time labels (every 5 min)
    const now = new Date();
    const timeLabels = [];
    for (let i = 6; i >= 0; i--) {
        const t = new Date(now.getTime() - i * 5 * 60000);
        timeLabels.push(t.toLocaleTimeString("en-MY", { hour: "2-digit", minute: "2-digit" }));
    }

    // Simulated stress data (BPM over time)
    const stressData = [68, 70, 72, 75, 95, 118, 105];
    const normalRange = [100, 100, 100, 100, 100, 100, 100]; // threshold line

    new Chart(ctx, {
        type: "line",
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: "Avg BPM",
                    data: stressData,
                    borderColor: "#008080",
                    backgroundColor: "rgba(0, 128, 128, 0.08)",
                    borderWidth: 2.5,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: stressData.map(v => v >= 100 ? "#e53e3e" : "#008080"),
                    pointBorderColor: "#fff",
                    pointBorderWidth: 2,
                    pointHoverRadius: 7,
                },
                {
                    label: "Alert Threshold",
                    data: normalRange,
                    borderColor: "rgba(229, 62, 62, 0.4)",
                    borderWidth: 1.5,
                    borderDash: [6, 4],
                    pointRadius: 0,
                    fill: false,
                    tension: 0,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        font: { size: 11, family: "Inter" },
                        color: "#6b7c7c",
                        usePointStyle: true,
                        pointStyleWidth: 8,
                        padding: 16,
                    }
                },
                tooltip: {
                    backgroundColor: "rgba(15, 25, 35, 0.9)",
                    titleFont: { size: 12, weight: "bold" },
                    bodyFont: { size: 11 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => {
                            if (ctx.datasetIndex === 0) {
                                const val = ctx.parsed.y;
                                const status = val >= 100 ? " ⚠ Alert" : " ✓ Normal";
                                return ` BPM: ${val}${status}`;
                            }
                            return ` Threshold: ${ctx.parsed.y} bpm`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 50,
                    suggestedMax: 130,
                    grid: {
                        color: "rgba(0,0,0,0.04)",
                        borderDash: [4, 4],
                    },
                    ticks: {
                        font: { size: 11, family: "Inter" },
                        color: "#6b7c7c",
                        callback: (val) => `${val} bpm`,
                    },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { size: 11, family: "Inter" },
                        color: "#6b7c7c",
                    },
                    border: { display: false }
                }
            }
        }
    });

    // --- 4g. Live Data Simulation (updates every 8 seconds) ---
    setInterval(() => {
        const rows = tableBody.querySelectorAll("tr");
        let newTotal = 0;
        let newAlerts = 0;

        rows.forEach((row, i) => {
            const s = students[i];
            if (!s) return;

            // Simulate BPM fluctuation ±5
            const delta = Math.floor(Math.random() * 11) - 5;
            s.bpm = Math.max(55, Math.min(130, s.bpm + delta));

            // Update status based on BPM
            if (s.bpm >= 110) s.status = "Alert";
            else if (s.bpm >= 95) s.status = "Warning";
            else s.status = "Safe";

            newTotal += s.bpm;
            if (s.status === "Alert") newAlerts++;

            // Update BPM cell
            let bpmClass = "normal";
            if (s.bpm >= 100 && s.bpm < 110) bpmClass = "elevated";
            if (s.bpm >= 110) bpmClass = "critical";

            const bpmCell = row.querySelector(".bpm-cell");
            if (bpmCell) {
                bpmCell.className = `bpm-cell ${bpmClass}`;
                bpmCell.innerHTML = `<i class="fas fa-heartbeat"></i> ${s.bpm} <span style="font-size:0.75rem; font-weight:400; color:var(--text-muted);">bpm</span>`;
            }

            // Update status badge
            const badge = row.querySelector(".status-badge");
            if (badge) {
                badge.className = `status-badge ${s.status.toLowerCase()}`;
                badge.textContent = s.status;
            }
        });

        // Update KPI counters
        const newAvg = Math.round(newTotal / students.length);
        const avgEl = document.getElementById("avgHeartRate");
        if (avgEl) avgEl.textContent = newAvg;

        const alertEl = document.getElementById("alertCount");
        if (alertEl) alertEl.textContent = newAlerts;

        const alertCard = document.getElementById("alertCard");
        if (alertCard) {
            if (newAlerts > 0) alertCard.classList.add("animate-pulse");
            else alertCard.classList.remove("animate-pulse");
        }

    }, 8000);
}

// =========================================================
// UTILITY: Animated Counter
// =========================================================
function animateCounter(elementId, target) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const duration = 1200;
    const start = performance.now();
    const startVal = 0;

    const update = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(startVal + (target - startVal) * eased);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

// =========================================================
// UTILITY: Footer Year (Dynamic for Sesi II 25/26)
// =========================================================
function initFooterYear() {
    const yearEl = document.getElementById("footerYear");
    if (yearEl) {
        yearEl.textContent = "2025-2026";
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initFooterYear();
});
