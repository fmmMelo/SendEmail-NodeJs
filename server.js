var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });

    app.post('/send-email', function (req, res) {

						var transporter = nodeMailer.createTransport({
				 		 service: 'Gmail',
			  				auth: {
			  					//Aqui eu criei um e-mail no Gmail (ele faz o papel do meu servidor de e-mail)
			    				user: 'empresahipotetica@gmail.com',
			    				pass: 'U37xwq*9'
			 				 }
						});

			     		 var mailOptions = {
			          		from: req.body.from, // AQUI VAI O ENDEREÇO PARA RESPONDER (que é extraído do formulário)
			          		to: 'igormatos55555@gmail.com', //AQUI VOCÊ COLOCO E-MAIL DO DESTINATÁRIOA DA MENSAGEM
			          		subject: req.body.subject, // AQUI VAI O TÍTULO DO E-MAIL (que é extraído do formulário)
			          		text: req.body.body, // AQUI VAI O CONTEÚDO DA MENSAGEM (que é extraído do formulário)
			          		html: '<b>'+'Titulo da mensagem: '+'</b>' + req.body.subject + '<br>' + '<b>'+'Remetente: '+'</b>' + req.body.from + '<br>' + '<b>'+'Mensagem: '+'</b>' + req.body.body // AQUI VAI O ARQUIVO HTML QUE SERÁ ENVIADO PARA O DESTINATÁRIO DA MENSAGEM.

			      };

			      transporter.sendMail(mailOptions, (error, info) => {
			          if (error) {
			              return console.log(error);
			          }
			          console.log(info.envelope.from);
			              res.redirect('/');
			          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });