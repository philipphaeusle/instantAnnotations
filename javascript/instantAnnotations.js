

function getAllDS(callback) { //return data
    $.ajax({
        type: "GET",
        url: 'https://semantify.it/api/domainSpecification',
        success: function (data) {
          callback(data)
        },
        error: function (data, xhr, status, err) {
        }
    });
}

function getSpecificDS(){ //TODO call getAllDs and remove all without Simple in front
    getAllDS(function(data){
      data.forEach(function(e) {
          if (e.name.includes("Simple")){
            alert(e);
          }
        });
    });
  };



function create(divID) { // TODO call getSpecificDs and create card for every object
    getSpecificDS();
    $('<div>test1</div>').appendTo(divID);
    $('<div>test2</div>').appendTo(divID);
}
