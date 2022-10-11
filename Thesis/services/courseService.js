import AsyncStorage from "@react-native-async-storage/async-storage"

const getCourses = async () =>{
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


export default {
    logIn,logOut
}