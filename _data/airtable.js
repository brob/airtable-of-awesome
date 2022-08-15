require('dotenv').config();
const Airtable = require('airtable');
let base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(process.env.BASE);

module.exports = async () => {
  const data = await new Promise((resolve, reject) => {
    let allDatasets = []; // change 'allDatasets' to something more relevant to your project
      base('Wins') // change 'New' to your base name
        .select({ view: 'Grid view' }) // change 'All' to your view name
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach((record) => {
              allDatasets.push({
                "id" : record._rawJson.id,
                "title": record._rawJson.fields['Title of win'],
                ...record._rawJson.fields
              });
            });
            fetchNextPage();
          },
          function done(err) {
            if (err) {
              reject(err)
            } else {
              resolve(allDatasets);
            }
          }
        );
      });
      console.log(data)
    return data;
    };