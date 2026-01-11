import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
console.log("リクエスト来た");

const response = await fetch(
"https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
{
method: "POST",
headers: {
"Authorization": "Bearer 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",
"Content-Type": "application/json"
},
body: JSON.stringify({ inputs: "cat" })
}
);

console.log("HuggingFaceの返事:", response.status);

if (!response.ok) {
const text = await response.text();
console.log(text);
return res.send("エラー");
}

const buffer = await response.arrayBuffer();
res.set("Content-Type", "image/png");
res.send(Buffer.from(buffer));
});

app.listen(3000, () => {
console.log("サーバー起動 http://localhost:3000");
});
