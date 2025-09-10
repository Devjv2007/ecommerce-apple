import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  total: number;
  subtotal: number;
  freteSelecionado: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess, 
  total,
  subtotal,
  freteSelecionado
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix'>('credit');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    installments: 1
  });
  const [isProcessing, setIsProcessing] = useState(false);


  useEffect(() => {
    if (paymentMethod === 'pix' && isProcessing) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paymentMethod, isProcessing, onClose, onPaymentSuccess]);


  const handlePixPayment = () => {
    setIsProcessing(true);
  };


  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 2500);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim()
      .slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 5);
  };

  const detectCardBrand = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    return 'Cartão';
  };

  const isFormValid = () => {
    if (paymentMethod === 'pix') return true;
    return cardData.number.length >= 19 && 
           cardData.name.length >= 3 && 
           cardData.expiry.length === 5 && 
           cardData.cvv.length >= 3;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800"> Pagamento</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl font-light leading-none"
          >
          </button>
        </div>

        <div className="p-6 space-y-6">

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
            <h3 className="font-semibold text-gray-700 mb-3"> Resumo do Pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete ({freteSelecionado?.transportadora}):</span>
                <span>R$ {freteSelecionado?.valor.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-green-600">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4"> Método de Pagamento</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod('credit')}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  paymentMethod === 'credit' 
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src="https://images.seeklogo.com/logo-png/43/1/bandeiras-de-cartao-de-credito-logo-png_seeklogo-431666.png"
                />
                <div className="font-medium text-sm">Cartão</div>
                <div className="text-xs text-gray-500">Crédito</div>
              </button>
              
              <button
                onClick={() => setPaymentMethod('debit')}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  paymentMethod === 'debit' 
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src="https://neofeed.com.br/wp-content/uploads/2022/03/cartao-XP.jpg"
                  className="py-5"
                />
                <div className="font-medium text-sm">Cartão</div>
                <div className="text-xs text-gray-500">Débito</div>
              </button>
              
              <button
                onClick={() => {
                  setPaymentMethod('pix');
                  handlePixPayment(); 
                }}
                className={`p-4 border-2 rounded-xl text-center transition-all duration-200 ${
                  paymentMethod === 'pix' 
                    ? 'border-green-500 bg-green-50 text-green-700 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src="https://guiadecarreira.com/wp-content/uploads/2025/01/pix-banco-central-brasil-logo-png_seeklogo-500502.png"
                />
                <div className="font-medium text-sm">PIX</div>
                <div className="text-xs text-gray-500">Instantâneo</div>
              </button>
            </div>
          </div>


          {paymentMethod !== 'pix' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   Número do Cartão
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData({
                      ...cardData, 
                      number: formatCardNumber(e.target.value)
                    })}
                    placeholder="0000 0000 0000 0000"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-mono"
                  />
                  {cardData.number && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600">
                      {detectCardBrand(cardData.number)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                   Nome no Cartão
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({
                    ...cardData, 
                    name: e.target.value.toUpperCase()
                  })}
                  placeholder="NOME COMPLETO COMO ESTÁ NO CARTÃO"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Validade
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({
                      ...cardData, 
                      expiry: formatExpiry(e.target.value)
                    })}
                    placeholder="MM/AA"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     CVV
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({
                      ...cardData, 
                      cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                    })}
                    placeholder="000"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono"
                  />
                </div>
              </div>

              {paymentMethod === 'credit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                     Parcelamento
                  </label>
                  <select
                    value={cardData.installments}
                    onChange={(e) => setCardData({
                      ...cardData, 
                      installments: Number(e.target.value)
                    })}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(installment => (
                      <option key={installment} value={installment}>
                        {installment}x de R$ {(total / installment).toFixed(2).replace('.', ',')}
                        {installment === 1 ? ' à vista' : ` (Total: R$ ${total.toFixed(2).replace('.', ',')})`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (

            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-3">
                   Pagamento via PIX
                </h3>
                
                <img
                  src="https://www.activebarcode.com/pt/codes/imagesmainexample/qrcode.gif"
                  alt="QR Code PIX"
                  className="mx-auto w-full border-2 border-gray-200 rounded-xl"
                />
                
                <div className="bg-white rounded-lg p-4 border mt-4">
                  <div className="text-sm text-gray-500">Valor a pagar:</div>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                {isProcessing ? (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                      <span className="text-green-700 font-semibold">Aguardando pagamento...</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Escaneie o QR Code no seu aplicativo bancário
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 mt-4">
                    Escaneie o QR Code no seu aplicativo bancário para pagar
                  </p>
                )}
              </div>
            </div>
          )}


          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              disabled={isProcessing}
            >
              Cancelar
            </button>
            

            {paymentMethod !== 'pix' && (
              <button
                onClick={handleCardPayment}
                disabled={isProcessing || !isFormValid()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 font-medium shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </>
                ) : (
                  ` Pagar R$ ${total.toFixed(2).replace('.', ',')}`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
