import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

export const SuperTokensConfig = {
    languageTranslations: { // This object contains all translation related options
        translations: {
            ru: {
                EMAIL_PASSWORD_SIGN_IN_FOOTER_FORGOT_PW_LINK: "Забыли пароль?",
                EMAIL_PASSWORD_SIGN_IN_HEADER_TITLE: "Войти",
                PWLESS_SIGN_IN_UP_HEADER_TITLE: "Вход или регистрация",
                PWLESS_SIGN_IN_UP_EMAIL_OR_PHONE_LABEL: "email или телефон",
                EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_START: "",
                EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_SIGN_UP_LINK: "регистрация",
                EMAIL_PASSWORD_SIGN_IN_HEADER_SUBTITLE_END: "",
                EMAIL_PASSWORD_PASSWORD_LABEL: "Пароль",
                EMAIL_PASSWORD_PASSWORD_PLACEHOLDER: "",
                EMAIL_PASSWORD_SIGN_IN_SUBMIT_BTN: "Войти",
                PWLESS_SIGN_IN_UP_CONTINUE_BUTTON: "Войти",
                BRANDING_POWERED_BY_START: "himexp",
                ERROR_EMAIL_INVALID: "",
                SOMETHING_WENT_WRONG_ERROR: "ошибка",
                // This key is associated with an empty string by default, but you can override these as well.
                BRANDING_POWERED_BY_END: " 😊",
            }
        },
        /*
         * This optional property sets the default and fallback language.
         * It can be any string that will be used to fetch translations from the above object.
         * Defaults to "en"
         */
        defaultLanguage: "ru",
    },
    appInfo: {
        appName: "tokens",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL_OR_PHONE",
        }),
        /*ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [
                        {
                            id: "email",
                            label: "email",
                            placeholder: "info@example.com"
                        },
                        {
                            id: "first_name",
                            label: "Имя",
                            placeholder: "Иван"
                        },
                        {
                            id: "last_name",
                            label: "Фамилия",
                            placeholder: "Иванов"
                        }
                    ]
                }
            }
        }),*/
        Session.init(),
    ],
};
