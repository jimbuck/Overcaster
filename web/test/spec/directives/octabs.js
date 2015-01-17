'use strict';

describe('Directive: ocTabs', function () {

  // load the directive's module
  beforeEach(module('overcasterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<oc-tabs></oc-tabs>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ocTabs directive');
  }));
});
