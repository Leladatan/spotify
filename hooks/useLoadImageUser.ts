import {Song} from "@/types";
import {useUser} from "@/hooks/useUser";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const useLoadImageUser = (userData: any) => {
    const supabaseClient = useSupabaseClient();
    const {isLoading, user} = useUser();

    if (!userData || !userData[0]) {
        return null;
    }

    if (!isLoading && !user) {
        return;
    }

    const {data: imageData} = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(userData[0].avatar_url);

    return imageData.publicUrl;
};

export default useLoadImageUser;
