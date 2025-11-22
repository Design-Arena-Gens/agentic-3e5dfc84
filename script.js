let votes = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
};

let hasVoted = false;

function startFacts() {
    document.getElementById('intro').classList.remove('active');
    setTimeout(() => {
        document.getElementById('fact1').classList.add('active');
        createParticles();
    }, 300);
}

function nextFact(factNumber) {
    const currentFact = document.querySelector('.fact-screen.active');
    currentFact.classList.remove('active');

    setTimeout(() => {
        document.getElementById(`fact${factNumber}`).classList.add('active');
        createParticles();
    }, 300);
}

function showOutro() {
    const currentFact = document.querySelector('.fact-screen.active');
    currentFact.classList.remove('active');

    setTimeout(() => {
        document.getElementById('outro').classList.add('active');
        createExplosion();
    }, 300);
}

function voteFact(factNumber) {
    if (!hasVoted) {
        votes[factNumber]++;
        document.getElementById(`vote${factNumber}`).textContent = votes[factNumber];

        const voteBtn = event.currentTarget;
        voteBtn.classList.add('voted');

        hasVoted = true;

        // Store votes in localStorage
        localStorage.setItem('factVotes', JSON.stringify(votes));

        setTimeout(() => {
            voteBtn.classList.remove('voted');
        }, 500);
    }
}

function restart() {
    document.getElementById('outro').classList.remove('active');
    hasVoted = false;

    setTimeout(() => {
        document.getElementById('intro').classList.add('active');
    }, 300);
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const emojis = ['✨', '🌟', '💫', '⭐', '🎉', '🎊'];

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

function createExplosion() {
    const particlesContainer = document.getElementById('particles');
    const emojis = ['🤯', '💥', '✨', '🌟', '💫', '⭐', '🎉', '🎊', '🔥'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 0.5) + 's';
        particle.style.animationDuration = (Math.random() * 2 + 3) + 's';

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

// Load votes from localStorage on page load
window.addEventListener('load', () => {
    const savedVotes = localStorage.getItem('factVotes');
    if (savedVotes) {
        votes = JSON.parse(savedVotes);
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`vote${i}`).textContent = votes[i];
        }
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeScreen = document.querySelector('.intro-screen.active, .fact-screen.active, .outro-screen.active');
        if (activeScreen) {
            const button = activeScreen.querySelector('button');
            if (button) {
                button.click();
            }
        }
    }
});
