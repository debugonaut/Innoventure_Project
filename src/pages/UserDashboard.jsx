import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Card from '../components/common/Card';
import ComplaintForm from '../components/ComplaintForm';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Clock, AlertCircle } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) return;

        const q = query(
            collection(db, 'requests'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const reqs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRequests(reqs);
            setLoading(false);
            setError(null);
        }, (error) => {
            console.error("Error fetching requests:", error);
            setLoading(false);
            
            // Check if it's an index error
            if (error.code === 'failed-precondition' || error.message.includes('index')) {
                setError({
                    type: 'index',
                    message: 'Database index required',
                    details: error.message
                });
            } else {
                setError({
                    type: 'generic',
                    message: 'Failed to load complaints',
                    details: error.message
                });
            }
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="container dashboard-grid">
                <div className="map-section">
                    <ComplaintForm />
                </div>

                <div className="request-sidebar">
                    <Card title="My Complaints & Requests" style={{ height: '100%', overflowY: 'auto' }}>
                        {loading ? (
                            <p className="text-muted">Loading requests...</p>
                        ) : error ? (
                            <div style={{ 
                                padding: '1rem', 
                                background: 'var(--bg-secondary)', 
                                borderRadius: '8px',
                                border: '1px solid var(--warning)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <AlertCircle size={20} color="var(--warning)" />
                                    <strong style={{ color: 'var(--warning)' }}>{error.message}</strong>
                                </div>
                                
                                {error.type === 'index' ? (
                                    <>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
                                            A database index is required to display your complaints. This is a one-time setup.
                                        </p>
                                        
                                        <div style={{ 
                                            background: 'var(--background)', 
                                            padding: '12px', 
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            marginBottom: '12px'
                                        }}>
                                            <strong>How to fix:</strong>
                                            <ol style={{ marginTop: '8px', marginBottom: '0', paddingLeft: '20px' }}>
                                                <li>Open the browser console (F12 or Cmd+Option+I)</li>
                                                <li>Look for a Firebase error with a link</li>
                                                <li>Click the link to create the index automatically</li>
                                                <li>Wait 1-2 minutes for the index to build</li>
                                                <li>Refresh this page</li>
                                            </ol>
                                        </div>
                                        
                                        <details style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            <summary style={{ cursor: 'pointer', marginBottom: '4px' }}>Technical details</summary>
                                            <code style={{ 
                                                display: 'block', 
                                                background: '#000', 
                                                color: '#0f0', 
                                                padding: '8px', 
                                                borderRadius: '4px',
                                                overflowX: 'auto',
                                                fontSize: '0.7rem',
                                                marginTop: '4px'
                                            }}>
                                                {error.details}
                                            </code>
                                        </details>
                                    </>
                                ) : (
                                    <p style={{ fontSize: '0.85rem' }}>{error.details}</p>
                                )}
                            </div>
                        ) : requests.length === 0 ? (
                            <p className="text-muted">No active requests. Register one to get started.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {requests.map(req => (
                                    <div key={req.id} className="request-item">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <strong>{req.type}</strong>
                                            <span className={`request-status status-${req.status}`}>{req.status}</span>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{req.description}</p>

                                        {/* Display Extra Details */}
                                        {req.extraDetails && Object.keys(req.extraDetails).length > 0 && (
                                            <div style={{ fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '4px', margin: '4px 0' }}>
                                                {req.extraDetails.name && <div><strong>Name:</strong> {req.extraDetails.name}</div>}
                                                {req.extraDetails.age && <div><strong>Age:</strong> {req.extraDetails.age}</div>}
                                                {req.extraDetails.appearance && <div><strong>Appearance:</strong> {req.extraDetails.appearance}</div>}
                                                {req.extraDetails.itemName && <div><strong>Item:</strong> {req.extraDetails.itemName}</div>}
                                                {req.extraDetails.features && <div><strong>Features:</strong> {req.extraDetails.features}</div>}
                                            </div>
                                        )}

                                        {/* Display Attachments */}
                                        {req.attachments && req.attachments.length > 0 && (
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '4px 0' }}>
                                                {req.attachments.map((file, idx) => (
                                                    <a key={idx} href={file.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary)', textDecoration: 'underline' }}>
                                                        {file.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Clock size={12} /> {req.createdAt ? new Date(req.createdAt).toLocaleDateString() + ' ' + new Date(req.createdAt).toLocaleTimeString() : 'Just now'}
                                        </div>
                                        {req.location && (
                                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '4px' }}>
                                                Location: {req.location.lat.toFixed(4)}, {req.location.lng.toFixed(4)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;
