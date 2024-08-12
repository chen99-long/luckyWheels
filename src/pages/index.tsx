// pages/index.tsx
import Head from 'next/head';
import Layout from '../components/Layout';
import Wheel from '../components/Wheel';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>幸运转盘抽奖</title>
        <meta name="description" content="可自定义的幸运转盘抽奖" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wheel />
    </Layout>
  );
}