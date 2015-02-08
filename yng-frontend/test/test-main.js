'use strict';

(function () {
    require.config({
        baseUrl: '../',
        paths: {
            react: 'lib/react',
            underscore: 'lib/underscore',
            jquery: 'lib/jquery',
            text: 'lib/text',
            sinon: 'lib/sinon'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'text': {
                exports: 'text'
            },
            'sinon': {
                exports: 'sinon'
            }
        }
    });
    var testModules = [
        'app.qunit.js' 
    ];
    require(testModules, QUnit.start);
}());
