import React, { useState } from 'react';
import { Icon } from './Icon';
import { t, Language } from '../utils/translations';
import { api } from '../services/api';
import { User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (userData: User) => void;
  language: Language;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = isLogin 
        ? await api.login({ email, password })
        : await api.register({ name, email, password }); // Include name in register request

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      if (data.user) {
        onLogin(data.user); 
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-subtle-fade">
      <div className="bg-white dark:bg-stone-900 rounded-[2rem] shadow-2xl max-w-md w-full p-8 md:p-10 relative overflow-hidden ring-1 ring-black/5">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <Icon name="close" />
        </button>
        
        <div className="text-center mb-10">
          <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center">
             <img src="/images/logo.png" alt="IyalTamil" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-bold font-tamil mb-2 text-stone-900 dark:text-white">
            {isLogin ? t('loginRegister', language) : t('signup', language)}
          </h2>
          <p className="text-stone-500 dark:text-stone-400 font-medium">
            {isLogin ? t('loginPrompt', language) : t('registerPrompt', language)}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('namePlaceholder', language) || 'Name'}
                className="w-full px-6 py-4 bg-stone-100 border border-transparent rounded-[8px] focus:ring-2 focus:ring-zen-green/20 focus:border-zen-green focus:bg-white text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-white dark:focus:ring-zen-green/30 transition-all font-medium outline-none" 
              />
            </div>
          )}
          <div>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder', language)}
              className="w-full px-6 py-4 bg-stone-100 border border-transparent rounded-[8px] focus:ring-2 focus:ring-zen-green/20 focus:border-zen-green focus:bg-white text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-white dark:focus:ring-zen-green/30 transition-all font-medium outline-none" 
            />
          </div>
          <div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password', language)}
              className="w-full px-6 py-4 bg-stone-100 border border-transparent rounded-[8px] focus:ring-2 focus:ring-zen-green/20 focus:border-zen-green focus:bg-white text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-white dark:focus:ring-zen-green/30 transition-all font-medium outline-none" 
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm font-bold text-center animate-subtle-fade">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full px-6 py-4 bg-zen-green text-white font-bold rounded-[8px] hover:bg-zen-lightGreen shadow-xl shadow-zen-green/20 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLogin ? t('loginRegister', language) : t('signup', language)}
          </button>
        </form>

        <div className="pt-4 text-center">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-stone-500 dark:text-stone-400 text-sm font-semibold hover:text-zen-green transition-colors"
          >
            {isLogin ? t('noAccount', language) : t('hasAccount', language)} 
            <span className="text-zen-green ml-1 underline decoration-zen-green/30 underline-offset-4">
              {isLogin ? t('signup', language) : t('loginRegister', language)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};