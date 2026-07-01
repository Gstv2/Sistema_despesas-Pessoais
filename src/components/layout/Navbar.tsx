import { Wallet2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-2xl sticky top-0 z-30">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
            <Wallet2 className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Finanças Pessoais
            </h1>
            <p className="text-blue-100 text-xs md:text-sm font-medium">Controle suas despesas e receitas</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
