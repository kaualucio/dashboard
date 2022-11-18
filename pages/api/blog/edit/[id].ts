import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';
import { slugify } from '../../../../src/utils/slugfy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    description,
    key_words,
    reading_time,
    content,
    isPublished,
    thumbnail,
    categoryId,
    authorId,
  } = req.body;
  const { id } = req.query;
  if (typeof id === 'string') {
    if (
      !title ||
      !description ||
      !key_words ||
      !reading_time ||
      !content ||
      !categoryId ||
      !authorId
    ) {
      return res.status(406).json({
        type: 'error',
        response:
          'Dados inválidos, verifique se as informações foram preenchidas corretamente',
      });
    }

    const articleExists = await prisma.articles
      .findFirst({
        where: {
          id,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (!articleExists) {
      return res.status(404).json({
        type: 'error',
        response: 'Não existe nenhum artigo com esse título',
      });
    }

    const key_wordsArr = key_words.split(',');
    const slug = slugify(title);

    const result = await prisma.articles
      .update({
        where: {
          id,
        },
        data: {
          title,
          slug,
          description,
          key_words,
          reading_time,
          content,
          thumbnail,
          categoryId,
          authorId,
          updated_at: new Date(),
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    return res.status(201).json({
      type: 'success',
      article: result,
      response: isPublished
        ? 'O artigo foi editado com sucesso!'
        : 'A continuação do rascunho foi salvo com sucesso!',
    });
  }
}
