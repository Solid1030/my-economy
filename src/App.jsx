import { useEffect, useState } from "react";
import "./App.css";

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const translations = {
  es: {
    appTitle: "Mi Economía",
    dashboard: "Dashboard",
    reports: "Reportes",
    settings: "Configuración",
    month: "Mes",
    createAll: "Crear mes copiando todos los gastos",
    createRecurring: "Crear mes copiando solo recurrentes",
    monthlySummary: "Resumen mensual",
    monthlyIncome: "Ingreso mensual",
    totalPlanned: "Total previsto",
    totalReal: "Total real",
    difference: "Diferencia",
    addExpense: "Agregar gasto",
    expensesMonth: "Gastos del mes",
    name: "Nombre",
    category: "Categoría",
    type: "Tipo",
    expenseType: "Tipo de gasto",
    recurrent: "Recurrente",
    sporadic: "Esporádico",
    frequency: "Frecuencia",
    monthly: "Mensual",
    weekly: "Semanal",
    biweekly: "Bisemanal",
    once: "Una vez",
    paymentDate: "Fecha de pago",
    account: "Cuenta",
    planned: "Previsto",
    real: "Real",
    payments: "Pagos",
    managePayments: "Administrar pagos",
    addPayment: "Agregar pago",
    paymentAmount: "Valor del pago",
    paymentNote: "Nota",
    paymentHistory: "Historial de pagos",
    noPayments: "No hay pagos registrados.",
    close: "Cerrar",
    action: "Acción",
    edit: "Editar",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    byCategory: "Resumen por categoría",
    byAccount: "Resumen por cuenta",
    categoriesConfig: "Configuración de categorías",
    accountsConfig: "Configuración de cuentas",
    createdMonths: "Meses creados",
    newCategory: "Nueva categoría",
    newAccount: "Nueva cuenta",
    addCategory: "Agregar categoría",
    addAccount: "Agregar cuenta",
    noMonths: "No hay meses creados.",
    monthExists: "Este mes ya existe",
    categoryExists: "Esta categoría ya existe",
    accountExists: "Esta cuenta ya existe",
    completeFields: "Completa nombre, total previsto y categoría",
    completePayment: "Completa fecha y valor del pago",
    confirmDeleteMonth: "¿Eliminar el mes",
    noData: "No hay datos para mostrar.",
    total: "Total",
    items: "Cantidad",
  },
  en: {
    appTitle: "My Economy",
    dashboard: "Dashboard",
    reports: "Reports",
    settings: "Settings",
    month: "Month",
    createAll: "Create month copying all expenses",
    createRecurring: "Create month copying recurring expenses only",
    monthlySummary: "Monthly summary",
    monthlyIncome: "Monthly income",
    totalPlanned: "Total planned",
    totalReal: "Total real",
    difference: "Difference",
    addExpense: "Add expense",
    expensesMonth: "Monthly expenses",
    name: "Name",
    category: "Category",
    type: "Type",
    expenseType: "Expense type",
    recurrent: "Recurring",
    sporadic: "Sporadic",
    frequency: "Frequency",
    monthly: "Monthly",
    weekly: "Weekly",
    biweekly: "Biweekly",
    once: "One time",
    paymentDate: "Payment date",
    account: "Account",
    planned: "Planned",
    real: "Real",
    payments: "Payments",
    managePayments: "Manage payments",
    addPayment: "Add payment",
    paymentAmount: "Payment amount",
    paymentNote: "Note",
    paymentHistory: "Payment history",
    noPayments: "No payments registered.",
    close: "Close",
    action: "Action",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    byCategory: "Summary by category",
    byAccount: "Summary by account",
    categoriesConfig: "Category settings",
    accountsConfig: "Account settings",
    createdMonths: "Created months",
    newCategory: "New category",
    newAccount: "New account",
    addCategory: "Add category",
    addAccount: "Add account",
    noMonths: "No months created.",
    monthExists: "This month already exists",
    categoryExists: "This category already exists",
    accountExists: "This account already exists",
    completeFields: "Complete name, planned total and category",
    completePayment: "Complete payment date and amount",
    confirmDeleteMonth: "Delete month",
    noData: "No data to display.",
    total: "Total",
    items: "Items",
  },
  fr: {
    appTitle: "Mon Économie",
    dashboard: "Tableau de bord",
    reports: "Rapports",
    settings: "Configuration",
    month: "Mois",
    createAll: "Créer le mois en copiant toutes les dépenses",
    createRecurring: "Créer le mois avec seulement les dépenses récurrentes",
    monthlySummary: "Résumé mensuel",
    monthlyIncome: "Revenu mensuel",
    totalPlanned: "Total prévu",
    totalReal: "Total réel",
    difference: "Différence",
    addExpense: "Ajouter une dépense",
    expensesMonth: "Dépenses du mois",
    name: "Nom",
    category: "Catégorie",
    type: "Type",
    expenseType: "Type de dépense",
    recurrent: "Récurrent",
    sporadic: "Ponctuel",
    frequency: "Fréquence",
    monthly: "Mensuel",
    weekly: "Hebdomadaire",
    biweekly: "Aux deux semaines",
    once: "Une fois",
    paymentDate: "Date de paiement",
    account: "Compte",
    planned: "Prévu",
    real: "Réel",
    payments: "Paiements",
    managePayments: "Gérer les paiements",
    addPayment: "Ajouter paiement",
    paymentAmount: "Montant du paiement",
    paymentNote: "Note",
    paymentHistory: "Historique des paiements",
    noPayments: "Aucun paiement enregistré.",
    close: "Fermer",
    action: "Action",
    edit: "Modifier",
    save: "Sauvegarder",
    cancel: "Annuler",
    delete: "Supprimer",
    byCategory: "Résumé par catégorie",
    byAccount: "Résumé par compte",
    categoriesConfig: "Configuration des catégories",
    accountsConfig: "Configuration des comptes",
    createdMonths: "Mois créés",
    newCategory: "Nouvelle catégorie",
    newAccount: "Nouveau compte",
    addCategory: "Ajouter catégorie",
    addAccount: "Ajouter compte",
    noMonths: "Aucun mois créé.",
    monthExists: "Ce mois existe déjà",
    categoryExists: "Cette catégorie existe déjà",
    accountExists: "Ce compte existe déjà",
    completeFields: "Complète le nom, le total prévu et la catégorie",
    completePayment: "Complète la date et le montant du paiement",
    confirmDeleteMonth: "Supprimer le mois",
    noData: "Aucune donnée à afficher.",
    total: "Total",
    items: "Quantité",
  },
};

const defaultCategories = [
  "Casa",
  "Carro",
  "Comida",
  "Mascota",
  "Suscripciones",
  "Familia",
  "Salud",
  "Banco",
  "Deuda",
  "Variable",
];

const defaultAccounts = [
  "Cuenta corriente",
  "Ahorros",
  "RBC",
  "Visa",
  "Mastercard",
  "Margen de crédito",
  "Cash",
];

const emptyMonth = {
  income: 0,
  expenses: [],
};

const APP_NAME = "My Economy";
const APP_SUBTITLE = "Take control of your money.";
const APP_VERSION = "v1.3.0";
const APP_DEVELOPER = "Altura IT Solutions";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "es";
  });

  const t = translations[language];

  const [page, setPage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem("accounts");
    return saved ? JSON.parse(saved) : defaultAccounts;
  });

  const [newCategory, setNewCategory] = useState("");
  const [newAccount, setNewAccount] = useState("");

  const [monthlyData, setMonthlyData] = useState(() => {
    const savedData = localStorage.getItem("monthlyData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const currentMonthData = monthlyData[selectedMonth] || emptyMonth;

  const [income, setIncome] = useState(currentMonthData.income);

  const [newExpense, setNewExpense] = useState({
    name: "",
    plannedAmount: "",
    realAmount: 0,
    payments: [],
    frequency: "monthly",
    paymentDay: "",
    account: "Cuenta corriente",
    category: "Casa",
    expenseType: "recurrent",
  });

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const [paymentExpenseIndex, setPaymentExpenseIndex] = useState(null);
  const [newPayment, setNewPayment] = useState({
    date: "",
    amount: "",
    note: "",
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
  }, [monthlyData]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    const data = monthlyData[selectedMonth] || emptyMonth;
    setIncome(data.income);
  }, [selectedMonth, monthlyData]);

  function normalizeFrequency(value) {
    if (value === "Mensual" || value === "Monthly" || value === "Mensuel") return "monthly";
    if (value === "Semanal" || value === "Weekly" || value === "Hebdomadaire") return "weekly";
    if (value === "Bisemanal" || value === "Bisemanual" || value === "Biweekly" || value === "Aux deux semaines") return "biweekly";
    if (value === "Una vez" || value === "One time" || value === "Une fois") return "once";
    return value || "monthly";
  }

  function normalizeExpenseType(value) {
    if (value === "Recurrente" || value === "Recurring" || value === "Récurrent") return "recurrent";
    if (value === "Esporádico" || value === "Sporadic" || value === "Ponctuel") return "sporadic";
    return value || "recurrent";
  }

  function getFrequencyLabel(value) {
    const labels = {
      monthly: t.monthly,
      weekly: t.weekly,
      biweekly: t.biweekly,
      once: t.once,
    };

    return labels[normalizeFrequency(value)] || value;
  }

  function getExpenseTypeLabel(value) {
    const labels = {
      recurrent: t.recurrent,
      sporadic: t.sporadic,
    };

    return labels[normalizeExpenseType(value)] || value;
  }

  function normalizeExpense(expense) {
    return {
      ...expense,
      plannedAmount: Number(expense.plannedAmount ?? 0),
      realAmount: Number(expense.realAmount ?? 0),
      payments: Array.isArray(expense.payments) ? expense.payments : [],
      frequency: normalizeFrequency(expense.frequency),
      paymentDay: expense.paymentDay || "",
      account: expense.account || accounts[0] || "",
      category: expense.category || categories[0] || "",
      expenseType: normalizeExpenseType(expense.expenseType),
    };
  }

  function getPaymentsTotal(expense) {
    const normalized = normalizeExpense(expense);

    return normalized.payments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0
    );
  }

  function getEffectiveReal(expense) {
    const paymentsTotal = getPaymentsTotal(expense);

    if (paymentsTotal > 0) {
      return paymentsTotal;
    }

    if (Number(expense.realAmount) > 0) {
      return Number(expense.realAmount);
    }

    return Number(expense.plannedAmount);
  }

  function saveMonthData(updatedData) {
    setMonthlyData({
      ...monthlyData,
      [selectedMonth]: updatedData,
    });
  }

  function updateIncome(value) {
    const newIncome = Number(value);
    setIncome(newIncome);

    saveMonthData({
      ...currentMonthData,
      income: newIncome,
    });
  }

  function addExpense(event) {
    event.preventDefault();

    if (!newExpense.name || !newExpense.plannedAmount || !newExpense.category) {
      alert(t.completeFields);
      return;
    }

    const expenseToSave = {
      ...newExpense,
      plannedAmount: Number(newExpense.plannedAmount),
      realAmount: 0,
      payments: [],
      frequency: normalizeFrequency(newExpense.frequency),
      expenseType: normalizeExpenseType(newExpense.expenseType),
    };

    saveMonthData({
      ...currentMonthData,
      income,
      expenses: [...currentMonthData.expenses, expenseToSave],
    });

    setNewExpense({
      name: "",
      plannedAmount: "",
      realAmount: 0,
      payments: [],
      frequency: "monthly",
      paymentDay: "",
      account: accounts[0] || "",
      category: categories[0] || "",
      expenseType: "recurrent",
    });
  }

  function startEditRow(index) {
    const expense = normalizeExpense(currentMonthData.expenses[index]);
    setEditingRowIndex(index);
    setEditingExpense(expense);
  }

  function cancelEditRow() {
    setEditingRowIndex(null);
    setEditingExpense(null);
  }

  function saveEditRow(index) {
    if (!editingExpense.name || !editingExpense.plannedAmount || !editingExpense.category) {
      alert(t.completeFields);
      return;
    }

    const updatedExpense = {
      ...editingExpense,
      plannedAmount: Number(editingExpense.plannedAmount),
      realAmount: Number(editingExpense.realAmount || 0),
      payments: Array.isArray(editingExpense.payments) ? editingExpense.payments : [],
      frequency: normalizeFrequency(editingExpense.frequency),
      expenseType: normalizeExpenseType(editingExpense.expenseType),
    };

    const updatedExpenses = currentMonthData.expenses.map((expense, expenseIndex) =>
      expenseIndex === index ? updatedExpense : expense
    );

    saveMonthData({
      ...currentMonthData,
      income,
      expenses: updatedExpenses,
    });

    setEditingRowIndex(null);
    setEditingExpense(null);
  }

  function deleteExpense(indexToDelete) {
    const updatedExpenses = currentMonthData.expenses.filter(
      (_, index) => index !== indexToDelete
    );

    saveMonthData({
      ...currentMonthData,
      income,
      expenses: updatedExpenses,
    });

    if (paymentExpenseIndex === indexToDelete) {
      setPaymentExpenseIndex(null);
    }
  }

  function openPayments(index) {
    setPaymentExpenseIndex(index);
    setNewPayment({
      date: "",
      amount: "",
      note: "",
    });
  }

  function addPayment(event) {
    event.preventDefault();

    if (paymentExpenseIndex === null) return;

    if (!newPayment.date || !newPayment.amount) {
      alert(t.completePayment);
      return;
    }

    const updatedExpenses = currentMonthData.expenses.map((expense, index) => {
      if (index !== paymentExpenseIndex) return expense;

      const normalized = normalizeExpense(expense);

      return {
        ...normalized,
        payments: [
          ...normalized.payments,
          {
            date: newPayment.date,
            amount: Number(newPayment.amount),
            note: newPayment.note,
          },
        ],
      };
    });

    saveMonthData({
      ...currentMonthData,
      income,
      expenses: updatedExpenses,
    });

    setNewPayment({
      date: "",
      amount: "",
      note: "",
    });
  }

  function deletePayment(expenseIndex, paymentIndex) {
    const updatedExpenses = currentMonthData.expenses.map((expense, index) => {
      if (index !== expenseIndex) return expense;

      const normalized = normalizeExpense(expense);

      return {
        ...normalized,
        payments: normalized.payments.filter((_, index) => index !== paymentIndex),
      };
    });

    saveMonthData({
      ...currentMonthData,
      income,
      expenses: updatedExpenses,
    });
  }

  function createNewMonth(copyMode) {
    if (monthlyData[selectedMonth]) {
      alert(t.monthExists);
      return;
    }

    const [year, month] = selectedMonth.split("-").map(Number);
    const previousDate = new Date(year, month - 2, 1);
    const previousMonth = previousDate.toISOString().slice(0, 7);

    let expensesToCopy = monthlyData[previousMonth]
      ? monthlyData[previousMonth].expenses.map((expense) => normalizeExpense(expense))
      : [];

    if (copyMode === "recurrent") {
      expensesToCopy = expensesToCopy.filter(
        (expense) => expense.expenseType === "recurrent"
      );
    }

    expensesToCopy = expensesToCopy.map((expense) => ({
      ...expense,
      realAmount: 0,
      payments: [],
    }));

    const incomeToCopy = monthlyData[previousMonth]
      ? monthlyData[previousMonth].income
      : 5600;

    saveMonthData({
      income: incomeToCopy,
      expenses: expensesToCopy,
    });
  }

  function deleteMonth(monthToDelete) {
    if (!confirm(`${t.confirmDeleteMonth} ${monthToDelete}?`)) return;

    const updatedMonthlyData = { ...monthlyData };
    delete updatedMonthlyData[monthToDelete];

    setMonthlyData(updatedMonthlyData);

    if (selectedMonth === monthToDelete) {
      setSelectedMonth(getCurrentMonth());
    }
  }

  function addCategory(event) {
    event.preventDefault();

    const value = newCategory.trim();
    if (!value) return;

    if (categories.includes(value)) {
      alert(t.categoryExists);
      return;
    }

    setCategories([...categories, value]);
    setNewCategory("");
  }

  function deleteCategory(categoryToDelete) {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  }

  function addAccount(event) {
    event.preventDefault();

    const value = newAccount.trim();
    if (!value) return;

    if (accounts.includes(value)) {
      alert(t.accountExists);
      return;
    }

    setAccounts([...accounts, value]);
    setNewAccount("");
  }

  function deleteAccount(accountToDelete) {
    setAccounts(accounts.filter((account) => account !== accountToDelete));
  }

  const normalizedExpenses = currentMonthData.expenses.map(normalizeExpense);

  const totalPlanned = normalizedExpenses.reduce(
    (sum, item) => sum + Number(item.plannedAmount),
    0
  );

  const totalReal = normalizedExpenses.reduce(
    (sum, item) => sum + getEffectiveReal(item),
    0
  );

  const difference = totalPlanned - totalReal;

  function groupExpensesBy(fieldName) {
    const totals = {};

    normalizedExpenses.forEach((expense) => {
      const key = expense[fieldName] || "Sin definir";
      const value = getEffectiveReal(expense);

      if (!totals[key]) {
        totals[key] = {
          name: key,
          amount: 0,
          count: 0,
        };
      }

      totals[key].amount += value;
      totals[key].count += 1;
    });

    return Object.values(totals)
      .map((item) => ({
        ...item,
        amount: Number(item.amount.toFixed(2)),
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  const categoryReportData = groupExpensesBy("category");
  const accountReportData = groupExpensesBy("account");

  const selectedPaymentExpense =
    paymentExpenseIndex !== null && currentMonthData.expenses[paymentExpenseIndex]
      ? normalizeExpense(currentMonthData.expenses[paymentExpenseIndex])
      : null;

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "0",
      fontFamily: "Inter, Arial, sans-serif",
      background:
        "radial-gradient(circle at top left, #182023 0%, #090b0d 38%, #050505 100%)",
      color: "#f5f5f5",
    },
    appShell: {
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "0 24px 24px",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "24px 24px 18px",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      backgroundColor: "rgba(0,0,0,0.35)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    logo: {
      width: "68px",
      height: "68px",
      objectFit: "contain",
    },
    brandTitle: {
      margin: 0,
      fontSize: "32px",
      lineHeight: "34px",
      fontWeight: 800,
      letterSpacing: "-0.5px",
    },
    brandSubtitle: {
      margin: "6px 0 0",
      color: "#b8b8b8",
      fontSize: "15px",
    },
    nav: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    navButton: {
      padding: "14px 18px",
      borderRadius: "0",
      border: "none",
      borderBottom: "3px solid transparent",
      cursor: "pointer",
      backgroundColor: "transparent",
      color: "#b8b8b8",
      fontSize: "15px",
    },
    navButtonActive: {
      color: "#ffffff",
      backgroundColor: "rgba(255,255,255,0.05)",
      borderBottom: "3px solid #e10600",
    },
    smallSelect: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.16)",
      backgroundColor: "#0b0d0f",
      color: "#ffffff",
      outline: "none",
      cursor: "pointer",
    },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "minmax(320px, 1fr) minmax(420px, 1.8fr)",
      gap: "20px",
      marginTop: "22px",
    },
    card: {
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
    },
    summaryGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(160px, 1fr))",
      gap: "15px",
    },
    summaryBox: {
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: "10px",
      padding: "15px",
      backgroundColor: "rgba(255,255,255,0.04)",
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "14px",
    },
    input: {
      width: "100%",
      padding: "11px 12px",
      borderRadius: "7px",
      border: "1px solid rgba(255,255,255,0.18)",
      marginTop: "6px",
      boxSizing: "border-box",
      backgroundColor: "rgba(0,0,0,0.22)",
      color: "#f5f5f5",
      outline: "none",
    },
    tableInput: {
      width: "105px",
      padding: "6px",
      borderRadius: "5px",
      border: "1px solid rgba(255,255,255,0.18)",
      fontSize: "12px",
      backgroundColor: "rgba(0,0,0,0.25)",
      color: "#f5f5f5",
    },
    button: {
      padding: "10px 14px",
      borderRadius: "7px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "rgba(255,255,255,0.11)",
      color: "#ffffff",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #e10600, #9f0602)",
      color: "#ffffff",
      boxShadow: "0 10px 22px rgba(225,6,0,0.25)",
    },
    dangerButton: {
      backgroundColor: "#b91c1c",
      color: "#ffffff",
    },
    tableWrapper: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      fontSize: "12px",
      backgroundColor: "rgba(0,0,0,0.16)",
    },
    th: {
      padding: "10px",
      border: "1px solid rgba(255,255,255,0.13)",
      whiteSpace: "nowrap",
      color: "#ffffff",
      backgroundColor: "rgba(255,255,255,0.04)",
    },
    td: {
      padding: "9px",
      border: "1px solid rgba(255,255,255,0.10)",
      textAlign: "center",
      fontSize: "12px",
      whiteSpace: "nowrap",
      color: "#e9e9e9",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "8px",
      backgroundColor: "rgba(255,255,255,0.04)",
    },
    reportGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
      gap: "25px",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.72)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px",
      backdropFilter: "blur(8px)",
    },
    modal: {
      background:
        "linear-gradient(145deg, rgba(31,31,31,0.98), rgba(9,11,13,0.98))",
      border: "1px solid rgba(255,255,255,0.16)",
      borderRadius: "14px",
      padding: "25px",
      width: "90%",
      maxWidth: "1000px",
      maxHeight: "85vh",
      overflowY: "auto",
      boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
    },
    footer: {
      marginTop: "30px",
      padding: "22px 0",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "20px",
      alignItems: "center",
      color: "#a8a8a8",
      fontSize: "14px",
    },
    footerBrand: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },
    footerLogo: {
      width: "52px",
      height: "52px",
      objectFit: "contain",
    },
    redText: {
      color: "#e10600",
      fontWeight: 700,
    },
  };

  function getDifferenceStyle(value) {
    if (value > 0) {
      return {
        backgroundColor: "#1f7a1f",
        color: "white",
        fontWeight: "bold",
      };
    }

    if (value < 0) {
      return {
        backgroundColor: "#a12626",
        color: "white",
        fontWeight: "bold",
      };
    }

    return {
      backgroundColor: "#b59b20",
      color: "white",
      fontWeight: "bold",
    };
  }

  function renderReportTable(data, labelColumn) {
    return (
      <div className="table-wrapper" style={styles.tableWrapper}>
        <table className="data-table" style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>{labelColumn}</th>
              <th style={styles.th}>{t.items}</th>
              <th style={styles.th}>{t.total}</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td style={styles.td} colSpan="3">
                  {t.noData}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.name}>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.count}</td>
                  <td style={styles.td}>${item.amount.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="page" style={styles.page}>
      <div className="top-bar" style={styles.topBar}>
        <div className="brand" style={styles.brand}>
          <img src="/Altura.png" alt="Altura IT Solutions" style={styles.logo} />
          <div>
            <h1 className="brand-title" style={styles.brandTitle}>{APP_NAME}</h1>
            <p className="brand-subtitle" style={styles.brandSubtitle}>{APP_SUBTITLE}</p>
          </div>
        </div>

        <div className="nav" style={styles.nav}>
          <button
            style={{
              ...styles.navButton,
              ...(page === "dashboard" ? styles.navButtonActive : {}),
            }}
            onClick={() => setPage("dashboard")}
          >
            {t.dashboard}
          </button>

          <button
            style={{
              ...styles.navButton,
              ...(page === "reports" ? styles.navButtonActive : {}),
            }}
            onClick={() => setPage("reports")}
          >
            {t.reports}
          </button>

          <button
            style={{
              ...styles.navButton,
              ...(page === "settings" ? styles.navButtonActive : {}),
            }}
            onClick={() => setPage("settings")}
          >
            {t.settings}
          </button>

          <select
            style={styles.smallSelect}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option style={{ backgroundColor: "#0b0d0f", color: "#ffffff" }} value="es">
              Español
            </option>
            <option style={{ backgroundColor: "#0b0d0f", color: "#ffffff" }} value="en">
              English
            </option>
            <option style={{ backgroundColor: "#0b0d0f", color: "#ffffff" }} value="fr">
              Français
            </option>
          </select>
        </div>
      </div>

      <main className="app-shell" style={styles.appShell}>
      {page === "dashboard" && (
        <>
          <div className="card" style={styles.card}>
            <h2>{t.month}</h2>

            <input
              style={styles.input}
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
              <button onClick={() => createNewMonth("all")} style={styles.button}>
                {t.createAll}
              </button>

              <button onClick={() => createNewMonth("recurrent")} style={styles.button}>
                {t.createRecurring}
              </button>
            </div>
          </div>

          <div className="card" style={styles.card}>
            <h2>{t.monthlySummary}</h2>

            <label>{t.monthlyIncome}</label>

            <input
              style={styles.input}
              type="number"
              value={income}
              onChange={(e) => updateIncome(e.target.value)}
            />

            <div
  className="summary-grid"
  style={{ ...styles.summaryGrid, marginTop: "20px" }}
>
              <div style={styles.summaryBox}>
                <strong>{t.totalPlanned}</strong>
                <p>${totalPlanned.toFixed(2)}</p>
              </div>

              <div style={{ ...styles.summaryBox, ...getDifferenceStyle(difference) }}>
                <strong>{t.totalReal}</strong>
                <p>${totalReal.toFixed(2)}</p>
              </div>

              <div style={{ ...styles.summaryBox, ...getDifferenceStyle(difference) }}>
                <strong>{t.difference}</strong>
                <p>${difference.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="card" style={styles.card}>
            <h2>{t.addExpense}</h2>

            <form onSubmit={addExpense} className="form-grid" style={styles.formGrid}>
              <div>
                <label>{t.name}</label>
                <input
                  style={styles.input}
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                />
              </div>

              <div>
                <label>{t.totalPlanned}</label>
                <input
                  style={styles.input}
                  type="number"
                  value={newExpense.plannedAmount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, plannedAmount: e.target.value })
                  }
                />
              </div>

              <div>
                <label>{t.category}</label>
                <select
                  style={styles.input}
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>{t.expenseType}</label>
                <select
                  style={styles.input}
                  value={newExpense.expenseType}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, expenseType: e.target.value })
                  }
                >
                  <option value="recurrent">{t.recurrent}</option>
                  <option value="sporadic">{t.sporadic}</option>
                </select>
              </div>

              <div>
                <label>{t.frequency}</label>
                <select
                  style={styles.input}
                  value={newExpense.frequency}
                  onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}
                >
                  <option value="monthly">{t.monthly}</option>
                  <option value="weekly">{t.weekly}</option>
                  <option value="biweekly">{t.biweekly}</option>
                  <option value="once">{t.once}</option>
                </select>
              </div>

              <div>
                <label>{t.paymentDate}</label>
                <input
                  style={styles.input}
                  type="date"
                  value={newExpense.paymentDay}
                  onChange={(e) => setNewExpense({ ...newExpense, paymentDay: e.target.value })}
                />
              </div>

              <div>
                <label>{t.account}</label>
                <select
                  style={styles.input}
                  value={newExpense.account}
                  onChange={(e) => setNewExpense({ ...newExpense, account: e.target.value })}
                >
                  {accounts.map((account) => (
                    <option key={account} value={account}>
                      {account}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "end" }}>
                <button type="submit" style={styles.button}>
                  {t.addExpense}
                </button>
              </div>
            </form>
          </div>

          <div className="card" style={styles.card}>
            <h2>{t.expensesMonth}</h2>

            <div className="table-wrapper" style={styles.tableWrapper}>
              <table className="data-table" style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>{t.name}</th>
                    <th style={styles.th}>{t.category}</th>
                    <th style={styles.th}>{t.type}</th>
                    <th style={styles.th}>{t.frequency}</th>
                    <th style={styles.th}>{t.paymentDate}</th>
                    <th style={styles.th}>{t.account}</th>
                    <th style={styles.th}>{t.planned}</th>
                    <th style={styles.th}>{t.real}</th>
                    <th style={styles.th}>{t.difference}</th>
                    <th style={styles.th}>{t.payments}</th>
                    <th style={styles.th}>{t.action}</th>
                  </tr>
                </thead>

                <tbody>
                  {normalizedExpenses.map((expense, index) => {
                    const isEditing = editingRowIndex === index;
                    const activeExpense = isEditing ? editingExpense : expense;
                    const effectiveReal = getEffectiveReal(activeExpense);
                    const expenseDifference =
                      Number(activeExpense.plannedAmount) - effectiveReal;

                    return (
                      <tr
  key={index}
  onClick={() => {
    if (window.innerWidth <= 768) {
      openPayments(index);
    }
  }}
  style={{
    cursor: window.innerWidth <= 768 ? "pointer" : "default",
  }}
>
                        <td style={styles.td}>
                          {isEditing ? (
                            <input
                              style={styles.tableInput}
                              value={editingExpense.name}
                              onChange={(e) =>
                                setEditingExpense({ ...editingExpense, name: e.target.value })
                              }
                            />
                          ) : (
                            expense.name
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <select
                              style={styles.tableInput}
                              value={editingExpense.category}
                              onChange={(e) =>
                                setEditingExpense({ ...editingExpense, category: e.target.value })
                              }
                            >
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          ) : (
                            expense.category
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <select
                              style={styles.tableInput}
                              value={editingExpense.expenseType}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  expenseType: e.target.value,
                                })
                              }
                            >
                              <option value="recurrent">{t.recurrent}</option>
                              <option value="sporadic">{t.sporadic}</option>
                            </select>
                          ) : (
                            getExpenseTypeLabel(expense.expenseType)
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <select
                              style={styles.tableInput}
                              value={editingExpense.frequency}
                              onChange={(e) =>
                                setEditingExpense({ ...editingExpense, frequency: e.target.value })
                              }
                            >
                              <option value="monthly">{t.monthly}</option>
                              <option value="weekly">{t.weekly}</option>
                              <option value="biweekly">{t.biweekly}</option>
                              <option value="once">{t.once}</option>
                            </select>
                          ) : (
                            getFrequencyLabel(expense.frequency)
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <input
                              style={styles.tableInput}
                              type="date"
                              value={editingExpense.paymentDay}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  paymentDay: e.target.value,
                                })
                              }
                            />
                          ) : (
                            expense.paymentDay
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <select
                              style={styles.tableInput}
                              value={editingExpense.account}
                              onChange={(e) =>
                                setEditingExpense({ ...editingExpense, account: e.target.value })
                              }
                            >
                              {accounts.map((account) => (
                                <option key={account} value={account}>
                                  {account}
                                </option>
                              ))}
                            </select>
                          ) : (
                            expense.account
                          )}
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <input
                              style={styles.tableInput}
                              type="number"
                              value={editingExpense.plannedAmount}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  plannedAmount: e.target.value,
                                })
                              }
                            />
                          ) : (
                            `$${Number(expense.plannedAmount).toFixed(2)}`
                          )}
                        </td>

                        <td style={styles.td}>${effectiveReal.toFixed(2)}</td>

                        <td
                          style={{
                            ...styles.td,
                            ...getDifferenceStyle(expenseDifference),
                          }}
                        >
                          ${expenseDifference.toFixed(2)}
                        </td>

                        <td style={styles.td}>
                          <button onClick={() => openPayments(index)}>
                            {t.managePayments}
                          </button>
                        </td>

                        <td style={styles.td}>
                          {isEditing ? (
                            <>
                              <button onClick={() => saveEditRow(index)}>{t.save}</button>

                              <button
                                onClick={cancelEditRow}
                                style={{ marginLeft: "5px" }}
                              >
                                {t.cancel}
                              </button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => startEditRow(index)}>{t.edit}</button>

                              <button
                                onClick={() => deleteExpense(index)}
                                style={{ marginLeft: "5px" }}
                              >
                                {t.delete}
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {page === "reports" && (
        <>
          <div className="card" style={styles.card}>
            <h2>{t.month}</h2>

            <input
              style={styles.input}
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>

          <div className="report-card" style={styles.card}>
  <h2>{t.byCategory}</h2>

  {renderReportTable(categoryReportData, t.category)}

  <div className="mobile-report-list">
    {categoryReportData.map((item) => (
      <div key={item.name} className="mobile-report-item">
        <span className="mobile-report-name">{item.name}</span>
        <span className="mobile-report-value">
          ${item.amount.toFixed(2)}
        </span>
      </div>
    ))}
  </div>
</div>

            <div className="report-card" style={styles.card}>
  <h2>{t.byAccount}</h2>

  {renderReportTable(accountReportData, t.account)}

  <div className="mobile-report-list">
    {accountReportData.map((item) => (
      <div key={item.name} className="mobile-report-item">
        <span className="mobile-report-name">{item.name}</span>

        <span className="mobile-report-value">
          ${item.amount.toFixed(2)}
        </span>
      </div>
    ))}
  </div>
</div>
          </div>
        </>
      )}

      {page === "settings" && (
        <>
          <div className="card" style={styles.card}>
            <h2>{t.categoriesConfig}</h2>

            <form onSubmit={addCategory} style={{ display: "flex", gap: "10px" }}>
              <input
                style={styles.input}
                placeholder={t.newCategory}
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />

              <button style={styles.button} type="submit">
                {t.addCategory}
              </button>
            </form>

            <div style={{ marginTop: "20px" }}>
              {categories.map((category) => (
                <div key={category} style={styles.listItem}>
                  <span>{category}</span>

                  <button onClick={() => deleteCategory(category)}>
                    {t.delete}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={styles.card}>
            <h2>{t.accountsConfig}</h2>

            <form onSubmit={addAccount} style={{ display: "flex", gap: "10px" }}>
              <input
                style={styles.input}
                placeholder={t.newAccount}
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
              />

              <button style={styles.button} type="submit">
                {t.addAccount}
              </button>
            </form>

            <div style={{ marginTop: "20px" }}>
              {accounts.map((account) => (
                <div key={account} style={styles.listItem}>
                  <span>{account}</span>

                  <button onClick={() => deleteAccount(account)}>{t.delete}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={styles.card}>
            <h2>{t.createdMonths}</h2>

            {Object.keys(monthlyData).length === 0 && <p>{t.noMonths}</p>}

            {Object.keys(monthlyData)
              .sort()
              .map((month) => (
                <div key={month} style={styles.listItem}>
                  <span>{month}</span>

                  <button onClick={() => deleteMonth(month)}>{t.delete}</button>
                </div>
              ))}
          </div>
        </>
      )}

      <footer className="footer" style={styles.footer}>
        <div style={styles.footerBrand}>
          <img src="/altura-logo.png" alt="Altura IT Solutions" style={styles.footerLogo} />
          <div>
            <strong>{APP_NAME}</strong> <span style={{ marginLeft: "10px" }}>{APP_VERSION}</span>
            <p style={{ margin: "6px 0 0" }}>{APP_SUBTITLE}</p>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          Developed by <span style={styles.redText}>{APP_DEVELOPER}</span>
          <br />© 2026 Diego Isaza
        </div>

        <div>
          {APP_NAME} is a personal finance management application designed to help you plan, track and control your finances.
        </div>
      </footer>
      </main>

      {selectedPaymentExpense && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>
              {t.managePayments}: {selectedPaymentExpense.name}
            </h2>

            <p>
              {t.planned}: ${selectedPaymentExpense.plannedAmount.toFixed(2)} | {" "}
              {t.real}: ${getEffectiveReal(selectedPaymentExpense).toFixed(2)} | {" "}
              {t.difference}: $
              {(
                selectedPaymentExpense.plannedAmount -
                getEffectiveReal(selectedPaymentExpense)
              ).toFixed(2)}
            </p>

            <form onSubmit={addPayment} style={styles.formGrid}>
              <div>
                <label>{t.paymentDate}</label>
                <input
                  style={styles.input}
                  type="date"
                  value={newPayment.date}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label>{t.paymentAmount}</label>
                <input
                  style={styles.input}
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                />
              </div>

              <div>
                <label>{t.paymentNote}</label>
                <input
                  style={styles.input}
                  value={newPayment.note}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, note: e.target.value })
                  }
                />
              </div>

              <div style={{ display: "flex", alignItems: "end", gap: "10px" }}>
                <button type="submit" style={styles.button}>
                  {t.addPayment}
                </button>

                <button
                  type="button"
                  style={styles.button}
                  onClick={() => setPaymentExpenseIndex(null)}
                >
                  {t.close}
                </button>
              </div>
            </form>

            <h3>{t.paymentHistory}</h3>

            <div className="table-wrapper" style={styles.tableWrapper}>
              <table className="data-table" style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>{t.paymentDate}</th>
                    <th style={styles.th}>{t.paymentAmount}</th>
                    <th style={styles.th}>{t.paymentNote}</th>
                    <th style={styles.th}>{t.action}</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedPaymentExpense.payments.length === 0 ? (
                    <tr>
                      <td style={styles.td} colSpan="4">
                        {t.noPayments}
                      </td>
                    </tr>
                  ) : (
                    selectedPaymentExpense.payments.map((payment, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{payment.date}</td>

                        <td style={styles.td}>
                          ${Number(payment.amount).toFixed(2)}
                        </td>

                        <td style={styles.td}>{payment.note}</td>

                        <td style={styles.td}>
                          <button
                            onClick={() => deletePayment(paymentExpenseIndex, index)}
                          >
                            {t.delete}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
