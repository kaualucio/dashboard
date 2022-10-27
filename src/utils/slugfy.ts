export function slugify(str: string) {
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str
    .toString() // Transforma em string
    .normalize('NFKD') // Retorna o Unicode Normalization Form da string passada
    .toLowerCase() // Converte a string para caixa baixa
    .trim() // Retira os espaços em branco de todos os lados da string
    .replace(/\s+/g, '-') // Trocas os espaços entre strings para -
    .replace(/[^\w\-]+/g, '') // Remove todos os não caracteres
    .replace(/\_/g, '-') // Troca _ por -
    .replace(/\-\-+/g, '-') // Troca múltiplos - por um único -
    .replace(/\-$/g, ''); // Remove - à direita
}
