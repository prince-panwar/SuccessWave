import Image from "next/image";
import DemoVideos from "./demoVideo";
import Head from 'next/head';

export default function Home() {
  return (
    <>
    <Head>
      <title>Success Wave | EdTech Demo Videos</title>
      <meta name="description" content="Discover Success Wave's EdTech platform and explore demo videos." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <DemoVideos />
  </>
  );
}
