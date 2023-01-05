import PasswordlessNode from 'supertokens-node/recipe/passwordless'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
    return {
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.com
            connectionURI: "https://dev-bba353718b4911eda3c15f64faa152ce-ap-southeast-1.aws.supertokens.io:3569",
            apiKey: "57yx3KT6EQclBJoz3JzCGuN3mnvAud",
        },
        appInfo,
        recipeList: [
            PasswordlessNode.init({
                flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                contactMethod: "EMAIL_OR_PHONE"
            }),
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    }
}

