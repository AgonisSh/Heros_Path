/*
Mettre setDefaultButton... et setButton...
Permettre d'aligner les boutons sur la même ligne
*/

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
		this.buttonAlignment = 0;
		this.buttonBackgroundColor = "rgb(64,64,64)";
		this.buttonBorderColor = "rgb(0,0,0)";
		this.buttonBorderSize = 0;
		this.buttonRadius = 0;
		this.buttonTextColor = "rgb(255,255,255)";
		this.buttonTextSize = 11;
		this.menuAlignment = 0;
		this.menuBackgroundColor = "rgba(128,128,128,1)";
		this.menuBorderColor = "rgb(0,0,0)";
		this.menuBorderSize = 0;
		this.menuRadius = 0;
		this.title = "";
		this.titleColor = "rgb(255,255,255)";
		this.titleFont = "Comic Sans MS";
		this.titleSize = 28;
		this.titleSpacing = 0;
		
		// Valeurs non initialisées par défaut
		this.buttonHeight = null;
		this.buttonWidth = null;
		this.menuHeight = null;
		this.menuWidth = null;
		
		this.buttons = [];
		
		// Éléments HTML
		this.menuDiv = null;
		this.titleDiv = null;
		this.buttonDivs = [];
		
		// Définit la taille par défaut du menu
		this.setTotalSize(width, widthMode, height, heightMode);
	}
	
	    ////// //   // //    //  ///// //////// ////  /////  ///   // //////
	   //     //   // ////  // //        //     //  //   // ////  // //
	  /////  //   // // // // //        //     //  //   // // // // //////
	 //     //   // //  //// //        //     //  //   // //  ////     //
	//      /////  //   ///  /////    //    ////  /////  //   /// //////
	
	/** Ajoute un bouton vide au menu
	 */
	addButton()
	{
		// Crée une variable avec les attributs par défaut d'un bouton
		var button = {
			action: null,
			text: "",
			textPosition: 0,
			type: "button",
			valuePrefix: "",
			valueSuffix: "",
			valueMultiplier: 1,
			valueVisibility: false
		}
		
		// Ajoute le bouton à la liste des boutons
		this.buttons.push(button);
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
		var buttonDivs = []
		for (var i = 0; i < this.buttons.length; i++) {
			buttonDivs.push(document.createElement("div"));
			// Modification des valeurs CSS des boutons n'étant jamais modifiées
			buttonDivs[i].style.alignItems = "center";
			buttonDivs[i].style.borderStyle = "solid";
			buttonDivs[i].style.display = "flex";
			buttonDivs[i].style.justifyContent = "center";
		};
		
		// Modification des valeurs CSS du menu n'étant jamais modifiées
		menuDiv.style.borderStyle = "solid";
		menuDiv.style.display = "flex";
		menuDiv.style.flexDirection = "column";
		menuDiv.style.position = "absolute";
		menuDiv.style.userSelect = "none";
		titleDiv.style.fontWeight = "bolder";
		
		// Sauvegarde les élements HTML relatifs au menu
		this.menuDiv = menuDiv;
		this.titleDiv = titleDiv;
		this.buttonDivs = buttonDivs;
		
		// Cache le menu puis met à jour le visuel du menu
		this.hide();
		this.update();
		window.addEventListener("resize", this.resize());
		
		// Ajoute les divs au HTML
		document.getElementsByTagName("body")[0].appendChild(menuDiv);
		menuDiv.appendChild(titleDiv);
		buttonDivs.forEach(e => {
			menuDiv.appendChild(e);
		});
	}
	
	/** Change la position d'un bouton dans la liste
	  *
	  * oldPos: la position de l'ancien bouton, en commençant à 0
	  * newPos: la nouvelle position du bouton. Tous les boutons avec une position supérieure ou égale à newPos seront avancés d'un cran.
	 */
	moveButton(oldPos, newPos)
	{
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
		this.menuDiv.style.height = (size * (this.menuHeight - this.menuBorderSize * 2)) + "px";
		this.menuDiv.style.width = (size * (this.menuWidth - this.menuBorderSize * 2)) + "px";
		this.titleDiv.style.fontSize = (size * this.titleSize) + "px";
		this.titleDiv.style.margin = (size * this.titleSpacing) + "px 0px";
		
		// Met à jour la taille des boutons
		for (var i = 0; i < this.buttonDivs.length; i++) {
			// Valeurs génériques
			this.buttonDivs[i].style.height = (size * (this.buttonHeight - this.buttonBorderSize * 2)) + "px";
			this.buttonDivs[i].style.fontSize = (size * this.buttonTextSize) + "px";
			this.buttonDivs[i].style.width = (size * (this.buttonWidth - this.buttonBorderSize * 2)) + "px";
			this.buttonDivs[i].style.borderWidth = (size * this.buttonBorderSize) + "px";
			if (this.buttonAlignment == -1) this.buttonDivs[i].style.borderRadius =  "0px " + (size * this.buttonRadius) + "px " + (size * this.buttonRadius) + "px 0px";
			else if (this.buttonAlignment == 0) this.buttonDivs[i].style.borderRadius = (size * this.buttonRadius) + "px";
			else this.buttonDivs[i].style.borderRadius =  (size * this.buttonRadius) + "px 0px 0px " + (size * this.buttonRadius) + "px";
			
			// Valeurs spécifiques
		};
		
		// Met à jour la position du menu
		this.menuDiv.style.top = ((window.innerHeight - size * this.menuHeight) / 2) + "px";
		if (this.menuAlignment == -1) this.menuDiv.style.left = "0px";
		else if (this.menuAlignment == 0) this.menuDiv.style.left = ((window.innerWidth - size * this.menuWidth) / 2) + "px"; 
		else this.menuDiv.style.left = ((window.innerWidth - size * this.menuWidth)) + "px";
		
		// Met à jour la position du titre
		if (this.buttonAlignment == -1) this.titleDiv.style.margin = (size * this.titleSpacing) + "px auto " + (size * this.titleSpacing) + "px " + (size * 10.8) + "px";
		else if (this.buttonAlignment == 0) this.titleDiv.style.margin = (size * this.titleSpacing) + "px auto ";
		else this.titleDiv.style.margin = (size * this.titleSpacing) + "px " + (size * 10.8) + "px " + (size * this.titleSpacing) + "px auto";
		
		// Met à jour la position des boutons
		for (var i = 0; i < this.buttonDivs.length; i++) {
			if (this.buttonAlignment == -1) this.buttonDivs[i].style.margin = "auto auto auto 0px";
			else if (this.buttonAlignment == 0) this.buttonDivs[i].style.margin = "auto";
			else this.buttonDivs[i].style.margin = "auto 0px auto auto";
		};
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
		for(var i = 0; i < this.buttonDivs.length; i++) {
			// Définit des variables réutilisables pour le bouton
			var button = this.buttons[i];
			var buttonDiv = this.buttonDivs[i];
			
			// Valeurs génériques
			buttonDiv.style.backgroundColor = this.buttonBackgroundColor;
			buttonDiv.style.borderColor = this.buttonBorderColor;
			buttonDiv.style.color = this.buttonTextColor;
			if (button.type >= 0) buttonDiv.style.cursor = "pointer";
			if (button.type >= 0) buttonDiv.onclick = this.buttons[i].func;
			
			// Valeurs spécifiques
			if (button.valueVisibility) {
				var buttonValue = this.getButtonValue(i);
				if (isNaN(buttonValue)) buttonDiv.innerHTML = button.text + " : " + button.valuePrefix + buttonValue + button.valueSuffix;
				else buttonDiv.innerHTML = button.text + " : " + button.valuePrefix + (parseInt(buttonValue, 10) * button.valueMultiplier) + button.valueSuffix;
			} else buttonDiv.innerHTML = button.text;
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

	/** Renvoie la valeur d'un bouton spécifié
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	 */
	getButtonValue(pos)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		// Renvoie la valeur du bouton
		return this.buttonDivs[pos].value;
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
	
	/** Définit l'action associée à un bouton
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * func: la fonction qui sera exécutée quand le bouton sera activé
	  *
	  * Cette fonction n'est utile que pour les boutons de type "button" et "switch"
	 */
	setButtonAction(pos, func)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		if (typeof func !== "function") throw "\"func\" must be a function";
		
		// Affectation de la fonction
		this.buttons[pos].func = func;
	}
	
	/** Aligne le titre et les boutons à gauche, au centre ou à droite
	  *
	  * alignment: où seront alignés les éléments. Peut correspondre à "left", "center" ou "right"
	 */
	setButtonAlignment(alignment)
	{
		// -1 = gauche    0 = centre    1 = droite
		if (alignment === "left") this.buttonAlignment = -1;
		else if (alignment === "center") this.buttonAlignment = 0;
		else if (alignment === "right") this.buttonAlignment = 1;
		else throw "\"alignment\" must be either 'left', 'center' or 'right'";
	}
	
	/** Définit la couleur des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonBackgroundColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonBackgroundColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit la couleur des bordures des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonBorderColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonBorderColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Définit le rayon de l'arrondi des boutons
	  *
	  * radius: le rayon de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur des boutons
	  * "percentHeight" correspond à un pourcentage de la hauteur des boutons
	 */
	setButtonBorderRadius(radius, mode)
	{
		// Vérification des arguments
		if (isNaN(radius)) throw "\"radius\" must be a number";
		if (radius < 0) throw "\"radius\" must be a positive number";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.buttonRadius = radius;
		else if (mode === "percentWidth") this.buttonRadius = this.buttonWidth * radius / 100;
		else if (mode === "percentHeight") this.buttonRadius = this.buttonHeight * radius / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit l'épaisseur des bordures des boutons
	  *
	  * size: l'épaisseur de la bordure, en pixels par défaut
	  * mode: le mode de calcul. Peut prendre "pixels", "percentWidth" ou "percentHeight" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percentWidth" correspond à un pourcentage de la largeur et hauteur des boutons
	  * "percentHeight" correspond à un pourcentage de la hauteur des boutons
	 */
	setButtonBorderSize(size, mode)
	{
		// Vérification des arguments
		if (isNaN(size)) throw "\"size\" must be a number";
		if (size < 0) throw "\"size\" must be a positive number";
		
		// Définit l'épaisseur
		if (mode === "pixels") this.buttonBorderSize = size;
		else if (mode === "percentWidth") this.buttonBorderSize = this.menuWidth * size / 100;
		else if (mode === "percentHeight") this.buttonBorderSize = this.menuHeight * size / 100;
		else throw "\"mode\" must be either 'pixels', 'percentWidth' or 'percentHeight'";
	}
	
	/** Définit la police des boutons
	  *
	  * font: la police qui sera utilisée pour les boutons
	 */
	setButtonFont(font)
	{
		this.buttonFont = font;
	}
	
	/** Définit la taille des boutons
	  *
	  * width: la largeur des boutons, en pixels par défaut
	  * widthMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  * height: la hauteur des boutons, en pixels par défaut
	  * heightMode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la largeur du menu
	 */
	setButtonSize(width, widthMode, height, heightMode)
	{
		// Vérification des valeurs
		if (isNaN(width)) throw "\"width\" must be a number";
		if (isNaN(height)) throw "\"height\" must be a number";
		if (width < 0) throw "\"width\" must be a positive number";
		if (height < 0) throw "\"height\" must be a positive number";
		
		// Définit la lareur
		if (widthMode === "pixels") this.buttonWidth = width;
		else if (widthMode === "percent") this.buttonWidth = this.menuWidth * width / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
		
		// Définit la hauteur
		if (heightMode === "pixels") this.buttonHeight = height;
		else if (heightMode === "percent") this.buttonHeight = this.menuHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Définit le texte d'un bouton spécifique
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * text: le texte du bouton
	 */
	setButtonText(pos, text)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		// Définit le texte
		this.buttons[pos].text = text;
	}

	
	/** Définit la couleur du texte des boutons
	  *
	  * red: le taux de rouge, de 0 à 255
	  * green: le taux de vert, de 0 à 255
	  * blue: le taux de bleu, de 0 à 255
	 */
	setButtonTextColor(red, green, blue)
	{
		// Vérification des arguments
		if (isNaN(red)) throw "\"red\" must be a number";
		if (isNaN(green)) throw "\"green\" must be a number";
		if (isNaN(blue)) throw "\"blue\" must be a number";
		if (red < 0 || red > 255) throw "\"red\" must be between 0 and 255";
		if (green < 0 || green > 255) throw "\"green\" must be between 0 and 255";
		if (blue < 0 || blue > 255) throw "\"blue\" must be between 0 and 255";
		
		// Affectation des valeurs
		this.buttonTextColor = "rgb(" + red + "," + green + "," + blue + ")";
	}
	
	/** Positionne le texte du boutton par rapport au bouton
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * position: l'emplacement du texte. Peut prendre "left", "on" ou "right" comme argument
	  *
	  * "left" positionne le texte à gauche du bouton
	  * "on" positionne le texte dans le bouton
	  * "right" positionne le texte à droite du bouton
	 */
	setButtonTextPosition(pos, position)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		// Positionne le texte
		if (position === "left") this.buttons[pos].textPosition = -1;
		else if (position === "on") this.buttons[pos].textPosition = 0;
		else if (position === "right") this.buttons[pos].textPosition = 1;
		else throw "\"position\" must be either 'left', 'on' or 'right'";
	}
	
	/** Définit la taille du texte des boutons, basé sur la hauteur
	  *
	  * height: la hauteur du texte des boutons
	  * mode: le mode de calcul. Peut prendre "pixels" ou "percent" comme valeur
	  *
	  * "pixels" correspond à la valeur en pixels
	  * "percent" correspond à un pourcentage de la largeur du menu
	 */
	setButtonTextSize(height, mode)
	{
		// Vérification des arguments
		if (isNaN(height)) throw "\"height\" must be a number";
		if (height < 0) throw "\"height\" must be a positive number";
		
		// Définit la taille
		if (mode === "pixels") this.buttonTextSize = height;
		else if (mode === "percent") this.buttonTextSize = this.menuHeight * height / 100;
		else throw "\"mode\" must be either 'pixels' or 'percent'";
	}
	
	/** Change le type d'un bouton
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * type: le type que devra prendre le bouton. Peut prendre comme valeur "text", "button", "switch" ou "slider"
	  *
	  * "text": le bouton ne sera qu'une simple zone de texte. La taille du bouton s'adaptera pour que le texte soit affiché en entier. Aucune fonction ne peut lui être attribuée
	  * "button": le bouton sera un bouton basique, qui effectue une action quand on clique dessus, et aura une valeur nulle
	  * "switch": le bouton sera un on/off, et aura une valeur booléenne
	  * "slider": le bouton sera un slider, et aura une valeur de 0 à 1
	 */
	setButtonType(pos, type)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		
		// -1 = texte    0 = bouton classique    1 = bouton on/off    2 = slider
		if (type === "text") this.buttons[pos].type = -1;
		else if (type === "button") this.buttons[pos].type = 0;
		else if (type === "switch") this.buttons[pos].type = 0;
		else if (type === "slider") this.buttons[pos].type = 0;
		else throw "\"type\" must be either 'text', 'button', 'switch' or 'slider'";
	}
	
	/** Définit le formatage de la valeur du bouton donné
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * prefix: le texte ajouté avant d'afficher la valeur
	  * suffix: le texte ajouté après avoir affiché la valeur
	  * multiplier: le multiplicateur de la valeur du menu. Utilisé seulement si la valeur est un nombre
	 */
	setButtonValueFormatting(pos, prefix, suffix, multiplier)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (isNaN(pos)) throw "\"multiplier\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		// Affectation des valeurs
		this.buttons[pos].valuePrefix = prefix;
		this.buttons[pos].valueSuffix = suffix;
		this.buttons[pos].valueMultiplier = multiplier;
	}
	
	/** Définit si un bouton donné doit avoir sa valeur indiquée
	  *
	  * pos: l'index du bouton. Doit être un index de la liste des boutons
	  * visible: un booléen pour indiquer si la valeur du bouton doit être visible à coté du texte
	 */
	setButtonValueVisibility(pos, visible)
	{
		// Vérification des arguments
		if (isNaN(pos)) throw "\"pos\" must be a number";
		if (pos < 0 || pos >= this.buttons.length) throw "\"pos\" must be an index of the 'buttons' list";
		
		// Affectation du booléen
		if (visible) this.buttons[pos].valueVisibility = true;
		else if (!visible) this.buttons[pos].valueVisibility = false;
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