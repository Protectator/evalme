const regexp = /\{\{(.*)\}\}/;

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
    const urlTemplate = decodeURIComponent(s);
    const computedURL = urlTemplate.replace(regexp, (e) => {return eval(e)});
    console.log(computedURL);
    window.location = encodeURI(computedURL);
}
run();