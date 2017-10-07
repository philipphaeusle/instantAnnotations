function getAllDS(callback) { //return data
    $.ajax({
        type: "GET",
        url: 'https://semantify.it/api/domainSpecification',
        success: function (data) {
            callback(data);
        },
        error: function () {
            console.log("error");
        }
    });
}

function getSpecificDS(divID) { //TODO call getAllDs and remove all without simple in front
    getAllDS(function (data) {
      data.forEach(function(item) {
                if(item.name.includes("Simple")){
                    $("<p><b><h1>" + item.name + "</h1></b></p>").appendTo($(divID));
                    item.content["dsv:class"]["0"]["dsv:property"].forEach(function(e){
                      $("<p>" + e["schema:name"] + "</p>").appendTo($(divID));
                    });
                }
                else{
                    $("<p><h1>" + item.name + "</h1></p>").appendTo($(divID));
                }
        });
    });
}


function create(divID) { // TODO call getSpecificDs and create card for every object
    getSpecificDS(divID);

}
