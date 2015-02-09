'use strict';

(function () {
    require.config({
        baseUrl: '../',
        paths: {
            'jquery': 'lib/jquery',
            'underscore': 'lib/underscore',
            'underscore.string': 'lib/underscore.string',
            'JSXTransformer': 'lib/JSXTransformer',
            'jsx': 'lib/jsx',
            'text': 'lib/text',
            'react': 'lib/react',
            'http': 'lib/json-over-http',
            'sinon': 'lib/sinon'
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
        },
        jsx: {
            fileExtension: '.jsx',
            sourceMap: true
        }
    });
    var testModules = [
        'app.qunit.js' 
    ];
    require(testModules, QUnit.start);
}());
