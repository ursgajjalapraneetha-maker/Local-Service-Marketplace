"use client"

/**
 * Authentication Service
 *
 * Handles user authentication operations including login.
 * This file contains mock login functionality for development and testing.
 *
 * @note This file contains temporary mock functions. In production, these should be
 * replaced with actual API calls to your backend service.
 *\n */

/**
 * TEMPORARY: Mock login function for development and testing.
 *
 * Simulates a login API call with realistic delays and responses.
 * This provides a mock user response without requiring a backend.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise} Resolves to mock login response
 *
 * @example
 * authService.loginUser({
 *   email: 'user@example.com',
 *   password: 'password123'
 * }).then(response => {
 *   console.log(response.user) // Mock user object
 * })
 */
export const loginUser = async ({ email, password }) => {
  // Simulate API delay for more realistic user experience
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic credential validation (simulating server-side validation)
      if (!email || !password) {
        reject(new Error('Please provide both email and password'))
        return
      }
      
      // For demo purposes, accept any email/password combination
      // In production, this would validate against a real backend
      if (password.length < 8) {
        reject(new Error('Invalid credentials'))
        return
      }
      
      // Determine user role based on email pattern (demo logic)
      const role = email.includes('provider') ? 'provider' : 'customer'
      
      // Create realistic mock user object with all required fields
      const mockUser = {
        id: role === 'provider' ? 'prov_12345' : 'cust_67890',
        name: role === 'provider' ? 'John Doe' : 'Sarah Johnson',
        email: email,
        role: role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(role === 'provider' ? 'John Doe' : 'Sarah Johnson')}&background=random&size=128`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
        isEmailVerified: true,
        phone: '+91 9876543210',
        address: role === 'provider' ? 'Mumbai, Maharashtra' : 'Bangalore, Karnataka',
        lastLogin: new Date().toISOString(),
      }
      
      // Mock successful login response
      const mockResponse = {
        success: true,
        message: 'Login successful! Welcome back.',
        user: mockUser,
        // Temporary mock JWT token (simulate secure token storage)
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 20),
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
        refreshToken: 'mock-refresh-token-' + Math.random().toString(36).substr(2, 20),
      }
      
      // Simulate the success callback
      resolve(mockResponse)
      
    }, 1500) // Simulate 1.5 second API delay for better UX
  })
}

/**
 * TEMPORARY: Simulated Firebase Auth login function (for development only).
 *
 * This function mimics Firebase Authentication behavior for development
 * purposes. In production, this should be replaced with actual Firebase
 * signInWithEmailAndPassword() or your backend API.
 *
 * @deprecated This is temporary and should be removed after backend integration
 */
const simulatedFirebaseLogin = async ({ email, password }) => {
  // Mock Firebase Auth behavior for development
  console.log('🔄 Simulating Firebase Auth login...')
  console.log('📧 Email:', email)
  console.log('🔐 Password length:', password.length)
  
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Simulate Firebase Auth response structure
  const mockFirebaseResponse = {
    user: {
      uid: 'mock-firebase-uid-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      emailVerified: true,
    },
    operationType: 'signIn',
    providerId: 'password',
  }
  
  console.log('✅ Firebase auth simulation successful')
  return mockFirebaseResponse
}

/**
 * Signs out the current user.
 *
 * @async
 * @function signOut
 * @returns {Promise} Resolves when sign-out is complete
 */
export const signOut = async () => {
  try {
    // Note: This would require actual Firebase Auth or backend API
    // await auth.signOut()
    console.log('User signed out successfully')
    return { success: true }
  } catch (error) {
    throw new Error('Sign-out failed. Please try again.')
  }
}

/**
 * Gets the current authenticated user.
 *
 * @returns {Promise} Resolves to user data or null if not authenticated
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // Simulate checking current user session
    // In production, this would check Firebase or backend API
    setTimeout(() => {
      // Check if there's a stored user session
      const storedUser = localStorage.getItem('auth_user')
      if (storedUser) {
        resolve(JSON.parse(storedUser))
      } else {
        resolve(null)
      }
    }, 500)
  })
}

/**
 * Checks if a user is currently authenticated.
 *
 * @returns {Promise} Resolves to boolean indicating authentication status
 */
export const isAuthenticated = () => {
  return getCurrentUser()
    .then((user) => !!user)
    .catch(() => false)
}

/**
 * Sends password reset email.
 *
 * @async
 * @function sendPasswordReset
 * @param {string} email
 * @returns {Promise} Resolves when reset email is sent
 * 
 * @example
 * authService.sendPasswordReset('user@example.com')
 */
export const sendPasswordReset = async (email) => {
  try {
    // Note: This would require Firebase Auth or backend API
    console.log('Password reset email sent to:', email)
    return { success: true, message: 'Password reset email sent. Please check your inbox.' }
  } catch (error) {
    throw new Error('Password reset failed. Please try again.')
  }
}

/**
 * Updates user password.
 *
 * @async
 * @function updatePassword
 * @param {string} newPassword
 * @returns {Promise} Resolves when password is updated
 * 
 * @example
 * authService.updatePassword('newSecurePassword123')
 */
export const updatePassword = async (newPassword) => {
  try {
    // Validate new password strength
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    
    // Note: This would require Firebase Auth or backend API
    console.log('Password updated successfully')
    return { success: true, message: 'Password updated successfully' }
  } catch (error) {
    throw new Error('Password update failed. Please try again.')
  }
}

/**
 * Reauthenticates the current user with a credential.
 *
 * @async
 * @function reauthenticateWithCredential
 * @param {{ type: string, credential: string }} credential
 * @returns {Promise} Resolves when reauthentication is complete
 * 
 * @example
 * authService.reauthenticateWithCredential({
 *   type: 'password',
 *   credential: 'currentPassword'
 * })
 */
export const reauthenticateWithCredential = async (credential) => {
  try {
    // Note: This would require Firebase Auth or backend API
    console.log('Reauthenticated with credential')
    return { success: true, message: 'Reauthentication successful' }
  } catch (error) {
    throw new Error('Reauthentication failed. Please try again.')
  }
}

/**
 * Checks if email is valid.
 *
 * @param {string} email
 * @returns {boolean} True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Checks if password meets minimum requirements.
 *
 * @param {string} password
 * @returns {{ valid: boolean, message?: string }} Validation result
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' }
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  
  // Additional password strength validation
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?\":{}|<>]/.test(password)
  
  if (!hasUppercase) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }
  
  if (!hasLowercase) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }
  
  if (!hasNumber) {
    return { valid: false, message: 'Password must contain at least one number' }
  }
  
  if (!hasSpecial) {
    return { valid: false, message: 'Password must contain at least one special character' }
  }
  
  return { valid: true }
}

/**
 * Clears any persisted auth tokens or sessions.
 *
 * @function clearAuthData
 * @description Clears all authentication data from storage
 */
export const clearAuthData = () => {
  // Clear any stored user session data
  localStorage.removeItem('auth_user')
  localStorage.removeItem('auth_token')
  sessionStorage.removeItem('auth_user')
  sessionStorage.removeItem('auth_token')
  
  console.log('Authentication data cleared')
}

/**
 * Gets authentication state with user data.
 *
 * @returns {{ user: Object|null, loading: boolean, error: string|null }} Auth state
 */
export const getAuthState = () => {
  return {
    user: null, // This would be populated by auth context or state management
    loading: false,
    error: null,
  }
}

/**
 * NEW: Admin user creation function (for development/testing).
 *
 * Creates a mock admin user for testing purposes.
 * This should be removed in production and replaced with proper user management.
 *
 * @param {{ email: string, password: string, name: string }} userData
 * @returns {Promise}
 */
export const createAdminUser = async (userData) => {
  console.log("Creating admin user:", userData.email);

  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: "admin_" + Date.now(),
        name: userData.name || "Admin User",
        email: userData.email,
        role: "admin",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          userData.name || "Admin User"
        )}&background=ff6b6b&color=fff`,
        createdAt: new Date().toISOString(),
        isEmailVerified: true,
      };

      resolve(newUser);
    }, 1000);
  });
};

/**
 * Verifies if a user has a specific role.
 *
 * @param {Object} user
 * @param {string} role
 * @returns {boolean}
 */
export const hasRole = (user, role) => {
  return user && user.role === role;
};

/**
 * Gets user display name.
 *
 * @param {Object} user
 * @returns {string}
 */
export const getUserDisplayName = (user) => {
  return user?.name || user?.email?.split("@")[0] || "User";
};

/**
 * Gets user initials.
 *
 * @param {Object} user
 * @returns {string}
 */
export const getUserInitials = (user) => {
  const name = getUserDisplayName(user);
  return name.charAt(0).toUpperCase();
};

/**
 * Checks whether the user profile is complete.
 *
 * @param {Object} user
 * @returns {boolean}
 */
export const hasCompletedProfile = (user) => {
  return !!(
    user &&
    user.name &&
    user.email &&
    user.isEmailVerified
  );
};