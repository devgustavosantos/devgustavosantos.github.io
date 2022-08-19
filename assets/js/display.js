export function Display({ projects, buttonShowMore }) {
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
        projects.forEach(project => project.classList.remove("hidden"));

        buttonShowMore.classList.add("hidden");
    }

    function showOnlyThreeProjects() {
        const onlyProjects = Array.from(projects);
        for (let cont in onlyProjects) {
            if (cont <= 2) {
                onlyProjects[cont].classList.remove("hidden");
            } else {
                onlyProjects[cont].classList.add("hidden");
            }
        }
    }

    function showDesktopVersion() {
        projects.forEach(project => project.classList.remove("hidden"));
    }

    function showMobileVersion() {
        showOnlyThreeProjects();
        buttonShowMore.classList.remove("hidden");
    }

    function highlightCurrentProject(currentProject) {
        projects.forEach(project =>
            project.children[2].classList.remove("current-project")
        );
        projects[currentProject].children[2].classList.add("current-project");
    }

    function highlightAllProjects() {
        projects.forEach(project =>
            project.children[2].classList.add("current-project")
        );
    }

    function moveScreen() {
        const currentPosition = window.scrollY;
        window.scrollTo(0, currentPosition + 1);
    }

    function moveSlider(currentProject) {
        //Para o slider funcionar como o esperado, é necessário mover a tela um px
        moveScreen();

        projects[currentProject].scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    }

    return {
        toggleMenu,
        showAllProjects,
        showDesktopVersion,
        showMobileVersion,
        highlightCurrentProject,
        highlightAllProjects,
        moveSlider,
    };
}
