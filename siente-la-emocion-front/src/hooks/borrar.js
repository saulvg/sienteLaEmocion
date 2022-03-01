import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

const useGetComments = () => {
    const [getComments, setGetComments] = useState([])
    const params = useParams()
    const loadComments = async (e) => {
        try {
            const allComents = await fetch (`http://localhost:4000/experiences/${params.idExperience}/reviews`)
            const coments = allComents.json()
            setGetComments(coments)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(()=>loadComments(), [])
    console.log('get comments',getComments);
    return(getComments)
}
export default useGetComments