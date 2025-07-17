# 🧪 Proyec-Tec Front

Frontend para la plataforma **Proyec-Tec**, desarrollado en **Next.js**, diseñado para ofrecer una experiencia moderna, fluida y en tiempo real a los usuarios que buscan explorar, gestionar y participar en eventos tecnológicos y sociales.

---

## 🚀 Tecnologías Utilizadas

- [Next.js](https://nextjs.org/) – Framework React para SSR/SSG.
- [Tailwind CSS](https://tailwindcss.com/) – Utilidades de diseño.
- [shadcn/ui](https://ui.shadcn.dev/) – Componentes de interfaz de usuario elegantes y reutilizables.
- [Zustand](https://zustand-demo.pmnd.rs/) – Gestión de estado global.
- [Socket.IO](https://socket.io/) – Comunicación en tiempo real (notificaciones).
- [MapLibre GL](https://maplibre.org/) – Renderizado de mapas interactivos.

---

## 📁 Estructura del Proyecto

```
proyec-tec-front/
├── app/                   # Rutas y páginas Next.js
├── components/            # Componentes reutilizables
│   └── principales/       # Carrito, notificaciones, etc.
├── stores/                # Zustand stores
├── public/                # Recursos estáticos
├── lib/                   # Funciones utilitarias y configuración
├── styles/                # Archivos de estilo global
└── ...
```

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Cristhofer-0/proyec-tec-front.git
cd proyec-tec-front

# Instalar dependencias
npm install
```

---

## 🧪 Uso en Desarrollo

```bash
# Ejecutar el servidor de desarrollo
npm run dev
```

Luego abre en el navegador: [http://localhost:3001](http://localhost:3001)

---

## 🌐 Variables de Entorno

Crea un archivo `.env.local` y configura tus variables:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

Asegúrate de que el backend y WebSocket estén en funcionamiento en ese puerto.

---

## 🔔 Funcionalidades Principales

- 🛒 Carrito de compras con persistencia
- 📬 Notificaciones en tiempo real vía WebSocket
- 📍 Selección de ubicación con MapLibre
- 🎫 Sistema de tickets para eventos
- 🧾 Página de perfil con múltiples secciones

---

## 🧹 Scripts Útiles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila el proyecto para producción
npm run lint      # Corre ESLint
```

---

## ✅ Estado

> 🛠️ Proyecto en desarrollo activo. Se conecta con `gestion-front` y `gestion-back`.

---

Este proyecto es de uso privado.  
**Queda estrictamente prohibida** la copia, distribución, modificación o reutilización parcial o total de este código sin autorización previa y por escrito de los autores.

© 2025 Cristhofer, Miguel, Franco, Adrian y Sebastian. Todos los derechos reservados.

---

## ✨ Autores

Desarrollado por:  
- [Cristhofer](https://github.com/Cristhofer-0)  
- [Miguel](https://github.com/sevenjpg8)  
- [Franco](https://github.com/LuisFr3)  
- [Adrian](https://github.com/SkipCodeBytes)  
- [Sebastian](https://github.com/sebaslade)
