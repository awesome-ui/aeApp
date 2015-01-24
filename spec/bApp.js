describe('bApp', function() {

    beforeEach(module('bApp'))

    describe('bApp change rootScope', function () {

        var scope, element

        beforeEach(inject(function ($compile, $rootScope) {
            scope= $rootScope.$new()
            element= angular.element('<div b-app></div>')
            $compile(element)(scope)
            scope.$digest()
        }))

        it('expose #isRoute', inject(function () {
            assert.isFunction(scope.isRoute)
        }))

        it('expose bApp', inject(function () {
            assert.isObject(scope.bApp)
        }))

        it('expose bApp#useOver', inject(function () {
            assert.isFunction(scope.bApp.useOver)
        }))

        it('expose bApp#getOver', inject(function () {
            assert.isFunction(scope.bApp.getOver)
        }))

        it('expose bApp#showOver', inject(function () {
            assert.isFunction(scope.bApp.showOver)
        }))

        it('expose bApp#hideOver', inject(function () {
            assert.isFunction(scope.bApp.hideOver)
        }))

    })

})
