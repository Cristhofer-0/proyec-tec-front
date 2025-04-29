import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";





const Footer: React.FC = () => {
    return (

        //TAREA: CREAR COMPONENTES DE FOOTER Y HEADER CON TAILWIND CSS Y REACT

        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Sección Nosotros */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Nosotros</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:underline">
                                Conócenos
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Trabaja con nosotros
                            </Link>
                        </li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                        <Link href="#" className="hover:text-gray-400">
                            <Instagram />
                        </Link>
                        <Link href="#" className="hover:text-gray-400">
                            <Facebook />
                        </Link>
                        <Link href="#" className="hover:text-gray-400">
                            <Youtube />
                        </Link>
                    </div>
                </div>

                {/* Sección Atención al cliente */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Atención al cliente</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:underline">
                                Ver lista de productos permitidos
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Atención de consulta
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Reserva
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Libro de reclamaciones
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Sección Políticas y condiciones */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">Políticas y condiciones</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:underline">
                                Política de SST
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Política de Diversidad e Inclusión
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Condiciones de uso y seguridad
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Reglas de Convivencia
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline">
                                Términos y condiciones
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Footer final */}
            <div className="container mx-auto py-4 text-center border-t border-gray-700 mt-8">
                <p className="text-sm text-gray-400">© 2023 Joint With Us. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;