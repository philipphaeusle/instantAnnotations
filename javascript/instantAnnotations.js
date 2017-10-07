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

function getSpecificDS() { //TODO call getAllDs and remove all without simple in front
    getAllDS(function (data) {
        for(var i in data){
            if(data.hasOwnProperty(i)){
                var name = data[i]["name"].toString();
                if(name.indexOf("Simple") !== -1){
                    $("<p><b>" + name + "</b></p>").appendTo($("#demo"));
                }
                else{
                    $("<p>" + name + "</p>").appendTo($("#demo"));
                }
            }
        }
    });
}


function create() { // TODO call getSpecificDs and create card for every object
    getSpecificDS();
    $('<div>test1</div>').appendTo($("#demo"));
    $('<div>test2</div>').appendTo($("#demo"));
}
