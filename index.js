const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

const dbName="VIC-Database";
const client = new MongoClient(
  "mongodb+srv://heroreal5385:a1ULx6FEqKAd464z@cluster0.hxp3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

async function connectToMongo() {
  try {
    client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();
// Define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.post("/bookingData", async (req, res) => {
  const { selectedCenter, startDate, time, plateNo, brand, selectedServices, name, email,carModel, year } = req.body;
  const bookingInfo = {
    name: name,
    email: email,
    selectedCenter:selectedCenter,
    date: startDate,
    time: time,
    plateNo:plateNo,
    brand:brand,
    selectedServices:selectedServices,
    carModel:carModel,
    year:year
  };
  const db = client.db(dbName);
  const collection = db.collection("BookingData");
  await collection.insertOne(bookingInfo);
});
app.get("/bookingData", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("BookingData");
    // Retrieve data from MongoDB
    const data = await collection.find().toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/sendBookingemail", async (req, res) => {
  const { selectedCenter, startDate, time, plateNo, brand, selectedServices, name, email } =
    req.body;
  // console.log(req.body);
  try {
    await nodemailer
      .createTransport({
        service: "gmail",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "heroreal5385@gmail.com",
        pass: "ybgc fpop npch sgbp",
         
        },
      })
      .sendMail({
        from: "heroreal5385@gmail.com",
        to: email,
        subject: "Booking Email",
        html: `<!doctype html>
<html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title></title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    
      <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Lato:300,400,500,700);
        </style>
      <!--<![endif]-->

    
    
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
    </style>
    
    
  
    
    
    
  </head>
  <body style="word-spacing:normal;">
    
    
      <div
         style="" lang="und" dir="auto"
      >
        
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="border:none;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;"><v:image style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" src="https://i.ibb.co.com/RbTVDv5/6391f36eacbd.png" xmlns:v="urn:schemas-microsoft-com:vml" /><![endif]-->
      <div
         style="margin:0 auto;max-width:600px;"
      >
        <table
           border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"
        >
          <tbody>
            <tr
               style="vertical-align:top;"
            >
              
          <td  style="width:0.01%;padding-bottom:NaN%;mso-padding-bottom-alt:0;" />
          <td  background="https://i.ibb.co.com/RbTVDv5/6391f36eacbd.png" style="background:#000000 url('https://i.ibb.co.com/RbTVDv5/6391f36eacbd.png') no-repeat center center / cover;background-position:center center;background-repeat:no-repeat;padding:0px 0px 200px 0px;vertical-align:top;">
            
      <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600" ><tr><td style=""><![endif]-->
      <div
         class="mj-hero-content" style="margin:0px auto;"
      >
        <table
           border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;"
        >
          <tbody>
            <tr>
              <td  style="" >
                <table
                   border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;"
                >
                  <tbody>
                    
                        <tr>
                          <td
                             align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                          >
                            
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;line-height:1.8;text-align:center;color:black;"
      ></div>
    
                          </td>
                        </tr>
                      
                        <tr>
                          <td
                             align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                          >
                            
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;font-weight:normal;line-height:1.8;text-align:center;color:black;"
      ><div></div><div><br></div></div>
    
                          </td>
                        </tr>
                      
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
          </td>
          <td  style="width:0.01%;padding-bottom:NaN%;mso-padding-bottom-alt:0;" />
        
            </tr>
          </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;text-align:center;"
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
      >
        <tbody>
          <tr>
            <td  style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
              
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
      >
        <tbody>
          
              <tr>
                <td
                   align="center" style="background:#000000;font-size:0px;word-break:break-word;"
                >
                  
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;font-weight:300;line-height:1.8;text-align:center;color:#f8e71c;"
      >Automatic response e-mail</div>
      <div
         style="font-family:'Lato', sans-serif;font-size:32px;font-weight:500;line-height:1.8;text-align:center;color:#ffffff;"
      >Booking Information</div>
    
                </td>
              </tr>
            
              <tr>
                <td
                   align="left" style="background:#f8e71c;font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                >
                  
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;line-height:1.8;text-align:left;color:#000000;"
      >&nbsp;Dear ${name},<div style="color:#000000;">&nbsp;We hope you are doing well! Thank you for choosing VIC Auto Services
as your&nbsp; &nbsp;car service operator, we hope you will be most satisfied with
your upcoming&nbsp; &nbsp;maintenance service. Here are your booking details:
</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Name</span> : ${name}</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Center</span> : ${selectedCenter}</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Date</span> :${startDate}&nbsp;</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Time</span> : ${time}</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Car Plate No :</span>: ${plateNo}</div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Car Brand :</span> : ${brand}</div></div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Car Model :</span> : ${carModel}</div></div>
<div style="color:#000000;text-align:center;">&nbsp; <span style="font-weight:700;">Car Year :</span> : ${year}</div></div>

    
                </td>
              </tr>
            
        </tbody>
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="border:none;direction:ltr;font-size:0px;text-align:center;"
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:550px;" width="550" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:550px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;text-align:center;"
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:550px;" ><![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
      >
        <tbody>
          <tr>
            <td  style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
              
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
      >
        <tbody>
          
              <tr>
                <td
                   align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                >
                  
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;font-weight:400;line-height:1.8;text-align:center;color:#FFFFFF;"
      >This is an automated response email, please do not reply. If you have any queries
regarding your booking &amp; or service, please write to the following email:
booking@vicautoservices.com, or contact us at the following number on whatsapp: +1
6463 645 48.</div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#fafafa" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div  style="background:#fafafa;background-color:#fafafa;margin:0px auto;max-width:600px;">
        
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fafafa;background-color:#fafafa;width:100%;"
        >
          <tbody>
            <tr>
              <td
                 style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
            
      <div
         class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
      >
        
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
      >
        <tbody>
          <tr>
            <td  style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
              
      <table
         border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
      >
        <tbody>
          
              <tr>
                <td
                   align="center" style="background:#000000;font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                >
                  
      <div
         style="font-family:'Lato', sans-serif;font-size:15px;line-height:1.8;text-align:center;color:#f8e71c;"
      >Website | Subscribe</div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
    
      </div>
    
  </body>
</html>
  `,
      });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
  }
});
app.post("/sendThanksemail", async (req, res) => {
  const { email } =
    req.body;
  // console.log(req.body);
  try {
    await nodemailer
      .createTransport({
        service: "gmail",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "heroreal5385@gmail.com",
        pass: "ybgc fpop npch sgbp",
         
        },
      })
      .sendMail({
        from: "heroreal5385@gmail.com",
        to: email,
        subject: "Thanks giving email",
        html: `<!doctype html>
        <html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <title></title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
              #outlook a { padding:0; }
              body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
              table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
              img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
              p { display:block;margin:13px 0; }
            </style>
            <!--[if mso]>
            <noscript>
            <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
            </xml>
            </noscript>
            <![endif]-->
            <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
            </style>
            <![endif]-->
            
              <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Lato:300,400,500,700" rel="stylesheet" type="text/css">
                <style type="text/css">
                  @import url(https://fonts.googleapis.com/css?family=Lato:300,400,500,700);
                </style>
              <!--<![endif]-->
        
            
            
            <style type="text/css">
              @media only screen and (min-width:480px) {
                .mj-column-per-100 { width:100% !important; max-width: 100%; }
              }
            </style>
            <style media="screen and (min-width:480px)">
              .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
            </style>
            
            
          
            
            
            
          </head>
          <body style="word-spacing:normal;">
            
            
              <div
                 style="" lang="und" dir="auto"
              >
                
              
              <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            
              
              <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                
                <table
                   align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
                >
                  <tbody>
                    <tr>
                      <td
                         style="border:none;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            
              
              <div  style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                
                <table
                   align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;"
                >
                  <tbody>
                    <tr>
                      <td
                         style="direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;"
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                    
              <div
                 class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
              >
                
              <table
                 border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
              >
                <tbody>
                  <tr>
                    <td  style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
                      
              <table
                 border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
              >
                <tbody>
                  
                      <tr>
                        <td
                           align="center" style="font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                        >
                          
              <div
                 style="font-family:'Lato', sans-serif;font-size:15px;font-weight:300;line-height:1.8;text-align:center;color:#f8e71c;"
              >Automatic response e-mail</div>
            
                        </td>
                      </tr>
                    
                      <tr>
                        <td
                           align="left" style="background:#f8e71c;font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                        >
                          
              <div
                 style="font-family:'Lato', sans-serif;font-size:15px;font-style:normal;font-weight:500;line-height:1.8;text-align:left;color:#000000;"
              ><div></div>Thank you for choosing VIC Auto Services
              as your car service operator, we hope you will be most satisfied with
              your upcoming maintenance service. </div>
            
                        </td>
                      </tr>
                    
                </tbody>
              </table>
            
                    </td>
                  </tr>
                </tbody>
              </table>
            
              </div>
            
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            
              
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            
              
              <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#fafafa" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            
              
              <div  style="background:#fafafa;background-color:#fafafa;margin:0px auto;max-width:600px;">
                
                <table
                   align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fafafa;background-color:#fafafa;width:100%;"
                >
                  <tbody>
                    <tr>
                      <td
                         style="direction:ltr;font-size:0px;padding:0px 0px 0px 0px;text-align:center;"
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                    
              <div
                 class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"
              >
                
              <table
                 border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
              >
                <tbody>
                  <tr>
                    <td  style="border:none;vertical-align:top;padding:0px 0px 0px 0px;">
                      
              <table
                 border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%"
              >
                <tbody>
                  
                      <tr>
                        <td
                           align="center" style="background:#000000;font-size:0px;padding:10px 25px 10px 25px;word-break:break-word;"
                        >
                          
              <div
                 style="font-family:'Lato', sans-serif;font-size:15px;line-height:1.8;text-align:center;color:#f8e71c;"
              >Website | Unsubscribe</div>
            
                        </td>
                      </tr>
                    
                </tbody>
              </table>
            
                    </td>
                  </tr>
                </tbody>
              </table>
            
              </div>
            
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            
              
              <!--[if mso | IE]></td></tr></table><![endif]-->
            
            
              </div>
            
          </body>
        </html>`,
      });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteBooking", async (req, res) => {
  const { id } = req.body; // Get the id from the request body

  try {
    const db = client.db(dbName);
    const collection = db.collection("BookingData");

    // Update the booking document by setting the action to "deleted"
    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // Filter by the document's _id
      { $set: { action: "deleted" } } // Set the action to "deleted"
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Booking marked as deleted." });
    } else {
      res.status(404).json({ message: "Booking not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the booking." });
  }
});
// Start the server
const port =  3000;
app.listen(port, () => {
  console.log(`Server is running on 3000`);
});
