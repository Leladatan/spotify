import {Song} from "@/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import getSongs from "@/actions/getSongs";

const getSongsByAuthor = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title) {
        return await getSongs();
    }

    const {data, error} = await supabase
        .from('songs')
        .select('*')
        .ilike('author', `%${title}%`)
        .order('created_at', {ascending: false})
        .range(0, 200);

    if (error) {
        console.log(error);
    }
    return data as any || [];
}

export default getSongsByAuthor;
