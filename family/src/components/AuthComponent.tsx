"use client";

import React, { useState } from 'react';
import { SecureAuthService } from '@/services/secureAuth';
import { User } from '@/types/auth';

interface AuthComponentProps {
  onLogin: (user: User) => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Connexion
        const user = await SecureAuthService.login(email, password);
        if (user) {
          onLogin(user);
        }
      } else {
        // Inscription
        const newUser = await SecureAuthService.register(email, firstName, lastName, password);
        setSuccess('Votre compte a été créé et est en attente de validation. Vous recevrez une notification une fois approuvé.');
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await SecureAuthService.forgotPassword(email);
      setSuccess('Un lien de réinitialisation a été envoyé à votre email (vérifiez la console)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Site Web Familial
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Accédez à l'arbre généalogique de notre famille
          </p>
        </div>

        {showForgotPassword ? (
          // Formulaire de mot de passe oublié
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Mot de passe oublié
            </h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                  <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Envoi...' : 'Envoyer'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Formulaire de connexion/inscription normal
          <div>

        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`flex-1 py-2 px-4 text-center ${
                isLogin
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
            >
              Connexion
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${
                !isLogin
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
            >
              Inscription
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
              minLength={6}
            />
            {!isLogin && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 6 caractères
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
              <p className="text-green-600 dark:text-green-400 text-sm">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
          </button>

          {isLogin && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}
        </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? (
              <p>
                Pas encore de compte ?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Inscrivez-vous
                </button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Connectez-vous
                </button>
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Note :</strong> Tous les nouveaux comptes doivent être approuvés manuellement avant d'accéder à l'arbre généalogique.
            </p>
            <button
              onClick={() => {
                setEmail('axel.c.e.jacquin@gmail.com');
                setPassword('admin123');
                setIsLogin(true);
              }}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              [Debug] Remplir avec admin
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
