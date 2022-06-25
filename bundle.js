const getRateButton = document.getElementById('get-rate');
    const toForm = document.getElementById('to-form');
    const typeForm = document.getElementById('from-form');
    const rate_t = document.getElementById('det-rate');


    function fetchSomeRate(currency) {
    const params = new URLSearchParams();
    if (currency) {
    params.append('rates', currency);
}
    return fetch('https://v6.exchangerate-api.com/v6/05ca2359115553bb3551cfda/latest/'+currency.toString())
    .then(r => r.json());
}

    function handle(rateObj, tovalue) {
    const value = rateObj["conversion_rates"][tovalue];
    const { base_code } = rateObj;
    rate_t.textContent = "1 "+ base_code+" = " + value + " " + tovalue;
    rate_t.classList.remove('active');
}

    getRateButton.addEventListener('click', async function (e) {
    rate_t.textContent = 'Loading...';
    const currency_base = typeForm.elements.type.value;
    const currency_to_convert = toForm.elements.type.value;
    const rate_from = await fetchSomeRate(currency_base);
    const rate_to = await fetchSomeRate(currency_to_convert);
    const {base_code} = rate_to;
    handle(rate_from, base_code);
});
