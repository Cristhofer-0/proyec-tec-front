// services/payment.ts
import type { Stripe } from '@stripe/stripe-js';
import { API_BASE_URL } from "@/lib/config"


export const eliminarProducto = async (orderId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/eliminar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error al eliminar orden:', errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log('Producto eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export const iniciarPago = async (stripePromise: Promise<Stripe | null>) => {
  try {
    const response = await fetch(`${API_BASE_URL}/createSessionFromPendingOrders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const session = await response.json();

    if (!session.id) {
      throw new Error('No se pudo iniciar la sesión de pago.');
    }

    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe no está inicializado.');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

    if (error) {
      console.error('Error en redirección a Stripe:', error);
      throw new Error('Error al redirigir a la página de pago.');
    }
  } catch (err) {
    console.error('Error en el pago:', err);
    throw err;
  }
};