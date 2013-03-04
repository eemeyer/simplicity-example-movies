$(function() {
    $('body').simplicityState();
    $('#q,#genre,#rating').simplicityInputs();
    $('#initial_release_year select').simplicityInputs().attr('disabled', 'disabled');
    $('#initial_release_year select:first').each(function() {
        var yr = 1888;
        var currentYear = new Date().getFullYear();
        for (; yr <= currentYear; ++yr) {
            $(this).append($('<option/>').text(yr));
        }
    });
    $('#initial_release_year_slider').simplicitySelectSlider({
        select:  '#initial_release_year select[name="initial_release_year_min"]',
        secondSelect: '#initial_release_year select[name="initial_release_year_max"]',
        showLabels: false,
        showTooltip: false,
        populateSecondSelect: true
    });
    $('input[name="runtime_min"],input[name="runtime_max"]').simplicityInputs().attr('disabled', 'disabled');
    $('#runtime_slider').simplicitySlider({
      input: ['input[name="runtime_min"]', 'input[name="runtime_max"]'],
      min: 0,
      max: 361,
      values: [0,360],
      any: [0, 361]
    });
    $('#genre,#rating').simplicityFacetedSelect().hide();
    $('#genre_fancy').simplicityFancySelect({
        select: '#genre'
    });
    $('#rating_fancy').simplicityFancySelect({
        select: '#rating'
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
