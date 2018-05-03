angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http) {


    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.snackBar('Succesful');
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    function isString(x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }

    $scope.addToLibrary = function(index) {

        $scope.data = {
            movieName : $scope.moviesList[index]
        }
        var obj = {
            'data' : $scope.data,
            'date' : Date.now()
        };
        
        $scope.post('/saveDataManual', obj);
    };


    $scope.moviesListMain = [
        'Avengers',
        'Iron Man',
        'Spider Man',
        'Thor',
        'Dilwale',
        'Diljale',
        'Gladiator'
    ];

    $scope.moviesList = $scope.moviesListMain;

    $scope.searchMovie = function (name) {

        if (!name) {
            $scope.moviesList = $scope.moviesListMain;
        }

        name = name.toLowerCase();
        var arr = [];
        for (var i = 0; i < $scope.moviesListMain.length; i++) {
            var str = $scope.moviesListMain[i].toLowerCase();
            if (str.includes(name)) {
                arr.push($scope.moviesListMain[i]);
            }
            continue;
        }
        $scope.moviesList = arr;
    };

});