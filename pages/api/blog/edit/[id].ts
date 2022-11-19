import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/prisma';
import { slugify } from '../../../../src/utils/slugfy';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }
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
  try {
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
  } catch (error) {
    return res.status(400).json({
      type: 'error',
      response: isPublished
        ? 'Ocorreu um erro ao editar e lançar o artigo, tente novamente!'
        : 'Ocorreu um erro ao salvar a continuação do rascunho do artigo, tente novamente !',
    });
  }
}
