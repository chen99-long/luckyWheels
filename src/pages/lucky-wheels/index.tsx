// pages/index.tsx
import Head from 'next/head';
import Wheel from '@/components/Wheel';


export default function Home() {
  return (
    <>
      <Head>
        <title>AI幸运转盘</title>
        <meta name="description" content="可自定义的幸运转盘抽奖" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wheel />
    </>
  );
}