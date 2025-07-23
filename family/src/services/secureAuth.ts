"use client";

import { User } from '@/types/auth';

export const SecureAuthService = {
  // Connexion
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'login', email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }

    return data.user;
  },

  // Inscription
  register: async (email: string, firstName: string, lastName: string, password: string): Promise<User> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'register', email, firstName, lastName, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur d\'inscription');
    }

    return data.user;
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'logout' }),
    });
  },

  // Récupérer tous les utilisateurs (admin uniquement)
  getUsers: async (): Promise<User[]> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'getUsers' }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la récupération des utilisateurs');
    }

    return data.users;
  },

  // Approuver un utilisateur
  approveUser: async (userId: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'approveUser', userId }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'approbation');
    }
  },

  // Rejeter un utilisateur
  rejectUser: async (userId: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'rejectUser', userId }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors du rejet');
    }
  },

  // Récupérer les utilisateurs en attente
  getPendingUsers: async (): Promise<User[]> => {
    const users = await SecureAuthService.getUsers();
    return users.filter(u => u.status === 'pending');
  },

  // Changer le mot de passe
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'changePassword', currentPassword, newPassword }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors du changement de mot de passe');
    }
  },

  // Promouvoir un utilisateur en admin
  promoteToAdmin: async (userId: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'promoteToAdmin', userId }),
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la promotion');
    }
  },

  // Mot de passe oublié
  forgotPassword: async (email: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'forgotPassword', email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la demande de réinitialisation');
    }
  },

  // Réinitialiser le mot de passe
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'resetPassword', token, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la réinitialisation du mot de passe');
    }
  },

  // Vérifier l'email
  verifyEmail: async (token: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'verifyEmail', token }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de la vérification de l\'email');
    }
  },

  // Renvoyer la vérification d'email
  resendVerification: async (email: string): Promise<void> => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'resendVerification', email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur lors de l\'envoi de la vérification');
    }
  }
};
