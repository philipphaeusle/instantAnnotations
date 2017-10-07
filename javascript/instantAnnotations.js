

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

function getSpecificDS(){ //TODO call getAllDs and remove all without simple in front
    getAllDS(function(data){
      alert("one "+ data);
      var allDS = JSON.parse(data);
      alert("all "+allDS);
    })
  };



function create(divID) { // TODO call getSpecificDs and create card for every object
    getSpecificDS();
    $('<div>test1</div>').appendTo(divID);
    $('<div>test2</div>').appendTo(divID);
}
