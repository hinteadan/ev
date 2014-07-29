(function (angular) {
    'use strict';

    var sex = {
            male: 'M',
            female: 'F'
        },
        problemTimespan = {
            today: 0,
            yesterday: 1,
            fewDays: 2,
            fewWeeks: 3,
            month: 4
        },
        redEyeLevel = {
            none: 0,
            few: 1,
            stain: 2,
            full: 3
        },
        tearLevel = {
            none: 0,
            allTheTime: 1,
            whenLit: 2,
            occasionally: 3
        },
        secretionLevel = {
            none: 0,
            full: 1,
            allDay: 2,
            occasionally: 3
        },
        hurtLevel = {
            none: 0,
            point: 1,
            full: 2
        },
        pinSensation = {
            none: 0,
            asTension: 1,
            foreignBody: 2,
            burn: 3
        },
        continuousSensation = {
            none: 0,
            blink: 1,
            occasionally: 2,
            movement: 3
        },
        sightChange = {
            none: 0,
            low: 1,
            dim: 2,
            double: 3,
            unclear: 4
        };

    function Questionnaire() {

        this.age = 30;
        this.sex = sex.female;
        this.timespan = problemTimespan.today;
        this.wasHit = false;
        this.wasPierced = false;
        this.injuryCausedBy = null;
        this.redEye = redEyeLevel.none;
        this.tears = tearLevel.none;
        this.secretion = secretionLevel.none;
        this.hurt = hurtLevel.none;
        this.pinSensation = pinSensation.none;
        this.continuousSensation = continuousSensation.none;
        this.sightChange = sightChange.none;
        this.eyeLidsInflamed = false;
        this.isLightBothering = false;
        this.otherDetails = null;

    }

}).call(this, this.angular);