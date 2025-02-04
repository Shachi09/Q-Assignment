
import {BASE_URL} from "../utils/constants";

const getAllPaintings = async () => {
    try {
        const response = await fetch(`${BASE_URL}/paintings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;    
    } catch (error) {
        console.log(error);
    }
};

const getPaintingById = async(paintingId: any) => {
    try {
        const response = await fetch(`${BASE_URL}/paintings/${paintingId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;    
    } catch (error) {
        console.log(error);
    }
}

const addPainting = async (painting: any) => {
   try{
    const response = await fetch(`${BASE_URL}/paintings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(painting),
    })
    const data = await response.json();
    return data;
   } catch (error) {
    console.log(error);
   }
}

const updatedPainting = async(painting: any, paintingId: any) => {
    const response = await fetch(`${BASE_URL}/paintings/${paintingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(painting),
    })
    const data = await response.json();
    return data;
}

const deletePainting = async(paintingId: any) => {
    // const response = await fetch(`${BASE_URL}/paintings/${paintingId}`, {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     // body: JSON.stringify(painting),
    // })
    // const data = await response.json();
    // return data ;

    try {
        const response = await fetch(`${BASE_URL}/paintings/${paintingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the response has a body (DELETE responses may not always return JSON)
        let data = null;
        if (response.headers.get("content-type")?.includes("application/json")) {
            data = await response.json();
        }

        if (!response.ok) {
            throw new Error(data?.message || `Error: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error("Error deleting painting:", error);
        throw error; // Re-throw to handle it in handleDeleteConfirm
    }
    
}


export {getAllPaintings, getPaintingById, addPainting, updatedPainting, deletePainting};