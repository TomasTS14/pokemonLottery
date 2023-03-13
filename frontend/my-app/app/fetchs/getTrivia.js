export default async function fetchTrivia() {

    console.log("start /api/trivia");
    const categories = [
        "artliterature",
        "language",
        "sciencenature",
        "general",
        "fooddrink",
        "peopleplaces",
        "geography",
        "historyholidays",
        "entertainment",
        "toysgames",
        "music",
        "mathematics",
        "religionmythology",
        "sportsleisure",
    ]

    const categorie = categories[Math.floor(Math.random() * categories.length)];

    try {
        const response = await fetch('https://api.api-ninjas.com/v1/trivia?category=' + categorie, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': '5XJyB2nuRXF1k0r0DOJRaQ==qPMY9hIk1TJ4XuC0',
            }
        });
        if (response.ok) {
            console.log("finish /api/trivia");
            const data = await response.json();
            return data[0];
        } else {
            console.log(response);
        }
    } catch (error) {
        console.log(error);
    }

}