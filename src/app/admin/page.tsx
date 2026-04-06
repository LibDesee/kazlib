"use client";

import { useState, useEffect } from "react";
import { PageLayout } from "@/components/shared/page-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassTabs } from "@/components/ui/glass-tabs";
import { useAuth } from "@/components/providers/auth-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { getUsers, createUser, updateUser, deleteUser, createMenuItem, updateMenuItem, deleteMenuItem, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent, updateScheduleSlot } from "@/app/actions/admin";
import { getMenu, getCalendarEvents, getScheduleByClass } from "@/app/actions/school";
import { TrendingUp, Plus, Trash2, Edit2, X, Save } from "lucide-react";
import { useRouter } from "next/navigation";

function Modal({ isOpen, onClose, title, children }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <GlassCard className="w-full max-w-lg p-6 space-y-4 border-white/20 shadow-2xl">
                <div className="flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="hover:text-red-400 transition-colors"><X size={20}/></button>
                </div>
                {children}
            </GlassCard>
        </div>
    );
}

export default function AdminPage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    
    const [activeTab, setActiveTab] = useState("users");
    const [loading, setLoading] = useState(true);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [menuItems, setMenuItems] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    
    // For Schedule Tab
    const [selectedClass, setSelectedClass] = useState("11A");
    const [scheduleSlots, setScheduleSlots] = useState<any[]>([]);

    // Modal states
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, type: string, mode: 'add'|'edit', data: any }>({
        isOpen: false, type: '', mode: 'add', data: null
    });

    const openModal = (type: string, mode: 'add'|'edit', data: any = null) => {
        setModalConfig({ isOpen: true, type, mode, data: data || {} });
    };

    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    useEffect(() => {
        if (!user) return;
        if (user.role !== "ADMIN") {
            router.push("/");
            return;
        }

        loadData();
    }, [user, activeTab, selectedClass]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === "users") setUsersList(await getUsers());
            if (activeTab === "canteen") setMenuItems(await getMenu());
            if (activeTab === "calendar") setEvents(await getCalendarEvents());
            if (activeTab === "schedule") setScheduleSlots(await getScheduleByClass(selectedClass));
        } catch(err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleDeleteUser = async (id: number) => {
        if(confirm("Are you sure?")) {
            await deleteUser(id);
            loadData();
        }
    };

    const handleDeleteMenu = async (id: number) => {
        if(confirm("Are you sure?")) {
            await deleteMenuItem(id);
            loadData();
        }
    };

    const handleDeleteEvent = async (id: number) => {
        if(confirm("Are you sure?")) {
            await deleteCalendarEvent(id);
            loadData();
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const { type, mode, data } = modalConfig;
        
        try {
            if (type === 'user') {
                const payload = { ...data, password: data.password || '123456', role: data.role || 'STUDENT' };
                if (payload.id) delete payload.id;
                
                if (mode === 'add') await createUser(payload);
                else await updateUser(data.id, payload);
            } 
            else if (type === 'menu') {
                const payload = { ...data, price: Number(data.price) };
                if (payload.id) delete payload.id;
                
                if (mode === 'add') await createMenuItem(payload);
                else await updateMenuItem(data.id, payload);
            }
            else if (type === 'event') {
                const payload = { ...data, date: new Date(data.date) };
                if (payload.id) delete payload.id;
                
                if (mode === 'add') await createCalendarEvent(payload);
                else await updateCalendarEvent(data.id, payload);
            }
            else if (type === 'schedule') {
                await updateScheduleSlot(data.id, { subject: data.subject, room: data.room });
            }
            closeModal();
            loadData();
        } catch (err) {
            console.error("Save failed", err);
            alert("Error saving data");
        }
    };

    if (loading || !user || user.role !== "ADMIN") {
        return <PageLayout><div className="flex h-64 items-center justify-center"><TrendingUp className="animate-spin text-accent-primary" size={32} /></div></PageLayout>;
    }

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex flex-col items-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>

                    <GlassTabs
                        tabs={[
                            { id: "users", label: "Users" },
                            { id: "schedule", label: "Schedule" },
                            { id: "canteen", label: "Cafeteria" },
                            { id: "calendar", label: "Calendar" },
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        className="w-full max-w-2xl"
                    />
                </header>

                <div>
                    {activeTab === "users" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Manage Users</h2>
                                <button onClick={() => openModal('user', 'add')} className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-lg transition-colors">
                                    <Plus size={18} /> Add User
                                </button>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 text-white font-bold">
                                <div className="w-1/4">Name</div>
                                <div className="w-1/4">Role</div>
                                <div className="w-1/4">Class/School</div>
                                <div>Actions</div>
                            </div>
                            {usersList.map((u) => (
                                <GlassCard key={u.id} className="flex justify-between items-center p-4">
                                    <div className="w-1/4 truncate text-white">{u.name}</div>
                                    <div className="w-1/4 text-white/70">{u.role}</div>
                                    <div className="w-1/4 truncate text-white/50">{u.grade || u.school}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('user', 'edit', u)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400"><Trash2 size={16} /></button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    )}

                    {activeTab === "schedule" && (
                        <div className="space-y-6">
                            <div className="flex gap-4 items-center">
                                <label className="text-white">Select Class:</label>
                                <select 
                                    className="bg-black/50 border border-white/20 text-white p-2 rounded-lg"
                                    value={selectedClass} 
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                >
                                    <option value="11A">11A</option>
                                    <option value="11B">11B</option>
                                    <option value="10A">10A</option>
                                </select>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[1,2,3,4,5].map(day => (
                                    <div key={day} className="space-y-3">
                                        <h3 className="text-center font-bold text-accent-primary">Day {day}</h3>
                                        {scheduleSlots.filter(s => s.dayOfWeek === day).map(slot => (
                                            <GlassCard key={slot.id} className="p-3 text-sm relative group">
                                                <div className="font-bold text-white">Slot {slot.slotOrder}:</div>
                                                <div className="text-white/80">{slot.subject}</div>
                                                <div className="text-white/50">{slot.room}</div>
                                                <button 
                                                    onClick={() => openModal('schedule', 'edit', slot)}
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                            </GlassCard>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "canteen" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Manage Menu</h2>
                                <button onClick={() => openModal('menu', 'add')} className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-lg transition-colors">
                                    <Plus size={18} /> Add Item
                                </button>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 text-white font-bold">
                                <div className="w-1/3">Item</div>
                                <div className="w-1/4">Category</div>
                                <div className="w-1/4">Price (₸)</div>
                                <div>Actions</div>
                            </div>
                            {menuItems.map((m) => (
                                <GlassCard key={m.id} className="flex justify-between items-center p-4">
                                    <div className="w-1/3 text-white">{m.name}</div>
                                    <div className="w-1/4 text-white/70">{m.category}</div>
                                    <div className="w-1/4 text-accent-primary font-bold">{m.price}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('menu', 'edit', m)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteMenu(m.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400"><Trash2 size={16} /></button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    )}

                    {activeTab === "calendar" && (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Manage Calendar</h2>
                                <button onClick={() => openModal('event', 'add')} className="flex items-center gap-2 px-4 py-2 bg-accent-primary hover:bg-accent-primary/80 text-white rounded-lg transition-colors">
                                    <Plus size={18} /> Add Event
                                </button>
                            </div>
                             <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 text-white font-bold">
                                <div className="w-1/4">Date</div>
                                <div className="w-1/3">Event</div>
                                <div className="flex-1">Description</div>
                                <div>Actions</div>
                            </div>
                            {events.map((e) => (
                                <GlassCard key={e.id} className="flex justify-between items-center p-4">
                                    <div className="w-1/4 text-white/70">{new Date(e.date).toLocaleDateString()}</div>
                                    <div className="w-1/3 text-white font-bold">{e.title}</div>
                                    <div className="flex-1 text-white/50 truncate pr-4">{e.description}</div>
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal('event', 'edit', e)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteEvent(e.id)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400"><Trash2 size={16} /></button>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    )}
                </div>

                <Modal 
                    isOpen={modalConfig.isOpen} 
                    onClose={closeModal} 
                    title={`${modalConfig.mode === 'add' ? 'Add' : 'Edit'} ${modalConfig.type === 'user' ? 'User' : modalConfig.type === 'menu' ? 'Menu Item' : modalConfig.type === 'event' ? 'Calendar Event' : 'Schedule Slot'}`}
                >
                    <form onSubmit={handleSave} className="space-y-4">
                        {modalConfig.type === 'user' && (
                            <>
                                <input required placeholder="Username" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.name || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, name: e.target.value}})} />
                                <select className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.role || 'STUDENT'} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, role: e.target.value}})}>
                                    <option value="STUDENT">Student</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                                {modalConfig.mode === 'add' && <input placeholder="Password (default: 123456)" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, password: e.target.value}})} />}
                                <input placeholder="Class (e.g. 11A) / Subject for Teachers" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.grade || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, grade: e.target.value}})} />
                            </>
                        )}
                        
                        {modalConfig.type === 'menu' && (
                            <>
                                <input required placeholder="Item Name" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.name || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, name: e.target.value}})} />
                                <select className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.category || 'Hot'} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, category: e.target.value}})}>
                                    <option value="Hot">Hot</option>
                                    <option value="Drinks">Drinks</option>
                                    <option value="Snacks">Snacks</option>
                                </select>
                                <input required type="number" placeholder="Price (₸)" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.price || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, price: e.target.value}})} />
                                <input placeholder="Description" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.description || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, description: e.target.value}})} />
                            </>
                        )}

                        {modalConfig.type === 'event' && (
                            <>
                                <input required placeholder="Event Title" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.title || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, title: e.target.value}})} />
                                <input required type="datetime-local" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" 
                                    value={modalConfig.data?.date ? new Date(modalConfig.data.date).toISOString().slice(0, 16) : ''} 
                                    onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, date: e.target.value}})} 
                                />
                                <input placeholder="Description" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.description || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, description: e.target.value}})} />
                            </>
                        )}

                        {modalConfig.type === 'schedule' && (
                            <>
                                <div className="text-white mb-2 font-bold">Slot {modalConfig.data?.slotOrder} • Day {modalConfig.data?.dayOfWeek}</div>
                                <input required placeholder="Subject (e.g. Math, Physics)" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.subject || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, subject: e.target.value}})} />
                                <input placeholder="Room (e.g. 101, Gym)" className="w-full bg-black/50 border border-white/20 text-white p-3 rounded-lg" value={modalConfig.data?.room || ''} onChange={e => setModalConfig({...modalConfig, data: {...modalConfig.data, room: e.target.value}})} />
                            </>
                        )}

                        <div className="flex gap-4 pt-4">
                            <button type="button" onClick={closeModal} className="w-1/2 p-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors">Cancel</button>
                            <button type="submit" className="w-1/2 p-3 text-white bg-accent-primary hover:bg-accent-primary/80 rounded-lg flex justify-center items-center gap-2 transition-colors"><Save size={18}/> Save</button>
                        </div>
                    </form>
                </Modal>
            </div>
        </PageLayout>
    );
}
