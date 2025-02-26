import nodemailer from "nodemailer"

export async function POST(request: Request) {
    
    try {
        const data = await request.json(); // Parse the incoming JSON body
        console.log(data)
        const recipientEmail = data.email || "aslanhaider707@gmail.com";
        const mailOptions = {
            from: 'taxiiahmd@gmail.com',
            to: recipientEmail,
            subject: 'Ihre Taxi-Fahrpreisrechnung',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                    <h2 style="color: #4CAF50;">Ihre Taxi-Fahrpreisrechnung</h2>
                    <p>Lieber ${data.firstName} ${data.lastName},</p>
                    <p>Vielen Dank, dass Sie unseren Service gewählt haben. Nachfolgend finden Sie Ihre Fahrtdetails:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholort</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickUpLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Zielort</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.dropOffLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholdatum</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupDate}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholzeit</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupTime}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Passagiere</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.passengers}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Koffer</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.suitcases}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Fahrzeugtyp</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.selectedCar}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Strecke</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.distance/1000} km</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Geschätzter Preis</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">€${data.estimatedPrice}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Zahlungsmethode</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">€${data.paymentMethod}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px;">Wenn Sie Fragen haben, können Sie uns gerne unter +49 6142499601 kontaktieren.</p>
                    <p>Mit freundlichen Grüßen,<br>FlughafentransferAhmad</p>
                </div>
            `
        };
    
        const mailOptions2 = {
            from: 'taxiiahmd@gmail.com',
            to: "flughafentransfer123@hotmail.com",
            subject: 'Ihre Taxi-Fahrpreisrechnung',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                    <h2 style="color: #4CAF50;">Ihre Taxi-Fahrpreisrechnung</h2>
                    <p>Lieber ${data.firstName} ${data.lastName},</p>
                    <p>Vielen Dank, dass Sie unseren Service gewählt haben. Nachfolgend finden Sie Ihre Fahrtdetails:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholort</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickUpLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Zielort</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.dropOffLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholdatum</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupDate}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Abholzeit</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupTime}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Passagiere</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.passengers}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Koffer</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.suitcases}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Fahrzeugtyp</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.selectedCar}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Strecke</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.distance/1000} km</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Geschätzter Preis</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">€${data.estimatedPrice}</td>
                        </tr>
                                <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Kontakt-Nr</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.contactNo}</td>
                        </tr>
                                 <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">E-Mail</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.email}</td>
                        </tr>
                              <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Bemerkungen</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.remarks}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Zahlungsmethode</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.paymentMethod}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px;">Wenn Sie Fragen haben, können Sie uns gerne unter 06142-61111 kontaktieren.</p>
                    <p>Mit freundlichen Grüßen,<br>FlughafentransferAhmad</p>
                </div>
            `
        };
        
        
        // Extract relevant fields from data (if any)


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        await transporter.sendMail(mailOptions);
        await transporter.sendMail(mailOptions2);
        // Return success response
        return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error sending email:", error);

        // Return error response
        return new Response(JSON.stringify({ success: false, error: "Failed to send email." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
