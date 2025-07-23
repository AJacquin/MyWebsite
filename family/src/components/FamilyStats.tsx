"use client";

import React from 'react';
import { Person } from '@/data/familyData';

interface FamilyStatsProps {
  familyData: Person;
}

const FamilyStats: React.FC<FamilyStatsProps> = ({ familyData }) => {
  const countAllMembers = (person: Person): number => {
    if (!person.children || person.children.length === 0) return 1;
    return 1 + person.children.reduce((sum, child) => sum + countAllMembers(child), 0);
  };

  const countGenerations = (person: Person, level: number = 1): number => {
    if (!person.children || person.children.length === 0) return level;
    return Math.max(...person.children.map(child => countGenerations(child, level + 1)));
  };

  const countSpouses = (person: Person): number => {
    let count = person.spouse ? 1 : 0;
    if (person.children) {
      count += person.children.reduce((sum, child) => sum + countSpouses(child), 0);
    }
    return count;
  };

  const totalMembers = countAllMembers(familyData);
  const totalGenerations = countGenerations(familyData);
  const totalSpouses = countSpouses(familyData);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Membres de la famille
        </h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {totalMembers}
        </p>
      </div>
      
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
          Générations
        </h3>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
          {totalGenerations}
        </p>
      </div>
      
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
          Conjoints
        </h3>
        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
          {totalSpouses}
        </p>
      </div>
    </div>
  );
};

export default FamilyStats;
