import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { slugify } from '../../../src/utils/slugfy';

const prisma = new PrismaClient();

interface ArticleData {
  title: string;
  slug: string;
  description: string;
  key_words: string[];
  reading_time: number;
  content: string;
  isPublished: boolean;
  thumbnail: string;
  categoryId: string;
  authorId: string;
}

async function create({
  title,
  slug,
  description,
  key_words,
  reading_time,
  content,
  isPublished,
  thumbnail,
  categoryId,
  authorId,
}: ArticleData) {
  try {
    const article = await prisma.articles.create({
      data: {
        id: uuid(),
        title,
        slug,
        description,
        key_words,
        reading_time,
        content,
        isPublished,
        thumbnail,
        published_at: isPublished ? new Date() : '',
        categoryId,
        authorId,
      },
    });

    return article;
  } catch (error) {
    // console.log(error)
    return 'Ocorreu um erro durante a criação do usuário, tente novamente';
  }
}

async function articleAlreadyExistsByTitle(title: string) {
  try {
    const articleAlreadyExists = await prisma.articles.findFirst({
      where: {
        title,
      },
    });

    return articleAlreadyExists ? true : false;
  } catch (error) {
    // console.log(error)
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
  try {
    if (
      !title ||
      !description ||
      !key_words ||
      !reading_time ||
      !content ||
      !isPublished ||
      !thumbnail ||
      !categoryId ||
      !authorId
    ) {
      return res.status(406).json({
        type: 'error',
        response:
          'Dados inválidos, verifique se as informações foram preenchidas corretamente',
      });
    }

    const articleExists = await articleAlreadyExistsByTitle(title).finally(
      async () => {
        await prisma.$disconnect();
      }
    );

    if (articleExists) {
      return res.status(403).json({
        type: 'error',
        response: 'Já existe um artigo cadastrado com esse título',
      });
    }

    const key_wordsArr = key_words.split(',');
    const slug = slugify(title);
    const result = await create({
      title,
      slug,
      description,
      key_words: key_wordsArr,
      reading_time,
      content,
      isPublished,
      thumbnail,
      categoryId,
      authorId,
    }).finally(async () => {
      await prisma.$disconnect();
    });
    return res.status(200).json({
      type: 'success',
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
