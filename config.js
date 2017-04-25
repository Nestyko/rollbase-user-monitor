

module.exports = {
    webApiUrl: "http://www.dev.impeltechnology.com:8830/webapi/services/rpcrouter/"
    ,restUrl: "http://www.dev.impeltechnology.com:8830/rest/api/"
    , progressDataServiceUrl: "http://www.dev.impeltechnology.com:8830/rest/jsdo/"
    , progressDataCatalogUrl: function(catalogIntegrationName){
        return "http://www.dev.impeltechnology.com:8830/rest/jsdo/catalog/"+catalogIntegrationName+".json"
    }
}