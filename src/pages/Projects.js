// src/pages/Projects.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import './Projects.css';

const EMPTY = { title: '', desc: '', tags: '', github: '', demo: '', year: '', featured: false };

export default function Projects() {
  const { projects, addProject, deleteProject } = useProjects();
  const [open, setOpen]   = useState(false);
  const [form, setForm]   = useState(EMPTY);
  const [err,  setErr]    = useState(false);

  const pad = n => n < 10 ? '0' + n : '' + n;

  function handleSave() {
    if (!form.title.trim()) {
      setErr(true); setTimeout(() => setErr(false), 1200); return;
    }
    addProject({
      title:    form.title.trim(),
      desc:     form.desc.trim(),
      tags:     form.tags.split(',').map(t => t.trim()).filter(Boolean),
      github:   form.github.trim(),
      demo:     form.demo.trim(),
      year:     form.year.trim() || new Date().getFullYear().toString(),
      featured: form.featured,
    });
    setOpen(false); setForm(EMPTY);
  }

  function handleOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) { setOpen(false); setForm(EMPTY); }
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-ghost">WORK</div>
        <Link className="back-link" to="/">← Back Home</Link>
        <p className="page-label">02 — Portfolio</p>
        <h1 className="page-title">Every<br /><em>Project.</em></h1>
        <p className="page-sub">{projects.length} project{projects.length !== 1 ? 's' : ''} — and counting.</p>
      </div>

      <main className="proj-main">
        <div className="toolbar">
          <div className="proj-total">Total: <span>{projects.length}</span> projects</div>
          <button className="btn-add" onClick={() => setOpen(true)}>+ Add Project</button>
        </div>

        <div className="projects-list">
          {projects.length === 0 && (
            <div className="empty-state"><p>No projects yet — add your first one!</p></div>
          )}
          {projects.map((p, i) => (
            <div className="project-item" key={p.id}>
              <div className="proj-num">{pad(i + 1)}<br /><span>{p.year}</span></div>
              <div className="proj-body">
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
                <div className="proj-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
              <div className="proj-actions">
                {p.demo   && <a className="btn-demo" href={p.demo}   target="_blank" rel="noreferrer">Live Demo ↗</a>}
                {p.github && <a className="btn-gh"   href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                <button className="btn-del" onClick={() => { if (window.confirm('Remove this project?')) deleteProject(p.id); }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer><p>© 2025 Eslam Samir</p><p>GIZA, EGYPT</p></footer>

      {/* MODAL */}
      {open && (
        <div className="modal-overlay" onClick={handleOverlay}>
          <div className="modal-box">
            <h3>New Project</h3>
            <label>Project Title *</label>
            <input
              className={err ? 'err' : ''}
              type="text" placeholder="e.g. E-Commerce Store"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <label>Description</label>
            <textarea
              placeholder="What does this project do?"
              value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
            />
            <label>Tags (comma separated)</label>
            <input
              type="text" placeholder="React, CSS, API"
              value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
            />
            <label>GitHub Link</label>
            <input
              type="url" placeholder="https://github.com/username/repo"
              value={form.github} onChange={e => setForm({ ...form, github: e.target.value })}
            />
            <label>Live Demo Link <span className="opt-hint">(optional)</span></label>
            <input
              type="url" placeholder="https://myproject.vercel.app"
              value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })}
            />
            <p className="modal-hint">✦ Add a demo link and the Live Demo button will appear.</p>
            <div className="modal-row">
              <div>
                <label>Year</label>
                <input
                  type="text" placeholder="2025" maxLength={4}
                  value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div>
                <label>Featured on Home?</label>
                <select
                  value={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.value === 'true' })}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>Save Project</button>
              <button className="btn-cancel" onClick={() => { setOpen(false); setForm(EMPTY); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
