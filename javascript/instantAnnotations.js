

function getAllDS() { //return data
    $.ajax({
        type: "GET",
        url: 'https://semantify.it/api/domainSpecification',
        success: function (data) {
            return data;
        }
        error: function (data, xhr, status, err) {
        }
    });
}

function getSpecificDs(){ //TODO call getAllDs and remove all without simple in front

}


function create(divID) { // TODO call getSpecificDs and create card for every object
    $('<div>test1</div>').appendTo(divID);
    $('<div>test2</div>').appendTo(divID);
}
