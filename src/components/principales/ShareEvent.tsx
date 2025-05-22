import { Share2 } from "lucide-react"; // O de donde importes el ícono
import { Button } from "@/components/ui/button"; // Ajusta la ruta según corresponda

export function ShareButton() {
 const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Título de la página o evento',
        text: 'Mira este evento genial',
        url: window.location.href,
      })
      .then(() => console.log('Contenido compartido correctamente'))
      .catch((error) => console.log('Error al compartir:', error));
    } else {
      // Fallback si no soporta la API
      alert('Tu navegador no soporta compartir nativamente. Copia la URL manualmente.');
    }
  };

  return (
    <Button variant="outline" size="icon" className="flex-1" onClick={handleShare}>
      <Share2 className="w-4 h-4" />
    </Button>
  );
}
