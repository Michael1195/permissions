"use strict"

var model = {
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

var permissionApp = angular.module("permissionApp", []);
permissionApp.controller("permissionController", function ($scope) {
  $scope.list = model;

  $scope.getLocalStorage = (function () {
    try {
      const serializedState = localStorage.getItem("permission");
      if(serializedState) $scope.list.items = JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  })();

  $scope.addLocalStorage = function () {
    try {
      const serializedState = JSON.stringify($scope.list.items);
      localStorage.setItem("permission", serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };

  $scope.checkAllView = function () {
    return $scope.list.items.every((obj) => obj.permission.view);
  };

  $scope.checkAllEdit = function () {
    return $scope.list.items.every((obj) => obj.permission.edit);
  };

  $scope.checkAllRemove = function () {
    return $scope.list.items.every((obj) => obj.permission.remove);
  };

  $scope.checkSomeView = function () {
    return $scope.list.items.some((obj) => obj.permission.view);
  };

  $scope.checkSomeEdit = function () {
    return $scope.list.items.some((obj) => obj.permission.edit);
  };

  $scope.checkedColumn = function (evt) {
    if (!evt.target.checked) return;
    let keyPer = evt.target.id.slice(3);

    $scope.list.items.forEach((obj) => {
      if (keyPer != "View") {
        let elmCheckbox = document.querySelector(
          `#${obj.section}${keyPer}`
        );
        if (!elmCheckbox.hasAttribute("disabled"))
          obj.permission[keyPer.toLowerCase()] = true;
      } else {
        obj.permission[keyPer.toLowerCase()] = true;
      }
    });
  };
});