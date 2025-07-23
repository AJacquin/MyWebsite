export interface Person {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  spouse?: string;
  children?: Person[];
}

export const sampleFamilyData: Person = {
  id: '1',
  name: 'Jean Dupont',
  birth: '1920',
  death: '1995',
  spouse: 'Marie Durand',
  children: [
    {
      id: '2',
      name: 'Pierre Dupont',
      birth: '1945',
      spouse: 'Anne Martin',
      children: [
        {
          id: '4',
          name: 'Sophie Dupont',
          birth: '1970',
          spouse: 'Thomas Leroy',
          children: [
            {
              id: '6',
              name: 'Emma Leroy',
              birth: '1995'
            },
            {
              id: '7',
              name: 'Lucas Leroy',
              birth: '1998'
            }
          ]
        },
        {
          id: '5',
          name: 'Marc Dupont',
          birth: '1972',
          spouse: 'Julie Moreau'
        }
      ]
    },
    {
      id: '3',
      name: 'Catherine Dupont',
      birth: '1948',
      spouse: 'Robert Bernard',
      children: [
        {
          id: '8',
          name: 'Nicolas Bernard',
          birth: '1975',
          children: [
            {
              id: '9',
              name: 'Léa Bernard',
              birth: '2005'
            }
          ]
        }
      ]
    }
  ]
};
