import AutoGPTServerAPIServerSide from "@/lib/autogpt-server-api/clientServer";
import { AgentsSection } from "@/components/agptui/composite/AgentsSection";
import { SearchBar } from "@/components/agptui/SearchBar";
import { FeaturedCreators } from "@/components/agptui/composite/FeaturedCreators";
import { Separator } from "@/components/ui/separator";
import { SearchFilterChips } from "@/components/agptui/SearchFilterChips";
import { SortDropdown } from "@/components/agptui/SortDropdown";

export default async function Page({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { searchTerm?: string; sort?: string };
}) {
  const search_term = searchParams.searchTerm || "";
  const sort = searchParams.sort || "trending";
  
  const api = new AutoGPTServerAPIServerSide();
  const { agents } = await api.getStoreAgents({ 
    search_query: search_term,
    sort: sort 
  });
  const { creators } = await api.getStoreCreators({
    search_query: search_term,
  });

  const agentsCount = agents?.length || 0;
  const creatorsCount = creators?.length || 0;
  const totalCount = agentsCount + creatorsCount;

  return (
    <div className="w-full bg-white">
      <div className="px-10 max-w-[1440px] mx-auto">
        <div className="flex items-center mt-8">
          <div className="flex-1 min-w-[910px]">
            <h2 className="font-['Geist'] text-base font-medium text-neutral-800">
              Results for:
            </h2>
            <h1 className="font-['Poppins'] text-2xl font-semibold text-neutral-800">
              {search_term}
            </h1>
          </div>
          <div className="flex-none ml-auto">
            <SearchBar width="w-[439px]" />
          </div>
        </div>

        {totalCount > 0 ? (
          <>
            <div className="mt-8 flex justify-between items-center">
              <SearchFilterChips 
              
                totalCount={totalCount}
                agentsCount={agentsCount}
                creatorsCount={creatorsCount}
              />
              <SortDropdown />
            </div>

            {agentsCount > 0 && (
              <div className="mt-8">
                <h2 className="text-neutral-800 text-lg font-semibold font-['Poppins'] mb-4">Agents</h2>
                <AgentsSection agents={agents} sectionTitle="Search Results" />
              </div>
            )}
            
            {agentsCount > 0 && creatorsCount > 0 && <Separator className="my-6" />}
            
            {creatorsCount > 0 && (
              <div className="mt-8">
                <h2 className="text-neutral-800 text-lg font-semibold font-['Poppins'] mb-4">Creators</h2>
                <FeaturedCreators featuredCreators={creators} />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <h3 className="text-xl font-medium text-neutral-600 mb-2">No results found</h3>
            <p className="text-neutral-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
