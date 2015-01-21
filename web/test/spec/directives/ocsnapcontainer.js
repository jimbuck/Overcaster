'use strict';

describe('Directive: ocSnapContainer', function () {

  // load the directive's module
  beforeEach(module('overcasterDirectives'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oc-snap-container></oc-snap-container>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ocSnapContainer directive');
  }));
});
