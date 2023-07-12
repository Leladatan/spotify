import {Song} from "@/types";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {getPagination} from "@/functions";
import {page} from "@/app/(site)/components/SongsContent";

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });


    const { from, to } = getPagination(page);

    const {data, error} = await supabase
        .from('songs')
        .select('*')
        .order('created_at', {ascending: false})
        .range(from, to);

    if (error) {
        console.log(error);
    }
    return data as any || [];
}

export default getSongs;
