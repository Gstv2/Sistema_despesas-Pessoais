
import { supabase } from "../lib/supabase";
import type {
  User,
  SignUpCredentials,
  LoginCredentials,
  PasswordResetCredentials,
} from "../types/auth";

export const authService = {
  async signUp(credentials: SignUpCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        },
      },
    });

    if (error) throw error;

    if (!data.user) {
      throw new Error("Failed to create user");
    }

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      emailConfirmedAt: data.user.email_confirmed_at,
    };
  },

  async login(credentials: LoginCredentials): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      emailConfirmedAt: data.user.email_confirmed_at,
    };
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async resetPassword(credentials: PasswordResetCredentials): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(
      credentials.email,
      {
        redirectTo: window.location.origin + "/login",
      }
    );

    if (error) throw error;
  },

  async getSession(): Promise<User | null> {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    if (!data.session) {
      return null;
    }

    return {
      id: data.session.user.id,
      email: data.session.user.email!,
      name: data.session.user.user_metadata?.name,
      emailConfirmedAt: data.session.user.email_confirmed_at,
    };
  },
};

