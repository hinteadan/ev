(function (angular) {
    'use strict';

    var options = { 
            sex: {
                male: 'sex-male-short',
                female: 'sex-female-short'
            },
            problemTimespan: {
                today: 'problem-timespan-today',
                yesterday: 'problem-timespan-24-hours',
                fewDays: 'problem-timespan-few-days',
                fewWeeks: 'problem-timespan-1-3-weeks',
                month: 'problem-timespan-a-month'
            },
            redEyeLevel: {
                none: 0,
                few: 1,
                stain: 2,
                full: 3
            },
            tearLevel: {
                none: 0,
                allTheTime: 1,
                whenLit: 2,
                occasionally: 3
            },
            secretionLevel: {
                none: 0,
                full: 1,
                allDay: 2,
                occasionally: 3
            },
            hurtLevel: {
                none: 0,
                point: 1,
                full: 2
            },
            pinSensation: {
                none: 0,
                asTension: 1,
                foreignBody: 2,
                burn: 3
            },
            continuousSensation: {
                none: 0,
                blink: 1,
                occasionally: 2,
                movement: 3
            },
            sightChange: {
                none: 0,
                low: 1,
                dim: 2,
                double: 3,
                unclear: 4
            }
        };

    function Questionnaire() {
        this.age = 30;
        this.sex = options.sex.female;
        this.timespan = options.problemTimespan.today;
        this.wasHit = false;
        this.wasPierced = false;
        this.injuryCausedBy = null;
        this.redEye = options.redEyeLevel.none;
        this.tears = options.tearLevel.none;
        this.secretion = options.secretionLevel.none;
        this.hurt = options.hurtLevel.none;
        this.pinSensation = options.pinSensation.none;
        this.continuousSensation = options.continuousSensation.none;
        this.sightChange = options.sightChange.none;
        this.eyeLidsInflamed = false;
        this.isLightBothering = false;
        this.otherDetails = null;

        this.opts = options;
    }
    Questionnaire.opts = options;

    angular.module('eye-view-patient').value('Questionnaire', Questionnaire);

}).call(this, this.angular);