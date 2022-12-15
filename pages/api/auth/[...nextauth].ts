import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { login } from "@/data/api/auth";
import { CredentialsType, LoggedInUser } from "@/data/types/auth";
import { API_URLS } from "@/data/utils/api.urls";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        try {
          const { email, password } = credentials as CredentialsType;
          const response = await login({ email, password });
          if (response.data) {
            //console.log("login response from server", JSON.stringify(response.data))
            return response.data;
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 29,
  },
  jwt: {
    maxAge: 60 * 29,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const loggedInUser = user as LoggedInUser;
        token.expires_at = loggedInUser.expires_at;
        token.access_token = loggedInUser.access_token;
        token.refresh_token = loggedInUser.refresh_token;
        token.role = loggedInUser.user.role;
        token.user = loggedInUser.user;
        return token;
      }
      if ((token as any).expires_at < Date.now()) {
        return await refreshAccessToken(token);
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        const { iat, exp, jti, ...allTokens } = token;
        return {
          ...session,
          ...allTokens,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);

export const refreshAccessToken = async (token: JWT) => {
  try {
    const refreshToken = (token as any).refresh_token;
    const refreshTokenUrl = `${API_URLS.auth}/refresh`;
    const response = await axios.post(refreshTokenUrl, null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    return {
      ...response.data,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
