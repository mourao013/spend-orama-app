import React from "react";

interface SalaryInputProps {
  salary: number;
  onSalaryChange: (value: number) => void;
}

export default function SalaryInput({ salary, onSalaryChange }: SalaryInputProps) {
  return (
    <div className="rounded-lg bg-card p-6 shadow-sm border border-border">
      <h2 className="font-display text-lg font-bold text-foreground mb-4">💰 Salário Total</h2>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">R$</span>
        <input
          type="number"
          min={0}
          value={salary || ""}
          onChange={(e) => onSalaryChange(Number(e.target.value))}
          placeholder="0,00"
          className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-3 text-lg font-medium text-foreground outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}
