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
                none: 'no',
                few: 'few-blood-vessels',
                stain: 'blood-stain',
                full: 'full-red-eye'
            },
            tearLevel: {
                none: 'no',
                allTheTime: 'all-the-time',
                whenLit: 'when-lit',
                occasionally: 'from-time-to-time'
            },
            secretionLevel: {
                none: 'no',
                full: 'yes',
                allDay: 'all-day',
                occasionally: 'from-time-to-time-during-day'
            },
            hurtLevel: {
                none: 'no',
                point: 'at-a-point',
                full: 'whole-eye-in-pain'
            },
            pinSensation: {
                none: 'no',
                asTension: 'as-tension',
                foreignBody: 'foreign-body',
                burn: 'burning'
            },
            continuousSensation: {
                none: 'no-eye-pain',
                blink: 'on-blink',
                occasionally: 'appear-and-disappear',
                movement: 'on-eye-movement'
            },
            sightChange: {
                none: 'no',
                low: 'sight-low',
                dim: 'sight-dim',
                double: 'sight-double',
                unclear: 'unclear-clear-on-blink'
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
        this.areEyeLidsInflamed = false;
        this.isLightBothering = false;
        this.otherDetails = null;

        this.opts = options;
    }
    Questionnaire.opts = options;

    angular.module('eye-view-patient').value('Questionnaire', Questionnaire);

}).call(this, this.angular);