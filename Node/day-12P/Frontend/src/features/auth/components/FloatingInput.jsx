import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export const fieldVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
};

const shakeVariant = {
    shake: {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
    }
};

const FloatingInput = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasValue = value && value.length > 0;
    const isActive = isFocused || hasValue;

    return (
        <motion.div
            variants={fieldVariant}
            className={`floating-input-group ${error ? 'has-error' : ''}`}
        >
            <motion.div
                variants={error ? shakeVariant : {}}
                animate={error ? "shake" : ""}
                className="input-wrapper"
            >
                <input
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="floating-input"
                    id={`input-${name}`}
                />

                <label
                    htmlFor={`input-${name}`}
                    className={`floating-label ${isActive ? 'active' : ''}`}
                >
                    {label}
                </label>

                {isPassword && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex="-1"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: showPassword ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </motion.div>
                    </button>
                )}
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.span
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="error-message"
                    >
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Need AnimatePresence here because it's used inside the component without explicit import in that scope earlier
import { AnimatePresence } from 'framer-motion';

export default FloatingInput;
