import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseInit from "../firebase_config";
import { useHistory } from "react-router";
import { toast } from "../toast";

const Logout: React.FC = () => {
    const auth = getAuth(firebaseInit);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            auth.signOut().then(() => {
                toast('Sign Out Successfull');
                console.log('Sign Out Successfull');
            }).catch(() => {
                toast('Sign Out Failed');
                console.log('Sign Out Failed');
            });
        } else {
            toast('No User Logged In');
            console.log('User is not signed in');
        }
    }, []);
    window.location.href = '/Home';

    return null;
}

export default Logout;