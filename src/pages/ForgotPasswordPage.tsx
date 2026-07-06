import { KeyRound } from "lucide-react";
import { ForgotPasswordForm } from "../features/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-100 p-4 rounded-3xl mb-4">
              <KeyRound className="text-emerald-600" size={36} />
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Recuperar Senha
            </h1>

            <p className="text-slate-500 text-center mt-2">
              Informe seu email e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}