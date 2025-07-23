"use client";

import { User } from '@/types/auth';

// Simulation d'une base de données avec localStorage
export const AuthService = {
  // Fonction simple de hachage (en production, utilisez une vraie librairie comme bcrypt)
  hashPassword: (password: string): string => {
    // Simple hachage pour la démo - en production, utilisez bcrypt ou similaire
    return btoa(password + 'salt-family-2024');
  },

  verifyPassword: (password: string, hash: string): boolean => {
    return AuthService.hashPassword(password) === hash;
  },

  // Initialiser le compte admin s'il n'existe pas
  initializeAdmin: () => {
    const users = AuthService.getUsers();
    const adminEmail = 'axel.c.e.jacquin@gmail.com';
    
    // Vérifier si le compte admin existe déjà
    let adminExists = users.find(u => u.email === adminEmail);
    
    // Si l'admin existe mais n'a pas de mot de passe (ancien format), le supprimer
    if (adminExists && !adminExists.password) {
      const userIndex = users.findIndex(u => u.email === adminEmail);
      users.splice(userIndex, 1);
      adminExists = undefined;
    }
    
    if (!adminExists) {
      const adminUser: User = {
        id: 'admin-' + Date.now().toString(),
        email: adminEmail,
        firstName: 'Axel',
        lastName: 'Jacquin',
        password: AuthService.hashPassword('admin123'), // Mot de passe par défaut
        status: 'approved',
        createdAt: new Date().toISOString(),
      };
      
      users.push(adminUser);
      AuthService.saveUsers(users);
      console.log('Compte admin créé/recréé avec succès');
    }
  },

  // Récupérer tous les utilisateurs
  getUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('familyUsers');
    return users ? JSON.parse(users) : [];
  },

  // Sauvegarder tous les utilisateurs
  saveUsers: (users: User[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('familyUsers', JSON.stringify(users));
  },

  // Inscription d'un nouvel utilisateur
  register: (email: string, firstName: string, lastName: string, password: string): User => {
    const users = AuthService.getUsers();
    
    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Un compte avec cet email existe déjà');
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      password: AuthService.hashPassword(password),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    AuthService.saveUsers(users);
    return newUser;
  },

  // Connexion
  login: (email: string, password: string): User | null => {
    const users = AuthService.getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Aucun compte trouvé avec cet email');
    }

    if (!AuthService.verifyPassword(password, user.password)) {
      throw new Error('Mot de passe incorrect');
    }

    if (user.status === 'pending') {
      throw new Error('Votre compte est en attente de validation');
    }

    if (user.status === 'rejected') {
      throw new Error('Votre compte a été rejeté');
    }

    return user;
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },

  // Sauvegarder l'utilisateur connecté
  setCurrentUser: (user: User | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  // Déconnexion
  logout: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('currentUser');
  },

  // Approuver un utilisateur (fonction admin)
  approveUser: (userId: string) => {
    const users = AuthService.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].status = 'approved';
      AuthService.saveUsers(users);
    }
  },

  // Rejeter un utilisateur (fonction admin)
  rejectUser: (userId: string) => {
    const users = AuthService.getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].status = 'rejected';
      AuthService.saveUsers(users);
    }
  },

  // Récupérer les utilisateurs en attente
  getPendingUsers: (): User[] => {
    return AuthService.getUsers().filter(u => u.status === 'pending');
  },

  // Fonction pour effacer toutes les données (utile pour les tests)
  clearAllData: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('familyUsers');
    localStorage.removeItem('currentUser');
    console.log('Toutes les données ont été effacées');
  }
};
