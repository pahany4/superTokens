import PasswordlessReact from 'supertokens-auth-react/recipe/passwordless'
import SessionReact from 'supertokens-auth-react/recipe/session'
import { appInfo } from './appInfo'
import Router from 'next/router'

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            PasswordlessReact.init({
                contactMethod: "EMAIL_OR_PHONE",
            }),
            SessionReact.init(),
        ],
        windowHandler: (oI: any) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href: string) => {
                        Router.push(href);
                    },
                },
            };
        },
    };
};