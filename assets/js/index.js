import { buttonShowMore, projects } from "./elements.js";
import { Events } from "./events.js";
import { Utilities } from "./utilities.js";
import { Display } from "./display.js";

let currentProject;

const display = Display({
    buttonShowMore,
    projects,
    window,
    currentProject,
});

const utilities = Utilities({
    window,
    projects,
    display,
    currentProject,
});

Events({ display, utilities });
