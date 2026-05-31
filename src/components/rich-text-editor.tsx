"use client";

import { Bold, Heading2, Italic, List, ListOrdered } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const actions: Array<{
  icon: typeof Bold;
  command: string;
  label: string;
  value?: string;
}> = [
  { icon: Bold, command: "bold", label: "Negrita" },
  { icon: Italic, command: "italic", label: "Cursiva" },
  { icon: List, command: "insertUnorderedList", label: "Lista" },
  { icon: ListOrdered, command: "insertOrderedList", label: "Lista numerada" },
  { icon: Heading2, command: "formatBlock", value: "h2", label: "Título" },
];

export function RichTextEditor({ value, onChange, className }: { value: string; onChange: (value: string) => void; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const runCommand = (command: string, commandValue?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, commandValue);
    onChange(ref.current?.innerHTML ?? "");
  };

  return (
    <div className={cn("rounded-[28px] border border-white/10 bg-white/5", className)}>
      <div className="flex flex-wrap gap-2 border-b border-white/10 p-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-full border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            onClick={() => runCommand(action.command, action.value)}
          >
            <action.icon className="size-4" />
            {action.label}
          </Button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="min-h-40 rounded-b-[28px] p-4 text-sm leading-7 text-slate-200 outline-none"
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
