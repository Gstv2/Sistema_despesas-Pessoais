import { UserPlus } from "lucide-react";
import { SignUpForm } from "../features/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-100 p-4 rounded-3xl mb-4">
              <UserPlus className="text-emerald-600" size={36} />
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Criar Conta
            </h1>

            <p className="text-slate-500 text-center mt-2">
              Comece agora a controlar suas finanças de forma simples.
            </p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}