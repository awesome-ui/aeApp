angular.module('bApp', ['ngRoute'])

    .directive('bApp', bAppDirective)

    .directive('bAppOver', bAppOverDirective)
    .directive('bAppOverTransclude', bAppOverTranscludeDirective)

;



function bAppDirective($rootScope) {
    return {
        restrict: 'A',

        controllerAs: 'bApp',
        controller: function ($scope) {



            this.over= null

            this.showOver= function (name) {
                if (name) {
                    this.over= name
                    $scope.$emit('bAppOverShow')
                }
            }

            this.hideOver= function () {
                this.over= null
                $scope.$emit('bAppOverHide')
            }



            var overs= {}

            this.useOver= function (name, over) {
                if (name && over) {
                    overs[name]= over
                } else {
                    throw new Error
                }
            }

            this.getOver= function (name) {
                return overs[name] || null
            }



            $rootScope.$on('$routeChangeSuccess', function (evt, route) {
                $rootScope.route= route
            })

            $rootScope.isRoute= function (name, returnIfTrue, returnIfFalse) {
                if ($rootScope.route && $rootScope.route.name == name) {
                    return (arguments.length > 1) ? returnIfTrue : true
                } else {
                    return (arguments.length > 2) ? returnIfFalse : false
                }
            }

        },

        link: function ($scope, $e, $a) {
            var element= $e[0]

            $scope.$on('bAppOverShow', function () {
                var scrollWidth
                element.style.overflowY= 'scroll'
                element.style.right= 0
                scrollWidth= element.scrollWidth
                element.style.overflowY= 'hidden'
                scrollWidth= element.scrollWidth - scrollWidth
                element.style.right= scrollWidth+'px'
            })

            $scope.$on('bAppOverHide', function () {
                element.style.overflowY= 'scroll'
                element.style.right= 0
            })

        }

    }
}



function bAppOverDirective($rootScope) {
    return {
        restrict: 'A',
        require: '^bApp',
        transclude: 'element',
        link: function ($scope, $e, $a, bApp, $transclude) {
            bApp.useOver($a.bAppOver, {
                $scope: $scope,
                $e: $e,
                $transclude: $transclude,
            })
        }
    }
}

function bAppOverTranscludeDirective($rootScope) {
    return {
        restrict: 'A',
        require: '^bApp',
        transclude: true,
        link: function ($scope, $e, $a, bApp) {
            var over= bApp.getOver($a.bAppOverTransclude)
            if (over) {
                over.$transclude(over.$scope, function ($eTranscluded) {
                    $e.empty()
                    $e.append($eTranscluded)
                })
            }
        }
    }
}
