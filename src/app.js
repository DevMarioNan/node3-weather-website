const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.set('views', path.join(__dirname,'../templates/views'))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'../public')));



app.get('' ,(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name : 'mario'
    });
});

app.get('/about', (req,res) =>{
    res.render('about',{
        name: 'mario',
        title: 'about page'
    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'help page',
        message: 'here you can find help',
        name: 'mario'
    })
});

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'you must provide an address'
        });
    }
    geocode(address , (err,data)=>{
        if(err){
                res.send({
                error: err
            });
        }else{
            forecast(data.latitude , data.longitude ,(message,weather)=>{
                if(message){
                    res.send({
                        error:message
                    });
                }else{
                    res.send({
                        forecast: weather,
                        location: data.location,
                        address: address
                    })
                }
            })
        }
    })
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: 'you must provide a search term'
        });
    }else{
        console.log(req.query.search);
        res.send({
            products: []
        });
    }

    
});

app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title: '404',
        name: 'mario',
        error: 'Help article not found '
    });
})

app.get('*',(req,res)=>{
    res.render('404Page',{
        title: '404',
        name: 'mario',
        error: '404 page not found'
    });
});

app.listen(port,()=>{
    console.log('server is up on port ' + port);
});