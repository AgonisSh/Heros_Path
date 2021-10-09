function setMainMenuSize()
{
    // default values
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var mainMenuHeight = 720;
    var mainMenuWidth = mainMenuHeight * 0.7;

    // main-menu size multiplier
    var sizeModifier = Math.min(screenHeight / 1080, screenWidth / 1920 * 2);
    mainMenuWidth *= sizeModifier;
    mainMenuHeight *= sizeModifier;

    // style values
    var padding = mainMenuWidth / 10;
    var width = mainMenuWidth - padding;
    var height = mainMenuHeight - padding;
    var borderWidth = mainMenuHeight / 72;
    var borderRadius = borderWidth * 4;
    var left = screenWidth / 2 - width / 2 - padding - borderWidth;
    var top = screenHeight / 2 - height / 2 - padding - borderWidth;
    var buttonMargin = height / 30;
    var buttonBorderRadius = (height - buttonMargin * 6) / 16;
    var buttonFontSize = buttonBorderRadius;
    var titleFontSize = buttonFontSize * 2.5;

    // get elements
    var elementMainMenu = document.getElementById("main-menu");
    var elementMainMenuTitle = document.getElementById("main-menu-title");
    var elementsMainMenuButtons = document.getElementsByClassName("main-menu-button");
    // main-menu size
    elementMainMenu.style.width = width + "px";
    elementMainMenu.style.height = height + "px";
    // main-menu position
    elementMainMenu.style.left = left + "px";
    elementMainMenu.style.top = top  + "px";
    // main-menu padding
    elementMainMenu.style.padding = padding + "px " + padding + "px";
    // main-menu border
    elementMainMenu.style.borderWidth = borderWidth + "px";
    elementMainMenu.style.borderRadius = borderRadius + "px";
    // main-menu-title styles
    elementMainMenuTitle.style.fontSize = titleFontSize + "px";
    // main-menu-button styles
    for (i = 0; i < elementsMainMenuButtons.length; i++) {
        elementsMainMenuButtons[i].style.borderRadius = buttonBorderRadius + "px";
        elementsMainMenuButtons[i].style.fontSize = buttonFontSize + "px";
        elementsMainMenuButtons[i].style.margin = buttonMargin + "px 0px";
    }
}
// Error : resize on loading; Must be in try...catch
window.onresize = function() {
    try {
        setMainMenuSize();
    } catch (error) {	}
}

var mainMenuVisible = false;
document.addEventListener("keyup", function(key) {
    if (key.code === "Escape") {
        if (!mainMenuVisible) {
            showMainMenu();
        } else {
            hideMainMenu();
        }
    }
});

function showMainMenu()
{
    setMainMenuSize();
    mainMenuVisible = true;
    mainMenu = document.getElementById("main-menu");
    backgroundImage = document.getElementById("background-image");
    // Reset animation
    backgroundImage.classList.add("animation-blur");
    backgroundImage.style.webkitAnimation = "none";
    mainMenu.classList.add("animation-opacity");
    mainMenu.style.webkitAnimation = "none";
    // Activate animation
    setTimeout(function() {
        mainMenu.style.visibility = "visible";
        backgroundImage.style.webkitAnimation = "";
        mainMenu.style.webkitAnimation = "";
    }, 1);
}

function hideMainMenu()
{
    mainMenuVisible = false;
    var mainMenu = document.getElementById("main-menu");
    var backgroundImage = document.getElementById("background-image");
    // Reset animation (unused)
    backgroundImage.classList.remove("animation-blur");
    mainMenu.classList.remove("animation-opacity");
    mainMenu.style.visibility = "hidden";
}