$(function() {
    $('body').simplicityState();
    $('#q,#genre,#runtime').simplicityInputs();
    $('#initial_release_year_min,#initial_release_year_max').simplicityInputs().each(function() {
        var yr = 1888;
        var currentYear = new Date().getFullYear();
        for (; yr <= currentYear; ++yr) {
            $(this).append($('<option/>').text(yr));
        }
    });
    $('#genre').simplicityFacetedSelect().hide();
    $('#genre_fancy').simplicityFancySelect({
        select: '#genre'
    });
    $('#results').simplicitySearchResults({
        resultsCallback: window.search_results
    });
    $('#pagination_top,#pagination_bottom').simplicityPagination();
    $('button[name="resetSearch"]').click(function () {
        $('body').simplicityState('reset');
    });
    $('body')
        .simplicityState('mergeQueryParams')
        .simplicityHistory()
        .simplicityState('triggerChangeEvent')
        .simplicityPageSnapBack()
        .simplicityDiscoverySearch({
            url: 'http://freebase-movies.discoverysearchengine.com:8090/ws/query',
            controllerCallback: window.search_controller,
            backend: 'engine'
        })
        .simplicityDiscoverySearch('search');
});
