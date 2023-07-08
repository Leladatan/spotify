import {Song} from "@/types";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadImageUser = (userData: any) => {
    const supabaseClient = useSupabaseClient();

    if (!userData) {
        return null;
    }

    const {data: imageData} = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(userData[0].avatar_url);

    return imageData.publicUrl;
};

export default useLoadImageUser;