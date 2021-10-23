var menuSelection = new Menu(1.5, "relative", 400, "pixels");
var mainMenu = new Menu(100, "percent", 100, "percent");
var pause = new Menu(30, "percent", 40, "percent");
var gameOver = new Menu(100, "percent", 100, "percent");

menuSelection.setButtonsSize(80, "percent", 20, "percent");
menuSelection.addButton(null);
menuSelection.addButton(null);
menuSelection.addButton(null);
menuSelection.buttons[0][0].setText("Main Menu");
menuSelection.buttons[1][0].setText("Pause");
menuSelection.buttons[2][0].setText("Game Over");
menuSelection.buttons[0][0].setAction(function() {
	mainMenu.load();
	menuSelection.unload();
	mainMenu.show();
	pause.load();
});
menuSelection.buttons[1][0].setAction(function() {
	pause.load();
	menuSelection.unload();
	pause.show();
});
menuSelection.buttons[2][0].setAction(function() {
	gameOver.load();
	menuSelection.unload();
	gameOver.show();
});

mainMenu.setBackground(255, 229, 153, 1);
mainMenu.setTitle("Hero's Path");
mainMenu.setTitleColor(0, 0, 0);
mainMenu.setTitleSize(7, "percent");
mainMenu.setTitleSpacing(10, "percent");
mainMenu.setButtonsSize(20, "percent", 5, "percent");
mainMenu.setButtonsBackgroundColor(255, 255, 255);
mainMenu.setButtonsBorderSize(5, "pixels");
mainMenu.setButtonsTextColor(0, 0, 0);
mainMenu.setButtonsTextSize(80, "percent");
mainMenu.addButton(null);
mainMenu.addButton(null);
mainMenu.addButton(null);
mainMenu.addButton(2);
mainMenu.buttons[0][0].setText("Aventure");
mainMenu.buttons[1][0].setText("Paramètres");
mainMenu.buttons[2][0].setText("Crédits");
mainMenu.buttons[2][1].setText("Contact");
mainMenu.buttons[0][0].setAction(() => {
	mainMenu.hide();
	window.addEventListener("keyup", e => {
		if (e.code === "Escape") pause.visibility();
	});
});

pause.setBackground(0, 0, 0, 0);
pause.setTitle("Partie en cours");
pause.setTitleColor(0, 0, 0);
pause.setTitleSize(12, "percent");
pause.setButtonsSize(60, "percent", 10, "percent");
pause.setButtonsBackgroundColor(255, 255, 255);
pause.setButtonsBorderSize(5, "pixels");
pause.setButtonsTextColor(0, 0, 0);
pause.setButtonsTextSize(80, "percent");
pause.addButton(null);
pause.addButton(null);
pause.addButton(null);
pause.buttons[0][0].setText("Reprendre");
pause.buttons[1][0].setText("Recommencer");
pause.buttons[2][0].setText("Quitter");
pause.buttons[0][0].setAction(() => {
	pause.hide();
});
pause.buttons[2][0].setAction(() => {
	pause.hide();
	mainMenu.show();
});


menuSelection.load();
menuSelection.show();

window.onresize = function() {
	menuSelection.resize();
	gameOver.resize();
	pause.resize();
	mainMenu.resize();
};