import { LucideIcon, Calendar, Users, ShoppingBag, CreditCard, QrCode, Grid, Stethoscope, FileText, ClipboardList, Utensils, BookOpen, Briefcase, UserCheck } from 'lucide-react-native';

export type ModuleId = string;

export interface ModuleDefinition {
    id: ModuleId;
    label: string;
    description: string;
    icon: LucideIcon;
    defaultEnabled: boolean;
}

export const SALON_MODULES: ModuleDefinition[] = [
    { id: 'appointments', label: 'Appointments', description: 'Manage bookings & calendar.', icon: Calendar, defaultEnabled: true },
    { id: 'customers', label: 'Customers / CRM', description: 'Client profiles & history.', icon: Users, defaultEnabled: true },
    { id: 'staff', label: 'Staff Management', description: 'Manage employees & performance.', icon: Users, defaultEnabled: true },
    { id: 'services', label: 'Services', description: 'Service menu & pricing.', icon: Grid, defaultEnabled: true },
    { id: 'billing', label: 'Billing & POS', description: 'Invoicing & payments.', icon: CreditCard, defaultEnabled: true },
    { id: 'qr_loyalty', label: 'QR & Loyalty', description: 'Quick scan & rewards.', icon: QrCode, defaultEnabled: false },
];

export const CLINIC_MODULES: ModuleDefinition[] = [
    { id: 'appointments', label: 'Appointments', description: 'Patient bookings & calendar.', icon: Calendar, defaultEnabled: true },
    { id: 'patients', label: 'Patients / EMR', description: 'Medical records & history.', icon: Stethoscope, defaultEnabled: true },
    { id: 'prescriptions', label: 'Prescriptions', description: 'Digital Rx & dosages.', icon: FileText, defaultEnabled: true },
    { id: 'billing', label: 'Billing & Invoices', description: 'Consultation fees & payments.', icon: CreditCard, defaultEnabled: true },
    { id: 'staff', label: 'Doctors & Staff', description: 'Manage medical team.', icon: Users, defaultEnabled: true },
];

export const RETAIL_MODULES: ModuleDefinition[] = [
    { id: 'inventory', label: 'Inventory', description: 'Stock, products & suppliers.', icon: ShoppingBag, defaultEnabled: true },
    { id: 'billing', label: 'Billing / POS', description: 'Fast checkout & receipts.', icon: CreditCard, defaultEnabled: true },
    { id: 'customers', label: 'Customers / Khata', description: 'Ledger & customer details.', icon: Users, defaultEnabled: true },
    { id: 'orders', label: 'Orders', description: 'Purchase orders & delivery.', icon: ClipboardList, defaultEnabled: true },
    { id: 'staff', label: 'Staff', description: 'Employee management.', icon: Users, defaultEnabled: false },
];

export const RESTAURANT_MODULES: ModuleDefinition[] = [
    { id: 'tables', label: 'Table Management', description: 'Floor plan & reservations.', icon: Grid, defaultEnabled: true },
    { id: 'orders', label: 'KOT & Orders', description: 'Kitchen Order Tickets.', icon: Utensils, defaultEnabled: true },
    { id: 'menu', label: 'Menu Digital', description: 'Manage dishes & pricing.', icon: BookOpen, defaultEnabled: true },
    { id: 'billing', label: 'Billing', description: 'Split bills & payments.', icon: CreditCard, defaultEnabled: true },
    { id: 'staff', label: 'Waiters & Chefs', description: 'Team management.', icon: Users, defaultEnabled: true },
];

export const COACHING_MODULES: ModuleDefinition[] = [
    { id: 'classes', label: 'Classes / Schedule', description: 'Timetable & batches.', icon: Calendar, defaultEnabled: true },
    { id: 'students', label: 'Students', description: 'Enruollments & attendance.', icon: Users, defaultEnabled: true },
    { id: 'fees', label: 'Fee Management', description: 'Collections & dues.', icon: CreditCard, defaultEnabled: true },
    { id: 'materials', label: 'Study Material', description: 'Notes & assignments.', icon: BookOpen, defaultEnabled: true },
];

export const HR_MODULES: ModuleDefinition[] = [
    { id: 'employees', label: 'Employees', description: 'Directory & profiles.', icon: Briefcase, defaultEnabled: true },
    { id: 'attendance', label: 'Attendance', description: 'Check-in/out logs.', icon: UserCheck, defaultEnabled: true },
    { id: 'payroll', label: 'Payroll', description: 'Salaries & payslips.', icon: CreditCard, defaultEnabled: true },
    { id: 'hiring', label: 'Hiring / ATS', description: 'Recruitment pipeline.', icon: Users, defaultEnabled: false },
];

export const GYM_MODULES: ModuleDefinition[] = [
    { id: 'members', label: 'Members', description: 'gym memberships.', icon: Users, defaultEnabled: true },
    { id: 'attendance', label: 'Attendance', description: 'Check-in tracking.', icon: UserCheck, defaultEnabled: true },
    { id: 'plans', label: 'Plans & Diet', description: 'Workout & diet plans.', icon: FileText, defaultEnabled: true },
    { id: 'billing', label: 'Billing', description: 'Subscriptions & fees.', icon: CreditCard, defaultEnabled: true },
    { id: 'trainers', label: 'Trainers', description: 'Staff management.', icon: Users, defaultEnabled: true },
];

export const getModulesForVertical = (vertical: string | null): ModuleDefinition[] => {
    switch (vertical) {
        case 'salon': return SALON_MODULES;
        case 'clinic': return CLINIC_MODULES;
        case 'retail': return RETAIL_MODULES;
        case 'restaurant': return RESTAURANT_MODULES;
        case 'coaching': return COACHING_MODULES;
        case 'hr': return HR_MODULES;
        case 'gym': return GYM_MODULES;
        default: return [];
    }
};
