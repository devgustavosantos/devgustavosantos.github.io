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
