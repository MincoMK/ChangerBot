"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_cookie_1 = __importDefault(require("fetch-cookie"));
function check(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchCookie = (0, fetch_cookie_1.default)(fetch);
        const res1 = yield fetchCookie("https://auth.riotgames.com/api/v1/authorization", {
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
        console.log(yield res1.json(), res1.headers.get('set-cookie'));
        // https://auth.riotgames.com/api/v1/authorization
        const res = yield fetchCookie("https://auth.riotgames.com/api/v1/authorization", {
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
        const data = yield res.json();
        console.log(data);
        if (data.type == "response")
            return true;
        else
            return false;
    });
}
exports.default = check;
