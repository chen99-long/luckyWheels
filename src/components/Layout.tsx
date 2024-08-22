import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import appConfig from '@/app/app.config';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: appConfig.title,
  description: "AI驱动的幸运转盘生成器",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer currentYear={currentYear} />
    </>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/">
              <img src="/logo.png" alt={appConfig.title} className="h-12 mr-4 rounded-full cursor-pointer" />
            </Link>
            <Link href="/" className="text-2xl font-bold">{appConfig.title}</Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/lucky-wheels" className="hover:text-yellow-400 transition duration-300">创建转盘</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400 transition duration-300">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition duration-300">联系我们</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer({ currentYear }: { currentYear: string }) {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">{appConfig.title}</h3>
            <p className="mt-2">AI驱动的幸运转盘生成器</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
            <ul className="flex justify-center space-x-4">
              <li><Link href="/about" className="hover:text-yellow-400">关于我们</Link></li>
              <li><Link href="/terms" className="hover:text-yellow-400">使用条款</Link></li>
              <li><Link href="/privacy" className="hover:text-yellow-400">隐私政策</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p>&copy; {currentYear || '2023'} {appConfig.title}. 保留所有权利。</p>
          </div>
        </div>
      </div>
    </footer>
  );
}