(function ($, window) {
    window.search_controller = function (state) {
        var pageSize = 10;
        var request = {
            criteria: [],
            properties: [],
            highlighting: {
                template: ['<span class="ui-state-highlight">', '</span>']
            },
            facets: {
                genre: {
                    sortBy: 'countDesc',
                    topN: 15
                }
            },
            startIndex: state.page ? (pageSize * (state.page - 1)) : 0,
            pageSize: pageSize
        };
        if (state.q) {
            request.criteria.push({
                dimension: 'freetext',
                value: state.q,
                cull: true
            });
        }
        if (state.genre) {
            request.criteria.push({
                dimension: 'genre',
                id: state.genre
            });
        }
        if (state.runtime) {
            request.criteria.push({
                dimension: 'runtime_runtime',
                value: state.runtime
            });
        }
        if (state.initial_release_year_min || state.initial_release_year_max) {
            var initial_release_year_min = state.initial_release_year_min || '';
            var initial_release_year_max = state.initial_release_year_max || '';
            if (initial_release_year_min !== '' && initial_release_year_max !== '') {
                if (Number(initial_release_year_min) > Number(initial_release_year_max)) {
                    initial_release_year_min = state.initial_release_year_max;
                    initial_release_year_max = state.initial_release_year_min;
                }
            }
            request.criteria.push({
                dimension: 'initial_release_year',
                value: '[' + initial_release_year_min + ',' + initial_release_year_max + ']'
            });
        }
        if (request.criteria.length ===  0) {
            // If no search criteria were provided, we can
            // configure a default search here.
            request.criteria.push({dimension: '_kind'});
        }
        return request;
    };
})($, window);
