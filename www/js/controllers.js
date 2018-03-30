angular.module('starter.controllers', [])

.controller('HomePageCtrl', function($scope) {})

.controller('SMSvoteCtrl', ['$scope', '$ionicPlatform', function($scope, $ionicPlatform) {
    $scope.running = false;
    $scope.smsRecieved = new Array();
    $scope.results1 = 0;
    $scope.results2 = 0;
    $scope.results3 = 0;
    $scope.results4 = 0;
    $scope.results5 = 0;
    $scope.results6 = 0;
    $scope.results7 = 0;
    $scope.SMSlist = function() {
        $ionicPlatform.ready(function() {
            console.log('############# verifyNumbers launched ! #############');
            $scope.running = true;
            var filter = {
                box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
                read : 0, // 0 for unread SMS, 1 for SMS already read
                indexFrom : 0, // start from index 0
                maxCount : 500 // count of SMS to return each time
            };
            // if(SMS) SMS.startWatch(function(){
            //     document.addEventListener('onSMSArrive', function(e){
            //         var sms = e.data;
            //         smsList.push( sms );
            //         switch (sms.body) {
            //             case '1':
            //             $scope.results1 = $scope.results1 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             case '2':
            //             $scope.results2 = $scope.results2 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             case '3':
            //             $scope.results3 = $scope.results3 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             case '4':
            //             $scope.results4 = $scope.results4 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             case '5':
            //             $scope.results5 = $scope.results5 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             case '6':
            //             $scope.results6 = $scope.results6 + 1;
            //             deletenewarrivant(sms.address);
            //             break;
            //             default:
            //             $scope.results7 = $scope.results7 + 1;
            //             deletenewarrivant(sms.address);
            //         }
            //     });
            // }, function(){
            //     console.log('Error !!');
            //     $scope.errDisplay = 'SMS not intercepted';
            // });
            // function deletenewarrivant(sender) {
            //     var filter = {
            //         box : 'inbox',
            //         address : sender
            //     };
            //     if(SMS) SMS.deleteSMS(filter, function(n){
            //         console.log('Deleted');
            //     }, function(err){
            //         console.log('Not deleted');
            //         $scope.errDisplay = 'SMS not deleted : ' + err;
            //     });
            // }
            if(SMS) SMS.listSMS(filter, function(data){
                console.log('############# Listing SMS...');
                setTimeout(function(){
                    for (var i = 0; i < data.length; i++) {
                        switch (data[i].body) {
                            case '1':
                            $scope.results1 += 1;
                            $scope.apply();
                            break;
                            case '2':
                            $scope.results2 += 1;
                            $scope.apply();
                            break;
                            case '3':
                            $scope.results3 += 1;
                            $scope.apply();
                            break;
                            case '4':
                            $scope.results4 += 1;
                            $scope.apply();
                            break;
                            case '5':
                            $scope.results5 += 1;
                            $scope.apply();
                            break;
                            case '6':
                            $scope.results6 += 1;
                            $scope.apply();
                            break;
                            default:
                            $scope.results7 += 1;
                            $scope.apply();
                        }
                    }
                }, 60000);
            },
            function(err){
                console.log(err);
                $scope.errDisplay = err;
            });
        });
    };
    // $scope.stopSMSWatch = function() {
    //     $ionicPlatform.ready(function() {
    //         if(SMS) SMS.stopWatch(function(){
    //             console.log('Watch ended');
    //             $scope.watchStopped = '(Watch is over)';
    //         }, function(){
    //             console.log('Watch not ended');
    //             $scope.errDisplay = 'Watch not ended ';
    //         });
    //     });
    // };
}])

// Vérifier que la boucle le fait quand le SMS est envoyé et pas avant (cf les mails)
// Changer le mode de remplacement des noms et heures de bus
// Ajouter du display pour les sms envoyés
.controller('SMSsenderCtrl', ['$scope','$ionicPlatform','$cordovaSms', function ($scope,$ionicPlatform,$cordovaSms) {
    var now = new Date();
    var nbError = 0;
    var error = new Array();

    errorGestion = function (error, infos) {
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
        nbError++;
        $scope.errors = error;
        error[nbError - 1] = {
            number: nbError,
            time: addZero(now.getHours()) + ':' + addZero(now.getMinutes()) + ':' + addZero(now.getSeconds()),
            recipientName: infos.name,
            recipientPhone: infos.number
        };
    }

    nbError = 0;
    $scope.form = {
        numbers: '0661493480;0661493480;0661493480;0661493480;0661493480',
        names: 'PREMIER;Chloé;Jérémy;Pascal;DERNIER',
        times: '23h;00h;22h;01h;21h;21h',
        message: 'Coucou #, tu es dans le bus de #'
    };
    $scope.readyToGo = false;
    $scope.readyToCheck = true;
    $scope.done = false;
    $scope.numberofpeopple = 0;
    $scope.sentSMS = {};
    $scope.proceeding = false;

    $scope.verifyNumbers = function() {
        console.log('############# verifyNumbers launched ! #############');
        if ($scope.form.numbers.substring(0,2) != '06' && $scope.form.numbers.substring(0,2) != '07') {
            $scope.form.numbers = undefined;
            alert('Mauvais format de numéros 1');
        }
    };
    $scope.verifyNames = function() {
        console.log('############# verifyNames launched ! #############');
        var regex = /\d/g;
        if (regex.test($scope.form.names) === true) {
            $scope.form.names = undefined;
            alert('Mauvais format de noms');
        }
    };
    $scope.verifyTimes = function() {
        console.log('############# verifyTimes launched ! #############');
        var regex = /\d/g;
        if ($scope.form.times.substring(0,2) == '06' && $scope.form.times.substring(0,2) == '07') {
            $scope.form.times = undefined;
            alert('Mauvais format d\'horaire');
        }
        if (regex.test($scope.form.times.substring(2,3)) === true) {
            $scope.form.times = undefined;
            alert('Mauvais format d\'horaire');
        }
    };
    $scope.verifyMessage = function() {
        console.log('############# verifyMessage launched ! #############');
        if ($scope.form.message.split('#').length -1 != 2) {
            $scope.form.message = undefined;
            alert('Mauvais format de message');
        }
    };
    var data = new Array();
    var message = '';
    var count = 0;

    $scope.dataTreat = function() {
        console.log('############# dataTreat launched ! #############');
        var input = $scope.form;

        $scope.verifyNumbers();
        $scope.verifyNames();
        $scope.verifyTimes();
        $scope.verifyMessage();

        if (input.numbers != undefined && input.names != undefined && input.times != undefined && input.message != undefined) {
            console.log('############# $scope isn\'t empty #############');
            count = input.numbers.split(';').length; // -1 to hve the correct ';' count, here it's just the number of people
            console.log('############# ' + (count) + ' entries #############');
            for (var i = 0; i < count; i++) {
                console.log('Proceeding entry #' + (i + 1));
                var n = input.numbers.indexOf(';');
                var t = input.names.indexOf(';');
                var p = input.times.indexOf(';');
                if (n == -1 || t == -1 || p == -1) {
                    n = input.numbers.length + 1;
                    t = input.names.length + 1;
                    p = input.times.length + 1;
                }
                data[i] = {
                    number: input.numbers.substring(0, n),
                    name: input.names.substring(0, t),
                    time: input.times.substring(0, p),
                };
                input.numbers = input.numbers.substring(n + 1);
                input.names = input.names.substring(t + 1);
                input.times = input.times.substring(p + 1);
            }
            message = input.message;
            delete $scope.form;
            delete input;
            $scope.readyToGo = true;
            $scope.readyToCheck = false;
            $scope.numberofpeopple = data.length
        } else {
            alert('Erreur d\'entrée');
        }
    };

    $scope.sendSMS = function() {
        console.log('############# sendSMS function launched ! #############');
        $scope.proceeding = true;
        $scope.readyToGo = false;
        var options = {
            replaceLineBreaks: true, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS without open any other app
                //intent: 'INTENT'  //send SMS with the native android SMS messaging
            }
        };
        function nextStep(texto, options) {
            console.log('############# Sending text... #############');
            console.log(texto);
            $ionicPlatform.ready(function() {
                $cordovaSms
                .send(data[i].number, texto, options)
                .then(function(result) {
                    console.log(result);
                    $scope.sentSMS[$scope.sentSMS.length] = {
                        name: data[i].name,
                        time: data[i].time,
                        number: data[i].number,
                        times: $scope.sentSMS.length
                    };
                    $scope.$apply;
                    console.log("SMS #" + i + " sent!");
                }, function(error) {
                    console.log(error);
                    errorGestion(error, data[i]);
                })
            })
        }

        var i = 1;

        function myLoop () {           //  create a loop function
            setTimeout(function () {    //  call a 3s setTimeout when the loop is called
                console.log('Proceeding SMS #' + (i + 1));
                var n = 0;
                var texto = message;
                for (var j = 0; j < 2; j++) {
                    var n = texto.indexOf('#')
                    switch (j) {
                        case 0:
                        texto = texto.substring(0, n) + data[i].name + texto.substring(n + 1);
                        break;
                        case 1:
                        texto = texto.substring(0, n) + data[i].time + texto.substring(n + 1);
                        nextStep(texto, options);
                        break;
                    }
                }
                if (i == 4) {
                    $scope.readyToGo = false;
                    $scope.done = true;
                    $scope.readyToGo = false;
                }         //  your code here
                i++;                     //  increment the counter
                if (i < count) {            //  if the counter < 10, call the loop function
                    myLoop();             //  ..  again which will trigger another
                }                        //  ..  setTimeout()
            }, 5000)
        }

        myLoop();
    };
}])
