'use strict';

describe('Directive: ocTileLayout', function () {

  // load the directive's module
  beforeEach(module('overcasterDirectives'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();

    scope.columns = 4;

    scope.colors = [{
      color: 'red'
    }, {
      color: 'white'
    }, {
      color: 'blue'
    }];
  }));

  it('should contain 3 children', inject(function ($compile) {
    element = angular.element('<oc:tile-layout items="colors" columns="columns"><h2 ng-bind="color" /></oc:tile-layout>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(3);
  }));
});
