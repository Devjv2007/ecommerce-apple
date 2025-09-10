import { useState, useEffect } from "react";

const Sobre = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      <div className="hidden lg:block">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <section className="pt-10 pb-16 px-4 md:px-14 lg:px-20">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Sobre a iPhoneShop
              </h1>
              <p className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}> 
                Somos especialistas em oferecer a melhor experiência em produtos Apple no Brasil.
              </p>
            </div>
          </section>


          <section className="py-6 bg-white/50 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 md:px-14 lg:px-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div className="p-6">
                  <h3 className="text-4xl font-bold text-blue-600 mb-2">50k+</h3>
                  <p className="text-gray-600">Clientes Satisfeitos</p>
                </div>
                <div className="p-6">
                  <h3 className="text-4xl font-bold text-green-600 mb-2">5+</h3>
                  <p className="text-gray-600">Meses de Experiência</p>
                </div>
                <div className="p-6">
                  <h3 className="text-4xl font-bold text-purple-600 mb-2">99%</h3>
                  <p className="text-gray-600">Produtos Originais</p>
                </div>
                <div className="p-6">
                  <h3 className="text-4xl font-bold text-orange-600 mb-2">24h</h3>
                  <p className="text-gray-600">Suporte Online</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="max-w-6xl mx-auto px-4 md:px-14 lg:px-20">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                Nossos Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualidade</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Trabalhamos apenas com produtos originais Apple, garantindo a melhor 
                    experiência e durabilidade para nossos clientes.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Inovação</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sempre em busca das últimas tecnologias e tendências para oferecer 
                    o que há de mais moderno no mercado Apple.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Atendimento</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nossa equipe especializada está sempre pronta para oferecer o melhor 
                    suporte antes, durante e após a compra.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
          <section className="pt-12 pb-8 px-4">
            <div className="text-center">
              <h1 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Sobre a iPhoneShop
              </h1>
              <p className={`text-base sm:text-lg text-gray-600 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Há mais de 10 anos conectando você ao futuro da tecnologia Apple. 
                Somos especialistas em oferecer a melhor experiência em produtos Apple no Brasil.
              </p>
            </div>
          </section>

          <section className="py-8 bg-white/50 backdrop-blur-sm">
            <div className="px-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">50k+</h3>
                  <p className="text-gray-600 text-sm">Clientes Satisfeitos</p>
                </div>
                <div className="p-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">5+</h3>
                  <p className="text-gray-600 text-sm">Meses de Experiência</p>
                </div>
                <div className="p-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">99%</h3>
                  <p className="text-gray-600 text-sm">Produtos Originais</p>
                </div>
                <div className="p-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">24h</h3>
                  <p className="text-gray-600 text-sm">Suporte Online</p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="px-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
                Nossos Valores
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Qualidade</h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">
                    Trabalhamos apenas com produtos originais Apple, garantindo a melhor 
                    experiência e durabilidade para nossos clientes.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Inovação</h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">
                    Sempre em busca das últimas tecnologias e tendências para oferecer 
                    o que há de mais moderno no mercado Apple.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Atendimento</h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">
                    Nossa equipe especializada está sempre pronta para oferecer o melhor 
                    suporte antes, durante e após a compra.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
