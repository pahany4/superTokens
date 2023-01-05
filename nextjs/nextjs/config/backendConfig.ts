//import PasswordlessNode from 'supertokens-node/recipe/passwordless'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";
import jwt from "jsonwebtoken";
import Passwordless from "supertokens-node/recipe/passwordless";
import {getSupabase} from "../utils/supabase";

let supabase_signing_secret = process.env.SUPABASE_SIGNING_SECRET

export const backendConfig = (): TypeInput => {
    return {
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.com
            //connectionURI: "https://dev-bba353718b4911eda3c15f64faa152ce-ap-southeast-1.aws.supertokens.io:3569",
            connectionURI: "https://try.supertokens.com",
            //apiKey: "57yx3KT6EQclBJoz3JzCGuN3mnvAud",
        },
        appInfo,
        /*recipeList: [
            PasswordlessNode.init({
                flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                contactMethod: "EMAIL_OR_PHONE"
            }),
            SessionNode.init(),
        ],*/
        recipeList: [
            Passwordless.init({
                flowType: "MAGIC_LINK",
                contactMethod: "EMAIL",
                override: {
                    apis: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            // the consumeCodePOST function gets called when a user clicks a magic link
                            consumeCodePOST: async function (input) {
                                if (originalImplementation.consumeCodePOST === undefined) {
                                    throw Error("Should never come here");
                                }

                                let response = await originalImplementation.consumeCodePOST(input);

                                if (response.status === "OK" && response.createdNewUser) {

                                    // retrieve the accessTokenPayload from the user's session
                                    const accessTokenPayload = response.session.getAccessTokenPayload();

                                    // create a supabase client with the supabase_token from the accessTokenPayload
                                    const supabase = getSupabase(accessTokenPayload.supabase_token);

                                    // store the user's email mapped to their userId in Supabase
                                    const { error } = await supabase
                                        .from("users")
                                        .insert({ email: response.user.email, user_id: response.user.id });

                                    if (error !== null) {
                                        throw error;
                                    }
                                }

                                return response;
                            },
                        }
                    }
                }
            }),
            SessionNode.init({
                override: {
                    functions: (originalImplementation) => {
                        return {
                            ...originalImplementation,
                            // We want to create a JWT which contains the users userId signed with Supabase's secret so
                            // it can be used by Supabase to validate the user when retrieving user data from their service.
                            // We store this token in the accessTokenPayload so it can be accessed on the frontend and on the backend.
                            createNewSession: async function (input) {
                                const payload = {
                                    userId: input.userId,
                                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                                };

                                const supabase_jwt_token = jwt.sign(payload, supabase_signing_secret);

                                input.accessTokenPayload = {
                                    ...input.accessTokenPayload,
                                    supabase_token: supabase_jwt_token,
                                };

                                return await originalImplementation.createNewSession(input);
                            },
                        };
                    },
                },
            }),
        ],
        isInServerlessEnv: true,
    }
}

