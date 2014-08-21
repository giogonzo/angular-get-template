'use strict';

angular.module('getTemplate', [])
  .service('$getTemplate', function($q, $http, $templateCache) {
    // inspired to https://github.com/angular-ui/ng-grid/blob/master/src%2Fjs%2Fcore%2Fservices%2Fui-grid-util.js#L281
    return function(templateOrUrl) {
      // html template
      try {
        if ($(templateOrUrl).length > 0) {
          return $q.when(templateOrUrl);
        }
      } catch (e) {}

      // cached url template
      if ($templateCache.get(templateOrUrl)) {
        return $q.when($templateCache.get(templateOrUrl));
      }

      // default: non-cached url template
      return $http({
        method: 'GET',
        url: templateOrUrl
      }).then(function (result) {
        var templateHtml = result.data.trim();
        $templateCache.put(templateOrUrl, templateHtml);
        return templateHtml;
      }, function (err) {
        throw new Error('Could not get template ' + templateOrUrl);
      });
    };
  });