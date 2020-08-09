const router = require('express').Router();

let Company = require('./company.model');

router.route('/').get((req, res) => {
  Company.find()
    .then(companies => res.json(companies))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post((req, res) => {
    if (!req.body.userEnv || !req.body.userCom || !req.body.userChar || !req.body.userDiv || !req.body.sum)
      return res.status(400).send('Incomplete params')

    const userMapping = {
      env: Number(req.body.userEnv),
      com: Number(req.body.userCom),
      char: Number(req.body.userChar),
      div: Number(req.body.userDiv)
    }
    Company.find()
      .then(companies => {
        const dict = []
        companies.forEach(company =>{
          let scores = Object(company.scores)
          let sumForAvg = 0
          let valCount = 0
          for (const value in scores){
            if (value === 'env' || value === 'com' || value === 'char' || value === 'div'){
              let userVal = userMapping[value]
              let compVal = company.scores[value]
              sumForAvg += 1 - (Math.abs(userVal-compVal)/Math.max(userVal,compVal))
              valCount++
            }
          }
          var percentageMatch = (sumForAvg/valCount) * 100
          dict.push({name: company.name, match: percentageMatch.toFixed(2)})
        })
        dict.sort((a,b) => b.match - a.match)
        return res.json(dict)
      })
      .catch(err => res.status(400).json('Error: ' + err))
  })

router.route('/add').post((req, res) => {
const name = req.body.name
const env = Number(req.body.env)
const com = Number(req.body.com)
const char = Number(req.body.char)
const div = Number(req.body.div)

const newCompany = new Company({
    name,
    env,
    com,
    char,
    div
});

newCompany.save()
.then(() => res.json('Company added!'))
.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router