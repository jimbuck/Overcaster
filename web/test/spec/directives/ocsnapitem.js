'use strict';

describe('Directive: ocSnapItem', function () {

  // load the directive's module
  beforeEach(module('overcasterDirectives'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oc-snap-item></oc-snap-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ocSnapItem directive');
  }));
});
