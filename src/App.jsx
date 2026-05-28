import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const APP_NAME = "My Economy";
const APP_SUBTITLE = "Take control of your money.";
const APP_VERSION = "v1.5.0";
const APP_DEVELOPER = "Altura IT Solutions";
const INCOME_CATEGORY = "Ingresos";

const translations = {
  es: {
    dashboard: "Dashboard",
    reports: "Reportes",
    settings: "Configuración",
    howTo: "HOW TO",
    month: "Mes",
    createAll: "Crear mes copiando todos los gastos",
    createRecurring: "Crear mes copiando solo recurrentes",
    monthlySummary: "Resumen mensual",
    monthlyIncome: "Ingreso mensual",
    incomeFrequency: "Frecuencia del ingreso",
    incomeDate: "Fecha del primer ingreso",
    randomIncome: "Ingresos aleatorios",
    totalPlanned: "Total previsto",
    totalReal: "Total real",
    available: "Disponible",
    difference: "Diferencia",
    addExpense: "Agregar movimiento",
    expensesMonth: "Movimientos del mes",
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
    twiceMonthly: "Dos veces al mes",
    once: "Una vez",
    paymentDate: "Fecha de pago",
    sortOriginal: "Orden original",
    sortAsc: "Ordenar por fecha ascendente",
    sortDesc: "Ordenar por fecha descendente",
    account: "Cuenta",
    planned: "Previsto",
    real: "Real",
    pending: "Pendiente",
    payments: "Pagos",
    managePayments: "Admin",
    managePaymentsFull: "Administrar pagos",
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
    protectedCategory: "Esta categoría está protegida y no se puede eliminar.",
    noData: "No hay datos para mostrar.",
    total: "Total",
    items: "Cantidad",
    todayAndUpcoming: "Hoy y pagos a venir",
    currentDate: "Fecha actual",
    upcomingPayments: "Próximos movimientos",
    noUpcomingPayments: "No hay movimientos próximos.",
    today: "Hoy",
    inDays: "en",
    days: "días",
    salary: "Salario",
    income: "Ingreso",
    expense: "Gasto",
    savings: "ahorro",
    overCost: "sobrecosto",
    exportPdf: "Generar reporte PDF",
    downloadGuide: "Descargar instructivo PDF",
    monthlyStatement: "Reporte mensual",
    userGuide: "Instructivo de uso",
    exportData: "Exportar datos",
    importData: "Importar datos",
    importSuccess: "Datos importados correctamente",
    importError: "Error al importar datos",
    confirmOverwrite: "Los datos existentes serán sobrescritos. ¿Continuar?",
    backup: "Respaldo",
  },
  en: {
    dashboard: "Dashboard",
    reports: "Reports",
    settings: "Settings",
    howTo: "HOW TO",
    month: "Month",
    createAll: "Create month copying all expenses",
    createRecurring: "Create month copying recurring expenses only",
    monthlySummary: "Monthly summary",
    monthlyIncome: "Monthly income",
    incomeFrequency: "Income frequency",
    incomeDate: "First income date",
    randomIncome: "Random income",
    totalPlanned: "Total planned",
    totalReal: "Total real",
    available: "Available",
    difference: "Difference",
    addExpense: "Add movement",
    expensesMonth: "Monthly movements",
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
    twiceMonthly: "Twice a month",
    once: "One time",
    paymentDate: "Payment date",
    sortOriginal: "Original order",
    sortAsc: "Sort by date ascending",
    sortDesc: "Sort by date descending",
    account: "Account",
    planned: "Planned",
    real: "Real",
    pending: "Pending",
    payments: "Payments",
    managePayments: "Admin",
    managePaymentsFull: "Manage payments",
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
    protectedCategory: "This category is protected and cannot be deleted.",
    noData: "No data to display.",
    total: "Total",
    items: "Items",
    todayAndUpcoming: "Today and upcoming payments",
    currentDate: "Current date",
    upcomingPayments: "Upcoming movements",
    noUpcomingPayments: "No upcoming movements.",
    today: "Today",
    inDays: "in",
    days: "days",
    salary: "Salary",
    income: "Income",
    expense: "Expense",
    savings: "saved",
    overCost: "over budget",
    exportPdf: "Generate PDF report",
    downloadGuide: "Download user guide PDF",
    monthlyStatement: "Monthly statement",
    userGuide: "User guide",
    exportData: "Export data",
    importData: "Import data",
    importSuccess: "Data imported successfully",
    importError: "Error importing data",
    confirmOverwrite: "Existing data will be overwritten. Continue?",
    backup: "Backup",
  },
  fr: {
    dashboard: "Tableau de bord",
    reports: "Rapports",
    settings: "Configuration",
    howTo: "HOW TO",
    month: "Mois",
    createAll: "Créer le mois en copiant toutes les dépenses",
    createRecurring: "Créer le mois avec seulement les dépenses récurrentes",
    monthlySummary: "Résumé mensuel",
    monthlyIncome: "Revenu mensuel",
    incomeFrequency: "Fréquence du revenu",
    incomeDate: "Date du premier revenu",
    randomIncome: "Revenus aléatoires",
    totalPlanned: "Total prévu",
    totalReal: "Total réel",
    available: "Disponible",
    difference: "Différence",
    addExpense: "Ajouter un mouvement",
    expensesMonth: "Mouvements du mois",
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
    twiceMonthly: "Deux fois par mois",
    once: "Une fois",
    paymentDate: "Date de paiement",
    sortOriginal: "Ordre original",
    sortAsc: "Trier par date croissante",
    sortDesc: "Trier par date décroissante",
    account: "Compte",
    planned: "Prévu",
    real: "Réel",
    pending: "En attente",
    payments: "Paiements",
    managePayments: "Admin",
    managePaymentsFull: "Gérer les paiements",
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
    protectedCategory: "Cette catégorie est protégée et ne peut pas être supprimée.",
    noData: "Aucune donnée à afficher.",
    total: "Total",
    items: "Quantité",
    todayAndUpcoming: "Aujourd’hui et paiements à venir",
    currentDate: "Date actuelle",
    upcomingPayments: "Mouvements à venir",
    noUpcomingPayments: "Aucun mouvement à venir.",
    today: "Aujourd’hui",
    inDays: "dans",
    days: "jours",
    salary: "Salaire",
    income: "Revenu",
    expense: "Dépense",
    savings: "économie",
    overCost: "surcoût",
    exportPdf: "Générer rapport PDF",
    downloadGuide: "Télécharger guide PDF",
    monthlyStatement: "Rapport mensuel",
    userGuide: "Guide d’utilisation",
    exportData: "Exporter les données",
    importData: "Importer les données",
    importSuccess: "Données importées avec succès",
    importError: "Erreur lors de l'importation",
    confirmOverwrite: "Les données existantes seront écrasées. Continuer ?",
    backup: "Sauvegarde",
  },
};

const defaultCategories = [
  INCOME_CATEGORY,
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
  "ApplePay",
];

const emptyMonth = {
  income: "",
  incomeFrequency: "monthly",
  incomeDate: "",
  expenses: [],
};

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "es");
  const t = translations[language];

  const [page, setPage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [sortByDate, setSortByDate] = useState(null);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    const parsed = saved ? JSON.parse(saved) : defaultCategories;
    return parsed.includes(INCOME_CATEGORY) ? parsed : [INCOME_CATEGORY, ...parsed];
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

  const [income, setIncome] = useState(currentMonthData.income || "");
  const [incomeFrequency, setIncomeFrequency] = useState(currentMonthData.incomeFrequency || "monthly");
  const [incomeDate, setIncomeDate] = useState(currentMonthData.incomeDate || "");

  const [newExpense, setNewExpense] = useState({
    name: "",
    plannedAmount: "",
    realAmount: 0,
    payments: [],
    frequency: "monthly",
    paymentDay: "",
    account: defaultAccounts[0],
    category: defaultCategories[1],
    expenseType: "recurrent",
  });

  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [paymentExpenseIndex, setPaymentExpenseIndex] = useState(null);
  const [newPayment, setNewPayment] = useState({ date: "", amount: "", note: "" });

  // Persistencia
  useEffect(() => localStorage.setItem("language", language), [language]);
  useEffect(() => localStorage.setItem("monthlyData", JSON.stringify(monthlyData)), [monthlyData]);
  useEffect(() => localStorage.setItem("categories", JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem("accounts", JSON.stringify(accounts)), [accounts]);

  useEffect(() => {
    const data = monthlyData[selectedMonth] || emptyMonth;
    setIncome(data.income || "");
    setIncomeFrequency(data.incomeFrequency || "monthly");
    setIncomeDate(data.incomeDate || "");
  }, [selectedMonth, monthlyData]);

  // ============ FUNCIONES DE EXPORTACIÓN/IMPORTACIÓN ============
  
  function exportData() {
    const exportObj = {
      version: APP_VERSION,
      exportDate: new Date().toISOString(),
      categories: categories,
      accounts: accounts,
      monthlyData: monthlyData,
    };
    
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-economy-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (!importedData.categories || !importedData.accounts || !importedData.monthlyData) {
          alert(t.importError);
          return;
        }

        if (Object.keys(monthlyData).length > 0) {
          if (!confirm(t.confirmOverwrite)) {
            return;
          }
        }

        setCategories(importedData.categories);
        setAccounts(importedData.accounts);
        setMonthlyData(importedData.monthlyData);
        alert(t.importSuccess);
      } catch (error) {
        console.error("Error importing data:", error);
        alert(t.importError);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  // ============ FUNCIONES AUXILIARES ============

  function normalizeFrequency(value) {
    if (value === "Mensual" || value === "Monthly" || value === "Mensuel") return "monthly";
    if (value === "Semanal" || value === "Weekly" || value === "Hebdomadaire") return "weekly";
    if (value === "Bisemanal" || value === "Bisemanual" || value === "Biweekly" || value === "Aux deux semaines") return "biweekly";
    if (value === "Dos veces al mes" || value === "Twice a month" || value === "Deux fois par mois") return "biweekly";
    if (value === "Una vez" || value === "One time" || value === "Une fois") return "once";
    return value || "monthly";
  }

  function normalizeExpenseType(value) {
    if (value === "Recurrente" || value === "Recurring" || value === "Récurrent") return "recurrent";
    if (value === "Esporádico" || value === "Sporadic" || value === "Ponctuel") return "sporadic";
    return value || "recurrent";
  }

  function getFrequencyLabel(value) {
    const labels = { monthly: t.monthly, weekly: t.weekly, biweekly: t.biweekly, once: t.once };
    return labels[normalizeFrequency(value)] || value;
  }

  function getExpenseTypeLabel(value) {
    const labels = { recurrent: t.recurrent, sporadic: t.sporadic };
    return labels[normalizeExpenseType(value)] || value;
  }

  function toggleDateSort() {
    setSortByDate((previousSort) => {
      if (previousSort === null) return "asc";
      if (previousSort === "asc") return "desc";
      return null;
    });
  }

  function getDateSortIcon() {
    if (sortByDate === "asc") return "▲";
    if (sortByDate === "desc") return "▼";
    return "↕";
  }

  function getDateSortTitle() {
    if (sortByDate === null) return t.sortAsc;
    if (sortByDate === "asc") return t.sortDesc;
    return t.sortOriginal;
  }

  function isIncomeItem(expense) {
    return expense?.category === INCOME_CATEGORY;
  }

  function isSalaryItem(expense) {
    return expense?.isVirtualSalary === true;
  }

  function isSplitExpenseItem(expense) {
    return expense?.isVirtualSplitExpense === true;
  }

  function isIncomingItem(expense) {
    return isIncomeItem(expense) || isSalaryItem(expense);
  }

  function sortPaymentsByDate(payments) {
    return [...(payments || [])].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date + "T00:00:00") - new Date(b.date + "T00:00:00");
    });
  }

  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  function formatDateForInput(date) {
    return date.toISOString().slice(0, 10);
  }

  function normalizeExpense(expense) {
    return {
      ...expense,
      plannedAmount: Number(expense?.plannedAmount ?? 0),
      realAmount: Number(expense?.realAmount ?? 0),
      payments: sortPaymentsByDate(Array.isArray(expense?.payments) ? expense.payments : []),
      frequency: normalizeFrequency(expense?.frequency),
      paymentDay: expense?.paymentDay || "",
      account: expense?.account || accounts[0] || "",
      category: expense?.category || categories[0] || "",
      expenseType: normalizeExpenseType(expense?.expenseType),
    };
  }

  function getPaymentsTotal(expense) {
    const payments = Array.isArray(expense?.payments) ? expense.payments : [];
    return payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  }

  function getEffectiveReal(expense) {
    if (isIncomingItem(expense)) return Number(expense.plannedAmount || 0);
    if (isSplitExpenseItem(expense)) {
      const paymentsForDate = (expense.payments || []).filter((payment) => payment.date === expense.paymentDay);
      const paymentsTotalForDate = paymentsForDate.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
      return paymentsTotalForDate > 0 ? paymentsTotalForDate : null;
    }
    const normalized = normalizeExpense(expense);
    const paymentsTotal = getPaymentsTotal(normalized);
    return paymentsTotal > 0 ? paymentsTotal : null;
  }

  function getStatusStyle(value) {
    if (value > 0) return { backgroundColor: "#1f7a1f", color: "white", fontWeight: "bold" };
    if (value < 0) return { backgroundColor: "#a12626", color: "white", fontWeight: "bold" };
    return { backgroundColor: "#b59b20", color: "white", fontWeight: "bold" };
  }

  function getRealCellStyle(expense) {
    if (isIncomingItem(expense)) {
      return { backgroundColor: "rgba(31, 122, 31, 0.8)", color: "#ffffff", fontWeight: "bold" };
    }
    const planned = Number(expense.plannedAmount || 0);
    const real = getEffectiveReal(expense);
    if (real === null) {
      return { backgroundColor: "rgba(255,255,255,0.06)", color: "#b8b8b8", fontWeight: "bold" };
    }
    if (real < planned) return getStatusStyle(1);
    if (real > planned) return getStatusStyle(-1);
    return getStatusStyle(0);
  }

  function getRowStyle(expense) {
    if (!isIncomingItem(expense)) return {};
    return { backgroundColor: "rgba(31, 122, 31, 0.18)" };
  }

  function saveMonthData(updatedData) {
    setMonthlyData({ ...monthlyData, [selectedMonth]: updatedData });
  }

  function updateIncome(value) {
    setIncome(value);
    saveMonthData({ ...currentMonthData, income: value, incomeFrequency, incomeDate });
  }

  function updateIncomeFrequency(value) {
    setIncomeFrequency(value);
    saveMonthData({ ...currentMonthData, income, incomeFrequency: value, incomeDate });
  }

  function updateIncomeDate(value) {
    setIncomeDate(value);
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate: value });
  }

  function addExpense(event) {
    event.preventDefault();
    if (!newExpense.name || !newExpense.plannedAmount || !newExpense.category) {
      alert(t.completeFields);
      return;
    }
    const isIncome = newExpense.category === INCOME_CATEGORY;
    const expenseToSave = {
      ...newExpense,
      plannedAmount: Number(newExpense.plannedAmount),
      realAmount: 0,
      payments: [],
      frequency: normalizeFrequency(newExpense.frequency),
      expenseType: isIncome ? "sporadic" : normalizeExpenseType(newExpense.expenseType),
    };
    saveMonthData({
      ...currentMonthData,
      income,
      incomeFrequency,
      incomeDate,
      expenses: [...(currentMonthData.expenses || []), expenseToSave],
    });
    setNewExpense({
      name: "",
      plannedAmount: "",
      realAmount: 0,
      payments: [],
      frequency: "monthly",
      paymentDay: "",
      account: accounts[0] || "",
      category: categories.find((category) => category !== INCOME_CATEGORY) || categories[0] || "",
      expenseType: "recurrent",
    });
  }

  function startEditRow(index) {
    setEditingRowIndex(index);
    setEditingExpense(normalizeExpense(currentMonthData.expenses[index]));
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
    const isIncome = editingExpense.category === INCOME_CATEGORY;
    const updatedExpense = {
      ...editingExpense,
      plannedAmount: Number(editingExpense.plannedAmount),
      realAmount: Number(editingExpense.realAmount || 0),
      payments: isIncome ? [] : Array.isArray(editingExpense.payments) ? editingExpense.payments : [],
      frequency: normalizeFrequency(editingExpense.frequency),
      expenseType: isIncome ? "sporadic" : normalizeExpenseType(editingExpense.expenseType),
    };
    const updatedExpenses = currentMonthData.expenses.map((expense, expenseIndex) =>
      expenseIndex === index ? updatedExpense : expense
    );
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
    setEditingRowIndex(null);
    setEditingExpense(null);
  }

  function deleteExpense(indexToDelete) {
    const updatedExpenses = currentMonthData.expenses.filter((_, index) => index !== indexToDelete);
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
    if (paymentExpenseIndex === indexToDelete) setPaymentExpenseIndex(null);
  }

  function openPayments(index) {
    const expense = normalizeExpense(currentMonthData.expenses[index]);
    if (isIncomeItem(expense)) return;
    setPaymentExpenseIndex(index);
    setNewPayment({ date: "", amount: "", note: "" });
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
        payments: sortPaymentsByDate([
          ...normalized.payments,
          { date: newPayment.date, amount: Number(newPayment.amount), note: newPayment.note },
        ]),
      };
    });
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
    setNewPayment({ date: "", amount: "", note: "" });
  }

  function deletePayment(expenseIndex, paymentIndex) {
    const updatedExpenses = currentMonthData.expenses.map((expense, index) => {
      if (index !== expenseIndex) return expense;
      const normalized = normalizeExpense(expense);
      return { ...normalized, payments: normalized.payments.filter((_, index) => index !== paymentIndex) };
    });
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
  }

  function getLastDayOfMonth(year, monthNumber) {
    return new Date(year, monthNumber, 0).getDate();
  }

  function moveDateToSelectedMonth(dateString, targetMonth) {
    if (!dateString || !targetMonth) return "";
    const [, , originalDayString] = dateString.split("-");
    const [targetYearString, targetMonthString] = targetMonth.split("-");
    const targetYear = Number(targetYearString);
    const targetMonthNumber = Number(targetMonthString);
    const originalDay = Number(originalDayString);
    const lastDay = getLastDayOfMonth(targetYear, targetMonthNumber);
    const finalDay = Math.min(originalDay, lastDay);
    return `${targetYearString}-${targetMonthString}-${String(finalDay).padStart(2, "0")}`;
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
        (expense) => expense.expenseType === "recurrent" || isIncomeItem(expense)
      );
    }
    expensesToCopy = expensesToCopy.map((expense) => ({
      ...expense,
      realAmount: 0,
      payments: [],
      paymentDay: moveDateToSelectedMonth(expense.paymentDay, selectedMonth),
    }));
    const previousData = monthlyData[previousMonth];
    saveMonthData({
      income: previousData ? previousData.income : "",
      incomeFrequency: previousData ? previousData.incomeFrequency || "monthly" : "monthly",
      incomeDate: previousData ? moveDateToSelectedMonth(previousData.incomeDate, selectedMonth) : "",
      expenses: expensesToCopy,
    });
  }

  function deleteMonth(monthToDelete) {
    if (!confirm(`${t.confirmDeleteMonth} ${monthToDelete}?`)) return;
    const updatedMonthlyData = { ...monthlyData };
    delete updatedMonthlyData[monthToDelete];
    setMonthlyData(updatedMonthlyData);
    if (selectedMonth === monthToDelete) setSelectedMonth(getCurrentMonth());
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
    if (categoryToDelete === INCOME_CATEGORY) {
      alert(t.protectedCategory);
      return;
    }
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

  function getBiweeklyExpenseRows(expense) {
    if (isIncomingItem(expense) || normalizeFrequency(expense.frequency) !== "biweekly" || !expense.paymentDay) {
      return [expense];
    }
    const firstDate = new Date(expense.paymentDay + "T00:00:00");
    const secondDate = addDays(firstDate, 14);
    const dates = [firstDate, secondDate];
    return dates.map((date, occurrenceIndex) => ({
      ...expense,
      name: `${expense.name} ${occurrenceIndex + 1}`,
      paymentDay: formatDateForInput(date),
      plannedAmount: Number(expense.plannedAmount || 0) / 2,
      originalPlannedAmount: Number(expense.plannedAmount || 0),
      occurrenceIndex,
      isVirtualSplitExpense: true,
    }));
  }

  const normalizedExpenses = (currentMonthData.expenses || []).map((expense, index) => ({
    ...normalizeExpense(expense),
    originalIndex: index,
  }));

  const expenseItems = normalizedExpenses.filter((item) => !isIncomeItem(item));
  const randomIncomeItems = normalizedExpenses.filter(isIncomeItem);

  const totalPlanned = expenseItems.reduce((sum, item) => sum + Number(item.plannedAmount), 0);
  const totalReal = expenseItems.reduce((sum, item) => sum + Number(getEffectiveReal(item) || 0), 0);
  const randomIncomeTotal = randomIncomeItems.reduce((sum, item) => sum + Number(item.plannedAmount || 0), 0);
  const numericIncome = Number(income || 0);
  const available = numericIncome + randomIncomeTotal - totalPlanned;

  function getSalaryOccurrences() {
    if (!income || !incomeDate) return [];
    const [yearString, monthString] = selectedMonth.split("-");
    const year = Number(yearString);
    const month = Number(monthString);
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    const firstDate = new Date(incomeDate + "T00:00:00");
    const interval = incomeFrequency === "weekly" ? 7 : incomeFrequency === "biweekly" ? 14 : 0;
    let dates = [];
    if (incomeFrequency === "monthly") {
      const adjustedDate = moveDateToSelectedMonth(incomeDate, selectedMonth);
      dates = adjustedDate ? [new Date(adjustedDate + "T00:00:00")] : [];
    } else {
      const current = new Date(firstDate);
      while (current > startOfMonth) {
        current.setDate(current.getDate() - interval);
      }
      while (current <= endOfMonth) {
        if (current >= startOfMonth) dates.push(new Date(current));
        current.setDate(current.getDate() + interval);
      }
    }
    const amountPerOccurrence = dates.length > 0 ? numericIncome / dates.length : numericIncome;
    return dates.map((date, index) => ({
      name: `${t.salary} ${dates.length > 1 ? index + 1 : ""}`.trim(),
      amount: amountPerOccurrence,
      date,
      type: "salary",
    }));
  }

  const salaryTableRows = getSalaryOccurrences().map((salary, index) => ({
    name: salary.name,
    category: INCOME_CATEGORY,
    expenseType: "",
    frequency: "",
    paymentDay: salary.date.toISOString().slice(0, 10),
    account: "",
    plannedAmount: Number(salary.amount || 0),
    realAmount: Number(salary.amount || 0),
    payments: [],
    originalIndex: 100000 + index,
    isVirtualSalary: true,
  }));

  const expenseRowsForTable = normalizedExpenses.flatMap((expense) => getBiweeklyExpenseRows(expense));

  const displayedExpenses = [...expenseRowsForTable, ...salaryTableRows].sort((a, b) => {
    if (!sortByDate) return a.originalIndex - b.originalIndex;
    if (!a.paymentDay && !b.paymentDay) return a.originalIndex - b.originalIndex;
    if (!a.paymentDay) return 1;
    if (!b.paymentDay) return -1;
    const dateA = new Date(a.paymentDay + "T00:00:00");
    const dateB = new Date(b.paymentDay + "T00:00:00");
    const dateDifference = dateA - dateB;
    if (dateDifference === 0) return a.originalIndex - b.originalIndex;
    return sortByDate === "asc" ? dateDifference : -dateDifference;
  });

  function groupExpensesBy(fieldName) {
    const totals = {};
    expenseItems.forEach((expense) => {
      const key = expense[fieldName] || "Sin definir";
      const value = Number(getEffectiveReal(expense) || 0);
      if (!totals[key]) totals[key] = { name: key, amount: 0, count: 0 };
      totals[key].amount += value;
      totals[key].count += 1;
    });
    return Object.values(totals)
      .map((item) => ({ ...item, amount: Number(item.amount.toFixed(2)) }))
      .sort((a, b) => b.amount - a.amount);
  }

  const categoryReportData = groupExpensesBy("category");
  const accountReportData = groupExpensesBy("account");

  const selectedPaymentExpense = paymentExpenseIndex !== null && currentMonthData.expenses?.[paymentExpenseIndex]
    ? normalizeExpense(currentMonthData.expenses[paymentExpenseIndex])
    : null;
  const selectedPaymentReal = selectedPaymentExpense ? Number(getEffectiveReal(selectedPaymentExpense) || 0) : 0;
  const selectedPaymentDifference = selectedPaymentExpense ? Number(selectedPaymentExpense.plannedAmount || 0) - selectedPaymentReal : 0;

  function formatDisplayDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    const locale = language === "en" ? "en-US" : language === "fr" ? "fr-CA" : "es-ES";
    return date.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  }

  function getTodayLabel() {
    const today = new Date();
    const locale = language === "en" ? "en-US" : language === "fr" ? "fr-CA" : "es-ES";
    return today.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function getUpcomingMovements() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expenseMovements = expenseRowsForTable
      .filter((expense) => expense.paymentDay)
      .map((expense) => {
        const date = new Date(expense.paymentDay + "T00:00:00");
        const daysLeft = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        return {
          name: expense.name,
          amount: Number(expense.plannedAmount || 0),
          date,
          daysLeft,
          type: isIncomeItem(expense) ? "income" : "expense",
        };
      });
    const salaryMovements = getSalaryOccurrences().map((movement) => {
      const daysLeft = Math.ceil((movement.date - today) / (1000 * 60 * 60 * 24));
      return { ...movement, daysLeft };
    });
    return [...expenseMovements, ...salaryMovements]
      .filter((movement) => movement.daysLeft >= 0)
      .sort((a, b) => a.date - b.date)
      .slice(0, 7);
  }

  const upcomingPayments = getUpcomingMovements();

  function generateMonthlyPdf() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
    const generatedAt = new Date().toLocaleDateString(
      language === "en" ? "en-US" : language === "fr" ? "fr-CA" : "es-ES"
    );
    const movementsForPdf = [...salaryTableRows, ...expenseRowsForTable]
      .sort((a, b) => {
        if (!a.paymentDay && !b.paymentDay) return a.originalIndex - b.originalIndex;
        if (!a.paymentDay) return 1;
        if (!b.paymentDay) return -1;
        return new Date(a.paymentDay + "T00:00:00") - new Date(b.paymentDay + "T00:00:00");
      })
      .map((item) => {
        const incoming = isIncomingItem(item);
        const realValue = getEffectiveReal(item);
        return [
          item.paymentDay || "-",
          item.name || "-",
          incoming ? t.income : t.expense,
          item.category || "-",
          item.account || "-",
          `${incoming ? "+" : ""}$${Number(item.plannedAmount || 0).toFixed(2)}`,
          incoming ? `+$${Number(item.plannedAmount || 0).toFixed(2)}` : realValue === null ? t.pending : `$${Number(realValue).toFixed(2)}`,
        ];
      });
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, 216, 32, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text(APP_NAME, 14, 14);
    doc.setFontSize(11);
    doc.text(`${t.monthlyStatement} — ${selectedMonth}`, 14, 22);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text(`${APP_DEVELOPER} · ${generatedAt}`, 14, 28);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(13);
    doc.text(t.monthlySummary, 14, 44);
    autoTable(doc, {
      startY: 50,
      theme: "grid",
      head: [[t.monthlyIncome, t.randomIncome, t.totalPlanned, t.totalReal, t.available]],
      body: [[
        `$${numericIncome.toFixed(2)}`,
        `+$${randomIncomeTotal.toFixed(2)}`,
        `$${totalPlanned.toFixed(2)}`,
        `$${totalReal.toFixed(2)}`,
        `$${available.toFixed(2)}`,
      ]],
      headStyles: { fillColor: [225, 6, 0], textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
    });
    doc.setFontSize(13);
    doc.text(t.expensesMonth, 14, doc.lastAutoTable.finalY + 14);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      theme: "striped",
      head: [[t.paymentDate, t.name, t.type, t.category, t.account, t.planned, t.real]],
      body: movementsForPdf.length ? movementsForPdf : [["-", t.noData, "-", "-", "-", "-", "-"]],
      headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] },
      styles: { fontSize: 8, cellPadding: 2 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      didParseCell: (data) => {
        if (data.section === "body" && String(data.row.raw?.[2]).includes(t.income)) {
          data.cell.styles.textColor = [31, 122, 31];
          data.cell.styles.fontStyle = "bold";
        }
      },
    });
    const pageCount = doc.internal.getNumberOfPages();
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      doc.setPage(pageNumber);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(`${APP_NAME} ${APP_VERSION} · ${pageNumber}/${pageCount}`, 14, 270);
    }
    doc.save(`my-economy-statement-${selectedMonth}.pdf`);
  }

  function generateUserGuidePdf() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
    let y = 18;
    function title(text) {
      doc.setFontSize(18);
      doc.setTextColor(225, 6, 0);
      doc.text(text, 14, y);
      y += 10;
    }
    function section(heading, body) {
      if (y > 240) { doc.addPage(); y = 18; }
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text(heading, 14, y);
      y += 7;
      doc.setFontSize(10);
      doc.setTextColor(70, 70, 70);
      const lines = doc.splitTextToSize(body, 185);
      doc.text(lines, 14, y);
      y += lines.length * 5 + 7;
    }
    doc.setFillColor(20, 20, 20);
    doc.rect(0, 0, 216, 34, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(21);
    doc.text(APP_NAME, 14, 15);
    doc.setFontSize(11);
    doc.text(t.userGuide, 14, 25);
    y = 46;
    title(t.userGuide);
    section("1. Dashboard", "The dashboard is the main area of the application. It shows the selected month, monthly income, upcoming movements, the form to add new movements, and the full monthly table.");
    section("2. Monthly income", "Monthly income is the base salary amount for the selected month. You can define whether it is received monthly, biweekly, or weekly, and select the first income date. Salary entries are displayed in the table as green virtual rows, but they are not duplicated in random income.");
    section("3. Random income", "To add extra income, create a movement using the protected category Ingresos. These entries appear in green, increase the available balance, and are not calculated as expenses.");
    section("4. Expenses", "Expenses can be recurrent or sporadic. Planned value is the expected amount. Real value appears only when payments are registered through Admin. The difference is informational and appears in the payment window.");
    section("5. Partial payments", "Use Admin to add one or more payments to the same expense. This is useful for expenses such as gas, groceries, or any cost paid in multiple parts during the month.");
    section("6. Date sorting", "Click the payment date column to sort movements by date. The first click sorts ascending, the second descending, and the third returns to the original entry order.");
    section("7. Reports", "Reports summarize expenses by category and by account. Income entries are excluded from expense reports so financial totals remain clean.");
    section("8. Data storage", "This version stores information in the browser localStorage. Data is local to the browser and device unless future backup, import/export, or cloud synchronization features are added.");
    section("9. Export/Import data", "You can export your data to a JSON file for backup or to transfer between devices. Use the import button to restore your data from a backup file.");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`${APP_DEVELOPER} · ${APP_NAME} ${APP_VERSION}`, 14, 270);
    doc.save("my-economy-user-guide.pdf");
  }

  // Estilos
  const styles = {
    page: {
      minHeight: "100vh",
      padding: "0",
      fontFamily: "Inter, Arial, sans-serif",
      background: "radial-gradient(circle at top left, #182023 0%, #090b0d 38%, #050505 100%)",
      color: "#f5f5f5",
    },
    appShell: { maxWidth: "1500px", margin: "0 auto", padding: "0 24px 24px" },
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
      flexWrap: "wrap",
      gap: "16px",
    },
    brand: { display: "flex", alignItems: "center", gap: "16px" },
    logo: { width: "68px", height: "68px", objectFit: "contain" },
    brandTitle: { margin: 0, fontSize: "32px", lineHeight: "34px", fontWeight: 800, letterSpacing: "-0.5px" },
    brandSubtitle: { margin: "6px 0 0", color: "#b8b8b8", fontSize: "15px" },
    nav: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
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
    navButtonActive: { color: "#ffffff", backgroundColor: "rgba(255,255,255,0.05)", borderBottom: "3px solid #e10600" },
    smallSelect: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.16)",
      backgroundColor: "#0b0d0f",
      color: "#ffffff",
      outline: "none",
      cursor: "pointer",
    },
    card: {
      border: "1px solid rgba(255,255,255,0.13)",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      background: "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
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
      width: "100%",
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
    buttonPrimary: {
      padding: "10px 14px",
      borderRadius: "7px",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#e10600",
      color: "#ffffff",
      fontWeight: 800,
    },
    tableWrapper: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "12px", backgroundColor: "rgba(0,0,0,0.16)" },
    th: { padding: "10px", border: "1px solid rgba(255,255,255,0.13)", whiteSpace: "nowrap", color: "#ffffff", backgroundColor: "rgba(255,255,255,0.04)" },
    td: { padding: "9px", border: "1px solid rgba(255,255,255,0.10)", textAlign: "center", fontSize: "12px", whiteSpace: "nowrap", color: "#e9e9e9" },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "8px", padding: "10px", marginBottom: "8px", backgroundColor: "rgba(255,255,255,0.04)" },
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.72)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px", backdropFilter: "blur(8px)" },
    modal: { background: "linear-gradient(145deg, rgba(31,31,31,0.98), rgba(9,11,13,0.98))", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "14px", padding: "25px", width: "90%", maxWidth: "1000px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.45)" },
    footer: { marginTop: "30px", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", alignItems: "center", color: "#a8a8a8", fontSize: "14px" },
    footerBrand: { display: "flex", alignItems: "center", gap: "14px" },
    footerLogo: { width: "52px", height: "52px", objectFit: "contain" },
    redText: { color: "#e10600", fontWeight: 700 },
    dashboardTopWidgets: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "20px" },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", alignItems: "end" },
    reportGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" },
    howToSection: {
      maxHeight: "600px",
      overflowY: "auto",
      paddingRight: "16px",
    },
    howToCard: {
      background: "rgba(255,255,255,0.03)",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "16px",
      borderLeft: "3px solid #e10600",
    },
    howToTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#e10600",
    },
    howToList: {
      margin: "10px 0 0 20px",
      lineHeight: "1.6",
    },
    howToNote: {
      background: "rgba(225, 6, 0, 0.1)",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "16px",
      border: "1px solid rgba(225, 6, 0, 0.3)",
    },
  };

  // Renderizar tablas de reportes
  function renderReportTable(data, labelColumn) {
    return (
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>{labelColumn}</th><th style={styles.th}>{t.items}</th><th style={styles.th}>{t.total}</th></tr></thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td style={styles.td} colSpan="3">{t.noData}</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.name}><td style={styles.td}>{item.name}</td><td style={styles.td}>{item.count}</td><td style={styles.td}>${item.amount.toFixed(2)}</td></tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <img src="/Altura.png" alt="Altura IT Solutions" style={styles.logo} />
          <div><h1 style={styles.brandTitle}>{APP_NAME}</h1><p style={styles.brandSubtitle}>{APP_SUBTITLE}</p></div>
        </div>
        <div style={styles.nav}>
          <button style={{ ...styles.navButton, ...(page === "dashboard" ? styles.navButtonActive : {}) }} onClick={() => setPage("dashboard")}>{t.dashboard}</button>
          <button style={{ ...styles.navButton, ...(page === "reports" ? styles.navButtonActive : {}) }} onClick={() => setPage("reports")}>{t.reports}</button>
          <button style={{ ...styles.navButton, ...(page === "settings" ? styles.navButtonActive : {}) }} onClick={() => setPage("settings")}>{t.settings}</button>
          <button style={{ ...styles.navButton, ...(page === "howto" ? styles.navButtonActive : {}) }} onClick={() => setPage("howto")}>{t.howTo}</button>
          <select style={styles.smallSelect} value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="es">Español</option><option value="en">English</option><option value="fr">Français</option>
          </select>
        </div>
      </div>

      <main style={styles.appShell}>
        {page === "dashboard" && (
          <>
            <div style={styles.dashboardTopWidgets}>
              {/* Widget Mes */}
              <div style={styles.card}>
                <h2>{t.month}</h2>
                <input style={styles.input} type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                  <button onClick={() => createNewMonth("all")} style={styles.button}>{t.createAll}</button>
                  <button onClick={() => createNewMonth("recurrent")} style={styles.button}>{t.createRecurring}</button>
                  <button onClick={generateMonthlyPdf} style={styles.buttonPrimary}>{t.exportPdf}</button>
                  <button onClick={exportData} style={styles.button}>📦 {t.exportData}</button>
                  <label style={{ ...styles.button, textAlign: "center", cursor: "pointer" }}>
                    📂 {t.importData}
                    <input type="file" accept=".json" onChange={importData} style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              {/* Widget Resumen */}
              <div style={styles.card}>
                <h2>{t.monthlySummary}</h2>
                <label>{t.monthlyIncome}</label>
                <input style={styles.input} type="number" value={income} onChange={(e) => updateIncome(e.target.value)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
                  <div><label>{t.incomeFrequency}</label><select style={styles.input} value={incomeFrequency} onChange={(e) => updateIncomeFrequency(e.target.value)}><option value="monthly">{t.monthly}</option><option value="biweekly">{t.biweekly}</option><option value="weekly">{t.weekly}</option></select></div>
                  <div><label>{t.incomeDate}</label><input style={styles.input} type="date" value={incomeDate} onChange={(e) => updateIncomeDate(e.target.value)} /></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span>{t.totalPlanned}</span><strong>${totalPlanned.toFixed(2)}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span>{t.totalReal}</span><strong>${totalReal.toFixed(2)}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}><span>{t.randomIncome}</span><strong>+${randomIncomeTotal.toFixed(2)}</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: "18px", fontWeight: "bold", color: "#e10600" }}><span>{t.available}</span><strong>${available.toFixed(2)}</strong></div>
              </div>

              {/* Widget Próximos Pagos */}
              <div style={styles.card}>
                <h2>{t.todayAndUpcoming}</h2>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px", marginBottom: "15px" }}><span>{t.currentDate}</span><strong style={{ display: "block", marginTop: "5px" }}>{getTodayLabel()}</strong></div>
                <h3>{t.upcomingPayments}</h3>
                {upcomingPayments.length === 0 ? <p>{t.noUpcomingPayments}</p> : upcomingPayments.map((movement, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <div><strong>{movement.type === "income" || movement.type === "salary" ? "+ " : "- "}{movement.name}</strong><p style={{ margin: "2px 0 0", fontSize: "11px", color: "#b8b8b8" }}>{formatDisplayDate(movement.date.toISOString().slice(0, 10))} · {movement.daysLeft === 0 ? t.today : `${t.inDays} ${movement.daysLeft} ${t.days}`}</p></div>
                    <strong>{movement.type === "income" || movement.type === "salary" ? "+" : "-"}${Number(movement.amount || 0).toFixed(2)}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Formulario Agregar Gasto */}
            <div style={styles.card}>
              <h2>{t.addExpense}</h2>
              <form onSubmit={addExpense} style={styles.formGrid}>
                <div><label>{t.name}</label><input style={styles.input} value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} /></div>
                <div><label>{t.totalPlanned}</label><input style={styles.input} type="number" value={newExpense.plannedAmount} onChange={(e) => setNewExpense({ ...newExpense, plannedAmount: e.target.value })} /></div>
                <div><label>{t.category}</label><select style={styles.input} value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>{categories.map((cat) => <option key={cat}>{cat}</option>)}</select></div>
                <div><label>{t.expenseType}</label><select style={styles.input} value={newExpense.expenseType} disabled={newExpense.category === INCOME_CATEGORY} onChange={(e) => setNewExpense({ ...newExpense, expenseType: e.target.value })}><option value="recurrent">{t.recurrent}</option><option value="sporadic">{t.sporadic}</option></select></div>
                <div><label>{t.frequency}</label><select style={styles.input} value={newExpense.frequency} onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}><option value="monthly">{t.monthly}</option><option value="weekly">{t.weekly}</option><option value="biweekly">{t.biweekly}</option><option value="once">{t.once}</option></select></div>
                <div><label>{t.paymentDate}</label><input style={styles.input} type="date" value={newExpense.paymentDay} onChange={(e) => setNewExpense({ ...newExpense, paymentDay: e.target.value })} /></div>
                <div><label>{t.account}</label><select style={styles.input} value={newExpense.account} onChange={(e) => setNewExpense({ ...newExpense, account: e.target.value })}>{accounts.map((acc) => <option key={acc}>{acc}</option>)}</select></div>
                <div style={{ display: "flex", alignItems: "end" }}><button type="submit" style={styles.button}>{t.addExpense}</button></div>
              </form>
            </div>

            {/* Tabla de Gastos */}
            <div style={styles.card}>
              <h2>{t.expensesMonth}</h2>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>{t.name}</th><th style={styles.th}>{t.category}</th><th style={styles.th}>{t.type}</th><th style={styles.th}>{t.frequency}</th>
                      <th style={{ ...styles.th, cursor: "pointer" }} onClick={toggleDateSort} title={getDateSortTitle()}>{t.paymentDate} <span style={{ marginLeft: "5px" }}>{getDateSortIcon()}</span></th>
                      <th style={styles.th}>{t.account}</th><th style={styles.th}>{t.planned}</th><th style={styles.th}>{t.real}</th><th style={styles.th}>{t.payments}</th><th style={styles.th}>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedExpenses.map((expense) => {
                      const index = expense.originalIndex;
                      const isEditing = editingRowIndex === index;
                      const activeExpense = isEditing ? editingExpense : expense;
                      const effectiveReal = getEffectiveReal(activeExpense);
                      const rowIsIncoming = isIncomingItem(activeExpense);
                      return (
                        <tr key={`${index}-${expense.paymentDay}`} style={getRowStyle(activeExpense)}>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} value={editingExpense.name} onChange={(e) => setEditingExpense({ ...editingExpense, name: e.target.value })} /> : expense.name}</td>
                          <td style={styles.td}>{isEditing ? <select style={styles.tableInput} value={editingExpense.category} onChange={(e) => setEditingExpense({ ...editingExpense, category: e.target.value })}>{categories.map(c => <option key={c}>{c}</option>)}</select> : expense.category}</td>
                          <td style={styles.td}>{rowIsIncoming ? "" : isEditing ? <select style={styles.tableInput} value={editingExpense.expenseType} onChange={(e) => setEditingExpense({ ...editingExpense, expenseType: e.target.value })}><option value="recurrent">{t.recurrent}</option><option value="sporadic">{t.sporadic}</option></select> : getExpenseTypeLabel(expense.expenseType)}</td>
                          <td style={styles.td}>{rowIsIncoming ? "" : isEditing ? <select style={styles.tableInput} value={editingExpense.frequency} onChange={(e) => setEditingExpense({ ...editingExpense, frequency: e.target.value })}><option value="monthly">{t.monthly}</option><option value="weekly">{t.weekly}</option><option value="biweekly">{t.biweekly}</option><option value="once">{t.once}</option></select> : getFrequencyLabel(expense.frequency)}</td>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} type="date" value={editingExpense.paymentDay} onChange={(e) => setEditingExpense({ ...editingExpense, paymentDay: e.target.value })} /> : expense.paymentDay}</td>
                          <td style={styles.td}>{isEditing ? <select style={styles.tableInput} value={editingExpense.account} onChange={(e) => setEditingExpense({ ...editingExpense, account: e.target.value })}>{accounts.map(a => <option key={a}>{a}</option>)}</select> : expense.account}</td>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} type="number" value={editingExpense.plannedAmount} onChange={(e) => setEditingExpense({ ...editingExpense, plannedAmount: e.target.value })} /> : `${rowIsIncoming ? "+" : ""}$${Number(expense.plannedAmount).toFixed(2)}`}</td>
                          <td style={{ ...styles.td, ...getRealCellStyle(activeExpense) }}>{rowIsIncoming ? `+$${Number(expense.plannedAmount).toFixed(2)}` : effectiveReal === null ? t.pending : `$${Number(effectiveReal).toFixed(2)}`}</td>
                          <td style={styles.td}>{rowIsIncoming ? "—" : <button onClick={() => openPayments(index)}>{t.managePayments}</button>}</td>
                          <td style={styles.td}>{isEditing ? <><button onClick={() => saveEditRow(index)}>{t.save}</button><button onClick={cancelEditRow} style={{ marginLeft: "5px" }}>{t.cancel}</button></> : <><button onClick={() => startEditRow(index)}>{t.edit}</button><button onClick={() => deleteExpense(index)} style={{ marginLeft: "5px" }}>{t.delete}</button></>}</td>
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
            <div style={styles.card}>
              <h2>{t.reports}</h2>
              <input style={styles.input} type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginTop: "18px" }}>
                <div><span>{t.monthlyIncome}</span><strong>${numericIncome.toFixed(2)}</strong></div>
                <div><span>{t.randomIncome}</span><strong>+${randomIncomeTotal.toFixed(2)}</strong></div>
                <div><span>{t.totalPlanned}</span><strong>${totalPlanned.toFixed(2)}</strong></div>
                <div><span>{t.totalReal}</span><strong>${totalReal.toFixed(2)}</strong></div>
                <div><span>{t.available}</span><strong>${available.toFixed(2)}</strong></div>
              </div>
              <p style={{ color: "#b8b8b8", marginTop: "16px" }}>{language === "es" ? "Los reportes muestran únicamente gastos." : language === "en" ? "Reports show expenses only." : "Les rapports affichent seulement les dépenses."}</p>
            </div>
            <div style={styles.reportGrid}>
              <div style={styles.card}><h2>{t.byCategory}</h2>{renderReportTable(categoryReportData, t.category)}</div>
              <div style={styles.card}><h2>{t.byAccount}</h2>{renderReportTable(accountReportData, t.account)}</div>
            </div>
          </>
        )}

        {page === "howto" && (
          <div style={styles.card}>
            <h2>{t.howTo} — {APP_NAME}</h2>
            
            {/* ESPAÑOL */}
            {language === "es" && (
              <div style={styles.howToSection}>
                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📌 1. Concepto General</div>
                  <p><strong>My Economy</strong> es una aplicación de finanzas personales que te ayuda a planificar tus gastos mensuales y compararlos con lo que realmente pagas. La diferencia clave es que puedes registrar <strong>pagos parciales</strong> para un mismo gasto.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💰 2. Ingreso Mensual (Salario)</div>
                  <p>Define cuánto dinero esperas recibir durante el mes. Puedes configurar la frecuencia:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Mensual:</strong> Un solo pago en la fecha que indiques</li>
                    <li><strong>Bisemanal:</strong> Dos pagos al mes (cada 14 días)</li>
                    <li><strong>Semanal:</strong> Pagos cada 7 días</li>
                  </ul>
                  <p>La aplicación calculará automáticamente cuánto recibes en cada fecha y mostrará filas verdes en la tabla.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>✨ 3. Ingresos Aleatorios (Dinero Extra)</div>
                  <p>Para registrar ingresos adicionales (bonos, reembolsos, regalos, trabajos extra):</p>
                  <ol style={styles.howToList}>
                    <li>Agrega un nuevo movimiento</li>
                    <li>Selecciona la categoría <strong>"Ingresos"</strong> (está protegida, no se puede eliminar)</li>
                    <li>Completa el nombre y monto</li>
                  </ol>
                  <p>Estos ingresos aparecerán en verde y aumentarán tu <strong>Disponible</strong>.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📝 4. Agregar Gastos</div>
                  <p>Completa el formulario:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Nombre:</strong> Describe el gasto (ej: "Supermercado", "Gasolina")</li>
                    <li><strong>Total previsto:</strong> Lo que esperas gastar</li>
                    <li><strong>Categoría:</strong> Casa, Comida, Carro, etc. (puedes crear nuevas en Configuración)</li>
                    <li><strong>Tipo de gasto:</strong> Recurrente (se copia al siguiente mes) o Esporádico</li>
                    <li><strong>Frecuencia:</strong> Mensual, Semanal, Bisemanal o Una vez</li>
                    <li><strong>Fecha de pago:</strong> Cuándo vence o planeas pagar</li>
                    <li><strong>Cuenta:</strong> Débito, Crédito, Efectivo, etc.</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💸 5. Pagos Reales (Lo que realmente pagaste)</div>
                  <p>El valor <strong>Real</strong> se calcula desde el botón <strong>"Admin"</strong> en la tabla. Esto permite registrar pagos parciales:</p>
                  <ul style={styles.howToList}>
                    <li>Si pagas $30 de $100 planeados → el real será $30, el disponible ajusta la diferencia</li>
                    <li>Si pagas $120 de $100 planeados → aparece en rojo (sobrecosto) y la diferencia es negativa</li>
                    <li>Puedes agregar múltiples pagos para un mismo gasto (ej: varias compras de supermercado en el mes)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🎨 6. Colores y Significados</div>
                  <ul style={styles.howToList}>
                    <li><span style={{ color: "#4caf50" }}>🟢 Verde:</span> Filas de ingresos (salario o ingresos aleatorios)</li>
                    <li><span style={{ color: "#4caf50" }}>🟢 Celda Real verde:</span> Pagaste <strong>menos</strong> de lo planeado → Ahorraste</li>
                    <li><span style={{ color: "#ffc107" }}>🟡 Celda Real amarilla:</span> Pagaste <strong>exactamente</strong> lo planeado</li>
                    <li><span style={{ color: "#f44336" }}>🔴 Celda Real roja:</span> Pagaste <strong>más</strong> de lo planeado → Sobrecosto</li>
                    <li><span style={{ color: "#9e9e9e" }}>⚪ Celda Real gris:</span> Aún no has registrado pagos → Pendiente</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📊 7. Disponible</div>
                  <p>El <strong>Disponible</strong> se calcula como:</p>
                  <p style={{ background: "rgba(225,6,0,0.15)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
                    Ingreso Mensual + Ingresos Aleatorios - Gastos Previstos
                  </p>
                  <p>⚠️ <strong>Nota importante:</strong> Los pagos reales NO modifican el disponible directamente. El disponible te muestra tu planificación. La diferencia entre previsto y real aparece en la ventana de Admin de cada gasto.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🔍 8. Ordenar por Fecha</div>
                  <p>Haz clic en el encabezado <strong>"Fecha de pago"</strong>:</p>
                  <ul style={styles.howToList}>
                    <li>1er clic → Orden ascendente (más antigua a más reciente)</li>
                    <li>2do clic → Orden descendente (más reciente a más antigua)</li>
                    <li>3er clic → Vuelve al orden original de ingreso</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📅 9. Crear Nuevos Meses</div>
                  <p>En el widget del mes, tienes dos opciones:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Crear mes copiando TODOS los gastos:</strong> Copia todos los movimientos, incluyendo esporádicos</li>
                    <li><strong>Crear mes copiando solo RECURRENTES:</strong> Copia solo gastos marcados como "Recurrentes"</li>
                  </ul>
                  <p>Las fechas de pago se ajustan automáticamente al nuevo mes (ej: un pago el 31 solo se moverá al 28 si el mes tiene 28 días).</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📄 10. Reportes PDF</div>
                  <p>Desde el widget del mes, haz clic en <strong>"Generar reporte PDF"</strong> para obtener:</p>
                  <ul style={styles.howToList}>
                    <li>Resumen financiero del mes (ingresos, gastos, disponible)</li>
                    <li>Lista completa de movimientos ordenados por fecha</li>
                    <li>Indicadores de ingresos (verde) y gastos pendientes (gris)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💾 11. Exportar e Importar Datos (Respaldo)</div>
                  <p>Para no perder tu información:</p>
                  <ul style={styles.howToList}>
                    <li><strong>📦 Exportar datos:</strong> Guarda un archivo .json con TODOS tus meses, categorías y cuentas</li>
                    <li><strong>📂 Importar datos:</strong> Restaura tu información desde un archivo de respaldo</li>
                  </ul>
                  <p>Los datos se almacenan en tu navegador (localStorage). Si borras el caché del navegador, perderás la información. ¡Usa la exportación periódicamente!</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>⚙️ 12. Configuración</div>
                  <p>Puedes personalizar:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Categorías:</strong> Agrega o elimina categorías de gastos (excepto "Ingresos" que está protegida)</li>
                    <li><strong>Cuentas:</strong> Agrega o elimina métodos de pago (tarjetas, cuentas bancarias, efectivo)</li>
                    <li><strong>Meses creados:</strong> Visualiza y elimina meses completos</li>
                  </ul>
                </div>

                <div style={styles.howToNote}>
                  <strong>💡 Consejo rápido:</strong> Para usar la aplicación, primero configura tu Ingreso Mensual y Fecha del primer ingreso, luego agrega tus gastos previstos. A medida que realices pagos, regístralos en "Admin". El Dashboard te mostrará tu situación financiera en tiempo real.
                </div>
              </div>
            )}

            {/* ENGLISH */}
            {language === "en" && (
              <div style={styles.howToSection}>
                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📌 1. General Concept</div>
                  <p><strong>My Economy</strong> is a personal finance app that helps you plan monthly expenses and compare them with what you actually pay. The key feature is recording <strong>partial payments</strong> for a single expense.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💰 2. Monthly Income (Salary)</div>
                  <p>Define how much money you expect to receive during the month. You can configure the frequency:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Monthly:</strong> Single payment on the date you specify</li>
                    <li><strong>Biweekly:</strong> Two payments per month (every 14 days)</li>
                    <li><strong>Weekly:</strong> Payments every 7 days</li>
                  </ul>
                  <p>The app will automatically calculate how much you receive on each date and show green rows in the table.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>✨ 3. Random Income (Extra Money)</div>
                  <p>To record additional income (bonuses, reimbursements, gifts, side jobs):</p>
                  <ol style={styles.howToList}>
                    <li>Add a new movement</li>
                    <li>Select the <strong>"Ingresos"</strong> category (protected, cannot be deleted)</li>
                    <li>Complete name and amount</li>
                  </ol>
                  <p>These incomes appear in green and increase your <strong>Available</strong> balance.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📝 4. Adding Expenses</div>
                  <p>Complete the form:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Name:</strong> Describe the expense (e.g., "Groceries", "Gas")</li>
                    <li><strong>Total planned:</strong> What you expect to spend</li>
                    <li><strong>Category:</strong> Home, Food, Car, etc. (you can create new ones in Settings)</li>
                    <li><strong>Expense type:</strong> Recurring (copies to next month) or Sporadic</li>
                    <li><strong>Frequency:</strong> Monthly, Weekly, Biweekly, or Once</li>
                    <li><strong>Payment date:</strong> When it's due or you plan to pay</li>
                    <li><strong>Account:</strong> Debit, Credit, Cash, etc.</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💸 5. Real Payments (What you actually paid)</div>
                  <p>The <strong>Real</strong> value is calculated from the <strong>"Admin"</strong> button in the table. This allows recording partial payments:</p>
                  <ul style={styles.howToList}>
                    <li>If you pay $30 out of $100 planned → real will be $30, available reflects the difference</li>
                    <li>If you pay $120 out of $100 planned → appears in red (over budget) with negative difference</li>
                    <li>You can add multiple payments for a single expense (e.g., multiple grocery purchases during the month)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🎨 6. Colors and Meanings</div>
                  <ul style={styles.howToList}>
                    <li><span style={{ color: "#4caf50" }}>🟢 Green:</span> Income rows (salary or random income)</li>
                    <li><span style={{ color: "#4caf50" }}>🟢 Green Real cell:</span> You paid <strong>less</strong> than planned → You saved</li>
                    <li><span style={{ color: "#ffc107" }}>🟡 Yellow Real cell:</span> You paid <strong>exactly</strong> what you planned</li>
                    <li><span style={{ color: "#f44336" }}>🔴 Red Real cell:</span> You paid <strong>more</strong> than planned → Over budget</li>
                    <li><span style={{ color: "#9e9e9e" }}>⚪ Gray Real cell:</span> No payments recorded yet → Pending</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📊 7. Available Balance</div>
                  <p><strong>Available</strong> is calculated as:</p>
                  <p style={{ background: "rgba(225,6,0,0.15)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
                    Monthly Income + Random Income - Planned Expenses
                  </p>
                  <p>⚠️ <strong>Important:</strong> Real payments do NOT directly change Available. Available shows your planning. The difference between planned and real appears in each expense's Admin window.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🔍 8. Sort by Date</div>
                  <p>Click the <strong>"Payment date"</strong> column header:</p>
                  <ul style={styles.howToList}>
                    <li>1st click → Ascending order (oldest to newest)</li>
                    <li>2nd click → Descending order (newest to oldest)</li>
                    <li>3rd click → Returns to original entry order</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📅 9. Creating New Months</div>
                  <p>In the month widget, you have two options:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Create month copying ALL expenses:</strong> Copies all movements, including sporadic ones</li>
                    <li><strong>Create month copying only RECURRING:</strong> Copies only expenses marked as "Recurring"</li>
                  </ul>
                  <p>Payment dates adjust automatically to the new month (e.g., a payment on the 31st will move to the 28th if the month has only 28 days).</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📄 10. PDF Reports</div>
                  <p>From the month widget, click <strong>"Generate PDF report"</strong> to get:</p>
                  <ul style={styles.howToList}>
                    <li>Monthly financial summary (income, expenses, available)</li>
                    <li>Complete list of movements sorted by date</li>
                    <li>Income indicators (green) and pending expenses (gray)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💾 11. Export and Import Data (Backup)</div>
                  <p>To avoid losing your information:</p>
                  <ul style={styles.howToList}>
                    <li><strong>📦 Export data:</strong> Saves a .json file with ALL your months, categories, and accounts</li>
                    <li><strong>📂 Import data:</strong> Restores your information from a backup file</li>
                  </ul>
                  <p>Data is stored in your browser (localStorage). If you clear your browser cache, you'll lose information. Use export periodically!</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>⚙️ 12. Settings</div>
                  <p>You can customize:</p>
                  <ul style={styles.howToList}>
                    <li><strong>Categories:</strong> Add or delete expense categories (except "Ingresos" which is protected)</li>
                    <li><strong>Accounts:</strong> Add or delete payment methods (cards, bank accounts, cash)</li>
                    <li><strong>Created months:</strong> View and delete entire months</li>
                  </ul>
                </div>

                <div style={styles.howToNote}>
                  <strong>💡 Quick tip:</strong> To use the app, first configure your Monthly Income and First income date, then add your planned expenses. As you make payments, record them in "Admin". The Dashboard will show your financial situation in real time.
                </div>
              </div>
            )}

            {/* FRANÇAIS */}
            {language === "fr" && (
              <div style={styles.howToSection}>
                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📌 1. Concept Général</div>
                  <p><strong>My Economy</strong> est une application de finances personnelles qui vous aide à planifier vos dépenses mensuelles et à les comparer avec ce que vous payez réellement. La fonctionnalité clé est l'enregistrement de <strong>paiements partiels</strong> pour une même dépense.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💰 2. Revenu Mensuel (Salaire)</div>
                  <p>Définissez combien d'argent vous prévoyez recevoir pendant le mois. Vous pouvez configurer la fréquence :</p>
                  <ul style={styles.howToList}>
                    <li><strong>Mensuel :</strong> Un seul paiement à la date indiquée</li>
                    <li><strong>Aux deux semaines :</strong> Deux paiements par mois (tous les 14 jours)</li>
                    <li><strong>Hebdomadaire :</strong> Paiements toutes les 7 jours</li>
                  </ul>
                  <p>L'application calcule automatiquement combien vous recevez à chaque date et affiche des lignes vertes dans le tableau.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>✨ 3. Revenus Aléatoires (Argent Supplémentaire)</div>
                  <p>Pour enregistrer des revenus supplémentaires (bonus, remboursements, cadeaux, travaux secondaires) :</p>
                  <ol style={styles.howToList}>
                    <li>Ajoutez un nouveau mouvement</li>
                    <li>Sélectionnez la catégorie <strong>"Ingresos"</strong> (protégée, ne peut pas être supprimée)</li>
                    <li>Complétez le nom et le montant</li>
                  </ol>
                  <p>Ces revenus apparaissent en vert et augmentent votre solde <strong>Disponible</strong>.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📝 4. Ajouter des Dépenses</div>
                  <p>Complétez le formulaire :</p>
                  <ul style={styles.howToList}>
                    <li><strong>Nom :</strong> Décrivez la dépense (ex : "Supermarket", "Essence")</li>
                    <li><strong>Total prévu :</strong> Ce que vous prévoyez dépenser</li>
                    <li><strong>Catégorie :</strong> Maison, Nourriture, Voiture, etc. (vous pouvez en créer dans Configuration)</li>
                    <li><strong>Type de dépense :</strong> Récurrent (copié au mois suivant) ou Ponctuel</li>
                    <li><strong>Fréquence :</strong> Mensuelle, Hebdomadaire, Aux deux semaines ou Une fois</li>
                    <li><strong>Date de paiement :</strong> Quand elle est due ou vous prévoyez de payer</li>
                    <li><strong>Compte :</strong> Débit, Crédit, Espèces, etc.</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💸 5. Paiements Réels (Ce que vous avez réellement payé)</div>
                  <p>La valeur <strong>Réel</strong> est calculée à partir du bouton <strong>"Admin"</strong> dans le tableau. Cela permet d'enregistrer des paiements partiels :</p>
                  <ul style={styles.howToList}>
                    <li>Si vous payez 30€ sur 100€ prévus → le réel sera 30€, le disponible reflète la différence</li>
                    <li>Si vous payez 120€ sur 100€ prévus → apparaît en rouge (dépassement) avec différence négative</li>
                    <li>Vous pouvez ajouter plusieurs paiements pour une même dépense (ex : plusieurs achats au supermarché pendant le mois)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🎨 6. Couleurs et Significations</div>
                  <ul style={styles.howToList}>
                    <li><span style={{ color: "#4caf50" }}>🟢 Vert :</span> Lignes de revenus (salaire ou revenus aléatoires)</li>
                    <li><span style={{ color: "#4caf50" }}>🟢 Cellule Réel verte :</span> Vous avez payé <strong>moins</strong> que prévu → Vous avez économisé</li>
                    <li><span style={{ color: "#ffc107" }}>🟡 Cellule Réel jaune :</span> Vous avez payé <strong>exactement</strong> ce que vous aviez prévu</li>
                    <li><span style={{ color: "#f44336" }}>🔴 Cellule Réel rouge :</span> Vous avez payé <strong>plus</strong> que prévu → Dépassement</li>
                    <li><span style={{ color: "#9e9e9e" }}>⚪ Cellule Réel grise :</span> Aucun paiement enregistré encore → En attente</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📊 7. Disponible</div>
                  <p>Le <strong>Disponible</strong> est calculé comme suit :</p>
                  <p style={{ background: "rgba(225,6,0,0.15)", padding: "10px", borderRadius: "6px", textAlign: "center", fontWeight: "bold" }}>
                    Revenu Mensuel + Revenus Aléatoires - Dépenses Prévues
                  </p>
                  <p>⚠️ <strong>Important :</strong> Les paiements réels ne modifient PAS directement le Disponible. Le disponible montre votre planification. La différence entre prévu et réel apparaît dans la fenêtre Admin de chaque dépense.</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>🔍 8. Trier par Date</div>
                  <p>Cliquez sur l'en-tête de colonne <strong>"Date de paiement"</strong> :</p>
                  <ul style={styles.howToList}>
                    <li>1er clic → Ordre croissant (du plus ancien au plus récent)</li>
                    <li>2ème clic → Ordre décroissant (du plus récent au plus ancien)</li>
                    <li>3ème clic → Retour à l'ordre original de saisie</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📅 9. Créer de Nouveaux Mois</div>
                  <p>Dans le widget du mois, vous avez deux options :</p>
                  <ul style={styles.howToList}>
                    <li><strong>Créer le mois en copiant TOUTES les dépenses :</strong> Copie tous les mouvements, y compris les ponctuels</li>
                    <li><strong>Créer le mois avec seulement les RÉCURRENTS :</strong> Copie seulement les dépenses marquées comme "Récurrentes"</li>
                  </ul>
                  <p>Les dates de paiement s'ajustent automatiquement au nouveau mois (ex : un paiement le 31 sera déplacé au 28 si le mois a seulement 28 jours).</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>📄 10. Rapports PDF</div>
                  <p>Dans le widget du mois, cliquez sur <strong>"Générer rapport PDF"</strong> pour obtenir :</p>
                  <ul style={styles.howToList}>
                    <li>Résumé financier du mois (revenus, dépenses, disponible)</li>
                    <li>Liste complète des mouvements triés par date</li>
                    <li>Indicateurs de revenus (vert) et dépenses en attente (gris)</li>
                  </ul>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>💾 11. Exporter et Importer des Données (Sauvegarde)</div>
                  <p>Pour ne pas perdre vos informations :</p>
                  <ul style={styles.howToList}>
                    <li><strong>📦 Exporter les données :</strong> Sauvegarde un fichier .json avec TOUS vos mois, catégories et comptes</li>
                    <li><strong>📂 Importer les données :</strong> Restaure vos informations à partir d'un fichier de sauvegarde</li>
                  </ul>
                  <p>Les données sont stockées dans votre navigateur (localStorage). Si vous effacez le cache du navigateur, vous perdrez les informations. Utilisez l'exportation périodiquement !</p>
                </div>

                <div style={styles.howToCard}>
                  <div style={styles.howToTitle}>⚙️ 12. Configuration</div>
                  <p>Vous pouvez personnaliser :</p>
                  <ul style={styles.howToList}>
                    <li><strong>Catégories :</strong> Ajoutez ou supprimez des catégories de dépenses (sauf "Ingresos" qui est protégée)</li>
                    <li><strong>Comptes :</strong> Ajoutez ou supprimez des méthodes de paiement (cartes, comptes bancaires, espèces)</li>
                    <li><strong>Mois créés :</strong> Visualisez et supprimez des mois entiers</li>
                  </ul>
                </div>

                <div style={styles.howToNote}>
                  <strong>💡 Conseil rapide :</strong> Pour utiliser l'application, configurez d'abord votre Revenu Mensuel et votre Date du premier revenu, puis ajoutez vos dépenses prévues. Au fur et à mesure que vous effectuez des paiements, enregistrez-les dans "Admin". Le Tableau de bord vous montrera votre situation financière en temps réel.
                </div>
              </div>
            )}
          </div>
        )}

        {page === "settings" && (
          <>
            <div style={styles.card}>
              <h2>{t.categoriesConfig}</h2>
              <form onSubmit={addCategory} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input style={styles.input} placeholder={t.newCategory} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <button style={styles.button} type="submit">{t.addCategory}</button>
              </form>
              {categories.map((cat) => <div key={cat} style={styles.listItem}><span>{cat}</span><button onClick={() => deleteCategory(cat)} disabled={cat === INCOME_CATEGORY}>{t.delete}</button></div>)}
            </div>
            <div style={styles.card}>
              <h2>{t.accountsConfig}</h2>
              <form onSubmit={addAccount} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input style={styles.input} placeholder={t.newAccount} value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                <button style={styles.button} type="submit">{t.addAccount}</button>
              </form>
              {accounts.map((acc) => <div key={acc} style={styles.listItem}><span>{acc}</span><button onClick={() => deleteAccount(acc)}>{t.delete}</button></div>)}
            </div>
            <div style={styles.card}>
              <h2>{t.createdMonths}</h2>
              {Object.keys(monthlyData).length === 0 ? <p>{t.noMonths}</p> : Object.keys(monthlyData).sort().map((month) => (
                <div key={month} style={styles.listItem}><span>{month}</span><button onClick={() => deleteMonth(month)}>{t.delete}</button></div>
              ))}
            </div>
          </>
        )}

        <footer style={styles.footer}>
          <div style={styles.footerBrand}><img src="/Altura.png" alt="Altura IT Solutions" style={styles.footerLogo} /><div><strong>{APP_NAME}</strong> <span>{APP_VERSION}</span><p>{APP_SUBTITLE}</p></div></div>
          <div style={{ textAlign: "center" }}>Developed by <span style={styles.redText}>{APP_DEVELOPER}</span><br />© 2026 Diego Isaza</div>
          <div>{APP_NAME} is a personal finance management application designed to help you plan, track and control your finances.</div>
        </footer>
      </main>

      {/* Modal de Pagos */}
      {selectedPaymentExpense && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{t.managePaymentsFull}: {selectedPaymentExpense.name}</h2>
            <p>{t.planned}: ${selectedPaymentExpense.plannedAmount.toFixed(2)} | {t.real}: ${selectedPaymentReal.toFixed(2)} | {t.difference}: {selectedPaymentDifference >= 0 ? "+" : "-"}${Math.abs(selectedPaymentDifference).toFixed(2)} {selectedPaymentDifference >= 0 ? t.savings : t.overCost}</p>
            <form onSubmit={addPayment} style={styles.formGrid}>
              <div><label>{t.paymentDate}</label><input style={styles.input} type="date" value={newPayment.date} onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })} /></div>
              <div><label>{t.paymentAmount}</label><input style={styles.input} type="number" value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} /></div>
              <div><label>{t.paymentNote}</label><input style={styles.input} value={newPayment.note} onChange={(e) => setNewPayment({ ...newPayment, note: e.target.value })} /></div>
              <div style={{ display: "flex", gap: "10px", alignItems: "end" }}><button type="submit" style={styles.button}>{t.addPayment}</button><button type="button" style={styles.button} onClick={() => setPaymentExpenseIndex(null)}>{t.close}</button></div>
            </form>
            <h3>{t.paymentHistory}</h3>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead><tr><th style={styles.th}>{t.paymentDate}</th><th style={styles.th}>{t.paymentAmount}</th><th style={styles.th}>{t.paymentNote}</th><th style={styles.th}>{t.action}</th></tr></thead>
                <tbody>
                  {selectedPaymentExpense.payments.length === 0 ? <tr><td style={styles.td} colSpan="4">{t.noPayments}</td></tr> : selectedPaymentExpense.payments.map((payment, idx) => (
                    <tr key={idx}><td style={styles.td}>{payment.date}</td><td style={styles.td}>${Number(payment.amount).toFixed(2)}</td><td style={styles.td}>{payment.note}</td><td style={styles.td}><button onClick={() => deletePayment(paymentExpenseIndex, idx)}>{t.delete}</button></td></tr>
                  ))}
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