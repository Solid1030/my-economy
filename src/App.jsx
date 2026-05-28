import { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const APP_NAME = "My Economy";
const APP_SUBTITLE = "Take control of your money.";
const APP_VERSION = "v1.9.0";
const APP_DEVELOPER = "Altura IT Solutions";
const INCOME_CATEGORY = "Ingresos";

// Fecha ficticia para items sin fecha (internamente para ordenar, nunca se muestra)
const NO_DATE_SORT_VALUE = "9999-12-31";

const translations = {
  es: {
    dashboard: "Dashboard",
    reports: "Reportes",
    settings: "Configuración",
    howTo: "Cómo Usar",
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
    sortAsc: "Ascendente",
    sortDesc: "Descendente",
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
    transferAvailable: "Transferir disponible al nuevo mes",
    transferOptionNone: "No transferir (empezar limpio)",
    transferOptionIncome: "Transferir como ingreso extra",
    transferOptionAvailable: "Agregar al disponible del nuevo mes",
    previousAvailable: "Disponible del mes anterior",
    transferredAmount: "Monto transferido",
    carriedOverIncome: "Ingreso arrastrado",
    resetSort: "Resetear orden (fecha ascendente)",
    sortByDateDefault: "Orden por fecha ascendente",
  },
  en: {
    dashboard: "Dashboard",
    reports: "Reports",
    settings: "Settings",
    howTo: "How to Use",
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
    sortAsc: "Ascending",
    sortDesc: "Descending",
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
    transferAvailable: "Transfer available balance to new month",
    transferOptionNone: "Don't transfer (start fresh)",
    transferOptionIncome: "Transfer as extra income",
    transferOptionAvailable: "Add to new month's available balance",
    previousAvailable: "Previous month available",
    transferredAmount: "Transferred amount",
    carriedOverIncome: "Carried over income",
    resetSort: "Reset sort (date ascending)",
    sortByDateDefault: "Sort by date ascending",
  },
  fr: {
    dashboard: "Tableau de bord",
    reports: "Rapports",
    settings: "Configuration",
    howTo: "Comment utiliser",
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
    sortAsc: "Croissant",
    sortDesc: "Décroissant",
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
    transferAvailable: "Transférer le solde disponible",
    transferOptionNone: "Ne pas transférer",
    transferOptionIncome: "Transférer comme revenu",
    transferOptionAvailable: "Ajouter au disponible",
    previousAvailable: "Disponible précédent",
    transferredAmount: "Montant transféré",
    carriedOverIncome: "Revenu reporté",
    resetSort: "Réinitialiser (date croissante)",
    sortByDateDefault: "Tri par date croissante",
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

function getSortableDate(dateString) {
  if (!dateString || dateString === "") return NO_DATE_SORT_VALUE;
  return dateString;
}

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "es");
  const t = translations[language];

  const [page, setPage] = useState("dashboard");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  
  const [sortConfig, setSortConfig] = useState(() => {
    const saved = localStorage.getItem("sortConfig");
    if (saved) return JSON.parse(saved);
    return { key: "paymentDate", direction: "asc" };
  });

  // NUBE: Estado para la nube
  const [cloudFilePath, setCloudFilePath] = useState(() => {
    return localStorage.getItem("cloudFilePath") || null;
  });
  const [cloudFileHandle, setCloudFileHandle] = useState(null);
  const [isCloudMode, setIsCloudMode] = useState(() => {
    return localStorage.getItem("cloudFilePath") !== null;
  });

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
  
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [pendingCopyMode, setPendingCopyMode] = useState(null);
  const [pendingTargetMonth, setPendingTargetMonth] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sortConfig", JSON.stringify(sortConfig));
  }, [sortConfig]);

  useEffect(() => {
    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [monthlyData, categories, accounts]);

  useEffect(() => localStorage.setItem("language", language), [language]);

  // Auto-guardado a la nube
  useEffect(() => {
    if (isCloudMode && cloudFileHandle) {
      const saveTimeout = setTimeout(() => {
        saveToCloudFile();
      }, 1000);
      return () => clearTimeout(saveTimeout);
    }
  }, [monthlyData, categories, accounts, isCloudMode, cloudFileHandle]);

  useEffect(() => {
    const data = monthlyData[selectedMonth] || emptyMonth;
    setIncome(data.income || "");
    setIncomeFrequency(data.incomeFrequency || "monthly");
    setIncomeDate(data.incomeDate || "");
  }, [selectedMonth, monthlyData]);

  const closePaymentModal = () => setPaymentExpenseIndex(null);
  
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) closePaymentModal();
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && paymentExpenseIndex !== null) closePaymentModal();
      if (e.key === "Escape" && showTransferDialog) setShowTransferDialog(false);
    };
    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [paymentExpenseIndex, showTransferDialog]);

  // NUBE: Funciones
  async function selectCloudFile() {
    try {
      let fileHandle = null;
      
      if ('showOpenFilePicker' in window) {
        [fileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'JSON files',
            accept: { 'application/json': ['.json'] },
          }],
        });
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        const fileSelected = await new Promise((resolve) => {
          input.onchange = (e) => resolve(e.target.files[0]);
          input.click();
        });
        if (!fileSelected) return;
        
        const text = await fileSelected.text();
        const data = JSON.parse(text);
        
        if (data.categories && data.accounts && data.monthlyData) {
          setCategories(data.categories);
          setAccounts(data.accounts);
          setMonthlyData(data.monthlyData);
          setCloudFilePath(fileSelected.name);
          setIsCloudMode(true);
          localStorage.setItem("cloudFilePath", fileSelected.name);
          alert("☁️ Archivo conectado. Los cambios se guardarán automáticamente.");
        } else {
          alert("El archivo no tiene el formato correcto.");
        }
        return;
      }
      
      const file = await fileHandle.getFile();
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (data.categories && data.accounts && data.monthlyData) {
        setCategories(data.categories);
        setAccounts(data.accounts);
        setMonthlyData(data.monthlyData);
        setCloudFilePath(file.name);
        setCloudFileHandle(fileHandle);
        setIsCloudMode(true);
        localStorage.setItem("cloudFilePath", file.name);
        alert("☁️ Archivo conectado. Todos los cambios se guardarán automáticamente en este archivo.");
      } else {
        alert("El archivo no tiene el formato correcto.");
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error selecting cloud file:", err);
        alert("Error al seleccionar el archivo.");
      }
    }
  }

  async function saveToCloudFile() {
    if (!cloudFileHandle && isCloudMode) {
      console.log("No file handle available for cloud save");
      return;
    }
    
    if (!cloudFileHandle) return;
    
    try {
      const data = {
        version: APP_VERSION,
        lastModified: new Date().toISOString(),
        categories: categories,
        accounts: accounts,
        monthlyData: monthlyData,
      };
      const jsonString = JSON.stringify(data, null, 2);
      
      const writable = await cloudFileHandle.createWritable();
      await writable.write(jsonString);
      await writable.close();
      
      console.log("✅ Auto-saved to cloud file:", cloudFilePath);
    } catch (err) {
      console.error("Error saving to cloud file:", err);
      setIsCloudMode(false);
      localStorage.removeItem("cloudFilePath");
      alert("⚠️ Error al guardar en la nube. Se ha desactivado el modo nube. Vuelve a conectar el archivo.");
    }
  }

  function disconnectCloud() {
    setCloudFilePath(null);
    setCloudFileHandle(null);
    setIsCloudMode(false);
    localStorage.removeItem("cloudFilePath");
    alert("☁️ Modo nube desactivado. Ahora trabajas solo en localStorage.");
  }

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
        if (Object.keys(monthlyData).length > 0 && !confirm(t.confirmOverwrite)) return;
        setCategories(importedData.categories);
        setAccounts(importedData.accounts);
        setMonthlyData(importedData.monthlyData);
        alert(t.importSuccess);
      } catch (error) {
        alert(t.importError);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function getAvailableColor(amount) {
    if (amount > 0) return { color: "#4caf50", backgroundColor: "rgba(76, 175, 80, 0.15)" };
    if (amount < 0) return { color: "#f44336", backgroundColor: "rgba(244, 67, 54, 0.15)" };
    return { color: "#ffc107", backgroundColor: "rgba(255, 193, 7, 0.15)" };
  }

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

  function requestSort(key) {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      setSortConfig({ key: "paymentDate", direction: "asc" });
      return;
    }
    setSortConfig({ key, direction });
  }

  function resetSort() {
    setSortConfig({ key: "paymentDate", direction: "asc" });
  }

  function getSortIcon(columnKey) {
    if (sortConfig.key !== columnKey) return "↕️";
    if (sortConfig.direction === "asc") return "▲";
    if (sortConfig.direction === "desc") return "▼";
    return "↕️";
  }

  function getSortTitle(columnName) {
    if (sortConfig.key === "paymentDate" && sortConfig.direction === "asc") {
      return `${columnName} - ${t.sortAsc} (${t.sortByDateDefault})`;
    }
    if (sortConfig.key === "paymentDate" && sortConfig.direction === "desc") {
      return `${columnName} - ${t.sortDesc}`;
    }
    return `${columnName} - ${sortConfig.direction === "asc" ? t.sortAsc : t.sortDesc}`;
  }

  function isIncomeItem(expense) { return expense?.category === INCOME_CATEGORY; }
  function isSalaryItem(expense) { return expense?.isVirtualSalary === true; }
  function isSplitExpenseItem(expense) { return expense?.isVirtualSplitExpense === true; }
  function isIncomingItem(expense) { return isIncomeItem(expense) || isSalaryItem(expense); }

  function sortPaymentsByDate(payments) {
    return [...(payments || [])].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date + "T00:00:00") - new Date(b.date + "T00:00:00");
    });
  }

  function addDays(date, days) { const newDate = new Date(date); newDate.setDate(newDate.getDate() + days); return newDate; }
  function formatDateForInput(date) { return date.toISOString().slice(0, 10); }

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
      return paymentsForDate.reduce((sum, payment) => sum + Number(payment.amount || 0), 0) || null;
    }
    const paymentsTotal = getPaymentsTotal(normalizeExpense(expense));
    return paymentsTotal > 0 ? paymentsTotal : null;
  }

  function getStatusStyle(value) {
    if (value > 0) return { backgroundColor: "#1f7a1f", color: "white", fontWeight: "bold" };
    if (value < 0) return { backgroundColor: "#a12626", color: "white", fontWeight: "bold" };
    return { backgroundColor: "#b59b20", color: "white", fontWeight: "bold" };
  }

  function getRealCellStyle(expense) {
    if (isIncomingItem(expense)) return { backgroundColor: "rgba(31, 122, 31, 0.8)", color: "#ffffff", fontWeight: "bold" };
    const planned = Number(expense.plannedAmount || 0);
    const real = getEffectiveReal(expense);
    if (real === null) return { backgroundColor: "rgba(255,255,255,0.06)", color: "#b8b8b8", fontWeight: "bold" };
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
      income, incomeFrequency, incomeDate,
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
      category: categories.find((c) => c !== INCOME_CATEGORY) || categories[0] || "",
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
    const updatedExpenses = currentMonthData.expenses.map((exp, i) => i === index ? updatedExpense : exp);
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
    setEditingRowIndex(null);
    setEditingExpense(null);
  }

  function deleteExpense(indexToDelete) {
    const updatedExpenses = currentMonthData.expenses.filter((_, i) => i !== indexToDelete);
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
    const updatedExpenses = currentMonthData.expenses.map((expense, idx) => {
      if (idx !== paymentExpenseIndex) return expense;
      const normalized = normalizeExpense(expense);
      return {
        ...normalized,
        payments: sortPaymentsByDate([...normalized.payments, { date: newPayment.date, amount: Number(newPayment.amount), note: newPayment.note }]),
      };
    });
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
    setNewPayment({ date: "", amount: "", note: "" });
  }

  function deletePayment(expenseIndex, paymentIndex) {
    const updatedExpenses = currentMonthData.expenses.map((expense, idx) => {
      if (idx !== expenseIndex) return expense;
      const normalized = normalizeExpense(expense);
      return { ...normalized, payments: normalized.payments.filter((_, i) => i !== paymentIndex) };
    });
    saveMonthData({ ...currentMonthData, income, incomeFrequency, incomeDate, expenses: updatedExpenses });
  }

  function getLastDayOfMonth(year, monthNumber) { return new Date(year, monthNumber, 0).getDate(); }

  function moveDateToSelectedMonth(dateString, targetMonth) {
    if (!dateString || !targetMonth) return "";
    const [, , originalDayString] = dateString.split("-");
    const [targetYearString, targetMonthString] = targetMonth.split("-");
    const targetYear = Number(targetYearString);
    const targetMonthNumber = Number(targetMonthString);
    const originalDay = Number(originalDayString);
    const lastDay = getLastDayOfMonth(targetYear, targetMonthNumber);
    return `${targetYearString}-${targetMonthString}-${String(Math.min(originalDay, lastDay)).padStart(2, "0")}`;
  }

  function executeCreateNewMonth(copyMode, transferOption) {
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
    
    let previousMonthAvailable = 0;
    if (monthlyData[previousMonth]) {
      const prevExpenses = (monthlyData[previousMonth].expenses || []).filter(e => !isIncomeItem(e));
      const prevTotalPlanned = prevExpenses.reduce((sum, e) => sum + Number(e.plannedAmount || 0), 0);
      const prevRandomIncome = (monthlyData[previousMonth].expenses || []).filter(isIncomeItem).reduce((sum, e) => sum + Number(e.plannedAmount || 0), 0);
      const prevIncome = Number(monthlyData[previousMonth].income || 0);
      previousMonthAvailable = prevIncome + prevRandomIncome - prevTotalPlanned;
    }

    let newIncome = previousData ? previousData.income : "";
    
    if (transferOption !== "none" && previousMonthAvailable > 0) {
      if (transferOption === "income") {
        const carriedOverExpense = {
          name: t.carriedOverIncome,
          plannedAmount: previousMonthAvailable,
          realAmount: 0,
          payments: [],
          frequency: "once",
          paymentDay: moveDateToSelectedMonth(incomeDate || new Date().toISOString().slice(0, 10), selectedMonth),
          account: accounts[0] || "",
          category: INCOME_CATEGORY,
          expenseType: "sporadic",
        };
        expensesToCopy.push(carriedOverExpense);
      } else if (transferOption === "available") {
        const currentIncome = Number(previousData ? previousData.income : 0);
        newIncome = (currentIncome + previousMonthAvailable).toString();
      }
    }

    saveMonthData({
      income: newIncome,
      incomeFrequency: previousData ? previousData.incomeFrequency || "monthly" : "monthly",
      incomeDate: previousData ? moveDateToSelectedMonth(previousData.incomeDate, selectedMonth) : "",
      expenses: expensesToCopy,
    });
  }

  function initiateCreateNewMonth(copyMode) {
    if (monthlyData[selectedMonth]) {
      alert(t.monthExists);
      return;
    }

    const [year, month] = selectedMonth.split("-").map(Number);
    const previousDate = new Date(year, month - 2, 1);
    const previousMonth = previousDate.toISOString().slice(0, 7);
    
    let previousMonthAvailable = 0;
    if (monthlyData[previousMonth]) {
      const prevExpenses = (monthlyData[previousMonth].expenses || []).filter(e => !isIncomeItem(e));
      const prevTotalPlanned = prevExpenses.reduce((sum, e) => sum + Number(e.plannedAmount || 0), 0);
      const prevRandomIncome = (monthlyData[previousMonth].expenses || []).filter(isIncomeItem).reduce((sum, e) => sum + Number(e.plannedAmount || 0), 0);
      const prevIncome = Number(monthlyData[previousMonth].income || 0);
      previousMonthAvailable = prevIncome + prevRandomIncome - prevTotalPlanned;
    }

    if (previousMonthAvailable > 0) {
      setPendingCopyMode(copyMode);
      setPendingTargetMonth(selectedMonth);
      setShowTransferDialog(true);
    } else {
      executeCreateNewMonth(copyMode, "none");
    }
  }

  function handleTransferOption(option) {
    executeCreateNewMonth(pendingCopyMode, option);
    setShowTransferDialog(false);
    setPendingCopyMode(null);
    setPendingTargetMonth(null);
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
    if (categories.includes(value)) { alert(t.categoryExists); return; }
    setCategories([...categories, value]);
    setNewCategory("");
  }

  function deleteCategory(categoryToDelete) {
    if (categoryToDelete === INCOME_CATEGORY) { alert(t.protectedCategory); return; }
    setCategories(categories.filter(c => c !== categoryToDelete));
  }

  function addAccount(event) {
    event.preventDefault();
    const value = newAccount.trim();
    if (!value) return;
    if (accounts.includes(value)) { alert(t.accountExists); return; }
    setAccounts([...accounts, value]);
    setNewAccount("");
  }

  function deleteAccount(accountToDelete) {
    setAccounts(accounts.filter(a => a !== accountToDelete));
  }

  function getBiweeklyExpenseRows(expense) {
    if (isIncomingItem(expense) || normalizeFrequency(expense.frequency) !== "biweekly" || !expense.paymentDay) return [expense];
    const firstDate = new Date(expense.paymentDay + "T00:00:00");
    const secondDate = addDays(firstDate, 14);
    return [firstDate, secondDate].map((date, idx) => ({
      ...expense,
      name: `${expense.name} ${idx + 1}`,
      paymentDay: formatDateForInput(date),
      plannedAmount: Number(expense.plannedAmount || 0) / 2,
      originalPlannedAmount: Number(expense.plannedAmount || 0),
      occurrenceIndex: idx,
      isVirtualSplitExpense: true,
    }));
  }

  const normalizedExpenses = (currentMonthData.expenses || []).map((expense, index) => ({
    ...normalizeExpense(expense),
    originalIndex: index,
  }));

  const expenseItems = normalizedExpenses.filter(item => !isIncomeItem(item));
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
      while (current > startOfMonth) current.setDate(current.getDate() - interval);
      while (current <= endOfMonth) {
        if (current >= startOfMonth) dates.push(new Date(current));
        current.setDate(current.getDate() + interval);
      }
    }
    const amountPerOccurrence = dates.length > 0 ? numericIncome / dates.length : numericIncome;
    return dates.map((date, idx) => ({
      name: `${t.salary} ${dates.length > 1 ? idx + 1 : ""}`.trim(),
      amount: amountPerOccurrence,
      date,
      type: "salary",
    }));
  }

  const salaryTableRows = getSalaryOccurrences().map((salary, idx) => ({
    name: salary.name,
    category: INCOME_CATEGORY,
    expenseType: "",
    frequency: "",
    paymentDay: salary.date.toISOString().slice(0, 10),
    account: "",
    plannedAmount: Number(salary.amount || 0),
    realAmount: Number(salary.amount || 0),
    payments: [],
    originalIndex: 100000 + idx,
    isVirtualSalary: true,
  }));

  const expenseRowsForTable = normalizedExpenses.flatMap(e => getBiweeklyExpenseRows(e));
  
  const getSortedExpenses = () => {
    const allRows = [...expenseRowsForTable, ...salaryTableRows];
    
    const sortKey = sortConfig.key;
    const sortDirection = sortConfig.direction;
    
    if (!sortKey || !sortDirection) {
      return allRows.sort((a, b) => {
        const dateA = getSortableDate(a.paymentDay);
        const dateB = getSortableDate(b.paymentDay);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return a.originalIndex - b.originalIndex;
      });
    }
    
    return allRows.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortKey) {
        case "name":
          aVal = a.name?.toLowerCase() || "";
          bVal = b.name?.toLowerCase() || "";
          break;
        case "category":
          aVal = a.category?.toLowerCase() || "";
          bVal = b.category?.toLowerCase() || "";
          break;
        case "type":
          aVal = isIncomeItem(a) ? "income" : (a.expenseType || "");
          bVal = isIncomeItem(b) ? "income" : (b.expenseType || "");
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
          break;
        case "frequency":
          aVal = normalizeFrequency(a.frequency);
          bVal = normalizeFrequency(b.frequency);
          break;
        case "paymentDate":
          aVal = getSortableDate(a.paymentDay);
          bVal = getSortableDate(b.paymentDay);
          break;
        case "account":
          aVal = a.account?.toLowerCase() || "";
          bVal = b.account?.toLowerCase() || "";
          break;
        case "plannedAmount":
          aVal = Number(a.plannedAmount || 0);
          bVal = Number(b.plannedAmount || 0);
          break;
        case "realAmount":
          aVal = Number(getEffectiveReal(a) || 0);
          bVal = Number(getEffectiveReal(b) || 0);
          break;
        default:
          const defaultA = getSortableDate(a.paymentDay);
          const defaultB = getSortableDate(b.paymentDay);
          if (defaultA < defaultB) return -1;
          if (defaultA > defaultB) return 1;
          return a.originalIndex - b.originalIndex;
      }
      
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      
      const dateA = getSortableDate(a.paymentDay);
      const dateB = getSortableDate(b.paymentDay);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      
      return a.originalIndex - b.originalIndex;
    });
  };
  
  const displayedExpenses = getSortedExpenses();

  function groupExpensesBy(fieldName) {
    const totals = {};
    expenseItems.forEach(expense => {
      const key = expense[fieldName] || "Sin definir";
      const value = Number(getEffectiveReal(expense) || 0);
      if (!totals[key]) totals[key] = { name: key, amount: 0, count: 0 };
      totals[key].amount += value;
      totals[key].count += 1;
    });
    return Object.values(totals).map(item => ({ ...item, amount: Number(item.amount.toFixed(2)) })).sort((a, b) => b.amount - a.amount);
  }

  const categoryReportData = groupExpensesBy("category");
  const accountReportData = groupExpensesBy("account");

  const selectedPaymentExpense = paymentExpenseIndex !== null && currentMonthData.expenses?.[paymentExpenseIndex]
    ? normalizeExpense(currentMonthData.expenses[paymentExpenseIndex]) : null;
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
    const expenseMovements = expenseRowsForTable.filter(e => e.paymentDay).map(e => {
      const date = new Date(e.paymentDay + "T00:00:00");
      return { name: e.name, amount: Number(e.plannedAmount || 0), date, daysLeft: Math.ceil((date - today) / (86400000)), type: isIncomeItem(e) ? "income" : "expense" };
    });
    const salaryMovements = getSalaryOccurrences().map(m => ({ ...m, daysLeft: Math.ceil((m.date - today) / 86400000) }));
    return [...expenseMovements, ...salaryMovements].filter(m => m.daysLeft >= 0).sort((a, b) => a.date - b.date).slice(0, 7);
  }

  const upcomingPayments = getUpcomingMovements();

  function generateMonthlyPdf() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
    const generatedAt = new Date().toLocaleDateString(language === "en" ? "en-US" : language === "fr" ? "fr-CA" : "es-ES");
    const movementsForPdf = [...salaryTableRows, ...expenseRowsForTable].sort((a, b) => {
      const dateA = getSortableDate(a.paymentDay);
      const dateB = getSortableDate(b.paymentDay);
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return a.originalIndex - b.originalIndex;
    }).map(item => {
      const incoming = isIncomingItem(item);
      const realValue = getEffectiveReal(item);
      return [item.paymentDay || "-", item.name || "-", incoming ? t.income : t.expense, item.category || "-", item.account || "-", `${incoming ? "+" : ""}$${Number(item.plannedAmount || 0).toFixed(2)}`, incoming ? `+$${Number(item.plannedAmount || 0).toFixed(2)}` : realValue === null ? t.pending : `$${Number(realValue).toFixed(2)}`];
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
    autoTable(doc, { startY: 50, theme: "grid", head: [[t.monthlyIncome, t.randomIncome, t.totalPlanned, t.totalReal, t.available]], body: [[`$${numericIncome.toFixed(2)}`, `+$${randomIncomeTotal.toFixed(2)}`, `$${totalPlanned.toFixed(2)}`, `$${totalReal.toFixed(2)}`, `$${available.toFixed(2)}`]], headStyles: { fillColor: [225, 6, 0], textColor: [255, 255, 255] }, styles: { fontSize: 9 } });
    doc.setFontSize(13);
    doc.text(t.expensesMonth, 14, doc.lastAutoTable.finalY + 14);
    autoTable(doc, { startY: doc.lastAutoTable.finalY + 20, theme: "striped", head: [[t.paymentDate, t.name, t.type, t.category, t.account, t.planned, t.real]], body: movementsForPdf.length ? movementsForPdf : [["-", t.noData, "-", "-", "-", "-", "-"]], headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255] }, styles: { fontSize: 8, cellPadding: 2 }, alternateRowStyles: { fillColor: [245, 245, 245] }, didParseCell: (data) => { if (data.section === "body" && String(data.row.raw?.[2]).includes(t.income)) { data.cell.styles.textColor = [31, 122, 31]; data.cell.styles.fontStyle = "bold"; } } });
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) { doc.setPage(i); doc.setFontSize(8); doc.setTextColor(120, 120, 120); doc.text(`${APP_NAME} ${APP_VERSION} · ${i}/${pageCount}`, 14, 270); }
    doc.save(`my-economy-statement-${selectedMonth}.pdf`);
  }

  function generateUserGuidePdf() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
    let y = 18;
    const title = (text) => { doc.setFontSize(18); doc.setTextColor(225, 6, 0); doc.text(text, 14, y); y += 10; };
    const section = (heading, body) => { if (y > 240) { doc.addPage(); y = 18; } doc.setFontSize(13); doc.setTextColor(0, 0, 0); doc.text(heading, 14, y); y += 7; doc.setFontSize(10); doc.setTextColor(70, 70, 70); const lines = doc.splitTextToSize(body, 185); doc.text(lines, 14, y); y += lines.length * 5 + 7; };
    doc.setFillColor(20, 20, 20); doc.rect(0, 0, 216, 34, "F"); doc.setTextColor(255, 255, 255); doc.setFontSize(21); doc.text(APP_NAME, 14, 15); doc.setFontSize(11); doc.text(t.userGuide, 14, 25); y = 46;
    title(t.userGuide);
    section("1. Dashboard", "Main area showing selected month, income, upcoming payments, add expense form, and expense table.");
    section("2. Monthly Income", "Set your salary amount and frequency. Salary entries appear as green virtual rows.");
    section("3. Random Income", "Use 'Ingresos' category for extra income. These appear in green and increase available balance.");
    section("4. Expenses", "Recurrent or sporadic. Planned value is expected amount. Real value from Admin payments.");
    section("5. Partial Payments", "Use Admin to add multiple payments to same expense.");
    section("6. Sorting", "Click any column header to sort. Click again to reverse. A third click returns to date ascending (default). Items without date always appear at the end. Your sort preference is saved automatically.");
    section("7. Reports", "Expense summaries by category and account. Income entries excluded.");
    section("8. Transfer Available Balance", "When creating a new month with positive available balance, you can transfer it as extra income or add to new month's available.");
    section("9. Export/Import Data", "Use JSON backup to save or restore all your data.");
    doc.setFontSize(8); doc.setTextColor(120, 120, 120); doc.text(`${APP_DEVELOPER} · ${APP_NAME} ${APP_VERSION}`, 14, 270);
    doc.save("my-economy-user-guide.pdf");
  }

  const styles = {
    page: { minHeight: "100vh", padding: "0", fontFamily: "Inter, Arial, sans-serif", background: "radial-gradient(circle at top left, #182023 0%, #090b0d 38%, #050505 100%)", color: "#f5f5f5" },
    appShell: { maxWidth: "1500px", margin: "0 auto", padding: "0 24px 24px" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 24px 18px", borderBottom: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50, flexWrap: "wrap", gap: "16px" },
    brand: { display: "flex", alignItems: "center", gap: "16px" },
    logo: { width: "68px", height: "68px", objectFit: "contain" },
    brandTitle: { margin: 0, fontSize: "32px", lineHeight: "34px", fontWeight: 800, letterSpacing: "-0.5px" },
    brandSubtitle: { margin: "6px 0 0", color: "#b8b8b8", fontSize: "15px" },
    nav: { display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" },
    navButton: { padding: "14px 18px", borderRadius: "0", border: "none", borderBottom: "3px solid transparent", cursor: "pointer", backgroundColor: "transparent", color: "#b8b8b8", fontSize: "15px" },
    navButtonActive: { color: "#ffffff", backgroundColor: "rgba(255,255,255,0.05)", borderBottom: "3px solid #e10600" },
    cloudButton: { 
      background: "none", 
      border: "none", 
      fontSize: "20px", 
      cursor: "pointer", 
      padding: "8px 12px",
      borderRadius: "8px",
      transition: "all 0.2s",
      opacity: 0.7,
      position: "relative",
    },
    cloudButtonActive: { 
      opacity: 1,
      backgroundColor: "rgba(255,255,255,0.1)",
      boxShadow: "0 0 8px rgba(76, 175, 80, 0.3)",
    },
    cloudConnected: { color: "#4caf50" },
    cloudDisconnected: { color: "#b8b8b8" },
    smallSelect: { padding: "12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "#1a1a1a", color: "#ffffff", outline: "none", cursor: "pointer" },
    card: { border: "1px solid rgba(255,255,255,0.13)", borderRadius: "12px", padding: "20px", marginBottom: "20px", background: "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))", boxShadow: "0 18px 40px rgba(0,0,0,0.25)" },
    input: { width: "100%", padding: "11px 12px", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.18)", marginTop: "6px", boxSizing: "border-box", backgroundColor: "#1a1a1a", color: "#ffffff", outline: "none" },
    tableInput: { width: "100%", padding: "6px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.18)", fontSize: "12px", backgroundColor: "#1a1a1a", color: "#ffffff" },
    button: { padding: "10px 14px", borderRadius: "7px", border: "none", cursor: "pointer", backgroundColor: "rgba(255,255,255,0.11)", color: "#ffffff" },
    buttonPrimary: { padding: "10px 14px", borderRadius: "7px", border: "none", cursor: "pointer", backgroundColor: "#e10600", color: "#ffffff", fontWeight: 800 },
    buttonSecondary: { padding: "8px 12px", borderRadius: "7px", border: "none", cursor: "pointer", backgroundColor: "rgba(255,255,255,0.08)", color: "#ffc107", fontSize: "12px" },
    tableWrapper: { overflowX: "auto" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "20px", fontSize: "12px", backgroundColor: "rgba(0,0,0,0.16)" },
    th: { padding: "10px", border: "1px solid rgba(255,255,255,0.13)", whiteSpace: "nowrap", color: "#ffffff", backgroundColor: "rgba(255,255,255,0.04)", cursor: "pointer", userSelect: "none" },
    thActive: { backgroundColor: "rgba(225, 6, 0, 0.25)", borderBottom: "2px solid #e10600" },
    td: { padding: "9px", border: "1px solid rgba(255,255,255,0.10)", textAlign: "center", fontSize: "12px", whiteSpace: "nowrap", color: "#e9e9e9" },
    listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,255,255,0.13)", borderRadius: "8px", padding: "10px", marginBottom: "8px", backgroundColor: "rgba(255,255,255,0.04)" },
    modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.72)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px", backdropFilter: "blur(8px)", cursor: "pointer" },
    modal: { background: "linear-gradient(145deg, rgba(31,31,31,0.98), rgba(9,11,13,0.98))", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "14px", padding: "25px", width: "90%", maxWidth: "1000px", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.45)", cursor: "default" },
    footer: { marginTop: "30px", padding: "22px 0", borderTop: "1px solid rgba(255,255,255,0.12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", alignItems: "center", color: "#a8a8a8", fontSize: "14px" },
    footerBrand: { display: "flex", alignItems: "center", gap: "14px" },
    footerLogo: { width: "52px", height: "52px", objectFit: "contain" },
    redText: { color: "#e10600", fontWeight: 700 },
    dashboardTopWidgets: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "20px" },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", alignItems: "end" },
    reportGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" },
    howToSection: { maxHeight: "600px", overflowY: "auto", paddingRight: "16px" },
    howToCard: { background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "16px", marginBottom: "16px", borderLeft: "3px solid #e10600" },
    howToTitle: { fontSize: "18px", fontWeight: "bold", marginBottom: "10px", color: "#e10600" },
    howToList: { margin: "10px 0 0 20px", lineHeight: "1.6" },
    howToNote: { background: "rgba(225, 6, 0, 0.1)", padding: "12px", borderRadius: "8px", marginTop: "16px", border: "1px solid rgba(225, 6, 0, 0.3)" },
    availableBox: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: "10px", marginTop: "12px", fontSize: "18px", fontWeight: "bold", transition: "all 0.2s ease" },
    transferOption: { padding: "12px 16px", margin: "8px 0", borderRadius: "8px", backgroundColor: "#1a1a1a", cursor: "pointer", transition: "all 0.2s", border: "1px solid rgba(255,255,255,0.1)" },
    sortBar: { display: "flex", justifyContent: "flex-end", marginBottom: "10px", gap: "10px", alignItems: "center" },
  };

  function renderReportTable(data, labelColumn) {
    return (
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
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
                <td style={styles.td} colSpan="3">{t.noData}</td>
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
    <div style={styles.page}>
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <img src="/Altura.png" alt="Altura IT Solutions" style={styles.logo} />
          <div>
            <h1 style={styles.brandTitle}>{APP_NAME}</h1>
            <p style={styles.brandSubtitle}>{APP_SUBTITLE}</p>
          </div>
        </div>
        <div style={styles.nav}>
          <button style={{ ...styles.navButton, ...(page === "dashboard" ? styles.navButtonActive : {}) }} onClick={() => setPage("dashboard")}>{t.dashboard}</button>
          <button style={{ ...styles.navButton, ...(page === "reports" ? styles.navButtonActive : {}) }} onClick={() => setPage("reports")}>{t.reports}</button>
          <button style={{ ...styles.navButton, ...(page === "settings" ? styles.navButtonActive : {}) }} onClick={() => setPage("settings")}>{t.settings}</button>
          <button style={{ ...styles.navButton, ...(page === "howto" ? styles.navButtonActive : {}) }} onClick={() => setPage("howto")}>{t.howTo}</button>
          
          {/* ÍCONO DE NUBE */}
          <button
            style={{
              ...styles.cloudButton,
              ...(isCloudMode ? styles.cloudButtonActive : {}),
            }}
            onClick={isCloudMode ? disconnectCloud : selectCloudFile}
            title={isCloudMode ? `☁️ Conectado: ${cloudFilePath}\nClick para desconectar` : "☁️ Conectar archivo de nube (auto-guardado)"}
          >
            <span style={isCloudMode ? styles.cloudConnected : styles.cloudDisconnected}>
              {isCloudMode ? "☁️✅" : "☁️"}
            </span>
          </button>
          
          <select style={styles.smallSelect} value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
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
                  <button onClick={() => initiateCreateNewMonth("all")} style={styles.button}>{t.createAll}</button>
                  <button onClick={() => initiateCreateNewMonth("recurrent")} style={styles.button}>{t.createRecurring}</button>
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
                  <div>
                    <label>{t.incomeFrequency}</label>
                    <select style={styles.input} value={incomeFrequency} onChange={(e) => updateIncomeFrequency(e.target.value)}>
                      <option value="monthly">{t.monthly}</option>
                      <option value="biweekly">{t.biweekly}</option>
                      <option value="weekly">{t.weekly}</option>
                    </select>
                  </div>
                  <div>
                    <label>{t.incomeDate}</label>
                    <input style={styles.input} type="date" value={incomeDate} onChange={(e) => updateIncomeDate(e.target.value)} />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span>{t.totalPlanned}</span>
                  <strong>${totalPlanned.toFixed(2)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span>{t.totalReal}</span>
                  <strong>${totalReal.toFixed(2)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span>{t.randomIncome}</span>
                  <strong>+${randomIncomeTotal.toFixed(2)}</strong>
                </div>
                <div style={{ ...styles.availableBox, backgroundColor: getAvailableColor(available).backgroundColor, border: `1px solid ${getAvailableColor(available).color}40` }}>
                  <span>{t.available}</span>
                  <strong style={{ color: getAvailableColor(available).color, fontSize: "20px" }}>${available.toFixed(2)}</strong>
                </div>
              </div>

              {/* Widget Próximos Pagos */}
              <div style={styles.card}>
                <h2>{t.todayAndUpcoming}</h2>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px", marginBottom: "15px" }}>
                  <span>{t.currentDate}</span>
                  <strong style={{ display: "block", marginTop: "5px" }}>{getTodayLabel()}</strong>
                </div>
                <h3>{t.upcomingPayments}</h3>
                {upcomingPayments.length === 0 ? (
                  <p>{t.noUpcomingPayments}</p>
                ) : (
                  upcomingPayments.map((movement, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <div>
                        <strong>{movement.type === "income" || movement.type === "salary" ? "+ " : "- "}{movement.name}</strong>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#b8b8b8" }}>
                          {formatDisplayDate(movement.date.toISOString().slice(0, 10))} · {movement.daysLeft === 0 ? t.today : `${t.inDays} ${movement.daysLeft} ${t.days}`}
                        </p>
                      </div>
                      <strong>{movement.type === "income" || movement.type === "salary" ? "+" : "-"}${Number(movement.amount || 0).toFixed(2)}</strong>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* FORMULARIO PARA AGREGAR MOVIMIENTO */}
            <div style={styles.card}>
              <h2>{t.addExpense}</h2>
              <form onSubmit={addExpense} style={styles.formGrid}>
                <div>
                  <label>{t.name}</label>
                  <input style={styles.input} value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} />
                </div>
                <div>
                  <label>{t.totalPlanned}</label>
                  <input style={styles.input} type="number" value={newExpense.plannedAmount} onChange={(e) => setNewExpense({ ...newExpense, plannedAmount: e.target.value })} />
                </div>
                <div>
                  <label>{t.category}</label>
                  <select style={styles.input} value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label>{t.expenseType}</label>
                  <select style={styles.input} value={newExpense.expenseType} disabled={newExpense.category === INCOME_CATEGORY} onChange={(e) => setNewExpense({ ...newExpense, expenseType: e.target.value })}>
                    <option value="recurrent">{t.recurrent}</option>
                    <option value="sporadic">{t.sporadic}</option>
                  </select>
                </div>
                <div>
                  <label>{t.frequency}</label>
                  <select style={styles.input} value={newExpense.frequency} onChange={(e) => setNewExpense({ ...newExpense, frequency: e.target.value })}>
                    <option value="monthly">{t.monthly}</option>
                    <option value="weekly">{t.weekly}</option>
                    <option value="biweekly">{t.biweekly}</option>
                    <option value="once">{t.once}</option>
                  </select>
                </div>
                <div>
                  <label>{t.paymentDate}</label>
                  <input style={styles.input} type="date" value={newExpense.paymentDay} onChange={(e) => setNewExpense({ ...newExpense, paymentDay: e.target.value })} />
                </div>
                <div>
                  <label>{t.account}</label>
                  <select style={styles.input} value={newExpense.account} onChange={(e) => setNewExpense({ ...newExpense, account: e.target.value })}>
                    {accounts.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "end" }}>
                  <button type="submit" style={styles.button}>{t.addExpense}</button>
                </div>
              </form>
            </div>

            {/* Tabla de Gastos */}
            <div style={styles.card}>
              <div style={styles.sortBar}>
                <button onClick={resetSort} style={styles.buttonSecondary}>🔄 {t.resetSort}</button>
                <span style={{ fontSize: "11px", color: "#b8b8b8" }}>
                  {sortConfig.key === "paymentDate" && sortConfig.direction === "asc" 
                    ? `📅 ${t.sortByDateDefault}` 
                    : sortConfig.key 
                      ? `📊 Orden: ${sortConfig.key} (${sortConfig.direction === "asc" ? "↑" : "↓"})` 
                      : ""}
                </span>
              </div>
              <h2>{t.expensesMonth}</h2>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ ...styles.th, ...(sortConfig.key === "name" ? styles.thActive : {}) }} onClick={() => requestSort("name")} title={getSortTitle(t.name)}>{t.name} {getSortIcon("name")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "category" ? styles.thActive : {}) }} onClick={() => requestSort("category")} title={getSortTitle(t.category)}>{t.category} {getSortIcon("category")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "type" ? styles.thActive : {}) }} onClick={() => requestSort("type")} title={getSortTitle(t.type)}>{t.type} {getSortIcon("type")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "frequency" ? styles.thActive : {}) }} onClick={() => requestSort("frequency")} title={getSortTitle(t.frequency)}>{t.frequency} {getSortIcon("frequency")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "paymentDate" ? styles.thActive : {}) }} onClick={() => requestSort("paymentDate")} title={getSortTitle(t.paymentDate)}>{t.paymentDate} {getSortIcon("paymentDate")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "account" ? styles.thActive : {}) }} onClick={() => requestSort("account")} title={getSortTitle(t.account)}>{t.account} {getSortIcon("account")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "plannedAmount" ? styles.thActive : {}) }} onClick={() => requestSort("plannedAmount")} title={getSortTitle(t.planned)}>{t.planned} {getSortIcon("plannedAmount")}</th>
                      <th style={{ ...styles.th, ...(sortConfig.key === "realAmount" ? styles.thActive : {}) }} onClick={() => requestSort("realAmount")} title={getSortTitle(t.real)}>{t.real} {getSortIcon("realAmount")}</th>
                      <th style={styles.th}>{t.payments}</th>
                      <th style={styles.th}>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedExpenses.map((expense) => {
                      const idx = expense.originalIndex;
                      const isEditing = editingRowIndex === idx;
                      const active = isEditing ? editingExpense : expense;
                      const realVal = getEffectiveReal(active);
                      const isIncoming = isIncomingItem(active);
                      return (
                        <tr key={`${idx}-${expense.paymentDay}`} style={getRowStyle(active)}>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} value={editingExpense.name} onChange={e => setEditingExpense({ ...editingExpense, name: e.target.value })} /> : expense.name}</td>
                          <td style={styles.td}>{isEditing ? <select style={styles.tableInput} value={editingExpense.category} onChange={e => setEditingExpense({ ...editingExpense, category: e.target.value })}>{categories.map(c => <option key={c}>{c}</option>)}</select> : expense.category}</td>
                          <td style={styles.td}>{isIncoming ? "" : isEditing ? <select style={styles.tableInput} value={editingExpense.expenseType} onChange={e => setEditingExpense({ ...editingExpense, expenseType: e.target.value })}><option value="recurrent">{t.recurrent}</option><option value="sporadic">{t.sporadic}</option></select> : getExpenseTypeLabel(expense.expenseType)}</td>
                          <td style={styles.td}>{isIncoming ? "" : isEditing ? <select style={styles.tableInput} value={editingExpense.frequency} onChange={e => setEditingExpense({ ...editingExpense, frequency: e.target.value })}><option value="monthly">{t.monthly}</option><option value="weekly">{t.weekly}</option><option value="biweekly">{t.biweekly}</option><option value="once">{t.once}</option></select> : getFrequencyLabel(expense.frequency)}</td>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} type="date" value={editingExpense.paymentDay} onChange={e => setEditingExpense({ ...editingExpense, paymentDay: e.target.value })} /> : (expense.paymentDay || "-")}</td>
                          <td style={styles.td}>{isEditing ? <select style={styles.tableInput} value={editingExpense.account} onChange={e => setEditingExpense({ ...editingExpense, account: e.target.value })}>{accounts.map(a => <option key={a}>{a}</option>)}</select> : expense.account}</td>
                          <td style={styles.td}>{isEditing ? <input style={styles.tableInput} type="number" value={editingExpense.plannedAmount} onChange={e => setEditingExpense({ ...editingExpense, plannedAmount: e.target.value })} /> : `${isIncoming ? "+" : ""}$${Number(expense.plannedAmount).toFixed(2)}`}</td>
                          <td style={{ ...styles.td, ...getRealCellStyle(active) }}>{isIncoming ? `+$${Number(expense.plannedAmount).toFixed(2)}` : realVal === null ? t.pending : `$${Number(realVal).toFixed(2)}`}</td>
                          <td style={styles.td}>{isIncoming ? "—" : <button onClick={() => openPayments(idx)}>{t.managePayments}</button>}</td>
                          <td style={styles.td}>
                            {isEditing ? (
                              <>
                                <button onClick={() => saveEditRow(idx)}>{t.save}</button>
                                <button onClick={cancelEditRow} style={{ marginLeft: "5px" }}>{t.cancel}</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => startEditRow(idx)}>{t.edit}</button>
                                <button onClick={() => deleteExpense(idx)} style={{ marginLeft: "5px" }}>{t.delete}</button>
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
              <p style={{ color: "#b8b8b8", marginTop: "16px" }}>
                {language === "es" ? "Los reportes muestran únicamente gastos." : language === "en" ? "Reports show expenses only." : "Les rapports affichent seulement les dépenses."}
              </p>
            </div>
            <div style={styles.reportGrid}>
              <div style={styles.card}>
                <h2>{t.byCategory}</h2>
                {renderReportTable(categoryReportData, t.category)}
              </div>
              <div style={styles.card}>
                <h2>{t.byAccount}</h2>
                {renderReportTable(accountReportData, t.account)}
              </div>
            </div>
          </>
        )}

        {page === "howto" && (
          <div style={styles.card}>
            <h2>{t.howTo} — {APP_NAME}</h2>
            <div style={styles.howToSection}>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>📌 1. Concepto General</div>
                <p><strong>My Economy</strong> te ayuda a planificar tus gastos mensuales y compararlos con lo que realmente pagas, permitiendo pagos parciales.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>💰 2. Ingreso Mensual</div>
                <p>Define tu salario y frecuencia (Mensual, Bisemanal, Semanal). La app calcula automáticamente las fechas de pago.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>✨ 3. Ingresos Aleatorios</div>
                <p>Usa la categoría <strong>"Ingresos"</strong> para dinero extra. Aparece en verde y aumenta el disponible.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>💸 4. Pagos Reales</div>
                <p>Usa el botón <strong>"Admin"</strong> para registrar uno o múltiples pagos para un mismo gasto.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>🎨 5. Colores</div>
                <ul style={styles.howToList}>
                  <li>🟢 <span style={{ color: "#4caf50" }}>Disponible verde</span> = Saldo positivo</li>
                  <li>🔴 <span style={{ color: "#f44336" }}>Disponible rojo</span> = Números rojos</li>
                  <li>🟢 Celda Real verde = Pagaste menos (ahorraste)</li>
                  <li>🔴 Celda Real roja = Pagaste más (sobrecosto)</li>
                </ul>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>🔄 6. Transferir Disponible</div>
                <p>Al crear un nuevo mes con disponible positivo, puedes transferirlo como ingreso extra o agregarlo al disponible del nuevo mes.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>📊 7. Ordenar Columnas</div>
                <p>Haz clic en cualquier encabezado de columna para ordenar la tabla. Cada columna tiene dos estados: ascendente → descendente → vuelve a fecha ascendente (default). Los elementos sin fecha siempre aparecen al final. Tu preferencia de orden se guarda automáticamente.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>☁️ 8. Modo Nube (Beta)</div>
                <p>Haz clic en el ícono de nube ☁️ en la esquina superior derecha para conectar un archivo JSON. Una vez conectado, todos los cambios se guardan automáticamente en ese archivo. El ícono se pondrá verde ☁️✅ cuando esté activo. Haz clic nuevamente para desconectar.</p>
              </div>
              <div style={styles.howToCard}>
                <div style={styles.howToTitle}>❌ 9. Cerrar Popups</div>
                <p>Clic en "Cerrar", clic fuera del popup, o tecla ESC.</p>
              </div>
              <div style={styles.howToNote}>
                <strong>💡 Consejo:</strong> Disponible verde = buen presupuesto. Disponible rojo = estás gastando más de lo que ingresas.
              </div>
            </div>
          </div>
        )}

        {page === "settings" && (
          <>
            <div style={styles.card}>
              <h2>{t.categoriesConfig}</h2>
              <form onSubmit={addCategory} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input style={styles.input} placeholder={t.newCategory} value={newCategory} onChange={e => setNewCategory(e.target.value)} />
                <button style={styles.button} type="submit">{t.addCategory}</button>
              </form>
              {categories.map(c => (
                <div key={c} style={styles.listItem}>
                  <span>{c}</span>
                  <button onClick={() => deleteCategory(c)} disabled={c === INCOME_CATEGORY}>{t.delete}</button>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h2>{t.accountsConfig}</h2>
              <form onSubmit={addAccount} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input style={styles.input} placeholder={t.newAccount} value={newAccount} onChange={e => setNewAccount(e.target.value)} />
                <button style={styles.button} type="submit">{t.addAccount}</button>
              </form>
              {accounts.map(a => (
                <div key={a} style={styles.listItem}>
                  <span>{a}</span>
                  <button onClick={() => deleteAccount(a)}>{t.delete}</button>
                </div>
              ))}
            </div>
            <div style={styles.card}>
              <h2>{t.createdMonths}</h2>
              {Object.keys(monthlyData).length === 0 ? (
                <p>{t.noMonths}</p>
              ) : (
                Object.keys(monthlyData).sort().map(m => (
                  <div key={m} style={styles.listItem}>
                    <span>{m}</span>
                    <button onClick={() => deleteMonth(m)}>{t.delete}</button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <footer style={styles.footer}>
          <div style={styles.footerBrand}>
            <img src="/Altura.png" alt="Altura IT Solutions" style={styles.footerLogo} />
            <div>
              <strong>{APP_NAME}</strong> <span>{APP_VERSION}</span>
              <p>{APP_SUBTITLE}</p>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            Developed by <span style={styles.redText}>{APP_DEVELOPER}</span><br />© 2026 Diego Isaza
          </div>
          <div>{APP_NAME} is a personal finance management application designed to help you plan, track and control your finances.</div>
        </footer>
      </main>

      {/* Modal de Transferencia de Disponible */}
      {showTransferDialog && (
        <div style={styles.modalOverlay} onClick={() => setShowTransferDialog(false)}>
          <div style={styles.modal} ref={modalRef} onClick={e => e.stopPropagation()}>
            <h2>💰 {t.transferAvailable}</h2>
            <p style={{ marginBottom: "20px" }}>
              {t.previousAvailable}: <strong style={{ color: "#4caf50", fontSize: "20px" }}>
                ${(() => {
                  const [year, month] = selectedMonth.split("-").map(Number);
                  const prevDate = new Date(year, month - 2, 1);
                  const prevMonth = prevDate.toISOString().slice(0, 7);
                  if (monthlyData[prevMonth]) {
                    const prevExpenses = (monthlyData[prevMonth].expenses || []).filter(e => !isIncomeItem(e));
                    const prevPlanned = prevExpenses.reduce((s, e) => s + Number(e.plannedAmount || 0), 0);
                    const prevRandom = (monthlyData[prevMonth].expenses || []).filter(isIncomeItem).reduce((s, e) => s + Number(e.plannedAmount || 0), 0);
                    const prevIncome = Number(monthlyData[prevMonth].income || 0);
                    return (prevIncome + prevRandom - prevPlanned).toFixed(2);
                  }
                  return "0.00";
                })()}
              </strong>
            </p>
            <p style={{ marginBottom: "24px", color: "#b8b8b8" }}>¿Cómo quieres manejar este sobrante en el nuevo mes?</p>
            <div style={styles.transferOption} onClick={() => handleTransferOption("none")}>
              <strong>📄 {t.transferOptionNone}</strong>
              <p style={{ fontSize: "12px", color: "#b8b8b8", marginTop: "4px" }}>Comenzar el nuevo mes sin el sobrante del mes anterior.</p>
            </div>
            <div style={styles.transferOption} onClick={() => handleTransferOption("income")}>
              <strong>✨ {t.transferOptionIncome}</strong>
              <p style={{ fontSize: "12px", color: "#b8b8b8", marginTop: "4px" }}>El sobrante aparecerá como un ingreso extra en la categoría "{INCOME_CATEGORY}".</p>
            </div>
            <div style={styles.transferOption} onClick={() => handleTransferOption("available")}>
              <strong>📊 {t.transferOptionAvailable}</strong>
              <p style={{ fontSize: "12px", color: "#b8b8b8", marginTop: "4px" }}>El sobrante se sumará al ingreso mensual, aumentando el disponible del nuevo mes.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
              <button style={styles.button} onClick={() => setShowTransferDialog(false)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Pagos */}
      {selectedPaymentExpense && (
        <div style={styles.modalOverlay} onClick={handleOverlayClick}>
          <div style={styles.modal} ref={modalRef}>
            <h2>{t.managePaymentsFull}: {selectedPaymentExpense.name}</h2>
            <p>
              {t.planned}: ${selectedPaymentExpense.plannedAmount.toFixed(2)} | {t.real}: ${selectedPaymentReal.toFixed(2)} | 
              {t.difference}: {selectedPaymentDifference >= 0 ? "+" : "-"}${Math.abs(selectedPaymentDifference).toFixed(2)} {selectedPaymentDifference >= 0 ? t.savings : t.overCost}
            </p>
            <form onSubmit={addPayment} style={styles.formGrid}>
              <div>
                <label>{t.paymentDate}</label>
                <input style={styles.input} type="date" value={newPayment.date} onChange={e => setNewPayment({ ...newPayment, date: e.target.value })} />
              </div>
              <div>
                <label>{t.paymentAmount}</label>
                <input style={styles.input} type="number" value={newPayment.amount} onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })} />
              </div>
              <div>
                <label>{t.paymentNote}</label>
                <input style={styles.input} value={newPayment.note} onChange={e => setNewPayment({ ...newPayment, note: e.target.value })} />
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "end" }}>
                <button type="submit" style={styles.button}>{t.addPayment}</button>
                <button type="button" style={styles.button} onClick={closePaymentModal}>{t.close}</button>
              </div>
            </form>
            <h3>{t.paymentHistory}</h3>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
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
                      <td style={styles.td} colSpan="4">{t.noPayments}</td>
                    </tr>
                  ) : (
                    selectedPaymentExpense.payments.map((p, idx) => (
                      <tr key={idx}>
                        <td style={styles.td}>{p.date}</td>
                        <td style={styles.td}>${Number(p.amount).toFixed(2)}</td>
                        <td style={styles.td}>{p.note}</td>
                        <td style={styles.td}>
                          <button onClick={() => deletePayment(paymentExpenseIndex, idx)}>{t.delete}</button>
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