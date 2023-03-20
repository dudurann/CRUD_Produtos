sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel) {
        "use strict";

        return Controller.extend("com.coopersap.crudprodutos.controller.App", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("App").attachPatternMatched(this._Route, this);
                },
                
            _Route: function(){
                var oModel = this.getOwnerComponent().getModel();
                //Lista os dados do odata na view
                oModel.read("/Products", {
                    success: function (ok) {
                        this.variavel = ok;
                        var oJSONModel = new JSONModel(this.variavel);
                        this.getView().setModel(oJSONModel,"app");
                    }.bind(this)
                })
            },
            onPressAdd: function () {
                this.getOwnerComponent().getRouter().navTo("Cadastro");
            },
            onPressAlterar: function (oEvent) {
                var oItem = oEvent.getSource(),
				oObjectClick = oItem.getBindingContext("app").getObject();
			//navega para a tela update carregando parametros da url
			this.getOwnerComponent().getRouter().navTo("Editar", {
				 id: oObjectClick.ID
				 });
            },
            onPressDelete: function(oEvent) {
                //Delete local model
                var oItem = oEvent.getSource(),
                    oObjectClick = oItem.getBindingContext("app").getObject(),
                    getList = this.getView().getModel("app").getProperty("/results"),
                    oModel = this.getView().getModel();
                //filtra os IDs diferentes do ID clicado para exclusão
                getList = getList.filter(element => element.ID !== oObjectClick.ID);
                this.getView().getModel("app").setProperty("/results", getList);
                
                //delete odata model
                oModel.remove(`/Products(ID=${oObjectClick.ID})`,{
                    success: function(){
                        MessageToast.show("Sucesso na exclusão");
                    }.bind(this),
                    error: function(){
                        MessageToast.show("Erro na exclusão");
                    }.bind(this)
                });
            }

        });
    });
