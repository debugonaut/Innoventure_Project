import React from 'react';
import { Users, Video } from 'lucide-react';
import Card from '../common/Card';

const RoleSelector = ({ onSelectRole }) => {
    return (
        <div style={{ 
            maxWidth: '800px', 
            margin: '3rem auto',
            padding: '0 1rem'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Choose Your Role</h2>
            <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                How would you like to use CCTV Access?
            </p>
            
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem'
            }}>
                {/* Citizen Card */}
                <Card 
                    style={{ 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        padding: '2rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => onSelectRole('citizen')}
                >
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        margin: '0 auto 1rem',
                        backgroundColor: 'var(--primary-light)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Users size={40} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>I'm a Citizen</h3>
                    <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Submit complaints and access requests for CCTV footage related to theft, lost items, or missing persons.
                    </p>
                </Card>

                {/* CCTV Owner Card */}
                <Card 
                    style={{ 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        padding: '2rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => onSelectRole('owner')}
                >
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        margin: '0 auto 1rem',
                        backgroundColor: 'var(--primary-light)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Video size={40} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h3 style={{ marginBottom: '0.5rem' }}>I'm a CCTV Owner</h3>
                    <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Manage your cameras, review footage requests, and approve or reject access to your CCTV footage.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default RoleSelector;
