var retryCount = 5;
var retryInterval = 30; // seconds
var id;

for(i=0;i<retryCount;i++){

    var url = "/deployment/api/deployments?size=20&search="+machineName
    var restClient = vraHost.createRestClient();
    var request = restClient.createRequest("GET", url);
    request.setHeader("Content-Type", "application/json")
    var response = restClient.execute(request);
    statusCodeAttribute = response.statusCode;
    System.log("REST Response Status Code: " + statusCodeAttribute);
    responseAsString = response.contentAsString;
    var machine = JSON.parse(response.contentAsString)
    //System.log(JSON.stringify(machine))
    try{
     id = machine.content[0].id;
    if (id != undefined || id!= null || id != "") {
        var machine = JSON.parse(response.contentAsString);
        var deploymentId = id;
        System.log("deployment Id: " + deploymentId);
        return deploymentId;
        break;
    }

    }
    catch (e){
        //deploymentId = "NA";
        System.log("deployment id not found retrying in 30 second.........");
        System.sleep(30000)
        System.log("Error fetching deployment id:" +e)
        
    }
    
}