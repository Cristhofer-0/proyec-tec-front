"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { validarSesion, loginUsuario } from "@/services/usuarios";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginData>();
  const router = useRouter();
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [emailLleno, setEmailLleno] = useState(false);
  const [loading, setLoading] = useState(true); // para mostrar mientras verifica la sesión
  const [errorServidor, setErrorServidor] = useState(""); // <<< estado para error de servidor
  const valorEmail = watch("email");

  useEffect(() => {
    setEmailLleno((valorEmail || "").trim() !== "");
  }, [valorEmail]);

  const setUser = useUserStore((state) => state.setUser);

  // Verificar sesión activa al montar el componente
  useEffect(() => {
    async function verificarAutenticacion() {
      const data = await validarSesion();

      if (data?.user) {
        setUser(data.user);
        router.push("/");
      } else {
        setLoading(false);
      }
    }

    verificarAutenticacion();
  }, [router, setUser]);


  async function verificarCorreo(data: LoginData): Promise<void> {
    try {
      const response = await loginUsuario(data.email, data.password);
      setUser(response.user);
      router.push("/");
      setErrorServidor(""); // limpiar error al iniciar sesión con éxito
    } catch (error: any) {
      console.error("Error en verificarCorreo:", error);
      // Mostrar mensaje de error personalizado según respuesta
      if (error?.response?.data?.message) {
        setErrorServidor(error.response.data.message);
      } else {
        setErrorServidor("La contraseña o el correo son incorrectos");
      }
    }
  }


  // Función para mostrar/ocultar la contraseña
  function verContaseña() {
    setMostrarPassword((prev) => !prev);
  }

  if (loading) {
    // Puedes poner un spinner o mensaje mientras verifica la sesión
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f8fb]">
        <p className="text-gray-500">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f8fb]">
      <Card className="border-none shadow-[0_0_20px_rgba(0,0,0,0.15)] w-[90%] max-w-xl sm:max-w-2xl bg-gray-100">
        <form onSubmit={handleSubmit(verificarCorreo)} className="p-6">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Iniciar sesión</CardTitle>
            <CardDescription>Ingresa tus datos para acceder a tu cuenta</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* INPUT CORREO */}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Correo electrónico"
                  className="pl-10"
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">
                  {errors.email.type === "required" && "El correo electrónico no debe estar vacío"}
                  {errors.email.type === "pattern" && "El correo electrónico no es válido"}
                </p>
              )}
            </div>

            {/* INPUT CONTRASEÑA */}
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={mostrarPassword ? "text" : "password"}
                  placeholder={emailLleno ? "Contraseña" : "Ingrese su correo electrónico primero"}
                  disabled={!emailLleno}
                  className={`pl-10 ${!emailLleno ? "text-red-500 placeholder-red-500" : ""}`}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  })}
                />
                {mostrarPassword ? (
                  <Eye className="absolute right-3 top-3 h-4 w-4 text-gray-400 cursor-pointer" onClick={verContaseña} />
                ) : (
                  <EyeOff className="absolute right-3 top-3 h-4 w-4 text-gray-400 cursor-pointer" onClick={verContaseña} />
                )}
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.type === "required" && "La contraseña no debe estar vacía"}
                  {errors.password.type === "minLength" && "La contraseña debe tener al menos 6 caracteres"}
                  {errors.password.type === "maxLength" && "La contraseña no debe exceder los 20 caracteres"}
                </p>
              )}

              {errorServidor && !errors.password && (
                <p className="text-sm text-red-600">{errorServidor}</p>
              )}
            </div>

            {/* RECORDAR Y OLVIDAR */}
            

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Iniciar sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
            </div>
            <div className="text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="font-medium text-purple-600 hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      <div className="hidden md:block absolute top-1/4 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-50" />
      <div className="hidden md:block absolute bottom-1/4 right-20 w-32 h-32 bg-pink-200 rounded-full opacity-50" />
      <div className="hidden md:block absolute top-1/3 right-40 w-16 h-16 bg-yellow-200 rounded-full opacity-50" />

      {/* Background decorations */}
      <div className="hidden md:block absolute top-20 right-10">
        <div className="relative w-40 h-40">
          <Image
            src="/placeholder.svg?height=160&width=160"
            alt="Decoración"
            fill
            className="object-contain opacity-10"
          />
        </div>
      </div>
      <div className="hidden md:block absolute bottom-10 left-10">
        <div className="relative w-48 h-48">
          <Image
            src="/placeholder.svg?height=192&width=192"
            alt="Decoración"
            fill
            className="object-contain opacity-10"
          />
        </div>
      </div>
    </div>
  );
}
