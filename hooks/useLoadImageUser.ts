import {Song} from "@/types";
import {useUser} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadImageUser = (userData: any) => {
    const supabaseClient = useSupabaseClient();
    const user = useUser().user;

    if (!userData && !user) {
        return null;
    }

    console.log(user)
    console.log(userData)

    const {data: imageData} = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(userData[0].avatar_url);

    return imageData.publicUrl;
};

export default useLoadImageUser;
