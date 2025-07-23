"use client";

import React, { useState } from 'react';

interface Person {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  spouse?: string;
  children?: Person[];
}

interface FamilyTreeProps {
  familyData: Person;
}

const PersonCard: React.FC<{ person: Person; onClick?: () => void }> = ({ person, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-md min-w-[200px] text-center hover:shadow-lg transition-all duration-200 hover:scale-105 transform cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
        {person.name}
      </h3>
      {person.birth && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Né(e): {person.birth}
        </p>
      )}
      {person.death && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Décédé(e): {person.death}
        </p>
      )}
      {person.spouse && (
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
          Époux/Épouse: {person.spouse}
        </p>
      )}
    </div>
  );
};

const FamilyTreeNode: React.FC<{ person: Person; level: number; onPersonClick: (person: Person) => void }> = ({ 
  person, 
  level,
  onPersonClick 
}) => {
  const hasChildren = person.children && person.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <PersonCard person={person} onClick={() => onPersonClick(person)} />
      
      {hasChildren && (
        <>
          {/* Ligne verticale principale vers les enfants */}
          <div className="w-0.5 h-12 bg-gray-600 dark:bg-gray-400"></div>
          
          {/* Conteneur des connexions horizontales */}
          <div className="relative">
            {person.children!.length > 1 && (
              <>
                {/* Ligne horizontale principale */}
                <div 
                  className="h-0.5 bg-gray-600 dark:bg-gray-400 absolute"
                  style={{ 
                    width: `${(person.children!.length - 1) * 280}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '0px'
                  }}
                />
                
                {/* Lignes verticales vers chaque enfant */}
                {person.children!.map((_, index) => (
                  <div
                    key={index}
                    className="w-0.5 h-4 bg-gray-600 dark:bg-gray-400 absolute"
                    style={{
                      left: `${index * 280 - (person.children!.length - 1) * 140}px`,
                      transform: 'translateX(-50%)',
                      top: '0px'
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Si un seul enfant, ligne verticale simple */}
            {person.children!.length === 1 && (
              <div className="w-0.5 h-4 bg-gray-600 dark:bg-gray-400 mx-auto"></div>
            )}
          </div>
          
          {/* Conteneur des enfants */}
          <div className="flex gap-8 mt-4">
            {person.children!.map((child, index) => (
              <div key={child.id} className="relative">
                <FamilyTreeNode person={child} level={level + 1} onPersonClick={onPersonClick} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const FamilyTree: React.FC<FamilyTreeProps> = ({ familyData }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const countDescendants = (person: Person): number => {
    if (!person.children || person.children.length === 0) return 0;
    return person.children.length + person.children.reduce((sum, child) => sum + countDescendants(child), 0);
  };

  return (
    <div className="w-full overflow-x-auto bg-gray-50 dark:bg-gray-900 p-8 rounded-lg">
      <div className="min-w-max">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Arbre Généalogique
        </h2>
        <div className="flex justify-center">
          <FamilyTreeNode person={familyData} level={0} onPersonClick={handlePersonClick} />
        </div>
      </div>

      {/* Modal pour afficher les détails */}
      {selectedPerson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {selectedPerson.name}
              </h3>
              <button
                onClick={() => setSelectedPerson(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {selectedPerson.birth && (
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Né(e):</strong> {selectedPerson.birth}
                </p>
              )}
              {selectedPerson.death && (
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Décédé(e):</strong> {selectedPerson.death}
                </p>
              )}
              {selectedPerson.spouse && (
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Époux/Épouse:</strong> {selectedPerson.spouse}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Enfants:</strong> {selectedPerson.children ? selectedPerson.children.length : 0}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Descendants:</strong> {countDescendants(selectedPerson)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
