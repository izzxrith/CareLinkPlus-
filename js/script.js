document.addEventListener("DOMContentLoaded", () => {
    
    // 1. LOAD COMPONENTS (Header/Footer)
    if(document.getElementById("header-placeholder")) {
        fetch("components/header.html").then(res => res.text()).then(data => document.getElementById("header-placeholder").innerHTML = data);
    }
    if(document.getElementById("footer-placeholder")) {
        fetch("components/footer.html").then(res => res.text()).then(data => document.getElementById("footer-placeholder").innerHTML = data);
    }

    // 2. RUN DASHBOARD LOGIC (Only if table exists)
    if(document.getElementById("studentTableBody")) {
        initDashboard();
    }
});

function initDashboard() {
    // Set Date
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-US', dateOptions);

    // MOCK DATA (Simulates your Database)
    const students = [
        { id: "S001", name: "Ahmad F.", bpm: 72, status: "Safe" },
        { id: "S002", name: "Mei Ling", bpm: 85, status: "Safe" },
        { id: "S003", name: "Raju K.", bpm: 115, status: "Alert" },
        { id: "S004", name: "Sarah J.", bpm: 68, status: "Safe" },
        { id: "S005", name: "Kenji T.", bpm: 74, status: "Safe" }
    ];

    const tableBody = document.getElementById('studentTableBody');
    let alertCount = 0;
    let totalBPM = 0;

    // Render Table
    students.forEach(s => {
        totalBPM += s.bpm;
        if(s.status === "Alert") alertCount++;
        let statusClass = s.status === "Safe" ? "safe" : "alert";
        let bpmStyle = s.status === "Alert" ? "color: red; font-weight: bold;" : "";

        tableBody.innerHTML += `
            <tr>
                <td><strong>${s.id}</strong></td>
                <td>${s.name}</td>
                <td style="${bpmStyle}"><i class="fas fa-heartbeat"></i> ${s.bpm}</td>
                <td><span class="status-badge ${statusClass}">${s.status}</span></td>
                <td><a href="#" style="color: var(--primary-teal); font-weight:bold;">Track</a></td>
            </tr>`;
    });

    // Update KPIs
    document.getElementById('activeStudents').innerText = students.length;
    document.getElementById('avgHeartRate').innerText = Math.round(totalBPM / students.length);
    document.getElementById('alertCount').innerText = alertCount;
    if(alertCount > 0) document.getElementById('alertCard').classList.add('animate-pulse');

    // Render Chart
    const ctx = document.getElementById('heartRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25'],
            datasets: [{
                label: 'Stress Level',
                data: [65, 66, 68, 70, 110, 85],
                borderColor: '#008080',
                backgroundColor: 'rgba(0, 128, 128, 0.05)',
                borderWidth: 2, tension: 0.4, fill: true,
                pointRadius: 3, pointBackgroundColor: '#fff'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false, suggestedMin: 50, grid: { borderDash: [5, 5] } },
                x: { grid: { display: false } }
            }
        }
    });
}