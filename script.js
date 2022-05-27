const regexp = /\{\{(.*)\}\}/;

function renderError(errorHeader, errorText) {
    const errorNode = document.createElement('p');
    errorNode.textContent = errorHeader;
    errorNode.className = 'errorHeader'
    const errorTextNode = document.createElement('pre');
    errorTextNode.textContent = errorText;
    errorTextNode.className = 'errorText';
    window.document.body.innerHTML = '';
    window.document.body.appendChild(errorNode);
    window.document.body.appendChild(errorTextNode);

    const helpNode = document.createElement('p');
    helpNode.innerHTML = "Stuck? Take a look at the <a href='/'>help</a> page !";
    window.document.body.appendChild(helpNode);
}

function run() {
    const url = window.location;
    const search = url.search;
    if (search === "") {
        window.location = 'help.html';
        return;
    }
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    if (!s) {
        window.location = 'help.html';
        return;
    }
    let urlTemplate;
    let computedURL;
    try {
        urlTemplate = decodeURIComponent(s);
        console.log('Decoded URL : ', urlTemplate);
    } catch (e) {
        renderError("Error while decoding URL : ", e);
        throw e;
    }
    try {
        computedURL = urlTemplate.replace(regexp, (e) => {return eval(e)});
        console.log('Computed URL : ', computedURL);
        window.location = encodeURI(computedURL);
    } catch (e) {
        renderError("Error while evaluating URL : ", e);
        throw e;
    }
}
run();