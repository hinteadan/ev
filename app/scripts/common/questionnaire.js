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
        this.sex = 'female';
        this.timespan = 'today';
        this.wasHit = false;
        this.wasPierced = false;
        this.injuryCausedBy = null;
        this.redEye = 'none';
        this.tears = 'none';
        this.secretion = 'none';
        this.hurt = 'none';
        this.pinSensation = 'none';
        this.continuousSensation = 'none';
        this.sightChange = 'none';
        this.areEyeLidsInflamed = false;
        this.isLightBothering = false;
        this.otherDetails = null;
    }
    Questionnaire.opts = options;
    Questionnaire.fromDto = function (dto) {
        var result = new Questionnaire();
        for (var property in dto) {
            result[property] = dto[property];
        }
        return result;
    };

    angular.module('eye-view-common').value('Questionnaire', Questionnaire);

}).call(this, this.angular);