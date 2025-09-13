import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
      staggerChildren: 0.1
    }
  }
};

const cardVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <motion.section 
  className="py-8 flex flex-col items-center text-center gap-6" 
  {...fadeInUp}
>
  <motion.h1 
    className="text-6xl font-semibold bg-gradient-to-r from-blue-600 to-gray-400 bg-clip-text text-transparent" 
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    iPhone 16 Pro
  </motion.h1>

  <motion.p 
    className="text-2xl font-bold bg-gradient-to-r -mt-5 from-gray-400 to-black bg-clip-text text-transparent"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    O futuro cabe na palma da sua mão
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.6 }}
  >
    <Link
      to="/iphone"
      className="bg-blue-600 text-white px-7 py-4 rounded-full hover:scale-105 transition-all duration-300 hover:bg-blue-300" 
    >
      Saiba mais
    </Link>
  </motion.div>
</motion.section>


        <motion.div 
          className="px-4 md:px-14 lg:px-20 items-center mb-8 py-10"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          <motion.img
            src="https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-lineup-geo-240909_big.jpg.large.jpg"
            alt="iPhone"
            className="w-full -mt-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
            {...scaleIn}
            transition={{ delay: 0.4 }}
          />

          <motion.section 
            className="mt-40 px-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { to: "/ipad", src: "/images/storecard3.jpeg", alt: "iPad" },
                { to: "/iphone", src: "/images/storecard5.jpeg", alt: "iPhone" },
                { to: "/macbook", src: "/images/storecard2.jpeg", alt: "MacBook" },
                { to: "/iphone", src: "/images/storecard1.jpeg", alt: "iPhone" },
                { to: "/iphone", src: "/images/storecard4.jpeg", alt: "iPhone" },
                { to: "/watch", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-watch-ultra-202409_GEO_BR?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=QWhYaUFuRS9hTUliZ3N5RWVCV09vbHdYN09OOVhGMkJZZWFPTlJDYlZ0V3dHa0s2MVM1MjA3Rk1JVmM0V09XWXAwckMxbExydC8yeDhtUjlFVHdKVnRSR0liZklwWjJ2eGlOd1dxRHFuOXBXUlFlSndMQ3NSejVmRG8yQ3JOWWk", alt: "Apple Watch" }
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <Link to={item.to} className="inline-block">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.div>


<motion.section 
  className="py-8 flex flex-col items-center text-center gap-6"  
  {...fadeInUp}
>
  <motion.h1 
    className="text-6xl font-semibold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent"  
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    MacBook Pro
  </motion.h1>

  <motion.p 
    className="text-2xl font-bold bg-gradient-to-r -mt-5 from-gray-400 to-black bg-clip-text text-transparent"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    Leve no peso, gigante no desempenho
  </motion.p>

  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.6 }}
  >
    <Link
      to="/iphone"
      className="bg-blue-600 text-white px-7 py-4 rounded-full hover:scale-105 transition-all duration-300 hover:bg-blue-300" 
    >
      Saiba mais
    </Link>
  </motion.div>
</motion.section>
        

        <motion.section 
          className="py-12 flex flex-col items-center text-center"
          {...fadeIn}
          transition={{ delay: 1.5 }}
        >
          <motion.img
            src="/images/Apple-iPad-Pro-Magic-Keyboard-240507.jpg.large_2x.jpg"
            className="w-10/12 rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
            {...scaleIn}
            transition={{ delay: 1.7 }}
          />

          <motion.section 
            className="mt-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { to: "/macbook", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-card-40-macbook-air-202503?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=dzRRdVl2UHpmd3BrL2dpaGRDY2RKN3dnWXpNRUFSbE1veTFaYXZqWDhWZ2w2T29GWFRmcGlRaHRKa2ZZeG54SDRHeXB5TnVsU3R6Qjd0Y2JzbURyWE56dkQ1M2pkMXloY0FLTkxsc2xNQXArYWpGdS9XeFgvbS9ITnNYOEhYaG4", alt: "MacBook" },
                { to: "/macbook", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-card-40-macbookpro-14-16-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=dzRRdVl2UHpmd3BrL2dpaGRDY2RKL0tDcDdIN2J5MlRJbDZwdXNUam1wUDJ0SUdrYS9VNndoSUR6SjE2NTZ4Q3dzUlMrL0tMOEdKdERZZEhaV2pBNG5MYXhobkxkNHkydGdPaXdJd0ZJRmorbGwzUVNwZEFpcE1WQU1wNTVjU1c", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook3.jpg", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook5.jpg", alt: "MacBook" },
                { to: "/macbook", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-card-40-mac-mini-202410?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=MEl2WkNZRmkzTGhzejQ0SHE3b3FoNnQrZHdkUkkvM25CYTVJYWJQRk41QkMxQXc4S3pBZE5lUDJlTzVYSUYydFMwV0hhcmdVdXZzZ1NwTlFUaEgwTCthSGMrTVBBVlNQbW04TUlaTnlZU3c", alt: "MacBook" },
                { to: "/macbook", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-card-40-mac-studio-202503?wid=680&hei=528&fmt=jpeg&qlt=90&.v=MEl2WkNZRmkzTGhzejQ0SHE3b3FoeEhISXFsMjRaY2x5ZFpwbkptTldIN0RiOENhazh5Y0NacmRZMFN0dVNvZ3VUb3VPa2FUZVhQMFhDQnVBMWhwQTVjMVd2bWtPMTExa2NvemgyOElFUEE", alt: "MacBook" }
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <Link to={item.to} className="inline-block">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                    />
                  </Link>
                </motion.div>
              ))}
              <div></div>
            </motion.div>
          </motion.section>
        </motion.section>

        <motion.section 
          className="flex flex-col"
          {...fadeIn}
          transition={{ delay: 2.5 }}
        >
        </motion.section>
      </div>

      <div className="block lg:hidden">
        <div className="min-h-screen bg-white">
          <motion.section 
            className="py-8 px-4 text-center"
            {...fadeInUp}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-gray-400 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              iPhone 16 Pro
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent mb-6"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              O futuro cabe na palma da sua mão
            </motion.p>

            <motion.div
              {...scaleIn}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/iphone"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-colors font-semibold"
              >
                Saiba mais
              </Link>
            </motion.div>
          </motion.section>

          <motion.div 
            className="px-4 mb-8"
            {...scaleIn}
            transition={{ delay: 0.3 }}
          >
            <img
              src="https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/geo/Apple-iPhone-16-lineup-geo-240909_big.jpg.large.jpg"
              alt="iPhone"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.section 
            className="px-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { to: "/ipad", src: "/images/storecard3.jpeg", alt: "iPad" },
                { to: "/iphone", src: "/images/storecard5.jpeg", alt: "iPhone" },
                { to: "/macbook", src: "/images/storecard2.jpeg", alt: "MacBook" },
                { to: "/iphone", src: "/images/storecard1.jpeg", alt: "iPhone" },
                { to: "/iphone", src: "/images/storecard4.jpeg", alt: "iPhone" },
                { to: "/watch", src: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/store-card-40-watch-ultra-202409_GEO_BR?wid=800&hei=1000&fmt=jpeg&qlt=90&.v=QWhYaUFuRS9hTUliZ3N5RWVCV09vbHdYN09OOVhGMkJZZWFPTlJDYlZ0V3dHa0s2MVM1MjA3Rk1JVmM0V09XWXAwckMxbExydC8yeDhtUjlFVHdKVnRSR0liZklwWjJ2eGlOd1dxRHFuOXBXUlFlSndMQ3NSejVmRG8yQ3JOWWk", alt: "Apple Watch" }
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <Link to={item.to} className="block">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-xl shadow-md hover:shadow-lg transition-shadow" 
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            className="py-8 px-4 text-center"
            {...fadeInUp}
            transition={{ delay: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              MacBook Pro
            </motion.h2>

            <motion.p 
              className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-400 to-black bg-clip-text text-transparent mb-6"
              {...fadeIn}
              transition={{ delay: 1.2 }}
            >
              Leve no peso, gigante no desempenho
            </motion.p>

            <motion.div
              {...scaleIn}
              transition={{ delay: 1.4 }}
            >
              <Link
                to="/macbook"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-colors font-semibold"
              >
                Saiba mais
              </Link>
            </motion.div>
          </motion.section>

          <motion.div 
            className="px-4 mb-8"
            {...scaleIn}
            transition={{ delay: 1.1 }}
          >
            <img
              src="/images/Apple-iPad-Pro-Magic-Keyboard-240507.jpg.large_2x.jpg"
              alt="iPad Pro"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>

          <motion.section 
            className="px-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { to: "/macbook", src: "/images/macbook1.jpg", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook2.jpg", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook3.jpg", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook5.jpg", alt: "MacBook" },
                { to: "/macbook", src: "/images/macbook4.jpeg", alt: "MacBook" },
                { to: "/macbook", src: "https://aafa7ada.delivery.rocketcdn.me/wp-content/uploads/2023/09/apple-macbook-air-2022-m2-cinza-espacial.jpg", alt: "MacBook" }
              ].map((item, index) => (
                <motion.div key={index} variants={cardVariant}>
                  <Link to={item.to} className="block">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-48 h-48 mx-auto sm:h-40 object-cover"
                    />
                  </Link>
                </motion.div>
              ))}
              <div></div>
            </motion.div>
          </motion.section>

          <motion.section 
            className="px-4 mb-8"
            {...fadeIn}
            transition={{ delay: 1.8 }}
          >
          </motion.section>
        </div>
      </div>
    </>
  );
}
