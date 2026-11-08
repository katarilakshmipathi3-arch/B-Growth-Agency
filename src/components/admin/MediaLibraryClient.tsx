'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, Search, File, Play } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: Date | string;
}

export default function MediaLibraryClient({ initialFiles }: { initialFiles: MediaFile[] }) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < fileList.length; i++) {
        const formData = new FormData();
        formData.append('file', fileList[i]);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.media) {
            setFiles(prev => [data.media, ...prev]);
          }
        }
      }
    } catch {
      alert('Error uploading file');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const copyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteFile = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setFiles(prev => prev.filter(f => f.id !== id));
      }
    } catch {
      alert('Failed to delete file');
    }
  };

  const filtered = files.filter(f =>
    f.originalName.toLowerCase().includes(search.toLowerCase()) ||
    f.filename.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      
      {/* Upload Zone & Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Upload Button Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-dashed border-brand-border dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3 relative hover:border-primary transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="p-3 rounded-full bg-primary-tint dark:bg-primary/20 text-primary">
            <Upload className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-navy dark:text-white block">
              {uploading ? 'Uploading asset to server...' : 'Click or Drag files to upload'}
            </span>
            <span className="text-[11px] text-brand-muted">
              JPG, PNG, WebP, SVG, MP4, WebM, PDF up to 50MB
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold text-brand-navy dark:text-white block">Search Assets</span>
            <span className="text-[11px] text-brand-muted">Find file by original name</span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-bg/50 dark:bg-slate-800 text-brand-navy dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

      </div>

      {/* Media Grid */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-brand-border dark:border-slate-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between text-xs text-brand-muted font-medium">
          <span>Total: {filtered.length} files</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-xs text-brand-muted">
            No media files found. Upload your first image or video above!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map((file) => {
              const isImage = file.mimeType.startsWith('image/');
              const isVideo = file.mimeType.startsWith('video/');

              return (
                <div
                  key={file.id}
                  className="group relative rounded-xl border border-brand-border dark:border-slate-800 overflow-hidden bg-brand-bg dark:bg-slate-800/40 p-2 space-y-2 flex flex-col justify-between"
                >
                  <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {isImage ? (
                      <Image
                        src={file.url}
                        alt={file.originalName}
                        fill
                        className="object-cover"
                      />
                    ) : isVideo ? (
                      <Play className="w-8 h-8 text-primary" />
                    ) : (
                      <File className="w-8 h-8 text-brand-muted" />
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-brand-navy dark:text-white block truncate" title={file.originalName}>
                      {file.originalName}
                    </span>
                    <span className="text-[10px] text-brand-muted block">
                      {formatSize(file.size)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-brand-border/60 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => copyUrl(file.id, file.url)}
                      className="p-1 rounded text-primary hover:bg-primary-tint/30 text-[10px] font-semibold flex items-center gap-1"
                      title="Copy URL"
                    >
                      {copiedId === file.id ? (
                        <>
                          <Check className="w-3 h-3 text-status-success" />
                          <span className="text-status-success">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteFile(file.id)}
                      className="p-1 rounded text-status-danger hover:bg-status-danger/10"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
