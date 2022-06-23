# 基于 fetch 的 request 方法

## 安装

---

### 通过npm安装

```bash
npm i --save @hnzycfcfed/request
```

### 使用

---

```javascript
import request, { get, post, put, del } from '@hnzycfcfed/request';

request(url, options);
get(url, options);
post(url, options);
put(url, options);
del(url, options);
```

#### 参数

#### url    必填项

String 类型，请求 API 接口地址, e.g. <https://api.l-blog.me/q-signals>

#### options    非必填项

```javascript
{
    name,       // 请求名称，可用于 abort 操作，建议使用 Symbol
    timeout,    // 超时时间，默认 30 秒
    data,       // post、put、del 数据体，json 对象
    ...
}
```

其他参数请参考文档：<https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch>

#### abort

```javascript
import { abort } from '@hnzycfcfed/request';

abort(name, callback);
```

### 演示

---

#### POST

```javascript
import { post } from 'request';

post('https://api.l-blog.me/good-things', {
    data: {
        things: [
                    {
                        "rate": 5,
                        "text": "今天差点开电视，好开心"
                    },
                    {
                        "rate": 4,
                        "text": "跟风险团队有了非常好的沟通，很开心"
                    },
                    {
                        "rate": 4.5,
                        "text": "解决了一个生产问题，好开心"
                    }
                ],
    }
})
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        let message = '';
        switch (true) {
            case e.name === 'AbortError':
                message = 'timeout';
                break;
            case e.name === 'StatusError':
                message = `Wrong status code ${e.message}`;
                break;
            case !!e.returnCode:
                message = e.returnMsg;
                break;
        }

        console.error(message || e);
    });
```

#### GET

```javascript
import { get } from 'request';

get('https://api.l-blog.me/q-signals')
    .then(data => {
        console.log(data);
    })
```

#### 使用 request

```javascript
import request from 'request';

// POST

request('https://api.l-blog.me/good-things', {
    method: 'POST'
    data: {
       things: [
                    {
                        "rate": 5,
                        "text": "今天差点开电视，好开心"
                    },
                    {
                        "rate": 4,
                        "text": "跟风险团队有了非常好的沟通，很开心"
                    },
                    {
                        "rate": 4.5,
                        "text": "解决了一个生产问题，好开心"
                    }
                ],
    }
})
    .then(data => {
        console.log(data);
    })

// GET
request('https://api.l-blog.me/q-signals')
    .then(data => {
        console.log(data);
    })
```

#### timeout

```javascript
import { post } from 'request';

post('https://api.l-blog.me/good-things', {
    timeout: 500,
    data: {
        things: [
                    {
                        "rate": 5,
                        "text": "今天差点开电视，好开心"
                    },
                    {
                        "rate": 4,
                        "text": "跟风险团队有了非常好的沟通，很开心"
                    },
                    {
                        "rate": 4.5,
                        "text": "解决了一个生产问题，好开心"
                    }
                ],
    }
})
    .then(data => {
        console.log(data);
    })
    .catch(e => {
        if(e.name === 'AbortError') {
            console.error('timeout');
        }
    });
```

#### abort 演示

```javascript
import { post, abort } from 'request';

const requestName = Symbol('createGoodThings');

post('https://api.l-blog.me/good-things', {
    name: requestName,
    data: {
       things: [
                    {
                        "rate": 5,
                        "text": "今天差点开电视，好开心"
                    },
                    {
                        "rate": 4,
                        "text": "跟风险团队有了非常好的沟通，很开心"
                    },
                    {
                        "rate": 4.5,
                        "text": "解决了一个生产问题，好开心"
                    }
                ],
    }
})
    .then(data => {
        console.log(data);
    })

abort(requestName, aborted => {
    aborted && console.log('request aborted');
});
```
