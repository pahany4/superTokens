import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {useSessionContext} from "supertokens-auth-react/recipe/session";


function ProtectedPage() {
    const session = useSessionContext();

    if (session.loading === true) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SuperTokens 💫</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    user
                </h1>

            </main>
            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    );
}

/** не защищенный роут */
export default function User() {
    return (
        <ProtectedPage/>
    );
}
