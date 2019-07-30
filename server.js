const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const Riders = require("./models/Riders.js")
const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('*', (req, res) => {
  res.send('This is tutorial App on creating your first USSD app in 5 minutes or less by Ajala Abdulsamii <kgasta@gmail.com>')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body;
  let length = text.split("*").length;
  let txt =text.split("*");
  if (text == '') {
    // This is the first request. Note how we start the response with CON
    let response = `CON What would you want to check
    1. Search Rider
    2. Rate Rider`
    res.send(response)
  } else if (text == '1') {
    // Business logic for first level response
    let response = `CON Please enter the motorbike plate number:`
    res.send(response)
  } else if (text == '2') {
    // Business logic for first level response
    let response = `CON Please enter the motorbike plate number:`
    res.send(response)
  } else if (length === 2) {
    let initial_selection = txt[0];
    if(initial_selection == '1'){
      
      mongoose.connect( 'mongodb+srv://nyatindopatrick:dogobigy97@riders-ecfkm.mongodb.net/test?retryWrites=true&w=majority',
      {useNewUrlParser: true}
      )
      .then(()=>console.log('database connected successfully'))
      .catch(error=>console.log(error));

      app.post('/riders', (req,res)=>{
        const {plateNumber}=req.body;
        
        //simple validation
        if(!plateNumber) return res.send('please enter plate number');
        
        Riders.findOne({plateNumber})
        .then(result=> {
          let rider = result;
          
          let sms_message ;
          let client_phone_number = phoneNumber;
           let rider_detail = txt[length - 1];
          if(rider_detail===rider.plateNumber){
          //   let rider_name = rider_detail.name;
            sms_message = `Rider ${rider.name} ${rider.plateNumber} is registered with ${rider.sacco}.`;
        } else {sms_message = `We are not able to verify the rider information provided.`}
            const credentials = {
              apiKey: '546c73eecdc1ab4ba9815fb43bdcd5129b4ce1b3a94ac9cdead025bfebef68a2',
              username: 'nyatindopatrick',
          }
          
          // Initialize the SDK
          const AfricasTalking = require('africastalking')(credentials);
          
          // Get the SMS service
          const sms = AfricasTalking.SMS;
          
          function sendMessage() {
              const options = {
                  // Set the numbers you want to send to in international format
                  to: [client_phone_number],
                  // Set your message
                  message: sms_message
                  // Set your shortCode or senderId
              }
          
              // That’s it, hit send and we’ll take care of the rest
              sms.send(options)
                  .then(console.log)
                  .catch(console.log);
          }
          
          sendMessage();
        })
        
        })


      };
      
      // initialize Africas Talking
      // send SMS
      // sendSMS(client_phone_number, sms_message);
      // send sms back to customer
      let response='END Thank you for your query. You will receive an SMS shortly';
      res.send(response);
    }
    else if(initial_selection == '2'){
      // rate rider
      // Business logic for first level response
      let response= 'CON Rate a rider on a scale of 1 to 5';
      // This is a terminal request. Note how we start the response with END
      
      res.send(response);
    }
  
  else if(length === 3){
    // let rider_rating = txt[length - 1];
    // let plate_number = txt[length - 2];
    // go to databse get rider information
    // set rating for rider and upate
    let response= 'END Thank you for your feedback.';
    // This is a terminal request. Note how we start the response with END
    
    res.send(response);
  } else {
    res.status(400).send('Bad request!')
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})