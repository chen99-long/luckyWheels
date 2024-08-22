import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import appConfig from '@/app/app.config';
import { useState, useEffect } from 'react';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    { q: "SpinGenius是如何使用AI技术的？", a: "SpinGenius利用先进的机器学习算法，根据您的输入和偏好生成独特的转盘设计和主题创意。我们的AI模型经过大量数据训练，能够理解设计趋势和用户需求，从而提供个性化和创新的解决方案。" },
    { q: "我可以免费使用SpinGenius吗？", a: "是的，我们提供免费版本供用户体验。免费版包含基本的转盘创建和自定义功能。同时，我们也提供高级功能的付费版本，如更多模板、高级AI生成功能和详细的数据分析，以满足更专业的需求。" },
    { q: "SpinGenius支持哪些语言？", a: "目前SpinGenius支持多种语言，包括中文、英语、日语、韩语、西班牙语和法语等。我们正在不断增加更多语言支持，以服务全球用户。如果您需要特定的语言支持，欢迎联系我们的客户服务团队。" },
    { q: "如何获取技术支持？", a: "您可以通过多种方式获取技术支持：\n1. 使用我们的在线客服系统，获得实时帮助；\n2. 发送电子邮件至support@spingenius.com；\n3. 访��我们的社区论坛，与其他用户交流经验；\n4. 查阅我们详细的在线文档和教程。我们的支持团队将在24小时内回应您的询问。" }
  ];

  return (<>
      <Head>
        <title>{appConfig.title} - AI驱动的幸运转盘生成器</title>
        <meta name="description" content="使用AI技术创建独特的幸运转盘体验" />
      </Head>

      <header className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-blue-500 text-white bg-[#7759f5] py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12 text-shadow-lg text-center px-4">{appConfig.title}</h1>
        <div className="hero container mx-auto px-4 md:px-6 flex flex-col items-center justify-between md:flex-row">
          <div className="hero-content w-full md:w-1/2 text-center mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">欢迎来到 <span className="text-yellow-300">SpinGenius</span></h2>
            <p className="text-xl md:text-2xl mb-6 md:mb-8 opacity-90">使用 AI 技术，为您量身定制独特的幸运转盘体验</p>
            <Link href="/lucky-wheels">
              <button className="cta-button bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-base md:text-lg">
                开始创建您的幸运转盘
              </button>
            </Link>
          </div>
          <div className="hero-image w-full md:w-1/2 transform hover:scale-105 transition duration-300 mt-8 md:mt-0">
            <Image
              src="https://placehold.co/500x500"
              alt="幸运转盘示例"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl border-4 border-white max-w-full h-auto"
            />
          </div>
        </div>
      </header>

      <main>
        {/* 特点部分 */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">为什么选择 SpinGenius?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "AI 驱动", desc: "利用先进的AI技术生成独特转盘", icon: "🤖" },
                { title: "高度定制", desc: "根据您的需求定制每个细节", icon: "🎨" },
                { title: "易于使用", desc: "直观的界面，轻松创建和分享", icon: "👌" }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features模块 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">强大功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "AI生成创意", desc: "利用先进的AI算法，为您的转盘生成独特创意和主题。", icon: "💡" },
                { title: "自定义设计", desc: "完全自定义转盘的颜色、字体和图案，打造专属风格。", icon: "🎨" },
                { title: "多平台支持", desc: "在桌面、平板和移动设备上无缝运行，随时随地创建和分享。", icon: "📱" },
                { title: "实时协作", desc: "与团队成员实时协作，共同编辑和完善您的幸运转盘。", icon: "👥" },
                { title: "数据分析", desc: "深入分析转盘使用数据，优化您的营销策略和用户参与度。", icon: "📊" },
                { title: "一键分享", desc: "轻松将您的幸运转盘分享到各大社交平台，扩大影响力。", icon: "🔗" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg shadow-md">
                  <div className="text-4xl mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 用户评价 */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">用户反馈</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "张三", comment: "SpinGenius让我的活动变得更加有趣！", avatar: "https://i.pravatar.cc/150?img=1" },
                { name: "李四", comment: "简单易用，效果出众。强烈推荐！", avatar: "https://i.pravatar.cc/150?img=2" },
                { name: "王五", comment: "AI生成的创意令人惊叹，节省了大量时间。", avatar: "https://i.pravatar.cc/150?img=3" }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full mr-4" />
                    <h3 className="font-semibold">{testimonial.name}</h3>
                  </div>
                  <p className="italic">"{testimonial.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ模块 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">常见问题</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="flex justify-between items-center w-full p-5 font-medium text-left bg-white hover:bg-gray-50 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-6 h-6 transition-transform duration-200 ${
                        isClient && openFAQ === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isClient && openFAQ === index && (
                    <div className="p-5 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700 whitespace-pre-wrap">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 行动召唤 */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">准备好开始您的 SpinGenius 之旅了吗？</h2>
            <Link href="/lucky-wheels">
              <button className="cta-button bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg text-xl">
                立即创建您的幸运转盘
              </button>
            </Link>
          </div>
        </section>
      </main>


    </>
  );
}