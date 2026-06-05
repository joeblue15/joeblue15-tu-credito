"use client";

import { useState } from "react";
import { ChevronsUpDown, LogOut, User, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GoogleLoginButton() {
  const { user, loginWithGoogle, logout, isAuthorizedAdmin } = useAuth();
  const [open, setOpen] = useState(false);

  if (user) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition hover:bg-accent"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || user.email?.split("@")[0]}
                className="size-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="size-4" />
              </div>
            )}
            <span className="hidden sm:inline">
              {user.displayName || user.email?.split("@")[0]}
            </span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.displayName || user.email?.split("@")[0]}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              {isAuthorizedAdmin && (
                <p className="mt-1 text-xs text-primary">Administrador</p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAuthorizedAdmin && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/admin" className="flex items-center">
                <LayoutDashboard className="mr-2 size-4" />
                Panel de administración
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={logout} className="cursor-pointer">
            <LogOut className="mr-2 size-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button onClick={loginWithGoogle} className="btn-22 btn-22-colors">
      Iniciar sesión
    </button>
  );
}
