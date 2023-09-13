sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/syncStyleClass",
    "sap/m/Dialog",
    "sap/m/Text",
    "zpaneltabla/paneltabla/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast, syncStyleClass, Dialog, Text, formatter) {
        "use strict";

        return Controller.extend("zpaneltabla.paneltabla.controller.Main", {
            formatter: formatter,
            onInit: function (oEvent) {
            },
            onBeforeRendering: function () {
            },
            onAfterRendering: function () {
                 // De esta manera accedemos al localModel (json de los datos)
                 this.localModel = this.getView().getModel("orderModel");

                 //Aquí comenzamos la lógica para mostrar el chart
                 let oOrderObject = this.localModel.getProperty("/order");
                 let enAlmacen = 0;
                 let enCamino = 0;
                 let entregado = 0;
 
                 for (let i = 0; i < oOrderObject.length; i++) {
                     if (oOrderObject[i].orderStatus == 1) {
                         enAlmacen++;
                     } else if (oOrderObject[i].orderStatus == 2) {
                         enCamino++;
                     } else if (oOrderObject[i].orderStatus == 3) {
                         entregado++;
                     }
                 }
 
                 let oData = {
                     "statusQuantity": [
                         { "name": "en Almacen", "quantity": enAlmacen },
                         { "name": "en Camino", "quantity": enCamino },
                         { "name": "Entregado", "quantity": entregado }
                     ]
                 };
                 this.getView().setModel(new JSONModel(oData));
 
                 var oVizFrame = this.byId("idVizFrame");
                 oVizFrame.setVizProperties({ "title": { "text": "Estadísticas" } });
 
            },
            // onPressItemPokemonTable: function (oEvent) {
            //     let oItem = oEvent.getSource().getBindingContext("localModel").getObject();
            //     MessageBox.success(`Pokemon seleccionado: ${oItem.name}
            //     Orden: ${oItem.order}
            //     Altura: ${oItem.height}
            //     Peso: ${oItem.weight}`);
            // },
            // showPokemonTable: function (oEvent) {
            //     let oTable = this.byId("pkmTable");
            //     let oButtonShow = this.byId("btnShowPokemonTable");
            //     let oButtonHide = this.byId("btnHidePokemonTable");
            //     oTable.setVisible(true);
            //     oButtonShow.setEnabled(false);

            //     if (oButtonHide.getEnabled() === false) {
            //         oButtonHide.setEnabled(true)
            //     }
            // },
            // hidePokemonTable: function (oEvent) {
            //     let oTable = this.byId("pkmTable");
            //     let oButtonShow = this.byId("btnShowPokemonTable");
            //     let oButtonHide = this.byId("btnHidePokemonTable");
            //     oTable.setVisible(false);
            //     oButtonHide.setEnabled(false);

            //     if (oButtonShow.getEnabled() === false) {
            //         oButtonShow.setEnabled(true);
            //     }
            // },
            // savePokemonForm: function (oEvent) {
            //     let oNamePokemon = this.byId("inputPkmName").getValue();
            //     let oOrderPokemon = this.byId("inputPkmOrder").getValue();
            //     let oHeightPokemon = this.byId("inputPkmHeight").getValue();
            //     let oWeightPokemon = this.byId("inputPkmWeight").getValue();

            //     let listPokemon = this.localModel.getProperty("/pokemon");
            //     let newObject = {
            //         name: oNamePokemon,
            //         order: oOrderPokemon,
            //         height: oHeightPokemon,
            //         weight: oWeightPokemon
            //     }

            //     listPokemon.push(newObject);

            //     this.localModel.setProperty("/pokemon", listPokemon);
            // },
            // onPressItemPokemonTableDialog: function (oEvent) {
            //     let oItem = oEvent.getSource().getBindingContext("localModel").getObject();
            //     let oDialog = this.byId("simpleDialog");
            //     let otext = this.byId("_IDGenText1");
            //     let otext2 = this.byId("_IDGenText2");
            //     otext.setText(oItem.height);
            //     otext2.setText(oItem.weight);
            //     syncStyleClass("sapUiSizeCompact", this.getView(), oDialog);
            //     oDialog.open();
            // },
            onPressOrderItem: function (oEvent) {
                let oItem = oEvent.getSource().getBindingContext("orderModel").getObject();
                this.byId("inputOrderNum").setValue(oItem.orderNum);
                this.byId("inputOrderDate").setValue(oItem.orderDate);
                this.byId("inputOrderClient").setValue(oItem.orderClient);
                this.byId("inputOrderAdress").setValue(oItem.orderAdress);

                // Mostrar datos de los Productos dentro del Pedido
                let oData = { "orderProduct": [] };
                for (let i = 0; i < oItem.orderProducts.length; i++) {
                    oData.orderProduct.push(oItem.orderProducts[i]);
                }
                let oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel, "listProduct");

                this.byId("inputOrderPaymentMethod").setValue(oItem.orderPaymentMethod);
                this.byId("inputOrderTotal").setValue(oItem.orderTotal);
                this.byId("inputOrderStatus").setValue(oItem.orderStatus);
                this.byId("inputOrderDetailsClientPhone").setValue(oItem.orderDetails.orderClientPhone);
                this.byId("inputOrderDetailsClientEmail").setValue(oItem.orderDetails.orderClientEmail);
                this.byId("inputOrderExtraDetails").setValue(oItem.orderExtraDetails);
                let oDialog = this.byId("orderDialogItem");
                syncStyleClass("sapUiSizeCompact", this.getView(), oDialog);
                oDialog.open();
            }
        });
    });
