sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(
	Controller,
	MessageToast,
	JSONModel
) {
	"use strict";

	return Controller.extend("com.coopersap.crudprodutos.controller.Cadastro", {
		onPressVoltar: function (){
			this.getView().byId("ID").setValue(""),
			this.getView().byId("NOME").setValue(""),
			this.getView().byId("DESCRICAO").setValue(""),
			this.getView().byId("PRECO").setValue("")
			history.go(-1);
		},
		onPressLimpar: function (){
			this.getView().byId("ID").setValue(""),
			this.getView().byId("NOME").setValue(""),
			this.getView().byId("DESCRICAO").setValue(""),
			this.getView().byId("PRECO").setValue("")
		},
		onPressCadastrar: function () {
			var oInputId = this.getView().byId("ID").getValue(),
				oInputNome = this.getView().byId("NOME").getValue(),
				oInputDescri = this.getView().byId("DESCRICAO").getValue(),
				oInputPreco = this.getView().byId("PRECO").getValue()

				var oDados = {
					ID: oInputId,
					Name: oInputNome,
					Description: oInputDescri,
					Price: oInputPreco
					
				};
	
				var oModel = this.getOwnerComponent().getModel();
	
				oModel.create("/Products", oDados, {
					error: function(){
						MessageToast.show("Erro no cadastro");
					}.bind(this),
					success: function(){
						MessageToast.show("Sucesso no cadastro");
						this.onPressVoltar();
					}.bind(this)
					
				});
		}
	});
		
});