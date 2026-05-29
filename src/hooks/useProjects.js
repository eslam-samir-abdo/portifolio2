// src/hooks/useProjects.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'eslam_projects_v1';

const DEFAULT_PROJECTS = [
  { id:1, title:'E-Commerce Store',      desc:'Full shopping experience with cart & product pages',  tags:['React','CSS3','JS'],      year:'2024', github:'https://github.com/', demo:'', featured:true  },
  { id:2, title:'E-Commerce #2',         desc:'Second storefront with enhanced UI patterns',          tags:['React','Bootstrap'],      year:'2024', github:'https://github.com/', demo:'', featured:false },
  { id:3, title:'Portfolio Website',     desc:'Personal showcase of projects and skills',             tags:['HTML','CSS','JS'],        year:'2024', github:'https://github.com/', demo:'', featured:true  },
  { id:4, title:'Weather App',           desc:'Real-time weather data with location search',          tags:['React','API'],            year:'2024', github:'https://github.com/', demo:'', featured:false },
  { id:5, title:'Todo List App',         desc:'Task manager with add, delete & filter',               tags:['React','Hooks'],          year:'2024', github:'https://github.com/', demo:'', featured:true  },
  { id:6, title:'Bondi — Travel Agency', desc:'Responsive landing page for a fictional agency',       tags:['HTML','CSS','Bootstrap'], year:'2024', github:'https://github.com/', demo:'', featured:false },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

export function useProjects() {
  const [projects, setProjects] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  function addProject(data) {
    const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects(prev => [...prev, { id: newId, ...data }]);
  }

  function deleteProject(id) {
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  return { projects, addProject, deleteProject };
}
