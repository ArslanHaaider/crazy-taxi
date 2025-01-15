import { MailerSend, Recipient, EmailParams, Sender } from "mailersend";

const mailersend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY!,
});

export async function POST(request: Request) {
    try {
        const data = await request.json(); // Parse the incoming JSON body

        // Extract relevant fields from data (if any)
        const recipientEmail = data.email || "aslanhaider707@gmail.com";
        const recipientName = data.name || "Arslan";

        const recipients = [new Recipient(recipientEmail, recipientName)];
        const sender = new Sender("romanempire707@gmail.com");
        const emailParams = new EmailParams()
            .setFrom(sender)
            .setTo(recipients)
            .setSubject("Invoice")
            .setTemplateId("yzkq34082z0gd796");

        // Send the email
        await mailersend.email.send(emailParams);

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
