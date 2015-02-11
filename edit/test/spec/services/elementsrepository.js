'use strict';

describe('Service: ElementsRepository', function () {

  var ElementsRepo;
  var $scope;

  // load the service's module
  beforeEach(module('overcasterApp'));

  // instantiate service
  beforeEach(inject(function ($rootScope, ElementsRepository) {
    ElementsRepo = new ElementsRepository();
    $scope = $rootScope;
  }));

  it('should return a list of elements', function (done) {

    ElementsRepo.load().then(function (elements) {
      expect(elements.length).toBeGreaterThan(0);
      done();
    });

    $scope.$apply();
  });

  it('should return one element based on a string `id`', function (done) {
    ElementsRepo.load('1').then(function (element) {
      expect(element).toBeDefined();
      done();
    });

    $scope.$apply();
  });

  it('should return one element based on a integer `id`', function (done) {
    ElementsRepo.load(1).then(function (element) {
      expect(element).toBeDefined();
      done();
    });

    $scope.$apply();
  });

  it('should return a list of elements in use', function(done){
    ElementsRepo.load(function(element){
      return element.inUse;
    }).then(function (elementsInUse) {
      expect(elementsInUse.length).toBeGreaterThan(0);
      done();
    });

    $scope.$apply();
  });

  it('should add a new element', function(done){
    var newElement = {
      name: 'Test Element',
      dir: 'test_element',
      inUse: false
    };

    ElementsRepo.save(newElement).then(function (element) {
      expect(element).toBeDefined();
      expect(element.id).toBe(5);
      done();
    });

    $scope.$apply();
  });

  it('should update an existing element', function (done) {
    var existingElement = {
      id: 3,
      name: 'Spotify Player',
      dir: 'spotify_player',
      inUse: true
    };

    ElementsRepo.save(existingElement).then(function (element) {
      expect(element).toBeDefined();
      expect(element.id).toBe(3);
      done();
    });

    $scope.$apply();
  });

  it('should error if strict-adding an existing element', function (done) {
    var existingElement = {
      id: 3,
      name: 'Spotify Player',
      dir: 'spotify_player',
      inUse: true
    };

    ElementsRepo.save(existingElement, true).then(function(){
      expect(false).toBe(true);
      done();
    }, function (reason) {
      expect(reason).toBeDefined();
      done();
    });

    $scope.$apply();
  });

  // TODO: Add test for delete element...

});
