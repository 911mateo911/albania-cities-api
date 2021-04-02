const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require(__dirname + "/serviceAcc.json");

app.use(express.static('public'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const capitalize = (name) => (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

app.get("/", async (req,res)=> {
    res.sendFile(__dirname + "/index.html")
})

app.get("/city", async (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send({
            response: "Please provide a city name",
            howto: "/cities/?q={city_name}"
        })
    } else {
        try {
            const city = await db.collection('cities').doc(capitalize(q)).get();
            if (!city.exists) {
                res.send({
                    response: "No city found"
                })
            } else {
                res.send(city.data());
            }
        } catch (e) {
            console.log(e)
        }
    }
})

app.get("/cities", async (req, res) => {
    try {
        const response = [];
        const allCities = await db.collection('cities').get();
        await allCities.forEach(doc => {
            response.push(doc.data());
        })
        res.send(response);
    } catch (e) { console.log(e) }
})

app.get("/region", async (req, res) => {
    const { q } = req.query
    if (!q) {
        res.send({
            response: "Please provide a region name",
            howto: "/region/?q={region_name}"
        })
    } else {
        try {
            const region = await db.collection('regions').doc(q).get()
            if (!region.exists) {
                res.send({
                    response: "No region found"
                })
            } else {
                res.send(region.data());
            }
        } catch (e) {
            console.log(e)
        }
    }
})

app.get("/regions", async (req,res) => {
    try {
        const response = [];
        const allRegions = await db.collection('regions').get();
        await allRegions.forEach(doc => {
            response.push(doc.data());
        })
        res.send(response);
    } catch (e) { console.log(e) }
})

app.listen(process.env.PORT || 3000, async function () {
    console.log("Server started on port 3000")
});