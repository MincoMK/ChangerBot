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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/success', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query;
    if (!q.paymentKey || !q.orderId || !q.amount)
        return res.status(400).json({ error: 'Bad Request. Missing something.' });
    if (q.amount != 15000)
        return res.status(400).json({ error: 'Bad Request. Not matching price.' });
    const res1 = yield fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: 'POST',
        headers: {
            Authorization: 'Basic dGVzdF9za19HS05iZE92azVya3hYQWVYMWFvOG4wN3hsem1qOg==',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(q)
    });
    const data = yield res1.json();
    if (!data.virtualAccount)
        return res.status(400).json({ error: 'Bad Request. Not virtual account.' });
    const vAcc = data.virtualAccount;
    res.status(200).json({ vAcc });
}));
router.all('/wh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body || req.query);
    res.status(200).json({ success: true });
}));
exports.default = router;
