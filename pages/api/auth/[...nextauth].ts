import { roles } from './../../../src/utils/roles';
/* eslint-disable import/no-anonymous-default-export */
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../src/prisma';
import { compare } from 'bcryptjs';

async function userAlreadyExistsByLogin(login: string) {
  try {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        login,
      },
    });

    return userAlreadyExists;
  } catch (error) {
    console.log(error);
    return 'Ocorreu um erro durante a criação do usuário, tente novamente';
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        login: { label: 'Login', type: 'text', placeholder: 'Login' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        const { login, password } = credentials as {
          login: string;
          password: string;
        };

        if (!login || !password) {
          throw new Error('Campos vázios não são permitidos');
        }

        const userExists: any = await userAlreadyExistsByLogin(login).finally(
          async () => {
            await prisma.$disconnect();
          }
        );

        if (!userExists) {
          throw new Error('Usuário com estas credenciais não existe');
        }

        const comparePasswords = await compare(password, userExists.password);

        if (!comparePasswords) {
          throw new Error('Email ou senha incorretos');
        }

        return userExists;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 1,
  },
  secret: 'secretsupersecreta',
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user.role;
        token.picture = user.profile_picture;
      }

      return token;
    },
    async session({ session, user, token }) {
      // console.log('session', session, user, token);
      session.user.role = token.role;
      session.user.id = token.sub;
      session.user.profile_picture = token.picture;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
