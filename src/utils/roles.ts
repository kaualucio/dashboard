/* eslint no-use-before-define: 0 */
export const roles: Record<string, string> = {
  'product-manager': 'Product Manager',
  programmer: 'Programador',
  'analista-de-marketing': 'Analista de Marketing',
  designer: 'Designer',
};

export const rolesOptions = [
  {
    name: 'Product Manager',
    id: 'product-manager',
  },
  {
    name: 'Programador',
    value: 'programmer',
  },
  {
    name: 'Analista de Marketing',
    id: 'analista-de-marketing',
  },
  {
    name: 'Designer',
    id: 'designer',
  },
];
