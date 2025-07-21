import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const HeroBanner = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 text-white">
      <div className="container mx-auto px-6 py-12">
        {" "}
        {/* Reduced py-16 to py-12 */}
        <div className="text-center max-w-3xl mx-auto">
          {" "}
          {/* max-w-4xl -> 3xl */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Amazing Stories
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed">
            Explore a world of knowledge, insights, and inspiration from our
            community of writers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4" />
              <Input
                placeholder="Search blogs..."
                className="pl-10 bg-white/10 border-white text-white placeholder:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
