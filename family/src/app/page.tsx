"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import FamilyTree from "@/components/FamilyTree";
import FamilyStats from "@/components/FamilyStats";
import AuthComponent from "@/components/AuthComponent";
import UserManagement from "@/components/UserManagement";
import { sampleFamilyData } from "@/data/familyData";
import { SecureAuthService } from "@/services/secureAuth";
import { User } from "@/types/auth";
import PageLayout from '@/components/PageLayout';

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await SecureAuthService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, afficher le formulaire d'authentification
  if (!currentUser) {
    return (
      <PageLayout>
        <AuthComponent onLogin={handleLogin} />
      </PageLayout>
    );
  }

  // Si l'utilisateur est connecté, afficher l'arbre généalogique
  return (
    <PageLayout>
      <main className="max-w-7xl mx-auto">
        <UserManagement currentUser={currentUser} onLogout={handleLogout} />
        
        <div className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Site Web Familial
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Découvrez l'histoire de notre famille à travers cet arbre généalogique interactif
          </p>
        </div>
        
        {/* Arbre généalogique */}
        <FamilyTree familyData={sampleFamilyData} />
        
        {/* Statistiques de la famille */}
        <FamilyStats familyData={sampleFamilyData} />
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Vous pouvez personnaliser cet arbre généalogique en modifiant les données dans le fichier familyData.ts
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </PageLayout>
  );
}
