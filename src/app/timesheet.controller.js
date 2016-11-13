/**
 * Created by Valentin on 11/5/2016.
 */
(function (module) {
    var TimeSheetController = function ($http) {
        var vm = this;
        // vm.records =
        //     [
        //         {
        //             user: "Valentin",
        //             tasks: [
        //                 "Make the UI"
        //             ],
        //             hours: 2
        //         },
        //         {
        //             user: "Adrian",
        //             tasks: [
        //                 "Perform tests on the app",
        //                 "Take a nap",
        //                 "Fix the bugs"
        //             ],
        //             hours: 18
        //         }
        //     ];
        vm.records = [];
        vm.warningLevel = function (numberOfHours) {
            if (numberOfHours <= 4) {
                return "danger";
            }
            else if (numberOfHours > 4 && numberOfHours < 6) {
                return "warning";
            }
            else {
                return "success";
            }
        };


        vm.addNewItem = function (user, task, hours) {
            var checkIfUserExists = function (name) {
                for (var i = 0; i < vm.records.length; i++) {
                    if (vm.records[i].user === name) {
                        return i;
                    }
                }
                return null;
            };

            var isTaskAlreadyAdded = function (tasks, currentTask) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i] === currentTask) {
                        return true;
                    }
                }
                return false;
            };

            var indexOfUser = checkIfUserExists(user);
            if (indexOfUser !== null) {
                if (!isTaskAlreadyAdded(vm.records[indexOfUser].tasks, task)) {
                    vm.records[indexOfUser].tasks.push(task);
                    vm.records[indexOfUser].hours = vm.records[indexOfUser].hours + hours;
                }
                else {
                    alert("You cannot add a task twice");
                }
            }
            else {
                vm.records.push(
                    {
                        user: user,
                        tasks: [task],
                        hours: hours
                    }
                );
            }
            vm.user = "";
            vm.task = "";
            vm.hours = "";
        };

        vm.getNumberOfRecords = function () {
            return vm.records.length;
        };

        vm.getItems = function () {
            $http.get("http://www.mocky.io/v2/582840310f0000e10e410014").success(function (data) {
                console.log(data);
                vm.records = data;
            });
        };
        vm.getItems();
    };

    module.controller("TimeSheetController", TimeSheetController);
}(angular.module("timeSheetApp")));