import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

// Defer initialization to runtime
let resend: Resend | null = null
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Check for API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured")
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      )
    }

    // Send email to Jesse
    const { data, error } = await getResend().emails.send({
      from: "Ibrahim Energy Partners <onboarding@resend.dev>",
      to: ["jesse@ibrahim.help"],
      replyTo: email,
      subject: `[IEP Lead] ${company ? `${company} - ` : ""}${name}`,
      html: `
        <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0A0E17; padding: 24px; text-align: center;">
            <h1 style="color: #C8A44E; margin: 0; font-family: Georgia, serif; font-size: 24px;">
              IBRAHIM ENERGY PARTNERS
            </h1>
            <p style="color: #9A9589; margin: 8px 0 0; font-size: 12px;">New Lead Inquiry</p>
          </div>

          <div style="background: #0F1A2E; padding: 32px; color: #F5F1E8;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2); color: #9A9589; width: 100px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2); color: #F5F1E8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2); color: #9A9589;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2);">
                  <a href="mailto:${email}" style="color: #C8A44E;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2); color: #9A9589;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(200,164,78,0.2); color: #F5F1E8;">${company}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 12px 0; color: #9A9589; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; color: #F5F1E8; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
              </tr>
            </table>
          </div>

          <div style="background: #0A0E17; padding: 16px; text-align: center; border-top: 2px solid #C8A44E;">
            <p style="color: #9A9589; margin: 0; font-size: 12px;">
              Reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
      text: `
New Lead from Ibrahim Energy Partners

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ""}

Message:
${message}

---
Reply to this email to respond directly to ${name}
      `.trim(),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
