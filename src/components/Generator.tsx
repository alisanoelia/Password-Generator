import { useState } from 'react'
import { IoCopy } from 'react-icons/io5'

export const Generator = () => {
  const [password, setPassword] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const generatePassword = () => {
    const length = 16
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 2000) // Ocultar después de 2 segundos
  }

  const copy = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      showToast('Copiado al portapapeles')
    } else {
      showToast('Primero genera una contraseña')
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-16 flex items-center justify-center rounded border border-current px-4 py-2">
          {toastMessage}
        </div>
      )}

      {/* Password Display */}
      <div className="flex items-center gap-4">
        <p className="text-2xl font-bold">{password}</p>
        {password && (
          <div className="flex items-center gap-2 rounded border border-current px-4 py-2">
            <IoCopy />
            <button onClick={copy} className="text-sm">
              Copiar
            </button>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={generatePassword}
        className="rounded border border-black/60 px-4 py-2 dark:border-white/60"
      >
        Generar
      </button>
    </div>
  )
}
