// src/components/common/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
    </div>
  );
}
