const admin = require('firebase-admin');
const serviceAccount = require(__dirname + "/serviceAcc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function addData(name, district, region, doc) {
  const data = {
    name: name,
    district: district,
    region: region
  }
  const res = await db.collection('cities').doc(name).set(data);
}
const capitalize = (name) => (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase());

async function addRegions(name, population, cities) {
  const data = {
    name: capitalize(name),
    population: population,
    cities: cities
  }
  const res = await db.collection('regions').doc(name).set(data)
}