export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          &copy; {currentYear} QR Code Creation. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-black transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-black transition-colors">Termos de Serviço</a>
          <a href="#" className="hover:text-black transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  );
}
