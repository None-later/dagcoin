(() => {
  'use strict';

  /**
   * @desc custome icon directive
   * @example <svg-icon name="name"></svg-icon>
   */
  angular
    .module('dagcoin.directives')
    .directive('svgIcon', svgIcon);

  svgIcon.$inject = ['$sce', '$templateRequest', '$templateCache', 'isCordova'];

  function svgIcon($sce, $templateRequest, $templateCache, isCordova) {
    return {
      restrict: 'E',
      scope: {
        name: '@',
        title: '@'
      },
      link: ($scope, element, attr) => {
        /* istanbul ignore next */
        if (!$scope.name && !$scope.title) {
          return false;
        }

        let svgFile = `${$scope.name || $scope.title}.svg`;

        function loadTemplate() {
          const svgPath = isCordova ? `css/svg/${svgFile}` : `/public/css/svg/${svgFile}`;
          const templateUrl = $sce.getTrustedResourceUrl(svgPath);

          $templateRequest(templateUrl).then((template) => {
            $templateCache.put(svgFile, template);
            renderSVG();
          });
        }

        function renderSVG() {
          if ($templateCache.get(svgFile)) {
            element.html($templateCache.get(svgFile)).addClass(`svg-icon-${$scope.name || $scope.title}`);
          } else {
            loadTemplate();
          }
        }

        $scope.$watch(() => attr.name, (newValue) => {
          if (newValue) {
            svgFile = `${newValue}.svg`;
            renderSVG();
          }
        });

        return renderSVG();
      }
    };
  }
})();
