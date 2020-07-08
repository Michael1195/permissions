"use strict";

let model = {
  items: [
    {
      section: "Calendar",
      permission: { view: false, edit: false, remove: false },
    },
    {
      section: "Profile",
      permission: { view: false, edit: false, remove: false },
    },
    {
      section: "Property",
      permission: { view: false, edit: false, remove: false },
    },
    {
      section: "Contacts",
      permission: { view: false, edit: false, remove: false },
    },
  ],
};

let permissionApp = angular.module("permissionApp", []);
permissionApp.controller("permissionController", function ($scope) {
  $scope.list = model;

  getLocalStorage();

  $scope.checkAllView = function () {
    return $scope.list.items.every((obj) => obj.permission.view);
  };

  $scope.checkAllEdit = function () {
    return $scope.list.items.every((obj) => obj.permission.edit);
  };

  $scope.checkAllRemove = function () {
    return $scope.list.items.every((obj) => obj.permission.remove);
  };

  $scope.handleView = function (evt) {
    let section = evt.target.id.slice(0, -4);
    $scope.list.items.some((obj) => {
      if (obj.section == section) {
        obj.permission.edit = false;
        obj.permission.remove = false;
      }
    });
  };

  $scope.handleEdit = function (evt) {
    let section = evt.target.id.slice(0, -4);
    $scope.list.items.some((obj) =>
      obj.section == section ? (obj.permission.remove = false) : null
    );
  };

  $scope.checkedColumn = function (evt) {
    if (!evt.target.checked) return;
    let keyPer = evt.target.id.slice(3);

    $scope.list.items.forEach((obj) => {
      obj.permission[keyPer.toLowerCase()] = true;
    });
  };

  function getLocalStorage() {
    try {
      const serializedState = localStorage.getItem("permission");
      if (serializedState) $scope.list.items = JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  }

  $scope.addLocalStorage = function () {
    try {
      const serializedState = JSON.stringify($scope.list.items);
      localStorage.setItem("permission", serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };
});
