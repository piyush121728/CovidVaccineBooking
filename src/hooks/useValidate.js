import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useValidate = (profile) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (profile === null)
            navigate('/login');
    }, [profile]);

    return;
}

export default useValidate;