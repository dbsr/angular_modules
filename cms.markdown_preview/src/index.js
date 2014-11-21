/*
 * name        : cmi.markdown_preview
 * author      : Daan Mathot (dydrmntion@gmail.com)
 * license     : see LICENSE
 */

/* jshint node: true */
'use strict';


angular.module('cms.markdown_preview', [
    'ngSanitize',
    'hc.marked'
])
  // this service acts as a shared scoped between the two sibling directives
  .service('markdownService', [
    'marked',
    function(marked) {
      return {
        markdown: '',
        html: '',
        set: function() {
          this.html = marked(this.markdown);
        }
    };
  }])

  // this is the input directive, attach this to a textarea element
  .directive('markdownInput', [
    '$compile',
    'markdownService',
    function($compile, markdownService) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.markdownService = markdownService;
          element.attr('ng-model', 'markdownService.markdown');
          element.removeAttr('markdown-input');
          $compile(element)(scope);

          scope.$watch('markdownService', function() {
            // convert to html
            markdownService.set();
          }, true);

        }
      };
    }])

  // this is the preview directive
  .directive('markdownOutput', [
    '$compile',
    'markdownService',
    function($compile, markdownService) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          scope.markdownService = markdownService;
          element.attr('ng-bind-html', 'markdownService.html');
          element.removeAttr('markdown-output');
          $compile(element)(scope);
        }
      };
    }] );
