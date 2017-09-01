'use strict';

angular
  .module('core')
  .service('BuddyList', [
    function () {
        var self = this;
        var buddies = [];

        function updateAvatar(buddy, data) {
            if (data.avatar) {
                buddy.smallAvatar = "/images/avatars/32/" + data.avatar;
                buddy.mediumAvatar = "/images/avatars/48/" + data.avatar;
                buddy.largeAvatar = "/images/avatars/100/" + data.avatar;
            } else {
                buddy.smallAvatar = "/images/32/no-avatar.png";
                buddy.mediumAvatar = "/images/48/no-avatar.png";
                buddy.largeAvatar = "/images/100/no-avatar.png";
            }
        }

        self.getBuddy = function (buddyId) {
            var buddy = buddies.find(function (current, index, array) {
                return current.id == buddyId;
            });

            if (!buddy) {
                buddy = {id: buddyId};
                updateAvatar(buddy, buddy);
            }

            return buddy;
        };

        self.addBuddy = function (buddy) {
            var existingBuddy = buddies.find(function (current, index, array) {
                return current.id == buddy.id;
            });

            if (!existingBuddy) {
                buddies.push(buddy);
                existingBuddy = buddy;
            }

            updateAvatar(existingBuddy, buddy);
        }
    }
]);
