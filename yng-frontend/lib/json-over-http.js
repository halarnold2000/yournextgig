define(['jquery'], function ($) {
    'use strict';
    return function (options) {
        var uri, method, body, client, deferred, handler;
        uri = options.uri;
        method = options.method;
        body = JSON.stringify(options.body);
        deferred = $.Deferred();
        return $.ajax({
            url: uri, 
            type: method, 
            data: body
        });
    };
});
