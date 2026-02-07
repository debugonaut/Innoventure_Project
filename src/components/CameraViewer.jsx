import React from 'react';
import { X } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';

const CameraViewer = ({ camera, onClose }) => {
    if (!camera) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                width: '90%',
                maxWidth: '1200px',
                maxHeight: '90vh',
                backgroundColor: 'var(--background)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-secondary)'
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.3rem' }}>{camera.name}</h2>
                        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {camera.description} • {camera.resolution} • {camera.type}
                        </p>
                    </div>
                    <Button onClick={onClose} variant="secondary" style={{ gap: '8px' }}>
                        <X size={18} /> Close
                    </Button>
                </div>

                {/* Video Feed */}
                <div style={{
                    flex: 1,
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minHeight: '500px'
                }}>
                    {camera.streamType === 'youtube' ? (
                        <iframe
                            src={camera.footageUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                border: 'none'
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={camera.name}
                        />
                    ) : (
                        <video
                            src={camera.footageUrl}
                            controls
                            autoPlay
                            muted
                            loop
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain'
                            }}
                        />
                    )}
                </div>

                {/* Camera Info */}
                <div style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Location</p>
                            <p style={{ fontSize: '0.9rem', margin: '0.25rem 0 0 0', fontFamily: 'monospace' }}>
                                {camera.location.lat.toFixed(4)}°, {camera.location.lng.toFixed(4)}°
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Status</p>
                            <p style={{ fontSize: '0.9rem', margin: '0.25rem 0 0 0' }}>
                                <span style={{
                                    display: 'inline-block',
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    backgroundColor: camera.status === 'active' ? 'var(--success)' : 'var(--warning)',
                                    marginRight: '6px'
                                }}></span>
                                {camera.status.toUpperCase()}
                            </p>
                        </div>
                        {camera.isDemo && (
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Type</p>
                                <p style={{ fontSize: '0.9rem', margin: '0.25rem 0 0 0', color: 'var(--primary)' }}>
                                    Demo Camera
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CameraViewer;
