

export const sendLoginData = async (data) => {
    console.log("Dentro de sendLoginData");
    console.log("la data:");
    console.log(data);
    try {
        const resultFetch = await fetch(`/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return resultFetch;

    } catch (err) {
        console.error(err);
    }

}