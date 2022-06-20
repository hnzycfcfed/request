import request, { get, post } from './src/request';

test('test get', async () => {
    const data = await get('https://api.l-blog.me/q-signals/1');


    expect(data.status).toBe(200);
});

test('test post', async () => {
    const data = await post('https://api.l-blog.me/good-things',
        {
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
        });

    expect(!!data).toBe(true);
});

test('test request get', async () => {
    const data = await request('https://api.l-blog.me/q-signals/1');
    expect(data.status).toBe(200);

});

test('test request post', async () => {
    const data = await request('https://api.l-blog.me/good-things',
        {
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
        });
    expect(!!data).toBe(true);
});
