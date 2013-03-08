(function ($, window) {
    window.searchController = function (state) {
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
                    topN: 30,
                    depth: 0
                },
                rating: {
                    topN: 15,
                    depth: 0
                }
            },
            startIndex: state.page ? (pageSize * (state.page - 1)) : 0,
            pageSize: pageSize
        };
        request.criteria.push({dimension: 'genre', weight: 0, cull: true});
        if (state.q) {
            request.criteria.push({
                dimension: 'freetext',
                value: state.q,
                cull: true,
                fieldBoosts: {
                    name: 10
                },
                exactRequires: 'all'
            });
        }
        if (state.genre) {
            request.criteria.push({
                dimension: 'genre',
                id: state.genre
            });
        }
        if (state.rating) {
            request.criteria.push({
                dimension: 'rating',
                id: state.rating
            });
        }
        if (state.runtime_min || state.runtime_max) {
            var min = Number(state.runtime_min);
            var max = Number(state.runtime_max);
            min = isNaN(min) ? "" : min;
            max = isNaN(max) ? "" : max;
            request.criteria.push({
                dimension: 'runtime_runtime',
                value: '[' + min + ',' + max + ']'
            });
        }
        var currentYear = String(new Date().getFullYear());
        if (state.initial_release_year_min || state.initial_release_year_max) {
            var initial_release_year_min = state.initial_release_year_min || '';
            var initial_release_year_max = state.initial_release_year_max || '';
            request.criteria.push({
                dimension: 'initial_release_year',
                value: '[' + initial_release_year_min + ',' + initial_release_year_max + ']',
                max: currentYear
            });
        } else {
            request.criteria.push({
                dimension: 'initial_release_year',
                value: currentYear,
                max: currentYear,
                exactMatch: true,
                weight: 0.000001
            });
        }
        return request;
    };
})($, window);
