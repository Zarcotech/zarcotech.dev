import About from "./components/about";
import Contributions from "./components/heatmap";
import Canvas from "./components/canvas";
import Info from "./components/info";

function Home() {
  return (
    <div className="relative isolate min-h-screen">
      <Canvas />
      <div className="fixed bottom-4 left-4 z-20">
        <Info />
      </div>
      <main className="relative z-10 grid min-h-screen grid-rows-2 px-4 pb-72 pt-20 md:pb-8 md:pl-[360px] md:pr-8 md:pt-8">
        <div className="flex items-center justify-center"><About /></div>
        <div className="flex items-center justify-center"><Contributions /></div>
      </main>
    </div>
  );
}

export default Home;
