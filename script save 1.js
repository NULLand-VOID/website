
const express = require('express');
const app = express();
//const got = require('got');

const port = 8081; 
const dirPath = '/var/www/htdocs'




app.set('trust proxy', 'loopback'); 

app.use(express.static(dirPath))

app.get('/', function (req, res) {
   res.sendFile( dirPath + "/" + "index.html" );
})

app.get('/process_test', function (req, res) {
   ;(async ()=>{
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const prompt = req.query.textPrompt;
      const response = await openai.createCompletion({
         model: "text-ada-001",
         prompt: prompt,
         temperature: 0.7,
         max_tokens: 256,
         top_p: 1,
         frequency_penalty: 0,
         presence_penalty: 0,
       });
      res.send(response);
   })();
   
   
   /*(async () => {
      const url = 'https://api.openai.com/v1/engines/davinci/completions';
      const params = {
        "prompt": prompt,
        "max_tokens": 160,
        "temperature": 0.7,
        "frequency_penalty": 0.5
      };
      const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
      };
    
      try {
        const response = await got.post(url, { json: params, headers: headers }).json();
        output = `${prompt}${response.choices[0].text}`;
        res.send(response);
      } catch (err) {
        console.log(err);
      }
    })();*/

   
   //res.end(JSON.stringify(response));
}) 

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
