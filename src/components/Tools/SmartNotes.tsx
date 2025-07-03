import React, { useState, useRef } from 'react';
import { Plus, Search, Tag, Star, Trash2, Edit3, Save, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const SmartNotes: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote, toggleNoteFavorite } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [] as string[] });
  const [newTag, setNewTag] = useState('');
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    const matchesFavorite = !showFavoritesOnly || note.isFavorite;
    
    return matchesSearch && matchesTag && matchesFavorite;
  });

  const handleAddNote = () => {
    if (!newNote.title.trim()) {
      toast.error('Vui lòng nhập tiêu đề ghi chú');
      return;
    }

    addNote({
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      isFavorite: false,
    });

    setNewNote({ title: '', content: '', tags: [] });
    setShowNewNoteForm(false);
    toast.success('Đã thêm ghi chú mới');
  };

  const handleUpdateNote = (id: string, updates: any) => {
    updateNote(id, updates);
    setEditingId(null);
    toast.success('Đã cập nhật ghi chú');
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast.success('Đã xóa ghi chú');
  };

  const addTag = (noteId?: string) => {
    if (!newTag.trim()) return;

    if (noteId) {
      const note = notes.find(n => n.id === noteId);
      if (note && !note.tags.includes(newTag)) {
        updateNote(noteId, { tags: [...note.tags, newTag] });
      }
    } else {
      if (!newNote.tags.includes(newTag)) {
        setNewNote({ ...newNote, tags: [...newNote.tags, newTag] });
      }
    }
    setNewTag('');
  };

  const removeTag = (tag: string, noteId?: string) => {
    if (noteId) {
      const note = notes.find(n => n.id === noteId);
      if (note) {
        updateNote(noteId, { tags: note.tags.filter(t => t !== tag) });
      }
    } else {
      setNewNote({ ...newNote, tags: newNote.tags.filter(t => t !== tag) });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Ghi Chú Thông Minh</h2>
        <button
          onClick={() => setShowNewNoteForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm ghi chú</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm ghi chú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            <Star className="w-4 h-4 inline mr-1" />
            Yêu thích
          </button>

          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              #{tag}
            </button>
          ))}

          {(selectedTag || showFavoritesOnly) && (
            <button
              onClick={() => {
                setSelectedTag('');
                setShowFavoritesOnly(false);
              }}
              className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* New Note Form */}
      <AnimatePresence>
        {showNewNoteForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tiêu đề ghi chú..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
              />
              
              <textarea
                placeholder="Nội dung ghi chú..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white resize-none"
              />

              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Thêm tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white text-sm"
                  />
                  <button
                    onClick={() => addTag()}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Tag className="w-4 h-4" />
                  </button>
                </div>

                {newNote.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>#{tag}</span>
                    <button onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleAddNote}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu</span>
                </button>
                <button
                  onClick={() => {
                    setShowNewNoteForm(false);
                    setNewNote({ title: '', content: '', tags: [] });
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredNotes.map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                  {note.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleNoteFavorite(note.id)}
                    className={`p-1 rounded transition-colors ${
                      note.isFavorite
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className="w-4 h-4" fill={note.isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setEditingId(editingId === note.id ? null : note.id)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                {note.content}
              </p>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {note.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {format(note.updatedAt, 'dd/MM/yyyy HH:mm')}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || selectedTag || showFavoritesOnly
              ? 'Không tìm thấy ghi chú phù hợp'
              : 'Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên!'}
          </p>
        </div>
      )}
    </div>
  );
};