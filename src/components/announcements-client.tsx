'use client';

import { useState } from 'react';
import { Bell, Pin, Plus, Trash2, Edit2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import AnnouncementForm from './announcement-form';
import { useApiFetch } from '@/lib/client-fetch';

interface Announcement {
  id: string;
  title: string;
  body: string;
  isPinned: boolean;
  publishedAt: Date;
  expiresAt: Date | null;
}

interface AnnouncementsClientProps {
  initialAnnouncements: Announcement[];
}

export default function AnnouncementsClient({ initialAnnouncements }: AnnouncementsClientProps) {
  const apiFetch  = useApiFetch();
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    setDeleting(id);
    try {
      await apiFetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
      setAnnouncements(announcements.filter((a) => a.id !== id));
    } catch {
      alert('Failed to delete announcement');
    } finally {
      setDeleting(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAnnouncement(null);
  };

  return (
    <>
      {/* Post Button */}
      <button
        onClick={() => {
          setEditingAnnouncement(null);
          setShowForm(true);
        }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
      >
        <Plus size={15} /> Post Announcement
      </button>

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center">
          <Bell size={32} className="mx-auto mb-3 text-slate-200" />
          <p className="font-semibold text-slate-500">No announcements yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Post Kidase schedules, fasting reminders, event notices and more.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow ${
                a.isPinned ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {a.isPinned && <Pin size={14} className="text-amber-500 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900">{a.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {a.isPinned && (
                        <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                          Pinned
                        </span>
                      )}
                      <button
                        onClick={() => handleEdit(a)}
                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Edit announcement"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        disabled={deleting === a.id}
                        className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete announcement"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{a.body}</p>
                  <p className="text-xs text-slate-400 mt-2">{formatDate(a.publishedAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Announcement Form Modal */}
      {showForm && <AnnouncementForm onClose={handleCloseForm} editingAnnouncement={editingAnnouncement || undefined} />}
    </>
  );
}
