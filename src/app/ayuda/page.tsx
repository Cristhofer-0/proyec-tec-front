"use client"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { API_BASE_URL } from "@/lib/config"
import { toast } from "@/components/ui/use-toast"
import { successToast } from "@/components/ui/custom-toast"
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    MessageCircle,
    Search,
    HelpCircle,
    FileText,
    Settings,
    CreditCard,
    Shield,
    Users,
} from "lucide-react"

export default function AyudaPage() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
            toast({
                title: "Error",
                description: "Por favor complete todos los campos requeridos.",
                variant: "destructive",
            })
            setIsSubmitting(false)
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/ayuda`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message || "Error al enviar la solicitud")
            }

            successToast({
                description: "El correo se envió con éxito",
            })

            setFormData({
                nombre: "",
                email: "",
                asunto: "",
                mensaje: "",
            })
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message ?? "Hubo un problema al enviar su solicitud. Intente nuevamente.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }



    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const faqCategories = [
        { id: "all", name: "Todas", icon: HelpCircle },
        { id: "account", name: "Cuenta", icon: Users },
        { id: "billing", name: "Facturación", icon: CreditCard },
        { id: "technical", name: "Técnico", icon: Settings },
        { id: "security", name: "Seguridad", icon: Shield },
        { id: "general", name: "General", icon: FileText },
    ]

    const faqs = [
        {
            category: "account",
            question: "¿Cómo puedo cambiar mi contraseña?",
            answer:
                "Puedes cambiar tu contraseña desde la configuración de tu cuenta. Ve a 'Mi Perfil' > 'Seguridad' > 'Cambiar Contraseña'. También puedes usar la opción 'Olvidé mi contraseña' en la página de inicio de sesión.",
        },
        {
            category: "account",
            question: "¿Cómo elimino mi cuenta?",
            answer:
                "Para eliminar tu cuenta, contacta a nuestro equipo de soporte. Ten en cuenta que esta acción es irreversible y se eliminarán todos tus datos permanentemente.",
        },
        {
            category: "billing",
            question: "¿Qué métodos de pago aceptan?",
            answer:
                "Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal, y transferencias bancarias para planes empresariales.",
        },
        {
            category: "billing",
            question: "¿Puedo cancelar mi suscripción en cualquier momento?",
            answer:
                "Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. La cancelación será efectiva al final del período de facturación actual.",
        },
        {
            category: "billing",
            question: "¿Ofrecen reembolsos?",
            answer:
                "Ofrecemos reembolsos completos dentro de los primeros 30 días de tu suscripción. Después de este período, no se procesan reembolsos, pero puedes cancelar para evitar cargos futuros.",
        },
        {
            category: "technical",
            question: "¿Por qué mi aplicación carga lentamente?",
            answer:
                "La velocidad puede verse afectada por varios factores: conexión a internet, caché del navegador, o tráfico alto en el servidor. Intenta limpiar el caché, usar una conexión estable, o contacta soporte si el problema persiste.",
        },
        {
            category: "technical",
            question: "¿Cómo puedo integrar la API?",
            answer:
                "Consulta nuestra documentación completa de API en docs.ejemplo.com. Incluye ejemplos de código, endpoints disponibles, y guías paso a paso para diferentes lenguajes de programación.",
        },
        {
            category: "security",
            question: "¿Cómo protegen mis datos?",
            answer:
                "Utilizamos encriptación SSL/TLS para todas las transmisiones, almacenamiento encriptado, autenticación de dos factores, y cumplimos con estándares internacionales de seguridad como SOC 2 y GDPR.",
        },
        {
            category: "security",
            question: "¿Puedo habilitar autenticación de dos factores?",
            answer:
                "Sí, recomendamos encarecidamente habilitar 2FA. Ve a 'Configuración' > 'Seguridad' > 'Autenticación de Dos Factores' y sigue las instrucciones para configurarla con tu aplicación de autenticación preferida.",
        },
        {
            category: "general",
            question: "¿Cuáles son sus horarios de soporte?",
            answer:
                "Nuestro equipo de soporte está disponible de lunes a viernes de 9:00 AM a 6:00 PM (hora local). Para emergencias críticas, ofrecemos soporte 24/7 para planes empresariales.",
        },
        {
            category: "general",
            question: "¿Tienen una aplicación móvil?",
            answer:
                "Sí, tenemos aplicaciones nativas para iOS y Android. Puedes descargarlas desde App Store y Google Play Store. También nuestra plataforma web es completamente responsive.",
        },
    ]

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Ayuda</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Encuentra respuestas rápidas o ponte en contacto con nuestro equipo de soporte
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            placeholder="Buscar en preguntas frecuentes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 py-3 text-lg"
                        />
                    </div>
                </div>

                <Tabs defaultValue="faq" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="faq" className="text-lg py-3">
                            <HelpCircle className="w-5 h-5 mr-2" />
                            Preguntas Frecuentes
                        </TabsTrigger>
                        <TabsTrigger value="contact" className="text-lg py-3">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Contactar Soporte
                        </TabsTrigger>
                    </TabsList>

                    {/* FAQ Section */}
                    <TabsContent value="faq" className="space-y-6">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                            {faqCategories.map((category) => {
                                const Icon = category.icon
                                return (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? "default" : "outline"}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className="flex items-center gap-2"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {category.name}
                                    </Button>
                                )
                            })}
                        </div>

                        {/* FAQ Results */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="w-6 h-6" />
                                    Preguntas Frecuentes
                                    <Badge variant="secondary">{filteredFaqs.length} resultados</Badge>
                                </CardTitle>
                                <CardDescription>Encuentra respuestas a las preguntas más comunes</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {filteredFaqs.length > 0 ? (
                                    <Accordion type="single" collapsible className="w-full">
                                        {filteredFaqs.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger className="text-left">
                                                    <div className="flex items-start gap-3">
                                                        <Badge variant="outline" className="mt-1">
                                                            {faqCategories.find((cat) => cat.id === faq.category)?.name}
                                                        </Badge>
                                                        <span>{faq.question}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <div className="text-center py-12">
                                        <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                                        <p className="text-gray-500">
                                            Intenta con otros términos de búsqueda o contacta a nuestro equipo de soporte.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Contact Section */}
                    <TabsContent value="contact" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Contact Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageCircle className="w-6 h-6" />
                                        Enviar Mensaje
                                    </CardTitle>
                                    <CardDescription>Completa el formulario y te responderemos en menos de 24 horas</CardDescription>
                                </CardHeader>
                                <form onSubmit={handleSubmit}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Ingrese su nombre completo"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="ejemplo@correo.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Asunto</Label>
                                            <Input
                                                id="asunto"
                                                name="asunto"
                                                placeholder="¿En qué podemos ayudarte?"
                                                value={formData.asunto}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="message">Mensaje</Label>
                                            <Textarea
                                                id="mensaje"
                                                name="mensaje"
                                                placeholder="Describe tu consulta o problema en detalle"
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                rows={5}
                                                required
                                            />
                                        </div>
                                    </CardContent>
                                    <br />
                                    <CardFooter>
                                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* Contact Information */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Phone className="w-6 h-6" />
                                            Información de Contacto
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium">Email</p>
                                                <p className="text-gray-600">info@joinwithus.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="w-5 h-5 text-green-600" />
                                            <div>
                                                <p className="font-medium">Teléfono</p>
                                                <p className="text-gray-600">+51 912 345 678</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-red-600" />
                                            <div>
                                                <p className="font-medium">Dirección</p>
                                                <p className="text-gray-600">
                                                    Calle Esmeralda 123, Lima, Perú
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-purple-600" />
                                            <div>
                                                <p className="font-medium">Horarios de Atención</p>
                                                <p className="text-gray-600">Lun - Vie: 9:00 AM - 6:00 PM</p>
                                                <p className="text-gray-600">Sáb: 10:00 AM - 2:00 PM</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )

}