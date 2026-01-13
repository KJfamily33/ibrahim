/**
 * POST /api/zakat/record
 *
 * Admin endpoint to record a new donation.
 * Password protected - requires ADMIN_PASSWORD env var.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createDonation } from '@/lib/zakat-store'

// Simple password auth - set ADMIN_PASSWORD in your .env.local
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ibrahim2025'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check password
    if (body.password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate required fields
    if (!body.donor_name || !body.amount || !body.currency) {
      return NextResponse.json(
        { error: 'Missing required fields: donor_name, amount, currency' },
        { status: 400 }
      )
    }

    // Validate currency
    const validCurrencies = ['EUR', 'USD', 'GBP', 'SAR', 'AED', 'KWD', 'LYD']
    if (!validCurrencies.includes(body.currency)) {
      return NextResponse.json(
        { error: `Invalid currency. Must be one of: ${validCurrencies.join(', ')}` },
        { status: 400 }
      )
    }

    // Create the donation record
    const donation = await createDonation({
      donor_name: body.donor_name,
      donor_email: body.donor_email,
      amount: parseFloat(body.amount),
      currency: body.currency,
      campaign: body.campaign || 'ibrahim-surgery',
      dedication: body.dedication,
      is_anonymous: body.is_anonymous === true
    })

    // Return the hash (the seal) and verification URL
    const baseUrl = request.nextUrl.origin
    const verifyUrl = `${baseUrl}/verify/${donation.hash}`

    return NextResponse.json({
      success: true,
      hash: donation.hash,
      verify_url: verifyUrl,
      message: 'Donation sealed successfully. Share the verification link with the donor.',
      donation: {
        ...donation,
        donor_email: undefined // Don't return email in response
      }
    })

  } catch (error) {
    console.error('Error recording donation:', error)
    return NextResponse.json(
      { error: 'Failed to record donation' },
      { status: 500 }
    )
  }
}
