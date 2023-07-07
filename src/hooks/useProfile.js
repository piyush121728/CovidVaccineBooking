import { useEffect } from 'react';
import axios from 'axios';
import Url from '../Url';

const useProfile = (user, setProfile, userType) => {
    useEffect(() => {
        if (user) {
            let userProfile;
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    userProfile = res.data;
                    console.log(res.data)
                    setProfile(userProfile);
                })
                .catch((err) => console.log(err));
            
            console.log(userProfile)
            // if (userType === 'Admin') {
            //     axios.post(Url.verifyAdmin, { email: userProfile.email })
            //     .then(res => {
            //         userProfile = {...userProfile, userType: 'admin'}
            //         setProfile(userProfile);
            //     })
            //     .catch((err) => console.log(err));
            // }
        }
    }, [user]);

    return;
};

export default useProfile;