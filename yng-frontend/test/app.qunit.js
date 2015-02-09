define([
        'jsx!src/js/app', 
        'react',
        'sinon',
        'http',
        'jquery'], function (App, React, sinon, http, $) {

            var renderIntoDocument = React.addons.TestUtils.renderIntoDocument;
            var simulateChange = React.addons.TestUtils.Simulate.change;
            var simulateClick = React.addons.TestUtils.Simulate.click;
            var keyDown = React.addons.TestUtils.Simulate.keyDown;
            
            var ajaxSpy;

            module('AppTest', {
                setup: function () {
                    ajaxSpy = sinon.spy($, 'ajax');
                },
                teardown: function () {
                    ajaxSpy.restore();
                }
            });

            test('when the user enters a github handle, and presses ENTER, it makes a call to the right resource', function () {
                var app = new App();
                var SearchBar = app.searchBar;
                var component = React.createElement(SearchBar); 
                var renderedComponent = renderIntoDocument(component);

                var searchBar = renderedComponent.refs.searchBar.getDOMNode();

                simulateChange(searchBar, { target : { value : 'sampleHandle' } });

                equal(renderedComponent.refs.searchBar.getDOMNode().value, 'sampleHandle');

                keyDown(searchBar, { key: 'Enter'});

                equal(ajaxSpy.callCount, 1, 'should have made an ajax call');
                equal(ajaxSpy.firstCall.args[0].url, '/user/github/sampleHandle', 'should have made an ajax call to the right resource');
                equal(ajaxSpy.firstCall.args[0].type, 'GET', 'should have made a GET request');
            });
});
