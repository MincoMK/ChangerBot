import {Request, Response, Router} from 'express';

const router = Router();

router.get('/success', async (req: Request, res: Response) => {
    const q: { paymentKey: string, orderId: string, amount: number } = <any> req.query;

    if (!q.paymentKey || !q.orderId || !q.amount) return res.status(400).json({ error: 'Bad Request. Missing something.' });
    if (q.amount != 15000) return res.status(400).json({ error: 'Bad Request. Not matching price.' });

    const res1 = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: 'POST',
        headers: {
            Authorization: 'Basic dGVzdF9za19HS05iZE92azVya3hYQWVYMWFvOG4wN3hsem1qOg==',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(q)
    });

    const data = await res1.json();

    if (!data.virtualAccount) return res.status(400).json({ error: 'Bad Request. Not virtual account.' });

    const vAcc = data.virtualAccount;

    res.status(200).json({ vAcc });
});

router.all('/wh', async (req: Request, res: Response) => {
    console.log(req.body || req.query);
    res.status(200).json({ success: true });
});

export default router;