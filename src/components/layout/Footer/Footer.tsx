import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function Footer() {
  return (
    <>
      <div className="hidden lg:block">
        <motion.footer 
          className="bg-white text-black py-16"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full px-4 md:px-16 lg:px-20">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-16"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={cardVariant} className="space-y-6">
                <div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent mb-3">
                    iPhone Store
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    Onde inovação encontra simplicidade. Explore o futuro da tecnologia.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={cardVariant} className="flex flex-col items-start">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">Conecte-se conosco</h3>
                  <div className="flex gap-3">
                    <Link
                      to="https://www.linkedin.com/in/joao-vitor-pereira-0b0275377/"
                      className="w-14 h-14 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-linkedin-fill text-gray-600 group-hover:text-white text-xl transition-colors duration-300"></i>
                    </Link>
                    
                    <Link
                      to="https://github.com/Devjv2007"
                      className="w-14 h-14 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ri-github-fill text-gray-600 group-hover:text-white text-xl transition-colors duration-300"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="pt-8 mt-16 flex flex-col md:flex-row justify-between items-center"
              {...fadeIn}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2025 iPhone Store. Todos os direitos reservados.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </div>
      <div className="block lg:hidden">
        <motion.footer 
          className="bg-white text-black "
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="w-full px-6 space-y-"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="text-left" variants={cardVariant}>
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent mb-4">
                iPhone Store
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Onde inovação encontra simplicidade. Explore o futuro da tecnologia.
              </p>
            </motion.div>
            <motion.div className="text-left" variants={cardVariant}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Conecte-se conosco</h3>
              <div className="flex gap-3">
                <Link
                  to="https://www.linkedin.com/in/joao-vitor-pereira-0b0275377/"
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-linkedin-fill text-gray-600 group-hover:text-white transition-colors duration-300"></i>
                </Link>
                
                <Link
                  to="https://github.com/Devjv2007"
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-900 rounded-xl flex items-center justify-center transition-all duration-300 group shadow-md hover:shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-github-fill text-gray-600 group-hover:text-white transition-colors duration-300"></i>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="text-left pt-6"
              variants={cardVariant}
            >
              <p className="text-sm text-gray-500">
                © 2025 iPhone Store. Todos os direitos reservados.
              </p>
            </motion.div>
          </motion.div>
        </motion.footer>
      </div>
    </>
  );
}
