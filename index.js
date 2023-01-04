const express = require("express");
const cors = require("cors");
const { validate } = require("deep-email-validator");
const app = express();
const port = 9000;

//cors config
app.use(
    cors({
        credentials: true,
        origin: "*",
        methods: ["POST"],
        allowedHeaders: ["Content-Type"],
    })
);

//requisition parse
app.use(express.json());

app.post("/validateEmail", async (req, res, next) => {
    try {
        const response = await validate(req.body.email);
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json(e);
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "NOT FOUND" });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
