import AsyncStorage from "@react-native-async-storage/async-storage"

const logIn = async (user) =>{
    console.log("user info: ",user);
    const {username, password} = user;
    if(username === "admin" && password === "admin") {
        AsyncStorage.setItem("user",JSON.stringify(user))
        return{
            status:"success",
            message: "Logged in",
            user: username,
        }
    }
}

const logOut = async () => {
    AsyncStorage.clear()
    return {
        status: "success",
        message: "Logged out"
    }
}

export default {
    logIn,logOut
}