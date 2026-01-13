/**
 * GET /api/zakat/donors
 *
 * Public endpoint to get the donor wall data.
 * Returns donations with privacy-respecting display names.
 */

import { NextResponse } from 'next/server'
import { getPublicDonations, getDonationStats } from '@/lib/zakat-store'

export async function GET() {
  try {
    const donations = await getPublicDonations()
    const stats = await getDonationStats()

    return NextResponse.json({
      success: true,
      stats: {
        total_donations: stats.total_donations,
        total_amount_eur: stats.total_amount_eur,
        unique_donors: stats.unique_donors
      },
      donations
    })

  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donor list' },
      { status: 500 }
    )
  }
}
