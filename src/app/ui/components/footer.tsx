
const Footer: React.FC = () => {
    return (




        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h4 className="text-lg font-semibold mb-4">Nosotros</h4>
                <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Conócenos</a></li>
                <li><a href="#" className="hover:underline">Trabaja con nosotros</a></li>
                </ul>
                <div className="flex space-x-4 mt-4">
                <i className="fab fa-instagram hover:text-gray-400"></i>
                <i className="fab fa-tiktok hover:text-gray-400"></i>
                <i className="fab fa-facebook hover:text-gray-400"></i>
                <i className="fab fa-youtube hover:text-gray-400"></i>
                </div>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Atención al cliente</h4>
                <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Ver lista de productos permitidos</a></li>
                <li><a href="#" className="hover:underline">Atención de consulta</a></li>
                <li><a href="#" className="hover:underline">Reserva</a></li>
                <li><a href="#" className="hover:underline">Libro de reclamaciones</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-4">Políticas y condiciones</h4>
                <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Política de SST</a></li>
                <li><a href="#" className="hover:underline">Política de Diversidad e Inclusión</a></li>
                <li><a href="#" className="hover:underline">Condiciones de uso y seguridad</a></li>
                <li><a href="#" className="hover:underline">Reglas de Convivencia</a></li>
                <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
                </ul>
            </div>
            </div>

            <div className="container mx-auto py-4 text-center border-t border-gray-700 mt-8">
            <p className="text-sm text-gray-400">© 2023 Joint With Us. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
            </div>
            </div>
        </footer>



    );
};

export default Footer;