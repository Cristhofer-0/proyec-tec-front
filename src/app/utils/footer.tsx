import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-white">JoinWithUs</span>
            </Link>
            <p className="text-gray-400">
              Organizamos los mejores eventos para que tú solo te preocupes de disfrutar.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ayuda" className="hover:text-white transition-colors">
                  Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li>info@joinwithus.com</li>
              <li>+51 912 345 678</li>
              <li>Calle Esmeralda 123, Lima</li>
            </ul>
          </div>
          <div>
            <Image
                  src="/images/logonew.png"
                  alt="JoinWithUs Logo"
                  width={150}
                  height={150}
                  className="rounded"
                />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 JoinWithUs! Todos los derechos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;