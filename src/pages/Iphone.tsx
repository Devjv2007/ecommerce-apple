import { Link } from "react-router-dom";  
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Product {
  id: number;
  nome: string;
  descricao?: string;
  preco: string | number;
  imagem_url: string | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Iphone() {
  const [iphones, setIphones] = useState<Product[]>([]);
  const [adapters, setAdapters] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.15.167:3000/produtos');
        if (response.ok) {
          const data = await response.json();
          
          const iphoneIds = [4, 6, 23, 7, 25, 2, 1, 24];
          const iphoneProducts = data
            .filter((product: Product) => iphoneIds.includes(product.id))
            .sort((a: Product, b: Product) => 
              iphoneIds.indexOf(a.id) - iphoneIds.indexOf(b.id)
            );
          
          const adapterIds = [29, 28, 26, 30];
          const adapterProducts = data
            .filter((product: Product) => adapterIds.includes(product.id))
            .sort((a: Product, b: Product) => 
              adapterIds.indexOf(a.id) - adapterIds.indexOf(b.id)
            );
          
          setIphones(iphoneProducts);
          setAdapters(adapterProducts);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (preco: string | number) => {
    const numPrice = typeof preco === 'string' ? parseFloat(preco) : preco;
    return numPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-xl sm:text-2xl">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <motion.section 
          className="mt-16 flex flex-col items-center text-center"
          {...fadeInUp}
        >
          <motion.h1 
            className="text-6xl font-semibold bg-gradient-to-r from-orange-400 to-cyan-950 bg-clip-text text-transparent -mt-9"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            iPhone 16 Pro
          </motion.h1>
          <motion.p 
            className="text-2xl py-2 font-bold bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            O futuro cabe na palma da sua mão
          </motion.p>
        </motion.section>

        <motion.div 
          className="px-4 md:px-14 lg:px-20 flex flex-col items-center mb-8"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          <motion.img 
            src="/images/Home1.png"
            alt="iPhone"
            className="w-4/5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
            {...scaleIn}
            transition={{ delay: 0.5 }}
          />

          <motion.div 
            className="w-full mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.section 
              className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl py-10 my-5 mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {iphones.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={cardVariant}
                  className="h-full"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex flex-col h-full rounded-xl shadow-lg bg-white overflow-hidden transition-transform duration-500 hover:scale-105 cursor-pointer"
                  >
                    <div className="h-80 bg-gray-50 flex items-center justify-center p-4">
                      <img
                        src={product.imagem_url || "https://via.placeholder.com/400x300?text=iPhone"}
                        alt={product.nome}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300?text=iPhone";
                        }}
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2">{product.nome}</h3>
                      <p className="text-sm text-gray-600 mb-auto">{product.descricao || 'Produto Apple'}</p>
                      <p className="text-base font-bold text-green-600 mt-4">{formatPrice(product.preco)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.section>
          </motion.div>

          <motion.section 
            className="py-16"
            {...fadeInUp}
            transition={{ delay: 1.2 }}
          >
            <div className="grid grid-cols-2 gap-9 -mx-9">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <h1 className="text-3xl font-semibold mb-4">AirTag</h1>
                <p className="text-gray-700 text-2xl mb-8 -mx-1">
                  Prenda um nas chaves, coloque outro dentro da mochila. Se você perder um objeto, é só usar o app Buscar.
                </p>
                <img
                  src="https://www.apple.com/br/iphone/home/images/overview/essentials/airtag__furx99ax8rm2_large.jpg"
                  className="rounded-lg w-full"
                  alt="AirTag"
                />
              </motion.div>

              <motion.div 
                className="text-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <h1 className="text-4xl font-semibold mb-4">Acessórios para iPhone</h1>
                <p className="text-gray-700 text-2xl mb-7 -mx-1">
                  Descubra capas cheias de cor, adaptadores de energia USB-C, acessórios MagSafe e muito mais.
                </p>
                <img
                  src="https://www.apple.com/v/iphone/home/cb/images/overview/essentials/magsafe__dac2joyve8wi_large.jpg"
                  className="rounded-lg w-full"
                  alt="MagSafe"
                />
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            {...fadeIn}
            transition={{ delay: 1.8 }}
          >
            <h1 className="text-3xl font-semibold text-gray-600">
              Acessórios que mantêm seu iPhone sempre pronto.
            </h1>
          </motion.section>

          <motion.div 
            className="w-full mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <motion.section 
              className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl py-10 my-5 mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {adapters.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={cardVariant}
                  className="h-full"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex flex-col h-full rounded-xl shadow-lg bg-white overflow-hidden transition-transform duration-500 hover:scale-105 cursor-pointer"
                  >
                    <div className="h-80 bg-gray-50 flex items-center justify-center p-4">
                      <img
                        src={product.imagem_url || "https://via.placeholder.com/400x300?text=Acessório"}
                        alt={product.nome}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x300?text=Acessório";
                        }}
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2">{product.nome}</h3>
                      <p className="text-sm text-gray-600 mb-auto">{product.descricao || 'Acessório Apple'}</p>
                      <p className="text-base font-bold text-green-600 mt-4">{formatPrice(product.preco)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.section>
          </motion.div>
        </motion.div>
      </div>

      <div className="block lg:hidden">
        <div className="min-h-screen bg-white">
          <motion.section 
            className="py-8 px-4 text-center"
            {...fadeInUp}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-orange-400 to-cyan-950 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              iPhone 16 Pro
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              O futuro cabe na palma da sua mão
            </motion.p>
          </motion.section>

          <motion.div 
            className="px-4 mb-8"
            {...scaleIn}
            transition={{ delay: 0.3 }}
          >
            <img 
              src="/images/Home1.png"
              alt="iPhone"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.div 
            className="px-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {iphones.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={cardVariant}
                  className="h-full"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-64 sm:h-80 bg-gray-50 flex items-center justify-center p-3">
                      <img
                        src={product.imagem_url || "https://via.placeholder.com/300x200?text=iPhone"}
                        alt={product.nome}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=iPhone";
                        }}
                      />
                    </div>
                    
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-2">{product.nome}</h3>
                      <p className="text-xs text-gray-600 mb-auto line-clamp-1">{product.descricao || 'Produto Apple'}</p>
                      <p className="text-sm sm:text-base font-bold text-green-600 mt-2">{formatPrice(product.preco)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="px-4 mb-8 space-y-6"
            {...fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <h2 className="text-2xl font-semibold mb-3">AirTag</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                Prenda um nas chaves, coloque outro dentro da mochila. Se você perder um objeto, é só usar o app Buscar.
              </p>
              <img
                src="https://www.apple.com/br/iphone/home/images/overview/essentials/airtag__furx99ax8rm2_large.jpg"
                className="rounded-lg w-full"
                alt="AirTag"
              />
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                Acessórios para iPhone
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                Descubra capas cheias de cor, adaptadores de energia USB-C, acessórios MagSafe e muito mais.
              </p>
              <img
                src="https://www.apple.com/v/iphone/home/cb/images/overview/essentials/magsafe__dac2joyve8wi_large.jpg"
                className="rounded-lg w-full"
                alt="Acessórios MagSafe"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="px-4 mb-6"
            {...fadeIn}
            transition={{ delay: 1.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 text-center">
              Acessórios que mantêm seu iPhone sempre pronto.
            </h2>
          </motion.div>

          <motion.div 
            className="px-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {adapters.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={cardVariant}
                  className="h-full"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="h-64 sm:h-80 bg-gray-50 flex items-center justify-center p-3">
                      <img
                        src={product.imagem_url || "https://via.placeholder.com/300x200?text=Acessório"}
                        alt={product.nome}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=Acessório";
                        }}
                      />
                    </div>
                    
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-2">{product.nome}</h3>
                      <p className="text-xs text-gray-600 mb-auto line-clamp-1">{product.descricao || 'Acessório Apple'}</p>
                      <p className="text-sm sm:text-base font-bold text-green-600 mt-2">{formatPrice(product.preco)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
