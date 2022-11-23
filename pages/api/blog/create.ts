import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma } from '../../../src/prisma';
import { slugify } from '../../../src/utils/slugfy';

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
    if (
      isPublished &&
      (!title ||
        !description ||
        !key_words ||
        !reading_time ||
        !content ||
        !categoryId ||
        !authorId)
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
          title,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    if (articleExists) {
      return res.status(400).json({
        type: 'error',
        response: 'Já existe um artigo cadastrado com esse título',
      });
    }

    const key_wordsArr = key_words.split(',');
    const slug = slugify(title);

    const result = await prisma.articles
      .create({
        data: {
          id: uuid(),
          title,
          slug,
          description,
          key_words: key_wordsArr,
          reading_time,
          content,
          isPublished,
          thumbnail,
          published_at: isPublished ? new Date() : null,
          categoryId,
          authorId,
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    return res.status(201).json({
      type: 'success',
      article: result,
      response: isPublished
        ? 'O artigo foi criado e lançado com sucesso!'
        : 'O rascunho do artigo foi salvo com sucesso!',
    });
  } catch (error) {
    return res.status(400).json({
      type: 'error',
      response: isPublished
        ? 'Ocorreu um erro ao criar e lançar o artigo, tente novamente!'
        : 'Ocorreu um erro ao salvar o rascunho do artigo, tente novamente !',
    });
  }
}
