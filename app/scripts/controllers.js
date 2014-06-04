(function () {
  'use strict';

  angular.module('populationioApp')
      .controller('MainCtrl', function ($scope, Data, $rootScope, $location) {
        $scope.showNextPage = function () {
          if ($rootScope.currentPage < 5) {
            $rootScope.currentPage += 1
          }
        };

      })
      .controller('StatsCtrl', function ($scope, Data, $rootScope, $location) {

//        Data.query(function (testChartData) {
//          $rootScope.testChartData = testChartData;
//          console.log($rootScope.testChartData);
//        });

      })
      .controller('PeopleCtrl', function ($scope, Data, $rootScope, $location) {

        Data.query(function (testChartData) {
          $rootScope.testChartData = testChartData;
          console.log($rootScope.testChartData);
        });

        $scope.rank = 12330323;

        $scope.data = [];
        for (var i=0; i<= 200; i+=1) {
          $scope.data.push({
            sex: 'male'
          });
        }
      })
      .controller('StoryCtrl', function ($scope, Data, $rootScope, $location) {

        Data.query(function (testChartData) {
          $rootScope.testChartData = testChartData;
          console.log($rootScope.testChartData);
        });

      })
      .controller('PositionCtrl', function ($scope, Data, $rootScope, $location) {

        Data.query(function (testChartData) {
          $rootScope.testChartData = testChartData;
          console.log($rootScope.testChartData);
        });

      })
      .controller('ExpectancyCtrl', function ($scope, Data, $rootScope, $location) {

        Data.query(function (testChartData) {
          $rootScope.testChartData = testChartData;
          console.log($rootScope.testChartData);
        });

      })
      .controller('ShareCtrl', function ($scope, Data, $rootScope, $location) {

        Data.query(function (testChartData) {
          $rootScope.testChartData = testChartData;
          console.log($rootScope.testChartData);
        });

      })
  ;
}());