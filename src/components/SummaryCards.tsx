import React from "react";
import { Expense } from "@/types/expense";

interface SummaryCardsProps {
  salary: number;
  expenses: Expense[];
}

export default function SummaryCards({ salary, expenses }: SummaryCardsProps) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.value, 0);
  const remaining = salary - totalExpenses;
  const percentage = salary > 0 ? Math.min((totalExpenses / salary) * 100, 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-lg bg-card p-5 shadow-sm border border-border text-center">
        <p className="text-sm text-muted-foreground">Salário</p>
        <p className="font-display text-2xl font-bold text-foreground">R$ {salary.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>
      <div className="rounded-lg bg-card p-5 shadow-sm border border-border text-center">
        <p className="text-sm text-muted-foreground">Total Gastos</p>
        <p className="font-display text-2xl font-bold text-destructive">R$ {totalExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
      </div>
      <div className="rounded-lg bg-card p-5 shadow-sm border border-border text-center">
        <p className="text-sm text-muted-foreground">Saldo Restante</p>
        <p className={`font-display text-2xl font-bold ${remaining >= 0 ? "text-accent" : "text-destructive"}`}>
          R$ {remaining.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="col-span-full rounded-lg bg-card p-5 shadow-sm border border-border">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Comprometimento da renda</span>
          <span className="font-medium">{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${percentage > 80 ? "bg-destructive" : "bg-primary"}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
