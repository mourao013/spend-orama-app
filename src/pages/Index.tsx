import React, { useState } from "react";
import { Expense } from "@/types/expense";
import SalaryInput from "@/components/SalaryInput";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import SummaryCards from "@/components/SummaryCards";
import ExpenseCharts from "@/components/ExpenseCharts";

export default function Index() {
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => setExpenses((prev) => [...prev, expense]);
  const removeExpense = (id: string) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="text-center space-y-2">
          <h1 className="font-display text-4xl font-bold text-foreground">Controle de Gastos</h1>
          <p className="text-muted-foreground">Gerencie suas finanças de forma inteligente</p>
        </header>

        <SummaryCards salary={salary} expenses={expenses} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SalaryInput salary={salary} onSalaryChange={setSalary} />
            <ExpenseForm onAdd={addExpense} />
          </div>
          <ExpenseList expenses={expenses} onRemove={removeExpense} />
        </div>

        <ExpenseCharts expenses={expenses} />
      </div>
    </div>
  );
}
