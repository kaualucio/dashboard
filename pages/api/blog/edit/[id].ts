import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slugify } from '../../../../src/utils/slugfy';

const prisma = new PrismaClient();

interface ArticleData {
  title: string;
  slug: string;
  description: string;
  key_words: string[];
  reading_time: number;
  content: string;
  thumbnail: string;
  categoryId: string;
  authorId: string;
}

async function create(
  {
    title,
    slug,
    description,
    key_words,
    reading_time,
    content,
    thumbnail,
    categoryId,
    authorId,
  }: ArticleData,
  id: string | any
) {
  try {
    const article = await prisma.articles.update({
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
      },
    });

    return article;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a criação do artigo, tente novamente';
  }
}

async function articleAlreadyExistsById(id: string | any) {
  try {
    const articleAlreadyExists = await prisma.articles.findFirst({
      where: {
        id,
      },
    });

    return articleAlreadyExists;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a criação/salvamento do article, tente novamente';
  }
}

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
  try {
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

    const articleExists = await articleAlreadyExistsById(id).finally(
      async () => {
        await prisma.$disconnect();
      }
    );

    if (!articleExists) {
      return res.status(403).json({
        type: 'error',
        response: 'Não existe nenhum artigo com esse título',
      });
    }

    const key_wordsArr = key_words.split(',');
    const slug = slugify(title);

    const result = await create(
      {
        title,
        slug,
        description,
        key_words: key_wordsArr,
        reading_time,
        content,
        thumbnail,
        categoryId,
        authorId,
      },
      id
    ).finally(async () => {
      await prisma.$disconnect();
    });
    return res.status(201).json({
      type: 'success',
      article: result,
      response: isPublished
        ? 'O artigo foi editado com sucesso!'
        : 'A continuação do rascunho foi salvo com sucesso!',
    });
  } catch (error) {
    return res.status(400).json({
      type: 'error',
      response: isPublished
        ? 'Ocorreu um erro ao editar o artigo, tente novamente!'
        : 'Ocorreu um erro ao salvar a continuação do rascunho, tente novamente !',
    });
  }
}
