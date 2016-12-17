var exec = require("child_process").exec;
var querystring = require("querystring");


function start(response, postData) {
    console.log("Request handler 'start' was called");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8 />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post" >' +
        '<textarea name="text" rows="20" cols="60"> </textarea>' +
        '<input type="submit" value="Submit Text" /> ' +
        '</form>' +
        '</body>' +
        '</html>';

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(body);
        response.end();

 }

function upload(response, postData) {
    console.log("Request handler 'upload' was called");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("You've sent: " + querystring.parse(postData).text);
    response.end();

}


function reserveTimeSlot(response, postData) {
    console.log("Request handler 'reserveTimeSlot' was called:  postData is " + postData);
    var body = reservingTimeSlotHtML();
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(body);
    response.end();

}


function reservingTimeSlot(response, postData) {
    console.log("Request handler 'reservingTimeSlot' was called:  postData is " + querystring.parse(postData).text);
    console.log("Request handler 'reservingTimeSlot' was called:  postData is " + postData);

 //   var reservingObj = JSON.parse(postData);
 //   var body = reservingTimeSlotHtML(reservingObj);


    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write(postData);
    response.end();

}


function reservingTimeSlotHtML(reservingObj) {
    if (reservingObj) {
        console.log(reservingObj);
    }
    var body = '<!DOCTYPE html>' +
        '<html lang="en" xmlns="http://www.w3.org/1999/xhtml"> ' +
        resetingTimeSlotsHead(reservingObj) +
        '<body ng-app="DemoApp" ng-controller="demoCtrl">' +
        '<div class="container">' +
        '<div class="row">' +
        '<div class="col-md-12 header">time slots</div>' +
        '</div>' +
        '<div  >' +
        '<ul>' +
        '<li ng-repeat="slot in timeSlots">' +
        '<button data-ng-click="slotSelected(slot)" data-ng-class="getReservationClass(slot)" >{{slot}}</button>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="modal fade" id="modalReservation" role="dialog">' +
        '<div class="modal-dialog">' +
        '<!-- Modal content-->' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
        '<h4 style="color:red;"><span class="glyphicon glyphicon-lock"></span>Reservation</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        '<form method="post" action="reservingTimeSlot">' +
        '<input type="hidden" id="timeStlot"/> ' +
        '<div class="form-group">' +
        '<label for="usrname"><span class="glyphicon glyphicon-user"></span> Username</label> ' +
        '<input type="text" class="form-control"  id="usrname" placeholder="Enter UserName">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="phone"><span class="glyphicon glyphicon-eye-open"></span>Phone Number</label>' +
        '<input type="text" class="form-control" id="phone"  placeholder="Enter phone number">' +
        '</div>' +

        '<button type="button" data-ng-click="doPost()" class="btn btn-default btn-success btn-block">' +
        '<span class="glyphicon glyphicon-off"></span> Reserve' +
        '</button>' +


        '</form>' +
        '</div><div class="modal-footer">' +
        '<button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal">' +
        '<span class="glyphicon glyphicon-remove"></span> Cancel' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</body>' +
        '</html>'


    
    return body;

}

function resetingTimeSlotsHead(reservingObj) {
    var HEAD = '<head> ' +
        '<meta charset="utf-8" />' +
        '<title>Demo App</title>' +
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script> ' +
        '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>' +
        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">' +
        '</script><link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />' +
        '<style>' +
        '.header { ' +
        'text-align: center; ' +
        '} ' +
        '    ul {' +
        'list-style-type: none;' +
        '}' +
        '    button {' +
        'width: 130px;' +
        '   }' +
        '   .IsReserved { background-color: #aa0000; color: #ffffff;}' +
        '   .IsAvailable { background-color: cornflowerblue; color: #000000;}' +
        '    </style>' +
          resetingTimeSlotsScript(reservingObj)  +
                '</head>';
    return HEAD;
}

function resetingTimeSlotsScript(reservingObj) {
    // This is a Hack .  Need a better way
    if (reservingObj) {
        var reservedSlot = ' $scope.reservedSlot  = "' + reservingObj.slot + '";'
    } else {
        var reservedSlot = ' $scope.reservedSlot  = "";'
    }

    var script = '    <script>' +
        '    var app = angular.module("DemoApp", []);' +
        '    app.controller("demoCtrl", function ($scope) {' +
        '        var timeSlots = [];' +
        '        var hourItem = new Date(2016, 1, 1, 9, 0, 0);' +
        '        for (i = 9; i < 18; i++) {' +
        '            hourItem.setHours(i);' +

        '            if (i > 12) {' +
        '                timeSlots.push((hourItem.getHours() - 12) + ": 00 PM");' +
        '            } else {' +
        '                timeSlots.push(hourItem.getHours() + ": 00 AM");' +
        '            }' +
        '        }' +
        '        $scope.timeSlots = timeSlots;' +
                 reservedSlot +
        '        $scope.getReservationClass = function (slot) {' +
        '             if (slot == $scope.slot) {  ' +
        '                   return "IsReserved";  ' +
        '             } else { ' +
        '                   return "IsAvailable"; ' +
        '             }' +
        '           };' +
        '        $scope.username = ""; ' +
        '        $scope.phone = ""; ' +
        '        $scope.slot = ""; ' +
        '        $scope.hasReservation = false; ' +
        '        $scope.userNameForSelected = function (slot) { ' +
        '             if (slot == $scope.slot) {  ' +
        '                   return $scope.username;  ' +
        '             } else { ' +
        '                   return ""; ' +
        '             }' +
        '        }; ' +
        '        $scope.phoneForSelected = function (slot) { ' +
        '             if (slot == $scope.slot) {  ' +
        '                   return $scope.phone;  ' +
        '             } else { ' +
        '                   return ""; ' +
        '             }' +
        '        }; ' +

        '        $scope.slotSelected = function (slot) {' +
        '            $("#modalReservation").modal();' +
        '             $("#timeStlot").val(slot); ' +
        '             $("#usrname").val($scope.userNameForSelected(slot)); ' +
        '             $("#phone").val($scope.phoneForSelected(slot)); ' +

        '        };' +
        '        $scope.doPost = function doPost() {' +
        '           var data =  JSON.stringify({ user: $("#usrname").val() , phone: $("#phone").val() , slot: $("#timeStlot").val() }); ' +

        '           var xmlhttp = new XMLHttpRequest();' +
        '           xmlhttp.onreadystatechange = function() {' +
        '              if (xmlhttp.readyState == XMLHttpRequest.DONE) {' +
        '                   var reservingReturnedObj = JSON.parse(xmlhttp.responseText);  ' +
        '                   $scope.username = reservingReturnedObj.user; ' +
        '                   $scope.phone = reservingReturnedObj.phone; ' +
        '                   $scope.slot = reservingReturnedObj.slot; ' +
        '                   $scope.hasReservation = true; ' +
        '                   $("#usrname").val(""); ' +
        '                   $("#phone").val(""); ' +

        '                   $("#modalReservation").modal("hide");   '   +
        '               }' +
        '           };' +
        '            xmlhttp.open("POST", "http://localhost:8888/reservingTimeSlot", false);' +
        '            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");' +
        '            xmlhttp.send(data);' +
        '        };' +
        '   });' +
        '</script>';
    return script;

}

exports.start = start;
exports.upload = upload;
exports.reserveTimeSlot = reserveTimeSlot;
exports.reservingTimeSlot = reservingTimeSlot;
