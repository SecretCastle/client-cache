const static_server = 'http://localhost:3000';

const code_area = document.getElementById('code-area');

export const fetch_source = (url, method = 'GET', config) => {
    const headers = new Headers()
    if (config && typeof config === 'object') {
        for (let key in config) {
            headers.append(key, config[key])
        }
    }

    const request = new Request(static_server + url, {
        method: method,
        mode: 'cors', // 开启cors，支持自定义headers。服务端需要做cors处理。
        headers
    })

    fetch(request).then(res => {
        return res.text()
    }).then(data => {
        code_area.innerText = data.trim()
    })
}

fetch_source('/public/public.css', 'get', {
    "Cache-Control": "max-age=0",
    "x-aaa-bbb": "1"
})