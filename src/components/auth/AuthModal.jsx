import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ role, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { signup, login, loginWithGoogle, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                await signup(formData.email, formData.password, role, formData.name);
            } else {
                await login(formData.email, formData.password);
            }
            
            // Redirect based on role
            navigate(role === 'owner' ? '/owner' : '/dashboard');
        } catch (err) {
            setError(err.message || 'Authentication failed');
        }
        setLoading(false);
    };

    const handleGoogleAuth = async () => {
        setError('');
        setLoading(true);

        try {
            await loginWithGoogle(role);
            navigate(role === 'owner' ? '/owner' : '/dashboard');
        } catch (err) {
            setError(err.message || 'Google authentication failed');
        }
        setLoading(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await resetPassword(resetEmail);
            setResetSuccess(true);
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        }
        setLoading(false);
    };

    if (showForgotPassword) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px'
            }}>
                <div className="card" style={{ 
                    maxWidth: '450px', 
                    width: '100%',
                    position: 'relative'
                }}>
                    <button
                        onClick={() => {
                            setShowForgotPassword(false);
                            setResetSuccess(false);
                            setError('');
                        }}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-muted)'
                        }}
                    >
                        <X size={24} />
                    </button>

                    <h2 style={{ marginBottom: '1rem' }}>Reset Password</h2>
                    
                    {resetSuccess ? (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'var(--success-light)',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                        }}>
                            <p style={{ color: 'var(--success)', margin: 0 }}>
                                Password reset email sent! Check your inbox.
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            <form onSubmit={handlePasswordReset}>
                                <Input
                                    type="email"
                                    label="Email Address"
                                    placeholder="your@email.com"
                                    required
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />

                                {error && (
                                    <div style={{ 
                                        padding: '0.75rem', 
                                        backgroundColor: 'var(--danger-light)', 
                                        borderRadius: '6px',
                                        marginBottom: '1rem'
                                    }}>
                                        <p style={{ color: 'var(--danger)', fontSize: '0.9rem', margin: 0 }}>
                                            {error}
                                        </p>
                                    </div>
                                )}

                                <Button type="submit" block disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div className="card" style={{ 
                maxWidth: '500px', 
                width: '100%',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '0.5rem' }}>
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                    {role === 'owner' ? 'CCTV Owner' : 'Citizen'} Portal
                </p>

                {/* Tab Switcher */}
                <div style={{ 
                    display: 'flex', 
                    gap: '0.5rem', 
                    marginBottom: '1.5rem',
                    borderBottom: '2px solid var(--border)'
                }}>
                    <button
                        onClick={() => setIsSignUp(true)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: isSignUp ? '2px solid var(--primary)' : 'none',
                            color: isSignUp ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: isSignUp ? 'bold' : 'normal',
                            cursor: 'pointer',
                            marginBottom: '-2px'
                        }}
                    >
                        Sign Up
                    </button>
                    <button
                        onClick={() => setIsSignUp(false)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: !isSignUp ? '2px solid var(--primary)' : 'none',
                            color: !isSignUp ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: !isSignUp ? 'bold' : 'normal',
                            cursor: 'pointer',
                            marginBottom: '-2px'
                        }}
                    >
                        Sign In
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}

                    <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    {!isSignUp && (
                        <div style={{ textAlign: 'right', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    {error && (
                        <div style={{ 
                            padding: '0.75rem', 
                            backgroundColor: 'var(--danger-light)', 
                            borderRadius: '6px',
                            marginBottom: '1rem'
                        }}>
                            <p style={{ color: 'var(--danger)', fontSize: '0.9rem', margin: 0 }}>
                                {error}
                            </p>
                        </div>
                    )}

                    <Button type="submit" block disabled={loading}>
                        {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </Button>
                </form>

                <div style={{ 
                    margin: '1.5rem 0', 
                    textAlign: 'center', 
                    position: 'relative'
                }}>
                    <div style={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: 0, 
                        right: 0, 
                        height: '1px', 
                        backgroundColor: 'var(--border)' 
                    }} />
                    <span style={{ 
                        position: 'relative', 
                        backgroundColor: 'var(--background)', 
                        padding: '0 1rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9rem'
                    }}>
                        OR
                    </span>
                </div>

                <Button 
                    variant="secondary" 
                    block 
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    style={{ gap: '8px' }}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Continue with Google
                </Button>
            </div>
        </div>
    );
};

export default AuthModal;
