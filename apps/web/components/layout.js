import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [height, setHeight] = useState(0)

  
  useEffect(() => {
    if(window) {
        const { innerHeight: height } = window;
        // console.log("height" , height)
        setHeight(height)
    }
}, [])

  return (
    <>
      <Navbar />
      <div style={{minHeight: "calc(100vh - 60px)"}}>{children}</div>
      <Footer />
    </>
  );
}
