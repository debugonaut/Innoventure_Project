import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Navbar from '../components/layout/Navbar';
import RoleSelector from '../components/auth/RoleSelector';
import AuthModal from '../components/auth/AuthModal';
import './Landing.css';
import { Eye, ShieldCheck, Lock } from 'lucide-react';

const Landing = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    React.useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'owner') {
                navigate('/owner');
            } else if (user.role === 'citizen') {
                navigate('/dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleCloseAuth = () => {
        setSelectedRole(null);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <section className="hero">
                    <h1 className="hero-title">Ethical CCTV Access for Safer Communities</h1>
                    <p className="hero-subtitle">
                        A privacy-first platform that empowers citizens to request footage for valid reasons, while giving owners full control and incentives.
                    </p>
                </section>

                {/* Role Selection */}
                <RoleSelector onSelectRole={handleRoleSelect} />

                <section className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon"><Eye size={24} /></div>
                        <h3 className="feature-title">Transparent Requests</h3>
                        <p className="text-muted">Request footage with a clear reason. Owners approve or deny based on validity.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"><Lock size={24} /></div>
                        <h3 className="feature-title">Privacy First</h3>
                        <p className="text-muted">Footage is secure. Only approved requests get temporary access links.</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon"><ShieldCheck size={24} /></div>
                        <h3 className="feature-title">Owner Control</h3>
                        <p className="text-muted">CCTV owners decide who sees what. Earn reputation and incentives for helping.</p>
                    </div>
                </section>
            </div>

            {/* Auth Modal */}
            {selectedRole && (
                <AuthModal role={selectedRole} onClose={handleCloseAuth} />
            )}
        </>
    );
};

export default Landing;
