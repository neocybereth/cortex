import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(new URL(`/?error=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/?error=missing_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.ouraring.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${new URL(request.url).origin}/api/auth/callback/oura`,
        client_id: process.env.OURA_CLIENT_ID!,
        client_secret: process.env.OURA_CLIENT_SECRET!,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()
    
    // Store token securely (you'll need to implement your preferred storage method)
    // For now, redirecting with success
    return NextResponse.redirect(new URL('/?oura_connected=true', request.url))
    
  } catch (error) {
    console.error('Oura OAuth error:', error)
    return NextResponse.redirect(new URL('/?error=oauth_failed', request.url))
  }
}