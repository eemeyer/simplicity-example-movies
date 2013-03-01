(function ($, window) {
    window.search_results = function (target, data) {
        var results = $('<div><div class="summary">There are <span class="exact"/> exact matches out of <span class="total"/> results</div></div>');
        var discoveryResponse = data._discovery.response;
        results.find(".exact").text(discoveryResponse.exactSize);
        results.find(".total").text(discoveryResponse.totalSize);
        var imageUrlTemplate = 'https://usercontent.googleapis.com/freebase/v1/image{id}?maxheight=150&maxwidth=150&pad=true';
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
            row.append($('<img/>').attr('src', imageUrlTemplate.replace('{id}', item._locator)));
            if (item.name) {
                row.append($('<div class="movie-name"/>').text(item.name));
                row.find('img').attr('title', item.name).attr('alt', item.name);
            }
            if (item.directed_by && item.directed_by.length > 0) {
                row.append($('<div/>').text('A film by ' + arrayToSentenceFragment(item.directed_by)));
            }
            if (item.written_by && item.written_by.length > 0) {
                row.append($('<div/>').text('Written by ' + arrayToSentenceFragment(item.written_by)));
            }
            results.append(row);
        });
        target.html(results.contents());
    };
    function arrayToSentenceFragment(values) {
        var result = '';
        $.each(values, function (idx, val) {
            if (idx !== 0) {
                if (values.length > 2) {
                    result += ', ';
                } else {
                    result += ' ';
                }
                if (idx === values.length - 1) {
                    result += 'and ';
                }
            }
            result += val;
        });
        return result;
    }
})($, window);
