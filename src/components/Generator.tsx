import { useState } from 'react'
import { IoCopy } from 'react-icons/io5'

export const Generator = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const generatePassword = () => {
    const result = Array.from({ length }, () =>
      charset.charAt(Math.floor(Math.random() * charset.length))
    ).join('')
    setPassword(result)
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 2000)
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      showToast('Copiado al portapapeles')
    } else {
      showToast('Primero genera una contraseña')
    }
  }

  const reset = () => {
    setPassword('')
    setLength(16)
    setToastMessage(null)
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Toast */}
      {toastMessage && (
        <div className="absolute top-1/3 flex items-center justify-center rounded border border-current bg-orange-50 px-4 py-2 text-black/60 shadow transition-opacity duration-300 dark:bg-zinc-900 dark:text-white/60">
          {toastMessage}
        </div>
      )}

      {/* Password Display with Animation */}
      <div className="flex items-center gap-4">
        <p
          className={`transform text-2xl font-bold transition-all duration-500 ${
            password ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
          }`}
        >
          {password}
        </p>
        {password && (
          <div className="flex items-center gap-2 rounded border border-current px-4 py-2">
            <IoCopy />
            <button onClick={copyToClipboard} className="text-sm">
              Copiar
            </button>
          </div>
        )}
      </div>

      {/* Length Selector */}
      <div className="flex items-center gap-4">
        <label htmlFor="length" className="font-medium">
          Longitud:
        </label>
        <input
          type="range"
          id="length"
          min="8"
          max="32"
          value={length}
          onChange={e => setLength(parseInt(e.target.value, 10))}
          className="accent-bg-gray-500 h-1 w-48 cursor-pointer appearance-none rounded-xl bg-zinc-700 accent-gray-700 dark:bg-gray-600 dark:accent-gray-200"
        />
        <span className="font-bold">{length}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={generatePassword}
          className="rounded bg-black/80 px-4 py-2 text-white/80 dark:bg-gray-200 dark:text-black/80"
        >
          Generar
        </button>
        <button
          onClick={reset}
          className="rounded border border-gray-400 px-4 py-2 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}
