/*
 * name        : index.js
 * author      : Daan Mathot (dydrmntion@gmail.com)
 * license     : see LICENSE
 */

/* jshint node: true */
'use strict';


angular.module('cms.markdown', ['hc.marked'])
.service('serv', function() {
  return {
    markdown: ''
  };
})
.directive('markdownInput', [
    '$compile',
    'serv',
    function($compile, serv) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.markdown = serv.markdown;
          element.attr('ng-model', 'markdown');
          element.removeAttr('markdown-input');
          $compile(element)(scope);
          scope.$watch('serv', function() {
            console.log(serv);
          })
        }
      };
    }])
.directive('markdownOutput', [
    '$compile',
    'serv',
    function($compile) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.attr('ng-bind', 'markdown');
          element.removeAttr('markdown-output');
          $compile(element)(scope);
        }
      };
    }] );
