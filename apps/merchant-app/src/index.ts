import express from "express";
import { useRouter } from "./router/user";
import { merchantRouter } from "./router/merchant";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

app.use("/api/v1/user", useRouter);
app.use("/api/v1/merchant", merchantRouter);



app.listen( process.env.PORT || 3000)