import { buttonMenu, buttonShowMore, sliderControls } from "./elements.js";

export function Events({ display, utilities }) {
    buttonMenu.addEventListener("click", display.toggleMenu);
    buttonShowMore.addEventListener("click", display.showAllProjects);

    sliderControls.forEach(control =>
        control.addEventListener("click", utilities.changeCurrentProject)
    );

    window.addEventListener("resize", utilities.appVersion);

    window.addEventListener("load", () => {
        utilities.appVersion();
        utilities.projectsDisplayed();
        display.highlightAllProjects();
    });
}
