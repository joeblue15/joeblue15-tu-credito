"use client";

import React from "react";

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }>
{
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, message: error instanceof Error ? error.message : String(error) };
  }

  componentDidCatch(error: unknown) {
    try {
      console.error("Admin error boundary:", error);
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Algo falló al renderizar</h1>
          <p className="mt-2 text-sm text-red-200">{this.state.message || "Error desconocido"}</p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: undefined })}
            className="mt-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children as any;
  }
}
