import nodemailer from "nodemailer";

export async function POST(request: Request) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error("Missing email configuration");
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: "Server email configuration is missing" 
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }

    try {
        const data = await request.json();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Test the connection
        await transporter.verify().catch((error) => {
            console.error("Transporter verification failed:", error);
            throw new Error("Failed to establish email connection");
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  // Use environment variable instead of hardcoded email
            to: data.email || "aslanhaider707@gmail.com",
            subject: 'Ihre Taxi-Fahrpreisrechnung',
            html: `
                // ... your existing HTML template ...
            `
        };

        const mailOptions2 = {
            from: process.env.EMAIL_USER,  // Use environment variable instead of hardcoded email
            to: "flughafentransfer123@hotmail.com",
            subject: 'Ihre Taxi-Fahrpreisrechnung',
            html: `
                // ... your existing HTML template ...
            `
        };

        // Send emails with proper error handling
        const [result1, result2] = await Promise.all([
            transporter.sendMail(mailOptions).catch(error => {
                console.error("Error sending first email:", error);
                throw error;
            }),
            transporter.sendMail(mailOptions2).catch(error => {
                console.error("Error sending second email:", error);
                throw error;
            })
        ]);

        return new Response(
            JSON.stringify({ 
                success: true, 
                message: "Emails sent successfully!",
                messageIds: [result1.messageId, result2.messageId]
            }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in email handler:", error);
        
        return new Response(
            JSON.stringify({ 
                success: false, 
                error: "Failed to send email: " + (error instanceof Error ? error.message : "Unknown error")
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}