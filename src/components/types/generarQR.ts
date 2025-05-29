import QRCode from 'qrcode'

export async function generarQRBase64(data: any): Promise<string> {
  const texto = JSON.stringify(data)
  return await QRCode.toDataURL(texto)
}
