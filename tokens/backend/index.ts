import express from "express";
import cors from "cors";
import supertokens from "supertokens-node";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler, SessionRequest } from "supertokens-node/framework/express";
import { SuperTokensConfig } from "./config";
import jwt from "supertokens-node/recipe/jwt"

supertokens.init(SuperTokensConfig);

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
    })
);

// This exposes all the APIs from SuperTokens to the client.
app.use(middleware());

// An example API that requires session verification
app.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

async function createJWT(payload: any) {
    let jwtResposne = await jwt.createJWT({
        ...payload,
        source: "microservice"
    });
    if (jwtResposne.status === "OK") {
        // Send JWT as Authorization header to M2
        return jwtResposne.jwt;
    }
    throw new Error("Unable to create JWT. Should never come here.")
}

// In case of session related errors, this error handler
// returns 401 to the client.
app.use(errorHandler());

app.listen(3001, () => console.log(`API Server listening on port 3001`));
