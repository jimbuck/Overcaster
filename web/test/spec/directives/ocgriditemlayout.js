'use strict';

describe('Directive: ocTileLayout', function () {

  // load the directive's module
  beforeEach(module('overcasterDirectives'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

    scope.colors = [
    { color: 'red' },
    { color: 'white' },
    { color:'blue' }
    ];

  }));

  it('should display 3 children', inject(function ($compile) {
    element = angular.element('<oc:tile-layout items="colors"><h2 ng-bind="item.color"></h2></oc:tile-layout>');
    element = $compile(element)(scope);
    console.log(scope.colors);
    expect(element.children().length).toBe(3);
  }));
});
