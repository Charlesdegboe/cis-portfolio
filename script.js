// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation class to elements when they come into view
    const observerOptions = {
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe section titles and cards
    document.querySelectorAll('section h2, .skill-card, .project-card').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});

// Typing effect for skills
const skills = ["Business Process Management", "Cybersecurity", "Data Analysis", "System Integration"];
let currentSkillIndex =-1;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    if (currentSkillIndex === -1 || (isDeleting && currentCharIndex === 0)) {
        currentSkillIndex = isDeleting ? (currentSkillIndex + 1) % skills.length : 0;
        isDeleting = false;
        currentCharIndex = 0;
    }
    
    const currentSkill = skills[currentSkillIndex];
    
    if (!isDeleting) {
        typingElement.textContent = currentSkill.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentSkill.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause before deleting
        }
    } else {
        typingElement.textContent = currentSkill.substring(0, currentCharIndex);
        currentCharIndex--;
        typingSpeed = 50; // Delete faster
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start the typing effect
setTimeout(typeText, 1000);
// Back to top button
const backToTopButton = document.getElementById('back-to-top');
    
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Force scroll to top on page refresh
window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });
  window.onload = function () {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

 // Modal popups for skills
document.querySelectorAll('.skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const skill = btn.getAttribute('data-skill');
      document.getElementById(`modal-${skill}`).style.display = 'block';
    });
  });
  
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });
  
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  
  
