import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

interface ProductType {
  id: number;
  nome: string;
  descricao?: string;
  preco: string | number;
  imagem_url: string | null;
  imagem_2?: string | null;
  imagem_3?: string | null;
  imagem_4?: string | null;
  imagem_5?: string | null;
}

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const { adicionarAoCarrinho } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://ecommerce-apple.onrender.com/produtos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          setMainImage(data.imagem_url || "");
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const formatPrice = (preco: string | number) => {
    const numPrice = typeof preco === 'string' ? parseFloat(preco) : preco;
    return numPrice.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const imagens = product
    ? [
        product.imagem_url,
        product.imagem_2,
        product.imagem_3,
        product.imagem_4,
        product.imagem_5,
      ].filter(Boolean)
    : [];

  const handleAdicionarCarrinho = () => {
    if (product) {
      adicionarAoCarrinho({
        id: product.id,
        nome: product.nome,
        preco: typeof product.preco === 'string' ? parseFloat(product.preco) : product.preco,
        imagem_url: product.imagem_url ?? '',
      });
      
      toast.success(` ${product.nome} adicionado ao carrinho!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleComprar = () => {
    if (product) {
      adicionarAoCarrinho({
        id: product.id,
        nome: product.nome,
        preco: typeof product.preco === 'string' ? parseFloat(product.preco) : product.preco,
        imagem_url: product.imagem_url ?? '',
      });
      
      toast.success(`Redirecionando a Pagina de Compra`, {
        position: "top-right",
        autoClose: 2000,
        onClose: () => {
          window.location.href = '/cart';
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-xl sm:text-2xl">Carregando produto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl mb-4">Produto não encontrado</h2>
          <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10 lg:pb-10">
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <section>
          <div className="mx-60 py-16">
            <div className="w-80 h-96 bg-white overflow-hidden">
              <img
                src={mainImage}
                className="w-full h-full object-contain"
                alt={product.nome}
              />
            </div>
          </div>
        </section>

        <section className="flex justify-end -my-96 mx-20 relative z-20">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 gap-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent -mt-9">
                {product.nome}
              </h1>

              <div className="flex flex-row gap-10">
              </div>
            </div>

            <div className="ml-1 flex flex-col -mt-3">
              <h1 className="py-2 text-2xl font-bold bg-gradient-to-r from-gray-600 to-green-500 bg-clip-text text-transparent">
                A partir de {formatPrice(product.preco)}
              </h1>
              <p className="py-1 font-semibold">
                ou 12x de R${" "}
                {product.preco
                  ? (Number(product.preco) / 12).toFixed(2).replace(".", ",")
                  : ""}
              </p>

              <div className="flex flex-row">
                <button
                  className="relative z-50 bg-green-600 text-white w-60 py-4 rounded-lg hover:scale-105 transition-transform duration-300 hover:bg-green-500 mx-2"
                  onClick={handleComprar}
                >
                  Comprar
                </button>

                <button
                  className="relative z-50 bg-black text-white w-60 py-4 rounded-lg hover:bg-gray-900 hover:scale-105 transition-transform duration-300"
                  onClick={handleAdicionarCarrinho}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>

            <ul className="py-5 text-2xl text-gray-600 bglist-none space-y-1">
              <li><span className="text-black ri-truck-line"></span> Frete grátis para todo o Brasil</li>
              <li><span className=" text-black ri-shield-line"></span> Garantia de 1 ano</li>
              <li><span className="text-black ri-arrow-left-right-line"></span> Troca em até 7 dias</li>
            </ul>
          </div>
        </section>

        <section className="mx-10 relative -top-49">
          <div className="flex flex-col space-y-2" style={{ minHeight: '320px' }}>
            {imagens.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImage(img!)}
                className="w-20 h-20 cursor-pointer relative"
                style={{ zIndex: 50 + idx }}
              >
                <img
                  src={img!}
                  className=" -mt-14 w-20 h-20 object-contain bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border"
                  alt={`thumb ${idx + 1}`}
                  onError={(e) => {
                    e.currentTarget.parentElement!.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </section>  
      </div>
      <div className="block lg:hidden px-4 pb-20 -mb-20">
        <div className="w-full aspect-square bg-white rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            src={mainImage}
            className="w-full h-full object-contain"
            alt={product.nome}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8" style={{ minHeight: '64px' }}>
          {imagens.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setMainImage(img!)}
              className="flex-shrink-0 w-16 h-16 cursor-pointer"
            >
              <img
                src={img!}
                className="w-full h-full object-contain bg-white rounded-lg shadow-md border"
                alt={`thumb ${idx + 1}`}
                onError={(e) => {
                  e.currentTarget.parentElement!.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-100 bg-clip-text text-transparent">
            {product.nome}
          </h1>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-green-500 bg-clip-text text-transparent">
              A partir de {formatPrice(product.preco)}
            </h2>
            <p className="text-sm text-gray-600 font-semibold">
              ou 12x de R${" "}
              {product.preco
                ? (Number(product.preco) / 12).toFixed(2).replace(".", ",")
                : ""}
            </p>
          </div>

          <div className="space-y-3">
            <button
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-500 font-semibold text-lg"
              onClick={handleComprar}
            >
              Comprar
            </button>

            <button
              className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 font-semibold text-lg"
              onClick={handleAdicionarCarrinho}
            >
              Adicionar ao Carrinho
            </button>
          </div>

          <ul className="text-gray-500 font-semibold space-y-3 pt-4">
            <li className="flex items-center gap-3">
              <span className="text-black ri-truck-line text-lg"></span>
              Frete grátis para todo o Brasil
            </li>
            <li className="flex items-center gap-3">
              <span className="text-black ri-shield-line text-lg"></span>
              Garantia de 1 ano
            </li>
            <li className="flex items-center gap-3">
              <span className="text-black ri-arrow-left-right-line text-lg"></span>
              Troca em até 7 dias
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
