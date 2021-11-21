/*
Fonctions de Menu moveButton() et removeButton()

make useful buttonType + add type "choice"
make useful buttonFormatting
make useful buttonValue + attributes
make useful textPosition
function buttonVerticalMargin() -> L'appliquer à Button.line ?
wrap buttons horizontal margins

make "percent" value always responsive, not just giving a pixel value when the function is executed (even if it's not a real problem, it's a problem for Menu.setButtonsBorderRadius() && Menu.setButtonsBorderSize()) -> peut définir une valeur fixe au moment de load()
*/

class Button
{
	/** Le constructeur de la classe Button.
	  * 
	  * menu: le menu auquel est lié ce bouton
	 */
	constructor(menu)
	{
		// Le menu auquel est lié le bouton
		this.menu = menu;

		// Valeurs par défaut
		this.text = "";

		// Valeurs héritées par défaut
		this.alignment = null;
		this.backgroundColor = null;
		this.borderColor = null;
		this.borderSize = null;
		this.font = null;
		this.radius = null;
		this.textColor = null;
		this.textPosition = null;
		this.textSize = null;
		this.type = null;
		this.valuePrefix = null;
		this.valueSuffix = null;
		this.valueMultiplier = null;
		this.valueVisibility = null;
		
		// Valeurs non initialisées par défaut
		this.action = null;
		this.height = menu.buttonsHeight;
		this.width = menu.buttonsWidth;
		
		// Divs du bouton
		this.div = null;
		this.line = null;
	}

	    ////// //   // //    //  ///// //////// ////  /////  ///   // //////
	   //     //   // ////  // //        //     //  //   // ////  // //
	  /////  //   // // // // //        //     //  //   // // // // //////
	 //     //   // //  //// //        //     //  //   // //  ////     //
	//      /////  //   ///  /////    //    ////  /////  //   /// //////

	/** Renvoie la valeur du bouton
	 */
	getValue() {
		// Vérification que le bouton possède bien une valeur
		if (this.div == null) throw "you must load the menu before getting the value of a button";
		if (this.type == -1) throw "the button can't be of type \"text\"";

		// Renvoie la valeur du bouton
		return this.div.value;
	}

	    //////  ////// /////// //////// //////  /////   //////
	   //      //        //      //    //      //  //  //
	  //////  /////     //      //    /////   /////   //////
	     //  //        //      //    //      //  //      //
	//////  //////    //      //    //////  //   // //////

	/** Définit l'action associée au bouton
	  *
	  * func: la fonction qui sera exécutée quand le bouton sera activé
	  *
	  * Cette fonction n'est utile que pour les boutons de type "button" et "switch"
	 */
	setAction(func) {
		// Vérification des arguments
		if (typeof func !== "function") throw "\"func\" must be a function";

		// Affectation de la fonction
		this.action = func;
	}

	/** Aligne le boutons à gauche, au centre ou à droite
	  *
	  * alignment: où sera aligné le bouton. Peut correspondre à "left", "center" ou "right"
	 */
	setAlignment(alignment) {
		// -1 = gauche    0 = centre    1 = droite
		if (alignment === "left") this.alignment = -1;
		else if (alignment === "center") this.alignment = 0;
		else if (alignment === "right") this.alignment = 1;
		else throw "\"alignment\" must be either 'left', 'center' or 'right'";
	}

	/** Définit la couleur du bouton
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setBackgroundColor(red, green, blue) {
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";

		// Affectation des valeurs
		this.backgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
	}

	/** Définit la couleur des bordures du bouton
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setBorderColor(red, green, blue) {
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";

		// Affectation des valeurs
		this.borderColor = "rgb(" + red + "," + green + "," + blue + ")";
	}

	/** Définit le rayon de l'arrondi du bouton
	  *
	  * radius: le rayon de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur du bouton
	  * "percentHeight" correspond à un pourcentage de la hauteur du bouton
	 */
	setBorderRadius(radius, mode) {
		// Vérification des arguments
		if (isNaN(radius)) throw "\"radius\" must be a number";
		if (radius < 0) throw "\"radius\" must be a positive number";

		// Définit l'épaisseur
		if (mode === "pixels") this.radius = radius;
		else if (mode === "percentWidth") this.radius = this.width * radius / 100;
		else if (mode === "percentHeight") this.radius = this.height * radius / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}

	/** Définit l'épaisseur des bordures du bouton
	  *
	  * size: l'épaisseur de la bordure, en pixels par défaut.
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur du bouton
	  * "percentHeight" correspond à un pourcentage de la hauteur du bouton
	 */
	setBorderSize(size, mode) {
		// Vérification des arguments
		if (isNaN(size)) throw "\"size\" must be a number";
		if (size < 0) throw "\"size\" must be a positive number";

		// Définit l'épaisseur
		if (mode === "pixels") this.buttonBorderSize = size;
		else if (mode === "percentWidth") this.borderSize = this.width * size / 100;
		else if (mode === "percentHeight") this.borderSize = this.height * size / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}

	/** Définit la police du bouton
	  *
	  * font: la police qui sera utilisée pour le bouton
	 */
	setFont(font) {
		this.font = font;
	}

	/** Définit la taille du bouton
	  *
	  * width: la largeur du bouton, en pixels par défaut
	  * widthMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  * height: la hauteur du bouton, en pixels par défaut
	  * heightMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la taille du menu
	 */
	setSize(width, widthMode, height, heightMode) {
		// Vérification des valeurs
		if (isNaN(width)) throw "\"width\" must be a number";
		if (isNaN(height)) throw "\"height\" must be a number";
		if (width < 0) throw "\"width\" must be a positive number";
		if (height < 0) throw "\"height\" must be a positive number";

		// Définit la lareur
		if (widthMode === "pixels") this.width = width;
		else if (widthMode === "percent") this.width = this.menu.menuWidth * width / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";

		// Définit la hauteur
		if (heightMode === "pixels") this.height = height;
		else if (heightMode === "percent") this.height = this.menu.menuHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}

	/** Définit le texte du bouton
	  *
	  * text: le texte du bouton
	 */
	setText(text)
	{
		this.text = text;
	}

	/** Définit la couleur du texte du bouton
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setTextColor(red, green, blue) {
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";

		// Affectation des valeurs
		this.textColor = "rgb(" + red + "," + green + "," + blue + ")";
	}

	/** Positionne le texte du boutton par rapport au bouton
	  *
	  * position: l'emplacement du texte. Peut prendre "left", "on" ou "right" comme argument
	  *
	  * "left" positionne le texte à gauche du bouton
	  * "on" positionne le texte dans le bouton
	  * "right" positionne le texte à droite du bouton
	 */
	setTextPosition(position) {
		// Positionne le texte
		if (position === "left") this.textPosition = -1;
		else if (position === "on") this.textPosition = 0;
		else if (position === "right") this.textPosition = 1;
		else throw "\"position\" must be either 'left', 'on' or 'right'";
	}

	/** Définit la taille du texte du bouton
	  *
	  * height: la hauteur du texte du bouton
	  * mode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la hauteur du bouton
	 */
	setTextSize(height, mode) {
		// Vérification des arguments
		if (isNaN(height)) throw "\"height\" must be a number";
		if (height < 0) throw "\"height\" must be a positive number";

		// Définit la taille
		if (mode === "pixels") this.textSize = height;
		else if (mode === "percent") this.textSize = this.height * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}

	/** Change le type du bouton
	  *
	  * type: le type que devra prendre le bouton. Peut prendre comme valeur "text", "button", "switch" ou "slider"
	  *
	  * "text": le bouton ne sera qu'une simple zone de texte. La taille du bouton s'adaptera pour que le texte soit affiché en entier. Aucune fonction ne peut lui être attribuée
	  * "button": le bouton sera un bouton basique, qui effectue une action quand on clique dessus, et aura une valeur nulle
	  * "switch": le bouton sera un on/off, et aura une valeur booléenne
	  * "slider": le bouton sera un slider, et aura une valeur de 0 à 1
	 */
	setType(type) {
		// -1 = texte    0 = bouton classique    1 = bouton on/off    2 = slider
		if (type === "text") this.type = -1;
		else if (type === "button") this.type = 0;
		else if (type === "switch") this.type = 0;
		else if (type === "slider") this.type = 0;
		else throw "\"type\" must be either 'text', 'button', 'switch' or 'slider'";
	}

	/** Définit le formatage de la valeur du bouton
	  *
	  * prefix: le texte ajouté avant d'afficher la valeur
	  * suffix: le texte ajouté après avoir affiché la valeur
	  * multiplier: le multiplicateur de la valeur du bouton. Utilisé seulement si la valeur est un nombre
	 */
	setValueFormatting(prefix, suffix, multiplier) {
		// Vérification des arguments
		if (isNaN(multiplier)) throw "\"multiplier\" must be a number";
		
		// Affectation des valeurs
		this.valuePrefix = prefix;
		this.valueSuffix = suffix;
		this.valueMultiplier = multiplier;
	}

	/** Définit si le bouton doit avoir sa valeur indiquée
	  *
	  * visible: un booléen pour indiquer si la valeur du bouton doit être visible à coté du texte
	 */
	setValueVisibility(visible) {
		// Affectation du booléen
		if (visible) this.valueVisibility = true;
		else if (!visible) this.valueVisibility = false;
		else throw "\"visible\" doit être un booléen";
	}
}

class Menu
{
	/** Le constructeur de la classe Menu. Se base sur un écran 1920x1080
	  *
	  * width: la largeur du menu, en pixels par défaut
	  * widthMode: le mode de calcul de la largeur du menu. Peut prendre "pixels", "percent" ou "relative" comme valeur
	  * height: la hauteur du menu, en pixels par défaut
	  * heightMode: le mode de calcul de la hauteur du menu. Peut prendre "pixels", "percent" ou "relative" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la hauteur ou de la largeur de la fenêtre
	  * "relative" correspond à un pourcentage de l'autre valeur. Les deux modes ne peuvent être "relative"
	 */
	constructor(width, widthMode, height, heightMode)
	{
		// Valeurs par défaut
		this.buttonsAlignment = 0;
		this.buttonsBackgroundColor = "rgb(64,64,64)";
		this.buttonsBorderColor = "rgb(0,0,0)";
		this.buttonsBorderSize = 0;
		this.buttonsFont = "Comic Sans MS";
		this.buttonsRadius = 0;
		this.buttonsTextColor = "rgb(255,255,255)";
		this.buttonsTextPosition = 0;
		this.buttonsTextSize = 11;
		this.buttonsType = "button";
		this.buttonsValuePrefix = "";
		this.buttonsValueSuffix = "";
		this.buttonsValueMultiplier = 1;
		this.buttonsValueVisibility = false;
		this.menuAlignment = 0;
		this.menuBackgroundColor = "rgba(128,128,128,1)";
		this.menuBorderColor = "rgb(0,0,0)";
		this.menuBorderSize = 0;
		this.menuRadius = 0;
		this.title = "";
		this.titleAlignment = 0;
		this.titleColor = "rgb(255,255,255)";
		this.titleFont = "Comic Sans MS";
		this.titleSize = 28;
		this.titleSpacing = 0;
		
		// Valeurs non initialisées par défaut
		this.buttonsHeight = null;
		this.buttonsWidth = null;
		this.menuHeight = null;
		this.menuWidth = null;
		
		this.buttons = [];
		
		// Éléments HTML
		this.menuDiv = null;
		this.titleDiv = null;
		
		// Définit la taille par défaut du menu
		this.setTotalSize(width, widthMode, height, heightMode);
	}
	
	    ////// //   // //    //  ///// //////// ////  /////  ///   // //////
	   //     //   // ////  // //        //     //  //   // ////  // //
	  /////  //   // // // // //        //     //  //   // // // // //////
	 //     //   // //  //// //        //     //  //   // //  ////     //
	//      /////  //   ///  /////    //    ////  /////  //   /// //////
	
	/** Ajoute un bouton vide au menu
	  *
	  * line: la ligne sur laquelle ajouter le bouton. Si line vaut null, l'ajoutera sur une nouvelle ligne
	 */
	addButton(line)
	{
		// Ajoute une nouvelle ligne
		if (line == null) {
			this.buttons.push([]);
			this.buttons[this.buttons.length - 1].push(new Button(this))
			return;
		}
		
		// Vérification des arguments
		if (isNaN(line)) throw "\"line\" must be a number";
		if (line < 0 || line >= this.buttons.length) throw "\"line\" must be an index of the 'buttons' list";
		
		// Ajoute le bouton à une ligne existante
		this.buttons[line].push(new Button(this));
	}
	
	/** Cache le menu
	 */
	hide()
	{
		this.menuDiv.style.visibility = "hidden";
	}
	
	/** Permet de créer l'élément HTML représentant le menu
	 */
	load()
	{
		// Création des div nécessaires
		var menuDiv = document.createElement("div");
		var titleDiv = document.createElement("div");
		var lineDivs = [];
		var buttonDivs = [];
		for (var i = 0; i < this.buttons.length; i++) {
			buttonDivs.push([]);
			lineDivs.push(document.createElement("div"));
			for (var j = 0; j < this.buttons[i].length; j++) {
				buttonDivs[i].push(document.createElement("div"));
				// Modification des valeurs CSS des boutons n'étant jamais modifiées
				buttonDivs[i][j].style.alignItems = "center";
				buttonDivs[i][j].style.borderStyle = "solid";
				buttonDivs[i][j].style.display = "flex";
				buttonDivs[i][j].style.justifyContent = "center";
			}
		}
		
		// Modification des valeurs CSS du menu n'étant jamais modifiées
		menuDiv.style.borderStyle = "solid";
		menuDiv.style.boxSizing = "border-box";
		menuDiv.style.display = "flex";
		menuDiv.style.flexDirection = "column";
		menuDiv.style.position = "absolute";
		menuDiv.style.userSelect = "none";
		titleDiv.style.fontWeight = "bolder";
		for (var i = 0; i < this.buttons.length; i++) {
			lineDivs[i].style.display = "flex";
			lineDivs[i].style.flexGrow = "1";
			for (var j = 0; j < this.buttons[i].length; j++) {
				buttonDivs[i][j].style.boxSizing = "border-box";
				buttonDivs[i][j].style.display = "inline-flex";
			}
		}
		
		// Sauvegarde les élements HTML relatifs au menu
		this.menuDiv = menuDiv;
		this.titleDiv = titleDiv;
		for (var i = 0; i < this.buttons.length; i++) {
			for (var j = 0; j < this.buttons[i].length; j++) {
				this.buttons[i][j].div = buttonDivs[i][j];
				this.buttons[i][j].line = lineDivs[i];
			}
		}
		
		// Cache le menu puis met à jour le visuel du menu
		this.hide();
		this.update();
		window.addEventListener("resize", this.resize());
		
		// Ajoute les divs au HTML
		document.getElementsByTagName("body")[0].appendChild(menuDiv);
		menuDiv.appendChild(titleDiv);
		for (var i = 0; i < this.buttons.length; i++) {
			menuDiv.appendChild(lineDivs[i]);
			for (var j = 0; j < this.buttons[i].length; j++) {
				lineDivs[i].appendChild(buttonDivs[i][j]);
			}
		}
	}

	/** Change la position d'un bouton dans la liste
	  *
	  * oldPos: la position de l'ancien bouton, en commençant à 0
	  * newPos: la nouvelle position du bouton. Tous les boutons avec une position supérieure ou égale à newPos seront avancés d'un cran.
	 */
	moveButton(oldPos, newPos) {
		// Ajoute le bouton à la nouvelle position
		this.buttons.splice(newPos, this.buttons[oldPos]);

		// Supprime l'ancien bouton
		this.buttons.splice(oldPos, 1);
	}

	/** Permet de recréer l'élément HTML représentant le menu
	  *
	  * Aliase de unload() & load()
	 */
	reload()
	{
		this.unload();
		this.load();
	}
	
	/** Supprime le bouton à la position indiquée
	  *
	  * La position du bouton à supprimer
	 */
	removeButton(pos)
	{
		this.buttons.splice(pos, 1);
	}
	
	/** Redimensionne le menu
	 */
	resize()
	{
		// Définit la valeur repère pour la taille de la fenêtre
		var size;
		if (window.innerWidth * 9 >= window.innerHeight * 16) size = window.innerHeight / 1080;
		else size = window.innerWidth / 1920
		
		// Met à jour la taille du menu et du titre
		this.menuDiv.style.borderWidth = (size * this.menuBorderSize) + "px";
		if (this.menuAlignment == -1) this.menuDiv.style.borderRadius = "0px " + (size * this.menuRadius) + "px " + (size * this.menuRadius) + "px 0px";
		else if (this.menuAlignment == 0) this.menuDiv.style.borderRadius = (size * this.menuRadius) + "px";
		else this.menuDiv.style.borderRadius = (size * this.menuRadius) + "px 0px 0px " + (size * this.menuRadius) + "px";
		this.menuDiv.style.height = (size * this.menuHeight) + "px";
		this.menuDiv.style.width = (size * this.menuWidth) + "px";
		this.titleDiv.style.fontSize = (size * this.titleSize) + "px";
		this.titleDiv.style.margin = (size * this.titleSpacing) + "px 0px";
		
		// Met à jour la taille des boutons
		for (var i = 0; i < this.buttons.length; i++) {
			for (var j = 0; j < this.buttons[i].length; j++) {
				// Affectation de height
				this.buttons[i][j].div.style.height = (size * this.buttons[i][j].height) + "px";
				// Affectation de width
				this.buttons[i][j].div.style.width = (size * this.buttons[i][j].width) + "px";
				// Affectation de borderSize
				if (this.buttons[i][j].borderSize == null) this.buttons[i][j].div.style.borderWidth = (size * this.buttonsBorderRadius) + "px";
				else this.buttons[i][j].div.style.borderWidth  = (size * this.buttons[i][j].borderRadius) + "px";
				// Affectation de radius
				if (this.buttons[i][j].radius == null) var radius = this.buttonsRadius;
				else var radius = this.buttons[i][j].radius;
				if (this.buttons[i][j].alignment == null) {
					if (this.buttonsAlignment == -1) this.buttons[i][j].div.style.borderRadius =  "0px " + (size * this.buttonsRadius) + "px " + (size * this.buttonsRadius) + "px 0px";
					else if (this.buttonsAlignment == 0) this.buttons[i][j].div.style.borderRadius = (size * this.buttonsRadius) + "px";
					else this.buttons[i][j].div.style.borderRadius = (size * this.buttonsRadius) + "px 0px 0px " + (size * this.buttonsRadius) + "px";
				} else {
					if (this.buttons[i][j].alignment == -1) this.buttons[i][j].div.style.borderRadius =  "0px " + (size * this.buttons[i][j].radius) + "px " + (size * this.buttons[i][j].radius) + "px 0px";
					else if (this.buttons[i][j].alignment == 0) this.buttons[i][j].div.style.borderRadius = (size * this.buttons[i][j].radius) + "px";
					else this.buttons[i][j].div.style.borderRadius = (size * this.buttons[i][j].radius) + "px 0px 0px " + (size * this.buttons[i][j].radius) + "px";
				}
				// Affectation de textSize
				if (this.buttons[i][j].textSize == null) this.buttons[i][j].div.style.fontSize = (size * this.buttonsTextSize) + "px";
				else this.buttons[i][j].div.style.fontSize = (size * this.buttons[i][j].textSize) + "px";
			}
		};
		
		// Met à jour la position du menu
		this.menuDiv.style.top = ((window.innerHeight - size * this.menuHeight) / 2) + "px";
		if (this.menuAlignment == -1) this.menuDiv.style.left = "0px";
		else if (this.menuAlignment == 0) this.menuDiv.style.left = ((window.innerWidth - size * this.menuWidth) / 2) + "px"; 
		else this.menuDiv.style.left = ((window.innerWidth - size * this.menuWidth)) + "px";
		
		// Met à jour la position du titre
		if (this.titleAlignment == -1) this.titleDiv.style.margin = (size * this.titleSpacing) + "px auto " + (size * this.titleSpacing) + "px " + (size * 10.8) + "px";
		else if (this.titleAlignment == 0) this.titleDiv.style.margin = (size * this.titleSpacing) + "px auto ";
		else this.titleDiv.style.margin = (size * this.titleSpacing) + "px " + (size * 10.8) + "px " + (size * this.titleSpacing) + "px auto";
		
		// Met à jour la position des boutons
		for (var i = 0; i < this.buttons.length; i++) {
			for (var j = 0; j < this.buttons[i].length; j++) {
				// Affectation de alignment
				if (this.buttons[i][j].alignment == null) {
					if (this.buttonsAlignment == -1) this.buttons[i][j].div.style.margin =  "auto auto auto 0px";
					else if (this.buttonsAlignment == 0) this.buttons[i][j].div.style.margin = "auto";
					else this.buttons[i][j].div.style.margin = "auto 0px auto auto";
				} else {
					if (this.buttons[i][j].alignment == -1) this.buttons[i][j].div.style.margin =  "auto auto auto 0px";
					else if (this.buttons[i][j].alignment == 0) this.buttons[i][j].div.style.margin = "auto";
					else this.buttons[i][j].div.style.margin = "auto 0px auto auto";
				}
				// Affectation de textPosition
				// this.textPosition;
			}
		}
	}
	
	/** Rend le menu visible
	 */
	show()
	{
		this.menuDiv.style.visibility = "visible";
	}
	
	/** Permet de supprimer l'élément HTML représentant le menu
	 */
	unload()
	{
		this.menuDiv.remove();
	}
	
	/** Met à jour le visuel du menu et son eventListener
	 */
	update()
	{
		// Met à jour les valeurs du menu et du titre
		this.menuDiv.style.backgroundColor = this.menuBackgroundColor;
		this.menuDiv.style.borderColor = this.menuBorderColor;
		this.titleDiv.innerHTML = this.title;
		this.titleDiv.style.color = this.titleColor;
		this.titleDiv.style.fontFamily = this.titleFont;
		
		// Met à jour les valeurs des boutons
		for(var i = 0; i < this.buttons.length; i++) {
			for (var j = 0; j < this.buttons[i].length; j++) {
				// Mise à jour attributs sans valeurs par défaut
				if (this.buttons[i][j].type >= 0) this.buttons[i][j].div.onclick = this.buttons[i][j].action;
				this.buttons[i][j].div.innerHTML = this.buttons[i][j].text;
				
				// this.buttons[i][j]
				// Mise à jour des attributs avec valeur par défaut
				if (this.buttons[i][j].backgroundColor == null) this.buttons[i][j].div.style.backgroundColor = this.buttonsBackgroundColor;
				else this.buttons[i][j].div.style.backgroundColor = this.buttons[i][j].backgroundColor;
				if (this.buttons[i][j].borderColor == null) this.buttons[i][j].div.style.borderColor = this.buttonsBorderColor;
				else this.buttons[i][j].div.style.borderColor = this.buttons[i][j].borderColor;
				if (this.buttons[i][j].font == null) this.buttons[i][j].div.style.fontFamily = this.buttonsFont;
				else this.buttons[i][j].div.style.fontFamily = this.buttons[i][j].font;
				if (this.buttons[i][j].textColor == null) this.buttons[i][j].div.style.color = this.buttonsTextColor;
				else this.buttons[i][j].div.style.color = this.buttons[i][j].textColor;
				// A déplacer / ajouter
				if (this.buttons[i][j].type == null) if (this.buttonsType >= 0) this.buttons[i][j].div.style.cursor = "pointer";
				else if (this.buttons[i][j].type >= 0) this.buttons[i][j].div.style.cursor = "pointer";
				// this.type;
				// this.valuePrefix;
				// this.valueSuffix;
				// this.valueMultiplier;
				// this.valueVisibility;
			}
		}
		
		// Redimensionne le menu
		this.resize();
	}
	
	/** Affiche ou cache le menu en fonction de s'il l'est ou non actuellement
	 */
	visibility()
	{
		if (this.menuDiv.style.visibility === "visible") this.hide();
		else this.show();
	}
	
	    //////  ////// /////// //////// //////  /////   //////
	   //      //        //      //    //      //  //  //
	  //////  /////     //      //    /////   /////   //////
	     //  //        //      //    //      //  //      //
	//////  //////    //      //    //////  //   // //////
	
	/** Aligne le menu à gauche, au centre ou à droite
	  *
	  * alignment: où sera aligné le menu. Peut correspondre à "left", "center" ou "right"
	 */
	setAlignment(alignment)
	{
		// -1 = gauche    0 = centre    1 = droite
		if (alignment === "left") this.menuAlignment = -1;
		else if (alignment === "center") this.menuAlignment = 0;
		else if (alignment === "right") this.menuAlignment = 1;
		else throw "\"alignment\" must be either 'left', 'center' or 'right'";
	}
	
	/** Définit la couleur et l'opacité de l'arrière plan
	  *
	  * red: taux de rouge, de 0 à 255
	  * green: taux de vert, de 0 à 255
	  * blue: taux de bleu, de 0 à 255
	  * alpha: le taux d'opacité, entre 0 (transparent) et 1 (opaque)
	 */
	setBackground(red, green, blue, alpha)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (isNaN(alpha)) throw "\"alpha\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		if (alpha < 0 || alpha > 1) throw "\"alpha\" must be between 0 and 1";
		
		// Affectation des valeurs
		this.menuBackgroundColor = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
	}
	
	/** Définit la couleur de la bordure du menu
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setBorderColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.menuBorderColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit le rayon de l'arrondi du menu
	  *
	  * radius: le rayon de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur du menu
	  * "percentHeight" correspond à un pourcentage de la hauteur du menu
	 */
	setBorderRadius(radius, mode)
	{
		// Vérification des arguments
		if (isNaN(radius)) throw "\"radius\" must be a number";
		if (radius < 0) throw "\"radius\" must be a positive number";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.menuRadius = radius;
		else if (mode === "percentWidth") this.menuRadius = this.menuWidth * radius / 100;
		else if (mode === "percentHeight") this.menuRadius = this.menuHeight * radius / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit l'épaisseur des bordures du menu
	  *
	  * size: l'épaisseur de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur du menu
	  * "percentHeight" correspond à un pourcentage de la hauteur du menu
	 */
	setBorderSize(size, mode)
	{
		// Vérification des arguments
		if (isNaN(size)) throw "\"size\" must be a number";
		if (size < 0) throw "\"size\" must be a positive number";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.menuBorderSize = size;
		else if (mode === "percentWidth") this.menuBorderSize = this.menuWidth * size / 100;
		else if (mode === "percentHeight") this.menuBorderSize = this.menuHeight * size / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit l'alignement par défaut des boutons à gauche, au centre ou à droite
	  *
	  * alignment: où seront alignés les boutons. Peut correspondre à "left", "center" ou "right"
	 */
	setButtonsAlignment(alignment)
	{
		// -1 = gauche    0 = centre    1 = droite
		if (alignment === "left") this.buttonsAlignment = -1;
		else if (alignment === "center") this.buttonsAlignment = 0;
		else if (alignment === "right") this.buttonsAlignment = 1;
		else throw "\"alignment\" must be either 'left', 'center' or 'right'";
	}
	
	/** Définit la couleur par défaut des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonsBackgroundColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonsBackgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit la couleur par défaut des bordures des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonsBorderColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonsBorderColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit le rayon par défaut de l'arrondi des boutons
	  *
	  * radius: le rayon de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur par défaut des boutons
	  * "percentHeight" correspond à un pourcentage de la hauteur par défaut des boutons
	 */
	setButtonsBorderRadius(radius, mode)
	{
		// Vérification des arguments
		if (isNaN(radius)) throw "\"radius\" must be a number";
		if (radius < 0) throw "\"radius\" must be a positive number";
		if (mode === "percentWidth" && this.buttonsWidth == null) throw "'Menu.buttonsWidth' must be defined first";
		if (mode === "percentHeight" && this.buttonsHeight == null) throw "'Menu.buttonsHeight' must be defined first";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.buttonsRadius = radius;
		else if (mode === "percentWidth") this.buttonsRadius = this.buttonsWidth * radius / 100;
		else if (mode === "percentHeight") this.buttonsRadius = this.buttonsHeight * radius / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit l'épaisseur par défaut des bordures des boutons
	  *
	  * size: l'épaisseur de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur par défaut des boutons
	  * "percentHeight" correspond à un pourcentage de la hauteur par défaut des boutons
	 */
	setButtonsBorderSize(size, mode)
	{
		// Vérification des arguments
		if (isNaN(size)) throw "\"size\" must be a number";
		if (size < 0) throw "\"size\" must be a positive number";
		if (mode === "percentWidth" && this.buttonsWidth == null) throw "'Menu.buttonsWidth' must be defined first";
		if (mode === "percentHeight" && this.buttonsHeight == null) throw "'Menu.buttonsHeight' must be defined first";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.buttonsBorderSize = size;
		else if (mode === "percentWidth") this.buttonsBorderSize = this.buttonsWidth * size / 100;
		else if (mode === "percentHeight") this.buttonsBorderSize = this.buttonsHeight * size / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit la police par défaut des boutons
	  *
	  * font: la police qui sera utilisée pour les boutons
	 */
	setButtonsFont(font)
	{
		this.buttonsFont = font;
	}
	
	/** Définit la taille par défaut des boutons
	  *
	  * width: la largeur des boutons, en pixels par défaut
	  * widthMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  * height: la hauteur des boutons, en pixels par défaut
	  * heightMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la largeur du menu
	 */
	setButtonsSize(width, widthMode, height, heightMode)
	{
		// Vérification des valeurs
		if (isNaN(width)) throw "\"width\" must be a number";
		if (isNaN(height)) throw "\"height\" must be a number";
		if (width < 0) throw "\"width\" must be a positive number";
		if (height < 0) throw "\"height\" must be a positive number";
		
		// Définit la lareur
		if (widthMode === "pixels") this.buttonsWidth = width;
		else if (widthMode === "percent") this.buttonsWidth = this.menuWidth * width / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
		
		// Définit la hauteur
		if (heightMode === "pixels") this.buttonsHeight = height;
		else if (heightMode === "percent") this.buttonsHeight = this.menuHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Définit la couleur par défaut du texte des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonsTextColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonsTextColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit la position par défaut du texte du boutton par rapport au bouton
	  *
	  * position: l'emplacement du texte. Peut prendre "left", "on" ou "right" comme argument
	  *
	  * "left" positionne le texte à gauche du bouton
	  * "on" positionne le texte dans le bouton
	  * "right" positionne le texte à droite du bouton
	 */
	setButtonsTextPosition(position)
	{
		// Positionne le texte
		if (position === "left") this.buttonsTextPosition = -1;
		else if (position === "on") this.buttonsTextPosition = 0;
		else if (position === "right") this.buttonsTextPosition = 1;
		else throw "\"position\" must be either 'left', 'on' or 'right'";
	}
	
	/** Définit la taille par défaut du texte des boutons
	  *
	  * height: la hauteur du texte des boutons
	  * mode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la hauteur par défaut des boutons
	 */
	setButtonsTextSize(height, mode)
	{
		// Vérification des arguments
		if (isNaN(height)) throw "\"height\" must be a number";
		if (height < 0) throw "\"height\" must be a positive number";
		
		// Définit la taille
		if (mode === "pixels") this.buttonsTextSize = height;
		else if (mode === "percent") this.buttonsTextSize = this.buttonsHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Change le type par défaut des bouton
	  *
	  * type: le type que devront prendre les bouton. Peut prendre comme valeur "text", "button", "switch" ou "slider"
	  *
	  * "text": le bouton ne sera qu'une simple zone de texte. La taille du bouton s'adaptera pour que le texte soit affiché en entier. Aucune fonction ne peut lui être attribuée
	  * "button": le bouton sera un bouton basique, qui effectue une action quand on clique dessus, et aura une valeur nulle
	  * "switch": le bouton sera un on/off, et aura une valeur booléenne
	  * "slider": le bouton sera un slider, et aura une valeur de 0 à 1
	 */
	setButtonsType(type)
	{
		// -1 = texte    0 = bouton classique    1 = bouton on/off    2 = slider
		if (type === "text") this.buttonsType = -1;
		else if (type === "button") this.buttonsType = 0;
		else if (type === "switch") this.buttonsType = 0;
		else if (type === "slider") this.buttonsType = 0;
		else throw "\"type\" must be either 'text', 'button', 'switch' or 'slider'";
	}
	
	/** Définit le formatage par défaut de la valeur des boutons
	  *
	  * prefix: le texte ajouté avant d'afficher la valeur
	  * suffix: le texte ajouté après avoir affiché la valeur
	  * multiplier: le multiplicateur de la valeur du bouton. Utilisé seulement si la valeur est un nombre
	 */
	setButtonValueFormatting(prefix, suffix, multiplier)
	{
		// Vérification des arguments
		if (isNaN(multiplier)) throw "\"multiplier\" must be a number";
		
		// Affectation des valeurs
		this.buttonsValuePrefix = prefix;
		this.buttonsValueSuffix = suffix;
		this.buttonsValueMultiplier = multiplier;
	}
	
	/** Définit si la valeur des boutons doit être affichée ou non par défaut
	  *
	  * visible: un booléen pour indiquer si la valeur des boutons doit être visible à coté du texte
	 */
	setButtonValueVisibility(visible)
	{
		// Affectation du booléen
		if (visible) this.buttonsValueVisibility = true;
		else if (!visible) this.buttonsValueVisibility = false;
		else throw "\"visible\" doit être un booléen";
	}
	
	/** Définit le texte du titre
	  *
	  * title: le texte du titre
	 */
	setTitle(title)
	{
		this.title = title;
	}

	/** Aligne le titre à gauche, au centre ou à droite
	  *
	  * alignment: où sera aligné le titre. Peut correspondre à "left", "center" ou "right"
	 */
	setTitleAlignment(alignment) {
		// -1 = gauche    0 = centre    1 = droite
		if (alignment === "left") this.titleAlignment = -1;
		else if (alignment === "center") this.titleAlignment = 0;
		else if (alignment === "right") this.titleAlignment = 1;
		else throw "\"alignment\" must be either 'left', 'center' or 'right'";
	}
	
	/** Définit la couleur du titre
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setTitleColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.titleColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit la police du titre
	  *
	  * font: la police qui sera utilisée pour le titre
	 */
	setTitleFont(font)
	{
		this.titleFont = font;
	}
	
	/** Définit la taille du titre, basé sur la hauteur
	  *
	  * height: la hauteur du texte du titre
	  * mode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la largeur du menu
	 */
	setTitleSize(height, mode)
	{
		// Vérification des arguments
		if (isNaN(height)) throw "\"height\" must be a number";
		if (height < 0) throw "\"height\" must be a positive number";
		
		// Définit la taille
		if (mode === "pixels") this.titleSize = height;
		else if (mode === "percent") this.titleSize = this.menuHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Définit l'espace au dessus et en dessous du titre
	  *
	  * space: l'espacement autour du titre
	  * mode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la largeur du menu
	 */
	setTitleSpacing(space, mode)
	{
		// Vérification des arguments
		if (isNaN(space)) throw "\"space\" must be a number";
		if (space < 0) throw "\"space\" must be a positive number";
		
		// Définit la taille
		if (mode === "pixels") this.titleSpacing = space;
		else if (mode === "percent") this.titleSpacing = this.menuHeight * space / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Modifie la taille totale du menu
	  *
	  * width: la largeur du menu, en pixels par défaut
	  * widthMode: le mode de calcul. Peut prendre "pixels", "percent" ou "relative" comme valeur
	  * height: la hauteur du menu, en pixels par défaut
	  * heightMode: le mode de calcul. Peut prendre "pixels", "percent" ou "relative" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la hauteur ou de la largeur de la fenêtre
	  * "relative" correspond à un pourcentage de l'autre valeur. Les deux modes ne peuvent être "relative"
	 */
	setTotalSize(width, widthMode, height, heightMode)
	{
		// Vérification des arguments
		if (isNaN(width)) throw "\"width\" must be a number";
		if (isNaN(height)) throw "\"height\" must be a number";
		if (width < 0) throw "\"width\" must be a positive number";
		if (height < 0) throw "\"height\" must be a positive number";
		if (widthMode === "relative" && heightMode === "relative") throw "At least one mode must be either 'pixels' or 'percent'";
		
		// Définit la largeur, si elle n'est pas relative
		if (widthMode === "pixels") this.menuWidth = width;
		else if (widthMode === "percent") this.menuWidth = width * 1920 / 100;
		else if (widthMode !== "relative") throw "\"widthMode\" must be either 'pixels', 'percent' or 'relative'";
		
		// Définit la hauteur, si elle n'est pas relative
		if (heightMode === "pixels") this.menuHeight = height;
		else if (heightMode === "percent") this.menuHeight = height * 1080 / 100;
		else if (heightMode !== "relative") throw "\"heightMode\" must be either 'pixels', 'percent' or 'relative'";
		
		// Définit la valeur relative, s'il y en a une
		if (widthMode === "relative") this.menuWidth = this.menuHeight * width;
		else if (heightMode === "relative") this.menuHeight = this.menuWidth * height;
	}
}