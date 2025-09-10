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
          className="text-black py-12 px-4 md:px-14 lg:px-20"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={cardVariant}>
                <h3 className="text-lg font-semibold mb-4">Sobre</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Sed blandit mauris eget
                  turpis hendrerit facilisis.
                </p>
              </motion.div>

              <motion.div variants={cardVariant}>
                <h3 className="text-lg font-semibold mb-4">Links</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Política de Privacidade</li>
                  <li>Termos de Uso</li>
                  <li>Suporte Técnico</li>
                  <li>Central de Ajuda</li>
                </ul>
              </motion.div>

              <motion.div variants={cardVariant}>
                <h3 className="text-lg font-semibold mb-4">Contato</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>contato@exemplo.com</p>
                  <p>(11) 99999-9999</p>
                  <p>Presidente Prudente, SP</p>
                </div>
              </motion.div>

              <motion.div variants={cardVariant}>
                <h3 className="text-lg font-semibold mb-4">Redes</h3>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Facebook</p>
                  <p>Instagram</p>
                  <p>LinkedIn</p>
                  <p>GitHub</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="border-t border-gray-700 pt-6 text-center"
              {...fadeIn}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-500">
                © 2025 Meu Portfólio. Todos os direitos reservados.
              </p>
            </motion.div>
          </div>
        </motion.footer>
      </div>


      <div className="block lg:hidden">
        <motion.footer 
          className="bg-gray-50 text-black py-8 px-4"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="text-center" variants={cardVariant}>
              <h3 className="text-lg font-semibold mb-2">Sobre</h3>
              <p className="text-gray-600 text-sm">
                Lorem ipsum dolor sit amet consectetur. Sed blandit mauris eget turpis hendrerit facilisis.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4 text-center" variants={cardVariant}>
              <div>
                <h4 className="font-semibold mb-2">Links</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Política de Privacidade</p>
                  <p>Termos de Uso</p>
                  <p>Suporte</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Contato</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>contato@exemplo.com</p>
                  <p>(11) 99999-9999</p>
                  <p>Presidente Prudente, SP</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="text-center border-t border-gray-300 pt-4" variants={cardVariant}>
              <p className="text-xs text-gray-500">
                © 2025 Meu Portfólio. Todos os direitos reservados.
              </p>
            </motion.div>
          </motion.div>
        </motion.footer>
      </div>
    </>
  );
}
