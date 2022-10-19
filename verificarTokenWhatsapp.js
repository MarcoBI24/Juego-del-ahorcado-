const router = require("express").Router()
router.route("/facebook").get((req, res) => {
    // GET https://www.your-clever-domain-name.com/webhooks? hub.mode=subscribe& hub.challenge=1158201444& hub.verify_token=meatyhamhock

  const verify_token = 'hiworld'
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  if (mode && token) {
    if (mode === 'subscribe' && token === verify_token) {
      console.log('WEBHOOK verificado!!!!')
      res.status(200).send(challenge)
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
})



module.exports = router