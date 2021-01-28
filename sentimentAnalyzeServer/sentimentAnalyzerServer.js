const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
});


app.get("/url/emotion", (req,res) => {
    return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    // return res.send("url sentiment for "+req.query.url);
    let params = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'document': true,
            },
        }
    }
});

app.get("/text/emotion", (req,res) => {
    let params = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true,
            }
        }
    }
    getNLUInstance().analyze(params)
        .then(analysisResults => {
            console.log(analysisResults);
            const emotion = analysisResults.result.emotion.document.emotion;
            return res.send(emotion)
        })
        .catch(err => {
            console.error("Error:", err);
        })
});

app.get("/text/sentiment", (req,res) => {
    let params = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'document': true,
            },
        }
    }
    getNLUInstance().analyze(params)
        .then(analysisResults => {
            console.log(analysisResults);
            const sentiment = analysisResults.result.sentiment.document.label;
            return res.send(sentiment)
        })
        .catch(err => {
            console.error("Error:", err);
        })
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
