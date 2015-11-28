'use strict';

/**
 * @ngdoc function
 * @name classbookApp.controller:UserInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the classbookApp
 */
angular.module('classbookApp')

  .controller('UserInfoCtrl', ['$scope', 'AuthService', 'SearchService', '$rootScope',
function ($scope, AuthService, SearchService, $rootScope) {

    $scope.currentUser;
    // $scope.currentUser = AuthService.currentUser();
    // SearchService.getUserById($scope.currentUser.uid).then(function(resp){
    //   $scope.user = resp;
    //   console.log(resp);
    // }).catch(function(resp) {
    //   alert("Error in getting user information");
    // });

    $scope.$watch(AuthService.isAuthenticated, function(isAuthenticated) {
      $scope.isAuthenticated = isAuthenticated;
      if ($scope.isAuthenticated) {
        $scope.currentUser = AuthService.currentUser();

        $scope.currentUser.getInfo().then(function(info) {
          console.log("Current info:");
          $scope.user = info;
          console.log($scope.user);
        }).catch(function(e) {
          console.log("ERROR: " + e);
        });
      }
    });

    // Helper funtion that behaves similar to the range() in Python
    $scope.range = function(start, count) {
        return Array.apply(0, Array(count))
                    .map(function (element, index) {
                             return index + start;
                         });
    }

    // List of all majors
    $scope.uclaMajors = [
      "Aerospace Engineering",
      "African American Studies",
      "African and Middle Eastern Studies",
      "American Indian Studies",
      "American Literature and Culture",
      "Anthropology",
      "Arabic",
      "Architectural Studies",
      "Art",
      "Art History",
      "Asian American Studies",
      "Asian Humanities",
      "Asian Religions",
      "Asian Studies",
      "Astrophysics",
      "Atmospheric, Oceanic and Environmental Sciences",
      "Biochemistry",
      "Bioengineering",
      "Biology",
      "Biophysics",
      "Business Economics",
      "Central and East European Languages and Cultures",
      "Chemistry",
      "Chemistry, General",
      "Chemistry/Materials Science",
      "Chicana and Chicano Studies",
      "Chinese",
      "Classical Civilization",
      "Cognitive Science",
      "Communication Studies",
      "Comparative Literature",
      "Computational and Systems Biology",
      "Computer Science",
      "Computer Science and Engineering",
      "Dance",
      "Design Media Arts",
      "Earth and Environmental Science",
      "Ecology, Behavior, and Evolution",
      "Economics",
      "Electrical Engineering",
      "Engineering Geology",
      "English",
      "Environmental Science",
      "Ethnomusicology",
      "European Studies",
      "Film and television",
      "Theater",
      "French",
      "French and Linguistics",
      "Gender Studies",
      "Geography",
      "Geography/Environmental Studies",
      "Geology",
      "Geophysics",
      "German",
      "Global Studies",
      "Greek",
      "Greek and Latin",
      "History",
      "Human Biology and Society",
      "International Development Studies",
      "Individual Field of Concentration",
      "Iranian Studies",
      "Italian",
      "Italian and Special Fields",
      "Japanese",
      "Jewish Studies",
      "Korean",
      "Latin",
      "Latin American Studies",
      "Linguistics",
      "Linguistics and Anthropology",
      "Linguistics and Asian Languages and Cultures",
      "Linguistics and Computer Science",
      "Linguistics and English",
      "Linguistics and French",
      "Linguistics and Italian",
      "Linguistics and Philosophy",
      "Linguistics and Psychology",
      "Linguistics and Scandinavian Languages",
      "Linguistics and Spanish",
      "Linguistics, Applied",
      "Marine Biology",
      "Materials Engineering",
      "Mathematics",
      "Mathematics, Applied",
      "Mathematics/Applied Science",
      "Mathematics/Atmosphericand Oceanic Sciences",
      "Mathematics/Economics",
      "Mathematics, Financial Actuarial",
      "Mathematics for Teaching",
      "Mathematics of Computation",
      "Mechanical Engineering",
      "Microbiology, Immunology, and Molecular Genetics",
      "Molecular, Cell, and Developmental Biology",
      "Music",
      "Music History",
      "Neuroscience",
      "Nursing - Prelicensure",
      "Philosophy",
      "Physics",
      "Physiological Science",
      "Political Science",
      "Portuguese",
      "Psychobiology",
      "Psychology",
      "Religion, Study of",
      "Russian Language and Literature",
      "Russian Studies",
      "Scandinavian Languages and Cultures",
      "Sociology",
      "Spanish",
      "Spanish and Community and Culture",
      "Spanish and Linguistics",
      "Spanish and Portuguese",
      "Statistics",
      "World Arts and Cultures",
    ];

    $scope.tab = 1;
    $scope.friendTab = 1;

    $scope.user = {};
    $scope.friendSearchResults = [];
    $scope.friendRequests = [];

    $scope.edit = function(){
      $scope.tempUser = JSON.parse(JSON.stringify($scope.user));
      console.log("tempUser:");
      console.log($scope.tempUser);
    }

    $scope.saveEdit = function() {
      $scope.user = $scope.tempUser;

      //update the server side by posting to backend
      $scope.currentUser.saveUserInfo($scope.user).then(function(res) {
        console.log("UserInfo");
        console.log($scope.user);

        if(res.status != '200')
          throw new Error('Update failed');

      }).catch(function(e) {
        console.log("ERROR: " + e);
      });

    }

    // {
    //   id: 1,
    //   userName: "Mengyuan",
    //   major: "Computer Science",
    //   year: "2016",
    //   gender: "Female"
    // };

    $scope.getFriends = function() {
      $scope.currentUser.getFriends().then(function(friends) {
        console.log("Friends:");
        console.log(friends);
        $scope.friends = friends;
      }).catch(function(e) {
        console.log("ERROR: " + e);
      });
    }


    $scope.getMessages = function() {
      // $scope.messages = [{
      //   content: "This is a message to say Hi",
      //   sender: "Shuo Sun",
      // }];
      $scope.currentUser.getAllMessages().then(function(msgs) {
        console.log(msgs);
        $scope.messages = msgs;
      }).catch(function(e){
        console.log("ERROR: " + e);
      });
    }
    // $scope.currentUser = AuthService.currentUser();
    // SearchService.getUserById($scope.currentUser.uid).then(function(resp){
    //   $scope.user = resp;
    //   console.log(resp);
    // }).catch(function(resp) {
    //   alert("Error in getting user information");
    // });

    $scope.getFriendRequests = function() {
      $scope.currentUser.getPendingFriends().then(function(friendRequests) {
        console.log("Friend Requests: ");
        console.log(friendRequests);
        $scope.friendRequests = friendRequests;
      }).catch(function(e) {
        console.log("ERROR" + e);
      });
    }

    $scope.acceptFriendRequest = function(user) {
      $scope.currentUser.acceptFriendRequest(user.id).then(function(resp) {
        // delete request
        var index = $scope.friendRequests.indexOf(user);
        if (index != -1) {
          $scope.friendRequests.splice(index, 1);
        } else {
          console.log("ERROR: unable to find user after accepting requests");
        }
      }).catch(function(e) {
        console.log("ERROR" + e);
      })
    }

    $scope.searchUser = function(userInfo) {
      SearchService.searchUser(userInfo).then(function(friendSearchResults) {
        $scope.friendSearchResults = friendSearchResults;
      }).catch(function(e) {
        console.log("ERROR" + e);
      });
    }

    $scope.addFriend = function(user) {
      $scope.currentUser.requestFriend(user.id).then(function(resp) {
        // TODO: remove friend from list?
        var index = $scope.friendSearchResults.indexOf(user);
        if (index != -1) {
          $scope.friendSearchResults.splice(index, 1);
        } else {
          console.log("ERROR: unable to find user after sending friend request");
        }
      }).catch(function(e) {
        console.log("ERROR" + e);
      });
    }

    $scope.getFriendId = function(friend) {
      $rootScope.fid = friend.id;
      $rootScope.femail = friend.uid;
      console.log("Friend's ID:");
      console.log($rootScope.fid, $rootScope.femail);
    }
  }
]);
