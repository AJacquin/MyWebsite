"use client";

import React, { useState, useEffect } from 'react';
import { SecureAuthService } from '@/services/secureAuth';
import { User } from '@/types/auth';
import ChangePassword from './ChangePassword';

interface UserManagementProps {
  currentUser: User;
  onLogout: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await SecureAuthService.getUsers();
      setUsers(allUsers);
      setPendingUsers(allUsers.filter(u => u.status === 'pending'));
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await SecureAuthService.approveUser(userId);
      loadUsers();
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await SecureAuthService.rejectUser(userId);
      loadUsers();
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
    }
  };

  const handlePromoteToAdmin = async (userId: string) => {
    try {
      await SecureAuthService.promoteToAdmin(userId);
      loadUsers();
    } catch (error) {
      console.error('Erreur lors de la promotion:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureAuthService.logout();
      onLogout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      onLogout(); // Forcer la déconnexion même en cas d'erreur
    }
  };

  const isAdmin = currentUser.email === 'axel.c.e.jacquin@gmail.com'; // Email admin

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Bonjour, {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Compte: {currentUser.email}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowChangePassword(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Changer le mot de passe
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowAdmin(!showAdmin)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {showAdmin ? 'Masquer' : 'Gestion'} des utilisateurs
            </button>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {isAdmin && showAdmin && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Gestion des utilisateurs
          </h3>

          {pendingUsers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
                Demandes en attente ({pendingUsers.length})
              </h4>
              <div className="space-y-2">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {user.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Inscrit le: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Rejeter
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tous les utilisateurs ({users.length})
            </h4>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                >
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : user.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {user.status === 'approved' ? 'Approuvé' : 
                       user.status === 'pending' ? 'En attente' : 'Rejeté'}
                    </span>
                    {user.isAdmin && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Admin
                      </span>
                    )}
                    {user.status === 'approved' && !user.isAdmin && (
                      <button
                        onClick={() => handlePromoteToAdmin(user.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        Promouvoir Admin
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de changement de mot de passe */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default UserManagement;
