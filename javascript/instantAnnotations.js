var allDs;

function create(id) {
    getSpecificDS();
}

function getSpecificDS() {
    getAllDS(function (data) {
        allDs = data;
        var index = 0;
        var i = 0;
        data.forEach(function(item){
            var simpleDS = item['content'];
            if(!(simpleDS['schema:name'].includes('Simple'))){
                //return;                   //should be put in later
            }
            if(simpleDS['schema:name'] === 'SimpleEvent'){
                index = i;
            }
            var dsName = simpleDS['schema:name'].replace('Simple', '');
            $('#dsList').append('<option value=' + dsName+'>' + dsName + '</option>');
            i++;
        });

        $('#dsList')
            .prop('selectedIndex', index)
            .change(function () {
                changeSelectedDomainSpecification();
            });
        changeSelectedDomainSpecification();
    });
}


function changeSelectedDomainSpecification() {
    var selectedIndex = $('#dsList').prop('selectedIndex');
    var curDs = allDs[selectedIndex];
    var ds = curDs['content'];
    var dsName = ds['schema:name'].replace('Simple', '');
    var headingElement =  $('#ST2Heading'); //header element
    headingElement.html('<h4>Annotate '+ dsName +'</h4>');
    //ds['dsv:class'][0]['dsv:property'].forEach(function(prop){
      //  alert(prop['schema:name']);
        //$('<p>' + prop['schema:name'] + '</p>').appendTo($(divID));
    //});
    console.log(ds);
    createAnnotationForm(ds['dsv:class']['0']);
    $('#textArea').html(syntaxHighlight(JSON.stringify(ds, null, 2)));
}

function getAllDS(callback) { //return data
    $.ajax({
        type: 'GET',
        url: 'https://semantify.it/api/domainSpecification',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function () {
            console.log('error');
        }
    });
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function copy(id){
    var options = {
        htmlAllowed: true,
        style: 'toast',
        timeout: 3000
    };
    try {
        CopyToClipboard(id);
        options['content'] ='<table class="snackbar-table"><td><i class="material-icons snackbar-icon">content_paste</i><span>  Annotation copied into your clipboard.</span></td></table>',
        $.snackbar(options);
    } catch (err) {
        options['content'] = 'Failed to copy';
        $.snackbar(options);
    }
    clearSelection();
}

function clearSelection() {
    if ( document.selection ) {
        document.selection.empty();
    } else if ( window.getSelection ) {
        window.getSelection().removeAllRanges();
    }
}

function CopyToClipboard(id) {
    var range;
    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(id));
        range.select().createTextRange();
        document.execCommand('Copy');

    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(document.getElementById(id));
        window.getSelection().addRange(range);
        document.execCommand('Copy');
    }
}

function strip(html) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function createAnnotationForm(input){
  var bodyElementName = 'ST2Content'; // content element name
  $('#ST2Content').html(''); //clear content first
  $('#ST2Content').append('<div id="'+bodyElementName+'_properties_container">');

  var actualClassName = input["schema:name"];
  var propertiesArray = input["dsv:property"];

  $("#ST2Content_properties_container").html(''); //clear content first
  for(var i=0;i<propertiesArray.length;i++){
        createPropertyInputSegment(actualClassName, propertiesArray[i], bodyElementName);
    }
}

function createPropertyInputSegment(actualClassName, restrictedProperty, rootElementName){
    var propertyName = restrictedProperty["schema:name"];
    var isOptional = restrictedProperty["dsv:isOptional"];
    var multipleValuesAllowed = restrictedProperty["dsv:multipleValuesAllowed"];
    var containsRestrictedClass = helper_containsRestrictedClassInExpectedTypeArray(restrictedProperty);
    $('#'+rootElementName).append('<div id="'+rootElementName+'_properties_container"><font color="red" size=5>'+propertyName +'</font></div>');
    $('#'+rootElementName).append('<div id="'+rootElementName+'_properties_container"><font color="red" size=2>'+'optional: '+isOptional +'</font></div>');
  if(containsRestrictedClass){
      //TODO  restricted class
      $('#'+rootElementName).append('<div id="'+rootElementName+name+'_properties_container"><font color="green">+isRestricted</font></div>');
      }
  }



function helper_containsRestrictedClassInExpectedTypeArray(restrictedProperty) {
    for(var i=0;i<restrictedProperty['dsv:expectedType'].length;i++){
        if(restrictedProperty['dsv:expectedType'][i]['@type'] === "dsv:RestrictedClass"){
            return true;
        }
    }
    return false;
}
