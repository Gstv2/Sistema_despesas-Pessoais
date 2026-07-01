interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center">
    <div className="text-rose-500 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-rose-800 mb-2">Ocorreu um erro</h3>
    <p className="text-rose-600 mb-6">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-rose-600 text-white font-medium rounded-xl hover:bg-rose-700 transition-colors"
      >
        Tentar novamente
      </button>
    )}
  </div>
);
