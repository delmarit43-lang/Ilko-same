import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, CreditCard, Send, CheckCircle, ShieldCheck, DollarSign, ArrowLeft, Loader2, Wallet } from 'lucide-react';

const Payments = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('evc');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulating API call to payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2500);
  };

  const resetForm = () => {
    setStep(1);
    setPhoneNumber('');
    setAmount('');
    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'evc', name: 'EVC Plus', color: '#10b981', logo: '📱' },
    { id: 'zaad', name: 'ZAAD', color: '#3b82f6', logo: '💳' },
    { id: 'sahal', name: 'Sahal', color: '#f59e0b', logo: '⚡' },
  ];

  return (
    <div className="payments-page" style={{ 
      padding: '4rem 1rem', 
      minHeight: '90vh', 
      background: 'linear-gradient(135deg, var(--background) 0%, var(--surface-alt) 100%)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            background: 'var(--surface)', 
            borderRadius: '2.5rem', 
            padding: '3rem', 
            boxShadow: 'var(--shadow-2xl)',
            border: '1px solid var(--border)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background element */}
          <div style={{ 
            position: 'absolute', top: '-50px', right: '-50px', 
            width: '150px', height: '150px', 
            background: 'var(--primary-light)', 
            borderRadius: '50%', opacity: 0.5, filter: 'blur(40px)', zIndex: 0 
          }}></div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <div style={{ 
                    width: '70px', height: '70px', background: 'var(--primary-light)', 
                    borderRadius: '1.5rem', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 1.25rem' 
                  }}>
                    <Wallet size={35} />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Make a Payment</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Enter your details to complete the transaction</p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {paymentMethods.map((m) => (
                    <button 
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      style={{
                        flex: 1, padding: '1rem 0.5rem', borderRadius: '1.25rem', border: '2px solid',
                        borderColor: method === m.id ? m.color : 'var(--border)',
                        background: method === m.id ? `${m.color}10` : 'none',
                        fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                        color: method === m.id ? m.color : 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem'
                      }}
                    >
                      <span style={{ fontSize: '1.25rem' }}>{m.logo}</span>
                      {m.name}
                    </button>
                  ))}
                </div>

                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                      Mobile Number
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Smartphone size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="tel" 
                        required 
                        placeholder="61xxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ 
                          width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.25rem', 
                          borderRadius: '1.25rem', border: '1.5px solid var(--border)', 
                          background: 'var(--surface-alt)', color: 'var(--text)',
                          fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
                      Amount to Pay ($)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <DollarSign size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="number" 
                        required 
                        placeholder="0.00"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{ 
                          width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.25rem', 
                          borderRadius: '1.25rem', border: '1.5px solid var(--border)', 
                          background: 'var(--surface-alt)', color: 'var(--text)',
                          fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn btn-primary" 
                    style={{ 
                      padding: '1.1rem', borderRadius: '1.25rem', fontSize: '1.05rem', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      marginTop: '1rem', boxShadow: '0 10px 20px -5px var(--primary-light)'
                    }}
                  >
                    {isProcessing ? (
                      <><Loader2 size={20} className="spinner" style={{ animation: 'spin 1.5s linear infinite' }} /> Processing...</>
                    ) : (
                      <><Send size={18} /> Pay via {paymentMethods.find(p => p.id === method).name}</>
                    )}
                  </button>
                </form>

                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} style={{ color: '#10b981' }} />
                  Secure 256-bit SSL encrypted payment
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '1rem 0' }}
              >
                <div style={{ 
                  width: '100px', height: '100px', background: '#10b98115', 
                  borderRadius: '50%', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: '#10b981', margin: '0 auto 2rem' 
                }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                  >
                    <CheckCircle size={60} />
                  </motion.div>
                </div>
                
                <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.75rem' }}>Payment Successful!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                  Thank you! Your payment of <strong>${amount}</strong> has been received via {method.toUpperCase()}. 
                  A confirmation message has been sent to <strong>{phoneNumber}</strong>.
                </p>

                <div style={{ 
                  background: 'var(--surface-alt)', 
                  padding: '1.5rem', 
                  borderRadius: '1.5rem', 
                  marginBottom: '2.5rem',
                  border: '1px dashed var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Transaction ID:</span>
                    <span style={{ fontWeight: 600 }}>#TRX-{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                    <span style={{ fontWeight: 600 }}>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <button 
                  onClick={resetForm} 
                  className="btn btn-primary" 
                  style={{ padding: '0.9rem 2.5rem', borderRadius: '1.1rem' }}
                >
                  Back to Services
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};

export default Payments;
