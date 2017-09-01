'use strict';

angular
  .module('core')
  .service('BuddyList', [
    function () {
        var self = this;
        var buddies = [];

        function updateAvatars(buddy, avatar) {
            if (avatar) {
                buddy.smallAvatar = "/images/avatars/32/" + avatar;
                buddy.mediumAvatar = "/images/avatars/48/" + avatar;
                buddy.largeAvatar = "/images/avatars/100/" + avatar;
            } else {
                buddy.smallAvatar = "/images/32/no-avatar.png";
                buddy.mediumAvatar = "/images/48/no-avatar.png";
                buddy.largeAvatar = "/images/100/no-avatar.png";
            }
        }

        function createOrUpdate(buddyId, data) {
            var buddy = buddies.find(function (current, index, array) {
                return current.id == buddyId;
            });

            if (!buddy) {
                buddy = {
                    id: buddyId,
                    firstName: "",
                    lastName: ""
                };
                updateAvatars(buddy, null);
                buddies.push(buddy);
            }

            if (data) {
                buddy.firstName = data.firstname;
                buddy.lastName = data.lastname;
                updateAvatars(buddy, data.avatar);
            }

            return buddy;
        }

        self.getBuddy = function (buddyId) {
            return createOrUpdate(buddyId, null);
        };

        self.addBuddy = function (buddy) {
            return createOrUpdate(buddy.id, buddy);
        }
    }
]);
