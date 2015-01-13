'use strict';

describe('Directive: gridLayoutItem', function () {

  // load the directive's module
  beforeEach(module('overcasterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<grid-layout-item></grid-layout-item>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gridLayoutItem directive');
  }));
});
