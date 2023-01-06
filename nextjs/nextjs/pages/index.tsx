import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import SessionReact, { SessionAuth, useSessionContext } from 'supertokens-auth-react/recipe/session'
import {getSupabase} from "../utils/supabase";
import SuperTokensReact from "supertokens-auth-react";

export default function Home() {
    return (
        // We will wrap the ProtectedPage component with the SessionAuth so only an
        // authenticated user can access it.
        <SessionAuth>
            <ProtectedPage />
        </SessionAuth>
    )
}

function ProtectedPage() {
    // retrieve the authenticated user's accessTokenPayload and userId from the sessionContext
    const session = useSessionContext()

    async function logoutClicked() {
        await SessionReact.signOut();
        SuperTokensReact.redirectToAuth();
    }

    const [userEmail, setEmail] = useState('')
    useEffect(() => {
        async function getUserEmail() {
            if (session.loading) {
                return;
            }
            // retrieve the supabase client who's JWT contains users userId, this will be
            // used by supabase to check that the user can only access table entries which contain their own userId
            const supabase = getSupabase(session.accessTokenPayload.supabase_token)

            // retrieve the user's name from the users table whose email matches the email in the JWT
            const { data } = await supabase.from('users').select('email').eq('user_id', session.userId)

            if (data.length > 0) {
                setEmail(data[0].email)
            }
        }
        getUserEmail()
    }, [session])

    if (session.loading) {
        return null;
    }

    return (
        <div>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <p>
                    You are authenticated with SuperTokens! (UserId: {session.userId})
                    <br />
                    Your email retrieved from Supabase: {userEmail}
                </p>
                <div
                    onClick={logoutClicked}
                    style={{
                        display: "flex",
                        width: "116px",
                        height: "42px",
                        backgroundColor: "#000000",
                        borderRadius: "10px",
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: "bold",
                    }}
                >
                    SIGN OUT
                </div>
            </main>
        </div>
    )
}