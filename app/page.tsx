import About from "./components/about";
import Splash from "./components/splash";
// import Presence from "./components/presence";

function Home() {
  return (
    <div className="">
      <main className="grid grid-cols-4 h-screen divide-x divide-gray-300">
        <div className="col-span-1 row-span-2">
          <Splash />
        </div>
        <div className="col-span-3 grid grid-rows-2 divide-y divide-gray-300">
          <div className="flex items-center justify-center"><About /></div>
          <div className="flex items-center justify-center"></div>
        </div>
      </main>
    </div>
  );
}

export default Home;