

export async function GET() {
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
            const data = await response.json();
            return Response.json(data[0]);
        }
    } catch (error) {
        console.log(error);
    }
}

