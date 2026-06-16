'use client';

import { useState } from 'react';
import { Bell, X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AnnouncementFormProps {
  onClose: () => void;
  editingAnnouncement?: {
    id: string;
    title: string;
    body: string;
    isPinned: boolean;
  };
}

export default function AnnouncementForm({ onClose, editingAnnouncement }: AnnouncementFormProps) {
  const [title, setTitle] = useState(editingAnnouncement?.title || '');
  const [body, setBody] = useState(editingAnnouncement?.body || '');
  const [isPinned, setIsPinned] = useState(editingAnnouncement?.isPinned || false);
  const [sendSMS, setSendSMS] = useState(!editingAnnouncement); // Only show SMS option for new announcements
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [smsStatus, setSmsStatus] = useState<{
    sent: number;
    failed: number;
    total: number;
  } | null>(null);

  const isEditing = !!editingAnnouncement;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setSmsStatus(null);

    try {
      // Validate inputs
      if (!title.trim()) {
        setError('Announcement title is required');
        setLoading(false);
        return;
      }

      if (!body.trim()) {
        setError('Announcement body is required');
        setLoading(false);
        return;
      }

      console.log(`[AnnouncementForm] ${isEditing ? 'Updating' : 'Creating'} announcement:`, { title, body, isPinned, sendSMS });

      // Create or update announcement
      const method = isEditing ? 'PATCH' : 'POST';
      const payload = isEditing
        ? {
            id: editingAnnouncement.id,
            title: title.trim(),
            body: body.trim(),
            isPinned,
          }
        : {
            title: title.trim(),
            body: body.trim(),
            isPinned,
            sendSMS,
          };

      const response = await fetch('/api/announcements', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log(`[AnnouncementForm] Response status:`, response.status);

      const data = await response.json();

      console.log(`[AnnouncementForm] Response data:`, data);

      if (!response.ok) {
        setError(data.error || `Failed to ${isEditing ? 'update' : 'post'} announcement (${response.status})`);
        setLoading(false);
        return;
      }

      // Show SMS status if applicable
      if (data.smsStatus) {
        setSmsStatus(data.smsStatus);
      }

      setSuccess(true);
      setTitle('');
      setBody('');
      setIsPinned(false);

      // Close after 2 seconds
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(`[AnnouncementForm] Error:`, err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl ring-1 ring-slate-200/60 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isEditing ? 'Edit Announcement' : 'Post Announcement'}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                {isEditing ? 'Update the announcement details' : 'Share updates with all members'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              <span>
                Announcement {isEditing ? 'updated' : 'posted'} successfully!{' '}
                {smsStatus && `SMS sent to ${smsStatus.sent} members.`}
              </span>
            </div>
          )}

          {/* SMS Status */}
          {smsStatus && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2.5 text-xs">
              <p className="font-semibold text-blue-900 mb-1">SMS Notification Status:</p>
              <p className="text-blue-700">✓ Sent: {smsStatus.sent}/{smsStatus.total}</p>
              {smsStatus.failed > 0 && <p className="text-orange-700">⚠ Failed: {smsStatus.failed}</p>}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Announcement Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Kidase Schedule Update"
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Announcement Message *
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your announcement here... (e.g., Kidase will be held on Sunday at 10 AM)"
              rows={5}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              disabled={loading}
            />
            <p className="text-xs text-slate-400 mt-1">{body.length} characters</p>
          </div>

          {/* Options */}
          <div className="space-y-3 bg-slate-50 rounded-lg p-4">
            {/* Pin Option */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                disabled={loading}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">
                📌 Pin this announcement (appears at top)
              </span>
            </label>

            {/* SMS Option - Only for new announcements */}
            {!isEditing && (
              <>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendSMS}
                    onChange={(e) => setSendSMS(e.target.checked)}
                    disabled={loading}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    📱 Send SMS notification to all members
                  </span>
                </label>

                {sendSMS && (
                  <div className="text-xs text-slate-600 bg-white rounded p-2 border border-slate-200 ml-7">
                    <p className="font-semibold mb-1">SMS will be sent to:</p>
                    <p>✓ All active members with phone numbers on file</p>
                    <p className="text-slate-500 mt-1">Message will be formatted for SMS (160 characters)</p>
                  </div>
                )}
              </>
            )}

            {isEditing && (
              <div className="text-xs text-slate-600 bg-white rounded p-2 border border-slate-200">
                <p className="font-semibold mb-1">ℹ️ Note:</p>
                <p>SMS notifications are only sent when creating new announcements.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-60 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditing ? 'Updating...' : 'Posting...'}
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={16} />
                  {isEditing ? 'Updated!' : 'Posted!'}
                </>
              ) : (
                <>
                  <Send size={16} />
                  {isEditing ? 'Update Announcement' : 'Post Announcement'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
