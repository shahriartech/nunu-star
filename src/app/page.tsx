import HeroSection from "@/components/HeroSection/HeroSection";
import TopNavBar from "@/components/navigation/TopNavBar";
import CoinAnimation from "@/components/coinanimation/coinanimation";

export default function Home() {
  return(  <div className="flex flex-col w-full items-center">
    <CoinAnimation />
      <TopNavBar />
      <HeroSection />
  </div>
);
}
