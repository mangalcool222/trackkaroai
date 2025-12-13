import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Client {
    id: string;
    name: string;
    phone: string;
    lastService: string;
    lastVisit: string;
    status: 'New' | 'Recurring' | 'VIP';
    notes?: string;
}

export interface Staff {
    id: string;
    name: string;
    role: string;
    status: 'Available' | 'Busy' | 'Off Duty';
    phone?: string;
}

export interface Service {
    id: string;
    name: string;
    price: string;
    duration: string;
    category?: string;
}

export interface Appointment {
    id: string;
    clientName: string;
    service: string;
    time: string;
    status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
    staffName: string;
    date: string;
    notes?: string;
}

interface SalonContextType {
    clients: Client[];
    staff: Staff[];
    services: Service[];
    appointments: Appointment[];
    addClient: (client: Omit<Client, 'id'>) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    addStaff: (staff: Omit<Staff, 'id'>) => void;
    updateStaff: (id: string, updates: Partial<Staff>) => void;
    addService: (service: Omit<Service, 'id'>) => void;
    updateService: (id: string, updates: Partial<Service>) => void;
    addAppointment: (appt: Omit<Appointment, 'id'>) => void;
    updateAppointment: (id: string, updates: Partial<Appointment>) => void;
    invoices: Invoice[];
    addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
    staffPayments: StaffPayment[];
    addStaffPayment: (payment: Omit<StaffPayment, 'id'>) => void;
}

export interface StaffPayment {
    id: string;
    staffId: string;
    amount: number;
    type: 'Salary' | 'Commission' | 'Bonus' | 'Advance';
    date: string;
    notes?: string;
}

export interface Invoice {
    id: string;
    clientName: string;
    items: { name: string; price: number }[];
    total: number;
    date: string;
    status: 'Paid' | 'Pending';
}

const MOCK_INVOICES: Invoice[] = [
    {
        id: '1',
        clientName: 'Alice Johnson',
        items: [{ name: 'Haircut', price: 500 }, { name: 'Spa', price: 1500 }],
        total: 2000,
        date: '2023-12-10',
        status: 'Paid'
    }
];

const MOCK_CLIENTS: Client[] = [
    { id: '1', name: 'Alice Johnson', phone: '9876543210', lastService: 'Haircut', lastVisit: '10 Dec', status: 'Recurring' },
    { id: '2', name: 'Bob Smith', phone: '8765432109', lastService: 'Beard Trim', lastVisit: '05 Dec', status: 'New' },
    { id: '3', name: 'Clara Delavigne', phone: '7654321098', lastService: 'Full Color', lastVisit: '01 Dec', status: 'Recurring' },
    { id: '4', name: 'David Lee', phone: '6543210987', lastService: 'Manicure', lastVisit: '20 Nov', status: 'VIP' },
    { id: '5', name: 'Emma Wilson', phone: '5432109876', lastService: 'Facial', lastVisit: '15 Nov', status: 'New' },
];

const MOCK_STAFF: Staff[] = [
    { id: '1', name: 'Sarah', role: 'Stylist', status: 'Busy' },
    { id: '2', name: 'Mike', role: 'Barber', status: 'Available' },
    { id: '3', name: 'Jenny', role: 'Manager', status: 'Busy' },
    { id: '4', name: 'David', role: 'Receptionist', status: 'Available' },
    { id: '5', name: 'Lisa', role: 'Colorist', status: 'Off Duty' },
];

const MOCK_SERVICES: Service[] = [
    { id: '1', name: 'Haircut', price: '500', duration: '45 mins' },
    { id: '2', name: 'Beard Trim', price: '200', duration: '20 mins' },
    { id: '3', name: 'Facial', price: '1200', duration: '60 mins' },
    { id: '4', name: 'Manicure', price: '800', duration: '40 mins' },
    { id: '5', name: 'Full Color', price: '3000', duration: '120 mins' },
];

const MOCK_APPOINTMENTS: Appointment[] = [
    { id: '1', clientName: 'Alice Johnson', service: 'Haircut', time: '10:00 AM', status: 'Confirmed', staffName: 'Sarah', date: '2023-12-14' },
    { id: '2', clientName: 'Bob Smith', service: 'Beard Trim', time: '11:00 AM', status: 'Pending', staffName: 'Mike', date: '2023-12-14' },
];

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider = ({ children }: { children: ReactNode }) => {
    const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
    const [staff, setStaff] = useState<Staff[]>(MOCK_STAFF);
    const [services, setServices] = useState<Service[]>(MOCK_SERVICES);
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
    const [staffPayments, setStaffPayments] = useState<StaffPayment[]>([]);

    const addClient = (client: Omit<Client, 'id'>) => {
        const newClient = { ...client, id: Math.random().toString(36).substr(2, 9) };
        setClients(prev => [newClient, ...prev]);
    };

    const updateClient = (id: string, updates: Partial<Client>) => {
        setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const addStaff = (newStaff: Omit<Staff, 'id'>) => {
        const staffMember = { ...newStaff, id: Math.random().toString(36).substr(2, 9) };
        setStaff(prev => [staffMember, ...prev]);
    };

    const updateStaff = (id: string, updates: Partial<Staff>) => {
        setStaff(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const addService = (service: Omit<Service, 'id'>) => {
        const newService = { ...service, id: Math.random().toString(36).substr(2, 9) };
        setServices(prev => [newService, ...prev]);
    };

    const updateService = (id: string, updates: Partial<Service>) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const addAppointment = (appt: Omit<Appointment, 'id'>) => {
        const newAppt = { ...appt, id: Math.random().toString(36).substr(2, 9) };
        setAppointments(prev => [newAppt, ...prev]);
    };

    const updateAppointment = (id: string, updates: Partial<Appointment>) => {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
        const newInvoice = { ...invoice, id: Math.random().toString(36).substr(2, 9) };
        setInvoices(prev => [newInvoice, ...prev]);
    };

    const addStaffPayment = (payment: Omit<StaffPayment, 'id'>) => {
        const newPayment = { ...payment, id: Math.random().toString(36).substr(2, 9) };
        setStaffPayments(prev => [newPayment, ...prev]);
    };

    return (
        <SalonContext.Provider value={{
            clients, staff, services, appointments, invoices, staffPayments,
            addClient, updateClient,
            addStaff, updateStaff,
            addService, updateService,
            addAppointment, updateAppointment,
            addInvoice, addStaffPayment
        }}>
            {children}
        </SalonContext.Provider>
    );
};

export const useSalon = () => {
    const context = useContext(SalonContext);
    if (!context) {
        throw new Error('useSalon must be used within a SalonProvider');
    }
    return context;
};
