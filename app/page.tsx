import About from "./components/about";
import Contributions from "./components/heatmap";
import Splash from "./components/splash";
import Info from "./components/info";

function Home() {
  return (
    <div className="">
      <main className="grid grid-cols-4 h-screen">
        <div className="col-span-1 row-span-2">
          
          <Splash />
          <Info />
        </div>
        <div className="col-span-3 grid grid-rows-2">
          <div className="flex items-center justify-center"><About /></div>
          <div className="flex items-center justify-center"><Contributions /></div>
        </div>
      </main>
    </div>
  );
}

export default Home;