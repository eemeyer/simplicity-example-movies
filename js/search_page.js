$(function() {
    $('input[name="runtime_min"],input[name="runtime_max"]').bind('change', function (evt) {
        var message = '';
        var min = $('input[name="runtime_min"]').val();
        var max = $('input[name="runtime_max"]').val();
        if (min === '' && max === '') {
            message = 'any length';
        } else if (min === '') {
            message = 'up to ' + minutesToText(max);
        } else if (max === '') {
            message = 'at least ' + minutesToText(min);
        } else {
            message = 'from ' + minutesToText(min) + ' to ' + minutesToText(max);
        }
        $('#runtime_criteria_desc').text(message);
    }).change();
    $('input[name="initial_release_year_min"],input[name="initial_release_year_max"]').bind('change', function (evt) {
        var message = '';
        var min = $('input[name="initial_release_year_min"]').val();
        var max = $('input[name="initial_release_year_max"]').val();
        if (min === '' && max === '') {
            message = 'in any year';
        } else if (min === '') {
            message = 'through ' + max;
        } else if (max === '') {
            message = 'after ' + min;
        } else {
            message = '' + min + ' - ' + max;
        }
        $('#initial_release_year_criteria_desc').text(message);
    }).change();

    $('body').simplicityState();
    $('' +
        '#q,#genre,#rating,' +
        'input[name="initial_release_year_min"],input[name="initial_release_year_max"],' +
        'input[name="runtime_min"],input[name="runtime_max"]'
    ).simplicityInputs();
    var currentYear = new Date().getFullYear();
    $('#initial_release_year_slider').simplicitySlider({
        input: ['input[name="initial_release_year_min"]', 'input[name="initial_release_year_max"]'],
        min: 1887,
        max: currentYear + 1,
        values: [1888, currentYear],
        any:[1887, currentYear + 1],
        range: true
    });
    $('#runtime_slider').simplicitySlider({
      input: ['input[name="runtime_min"]', 'input[name="runtime_max"]'],
      min: 0,
      max: 361,
      values: [0,360],
      any: [0, 361],
      range: true
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

function minutesToText(mins) {
    var hours = Math.floor(mins / 60);
    var minutes = mins % 60;
    return hours + ':' + (minutes < 10 ? '0' : '') + minutes;
}
