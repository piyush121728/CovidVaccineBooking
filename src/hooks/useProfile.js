import { useEffect, useState } from 'react';
import axios from 'axios';
import Url from '../Url';

const useProfile = (user) => {
    const [profile, setProfile] = useState(null);

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
                    console.log("profile data from google", res.data)
                    // setProfile(userProfile);

                    if (user.userType === 'Admin') {
                        axios.post(Url.verifyAdmin, { email: userProfile.email })
                        .then(res => {
                            console.log("verified as admin", userProfile)
                            userProfile = {...userProfile, userType: 'admin'}
                            setProfile(userProfile);
                        })
                        .catch((err) => console.log(err));
                    }
                    else {
                        console.log('not a admin', userProfile)
                        setProfile(userProfile);
                    }

                })
                .catch((err) => console.log(err));
            
            // console.log(userProfile)
        }
    }, [user]);

    console.log('reached return')
    return [profile];
};

export default useProfile;