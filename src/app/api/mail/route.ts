import nodemailer from "nodemailer"

export async function POST(request: Request) {
    
    try {
        const data = await request.json(); // Parse the incoming JSON body
        console.log(data)
        const recipientEmail = data.email || "aslanhaider707@gmail.com";
        const mailOptions = {
            from: 'romanempire707@gmail.com',
            to: recipientEmail,
            subject: 'Your Taxi Ride Invoice',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                    <h2 style="color: #4CAF50;">Your Taxi Ride Invoice</h2>
                    <p>Dear ${data.firstName} ${data.lastName},</p>
                    <p>Thank you for choosing our service. Below are your ride details:</p>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Pick-Up Location</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickUpLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Drop-Off Location</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.dropOffLocation}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Pick-Up Date</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupDate}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Pick-Up Time</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupTime}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Passengers</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.passengers}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Suitcases</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.suitcases}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Car Type</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.selectedCar}</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Distance</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">${data.distance} km</td>
                        </tr>
                        <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Estimated Price</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">$${data.estimatedPrice}</td>
                        </tr>
                            <tr>
                            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Estimated Price</th>
                            <td style="padding: 8px; border: 1px solid #ddd;">$${data.paymentMethod}</td>
                        </tr>
                    </table>
                    <p style="margin-top: 20px;">If you have any questions, feel free to contact us: 06142-61111</p>
                    <p>Best regards,<br>TaxiAhmed</p>
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
