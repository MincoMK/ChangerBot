import makeFetchCookie from 'fetch-cookie';

export default async function check(email: string, password: string): Promise<boolean> {
    const fetchCookie = makeFetchCookie(fetch);

    const res1 = await fetchCookie("https://auth.riotgames.com/api/v1/authorization", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referer": "https://auth.riotgames.com/login",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "{\"client_id\":\"prod-xsso-playvalorant\",\"code_challenge\":\"exfC6BYrU4i5TdggXwk3BVdnwgXEYLPxiETm5r4JbIo\",\"code_challenge_method\":\"S256\",\"redirect_uri\":\"https://xsso.playvalorant.com/redirect\",\"response_type\":\"code\",\"scope\":\"openid account\",\"state\":\"a09213c839a3cbccbd202fdfa7\",\"uri\":\"https://playvalorant.com/ko-kr/\"}",
        "method": "POST"
    });

    console.log(await res1.json(), res1.headers.get('set-cookie'));

    // https://auth.riotgames.com/api/v1/authorization
    const res = await fetchCookie("https://auth.riotgames.com/api/v1/authorization", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "undici",
            "Referer": "https://auth.riotgames.com/login",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": JSON.stringify({
            type: "auth",
            username: email,
            password,
            remember: false,
            language: "en_US"
        }),
        "method": "PUT"
    });

    const data: any = await res.json();

    console.log(data);

    if (data.type == "response") return true;
    else return false;
}