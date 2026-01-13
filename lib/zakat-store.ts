/**
 * ZakatSeal - Donation Record Storage
 *
 * Simple file-based storage for donation records.
 * Each donation gets a unique SHA-256 hash that serves as its permanent identifier.
 *
 * Future: Can be upgraded to PostgreSQL + TON blockchain notarization
 */

import { createHash } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

export interface DonationRecord {
  hash: string              // SHA-256 hash of donation data (the "seal")
  donor_name: string        // Name for dua (or "متبرع كريم" if anonymous)
  donor_email?: string      // Private - for receipt
  amount: number            // Amount in currency
  currency: 'EUR' | 'USD' | 'GBP' | 'SAR' | 'AED' | 'KWD' | 'LYD'
  campaign: string          // Which campaign (e.g., "ibrahim-surgery")
  dedication?: string       // Optional dedication message
  is_anonymous: boolean     // Hide name on public wall?
  created_at: string        // ISO timestamp

  // Blockchain fields (for future TON integration)
  tx_hash?: string          // TON transaction hash once notarized
  block_number?: number     // Block number on TON
}

// Storage file path
const DATA_DIR = path.join(process.cwd(), 'data')
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch {
    // Directory exists
  }
}

// Read all donations
async function readDonations(): Promise<DonationRecord[]> {
  await ensureDataDir()
  try {
    const data = await fs.readFile(DONATIONS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Write all donations
async function writeDonations(donations: DonationRecord[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 2))
}

/**
 * Generate a unique hash for a donation record.
 * This hash is the permanent identifier - the "seal" on the donation.
 */
export function generateDonationHash(data: {
  donor_name: string
  donor_email?: string
  amount: number
  currency: string
  campaign: string
  created_at: string
}): string {
  const payload = JSON.stringify({
    donor_name: data.donor_name,
    donor_email: data.donor_email || '',
    amount: data.amount,
    currency: data.currency,
    campaign: data.campaign,
    created_at: data.created_at,
    // Add random salt to ensure uniqueness even for identical donations
    salt: Math.random().toString(36).substring(2, 15)
  })

  return createHash('sha256').update(payload).digest('hex')
}

/**
 * Create a new donation record
 */
export async function createDonation(data: {
  donor_name: string
  donor_email?: string
  amount: number
  currency: 'EUR' | 'USD' | 'GBP' | 'SAR' | 'AED' | 'KWD' | 'LYD'
  campaign?: string
  dedication?: string
  is_anonymous?: boolean
}): Promise<DonationRecord> {
  const created_at = new Date().toISOString()

  const hash = generateDonationHash({
    donor_name: data.donor_name,
    donor_email: data.donor_email,
    amount: data.amount,
    currency: data.currency,
    campaign: data.campaign || 'ibrahim-surgery',
    created_at
  })

  const record: DonationRecord = {
    hash,
    donor_name: data.donor_name,
    donor_email: data.donor_email,
    amount: data.amount,
    currency: data.currency,
    campaign: data.campaign || 'ibrahim-surgery',
    dedication: data.dedication,
    is_anonymous: data.is_anonymous ?? false,
    created_at
  }

  const donations = await readDonations()
  donations.unshift(record) // Add to beginning (newest first)
  await writeDonations(donations)

  return record
}

/**
 * Get a donation by its hash
 */
export async function getDonationByHash(hash: string): Promise<DonationRecord | null> {
  const donations = await readDonations()
  return donations.find(d => d.hash === hash) || null
}

/**
 * Get all donations (for admin)
 */
export async function getAllDonations(): Promise<DonationRecord[]> {
  return readDonations()
}

/**
 * Get public donations (for donor wall)
 * Hides email and shows "متبرع كريم" for anonymous donors
 */
export async function getPublicDonations(): Promise<Array<{
  hash: string
  display_name: string
  display_name_ar: string
  amount: number
  currency: string
  campaign: string
  dedication?: string
  created_at: string
}>> {
  const donations = await readDonations()

  return donations.map(d => ({
    hash: d.hash,
    display_name: d.is_anonymous ? 'Generous Donor' : d.donor_name,
    display_name_ar: d.is_anonymous ? 'متبرع كريم' : d.donor_name,
    amount: d.amount,
    currency: d.currency,
    campaign: d.campaign,
    dedication: d.dedication,
    created_at: d.created_at
  }))
}

/**
 * Get donation statistics
 */
export async function getDonationStats(): Promise<{
  total_donations: number
  total_amount_eur: number
  unique_donors: number
}> {
  const donations = await readDonations()

  // Rough EUR conversion rates
  const toEur: Record<string, number> = {
    EUR: 1,
    USD: 0.92,
    GBP: 1.17,
    SAR: 0.25,
    AED: 0.25,
    KWD: 3.0,
    LYD: 0.19
  }

  const total_amount_eur = donations.reduce((sum, d) => {
    return sum + (d.amount * (toEur[d.currency] || 1))
  }, 0)

  const unique_emails = new Set(donations.filter(d => d.donor_email).map(d => d.donor_email))

  return {
    total_donations: donations.length,
    total_amount_eur: Math.round(total_amount_eur),
    unique_donors: unique_emails.size || donations.length
  }
}
