// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Chart.js Implementation for Economic Value
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('economicChart').getContext('2d');

    // Gradient for the chart bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(218, 165, 32, 0.8)'); // Gold
    gradient.addColorStop(1, 'rgba(0, 31, 63, 0.8)');   // Navy Blue

    const economicChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Retail', 'Manufacturing', 'Unpaid Household Work', 'Transportation'],
            datasets: [{
                label: 'Contribution to Economy (in Trillions USD)',
                data: [1.8, 2.3, 1.5, 1.2], // Comparative data points
                backgroundColor: [
                    'rgba(0, 31, 63, 0.5)',
                    'rgba(0, 31, 63, 0.5)',
                    gradient, // Highlight the Homemaker contribution
                    'rgba(0, 31, 63, 0.5)'
                ],
                borderColor: [
                    'rgba(0, 31, 63, 1)',
                    'rgba(0, 31, 63, 1)',
                    'rgba(218, 165, 32, 1)',
                    'rgba(0, 31, 63, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Trillions USD'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Economic Contribution Comparison',
                    font: {
                        size: 18,
                        family: "'Playfair Display', serif"
                    },
                    color: '#001f3f'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return '$' + context.parsed.y + ' Trillion';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });

    // --- New Data Analytics Charts ---

    // 1. Burnout Rates Chart
    const burnoutCtx = document.getElementById('burnoutChart').getContext('2d');
    new Chart(burnoutCtx, {
        type: 'bar',
        data: {
            labels: ['2015', '2026 (Projected)'],
            datasets: [{
                label: 'Burnout Index',
                data: [100, 170], // Representing a 70% increase
                backgroundColor: ['rgba(255, 255, 255, 0.3)', '#DAA520'],
                borderColor: ['rgba(255, 255, 255, 0.8)', '#FFD700'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#fff' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.raw + ' (Index)';
                        }
                    }
                }
            }
        }
    });

    // 2. Economic Value Chart
    const valueCtx = document.getElementById('valueChart').getContext('2d');
    new Chart(valueCtx, {
        type: 'bar',
        indexAxis: 'y', // Horizontal bar chart
        data: {
            labels: ['Avg. Salary', 'Homemaker Value'],
            datasets: [{
                label: 'Annual Value (USD)',
                data: [59000, 100000], // Comparison
                backgroundColor: ['rgba(255, 255, 255, 0.3)', '#DAA520'],
                borderColor: ['rgba(255, 255, 255, 0.8)', '#FFD700'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#fff' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 3. Child Development Success Chart
    const devCtx = document.getElementById('developmentChart').getContext('2d');
    new Chart(devCtx, {
        type: 'doughnut',
        data: {
            labels: ['Success Metric Gap', 'Baseline Success'],
            datasets: [{
                data: [30, 70], // 30% gap
                backgroundColor: ['#DAA520', 'rgba(255, 255, 255, 0.1)'],
                borderColor: ['#FFD700', 'rgba(255, 255, 255, 0.2)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#fff' }
                }
            },
            cutout: '70%' // Thinner ring
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger chart animation only when in view (Chart.js handles this by default effectively if created, but we could delay creation. For now, default is fine)
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .hero, .stat-card, .impact-card, .pillar-card').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // --- 14 Pillars Modal Logic ---
    const modal = document.getElementById('pillarModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSummary = document.getElementById('modalSummary');
    const modalStat = document.getElementById('modalStat');
    const modalStatDesc = document.getElementById('modalStatDesc');
    const closeModal = document.querySelector('.close-modal');
    const pillarCards = document.querySelectorAll('.pillar-card');

    function openModal(card) {
        const topic = card.getAttribute('data-topic');
        const summary = card.getAttribute('data-summary');
        const stat = card.getAttribute('data-stat');
        const statDesc = card.getAttribute('data-stat-desc');

        modalTitle.textContent = topic;
        modalSummary.textContent = summary;
        modalStat.textContent = stat;
        modalStatDesc.textContent = statDesc;

        modal.style.display = 'block';
        // Small timeout to effect the transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunction() {
        if (!modal) return;
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    pillarCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModalFunction();
        }
    });
});

