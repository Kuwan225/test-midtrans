const express = require("express");
const midtransClient = require("midtrans-client");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hallo");
});

router.post("/process-transaction", (req, res) => {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-njzC24tRgyPibRsfkQFitcBI",
      clientKey: "SB-Mid-client-oiw0xy0oDNwna3EN",
    });

    const parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total,
      },
      customer_details: {
        first_name: req.body.name,
      },
      enabled_payments: [
        "credit_card",
        "cimb_clicks",
        "bca_klikbca",
        "bca_klikpay",
        "bri_epay",
        "echannel",
        "permata_va",
        "bni_va",
        "bri_va",
        "cimb_va",
        "other_va",
        "gopay",
        "indomaret",
        "danamon_online",
        "akulaku",
        "shopeepay",
        "kredivo",
        "uob_ezpay",
      ],
      gopay: {
        enable_callback: true,
        callback_url: "http://gopay.com",
        tokenization: false,
        phone_number: "085871853656",
        country_code: "62"
      }
    };

    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({
        message: "Berhasil",
        dataPayment,
        token: token,
      });
    });
  } catch (error) {
    res.send.status(500).json({ message: error.message });
  }
});

module.exports = router;
