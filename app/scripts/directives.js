(function () {
  'use strict';

  angular.module('populationioApp')

    .directive('statsArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/stats-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('peopleArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/people-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('storyArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/story-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('positionArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/position-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('expectancyArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/expectancy-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('shareArea', function () {
      return {
        restrict: 'A',
        templateUrl: 'partials/share-area.html',
        link: function (scope, element, attrs, ngModel) {
          var parentWidth = window.innerWidth - 100,
            parentHeight = window.innerHeight - 100;
        }
      };
    })

    .directive('scrollTracker', function () {
      return {
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
          scope.$watch('currentPage', function (newValue, oldValue) {
            if (newValue !== oldValue) {
              setTimeout(function () {
                var el = $('section[data-order=' + newValue + ']');
                $('body').animate({scrollTop: el.offset().top}, 'slow');
              }, 100);
            }
          });
        }
      };
    })

    .directive('worldClock', function () {
      return {
        restrict: 'E',
        link: function (scope, element, attrs, ngModel) {
          var currentValue = 0;
          var digits = ('' + currentValue).split('');
          var clockElement = d3.select(element[0])
            .append('svg')
            .attr({
              width: digits.length * 40,
              height: 40,
              style: 'margin: 60px 0 0 60px'
            })
            .append('g')
            .attr({
              transform: 'translate(0,0)'
            });

          var countElement = clockElement
            .selectAll('.count-element')
            .data(digits)
            .enter()
            .append('g')
            .attr({
              'class': 'count-element',
              transform: function (d, i) {
                return 'translate(' + [i * 40, 0] + ')';
              }
            });

          var digit = countElement
            .append('g')
            .attr('class', 'digit');

          digit.append('rect')
            .attr({
              fill: 'transparent',
              width: 39,
              height: 40
            });

          var placeholder = countElement
            .append('g')
            .attr('class', 'placeholder')
            .attr({
              transform: 'translate(0,40)'
            });

          placeholder.append('rect')
            .attr({
              fill: 'transparent',
              width: 39,
              height: 40
            });

          digit.append('text')
            .text(function (d) {
              return d;
            })
            .attr({
              transform: 'translate(20,30)'
            });

          placeholder.append('text')
            .text(function (d) {
              return d;
            })
            .attr({
              transform: 'translate(20,30)'
            });

          var updaterInterval = setInterval(function () {
            if (currentValue > 8) {
              currentValue = -1;
            }
            _updateSingleDigit(currentValue += 1);
          }, 2500);

          function _updateSingleDigit(newDigit) {
            // countElement.select('.digit')
            // console.log(countElement[0][0])
            countElement.select('.digit')
              .transition()
              .delay(2000)
              .attr({
                transform: 'translate(0,-40)'
              });
            countElement.select('.placeholder text')
              .text(newDigit);
            countElement.select('.placeholder')
              .transition()
              .ease('bounce')
              .delay(2000)
              .attr({
                transform: 'translate(0,0)'
              });

            countElement.select('.digit')
              .transition()
              .ease('bounce')
              .duration(0)
              .delay(2200)
              .attr({
                transform: 'translate(0,40)'
              });

            var a = countElement.select('.digit');
            var b = countElement.select('.placeholder');
            a.attr('class', 'placeholder');
            b.attr('class', 'digit');
          }
        }
      };
    })
    .directive('babiesFlood', function () {
      return {
        restrict: 'E',
        link: function (scope, element, attrs, ngModel) {
          var currentValue = 0;
          var digits = ('' + currentValue).split('');
          var babiesArea = d3.select(element[0])
            .append('svg')
            .attr({
              width: 100,
              height: 100,
              style: 'margin: 60px 0 0 60px'
            })
            .append('g')
            .attr({
              transform: 'translate(0,0)'
            });
          babiesArea.append("use")
            .attr({"xlink:href": "#baby-boy"})
          babiesArea.append("use")
            .attr({"xlink:href": "#baby-girl",
              transform: 'translate(60,0)'})


        }
      };
    })

    .directive('peopleGrid', function (PeopleGridService, PopulationIOService) {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var personWidth = 30,
            personHeight = 50,
            data = PeopleGridService.getData(),
            width = element.parent().width(),
            height = element.parent().height();

          var root = d3.select(element[0])
            .append('svg')
            .attr({width: width, height: height})
            .append('g')
            .attr({transform: 'translate(0,0)'});

          var person = root
            .selectAll('.person')
            .data(data)
            .enter()
            .append('g')
            .attr({
              'class': function (d) {
                var className = 'person';
                if (d.rank === PopulationIOService.getRank()) {
                  className += ' me';
                }
                return className;
              },
              transform: function (d, i) {
                return 'translate(' + [
                    parseInt(i % parseInt(width / personWidth - 1, 0), 0) * personWidth,
                    parseInt(i / parseInt(width / personWidth - 1, 0), 0) * personHeight
                ] + ')';
              }
            })
            .on('mouseover', function () {
              d3.select(this).classed('highlight', true);
            })
            .on('mouseout', function () {
              d3.select(this).classed('highlight', false);
            });

          var personRect = person
            .append('rect')
            .attr({
              width: personWidth,
              height: personHeight
            });

          var personLabel = person
            .append('text')
            .text(function (d, i) { return i; })
            .attr({
              fill: '#fff',
              'text-anchor': 'middle',
              transform: 'translate(' + [
                  personWidth / 2,
                  personHeight / 2 + 4
              ] + ')'
            });
        }
      };
    })

    .directive('storyLine', function () {
      return {
        restrict: 'E',
        link: function (scope, element) {
          var width = element.parent().width(),
            height = element.parent().height(),
            lineLength = width,
            yearMax = 100,
            yearMin = 0,
            margin = {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            };

          var data = [
            { year: 5 },
            { year: 50, me: true },
            { year: 82 },
            { year: 69 },
            { year: 74 },
            { year: 90 }
          ];

          var root = d3.select(element[0])
            .append('svg')
            .attr({width: width, height: height})
            .append('g')
            .attr({transform: 'translate(0,0)'});

          var bezierCurve = [
            'M166,352.5h200c0,0,15.221-13.795,9.181-32.587',
            's2.014-20.806-38.255-22.148s-168.457,0-168.457,0s-67.785',
            '-23.49-22.147-29.53s183.892,0,187.248,0.671'
          ].join('');

          var path = root.append('path')
            .attr('d', bezierCurve)
            .style('stroke-width', 2)
            .style('stroke', 'grey')
            .style('fill', 'none');
          var pathNode = path.node();

          var scale = d3.scale.linear()
            .domain([yearMin, yearMax])
            .range([0, pathNode.getTotalLength()]);

          var _getScaleTransformString = function (point, scale) {
            return 'translate(' + [ point.x, point.y ] + ') scale(' + scale + ')';
          };

          var _getMeLength = function (data) {
            for (var i = 0; i < data.length; i += 1) {
              if (data[i].me) {
                return scale(data[i].year);
              }
            }
            return null;
          };

          var pathOverlayLine = d3.svg.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .interpolate("linear");
          var pathOverlayData = [];
          for (var i = 0; i < _getMeLength(data); i += 1) {
            pathOverlayData.push(pathNode.getPointAtLength(i));
          }
          console.log(pathOverlayData)
          root.append('path')
            .attr('d', pathOverlayLine(pathOverlayData))
            .attr('stroke', 'yellow')
            .attr('stroke-width', 5)
            .attr('fill', 'none');

          var dot = root
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('g')
            .attr({
              'class': 'dot',
              transform: function (d) {
                var pos = pathNode.getPointAtLength(scale(d.year));
                return 'translate(' + [ pos.x, pos.y ] + ')';
              }
            })
            .on('mouseover', function (d) {
              d3.select(this)
                .classed('highlight', true)
                .transition()
                .attr({
                  'transform': _getScaleTransformString(
                    pathNode.getPointAtLength(scale(d.year)), '1.5'
                  )
                });
            })
            .on('mouseout', function (d) {
              d3.select(this)
                .classed('highlight', false)
                .transition()
                .attr({
                  'transform': _getScaleTransformString(
                    pathNode.getPointAtLength(scale(d.year)), '1.0'
                  )
                });
            });

          dot.append('circle')
            .attr({
              r: function (d) {
                return d.year > 50 ? 5 : 10;
              }
            });

          dot.append('text')
            .text(function (d) {
              if (d.year < 50) {
                return 3;
              }
            })
            .attr({
              'text-anchor': 'middle',
              y: function () {
                return 3;
              }
            });
        }
      };
    })
  ;
}());