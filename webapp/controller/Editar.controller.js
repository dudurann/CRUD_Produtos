sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/ID"
], function(
	Controller,
	MessageToast,
	JSONModel,
	ID
) {
	"use strict";

	return Controller.extend("com.coopersap.crudprodutos.controller.Editar", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Editar").attachPatternMatched(this._Route, this);
			},
			
		_Route: function(oEvent){
			
		    var oModel = this.getOwnerComponent().getModel();
            var oParameter = oEvent.getParameter("arguments");
	        this.oParameter = oParameter;
			
			oModel.read(`/Products(ID=${oParameter.id})`, {
				success: function (altera) {
					this.getView().byId("ID").setValue(altera.ID);
					this.getView().byId("NOME").setValue(altera.Name);
					this.getView().byId("DESCRICAO").setValue(altera.Description);
					this.getView().byId("PRECO").setValue(altera.Price);
					
				}.bind(this)
			});
		},
		onPressVoltar: function (){
			this.getView().byId("ID").setValue(""),
			this.getView().byId("NOME").setValue(""),
			this.getView().byId("DESCRICAO").setValue(""),
			this.getView().byId("PRECO").setValue("")
			history.go(-1);

		},
		onPressLimpar: function (){
			
			this.getView().byId("NOME").setValue(""),
			this.getView().byId("DESCRICAO").setValue(""),
			this.getView().byId("PRECO").setValue("")
		},
		
		onPressEditar  : function(oEvent){
			var oInputNome = this.getView().byId("NOME").getValue(),
				oInputDescri = this.getView().byId("DESCRICAO").getValue(),
				oInputPreco = this.getView().byId("PRECO").getValue()

			var oDados = {
				Name: oInputNome,
				Description: oInputDescri,
				Price: oInputPreco
				
			};
			
			var oModel = this.getOwnerComponent().getModel();
				//cria um novo cadastro no odata model
				oModel.update(`/Products(ID=${this.oParameter.id})`,oDados, {
					error: function(){
						MessageToast.show("Erro na alteração");
					}.bind(this),
					success: function(){
						MessageToast.show("Sucesso na alteração");
						this.onPressVoltar();
						
					}.bind(this)
			});
			
		}
	});
});