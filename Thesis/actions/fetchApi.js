const GET_COURSES = "GET_COURSES";

const API_URL="https://jsonplaceholder.typicode.com/todos"

export const fetchApi = async () => {
    try{
        return async dispatch => {
            const data = await fetch(API_URL,{
                method: GET,
                headers: {
                    'Content-type' : 'application/json',
                }
            })
            const json = await data.json()
            if(json){
                dispatch({
                    type:GET_COURSES,
                    payload: json
                })
            }else{
                console.log("Error with the data fetching!")
            }
        }
    }
    catch(error){
        console.log(error)
    }
}