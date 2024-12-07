window.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    nav.classList.add("animate__animated", "animate__fadeInDown");
})

document.addEventListener("DOMContentLoaded", () => {
    const skillsTitle = document.querySelector(".skills_name h1");
    if (skillsTitle) {
        skillsTitle.classList.add("animate__animated", "animate__fadeInDown");
    }

    const skillCards = document.querySelectorAll(".cards div");
    skillCards.forEach((card, index) => {
        const direction = index === 0 ? "fadeInLeft" : index === 1 ? "fadeIn" : "fadeInRight";
        setTimeout(() => {
            card.classList.add("animate__animated", `animate__${direction}`);
        }, index * 200); 
    });

    const projectsTitle = document.querySelector(".projects h2");
    if (projectsTitle) {
        projectsTitle.classList.add("animate__animated", "animate__fadeInDown");
    }

    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("animate__animated", "animate__fadeInUp");
        }, index * 200);
    });

    const sections = document.querySelectorAll("section");
    window.addEventListener("scroll", () => {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("visible");
                if (section.classList.contains("project-card")) {
                    section.classList.add("animate__animated", "animate__fadeInUp");
                }
            }
        });
    });
});

function typeWriterLoop(element, words, speed = 100, delay = 1000) {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentText = isDeleting
            ? currentWord.substring(0, letterIndex--)
            : currentWord.substring(0, letterIndex++);

        element.textContent = currentText;

        if (!isDeleting && letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, delay); 
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; 
            setTimeout(type, 500); 
        } else {
            setTimeout(type, speed);
        }
    }

    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const typingTextElement = document.querySelector(".typing-text span");

    if (typingTextElement) {
        const words = ["Web Designer ", "Web Developer "];
        typeWriterLoop(typingTextElement, words, 100, 1500);
    }
});

document.querySelector(".contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    alert("Thank you for reaching out! I'll get back to you soon.");
});