import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";
import * as dotenv from 'dotenv';
import jwt from "supertokens-node/recipe/jwt"

dotenv.config();

export const SuperTokensConfig: TypeInput = {
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        // @ts-ignore
        connectionURI: process.env.connectionURI, // location of the core
        apiKey: process.env.apiKey // provide the core's API key if configured
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "tokens",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
            contactMethod: "EMAIL_OR_PHONE"
        }),
        Dashboard.init({
            // @ts-ignore
            apiKey: process.env.DashboardApiKey
        }),
        Session.init(), // initializes session features
        jwt.init()
    ]
};
