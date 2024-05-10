const static_url = 'http://localhost:3000'

const fetch_helper = (url, method = 'GET', header) => {
    return new Promise((resolve, reject) => {
        const headers = new Headers()
        if (header && typeof header === 'object') {
            for (let key in header) {
                headers.append(key, header[key])
            }
        }
        const request = new Request(static_url + url, {
            method,
            mode: 'cors',
            headers
        });

        fetch(request).then(res => {
            return res.text()
        }).then(data => {
            resolve(data)
        })
    })
}

export {
    fetch_helper
}