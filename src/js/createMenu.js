// Prioritaire
mainMenu = new Menu(1.3, "relative", 720, "pixels");
// Secondaire
mainMenu.setAlignment("center");
mainMenu.setBackground(25, 140, 255, 0.5);
mainMenu.setBorderColor(17, 98, 178);
mainMenu.setBorderRadius(7, "percentWidth");
mainMenu.setBorderSize(10, "pixels");
mainMenu.setTitle("TITRE");
mainMenu.setTitleAlignment("center");
mainMenu.setTitleColor(64, 64, 64);
mainMenu.setTitleFont("Comic Sans MS");
mainMenu.setTitleSize(10, "percent");
mainMenu.setTitleSpacing(5, "percent");

// Prioritaire
mainMenu.setButtonsSize(75, "percent", 10, "percent");
// Secondaire
mainMenu.setButtonsAlignment("center");
mainMenu.setButtonsBackgroundColor(35, 207, 255);
mainMenu.setButtonsBorderColor(24, 145, 178);
mainMenu.setButtonsBorderRadius(100, "percentHeight");
mainMenu.setButtonsBorderSize(1, "percentHeight");
mainMenu.setButtonsFont("Comic Sans MS");
mainMenu.setButtonsTextColor(0, 0, 0);
mainMenu.setButtonsTextPosition("on");
mainMenu.setButtonsTextSize(70, "percent");
mainMenu.setButtonsType("button");
mainMenu.setButtonValueFormatting("", "", 1);
mainMenu.setButtonValueVisibility(true);
for (var i = 0; i < 3; i++) {
	for (var j = 0; j < i + 1; j++) {
		if (j == 0) mainMenu.addButton(null);
		else mainMenu.addButton(i);
		// Tertiaire
		mainMenu.buttons[i][j].setSize(90 / (i + 1), "percent", 10, "percent");
		mainMenu.buttons[i][j].setAction(function() { console.log("click !"); });
		mainMenu.buttons[i][j].setAlignment("center");
		mainMenu.buttons[i][j].setBackgroundColor(35, 207, 255);
		mainMenu.buttons[i][j].setBorderColor(24, 145, 178);
		mainMenu.buttons[i][j].setBorderRadius(100, "percentHeight");
		mainMenu.buttons[i][j].setBorderSize(1, "percentHeight");
		mainMenu.buttons[i][j].setFont("Comic Sans MS");
		mainMenu.buttons[i][j].setText("Button " + (i + 1) + "-" + (j + 1));
		mainMenu.buttons[i][j].setTextColor(0, 0, 0);
		mainMenu.buttons[i][j].setTextPosition("on");
		mainMenu.buttons[i][j].setTextSize(70, "percent");
		mainMenu.buttons[i][j].setType("button");
		mainMenu.buttons[i][j].setValueFormatting("", "", 1);
		mainMenu.buttons[i][j].setValueVisibility(false);
	}
}

// Ajoute le keyListener
document.addEventListener("keyup", key => {
	if (key.code === "Escape") mainMenu.visibility();
});

mainMenu.load();
mainMenu.show();