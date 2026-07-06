import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/authValidators";
import type { LoginCredentials } from "../../types/auth";
import { useAuth } from "../../hooks/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-semibold text-slate-700"
        >
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        {errors.email && (
          <p className="text-sm font-medium text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-semibold text-slate-700"
        >
          Senha
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 py-3 pr-12 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {errors.password && (
          <p className="text-sm font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-70"
      >
        <LogIn size={20} />
        {isSubmitting ? "Entrando..." : "Entrar"}
      </button>

      <div className="border-t border-slate-200 pt-6 text-center">
        <p className="text-sm text-slate-500">
          Não possui uma conta?
        </p>

        <Link
          to="/signup"
          className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Criar conta
        </Link>
      </div>
    </form>
  );
}