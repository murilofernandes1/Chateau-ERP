import express, {} from 'express';
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    return res.json({ message: "ERP Online com TypeScript!" });
});
app.listen(3000, () => console.log("🔥 Server running on http://localhost:3000"));
//# sourceMappingURL=index.js.map