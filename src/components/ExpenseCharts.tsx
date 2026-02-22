import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Expense } from "@/types/expense";

interface ExpenseChartsProps {
  expenses: Expense[];
}

const COLORS = [
  "hsl(243, 75%, 59%)",
  "hsl(168, 76%, 42%)",
  "hsl(0, 84%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(200, 80%, 50%)",
  "hsl(340, 75%, 55%)",
  "hsl(120, 60%, 45%)",
];

export default function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  if (expenses.length === 0) return null;

  const byType = Object.values(
    expenses.reduce<Record<string, { name: string; value: number }>>((acc, e) => {
      acc[e.type] = acc[e.type] || { name: e.type, value: 0 };
      acc[e.type].value += e.value;
      return acc;
    }, {})
  );

  const byPriority = Object.values(
    expenses.reduce<Record<string, { name: string; value: number }>>((acc, e) => {
      acc[e.priority] = acc[e.priority] || { name: e.priority, value: 0 };
      acc[e.priority].value += e.value;
      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
        <h2 className="font-display text-lg font-bold text-foreground mb-4">🍩 Gastos por Tipo</h2>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={byType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}>
              {byType.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
        <h2 className="font-display text-lg font-bold text-foreground mb-4">📊 Gastos por Prioridade</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={byPriority}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `R$ ${Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {byPriority.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
