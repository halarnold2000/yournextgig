/*global define, module, test, equal */
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
            var find = React.addons.TestUtils.scryRenderedDOMComponentsWithClass;
            
            var ajaxStub;
            var ajaxDeferred;

            module('AppTest', {
                setup: function () {
                    ajaxStub = sinon.stub($, 'ajax');
                    ajaxDeferred = $.Deferred();
                    ajaxStub.returns(ajaxDeferred);
                },
                teardown: function () {
                    ajaxStub.restore();
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

                equal(ajaxStub.callCount, 1, 'should have made an ajax call');
                equal(ajaxStub.firstCall.args[0].url, '/user/github/sampleHandle', 'should have made an ajax call to the right resource');
                equal(ajaxStub.firstCall.args[0].type, 'GET', 'should have made a GET request');
            });

            test('search bar component forwards search results to the searchResults callback', function () {
                var app = new App();
                var SearchBar = app.searchBar;
                var searchResults = [];
                var searchResultsCallback = function (results) {
                    searchResults.push(results);
                };
                var component = React.createElement(SearchBar, {searchResultsCallback: searchResultsCallback}); 
                var renderedComponent = renderIntoDocument(component);

                var searchBar = renderedComponent.refs.searchBar.getDOMNode();

                simulateChange(searchBar, { target : { value : 'sampleHandle' } });
                keyDown(searchBar, { key: 'Enter'});
                ajaxDeferred.resolve({ sampleField: "sampleData" }, '200');

                equal(searchResults.length, 1);
                deepEqual(searchResults[0], { sampleField: "sampleData" });
            });

            test('project list renders when it gets data', function () {
                var app = new App();
                var ProjectList = app.projectList;
		var data = ["project a", "project b"];
                var component = React.createElement(ProjectList, {data: data});
                var renderedComponent = renderIntoDocument(component);

                var projectList = renderedComponent.refs.projectList.getDOMNode();

		var projects = find(renderedComponent, 'project');
		equal(projects.length, 2, 'should have rendered two projects');
            });
});
