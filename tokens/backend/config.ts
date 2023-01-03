import Passwordless from "supertokens-node/recipe/passwordless";
import Session from "supertokens-node/recipe/session";
import { TypeInput } from "supertokens-node/types";
import Dashboard from "supertokens-node/recipe/dashboard";

export const SuperTokensConfig: TypeInput = {
    framework: "express",
    supertokens: {
        // These are the connection details of the app you created on supertokens.com
        connectionURI: "https://dev-bba353718b4911eda3c15f64faa152ce-ap-southeast-1.aws.supertokens.io:3569",
        apiKey: "57yx3KT6EQclBJoz3JzCGuN3mnvAud",
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
            apiKey: "pahan"
        }),
        Session.init() // initializes session features
    ]
};
