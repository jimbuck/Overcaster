'use strict';

describe('Directive: ocTileLayout', function () {

  // load the directive's module
  beforeEach(module('overcasterDirectives'));

  var scope;

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
    var element = angular.element('<oc:tile-layout items="colors" columns="columns"><div /></oc:tile-layout>');
    element = $compile(element)(scope);
    expect(element.children().length).toBe(3);
  }));

  it('should increase item width when columns decrease', inject(function($compile){
    var element = angular.element('<oc:tile-layout items="colors" columns="columns"><div /></oc:tile-layout>');
    element = $compile(element)(scope);

    scope.columns = 4;
    scope.$apply();

    expect(element.children(':first').width()).toBe(25);

    scope.columns = 2;
    scope.$apply();

    expect(element.children(':first').width()).toBe(50);
  }));
});
