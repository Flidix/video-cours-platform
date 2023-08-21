export function authEmailPage(confirmationLink: string): string {
   return `
     <html>
       <head>
         <style>
           body {
             font-family: Arial, sans-serif;
             background-color: #f4f4f4;
             margin: 0;
             padding: 0;
           }
           .container {
             max-width: 600px;
             margin: 0 auto;
             padding: 20px;
             background-color: #ffffff;
             border-radius: 5px;
             box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
           }
           h1 {
             font-size: 24px;
             margin-bottom: 10px;
           }
           p {
             font-size: 16px;
             margin-bottom: 20px;
           }
           .button-container {
             text-align: center;
           }
           .button {
             display: inline-block;
             padding: 10px 20px;
             background-color: #007bff;
             color: #ffffff;
             border: none;
             border-radius: 5px;
             cursor: pointer;
             text-decoration: none;
             font-size: 16px;
             text-color: #ffffff;
             transition: background-color 0.3s ease;
           }
           .button:hover {
             background-color: #0056b3;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <h1>Підтвердження облікового запису</h1>
           <p>Щоб підтвердити реєстрацію, натисніть на кнопку.</p>
           <div class="button-container">
             <form method="post" action="${confirmationLink}">
               <button class="button" type="submit">Підтвердити</button>
             </form>
           </div>
         </div>
       </body>
     </html>
   `;
 }
