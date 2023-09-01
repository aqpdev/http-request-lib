const http_request = {
    result: null,
    __domain: '/',
    __uri: '',
    domain(domain){
        if(domain.substring(-1) !== '/'){
            domain += '/';
        }
        this.__domain = domain;
    },
    uri(uri){
        if(uri.substring(0, 1) === '/'){
            uri = uri.substring(1,uri.length);
        }
        this.__uri = uri;
        return this;
    },
    post(url){
        this.result =null;
        if(typeof url === "undefined" || url === ''){
            url = this.__domain+this.__uri;
        }
        return new httpRequest(url, 'POST');
    },
    get(url){
        this.result =null;
        if(typeof url === "undefined" || url === ''){
            url = this.__domain+this.__uri;
        }
        return new httpRequest(url, 'GET');
    },
    put(url){
        this.result =null;
        if(typeof url === "undefined" || url === ''){
            url = this.__domain+this.__uri;
        }
        return new httpRequest(url, 'PUT');
    },
    delete(url){
        this.result =null;
        if(url === ''){
            url = this.__domain+this.__uri;
        }
        return new httpRequest(url, 'DELETE');
    },
}

class httpRequest{
    #url;
    #method;
    #data = null;
    #debug = false;
    #return_JSON = true;
    constructor(url, method) {
        this.#url = url;
        this.#method = method;
    }
    debug(){
        this.#debug = true;
        return this;
    }
    data(data)
    {
        if(this.#method !== 'GET'){
            let value = typeof data !== "string" ? JSON.stringify(data) : data;
            try{
                const isJSON = JSON.parse(value);
                this.#data = value;
            }catch (e){
                this.#data = data;
            }
        }
        return this;
    }
    notJSON()
    {
        this.#return_JSON = false;
        return this;
    }
    async fetch(){
        try{
            const resp = await fetch(this.#url, {
                method: this.#method,
                cache: 'no-cache',
                credentials: 'same-origin',
                body: this.#data
            });
            if(this.#debug === true){
                console.info("Connecting to URL...");
            }
            const contentType = resp.headers.get("content-type");
            if(this.#return_JSON === true){
                if(this.#debug === true){
                    console.info("Checking if JSON format is returned...");
                }
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    if(this.#debug === true){
                        console.info("SUCCESS");
                    }
                    const result = await resp.json();
                    http_request.result = result;
                    return {'status': 'success','result': result};
                }else{
                    if(this.#debug === true){
                        console.error("Result is NOT JSON format.");
                    }
                    return {'status': 'fail','result': 'network_error'};
                }
            }else{
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    if(this.#debug === true){
                        console.error("Result IS JSON format.");
                    }
                    return {'status': 'fail','result': 'network_error'};
                }else{
                    if(this.#debug === true){
                        console.info("SUCCESS");
                    }
                    const result = await resp.text();
                    http_request.result = result;
                    return {'status': 'success','result': result};
                }
            }
        }catch (error){
            if(this.#debug === true){
                console.error(error);
            }
            return {'status': 'fail','result': 'network_error'};
        }
    }
}


export {http_request};