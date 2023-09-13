sap.ui.define([], function () {
	"use strict";
	return {
		statusText: function (orderStatus) {
			// var resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // console.log(resourceBundle.getText("orderStatus1"));
			switch (orderStatus) {
				case 1:
					return "en Almacen";
				case 2:
					return "en Camino";
				case 3:
					return "Entregado";
				default:
					return sStatus;
			}
		}
	};
});