(function ($, window) {
    window.search_results = function (target, data) {
        var results = $('<div><div class="summary">There are <span class="exact"/> exact matches out of <span class="total"/> results</div></div>');
        var discoveryResponse = data._discovery.response;
        results.find(".exact").text(discoveryResponse.exactSize);
        results.find(".total").text(discoveryResponse.totalSize);
        $.each(discoveryResponse.itemIds, function (itemIndex, itemId) {
            var item = {
                '_id': itemId,
                '_exact': discoveryResponse.exactMatches[itemIndex],
                '_score': discoveryResponse.relevanceValues[itemIndex]
            };
            if (discoveryResponse.properties) {
                $.extend(item, discoveryResponse.properties[itemIndex]);
            }
            var row = $('' +
                '<div class="freebase-movie ui-widget-content ui-corner-all">' +
                '</div>')
                .attr('id', 'result-' + itemId)
                .addClass(item._exact ? 'ui-state-active' : 'ui-priority-secondary');
            if (item.name) {
                row.append($('<div class="movie-name"/>').text(item.name));
            }
            results.append(row);
        });
        target.html(results.contents());
    };
})($, window);
