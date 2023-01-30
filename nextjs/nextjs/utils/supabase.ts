import { createClient } from '@supabase/supabase-js'

let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "TODO: Your Supabase URL"
let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "TODO: Your Supabase Key"

/*const getSupabase = (access_token: string) => {
    const supabase = createClient(
        supabase_url,
        supabase_key
    )

    supabase.auth.session = () => ({
        access_token,
        token_type: "",
        user: null
    })

    return supabase
}*/
const getSupabase = (access_token: string) => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY,
        {
            global: { headers: { Authorization: `Bearer ${access_token}` } },
        }
    );

    return supabase;
};
export { getSupabase }