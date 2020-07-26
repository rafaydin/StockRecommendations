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
    
    // absolute difference of user val and company val
    // denominator is max val
    // 1 minus that is percent match on that question
    // average all percentage matches

    // squaredsum = Math.pow((userEnv/sum),2) + Math.pow((userCom/sum),2) + Math.pow((userChar/sum),2) 
    //               + Math.pow((userDiv/sum),2)
    // console.log(Math.pow((userEnv/sum),2))
    // console.log(userEnv)
    // console.log(sum)
    // console.log(squaredsum)
    Company.find()
      .then(companies => {
        const dict = []
        companies.forEach(company =>{
          // percentSum = (userEnv/sum * company.env/company.sum) + (userCom/sum * company.com/company.sum) + 
          //     (userChar/sum * company.char/company.sum) + (userDiv/sum * company.div/company.sum)
          // var percentageMatch = (percentSum / squaredsum) * 100
          console.log("company: " + company)
          let sumForAvg = 0
          let valCount = 0
          for (const value in company){
            let userVal = userMapping[value]
            let compVal = company.scores[value];
            console.log("user " + userVal)
            console.log("comp " + compVal)
            sumForAvg += 1 - (Math.abs(userVal-compVal)/Math.max(userVal,compVal))
            valCount++;
          }
          var percentageMatch = sumForAvg/valCount
          console.log("percentageMatch" + percentageMatch)
          console.log("here")
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