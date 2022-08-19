export function Utilities({ window, projects, display, currentProject }) {
    function appVersion() {
        const windowsWidth = window.screen.width;

        if (windowsWidth > 600) {
            display.showDesktopVersion();
        } else {
            display.showMobileVersion();
        }
    }

    function changeCurrentProject(e) {
        const isLeftControl = e.currentTarget.classList.contains("arrow-left");

        const maxProjects = projects.length;

        if (isLeftControl) {
            currentProject -= 1;
        } else {
            currentProject += 1;
        }

        if (currentProject >= maxProjects) {
            currentProject = 0;
        }

        if (currentProject < 0) {
            currentProject = maxProjects - 1;
        }

        display.moveSlider(currentProject);
        display.highlightCurrentProject(currentProject);
    }

    function projectsDisplayed() {
        const windowsWidth = window.screen.width;

        if (windowsWidth < 800) {
            currentProject = 1;
        } else {
            currentProject = 2;
        }
    }

    return {
        appVersion,
        changeCurrentProject,
        projectsDisplayed,
    };
}
