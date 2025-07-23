-- Initial schema for portfolio database
-- V1__init.sql

-- Create education table
CREATE TABLE education (
    id TEXT PRIMARY KEY,
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    field TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    description TEXT,
    grade TEXT,
    location TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    technologies JSONB,
    live_url TEXT,
    github_url TEXT,
    image_url TEXT,
    images JSONB,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    status TEXT DEFAULT 'completed',
    featured BOOLEAN DEFAULT false,
    category TEXT,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create experience table
CREATE TABLE experience (
    id TEXT PRIMARY KEY,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    description TEXT NOT NULL,
    technologies JSONB,
    achievements JSONB,
    company_url TEXT,
    logo_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'unread',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_education_start_date ON education(start_date DESC);
CREATE INDEX idx_projects_featured ON projects(featured, is_active);
CREATE INDEX idx_projects_category ON projects(category, is_active);
CREATE INDEX idx_projects_order ON projects("order", is_active);
CREATE INDEX idx_experience_start_date ON experience(start_date DESC);
CREATE INDEX idx_contacts_status ON contacts(status, created_at DESC);
