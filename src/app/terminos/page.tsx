import { ScrollText, Calendar, CreditCard, Shield, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <ScrollText className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Términos y Condiciones</h1>
          <p className="text-muted-foreground mt-1">Última actualización: 26 de junio de 2025</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Introducción */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              1. Aceptación de los Términos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Al acceder y utilizar nuestra plataforma de venta de tickets para eventos, usted acepta estar sujeto a
              estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe
              utilizar nuestro servicio.
            </p>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación en el sitio web.
            </p>
          </CardContent>
        </Card>

        {/* Compra de Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              2. Compra de Tickets y Pagos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">2.1 Proceso de Compra</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Todos los precios están expresados en la moneda local e incluyen impuestos aplicables</li>
                <li>Los tickets están sujetos a disponibilidad y se venden por orden de llegada</li>
                <li>Una vez completada la compra, recibirá una confirmación por correo electrónico</li>
                <li>Los tickets electrónicos serán enviados a la dirección de correo proporcionada</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2.2 Métodos de Pago</h4>
              <p className="text-sm">
                Aceptamos tarjetas de crédito, débito y otros métodos de pago electrónicos. Todos los pagos deben ser
                completados al momento de la compra.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2.3 Política de Reembolsos</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Los reembolsos solo se procesarán en caso de cancelación del evento por parte del organizador</li>
                <li>No se otorgan reembolsos por cambios de planes personales del comprador</li>
                <li>En caso de reembolso, el dinero será devuelto al método de pago original en 5-10 días hábiles</li>
                <li>Las tarifas de procesamiento no son reembolsables</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Políticas de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              3. Políticas de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">3.1 Acceso al Evento</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Debe presentar su ticket (impreso o digital) y una identificación válida para ingresar</li>
                <li>Los tickets son intransferibles y no pueden ser revendidos sin autorización</li>
                <li>El ingreso puede ser denegado si el ticket ha sido alterado o es fraudulento</li>
                <li>Los menores de edad deben estar acompañados por un adulto responsable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3.2 Comportamiento en el Evento</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Se prohíbe el comportamiento disruptivo, violento o que ponga en riesgo la seguridad</li>
                <li>No se permite el ingreso de bebidas alcohólicas, drogas o armas</li>
                <li>El organizador se reserva el derecho de expulsar a cualquier persona sin reembolso</li>
                <li>Está prohibido grabar o fotografiar sin autorización expresa</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3.3 Cancelaciones y Cambios</h4>
              <p className="text-sm">
                Los organizadores se reservan el derecho de cancelar, posponer o cambiar la ubicación de un evento por
                circunstancias imprevistas. En tales casos, se notificará a los compradores y se procesarán los
                reembolsos correspondientes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Responsabilidades del Usuario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              4. Responsabilidades del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">4.1 Información Personal</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Debe proporcionar información precisa y actualizada al realizar una compra</li>
                <li>Es responsable de mantener la confidencialidad de su cuenta y contraseña</li>
                <li>Debe notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">4.2 Uso Apropiado</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>No debe usar la plataforma para actividades ilegales o fraudulentas</li>
                <li>Está prohibido intentar acceder a sistemas o datos no autorizados</li>
                <li>No debe interferir con el funcionamiento normal de la plataforma</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Privacidad y Protección de Datos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              5. Privacidad y Protección de Datos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">5.1 Recopilación de Datos</h4>
              <p className="text-sm">
                Recopilamos información personal necesaria para procesar su compra y mejorar nuestros servicios. Esto
                incluye nombre, correo electrónico, información de pago y preferencias de eventos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">5.2 Uso de la Información</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Procesamiento de transacciones y entrega de tickets</li>
                <li>Comunicación sobre eventos y actualizaciones importantes</li>
                <li>Mejora de nuestros servicios y experiencia del usuario</li>
                <li>Cumplimiento de obligaciones legales y regulatorias</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">5.3 Protección de Datos</h4>
              <p className="text-sm">
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra
                acceso no autorizado, alteración, divulgación o destrucción.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Limitación de Responsabilidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              6. Limitación de Responsabilidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">6.1 Exención de Garantías</h4>
              <p className="text-sm">
                Nuestros servicios se proporcionan "tal como están" sin garantías de ningún tipo. No garantizamos que el
                servicio será ininterrumpido o libre de errores.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">6.2 Limitación de Daños</h4>
              <p className="text-sm">
                En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes que
                resulten del uso de nuestros servicios, incluso si hemos sido advertidos de la posibilidad de tales
                daños.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">6.3 Responsabilidad de Terceros</h4>
              <p className="text-sm">
                No somos responsables por las acciones, contenido o servicios de organizadores de eventos de terceros.
                Actuamos únicamente como intermediarios en la venta de tickets.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>7. Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Si tiene preguntas sobre estos términos y condiciones, puede contactarnos a través de:
            </p>
            <div className="grid gap-2 text-sm">
              <p>
                <strong>Correo electrónico:</strong> legal@eventtickets.com
              </p>
              <p>
                <strong>Teléfono:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Dirección:</strong> 123 Event Street, Ciudad, País, CP 12345
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/cart">Volver al Carrito</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/privacy">Política de Privacidad</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contactar Soporte</Link>
          </Button>
        </div>

        {/* Nota final */}
        <div className="text-center text-sm text-muted-foreground bg-muted p-4 rounded-lg">
          <p>
            Al continuar usando nuestros servicios, usted confirma que ha leído, entendido y acepta estos términos y
            condiciones en su totalidad.
          </p>
        </div>
      </div>
    </div>
  )
}
