import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import {NextPage} from "next";
import getSongs from "@/actions/getSongs";
import SongsContent from "@/app/(site)/components/SongsContent";
import getUserID from "@/actions/getUserId";
import {Song, UserDetails} from "@/types";

export const revalidate = 0;
const HomePage:NextPage = async () => {
    const songs: Song[] = await getSongs();
    const userData: UserDetails[] = await getUserID();

  return (
      <div className="bg-neutral-900 rounded-lg h-full w-full">
          <Header userData={userData}>
              <div className="mb-2">
                  <h1 className="text-white text-3xl font-semibold">
                    Welcome back
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4 ">
                    <ListItem image="/images/liked.png" name="Liked Songs" href="liked" />
                  </div>
              </div>
          </Header>
          <main className="mt-2 mb-7 px-6">
              <section className="flex justify-between items-center">
                  <h2 className="text-white text-2xl font-semibold">
                      Newest Songs
                  </h2>
              </section>
              <SongsContent songs={songs}/>
          </main>
      </div>
  )
}

export default HomePage;
