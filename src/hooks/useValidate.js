import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useValidate = (profile) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("useValidate", profile)
        if (!profile || profile === null || profile === undefined || profile[0] === null)
            navigate('/login');
    }, [profile]);

    return;
}

export default useValidate;