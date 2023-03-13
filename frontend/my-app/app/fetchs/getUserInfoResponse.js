

export const getUserInfoResponse = async (id, token) => {
    console.log("/fetchs/getUserinfo");

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }


    try {

        const resultFetch = await fetch(`/api/users/${id}`, options);

        if (resultFetch.ok) {
            console.log("fetch succesfull");
            return resultFetch;
        } else {
            console.log("problem fetching in fetchUserInfo()");
        }

    } catch (err) {
        console.error(err);
    }

}