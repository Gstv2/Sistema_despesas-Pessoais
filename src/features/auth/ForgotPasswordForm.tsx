import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordResetSchema } from "../../lib/authValidators";
import type { PasswordResetCredentials } from "../../types/auth";
import { useAuth } from "../../hooks/AuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send, CheckCircle} from "lucide-react";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetCredentials>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const { resetPassword, error } = useAuth();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: PasswordResetCredentials) => {
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-emerald-100 p-4 rounded-full">
            <CheckCircle className="text-emerald-600" size={36} />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-emerald-700 font-medium">
            Email de recuperação enviado com sucesso!
          </p>

          <p className="text-sm text-emerald-600 mt-2">
            Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
          </p>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
        >
          Voltar para o Login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all disabled:opacity-70"
      >
        <Send size={20} />

        {isSubmitting
          ? "Enviando..."
          : "Enviar Email de Recuperação"}
      </button>

      <div className="border-t border-slate-200 pt-6 text-center">
        <p className="text-sm text-slate-500">
          Lembrou sua senha?
        </p>

        <Link
          to="/login"
          className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          Fazer Login
        </Link>
      </div>
    </form>
  );
}