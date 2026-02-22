import React, { useState } from "react";
import { Expense, ExpensePriority, ExpenseType } from "@/types/expense";

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [priority, setPriority] = useState<ExpensePriority>(ExpensePriority.IMPORTANT);
  const [type, setType] = useState<ExpenseType>(ExpenseType.OTHER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || value <= 0) return;
    onAdd({ id: crypto.randomUUID(), name, value, priority, type });
    setName("");
    setValue(0);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-card p-6 shadow-sm border border-border space-y-4">
      <h2 className="font-display text-lg font-bold text-foreground">➕ Adicionar Gasto</h2>
      <input
        type="text"
        placeholder="Nome do gasto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
        <input
          type="number"
          min={0}
          placeholder="Valor"
          value={value || ""}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as ExpensePriority)}
          className="rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
        >
          {Object.values(ExpensePriority).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ExpenseType)}
          className="rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
        >
          {Object.values(ExpenseType).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Adicionar
      </button>
    </form>
  );
}
