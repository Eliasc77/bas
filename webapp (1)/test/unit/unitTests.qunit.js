/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zpaneltabla/paneltabla/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
