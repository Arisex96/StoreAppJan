import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
