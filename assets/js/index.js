const buttonMenu = document.querySelector("header button");
const buttonShowMore = document.querySelector(".show-more");

function toggleMenu() {
    const menu = document.querySelector("header nav");
    const iconMenuOpen = document.querySelector(
        "header button img:nth-child(1)"
    );
    const iconMenuClosed = document.querySelector(
        "header button img:nth-child(2)"
    );

    menu.classList.toggle("hidden");
    iconMenuOpen.classList.toggle("hidden");
    iconMenuClosed.classList.toggle("hidden");
}

function showAllProjects() {
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => project.classList.remove("hidden"));

    buttonShowMore.classList.add("hidden");
}

buttonMenu.addEventListener("click", toggleMenu);
buttonShowMore.addEventListener("click", showAllProjects);

// buttonNext.addEventListener("click", nextProject);

// Funções para versão--------------------------------------------------------
function appVersion() {
    const windowsWidth = window.screen.width;

    if (windowsWidth > 600) {
        showDesktopVersion();
    } else {
        showMobileVersion();
    }
}

function showDesktopVersion() {
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => project.classList.remove("hidden"));
}

function showMobileVersion() {
    showOnlyThreeProjects();
    buttonShowMore.classList.remove("hidden");
}

function showOnlyThreeProjects() {
    const projects = Array.from(document.querySelectorAll(".project"));
    for (let cont in projects) {
        if (cont <= 2) {
            projects[cont].classList.remove("hidden");
        } else {
            projects[cont].classList.add("hidden");
        }
    }
}

window.addEventListener("resize", appVersion);

appVersion();

// Funções para Slider -------------------------------------------------------
const sliderControls = document.querySelectorAll(".control-slider");
let currentProjects;
const projects = document.querySelectorAll(".project");
const maxProjects = projects.length;

sliderControls.forEach(control =>
    control.addEventListener("click", slideProject)
);

function slideProject(e) {
    //Para o slider funcionar como o esperado, é necessário mover a tela um px
    moveTheScreen();

    const isLeftControl = e.currentTarget.classList.contains("arrow-left");

    if (isLeftControl) {
        currentProjects -= 1;
    } else {
        currentProjects += 1;
    }

    if (currentProjects >= maxProjects) {
        currentProjects = 0;
    }

    if (currentProjects < 0) {
        currentProjects = maxProjects - 1;
    }

    projects[currentProjects].scrollIntoView({
        behavior: "smooth",
        inline: "center",
    });

    projects.forEach(project =>
        project.children[2].classList.remove("current-project")
    );
    projects[currentProjects].children[2].classList.add("current-project");
}

function moveTheScreen() {
    const currentPosition = window.scrollY;
    window.scrollTo(0, currentPosition + 1);
}

function projectsDisplayed() {
    const windowsWidth = window.screen.width;

    if (windowsWidth < 800) {
        currentProjects = 1;
    } else {
        currentProjects = 2;
    }
}

function highlightExhibitedProjects() {
    projects.forEach(project =>
        project.children[2].classList.add("current-project")
    );
}

projectsDisplayed();
highlightExhibitedProjects();
