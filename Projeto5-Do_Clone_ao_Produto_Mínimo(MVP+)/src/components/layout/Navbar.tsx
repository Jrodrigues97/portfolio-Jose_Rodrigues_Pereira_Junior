import { QrCode, LogIn, UserPlus, Share2, Link, MessageCircle, Twitter, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/src/context/AuthContext';

export function Navbar() {
  const { user, signOut } = useAuth();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Confira este gerador de QR Code incrível!";
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <nav className="bg-black text-white py-2 px-4 sm:px-6 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <QrCode className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-sm sm:text-lg font-black tracking-tighter uppercase italic">
          QR <span className="text-blue-500">Creation</span>
        </h1>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 px-2 text-[10px] sm:text-xs">
              <Share2 className="w-3.5 h-3.5 mr-1 sm:mr-2" />
              <span>Compartilhar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white border-blue-100">
            <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="cursor-pointer text-xs">
              <MessageCircle className="w-3.5 h-3.5 mr-2 text-green-500" /> WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer text-xs">
              <Twitter className="w-3.5 h-3.5 mr-2 text-blue-400" /> Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('copy')} className="cursor-pointer text-xs">
              <Link className="w-3.5 h-3.5 mr-2 text-gray-500" /> Copiar Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-4 w-[1px] bg-white/20 mx-1 hidden xs:block" />

        {user ? (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex flex-col items-end mr-1">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Logado como</span>
              <span className="text-xs font-bold truncate max-w-[100px]">{user.displayName || user.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut()}
              className="text-white hover:bg-red-500/20 hover:text-red-400 h-8 px-2 text-[10px] sm:text-xs"
            >
              <LogOut className="w-3.5 h-3.5 mr-1 sm:mr-2" />
              <span>Sair</span>
            </Button>
          </div>
        ) : (
          <>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 h-8 px-2 text-[10px] sm:text-xs">
              <LogIn className="w-3.5 h-3.5 mr-1 sm:mr-2" />
              <span>Entrar</span>
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-2 sm:px-4 text-[10px] sm:text-xs font-bold">
              <UserPlus className="w-3.5 h-3.5 mr-1 sm:mr-2" />
              <span>Crie sua Conta</span>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
