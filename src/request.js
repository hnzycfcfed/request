import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import './utils/promise-finally';

const requests = {};
const requestSuccessfullCodes = [200, 201, 202, 203, 204, 205, 206];

function removeRequest(name) {
    requests[name] && delete requests[name];
}

function StatusError(message) {
    this.name = 'StatusError';
    this.message = message;
}

function getRequestInit(options) {
    const method = options.method;

    let requestInit = {
        ...options,
        mode: options.mode || 'cors',
        credentials: options.credentials || 'same-origin'
    };

    if (method && method !== 'GET' && method !== 'HEAD') {
        requestInit = {
            ...requestInit,
            headers: {
                ...options.headers,
            },
            body: options.body || JSON.stringify(options.data || {})
        }

        // 使用body时会有默认的Content-Type，使用data时才设置默认值
        if (!options.body) {
            requestInit.headers['Content-Type'] = 'application/json';
        }
    }

    return requestInit;
}

function request(url, options) {
    options = options || {};
    const name = options.name;

    const requestInit = getRequestInit(options);

    const controller = new AbortController();
    requestInit.signal = controller.signal;

    if (name) requests[name] = controller;

    const timerId = setTimeout(
        name => {
            controller.abort();
            removeRequest(name);
        },
        options.timeout || 30000,   // 默认超时时间 30 秒
        name
    );

    return window.fetch(url, requestInit)
        .then(response => {
            if (requestSuccessfullCodes.indexOf(response.status) > -1) {

                return response;
            }

            throw new StatusError(response.status);
        })
        .finally((() => {
            removeRequest(name);
            clearTimeout(timerId);
        }));
}

function abort(name, callback) {
    const controller = requests[name];
    if (!controller) return;

    const signal = controller.signal;
    signal.onabort = () => {
        callback && callback(signal.aborted);
        signal.onabort = null;
    }

    controller.abort();
    removeRequest(name);
}

function get(url, options) {
    return request(url, options);
}

function post(url, options) {
    options = options || {};
    options.method = 'POST';
    return request(url, options);
}

function put(url, options) {
    options = options || {};
    options.method = 'PUT';
    return request(url, options);
}

function del(url, options) {
    options = options || {};
    options.method = 'DELETE';
    return request(url, options);
}

export default request;

export { get, post, put, del, abort };
