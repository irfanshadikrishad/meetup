import React, { createContext } from 'react';


export const AuthContext = createContext(null);
const globalProvider = () => {
    return (
        <div>
            <div>
                <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
            </div>
        </div>
    );
};

export default globalProvider;