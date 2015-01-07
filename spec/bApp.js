describe('bApp', function() {

    beforeEach(module('bApp'))

    describe('bApp change rootScope', function () {

        var scope, element

        beforeEach(inject(function ($compile, $rootScope) {

            scope= $rootScope.$new()
            scope.getBeginDate= function () {
                return beginDate
            }
            scope.getEndDate= function () {
                return endDate
            }
            scope.getIntervals= function () {
                return intervals
            }
            element= angular.element('<div b-app></div>')
            $compile(element)(scope)
            scope.$digest()

        }))

        it('expose #isRoute', inject(function ($rootScope) {
            assert.isFunction($rootScope.isRoute)
        }))

        it('expose #useDialog', inject(function ($rootScope) {
            assert.isFunction($rootScope.useDialog)
        }))

        it('expose #getDialog', inject(function ($rootScope) {
            assert.isFunction($rootScope.getDialog)
        }))

        it('expose #appDialogShow', inject(function ($rootScope) {
            assert.isFunction($rootScope.appDialogShow)
        }))

        it('expose #appDialogHide', inject(function ($rootScope) {
            assert.isFunction($rootScope.appDialogHide)
        }))

        it('expose #appDialogToggle', inject(function ($rootScope) {
            assert.isFunction($rootScope.appDialogToggle)
        }))

    })

})
