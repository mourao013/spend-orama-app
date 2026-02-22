import React from "react";
import { Expense } from "@/types/expense";

interface ExpenseListProps {
  expenses: Expense[];
  onRemove: (id: string) => void;
}

const priorityColor: Record<string, string> = {
  Essencial: "bg-destructive/10 text-destructive",
  Importante: "bg-primary/10 text-primary",
  Opcional: "bg-accent/10 text-accent",
};

export default function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-lg bg-card p-6 shadow-sm border border-border text-center text-muted-foreground">
        Nenhum gasto adicionado ainda.
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
      <h2 className="font-display text-lg font-bold text-foreground mb-4">📋 Lista de Gastos</h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {expenses.map((exp) => (
          <li key={exp.id} className="flex items-center justify-between rounded-md border border-border p-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{exp.name}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColor[exp.priority]}`}>{exp.priority}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{exp.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-3">
              <span className="font-display font-bold text-foreground whitespace-nowrap">
                R$ {exp.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
              <button onClick={() => onRemove(exp.id)} className="text-muted-foreground hover:text-destructive transition-colors text-lg">✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
