export enum ExpensePriority {
  ESSENTIAL = "Essencial",
  IMPORTANT = "Importante",
  OPTIONAL = "Opcional",
}

export enum ExpenseType {
  HOUSING = "Moradia",
  FOOD = "Alimentação",
  TRANSPORT = "Transporte",
  HEALTH = "Saúde",
  EDUCATION = "Educação",
  LEISURE = "Lazer",
  CLOTHING = "Vestuário",
  OTHER = "Outros",
}

export interface Expense {
  id: string;
  name: string;
  value: number;
  priority: ExpensePriority;
  type: ExpenseType;
}
