export default function ConfirmationMailBody({teamText,name,regNo,email,phone}) {

return(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Registration Confirmation</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
      color: #333;
    }
    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: auto;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #007bff;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .btn {
      display: inline-block;
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 20px;
    }
    .btn-secondary {
      background-color: #28a745;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">

      <div style="display: flex; align-items: center; justify-content: center; gap: 20px;width: 100%;">
        <a href="https://futsal-mania-2025.vercel.app/" target="_blank">
          <img src="https://i.postimg.cc/T1DkyTsx/hero-Image.png" alt="futsal-mania-2025" style="max-width: 200px; height: auto;">
        </a>
        <a href="https://www.iqlipse.space/" target="_blank">
          <img src="https://i.postimg.cc/nrSHLYNg/iqlipse.png" alt="iqlipse" style="max-width: 150px; height: auto;">
        </a>
      </div>
      
      <h1>Futsal Tournament 2025</h1>
      <h2>Registration Confirmed 🎉</h2>
    </div>
    <div class="content">
      <p>Hi <strong>${name}</strong>,</p>

      <p>We're excited to confirm your registration for the <strong>Futsal Tournament</strong> organized by <strong>Iqlipse Club</strong> at Lovely Professional University! 🏆</p>
      <p>The tournament will take place from <strong>13th April 2025</strong> to <strong>20th April 2025</strong>.</p>
      <h2 style="text-align: center;">${teamText}</h2>
      
      <p>Here are your registration details:</p>
      <ul>
        <li><strong>Name:&nbsp;</strong>${name}</li>
        <li><strong>Registration Number:&nbsp;</strong>${regNo}</li>
        <li><strong>Email:&nbsp;</strong>${email}</li>
        <li><strong>Phone:&nbsp;</strong>${phone}</li>
      </ul>

      <div style="text-align: center;">
        <a href="https://futsal-mania-2025.vercel.app/" target="_blank" class="btn" style="color: white;">
          Visit 
          <b>Futsal Mania 2025</b>
          Site for more information
        </a>
      </div></div>

      <p>We will notify you about match schedules and further announcements soon.</p>

      <p>Stay tuned and get your team spirit ready!</p>

      
      <div style="text-align: center;">

        <a href="https://futsal-mania-2025.vercel.app/dashboard" target="_blank" class="btn" style="color: white;">View Dashboard</a>
        <a href="https://iqlipse.space/contact" target="_blank" class="btn btn-secondary" style="color: white;">Contact Us for Queries</a>
        
      </div>


      <div class="footer">
        <p>Need help? Contact us at <a href="mailto:iqlipse.so@gmail.com">iqlipse.so@gmail.com</a></p>
        <p>© 2025 Iqlipse Club. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`)
}