const static_server = 'http://localhost:3000';

export const fetch_source = (url) => {
    const headers = new Headers()
    headers.append('Cache-Control', 'public, max-age=60');
    headers.append('Content-Type', 'text/css');

    const request = new Request(static_server + url, {
        method: 'get', mode: 'no-cors', headers
    })

    fetch(request).then(res => {
        return res.text()
    }).then(data => {
        console.log(data)
    })
}

fetch_source('/public/public.css')


function fetch_source_by_axios() {
    if (window.axios) {
        axios.get(static_server + '/public/public.css', {
            mode: 'no-cors',
            headers: {
                'Cache-Control': 'max-age=60',
                'Content-Type': 'text/css'
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
    }
}

fetch_source_by_axios();