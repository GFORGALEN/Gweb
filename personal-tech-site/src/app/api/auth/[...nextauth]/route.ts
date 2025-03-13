import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// 这里会导入数据库连接，先注释掉
// import { prisma } from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "凭证登录",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 这里需要prisma连接，先模拟一个用户
        const user = {
          id: "1",
          name: "测试用户",
          email: "test@example.com",
          password: await bcrypt.hash("password123", 10),
          emailVerified: new Date(),
        };

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };